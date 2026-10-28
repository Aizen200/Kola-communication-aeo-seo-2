import { request as httpRequest, type IncomingHttpHeaders } from 'node:http';
import { request as httpsRequest, type RequestOptions } from 'node:https';
import { isIP } from 'node:net';
import { Transform, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress, createGunzip, createInflate } from 'node:zlib';
import ipaddr from 'ipaddr.js';
import { AuditError, abortError } from '../errors';
import { authorizeAddresses, resolveAddresses, validateDestination } from './destination-policy';

export const FETCH_LIMITS = { timeoutMs: 15_000, maxBytes: 2 * 1024 * 1024, maxRedirects: 5 };
export type ContentMode = 'html' | 'text' | 'xml';
const redirectStatuses = new Set([301, 302, 303, 307, 308]);
export interface HopResponse {
  status: number;
  headers: IncomingHttpHeaders;
  body: Buffer;
  measurement?: { responseHeadersMs: number; downloadMs: number; encodedBytes: number; decodedBytes: number; remoteAddress: string };
}
export interface FetchedPage extends HopResponse {
  requestedUrl: string;
  finalUrl: string;
  redirects: Array<{ url: string; status: number; destination: string }>;
}

function byteLimit(limit: number): Transform {
  let bytes = 0;
  return new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      bytes += chunk.length;
      callback(bytes > limit ? new AuditError('RESPONSE_TOO_LARGE', 'The response exceeds the configured byte limit.') : null, chunk);
    },
  });
}

/** Original hostname stays in Host/SNI; the socket uses the approved numeric IP. */
export function pinnedRequestOptions(url: URL, address: string, signal: AbortSignal): RequestOptions {
  const host = url.hostname.replace(/^\[|\]$/g, '');
  return {
    protocol: url.protocol, hostname: address, family: isIP(address),
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    servername: isIP(host) ? undefined : host,
    method: 'GET', path: url.pathname + url.search, agent: false, signal,
    rejectUnauthorized: true, maxHeaderSize: 16 * 1024,
    headers: { host: url.host, 'user-agent': 'KolaWebsiteAudit/2.0', accept: 'text/html,application/xhtml+xml', 'accept-encoding': 'gzip, deflate, br' },
  };
}

/** Low-level connector; only fetchPage authorizes production destinations. */
export async function requestPinned(url: URL, address: string, signal: AbortSignal, maxBytes: number, mode: ContentMode = 'html'): Promise<HopResponse> {
  const start = performance.now();
  return new Promise((resolve, reject) => {
    const request = (url.protocol === 'https:' ? httpsRequest : httpRequest)({ ...pinnedRequestOptions(url, address, signal), headers: { ...pinnedRequestOptions(url, address, signal).headers, accept: mode === 'html' ? 'text/html,application/xhtml+xml' : mode === 'xml' ? 'application/xml,text/xml,text/plain' : 'text/plain,text/markdown' } });
    request.on('error', reject);
    request.on('socket', (socket) => {
      socket.once('connect', () => {
        const remote = socket.remoteAddress;
        if (!remote || ipaddr.process(remote).toString() !== ipaddr.process(address).toString()) {
          request.destroy(new AuditError('BLOCKED_DESTINATION', 'The connection did not reach the approved address.', 400));
        }
      });
    });
    request.once('response', (response) => {
      void (async () => {
        const responseHeadersMs = Math.round(performance.now() - start);
        const status = response.statusCode ?? 0;
        const headers = response.headers;
        // Never parse a redirect or an HTTP error document as the requested page.
        if (redirectStatuses.has(status) || status < 200 || status >= 300) {
          response.destroy();
          resolve({ status, headers, body: Buffer.alloc(0) });
          return;
        }
        const contentType = (headers['content-type'] ?? '').split(';')[0].trim().toLowerCase();
        const allowed = mode === 'html' ? ['text/html', 'application/xhtml+xml'] : mode === 'xml' ? ['application/xml', 'text/xml', 'text/plain'] : ['text/plain', 'text/markdown'];
        if (!allowed.includes(contentType)) {
          throw new AuditError('UNSUPPORTED_CONTENT', `Expected ${mode} content but received ${contentType || 'no Content-Type'}.`);
        }
        if (Number(headers['content-length']) > maxBytes) throw new AuditError('RESPONSE_TOO_LARGE', 'The response exceeds the configured byte limit.');
        const encoding = (headers['content-encoding'] ?? 'identity').trim().toLowerCase();
        const decoder = encoding === 'gzip' ? createGunzip() : encoding === 'deflate' ? createInflate()
          : encoding === 'br' ? createBrotliDecompress() : encoding === 'identity' ? new Transform({ transform(chunk, _encoding, cb) { cb(null, chunk); } }) : null;
        if (!decoder) throw new AuditError('UNSUPPORTED_ENCODING', 'The website uses an unsupported response encoding.');
        const chunks: Buffer[] = [];
        let encodedBytes = 0;
        const encodedCounter = new Transform({ transform(chunk: Buffer, _encoding, cb) { encodedBytes += chunk.length; cb(null, chunk); } });
        await pipeline(response, byteLimit(maxBytes), encodedCounter, decoder, byteLimit(maxBytes), new Writable({
          write(chunk: Buffer, _encoding, callback) { chunks.push(chunk); callback(); },
        }), { signal });
        const body = Buffer.concat(chunks);
        resolve({ status, headers, body, measurement: { responseHeadersMs, downloadMs: Math.round(performance.now() - start), encodedBytes, decodedBytes: body.length, remoteAddress: address } });
      })().catch((error: unknown) => { response.destroy(); request.destroy(); reject(error); });
    });
    request.end();
  });
}

