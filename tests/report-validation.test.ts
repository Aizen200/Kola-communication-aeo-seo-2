import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isAuditReport } from '../src/features/audit/domain/report-validation';
import { runAudit } from '../src/features/audit/server/run-audit';

test('validates actual engine output and rejects malformed or executable-link responses', async () => {
  const report = await runAudit('example.com', undefined, async () => ({
    status: 200, headers: {}, body: Buffer.from('<title>Fixture</title>'), requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', redirects: [],
  }));
  assert.equal(isAuditReport(report), true);
  for (const invalid of [null, {}, { ...report, overallScore: 101 }, { ...report, finalUrl: 'javascript:alert(1)' },
    { ...report, findings: [{}] }, { ...report, coverage: null }, { ...report, sections: [{ rows: [] }] }, { ...report, resources: [{}] }, { ...report, schemaVersion: 1 }, { ...report, findings: report.findings.map(f => ({ ...f, assessment: 'verified-ranking' })) }]) {
    assert.equal(isAuditReport(invalid), false);
  }
});
