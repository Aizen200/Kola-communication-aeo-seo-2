import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { extractPage } from '../src/features/audit/server/extract-page';
import { runAudit } from '../src/features/audit/server/run-audit';
import type { FetchedPage } from '../src/features/audit/server/transport/fetch-page';

const good = readFileSync(new URL('./fixtures/good.html', import.meta.url));
function page(body = good, status = 200): FetchedPage {
  return { body, status, headers: { 'content-type': 'text/html; charset=utf-8' }, requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', redirects: [] };
}

test('extracts decoded metadata, decorative alt, links and text without executing scripts', () => {
  const result = extractPage(page());
  assert.equal(result.titles[0], 'Fixture Hotel | Rooms and stays');
  assert.equal(result.images[1].alt, '');
  assert.equal(result.links[0].url, 'https://example.com/rooms');
  assert.equal(result.headings[0].level, 1);
  assert.ok(result.wordCount > 0 && result.wordCount < 60);
});

test('uses base URL and excludes non-web link schemes', () => {
  const result = extractPage(page(Buffer.from('<base href="/docs/"><a href="help">Help</a><a href="javascript:alert(1)">Bad</a><img src="a">')));
  assert.equal(result.links[0].url, 'https://example.com/docs/help');
  assert.equal(result.links.length, 1); assert.equal(result.images[0].alt, null);
});

test('builds a complete single-page report from controlled HTML', async () => {
  const report = await runAudit('example.com', undefined, async () => page());
  assert.equal('overallScore' in report, false);
  assert.equal(report.findings.length, 21);
  assert.equal(report.coverage.pagesAnalyzed, 1);
  assert.equal('categoryScores' in report, false);
  assert.ok(report.sections.some(s => s.id === 'unmeasured'));
  assert.ok(report.findings.every((finding) => finding.evidence.length > 0 && finding.recommendedFix && finding.observedAt));
});

test('reports missing elements and contextual non-applicability without a word-count penalty', async () => {
  const report = await runAudit('example.com', undefined, async () => page(Buffer.from('<html><body><p>Small page</p></body></html>')));
  const status = (id: string) => report.findings.find((finding) => finding.ruleId === id)?.status;
  assert.equal(status('on-page.title'), 'fail');
  assert.equal(status('on-page.image-alt'), 'not_applicable');
  assert.equal(status('on-page.content'), 'informational');
  assert.equal('overallScore' in report, false);
});

test('HTTP failure makes content checks unavailable instead of failed', async () => {
  const report = await runAudit('example.com', undefined, async () => page(Buffer.from('<title>Forbidden</title>'), 403));
  assert.equal('overallScore' in report, false);
  assert.equal(report.coverage.pagesAnalyzed, 0);
  assert.equal(report.findings.find((finding) => finding.ruleId === 'technical.http-status')?.status, 'fail');
  assert.equal(report.findings.find((finding) => finding.ruleId === 'on-page.title')?.status, 'unable_to_verify');
});

test('indexes directives from headers and warns on duplicate canonical and skipped headings', async () => {
  const response = page(Buffer.from('<title>A</title><link rel="canonical" href="/a"><link rel="canonical" href="/b"><h1>A</h1><h3>B</h3><img src="a">'));
  response.headers['x-robots-tag'] = 'noindex';
  const report = await runAudit('example.com', undefined, async () => response);
  assert.equal(report.findings.find((finding) => finding.ruleId === 'technical.indexability')?.status, 'warning');
  assert.equal(report.findings.find((finding) => finding.ruleId === 'technical.canonical')?.status, 'fail');
  assert.equal(report.findings.find((finding) => finding.ruleId === 'on-page.headings')?.status, 'warning');
  assert.equal(report.findings.find((finding) => finding.ruleId === 'on-page.image-alt')?.status, 'fail');
});

test('cross-references a missing image alt when it also explains an unnamed link', async () => {
  for (const alt of ['', ' alt=""']) {
    const report = await runAudit('example.com', undefined, async () => page(Buffer.from(`<a href="/rooms"><img src="room.jpg"${alt}></a>`)));
    const anchor = report.findings.find((finding) => finding.ruleId === 'on-page.anchor-text');
    assert.equal(anchor?.status, alt ? 'warning' : 'informational');
  }
});
