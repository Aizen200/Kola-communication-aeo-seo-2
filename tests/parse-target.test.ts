import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseAuditTarget } from '../src/features/audit/domain/parse-target';

test('normalizes domain input and removes a browser-only fragment', () => {
  assert.deepEqual(parseAuditTarget('  Example.COM/docs?q=hello%20world#intro  '), {
    ok: true, url: 'https://example.com/docs?q=hello%20world',
  });
});

test('preserves explicit HTTP, paths and query parameters', () => {
  assert.deepEqual(parseAuditTarget('http://example.com:80/a?b=1'), { ok: true, url: 'http://example.com/a?b=1' });
});

test('uses URL normalization for international domain names', () => {
  assert.deepEqual(parseAuditTarget('https://bücher.de'), { ok: true, url: 'https://xn--bcher-kva.de/' });
});

for (const input of [
  '', '   ', 'not a domain', 'https://', 'https://exa_mple.com',
  'javascript:alert(1)', 'file:///etc/passwd', 'ftp://example.com', 'data:text/html,hello',
  'https://user:secret@example.com', 'https://example.com:8080', '//example.com',
  'https://example.com\\@other.com', 'https://example.com/\u0000',
  'https://example.com/\nprivate', 'https://localhost', 'http://127.1',
  'http://2130706433', 'https://0x7f000001', 'http://[::1]',
  'https://service.internal', 'https://test.local', 'https://example.com.',
  `https://example.com/${'a'.repeat(2048)}`,
]) {
  test(`rejects invalid or unsupported configuration: ${JSON.stringify(input).slice(0, 90)}`, () => {
    const result = parseAuditTarget(input);
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.error.length > 0);
  });
}

test('format acceptance does not perform destination authorization or network I/O', (context) => {
  const fetchMock = context.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected network request'); });
  assert.equal(parseAuditTarget('https://unresolved.example.com').ok, true);
  assert.equal(fetchMock.mock.callCount(), 0);
});
