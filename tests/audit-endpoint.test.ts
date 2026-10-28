import assert from 'node:assert/strict';
import { test } from 'node:test';
import { POST } from '../src/app/api/audit/route';

test('the API rejects a direct metadata URL before any fetching', async (context) => {
  const fetchMock = context.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected network request'); });
  const response = await POST(new Request('http://localhost:3000/api/audit', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url: 'http://169.254.169.254/latest/meta-data/' }),
  }));
  assert.equal(response.status, 400);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const body: unknown = await response.json();
  assert.ok(typeof body === 'object' && body !== null && 'code' in body);
  assert.equal(body.code, 'INVALID_URL');
  assert.equal(fetchMock.mock.callCount(), 0);
});
