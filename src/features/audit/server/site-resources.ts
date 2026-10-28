import robotsParser from 'robots-parser';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import type { AuditFinding, EvidenceSection, ResourceObservation } from '../domain/types';
import { AuditError, abortError } from './errors';
import { fetchPage, type FetchedPage } from './transport/fetch-page';

const LIMITS = { timeoutMs: 4000, maxBytes: 512 * 1024, maxRedirects: 2 };
/** Only three auxiliary resources; no linked-page or sitemap-index crawl. */
export async function inspectSiteResources(finalUrl: string, signal?: AbortSignal, fetcher = fetchPage) {
  const resources: ResourceObservation[] = []; const sections: EvidenceSection[] = []; const findings: AuditFinding[] = [];
  const origin = new URL(finalUrl).origin;
  const get = async (kind: ResourceObservation['kind'], url: string): Promise<FetchedPage | null> => {
    const result: ResourceObservation = { kind, requestedUrl: url, finalUrl: url, status: null, state: 'unavailable', observedAt: '', detail: '', bytes: null };
    try {
      const page = await fetcher(url, signal, undefined, LIMITS, kind === 'sitemap' ? 'xml' : 'text');
      Object.assign(result, { finalUrl: page.finalUrl, status: page.status, bytes: page.body.length });
      result.state = page.status >= 200 && page.status < 300 ? 'observed' : [404, 410].includes(page.status) ? 'missing' : 'unavailable';
      result.detail = `HTTP ${page.status}`;
      if (result.state === 'observed') {
        // Protect against HTML error pages disguised as text/XML, including injected test transports.
        if (/^\s*(?:<!doctype\s+html|<html|<head|<body)/i.test(page.body.toString('utf8'))) throw new AuditError('UNSUPPORTED_CONTENT', 'Received HTML instead of the requested crawler file.');
        return page;
      }
      return null;
    } catch (error) {
      if (signal?.aborted) throw abortError(signal);
      result.state = 'unavailable'; result.detail = error instanceof AuditError ? `${error.code}: ${error.message}` : 'Resource could not be fetched.';
      return null;
    } finally { result.observedAt = new Date().toISOString(); resources.push(result); }
  };
  const robotsUrl = `${origin}/robots.txt`; const llmsUrl = `${origin}/llms.txt`;
  const [robots, llms] = await Promise.all([get('robots', robotsUrl), get('llms', llmsUrl)]);
  let sitemapUrl = `${origin}/sitemap.xml`;
  let googleAllowed: boolean | undefined;
  const sitemapNotes = ['Only one sitemap is inspected. Child sitemaps and listed pages are not fetched; membership does not prove indexing.'];
  if (robots) {
    const content = robots.body.toString('utf8');
    // Policy remains associated with the original origin even if robots.txt itself redirects.
    const parser = robotsParser(robotsUrl, content);
    const bots = ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'KolaWebsiteAudit'];
    googleAllowed = parser.isAllowed(finalUrl, 'Googlebot');
    sections.push({ id: 'crawler-policy', title: 'Crawler policy for the audited URL', sourceUrl: robotsUrl, method: 'robots-parser matching against the exact final page URL; this is declared policy, not a crawler visit.', columns: ['User-agent', 'Policy for this URL', 'Matching line', 'Declared crawl delay'], rows: bots.map(bot => {
      const allowed = parser.isAllowed(finalUrl, bot); const line = parser.getMatchingLineNumber(finalUrl, bot);
      return [bot, allowed === true ? 'Allowed by parsed policy' : allowed === false ? 'Disallowed by parsed policy' : 'Unknown', line > 0 ? String(line) : 'No matching rule', String(parser.getCrawlDelay(bot) ?? 'Not declared')];
    }), totalRows: bots.length, notes: ['Bots can use different policy handling. This does not establish indexing, model training, AI answers or citations. Missing rules mean no prohibition in this parsed file.'] });
    const declared: string[] = parser.getSitemaps();
    for (const raw of declared) {
      try { const url = new URL(raw); if (url.origin === origin && !url.username && !url.password && !url.port) { sitemapUrl = url.href; break; } } catch { /* cannot fetch invalid declarations */ }
    }
    sections.push({ id: 'robots-source', title: 'robots.txt source', sourceUrl: robotsUrl, method: 'Fetched text; first 200 lines, capped to 2,048 characters per line.', columns: ['Line', 'Text'], rows: content.split(/\r?\n/).slice(0, 200).map((line, i) => [String(i + 1), line.slice(0, 2048)]), totalRows: content.split(/\r?\n/).length, notes: ['This site-authorized diagnostic fetches the submitted page once. It does not run a site-wide crawl.'] });
    if (declared.length) sitemapNotes.push(`Discovered ${declared.length} sitemap declarations; selected the first same-origin URL, or /sitemap.xml if none qualifies. Cross-origin declarations are not fetched.`);
  }
  const sitemap = await get('sitemap', sitemapUrl);
  let sitemapValid = false; let sitemapDetail = '';
  if (sitemap) {
    const xml = sitemap.body.toString('utf8');
    try {
      if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('DTD/entity declarations are not accepted.');
      if (XMLValidator.validate(xml) !== true) throw new Error('The response is not well-formed XML.');
      // Entities are disabled; this parser never resolves external resources.
      const parsed = new XMLParser({ processEntities: false, ignoreAttributes: false, parseTagValue: false, removeNSPrefix: true }).parse(xml);
      const root = parsed.urlset ?? parsed.sitemapindex;
      if (!root || typeof root !== 'object') throw new Error('No populated urlset or sitemapindex root was found.');
      const isIndex = parsed.sitemapindex !== undefined;
      const entries = root[isIndex ? 'sitemap' : 'url'];
      const list: Array<{ loc?: unknown; lastmod?: unknown }> = entries === undefined ? [] : Array.isArray(entries) ? entries : [entries];
      let invalidLocations = 0;
      const rows = list.map(entry => {
        const loc = typeof entry?.loc === 'string' ? entry.loc : '';
        let valid = false;
        try { const u = new URL(loc); valid = ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password; } catch { /* invalid */ }
        if (!valid) invalidLocations++;
        return [loc.slice(0, 2048) || '(missing loc)', String(entry?.lastmod ?? '(not declared)').slice(0, 2048), valid ? 'HTTP(S) URL syntax' : 'Invalid/missing URL'];
      });
      sitemapValid = invalidLocations === 0 && rows.length > 0;
      sitemapDetail = `${isIndex ? 'Sitemap index' : 'URL sitemap'}: ${rows.length} entries; ${invalidLocations} invalid/missing URL locations. Audited URL ${isIndex ? 'membership cannot be determined from an index' : list.some(e => e.loc === finalUrl) ? 'is listed exactly' : 'is not listed exactly'}.`;
      sections.push({ id: 'sitemap-entries', title: isIndex ? 'Sitemap index entries' : 'Sitemap URL entries', sourceUrl: sitemap.finalUrl, method: 'XML syntax and loc URL checks, not full XSD validation.', columns: ['Location', 'Declared last modified', 'URL syntax'], rows: rows.slice(0, 200), totalRows: rows.length, notes: [sitemapDetail, ...sitemapNotes, 'Dates are declarations, not verified content updates. XML entities remain unexpanded.'] });
    } catch (error) { sitemapDetail = error instanceof Error ? error.message : 'Unable to parse sitemap.'; }
  }
  if (llms) {
    const lines = llms.body.toString('utf8').split(/\r?\n/);
    sections.push({ id: 'llms-source', title: 'llms.txt source', sourceUrl: llms.finalUrl, method: 'Fetched plain text/Markdown; first 200 lines, 2,048 characters per line.', columns: ['Line', 'Text'], rows: lines.slice(0, 200).map((line, i) => [String(i + 1), line.slice(0, 2048)]), totalRows: lines.length, notes: ['Presence is informational. This is not a prerequisite for rankings or proof of AI use. No conformance/quality score is assigned.'] });
  }
  resources.sort((a,b) => ['robots','sitemap','llms'].indexOf(a.kind) - ['robots','sitemap','llms'].indexOf(b.kind));
  for (const resource of resources) {
    const robot = resource.kind === 'robots'; const map = resource.kind === 'sitemap';
    findings.push({ ruleId: `technical.${resource.kind}`, category: 'technical', checkName: robot ? 'robots.txt & Googlebot policy' : map ? 'Sitemap syntax & locations' : 'llms.txt observation', affectedUrl: resource.requestedUrl,
      status: resource.state === 'unavailable' ? 'unable_to_verify' : robot ? resource.state === 'missing' ? 'informational' : googleAllowed === false ? 'warning' : googleAllowed === true ? 'pass' : 'unable_to_verify' : map ? resource.state === 'missing' ? 'informational' : sitemapValid ? 'pass' : 'warning' : 'informational',
      severity: robot && googleAllowed === false ? 'medium' : map && sitemap && !sitemapValid ? 'low' : 'info', assessment: 'observation', confidence: 'high',
      evidence: [resource.detail, ...(robot && robots ? [`Googlebot declared policy: ${googleAllowed === undefined ? 'unknown' : googleAllowed ? 'allowed' : 'disallowed'}.`] : map && sitemap ? [sitemapDetail] : [])],
      explanation: robot ? 'Reads the origin robots file and evaluates the submitted URL for named crawlers.' : map ? 'Checks one sitemap response, XML structure and location syntax.' : 'Records whether an optional llms.txt text response is available.',
      recommendedFix: robot ? 'Review any disallow against your intended crawl policy; intentional exclusions are valid.' : map ? 'Review the discovered sitemap and submit the intended sitemap in your search console.' : 'Treat this file as optional documentation; prioritize verified content and crawl issues.',
      limitations: robot ? ['No actual crawler visit or indexing verification. 404/410 means no robots file observed, not an SEO failure. Other failures leave policy unknown.'] : map ? sitemapNotes : ['Presence does not prove AI discovery, use or citations.'], observedAt: resource.observedAt });
  }
  return { resources, sections, findings };
}