interface FetchDependencies {
  resolve: typeof resolveAddresses;
  request: typeof requestPinned;
}

/** Dependencies are injected by controlled tests only, never by API input or env flags. */
export async function fetchPage(
  input: string, parentSignal?: AbortSignal,
  dependencies: FetchDependencies = { resolve: resolveAddresses, request: requestPinned },
  limits = FETCH_LIMITS, mode: ContentMode = 'html',
): Promise<FetchedPage> {
  let url: URL;
  try { url = new URL(input); } catch { throw new AuditError('INVALID_URL', 'Enter a valid website address.', 400); }
  const controller = new AbortController();
  const cancel = () => controller.abort(parentSignal?.reason);
  parentSignal?.addEventListener('abort', cancel, { once: true });
  if (parentSignal?.aborted) cancel();
  const timer = setTimeout(() => controller.abort(new AuditError('FETCH_TIMEOUT', 'The website took too long to respond. Try again later.', 504)), limits.timeoutMs);
  const { signal } = controller;
  const visited = new Set<string>();
  const redirects: FetchedPage['redirects'] = [];
  const run = async () => {
    while (true) {
      if (signal.aborted) throw abortError(signal);
      url.hash = '';
      validateDestination(url);
      if (visited.has(url.href)) throw new AuditError('REDIRECT_LOOP', 'The website redirects in a loop.');
      visited.add(url.href);
      const address = authorizeAddresses(await dependencies.resolve(url.hostname.replace(/^\[|\]$/g, ''), signal));
      if (signal.aborted) throw abortError(signal);
      const hop = await dependencies.request(url, address, signal, limits.maxBytes, mode);
      if (!redirectStatuses.has(hop.status)) return { ...hop, requestedUrl: input, finalUrl: url.href, redirects };
      if (!hop.headers.location) throw new AuditError('INVALID_REDIRECT', 'The website sent a redirect without a destination.');
      if (redirects.length >= limits.maxRedirects) throw new AuditError('TOO_MANY_REDIRECTS', 'The website exceeds the five-redirect limit.');
      let next: URL;
      try { next = new URL(hop.headers.location, url); } catch { throw new AuditError('INVALID_REDIRECT', 'The website sent an invalid redirect destination.'); }
      redirects.push({ url: url.href, status: hop.status, destination: next.href });
      url = next;
    }
  };
  let onAbort: () => void = () => {};
  try {
    // The race also bounds a stalled injected/resolver implementation; the real I/O observes the signal.
    const aborted = new Promise<never>((_resolve, reject) => {
      onAbort = () => reject(abortError(signal));
      signal.addEventListener('abort', onAbort, { once: true });
      if (signal.aborted) onAbort();
    });
    return await Promise.race([run(), aborted]);
  } catch (error) {
    if (signal.aborted) throw abortError(signal);
    if (error instanceof AuditError) throw error;
    throw new AuditError('FETCH_FAILED', 'Could not fetch this website. It may be offline, blocking automated requests, or have a TLS/network problem.');
  } finally {
    clearTimeout(timer);
    signal.removeEventListener('abort', onAbort);
    parentSignal?.removeEventListener('abort', cancel);
  }
}
