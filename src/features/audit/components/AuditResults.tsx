'use client';

import { useState } from 'react';
import EvidenceInventory from './EvidenceInventory';
import { auditCategories } from '../domain/catalog';
import { severityWeights } from '../domain/rule-catalog';
import type { AuditReport, FindingStatus } from '../domain/types';

const labels: Record<FindingStatus, string> = {
  pass: 'Pass', fail: 'Fail', warning: 'Warning', informational: 'Informational',
  not_applicable: 'Not applicable', unable_to_verify: 'Unable to verify',
};
const colors: Record<FindingStatus, string> = {
  pass: 'bg-forest/10 text-forest', fail: 'bg-red-100 text-red-900', warning: 'bg-amber-100 text-amber-900',
  informational: 'bg-sand text-ink', not_applicable: 'bg-sand text-muted', unable_to_verify: 'bg-sand text-muted',
};

export default function AuditResults({ report, auditId, token }: { report: AuditReport; auditId?: string; token?: string }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const save = (blob: Blob, name: string) => { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
  async function downloadPdf() {
    if (!auditId || downloading) return;
    setDownloading(true); setDownloadError('');
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch(`/api/audit/${auditId}/report`, { headers: token ? { authorization: `Bearer ${token}` } : {}, signal: controller.signal });
      if (!response.ok) { const body = await response.json(); throw new Error(body.error || 'Unable to download the PDF.'); }
      save(await response.blob(), 'website-audit.pdf');
    } catch (error) { setDownloadError(error instanceof Error ? error.message : 'Unable to download the PDF.'); }
    finally { clearTimeout(timer); setDownloading(false); }
  }
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const priority = report.findings.filter((finding) => ['fail', 'warning'].includes(finding.status))
    .sort((a, b) => severityWeights[b.severity] - severityWeights[a.severity] || Number(b.status === 'fail') - Number(a.status === 'fail'));
  const visible = report.findings.filter((finding) => (category === 'all' || finding.category === category) && (status === 'all' || finding.status === status));

  return (
    <section aria-labelledby="report-heading" className="mt-12 min-w-0 space-y-8">
      <div className="border-2 border-ink bg-ink p-6 text-paper sm:p-8">
        <p className="kicker text-paper/70">Your report · Single-page SEO</p>
        <div className="mt-4 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1"><h2 id="report-heading" className="break-words text-2xl font-bold">Audit results</h2>
            <a href={report.finalUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all text-sm underline underline-offset-4">{report.finalUrl}</a>
            <p className="mt-3 text-sm text-paper/70">{new Date(report.completedAt).toLocaleString()} · {report.coverage.pagesAnalyzed} page analyzed</p>
          </div>
          <div className="border border-paper/30 p-4"><p className="text-4xl font-bold">{report.findings.length}</p><p className="mt-1 text-sm text-paper/70">documented findings</p></div>
        </div>
        <p className="mt-6 border-t border-paper/25 pt-4 text-sm text-paper/80">No aggregate score. Each result below is an observed fact or a labeled heuristic, with its source and limits.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" disabled={!auditId || downloading} onClick={downloadPdf} className="border border-paper px-4 py-2 text-sm font-bold disabled:opacity-50">{downloading ? 'Preparing PDF…' : 'Download PDF'}</button>
          <button type="button" onClick={() => save(new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' }), 'website-audit.json')} className="border border-paper px-4 py-2 text-sm font-bold">Download evidence JSON</button>
        </div>
        <p className="mt-2 text-xs text-paper/70">PDF downloads are available for up to 15 minutes on this server. JSON preserves every collected report row.</p>
        {downloadError && <p role="alert" className="mt-3 text-sm">{downloadError}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Failed checks', report.findings.filter(f => f.status === 'fail').length],
          ['Review warnings', report.findings.filter(f => f.status === 'warning').length],
          ['Heuristic checks', report.findings.filter(f => f.assessment === 'heuristic').length],
          ['Unable to verify', report.findings.filter(f => f.status === 'unable_to_verify').length],
        ].map(([label, count]) => <div key={label} className="border border-ink/25 bg-white p-4"><p className="text-3xl font-bold">{count}</p><p className="mt-1 text-xs text-muted">{label}</p></div>)}
      </div>

      <section aria-labelledby="priorities-heading" className="border-2 border-ink bg-white p-6">
        <h3 id="priorities-heading" className="text-xl font-bold">Recommended next steps</h3>
        {priority.length ? <ol className="mt-4 list-decimal space-y-3 pl-5">{priority.slice(0, 5).map((finding) => <li key={finding.ruleId} className="pl-1 text-sm"><strong>{finding.checkName} · {finding.severity} priority.</strong> {finding.recommendedFix}</li>)}</ol>
          : <p className="mt-3 text-sm text-muted">No failed checks or warnings in the measured set. Review the coverage limitations before drawing broader conclusions.</p>}
      </section>

      <section aria-labelledby="findings-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
          <div><h3 id="findings-heading" className="text-2xl font-bold">Findings & evidence</h3><p className="mt-1 text-sm text-muted">Showing {visible.length} of {report.findings.length} findings</p></div>
          <div className="flex flex-wrap gap-3">
            <label className="text-sm font-bold">Category<select className="ml-2 border border-ink bg-white p-2 font-normal" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{auditCategories.filter((item) => report.findings.some((finding) => finding.category === item.id)).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
            <label className="text-sm font-bold">Status<select className="ml-2 border border-ink bg-white p-2 font-normal" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          </div>
        </div>
        <div className="mt-5 space-y-3">{visible.map((finding) => <details key={`${finding.ruleId}:${finding.affectedUrl}`} open={['fail', 'warning'].includes(finding.status)} className="border border-ink/25 bg-white p-4 sm:p-5">
          <summary className="cursor-pointer text-sm font-bold"><span className={`mr-3 inline-block px-2 py-1 text-xs ${colors[finding.status]}`}>{labels[finding.status]}</span>{finding.checkName}<span className="ml-3 font-normal text-muted">{finding.severity} priority · {finding.assessment}</span></summary>
          <div className="mt-4 space-y-3 border-t border-ink/15 pt-4 text-sm">
            <p>{finding.explanation}</p>
            <div className="bg-paper p-3"><p className="mb-2 font-bold">Observed evidence</p><ul className="space-y-1">{finding.evidence.map((evidence, index) => <li key={index} className="break-words font-mono text-xs">{evidence || '(empty value)'}</li>)}</ul></div>
            <p><strong>Recommended action:</strong> {finding.recommendedFix}</p>
            {finding.limitations.length > 0 && <p className="text-muted"><strong>Limitations:</strong> {finding.limitations.join(' ')}</p>}
            <p className="break-all text-xs text-muted">{finding.observedAt} · {finding.ruleId} · Confidence: {finding.confidence} · {finding.affectedUrl}</p>
          </div>
        </details>)}{!visible.length && <p className="py-6 text-sm text-muted">No findings match these filters.</p>}</div>
      </section>

      <section aria-labelledby="inventory-heading" className="min-w-0 space-y-4">
        <div className="border-b-2 border-ink pb-4"><h3 id="inventory-heading" className="text-2xl font-bold">Detailed evidence inventories</h3><p className="mt-2 text-sm text-muted">Exact declarations and measured values from this audit. Expand a section to inspect the rows.</p></div>
        <nav aria-label="Report sections" className="flex flex-wrap gap-2">{report.sections.map(section => <a key={section.id} className="border border-ink/20 px-2 py-1 text-xs underline" href={`#evidence-${section.id}`}>{section.title}</a>)}</nav>
        {report.sections.map(section => <EvidenceInventory key={section.id} section={section} />)}
      </section>
      <section aria-labelledby="requests-heading" className="border border-ink/25 bg-white p-5">
        <h3 id="requests-heading" className="text-lg font-bold">Auxiliary request log</h3>
        <div className="mt-4 space-y-4 text-sm">{report.resources.map(resource => <div key={resource.kind} className="border-t border-ink/15 pt-3"><p className="font-bold">{resource.kind} · {resource.state}{resource.status !== null ? ` · HTTP ${resource.status}` : ''}</p><p className="break-all text-xs">{resource.requestedUrl}</p>{resource.finalUrl !== resource.requestedUrl && <p className="break-all text-xs">Final: {resource.finalUrl}</p>}<p className="mt-1 text-muted">{resource.detail}</p><p className="mt-1 text-xs text-muted">{resource.observedAt}{resource.bytes !== null ? ` · ${resource.bytes} decoded bytes retained` : ''}</p></div>)}{!report.resources.length && <p className="text-muted">Not attempted because the main page response was unsuccessful.</p>}</div>
      </section>
      <aside aria-labelledby="coverage-notes-heading" className="border-l-4 border-orange pl-5">
        <h3 id="coverage-notes-heading" className="font-bold">Coverage & methodology</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">{report.coverage.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
        <p className="mt-3 text-xs text-muted">Rule set: {report.ruleSetVersion}. Status applies only to the named check. Severity helps prioritize review; it is not a ranking weight. No overall or category score is calculated.</p>
      </aside>
    </section>
  );
}
