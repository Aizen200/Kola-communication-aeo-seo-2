import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { runAudit } from '../../src/features/audit/server/run-audit';

const fixture = readFileSync('tests/fixtures/good.html');
const reportPromise = runAudit('example.com', undefined, async () => ({
  status: 200, headers: { 'content-type': 'text/html' }, body: fixture,
  requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', redirects: [],
}));

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return ['localhost', '127.0.0.1'].includes(url.hostname) ? route.continue() : route.abort();
  });
});

test('homepage links directly to the audit workspace', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'View workspace' })).toHaveAttribute('href', '/audit');
  await page.getByRole('link', { name: 'Open audit workspace' }).click();
  await expect(page).toHaveURL('/audit');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Understand your website.');
  await expect(page.getByRole('button', { name: 'Run website audit' })).toBeVisible();
});

test('validates input and displays a fixture-derived report and filters', async ({ page }) => {
  await page.route('**/api/audit', async (route) => {
    expect(route.request().postDataJSON()).toEqual({ url: 'https://example.com/' });
    await route.fulfill({ json: { report: await reportPromise } });
  });
  await page.goto('/audit');
  const setup = page.getByRole('region', { name: 'Start with a website.' });
  const input = setup.getByRole('textbox', { name: 'Website address' });
  const submit = setup.getByRole('button', { name: 'Run website audit' });
  await submit.click();
  await expect(setup.getByRole('alert')).toHaveText('Enter a website address.');
  await input.fill('javascript:alert(1)'); await submit.click();
  await expect(setup.getByRole('alert')).toContainText('http:// or https://');
  await input.fill('Example.COM#intro');
  await expect(setup.getByRole('alert')).toHaveCount(0);
  await submit.click();
  await expect(page.getByRole('heading', { name: 'Audit results', exact: true })).toBeVisible();
  await expect(setup.getByRole('status')).toContainText('Audit complete.');
  await expect(page.getByText('Showing 21 of 21 findings')).toBeVisible();
  await expect(page.getByText('No aggregate score.', { exact: false })).toBeVisible();
  await page.getByRole('combobox', { name: 'Category', exact: true }).selectOption('technical');
  await expect(page.getByText('Showing 10 of 21 findings')).toBeVisible();
  await page.getByRole('combobox', { name: 'Status', exact: true }).selectOption('fail');
  await expect(page.getByText('No findings match these filters.')).toBeVisible();
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
  await input.fill('changed.example.com');
  await expect(page.getByRole('heading', { name: 'Audit results', exact: true })).toHaveCount(0);
});

test('shows server errors and permits a retry without fabricating results', async ({ page }) => {
  await page.route('**/api/audit', (route) => route.fulfill({ status: 504, json: { code: 'FETCH_TIMEOUT', error: 'The website took too long to respond.' } }));
  await page.goto('/audit');
  await page.getByRole('textbox', { name: 'Website address' }).fill('example.com');
  await page.getByRole('button', { name: 'Run website audit' }).click();
  await expect(page.getByRole('region', { name: 'Start with a website.' }).getByRole('alert')).toContainText('took too long');
  await expect(page.getByRole('button', { name: 'Run website audit' })).toBeEnabled();
  await expect(page.getByRole('heading', { name: 'Audit results', exact: true })).toHaveCount(0);
});

test('allows cancellation and discards a late result', async ({ page }) => {
  let release: (() => void) | undefined;
  await page.route('**/api/audit', async (route) => {
    await new Promise<void>((resolve) => { release = resolve; });
    await route.fulfill({ json: { report: await reportPromise } }).catch(() => {});
  });
  await page.goto('/audit');
  await page.getByRole('textbox', { name: 'Website address' }).fill('example.com');
  await page.getByRole('button', { name: 'Run website audit' }).click();
  await expect(page.getByRole('button', { name: 'Cancel audit' })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel audit' }).click();
  release?.();
  await expect(page.getByRole('region', { name: 'Start with a website.' }).getByRole('alert')).toContainText('Audit cancelled.');
  await expect(page.getByRole('heading', { name: 'Audit results', exact: true })).toHaveCount(0);
});

test('the workspace fits the viewport without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/audit');
  await expect(page.getByRole('button', { name: 'Run website audit' })).toBeVisible();
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
  expect(errors).toEqual([]);
});

test('real API rejects metadata URLs without running an audit', async ({ request }) => {
  const response = await request.post('/api/audit', { data: { url: 'http://169.254.169.254/latest/meta-data/' } });
  expect(response.status()).toBe(400);
  expect(response.headers()['cache-control']).toBe('no-store');
  expect(await response.json()).toMatchObject({ code: 'INVALID_URL' });
});

test('exposes exact evidence, exports JSON and handles expired PDF snapshots', async ({ page }) => {
  const auditId = '12345678-1234-1234-1234-123456789012';
  await page.route('**/api/audit', async route => route.fulfill({ json: { auditId, report: await reportPromise } }));
  await page.route(`**/api/audit/${auditId}/report`, route => route.fulfill({ status: 404, json: { error: 'This report expired. Run the audit again.' } }));
  await page.goto('/audit');
  await page.getByRole('textbox', { name: 'Website address' }).fill('example.com');
  await page.getByRole('button', { name: 'Run website audit' }).click();
  const metadata = page.locator('#evidence-metadata');
  await metadata.locator('summary').click();
  await expect(metadata.getByRole('cell', { name: 'Fixture Hotel | Rooms and stays', exact: true })).toBeVisible();
  await expect(page.locator('#evidence-unmeasured')).toContainText('Core Web Vitals');
  await expect(page.locator('#report-heading').locator('..').locator('..')).not.toContainText('/100');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download evidence JSON' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('website-audit.json');
  const path = await download.path(); expect(path).toBeTruthy();
  const exported = JSON.parse(readFileSync(path!, 'utf8'));
  expect(exported.schemaVersion).toBe(2); expect(exported.overallScore).toBeUndefined();
  await page.getByRole('button', { name: 'Download PDF', exact: true }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'This report expired.' })).toBeVisible();
});
