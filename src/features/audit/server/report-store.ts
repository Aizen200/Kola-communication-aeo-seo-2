import { randomUUID } from 'node:crypto';
import type { AuditReport } from '../domain/types';
import { AuditError } from './errors';

/** Bounded process-local snapshots. Restart/expiry requires a fresh audit. No user-submitted report is accepted. */
export class ReportStore {
  private reports = new Map<string, { report: AuditReport; expires: number }>();
  constructor(private now = Date.now) {}
  put(report: AuditReport): string {
    this.prune();
    if (Buffer.byteLength(JSON.stringify(report)) > 5 * 1024 * 1024) throw new AuditError('REPORT_TOO_LARGE', 'The report exceeded its size limit.');
    while (this.reports.size >= 10) this.reports.delete(this.reports.keys().next().value!);
    const id = randomUUID(); this.reports.set(id, { report, expires: this.now() + 15 * 60_000 }); return id;
  }
  get(id: string): AuditReport | undefined { this.prune(); return this.reports.get(id)?.report; }
  private prune() { for (const [id, entry] of this.reports) if (entry.expires <= this.now()) this.reports.delete(id); }
}
const scope = globalThis as typeof globalThis & { kolaReportStore?: ReportStore };
export const reportStore = scope.kolaReportStore ??= new ReportStore();
