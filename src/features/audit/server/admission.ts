import { AuditError } from './errors';

/** Bounded process-wide budget. Production additionally requires authentication. */
export class AdmissionGate {
  private active = 0;
  private starts: number[] = [];
  constructor(private readonly now = () => Date.now()) {}
  acquire(): () => void {
    const now = this.now();
    this.starts = this.starts.filter((timestamp) => now - timestamp < 60_000);
    if (this.starts.length >= 10) throw new AuditError('RATE_LIMITED', 'Audit limit reached. Please wait a minute and try again.', 429);
    if (this.active >= 2) throw new AuditError('AUDIT_BUSY', 'Two audits are already running. Please try again shortly.', 503);
    this.starts.push(now); this.active++;
    let released = false;
    return () => { if (!released) { this.active--; released = true; } };
  }
}

const state = globalThis as typeof globalThis & { kolaAuditGate?: AdmissionGate };
export const admissionGate = state.kolaAuditGate ??= new AdmissionGate();
