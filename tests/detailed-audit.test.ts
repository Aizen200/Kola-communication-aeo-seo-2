import assert from 'node:assert/strict';
import { test } from 'node:test';
import { writeFileSync } from 'node:fs';
import { runAudit } from '../src/features/audit/server/run-audit';
import { fetchPage, type FetchedPage } from '../src/features/audit/server/transport/fetch-page';
import { collectDetailedEvidence } from '../src/features/audit/server/detailed-evidence';
import { isAuditReport } from '../src/features/audit/domain/report-validation';
import { ReportStore } from '../src/features/audit/server/report-store';
import { renderReportPdf } from '../src/features/audit/server/render-report-pdf';
import { AuditError } from '../src/features/audit/server/errors';

const html = `<!doctype html><html lang="en"><head><title>Exact &amp; Useful title</title><meta name="description" content="A measured description."><meta property="og:title" content="Share title"><link rel="canonical" href="https://example.com/"><script type="application/ld+json">{"@type":"Hotel","name":"Fixture Hotel","address":{"@type":"PostalAddress","streetAddress":"10 Test Road"}}</script><script src="/app.js" defer></script><link rel="stylesheet" href="/style.css"></head><body><h1>Fixture hotel</h1><h3>What are the rooms like?</h3><img src="/room.jpg"><img src="/decoration.svg" alt=""><a href="/rooms">View rooms</a><a href="https://other.example/">Other</a><a href="tel:+1234567890">Call</a><label for="name">Your name</label><input id="name"><input id="email"><video src="/tour.mp4"><track kind="captions" src="/captions.vtt"></video><iframe src="https://player.example/" title="Tour"></iframe><p>Rooms rooms rooms rooms</p></body></html>`;
function page(url: string, body: string, status = 200): FetchedPage { return { requestedUrl: url, finalUrl: url, status, headers: { 'content-type': 'text/html' }, body: Buffer.from(body), redirects: [], measurement: { responseHeadersMs: 51, downloadMs: 70, encodedBytes: 800, decodedBytes: Buffer.byteLength(body), remoteAddress: '93.184.216.34' } }; }
function fixtureFetcher(overrides: Record<string, string | number | Error> = {}) {
  const requests: string[] = [];
  const fetcher: typeof fetchPage = async (url) => {
    requests.push(url); const path = new URL(url).pathname;
    const bodies: Record<string, string | number | Error> = {
      '/': html,
      '/robots.txt': 'User-agent: *\nDisallow: /private\nUser-agent: Googlebot\nDisallow: /\nAllow: /rooms\nUser-agent: GPTBot\nDisallow: /\nSitemap: https://example.com/catalog.xml',
      '/catalog.xml': '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.com/</loc><lastmod>2026-01-01</lastmod></url></urlset>',
      '/llms.txt': 404, ...overrides,
    };
    const body = bodies[path] ?? 404; if (body instanceof Error) throw body;
    const response = page(url, typeof body === 'string' ? body : '', typeof body === 'number' ? body : 200);
    response.headers['content-type'] = path === '/' ? 'text/html' : path.endsWith('.xml') ? 'application/xml' : 'text/plain';
    return response;
  };
  return { fetcher, requests };
}

test('reports exact inventories, real transport counters, policy and sitemap evidence with no invented score', async () => {
  const { fetcher, requests } = fixtureFetcher();
  const report = await runAudit('example.com', undefined, fetcher);
  assert.equal(isAuditReport(report), true);
  assert.equal('overallScore' in report, false); assert.equal('categoryScores' in report, false);
  assert.equal(requests.length, 4); assert.ok(!requests.some(url => url.includes('other.example')));
  const rows = (id: string) => report.sections.find(s => s.id === id)!.rows;
  assert.deepEqual(rows('metadata').find(row => row[0] === 'title'), ['title','Exact & Useful title','20']);
  assert.equal(rows('images')[0][0], 'https://example.com/room.jpg'); assert.equal(rows('images')[0][1], '(MISSING)');
  assert.match(rows('images')[0][4], /img:nth-of-type\(1\)/);
  assert.equal(rows('links')[1][0], 'External');
  assert.ok(rows('schema')[0][2].includes('PostalAddress'));
  assert.ok(rows('forms').some(r => r[2] === 'Your name'));
  assert.equal(rows('response').find(r => r[0] === 'Transferred response body')?.[1], '800 bytes');
  assert.equal(rows('crawler-policy').find(r => r[0] === 'Googlebot')?.[1], 'Disallowed by parsed policy');
  assert.equal(report.findings.find(f => f.ruleId === 'technical.robots')?.status, 'warning');
  assert.equal(report.findings.find(f => f.ruleId === 'technical.sitemap')?.status, 'pass');
  assert.equal(report.resources.find(r => r.kind === 'llms')?.state, 'missing');
  assert.ok(rows('unmeasured').every(row => row[1] === 'Not measured'));
});

