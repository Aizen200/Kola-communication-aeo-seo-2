import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer, type ServerResponse, type IncomingMessage } from 'node:http';
import { gzipSync } from 'node:zlib';
import { fetchPage, pinnedRequestOptions, requestPinned, type HopResponse } from '../src/features/audit/server/transport/fetch-page';

const html = '<html><title>Fixture</title></html>';
const success: HopResponse = { status: 200, headers: { 'content-type': 'text/html' }, body: Buffer.from(html) };
const limits = { timeoutMs: 1000, maxBytes: 1024, maxRedirects: 2 };

test('pins numeric destination while preserving Host, SNI and certificate verification', () => {
  const options = pinnedRequestOptions(new URL('https://example.com/page?x=1'), '8.8.8.8', new AbortController().signal);
  assert.equal(options.hostname, '8.8.8.8');
  assert.equal(options.servername, 'example.com');
  assert.equal((options.headers as Record<string, string>).host, 'example.com');
  assert.equal(options.path, '/page?x=1');
  assert.equal(options.rejectUnauthorized, true);
  assert.equal(options.agent, false);
});

test('fetches a single page through the approved IP and records redirects', async () => {
  const seen: string[] = [];
  const page = await fetchPage('http://example.com/', undefined, {
    resolve: async () => ['8.8.8.8'],
    request: async (url, address) => {
      assert.equal(address, '8.8.8.8'); seen.push(url.href);
      return seen.length === 1 ? { status: 301, headers: { location: 'https://example.com/final' }, body: Buffer.alloc(0) } : success;
    },
  }, limits);
  assert.deepEqual(seen, ['http://example.com/', 'https://example.com/final']);
  assert.equal(page.redirects.length, 1);
  assert.equal(page.finalUrl, 'https://example.com/final');
});

test('revalidates DNS on every hop and stops before a private connection', async () => {
  let resolutions = 0; let requests = 0;
  await assert.rejects(fetchPage('https://example.com/', undefined, {
    resolve: async () => ++resolutions === 1 ? ['8.8.8.8'] : ['10.0.0.1'],
    request: async () => { requests++; return { status: 302, headers: { location: '/next' }, body: Buffer.alloc(0) }; },
  }, limits), { code: 'BLOCKED_DESTINATION' });
  assert.equal(requests, 1);
});

for (const location of ['http://169.254.169.254/', 'http://[::1]/', 'file:///etc/passwd']) {
  test(`rejects unsafe redirect ${location}`, async () => {
    let requests = 0;
    await assert.rejects(fetchPage('https://example.com/', undefined, {
      resolve: async () => ['8.8.8.8'],
      request: async () => { requests++; return { status: 302, headers: { location }, body: Buffer.alloc(0) }; },
    }, limits), { code: 'BLOCKED_DESTINATION' });
    assert.equal(requests, 1);
  });
}

test('bounds redirect loops and redirect chains', async () => {
  for (const loop of [true, false]) {
    let count = 0;
    await assert.rejects(fetchPage('https://example.com/', undefined, {
      resolve: async () => ['8.8.8.8'],
      request: async () => ({ status: 302, headers: { location: loop ? '/' : `/${++count}` }, body: Buffer.alloc(0) }),
    }, limits), { code: loop ? 'REDIRECT_LOOP' : 'TOO_MANY_REDIRECTS' });
  }
});

test('total deadline includes stalled DNS and abort prevents later network activity', async () => {
  let requests = 0;
  await assert.rejects(fetchPage('https://example.com', undefined, {
    resolve: async () => { await new Promise((resolve) => setTimeout(resolve, 50)); return ['8.8.8.8']; },
    request: async () => { requests++; return success; },
  }, { ...limits, timeoutMs: 10 }), { code: 'FETCH_TIMEOUT' });
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(requests, 0);
});

test('parent cancellation rejects before making a connection', async () => {
  const controller = new AbortController(); controller.abort();
  await assert.rejects(fetchPage('https://example.com/', controller.signal, {
    resolve: async () => { throw new Error('Should not resolve'); }, request: async () => success,
  }, limits), { code: 'CANCELLED' });
});

