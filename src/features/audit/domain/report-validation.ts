import type { AuditReport } from './types';
import { auditCategories } from './catalog';
const record = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && v.length <= 8192;
const texts = (v: unknown): v is string[] => Array.isArray(v) && v.length <= 100 && v.every(text);
const count = (v: unknown) => Number.isInteger(v) && Number(v) >= 0;
const webUrl = (v: unknown) => { if (!text(v)) return false; try { const u = new URL(v); return ['http:', 'https:'].includes(u.protocol) && !u.username && !u.password; } catch { return false; } };
/** Shape validation does not establish the truth of measurements. Target content stays plain text. */
export function isAuditReport(v: unknown): v is AuditReport {
  if (!record(v) || v.schemaVersion !== 2 || 'overallScore' in v || 'categoryScores' in v || !text(v.ruleSetVersion) || !webUrl(v.targetUrl) || !webUrl(v.finalUrl) || !text(v.startedAt) || !text(v.completedAt)) return false;
  if (!record(v.coverage) || !count(v.coverage.pagesRequested) || !count(v.coverage.pagesAnalyzed) || !['static-html', 'rendered'].includes(String(v.coverage.mode)) || !texts(v.coverage.limitations)) return false;
  if (!Array.isArray(v.resources) || v.resources.length > 3 || !v.resources.every(r => record(r) && ['robots','sitemap','llms'].includes(String(r.kind)) && webUrl(r.requestedUrl) && webUrl(r.finalUrl) && (r.status === null || count(r.status)) && ['observed','missing','unavailable'].includes(String(r.state)) && text(r.observedAt) && text(r.detail) && (r.bytes === null || count(r.bytes)))) return false;
  if (!Array.isArray(v.sections) || v.sections.length > 40 || !v.sections.every(s => record(s) && text(s.id) && text(s.title) && webUrl(s.sourceUrl) && text(s.method) && texts(s.columns) && s.columns.length > 0 && s.columns.length <= 10 && texts(s.notes) && count(s.totalRows) && Array.isArray(s.rows) && s.rows.length <= 200 && Number(s.totalRows) >= s.rows.length && s.rows.every(row => texts(row) && row.length === (s.columns as string[]).length))) return false;
  return Array.isArray(v.findings) && v.findings.length <= 1000 && v.findings.every(f => record(f) && text(f.ruleId) && auditCategories.some(c => c.id === f.category) && text(f.checkName) && webUrl(f.affectedUrl)
    && ['pass','fail','warning','informational','not_applicable','unable_to_verify'].includes(String(f.status)) && ['critical','high','medium','low','info'].includes(String(f.severity)) && texts(f.evidence)
    && text(f.explanation) && text(f.recommendedFix) && ['high','medium','low'].includes(String(f.confidence)) && ['observation','heuristic'].includes(String(f.assessment)) && texts(f.limitations) && text(f.observedAt));
}
