'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { parseAuditTarget } from '../domain/parse-target';
import { isAuditReport } from '../domain/report-validation';
import type { AuditReport } from '../domain/types';
import AuditResults from './AuditResults';

type State = { kind: 'idle' } | { kind: 'running' } | { kind: 'error'; message: string; invalidTarget?: boolean } | { kind: 'done'; report: AuditReport; auditId?: string };

export default function AuditSetup({ tokenRequired = false }: { tokenRequired?: boolean }) {
  const [target, setTarget] = useState('');
  const [token, setToken] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });
  const active = useRef<AbortController | null>(null);
  const running = state.kind === 'running';
  useEffect(() => () => { active.current?.abort(); active.current = null; }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (active.current) return;
    const parsed = parseAuditTarget(target);
    if (!parsed.ok) { setState({ kind: 'error', message: parsed.error, invalidTarget: true }); return; }
    const controller = new AbortController();
    active.current = controller;
    setState({ kind: 'running' });
    const timer = setTimeout(() => controller.abort(new Error('The audit timed out. Please try again.')), 40_000);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST', headers: { 'content-type': 'application/json', ...(tokenRequired ? { authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ url: parsed.url }), signal: controller.signal,
      });
      const data: unknown = await response.json().catch(() => { throw new Error('The audit service returned an unreadable response. Please try again.'); });
      if (!response.ok) {
        const message = data && typeof data === 'object' && 'error' in data && typeof data.error === 'string' ? data.error : 'The audit could not be completed.';
        throw new Error(message);
      }
      if (!data || typeof data !== 'object' || !('report' in data) || !isAuditReport(data.report)) throw new Error('The server returned an invalid report. Please try again.');
      if (active.current === controller) setState({ kind: 'done', report: data.report, auditId: 'auditId' in data && typeof data.auditId === 'string' && /^[0-9a-f-]{36}$/.test(data.auditId) ? data.auditId : undefined });
    } catch (error) {
      if (active.current === controller) setState({ kind: 'error', message: controller.signal.aborted
        ? (controller.signal.reason instanceof Error ? controller.signal.reason.message : 'Audit cancelled.')
        : error instanceof Error ? error.message : 'Unable to reach the audit service. Please try again.' });
    } finally {
      clearTimeout(timer);
      if (active.current === controller) active.current = null;
    }
  }

  return (
    <div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section aria-labelledby="setup-heading" className="border-2 border-ink bg-white p-6 shadow-hard sm:p-8">
          <p className="kicker text-muted">01 / Run an audit</p>
          <h2 id="setup-heading" className="mt-3 text-2xl font-bold">Start with a website.</h2>
          <p id="setup-help" className="mt-3 text-sm leading-relaxed text-muted">Analyze one public webpage for technical and on-page SEO. Get measured findings, evidence and practical next steps.</p>
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5" aria-busy={running}>
            <div>
              <label htmlFor="target-url" className="mb-2 block text-sm font-bold">Website address</label>
              <input id="target-url" name="url" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} required maxLength={2048}
                placeholder="https://www.lite-stays.com/" value={target} disabled={running}
                onChange={(event) => { setTarget(event.target.value); setState({ kind: 'idle' }); }}
                aria-describedby={`setup-help${state.kind === 'error' ? ' target-error' : ''}`} aria-invalid={state.kind === 'error' && Boolean(state.invalidTarget)} className="field-box disabled:opacity-60" />
            </div>
            {tokenRequired && <div><label htmlFor="audit-token" className="mb-2 block text-sm font-bold">Audit access token</label><input id="audit-token" type="password" autoComplete="off" value={token} onChange={(event) => setToken(event.target.value)} disabled={running} className="field-box" /><p className="mt-2 text-xs text-muted">Provided by the application operator. Kept only in this page session.</p></div>}
            <button type="submit" disabled={running} className="btn-dark w-full justify-between disabled:cursor-wait disabled:opacity-60">{running ? 'Auditing website…' : 'Run website audit'} <span aria-hidden="true">→</span></button>
            {running && <button type="button" onClick={() => active.current?.abort(new Error('Audit cancelled.'))} className="text-sm font-bold underline underline-offset-4">Cancel audit</button>}
            {state.kind === 'error' && <p id="target-error" role="alert" className="border-l-4 border-orange pl-3 text-sm font-bold">{state.message}</p>}
            <div role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted">
              {running ? 'Fetching the page, inspecting its HTML and checking crawler files. This can take up to 35 seconds.' : state.kind === 'done' ? 'Audit complete. Review your findings below.' : 'One page per audit. Linked pages are not crawled.'}
            </div>
          </form>
        </section>
        <aside className="border-2 border-ink bg-ink p-6 text-paper sm:p-8" aria-labelledby="included-heading">
          <p className="kicker text-paper/70">What is included</p>
          <h2 id="included-heading" className="mt-3 text-2xl font-bold">Real observations.<br />Evidence you can inspect.</h2>
          <ul className="mt-6 space-y-4 text-sm text-paper/85"><li>HTTP response, HTTPS and redirect path</li><li>Indexing directives, canonical and viewport</li><li>Title, description and heading structure</li><li>Images, links, schema, social metadata and form labels</li><li>robots.txt, sitemap, crawler policies and llms.txt</li><li>Detailed evidence tables and downloadable PDF</li></ul>
          <p className="mt-6 border-t border-paper/25 pt-4 text-sm text-paper/70">One page, with explicit coverage. No made-up grades or ranking estimates. Browser performance, search traffic and AI citations are not measured.</p>
        </aside>
      </div>
      {state.kind === 'done' && <AuditResults key={state.report.completedAt} report={state.report} auditId={state.auditId} token={tokenRequired ? token : undefined} />}
    </div>
  );
}
