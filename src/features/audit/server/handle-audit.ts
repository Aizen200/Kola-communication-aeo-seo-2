import { authorizeAuditRequest } from './access';
import { reportStore } from './report-store';
import { parseAuditTarget } from '../domain/parse-target';
import { AdmissionGate, admissionGate } from './admission';
import { AuditError, abortError } from './errors';
import { runAudit } from './run-audit';

async function readBody(request: Request, signal: AbortSignal): Promise<unknown> {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw new AuditError('INVALID_CONTENT_TYPE', 'Send the audit request as JSON.', 415);
  }
  if (Number(request.headers.get('content-length')) > 4096) throw new AuditError('BODY_TOO_LARGE', 'The request body exceeds 4 KiB.', 413);
  if (!request.body) throw new AuditError('INVALID_BODY', 'Provide a website URL.', 400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = []; let size = 0;
  let onAbort: () => void = () => {};
  try {
    const aborted = new Promise<never>((_resolve, reject) => {
      onAbort = () => { void reader.cancel().catch(() => {}); reject(abortError(signal)); };
      signal.addEventListener('abort', onAbort, { once: true });
      if (signal.aborted) onAbort();
    });
    while (true) {
      const part = await Promise.race([reader.read(), aborted]);
      if (signal.aborted) throw abortError(signal);
      if (part.done) break;
      size += part.value.byteLength;
      if (size > 4096) throw new AuditError('BODY_TOO_LARGE', 'The request body exceeds 4 KiB.', 413);
      chunks.push(part.value);
    }
    try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks))); }
    catch { throw new AuditError('INVALID_BODY', 'The request must contain valid JSON.', 400); }
  } finally {
    signal.removeEventListener('abort', onAbort);
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

interface HandlerOptions { mode: string; token?: string; gate: AdmissionGate; bodyTimeoutMs?: number }

export function createAuditHandler(
  runner: typeof runAudit = runAudit,
  options: HandlerOptions = { mode: process.env.NODE_ENV ?? 'development', token: process.env.AUDIT_ACCESS_TOKEN, gate: admissionGate },
) {
  return async (request: Request): Promise<Response> => {
    let release: (() => void) | undefined;
    const controller = new AbortController();
    const cancel = () => controller.abort(new AuditError('CANCELLED', 'The audit was cancelled.', 408));
    request.signal.addEventListener('abort', cancel, { once: true });
    if (request.signal.aborted) cancel();
    let bodyTimer: ReturnType<typeof setTimeout> | undefined;
    const totalTimer = setTimeout(() => controller.abort(new AuditError('AUDIT_TIMEOUT', 'The audit exceeded its time limit.', 504)), 35_000);
    try {
      authorizeAuditRequest(request, options);
      release = options.gate.acquire();
      bodyTimer = setTimeout(() => controller.abort(new AuditError('BODY_TIMEOUT', 'The request body took too long to arrive.', 408)), options.bodyTimeoutMs ?? 5000);
      const body = await readBody(request, controller.signal);
      clearTimeout(bodyTimer);
      if (!body || typeof body !== 'object' || Array.isArray(body) || !('url' in body) || typeof body.url !== 'string') {
        throw new AuditError('INVALID_BODY', 'Provide a website URL as text.', 400);
      }
      const parsed = parseAuditTarget(body.url);
      if (!parsed.ok) throw new AuditError('INVALID_URL', parsed.error, 400);
      const report = await runner(parsed.url, controller.signal);
      return Response.json({ auditId: reportStore.put(report), report }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
      const failure = error instanceof AuditError ? error : new AuditError('AUDIT_FAILED', 'The audit could not be completed. Please try again.', 500);
      return Response.json({ code: failure.code, error: failure.message }, {
        status: failure.status,
        headers: { 'Cache-Control': 'no-store', ...(failure.code === 'RATE_LIMITED' ? { 'Retry-After': '60' } : failure.code === 'AUDIT_BUSY' ? { 'Retry-After': '1' } : {}) },
      });
    } finally {
      clearTimeout(totalTimer); clearTimeout(bodyTimer);
      request.signal.removeEventListener('abort', cancel);
      release?.();
    }
  };
}