async function fixture(handler: (request: IncomingMessage, response: ServerResponse) => void) {
  const server = createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  assert.ok(address && typeof address === 'object');
  return { url: new URL(`http://fixture.example.com:${address.port}/page?x=1`), close: async () => {
    server.closeAllConnections(); await new Promise<void>((resolve) => server.close(() => resolve()));
  } };
}

test('real connector sends the original Host and reads compressed HTML', async () => {
  let host = '';
  const server = await fixture((request, response) => {
    host = request.headers.host ?? '';
    response.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'gzip' });
    response.end(gzipSync(html));
  });
  try {
    const page = await requestPinned(server.url, '127.0.0.1', AbortSignal.timeout(1000), 1024);
    assert.equal(page.body.toString(), html); assert.equal(host, server.url.host);
  } finally { await server.close(); }
});

test('real connector rejects a decompression bomb and unsupported content', async () => {
  for (const mode of ['bomb', 'json', 'oversize', 'encoding']) {
    const server = await fixture((_request, response) => {
      response.writeHead(200, {
        'content-type': mode === 'json' ? 'application/json' : 'text/html',
        'content-encoding': mode === 'bomb' ? 'gzip' : mode === 'encoding' ? 'unknown' : 'identity',
      });
      response.end(mode === 'bomb' ? gzipSync('a'.repeat(4096)) : mode === 'oversize' ? 'x'.repeat(2048) : '{}');
    });
    try {
      await assert.rejects(requestPinned(server.url, '127.0.0.1', AbortSignal.timeout(1000), 1024), {
        code: mode === 'json' ? 'UNSUPPORTED_CONTENT' : mode === 'encoding' ? 'UNSUPPORTED_ENCODING' : 'RESPONSE_TOO_LARGE',
      });
    } finally { await server.close(); }
  }
});

test('real connector aborts slow headers and a slow body', async () => {
  for (const headers of [false, true]) {
    const server = await fixture((_request, response) => {
      if (headers) { response.writeHead(200, { 'content-type': 'text/html' }); response.write('<html>'); }
    });
    try { await assert.rejects(requestPinned(server.url, '127.0.0.1', AbortSignal.timeout(30), 1024), { name: 'AbortError' }); }
    finally { await server.close(); }
  }
});

test('non-success HTML is not parsed as the target page', async () => {
  const server = await fixture((_request, response) => { response.writeHead(403); response.end('denied'); });
  try {
    const page = await requestPinned(server.url, '127.0.0.1', AbortSignal.timeout(1000), 1024);
    assert.equal(page.status, 403); assert.equal(page.body.length, 0);
  } finally { await server.close(); }
});

test('text/XML modes use the same bounded connector and record actual compressed bytes', async () => {
  const body = 'User-agent: *\nDisallow: /private'; const compressed = gzipSync(body);
  const server = await fixture((_request, response) => { response.writeHead(200, { 'content-type': 'text/plain', 'content-encoding': 'gzip' }); response.end(compressed); });
  try {
    const response = await requestPinned(server.url, '127.0.0.1', AbortSignal.timeout(1000), 1024, 'text');
    assert.equal(response.body.toString(), body);
    assert.equal(response.measurement?.encodedBytes, compressed.length);
    assert.equal(response.measurement?.decodedBytes, Buffer.byteLength(body));
    assert.ok(response.measurement!.downloadMs >= response.measurement!.responseHeadersMs);
    await assert.rejects(requestPinned(server.url, '127.0.0.1', AbortSignal.timeout(1000), 1024, 'html'), { code: 'UNSUPPORTED_CONTENT' });
  } finally { await server.close(); }
});

test('auxiliary content mode never bypasses redirect destination checks', async () => {
  let calls = 0;
  await assert.rejects(fetchPage('https://example.com/robots.txt', undefined, {
    resolve: async () => ['8.8.8.8'],
    request: async (_url, _address, _signal, _bytes, mode) => {
      calls++; assert.equal(mode, 'text'); return { status: 302, headers: { location: 'http://169.254.169.254/' }, body: Buffer.alloc(0) };
    },
  }, limits, 'text'), { code: 'BLOCKED_DESTINATION' });
  assert.equal(calls, 1);
});
