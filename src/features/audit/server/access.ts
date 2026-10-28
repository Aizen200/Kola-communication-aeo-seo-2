import { createHash, timingSafeEqual } from 'node:crypto';
import { AuditError } from './errors';

export function authorizeAuditRequest(request: Request, options: { mode: string; token?: string } = { mode: process.env.NODE_ENV ?? 'development', token: process.env.AUDIT_ACCESS_TOKEN }) {
      const origin = request.headers.get('origin');
      if (origin && origin !== new URL(request.url).origin) throw new AuditError('INVALID_ORIGIN', 'Submit the audit from this application.', 403);
      if (options.mode === 'production') {
        if (!options.token || options.token.length < 32 || options.token.length > 256) {
          throw new AuditError('AUDIT_DISABLED', 'Auditing is disabled until a server access token is configured.', 503);
        }
        const auth = request.headers.get('authorization') ?? '';
        if (auth.length > 1024 || !auth.startsWith('Bearer ')
          || !timingSafeEqual(createHash('sha256').update(auth.slice(7)).digest(), createHash('sha256').update(options.token).digest())) {
          throw new AuditError('UNAUTHORIZED', 'Enter a valid audit access token.', 401);
        }
      } else if (!['localhost', '127.0.0.1', '[::1]'].includes(new URL(request.url).hostname)) {
        throw new AuditError('LOCAL_ONLY', 'Development audits are available through localhost only.', 403);
      }
}
