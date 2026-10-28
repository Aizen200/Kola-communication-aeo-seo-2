/** Shared contracts; measurements are observations, never a synthetic quality grade. */
export type AuditCategory = 'technical' | 'on-page' | 'aeo' | 'geo' | 'video' | 'performance' | 'accessibility';
export type FindingStatus = 'pass' | 'fail' | 'warning' | 'informational' | 'not_applicable' | 'unable_to_verify';
export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export interface AuditFinding {
  ruleId: string; category: AuditCategory; checkName: string; affectedUrl: string;
  status: FindingStatus; severity: Severity; evidence: string[]; explanation: string; recommendedFix: string;
  confidence: 'high' | 'medium' | 'low'; limitations: string[]; observedAt: string;
  assessment: 'observation' | 'heuristic';
}
/** Cells are plain text, never target HTML. Row limits and omissions are explicit. */
export interface EvidenceSection {
  id: string; title: string; sourceUrl: string; method: string;
  columns: string[]; rows: string[][]; totalRows: number; notes: string[];
}
export interface ResourceObservation {
  kind: 'robots' | 'sitemap' | 'llms'; requestedUrl: string; finalUrl: string;
  status: number | null; state: 'observed' | 'missing' | 'unavailable';
  observedAt: string; detail: string; bytes: number | null;
}
export interface AuditReport {
  schemaVersion: 2; ruleSetVersion: string; targetUrl: string; finalUrl: string;
  startedAt: string; completedAt: string; findings: AuditFinding[];
  sections: EvidenceSection[]; resources: ResourceObservation[];
  coverage: { pagesRequested: number; pagesAnalyzed: number; mode: 'static-html' | 'rendered'; limitations: string[] };
}
