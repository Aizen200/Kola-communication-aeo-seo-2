import { loadBuffer } from 'cheerio';
import type { Element } from 'domhandler';
import type { AuditFinding, EvidenceSection } from '../domain/types';
import type { FetchedPage } from './transport/fetch-page';

const ROW_LIMIT = 200;
const clean = (value: unknown) => String(value ?? '').replace(/\s+/g, ' ').trim();

export function collectDetailedEvidence(page: FetchedPage, observedAt: string): { sections: EvidenceSection[]; findings: AuditFinding[] } {
  const sections: EvidenceSection[] = [];
  const totals: Record<string, number> = {};
  const findings: AuditFinding[] = [];
  const section = (id: string, title: string, columns: string[], rows: string[][], method: string, notes: string[] = []) => {
    sections.push({ id, title, sourceUrl: page.finalUrl, method, columns, rows: rows.slice(0, ROW_LIMIT).map(row => row.map(cell => cell.length > 2048 ? `${cell.slice(0, 2047)}…` : cell)), totalRows: totals[id] ?? rows.length,
      notes: [...notes, ...((totals[id] ?? rows.length) > ROW_LIMIT ? [`Showing the first ${ROW_LIMIT} of ${totals[id] ?? rows.length} observed rows.`] : []), ...(rows.some(row => row.some(cell => cell.length > 2048)) ? ['Long cells are truncated to 2,048 characters; metadata character counts use the complete normalized text.'] : [])] });
  };
  const add = (ruleId: string, category: AuditFinding['category'], checkName: string, status: AuditFinding['status'], evidence: string[], explanation: string, recommendedFix: string, limitations: string[], heuristic = false) => {
    findings.push({ ruleId, category, checkName, status, evidence: evidence.slice(0, 8).map(s => s.slice(0, 400)), explanation, recommendedFix, limitations, affectedUrl: page.finalUrl, observedAt,
      severity: status === 'fail' ? 'medium' : status === 'warning' ? 'low' : 'info', confidence: heuristic ? 'medium' : 'high', assessment: heuristic ? 'heuristic' : 'observation' });
  };
  const allowedHeaders = ['content-type', 'content-encoding', 'content-length', 'cache-control', 'etag', 'last-modified', 'vary', 'server', 'x-powered-by', 'x-robots-tag', 'content-security-policy', 'strict-transport-security', 'x-content-type-options', 'referrer-policy', 'permissions-policy', 'link'];
  const m = page.measurement;
  section('response', 'HTTP response & measured transfer', ['Measurement', 'Observed value'], [
    ['Requested URL', page.requestedUrl], ['Final URL', page.finalUrl], ['HTTP status', String(page.status)],
    ['Approved remote IP', m?.remoteAddress ?? 'Not recorded'],
    ['Time to response headers', m ? `${m.responseHeadersMs} ms` : 'Not measured'],
    ['Time through body download', m ? `${m.downloadMs} ms` : 'Not measured'],
    ['Transferred response body', m ? `${m.encodedBytes} bytes` : 'Not measured'],
    ['Decoded HTML body', `${page.body.length} bytes`],
    ...allowedHeaders.filter(key => page.headers[key] !== undefined).map(key => [key, String(page.headers[key])]),
  ], 'One server-side GET of the final page; transport counters.', ['Timings cover the final request including TCP/TLS, excluding DNS and earlier redirects. These are not browser load time, Lighthouse or Core Web Vitals.', 'Transfer bytes exclude HTTP/TLS headers and all linked assets. A non-success response body is deliberately not read. Headers are declarations, not verified server technology.']);
  section('redirects', 'Redirect chain', ['From', 'HTTP', 'To'], page.redirects.map(h => [h.url, String(h.status), h.destination]), 'Observed HTTP redirects; every hop resolves and validates its destination.');
  if (page.status < 200 || page.status >= 300) return { sections, findings };
  const charset = /charset\s*=\s*["']?([^;\s"']+)/i.exec(page.headers['content-type'] ?? '')?.[1];
  const $ = loadBuffer(page.body, { encoding: { transportLayerEncodingLabel: charset } });
  let base = page.finalUrl;
  try { base = new URL($('base[href]').first().attr('href') ?? page.finalUrl, page.finalUrl).href; } catch { /* fallback */ }
  const absolute = (raw: string | undefined) => {
    if (!raw) return '(not declared)';
    try { const url = new URL(raw, base); return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) && !url.username && !url.password ? url.href : '(unsupported URL scheme or credentials)'; } catch { return '(invalid URL)'; }
  };
  const selector = (el: Element) => {
    const parts: string[] = []; let current: Element | undefined = el;
    while (current && parts.length < 30) {
      const tag: string = current.tagName;
      const index = $(current).prevAll(tag).length + 1;
      parts.unshift(`${tag}:nth-of-type(${index})`);
      current = $(current).parent().get(0) as Element | undefined;
    }
    return parts.join(' > ');
  };
  // Bound all subsequent work, especially selectors and label matching, independently of input size.
  const elements = (query: string) => $(query).slice(0, 200).toArray() as Element[];
  Object.assign(totals, { headings: $('h1,h2,h3,h4,h5,h6').length, images: $('img').length, links: $('a[href]').length, forms: $('input:not([type="hidden"]),select,textarea').length, video: $('video,iframe').length });
  section('metadata', 'Metadata & search preview inputs', ['Element / declaration', 'Value', 'Characters'], [
    ...elements('title').map(el => ['title', clean($(el).text()), String(Array.from(clean($(el).text())).length)]),
    ...elements('meta[name],meta[property]').map(el => { const value = clean($(el).attr('content')); return [$(el).attr('name') ?? $(el).attr('property') ?? '', value, String(Array.from(value).length)]; }),
    ...elements('link[rel]').filter(el => /canonical|alternate|icon/.test($(el).attr('rel') ?? '')).map(el => [`link rel=${$(el).attr('rel')} hreflang=${$(el).attr('hreflang') ?? '—'}`, absolute($(el).attr('href')), '—']),
    ['html lang', $('html').attr('lang') ?? '(missing)', '—'], ['base URL used for resolution', base, '—'],
  ], 'Parsed HTML declarations; character counts are Unicode code points after whitespace normalization.', ['Search engines can rewrite titles and snippets. No live search result or ranking was retrieved.', 'No fixed title/description character threshold is treated as a ranking requirement.']);
  const headings = elements('h1,h2,h3,h4,h5,h6');
  section('heading-counts', 'Heading counts', ['Level', 'Count'], [1,2,3,4,5,6].map(level => [`H${level}`, String($(`h${level}`).length)]), 'HTML element counts.');
  section('headings', 'Heading outline', ['Level', 'Text', 'HTML selector'], headings.map(el => [el.tagName.toUpperCase(), clean($(el).text()), selector(el)]), 'Document order before JavaScript rendering.', ['Heading structure is a review aid, not a ranking score.']);
  const imgs = elements('img');
  section('images', 'Image inventory', ['Image URL', 'Alt attribute', 'Width × height', 'Loading', 'HTML selector'], imgs.map(el => [absolute($(el).attr('src')), $(el).attr('alt') === undefined ? '(MISSING)' : $(el).attr('alt') === '' ? '(empty / declared decorative)' : clean($(el).attr('alt')), `${$(el).attr('width') ?? '—'} × ${$(el).attr('height') ?? '—'}`, $(el).attr('loading') ?? '(default)', selector(el)]), 'HTML img elements; assets are not downloaded.', ['CSS background images and JavaScript-created images are not included. srcset selection, intrinsic file size, visual meaning and actual layout shifts are not measured.']);
  const anchors = elements('a[href]');
  const linkRows = anchors.map(el => {
    const url = absolute($(el).attr('href'));
    let kind = 'Other / invalid';
    try { const u = new URL(url); kind = ['http:', 'https:'].includes(u.protocol) ? u.origin === new URL(page.finalUrl).origin ? 'Internal' : 'External' : u.protocol; } catch { /* invalid */ }
    return [kind, url, clean($(el).attr('aria-label') || $(el).text() || $(el).find('img').first().attr('alt')) || '(no extracted name)', $(el).attr('rel') ?? '—', selector(el)];
  });
  section('links', 'Link inventory', ['Scope', 'Destination', 'Extracted name', 'Rel', 'HTML selector'], linkRows, 'HTML anchors resolved against the document base.', ['Destinations were not fetched: these are not broken-link results. Accessible names are a limited heuristic; aria-labelledby and rendered state require browser review.']);
  section('social', 'Social sharing & profile declarations', ['Declaration', 'Value'], [
    ...elements('meta[property],meta[name]').filter(el => /^(og:|twitter:)/i.test($(el).attr('property') ?? $(el).attr('name') ?? '')).map(el => [$(el).attr('property') ?? $(el).attr('name') ?? '', clean($(el).attr('content'))]),
    ...linkRows.filter(row => { try { return /(^|\.)(facebook\.com|instagram\.com|linkedin\.com|youtube\.com|x\.com|twitter\.com|tiktok\.com)$/.test(new URL(row[1]).hostname); } catch { return false; } }).map(row => ['Linked profile / social URL', row[1]]),
  ], 'Declared Open Graph/Twitter metadata and recognized social-domain links.', ['Profile ownership, activity and social engagement are not verified. Missing social profiles are not scored as SEO failures.']);
  const schemas: string[][] = [];
  let invalidJson = 0;
  elements('script[type="application/ld+json"]').slice(0, 100).forEach((el, i) => {
    try {
      const value: unknown = JSON.parse($(el).text());
      const stack: unknown[] = [value]; const types = new Set<string>(); let nodes = 0;
      const declarations: string[] = [];
      while (stack.length && nodes++ < 10000) {
        const node = stack.pop();
        if (Array.isArray(node)) { stack.push(...node.slice(0, 1000)); continue; }
        if (node && typeof node === 'object') {
          const obj = node as Record<string, unknown>;
          const t = obj['@type']; for (const item of Array.isArray(t) ? t : [t]) if (typeof item === 'string') types.add(item);
          for (const key of ['name', 'url', 'datePublished', 'dateModified', 'telephone', 'address', 'author']) if (obj[key] !== undefined) declarations.push(`${key}: ${JSON.stringify(obj[key]).slice(0, 500)}`);
          stack.push(...Object.values(obj).filter(v => v && typeof v === 'object'));
        }
      }
      schemas.push([`JSON-LD block ${i + 1}`, 'Valid JSON syntax', [...types].join(', ') || '(no @type found)', declarations.slice(0, 12).join('; '), selector(el)]);
    } catch { invalidJson++; schemas.push([`JSON-LD block ${i + 1}`, 'INVALID JSON syntax', 'Unable to parse', 'Correct JSON syntax before semantic validation.', selector(el)]); }
  });
  for (const el of elements('[itemscope]')) schemas.push(['Microdata declaration', 'Syntax not validated', $(el).attr('itemtype') ?? '(missing itemtype)', '', selector(el)]);
  section('schema', 'Structured data declarations', ['Format', 'Syntax', 'Declared types', 'Selected declared properties', 'HTML selector'], schemas, 'JSON.parse for up to 100 JSON-LD blocks, with bounded object traversal; microdata declarations listed.', ['Valid JSON is not Schema.org validation or rich-result eligibility. Entity properties are publisher claims, not independently verified facts. Nested property display is sampled.']);
  add('technical.json-ld', 'technical', 'JSON-LD syntax', invalidJson ? 'fail' : $('script[type="application/ld+json"]').length ? 'pass' : 'not_applicable', [`${$('script[type="application/ld+json"]').length} JSON-LD blocks; ${invalidJson} invalid among the first 100 parsed.`], 'Checks JSON syntax of declared structured data.', 'Correct malformed JSON, then validate the relevant schema against its vocabulary and rich-result requirements.', ['Does not validate schema meaning, required properties or eligibility.']);
  const resources = [
    ...elements('script[src]').map(el => ['Script', absolute($(el).attr('src')), `type=${$(el).attr('type') ?? 'classic'}; async=${$(el).attr('async') !== undefined}; defer=${$(el).attr('defer') !== undefined}`]),
    ...elements('link[rel]').filter(el => /\b(stylesheet|preload|modulepreload)\b/i.test($(el).attr('rel') ?? '')).map(el => [$(el).attr('rel') ?? 'link', absolute($(el).attr('href')), `as=${$(el).attr('as') ?? '—'}; media=${$(el).attr('media') ?? 'all'}`]),
  ];
  section('assets', 'Declared scripts & styles', ['Kind', 'URL', 'Attributes'], resources, 'Resource declarations in response HTML.', [`${$('script').length} script elements (${ $('script[src]').length } external declarations); ${$('style').length} inline style blocks.`, 'No asset downloads: total page weight, render-blocking delays, caching effectiveness and minification are not measured. Declarations do not equal browser request counts.']);
  section('video', 'Video & embed inventory', ['Element', 'Source', 'Details', 'HTML selector'], [
    ...elements('video').map(el => ['video', absolute($(el).attr('src') || $(el).find('source').first().attr('src')), `poster=${absolute($(el).attr('poster'))}; tracks=${$(el).find('track').length}; controls=${$(el).attr('controls') !== undefined}`, selector(el)]),
    ...elements('iframe').map(el => ['iframe', absolute($(el).attr('src')), `title=${clean($(el).attr('title')) || '(missing)'}`, selector(el)]),
  ], 'Declared video elements and iframes.', ['Presence of an iframe is not a failure. Embedded player contents, caption accuracy and video indexing are not verified.']);
  const controls = elements('input:not([type="hidden"]),select,textarea');
  const controlRows = controls.map(el => {
    const id = $(el).attr('id');
    const labels = elements('label').filter(label => id && $(label).attr('for') === id).map(label => clean($(label).text()));
    const inferred = $(el).attr('aria-label') || ($(el).attr('aria-labelledby') ? `aria-labelledby: ${$(el).attr('aria-labelledby')} (not resolved)` : '') || labels.join('; ') || clean($(el).closest('label').text()) || (/^(submit|reset|button)$/.test($(el).attr('type') ?? '') ? $(el).attr('value') || '(browser default button label)' : '');
    return [el.tagName, $(el).attr('type') ?? '—', inferred || '(no naming declaration found)', selector(el)];
  });
  section('forms', 'Form naming signals', ['Element', 'Type', 'Observed label signal', 'HTML selector'], controlRows, 'Static label association, wrapping labels and ARIA declaration inspection.', ['This is not a computed accessible name or a WCAG conformance test. Keyboard, contrast, focus and screen-reader behavior were not tested.']);
  const unnamedControls = controlRows.filter(row => row[2] === '(no naming declaration found)');
  add('accessibility.form-names', 'accessibility', 'Form label signals', !controls.length ? 'not_applicable' : unnamedControls.length ? 'warning' : 'pass', [`${unnamedControls.length} of ${controls.length} sampled controls lack a recognized naming declaration.`, ...unnamedControls.slice(0, 4).map(row => row[3])], 'Checks common HTML naming mechanisms for form controls.', 'Verify computed accessible names in a browser and associate descriptive labels with inputs.', ['Static heuristics do not prove accessibility.'], true);
  section('contact', 'Contact & freshness declarations', ['Kind', 'Value'], [
    ...linkRows.filter(row => /^(mailto:|tel:)/.test(row[1])).map(row => ['Contact link', row[1]]),
    ...elements('address').map(el => ['Address element', clean($(el).text())]),
    ...elements('time[datetime]').map(el => ['Time declaration', `${$(el).attr('datetime')} — ${clean($(el).text())}`]),
    ...elements('meta[name="author"],meta[property="article:published_time"],meta[property="article:modified_time"]').map(el => [$(el).attr('name') ?? $(el).attr('property') ?? '', clean($(el).attr('content'))]),
  ], 'Explicit contact/date/author markup only.', ['Presence does not verify business identity, authorship, freshness or trust. Google Business Profile and review data are not connected.']);
  const questions = headings.filter(el => /\?|^(how|what|why|when|where|who|can|does|is|are)\b/i.test(clean($(el).text())));
  section('answers', 'Question-heading signals', ['Heading', 'Text', 'HTML selector'], questions.map(el => [el.tagName, clean($(el).text()), selector(el)]), 'Question mark or English question-word heuristic.', ['No inference of answer quality, citations or AI visibility. Non-English question words are not classified.']);
  $('script,style,noscript,template,[hidden]').remove();
  const tokens = clean($('body').text()).toLocaleLowerCase('en').match(/[\p{L}\p{N}]{3,}/gu) ?? [];
  const stop = new Set('the and for that this with your you are from our not have has was will can all but more about into they their which when what how also'.split(' '));
  const frequency = new Map<string, number>();
  for (const token of tokens) if (!stop.has(token)) frequency.set(token, (frequency.get(token) ?? 0) + 1);
  const titleText = $('title').text().toLowerCase(); const description = $('meta[name="description"]').attr('content')?.toLowerCase() ?? '';
  const headingText = headings.map(el => $(el).text().toLowerCase()).join(' ');
  const hasTerm = (value: string, term: string) => Array.from(value.match(/[\p{L}\p{N}]{3,}/gu) ?? []).some(token => token === term) ? 'Yes' : 'No';
  section('terms', 'Frequent text terms', ['Term', 'Occurrences', 'In title', 'In description', 'In headings'], [...frequency].sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0])).slice(0, 30).map(([term, count]) => [term, String(count), hasTerm(titleText, term), hasTerm(description, term), hasTerm(headingText, term)]), 'Top 30 letter/number terms of at least three characters; a small English stop-word list is excluded.', ['Includes navigation/footer text, excludes script/style/hidden attributes. CSS visibility and rendered text are not known. Counts do not imply target keywords, search volume or ideal keyword density.']);
  return { sections, findings };
}
