import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AdmissionGate } from '../src/features/audit/server/admission';
import { createAuditHandler } from '../src/features/audit/server/handle-audit';
import { runAudit } from '../src/features/audit/server/run-audit';

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost:3000/api/audit', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
}
const runner: typeof runAudit = async (url) => runAudit(url, undefined, async () => ({
  status: 200, headers: { 'content-type': 'text/html' }, body: Buffer.from('<title>Test page</title>'),
  requestedUrl: url, finalUrl: url, redirects: [],
}));

test('valid request returns a real fixture-derived report with no-store caching', async () => {
  const response = await createAuditHandler(runner, { mode: 'development', gate: new AdmissionGate() })(request({ url: 'example.com' }));
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal((await response.json()).report.targetUrl, 'https://example.com/');
});

test('malformed and hostile request input is rejected before invoking the engine', async () => {
  for (const body of [null, [], 'example.com', {}, { url: 42 }, { url: 'http://169.254.169.254' }, { url: 'javascript:alert(1)' }]) {
    const handler = createAuditHandler(async () => { throw new Error('Must not run'); }, { mode: 'development', gate: new AdmissionGate() });
    assert.equal((await handler(request(body))).status, 400);
  }
});

test('enforces JSON content type, invalid JSON handling, body byte limits and same-origin checks', async () => {
  const handler = createAuditHandler(runner, { mode: 'development', gate: new AdmissionGate() });
  assert.equal((await handler(request({ url: 'example.com' }, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await handler(new Request('http://localhost:3000/api/audit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' }))).status, 400);
  assert.equal((await handler(request({ url: 'x'.repeat(5000) }))).status, 413);
  assert.equal((await handler(request({ url: 'example.com' }, { origin: 'https://attacker.example.com' }))).status, 403);
});

test('production is disabled without a strong token and authenticates before fetching', async () => {
  const token = 'test-token-for-controlled-tests-only-12345';
  const disabled = createAuditHandler(runner, { mode: 'production', gate: new AdmissionGate() });
  assert.equal((await disabled(request({ url: 'example.com' }))).status, 503);
  const enabled = createAuditHandler(runner, { mode: 'production', token, gate: new AdmissionGate() });
  assert.equal((await enabled(request({ url: 'example.com' }))).status, 401);
  assert.equal((await enabled(request({ url: 'example.com' }, { authorization: 'Bearer incorrect' }))).status, 401);
  assert.equal((await enabled(request({ url: 'example.com' }, { authorization: `Bearer ${token}` }))).status, 200);
});

test('admission bounds concurrency, releases slots once, and expires its fixed-size window', () => {
  let now = 0; const gate = new AdmissionGate(() => now);
  const first = gate.acquire(); const second = gate.acquire();
  assert.throws(() => gate.acquire(), { code: 'AUDIT_BUSY' });
  first(); first(); second();
  for (let i = 0; i < 8; i++) gate.acquire()();
  assert.throws(() => gate.acquire(), { code: 'RATE_LIMITED' });
  now = 60_000; assert.doesNotThrow(() => gate.acquire()());
});

test('handler returns retry guidance and recovers slots after runner failure', async () => {
  const gate = new AdmissionGate();
  const handler = createAuditHandler(async () => { throw new Error('private internal detail'); }, { mode: 'development', gate });
  for (let i = 0; i < 10; i++) {
    const response = await handler(request({ url: 'example.com' }));
    assert.equal(response.status, 500); assert.ok(!(await response.text()).includes('private internal detail'));
  }
  const response = await handler(request({ url: 'example.com' }));
  assert.equal(response.status, 429); assert.equal(response.headers.get('retry-after'), '60');
});

test('slow request body is cancelled and the admission slot is released', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; } });
  const gate = new AdmissionGate();
  const handler = createAuditHandler(runner, { mode: 'development', gate, bodyTimeoutMs: 10 });
  const slow = new Request('http://localhost:3000/api/audit', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: stream, duplex: 'half',
  } as RequestInit);
  assert.equal((await handler(slow)).status, 408);
  assert.equal(cancelled, true);
  assert.equal((await handler(request({ url: 'example.com' }))).status, 200);
});
