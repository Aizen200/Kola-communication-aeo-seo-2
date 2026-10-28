import { parseAuditTarget } from '../domain/parse-target';
import { RULE_SET_VERSION } from '../domain/rule-catalog';
import type { AuditReport } from '../domain/types';
import { AuditError, abortError } from './errors';
import { extractPage } from './extract-page';
import { evaluatePage } from './evaluate-page';
import { collectDetailedEvidence } from './detailed-evidence';
import { inspectSiteResources } from './site-resources';
import { fetchPage } from './transport/fetch-page';

export async function runAudit(input: string, signal?: AbortSignal, fetcher: typeof fetchPage = fetchPage): Promise<AuditReport> {
  const parsed = parseAuditTarget(input);
  if (!parsed.ok) throw new AuditError('INVALID_URL', parsed.error, 400);
  const startedAt = new Date().toISOString();
  const page = await fetcher(parsed.url, signal);
  const observedAt = new Date().toISOString();
  const ok = page.status >= 200 && page.status < 300;
  const observations = ok ? extractPage(page) : null;
  const detailed = collectDetailedEvidence(page, observedAt);
  const auxiliary = ok ? await inspectSiteResources(page.finalUrl, signal, fetcher) : { resources: [], sections: [], findings: [] };
  if (signal?.aborted) throw abortError(signal);
  const findings = [...evaluatePage(page, observations, observedAt), ...detailed.findings, ...auxiliary.findings];
  return {
    schemaVersion: 2, ruleSetVersion: RULE_SET_VERSION, targetUrl: parsed.url, finalUrl: page.finalUrl,
    startedAt, completedAt: new Date().toISOString(), findings, resources: auxiliary.resources,
    sections: [...detailed.sections, ...auxiliary.sections, {
      id: 'unmeasured', title: 'Not measured & required data sources', sourceUrl: page.finalUrl,
      method: 'Explicit coverage boundary. No substitute or estimated scores are generated.', columns: ['Metric / capability', 'Status', 'Required evidence'],
      rows: [
        ['Mobile / desktop Lighthouse metrics', 'Not measured', 'A controlled browser/Lighthouse or PageSpeed Insights run'],
        ['Core Web Vitals (real users)', 'Not measured', 'CrUX or first-party real-user measurement with sufficient samples'],
        ['Search indexing / rankings / traffic', 'Not measured', 'Verified Search Console, analytics or a connected ranking provider'],
        ['Backlinks / referring domains', 'Not measured', 'A connected backlink index'],
        ['Google Business Profile / reviews', 'Not measured', 'Verified profile and review data'],
        ['AI citations / visibility', 'Not measured', 'Observed answers from specified systems and queries; markup alone is insufficient'],
        ['Rendered mobile / desktop screenshots', 'Not measured', 'A safely isolated browser renderer'],
        ['Full accessibility / JavaScript errors', 'Not measured', 'Rendered checks and manual keyboard/screen-reader review'],
        ['Broken links / full-site duplicates', 'Not measured', 'A bounded multi-page crawl with per-URL responses'],
        ['HTTP-to-HTTPS enforcement', 'Not measured', 'A separate HTTP-origin request; final-page HTTPS alone does not establish enforcement'],
        ['DNS email policy / SPF / DMARC', 'Not measured', 'Dedicated DNS record queries and mail configuration review'],
      ], totalRows: 11, notes: ['Static HTML observations do not prove rankings, rich results, business authenticity or AI answer selection.'],
    }],
    coverage: { pagesRequested: 1, pagesAnalyzed: ok ? 1 : 0, mode: 'static-html', limitations: [
      `One submitted page and its redirects; ${auxiliary.resources.length} auxiliary files requested. This is not a whole-site audit.`,
      'Evidence comes from fetched HTTP responses and deterministic HTML/text/XML parsers. No aggregate score or letter grade is calculated.',
      'Static response HTML only: no JavaScript execution, linked-page crawling or asset downloads. Findings labeled heuristic require review.',
      'Each detailed extraction query inspects at most 200 matching elements (100 JSON-LD blocks). Complete element counts are retained for headings, images, links, forms and videos; other totals describe matching sampled records.',
      'Inventories show at most 200 rows per section and 2,048 characters per cell. Source counts and truncation notes are shown. PDF inventories have a separate 60-row limit; JSON preserves all collected report rows.',
      ...(observations?.sampled ? ['Basic checks sample at most 2,000 images, 2,000 links and 500 headings.'] : []),
      ...(!ok ? [`HTTP ${page.status}: intended page HTML could not be analyzed; content checks are unavailable.`] : []),
    ] },
  };
}