test('auxiliary failures preserve the real page report and are never converted into a passing policy', async () => {
  const { fetcher } = fixtureFetcher({ '/robots.txt': new AuditError('FETCH_TIMEOUT','Timed out'), '/sitemap.xml': 503, '/llms.txt': 403 });
  const report = await runAudit('example.com', undefined, fetcher);
  assert.equal(report.coverage.pagesAnalyzed, 1);
  assert.equal(report.findings.find(f => f.ruleId === 'technical.robots')?.status, 'unable_to_verify');
  assert.ok(report.resources.every(r => r.state === 'unavailable'));
  assert.equal(report.sections.some(s => s.id === 'crawler-policy'), false);
});

test('HTML fallback pages are not accepted as crawler files', async () => {
  const { fetcher } = fixtureFetcher({ '/robots.txt': html, '/llms.txt': html, '/sitemap.xml': html });
  const report = await runAudit('example.com', undefined, fetcher);
  assert.ok(report.resources.every(r => r.state === 'unavailable'));
});

test('sitemap entity declarations, malformed XML and invalid locations never pass', async () => {
  for (const value of ['<!DOCTYPE urlset [<!ENTITY secret SYSTEM "file:///etc/passwd">]><urlset>&secret;</urlset>', '<urlset><url></urlset>', '<urlset><url><loc>javascript:alert(1)</loc></url></urlset>', '<html><body>Error</body></html>']) {
    const { fetcher } = fixtureFetcher({ '/catalog.xml': value });
    const report = await runAudit('example.com', undefined, fetcher);
    assert.notEqual(report.findings.find(f => f.ruleId === 'technical.sitemap')?.status, 'pass');
    assert.ok(!JSON.stringify(report).includes('root:'));
  }
});

test('cross-origin sitemap declarations are not fetched and indexes are not recursively crawled', async () => {
  const { fetcher, requests } = fixtureFetcher({ '/robots.txt': 'Sitemap: http://169.254.169.254/metadata\nSitemap: https://foreign.example/sitemap.xml', '/sitemap.xml': '<sitemapindex><sitemap><loc>https://example.com/child.xml</loc></sitemap></sitemapindex>' });
  const report = await runAudit('example.com', undefined, fetcher);
  assert.deepEqual(requests.sort(), ['https://example.com/', 'https://example.com/robots.txt','https://example.com/llms.txt','https://example.com/sitemap.xml'].sort());
  assert.match(report.sections.find(s => s.id === 'sitemap-entries')!.notes[0], /membership cannot be determined/);
});

test('malformed JSON-LD fails syntax while declared entities never become verified facts', () => {
  const result = collectDetailedEvidence(page('https://example.com/', '<script type="application/ld+json">{bad}</script>'), '2026-10-28T00:00:00Z');
  assert.equal(result.findings.find(f => f.ruleId === 'technical.json-ld')?.status, 'fail');
  assert.match(result.sections.find(s => s.id === 'schema')!.notes.join(' '), /not independently verified/);
});

test('large inventories retain full element counts and bound report rows and selectors', () => {
  const result = collectDetailedEvidence(page('https://example.com/', '<body>' + '<img src="/same.jpg">'.repeat(2000) + '</body>'), '2026-10-28T00:00:00Z');
  const images = result.sections.find(s => s.id === 'images')!;
  assert.equal(images.totalRows, 2000); assert.equal(images.rows.length, 200);
  assert.match(images.notes.join(' '), /first 200 of 2000/);
});

test('parent cancellation is propagated instead of yielding a successful partial report', async () => {
  const controller = new AbortController(); const { fetcher } = fixtureFetcher();
  const cancelled: typeof fetchPage = async (...args) => { if (args[0].endsWith('/robots.txt')) { controller.abort(new AuditError('CANCELLED','Cancelled',408)); throw controller.signal.reason; } return fetcher(...args); };
  await assert.rejects(runAudit('example.com', controller.signal, cancelled), { code: 'CANCELLED' });
});

test('snapshot retention is bounded and expires; unknown IDs never return another report', async () => {
  let now = 0; const store = new ReportStore(() => now); const { fetcher } = fixtureFetcher();
  const report = await runAudit('example.com', undefined, fetcher); const first = store.put(report);
  assert.equal(store.get(first), report); assert.equal(store.get('unknown'), undefined);
  for (let i=0;i<10;i++) store.put(report);
  assert.equal(store.get(first), undefined);
  const current = store.put(report); now += 15*60_000;
  assert.equal(store.get(current), undefined);
});

test('PDF renderer produces an actual PDF from the same evidence snapshot without requests', async () => {
  const { fetcher, requests } = fixtureFetcher(); const report = await runAudit('example.com', undefined, fetcher);
  const pdf = await renderReportPdf(report);
  assert.equal(pdf.subarray(0,5).toString(), '%PDF-'); assert.ok(pdf.length > 10_000);
  assert.equal(requests.length, 4);
  writeFileSync('/tmp/kola-detailed-fixture.pdf', pdf);
});
