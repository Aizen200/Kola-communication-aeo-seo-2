import { ruleDefinitions, type RuleId } from '../domain/rule-catalog';
import type { AuditFinding, FindingStatus } from '../domain/types';
import type { PageObservations } from './extract-page';
import type { FetchedPage } from './transport/fetch-page';

export function evaluatePage(page: FetchedPage, observations: PageObservations | null, observedAt: string): AuditFinding[] {
  const findings: AuditFinding[] = [];
  function add(id: RuleId, status: FindingStatus, evidence: string[], explanation: string, recommendedFix: string, limitations: string[] = []) {
    const rule = ruleDefinitions[id];
    findings.push({ ruleId: id, category: rule.category, checkName: rule.name, affectedUrl: page.finalUrl, status, severity: rule.severity,
      evidence: evidence.slice(0, 8).map((item) => item.slice(0, 400)), explanation, recommendedFix,
      assessment: ['on-page.h1', 'on-page.headings', 'on-page.image-dimensions', 'on-page.internal-links', 'on-page.anchor-text', 'technical.viewport'].includes(id) ? 'heuristic' : 'observation',
      confidence: limitations.length ? 'medium' : 'high', limitations, observedAt });
  }
  const ok = page.status >= 200 && page.status < 300;
  add('technical.http-status', ok ? 'pass' : 'fail', [`HTTP ${page.status}`], 'The response status describes whether this request reached a successful page.',
    ok ? 'Keep this URL available.' : 'Review the server response, access policy and bot protection for this URL.');
  add('technical.https', page.finalUrl.startsWith('https:') ? 'pass' : 'fail', [page.finalUrl], 'HTTPS protects the transport to the final page.', 'Serve the final page over valid HTTPS.');
  add('technical.redirects', 'informational', page.redirects.length ? page.redirects.map((hop) => `${hop.status}: ${hop.url} → ${hop.destination}`) : ['No redirects followed.'],
    'The observed redirect path is recorded for diagnosis.', 'Keep necessary redirects direct and avoid unnecessary hops.');
  if (!observations) {
    for (const id of Object.keys(ruleDefinitions) as RuleId[]) {
      if (findings.some((finding) => finding.ruleId === id)) continue;
      add(id, 'unable_to_verify', [`HTML was not evaluated because the response status was ${page.status}.`],
        'A non-success response is not reliable evidence about the intended page.', 'Resolve the HTTP response issue and run the audit again.');
    }
    return findings;
  }
  const o = observations;
  const noindex = o.robots.some((value) => /(?:^|[\s,:])(?:noindex|none)(?:$|[\s,])/i.test(value));
  add('technical.indexability', noindex ? 'warning' : 'pass', o.robots.length ? o.robots : ['No robots meta or X-Robots-Tag directive observed.'],
    'Checks the collected HTML and response headers for noindex or none directives.',
    noindex ? 'Confirm whether exclusion is intentional. Remove applicable noindex directives only if this page should be indexed.' : 'Review robots.txt and search-console evidence separately.',
    ['This does not verify actual indexing, robots.txt access or every crawler-specific directive. Intentional exclusions are valid.']);
  let canonical: URL | null = null;
  try { if (o.canonicals.length === 1 && o.canonicals[0].trim()) canonical = new URL(o.canonicals[0], o.baseUrl); } catch { /* invalid declaration */ }
  const validCanonical = canonical && ['http:', 'https:'].includes(canonical.protocol) && !canonical.username && !canonical.password;
  add('technical.canonical', !o.canonicals.length ? 'warning' : !validCanonical ? 'fail' : canonical?.origin !== new URL(page.finalUrl).origin ? 'warning' : 'pass',
    o.canonicals.length ? o.canonicals : ['No canonical link element found.'], 'Checks for one usable canonical declaration; the target is not fetched.',
    'Use one canonical URL that reflects the preferred version of the content.', ['A different canonical may be intentional. Search engines can select another canonical.']);
  add('technical.viewport', /(?:^|,)\s*width\s*=\s*device-width(?:\s*,|$)/i.test(o.viewport) ? 'pass' : 'warning', [o.viewport || 'No viewport meta found.'],
    'A device-width viewport is a useful mobile layout signal.', 'Use a device-width viewport and verify the page on mobile.', ['This does not measure responsive layout or mobile usability.']);
  add('on-page.title', !o.titles.some(Boolean) ? 'fail' : o.titles.length !== 1 ? 'warning' : 'pass', o.titles.length ? o.titles : ['No title element found.'],
    'Checks for one nonempty title element.', 'Provide one descriptive title specific to this page.');
  add('on-page.description', o.descriptions.length === 1 && o.descriptions[0] ? 'pass' : 'warning', o.descriptions.length ? o.descriptions : ['No meta description found.'],
    'Checks for one nonempty description; it does not predict the search snippet.', 'Write one useful page-specific meta description.');
  const h1 = o.headings.filter((heading) => heading.level === 1 && heading.text);
  add('on-page.h1', h1.length === 1 ? 'pass' : 'warning', [`${h1.length} nonempty H1 headings`, ...h1.map((heading) => heading.text)],
    'A clear main heading helps describe the page topic.', 'Review whether the main content has a clear primary heading.', ['Heading counts are a content-organization heuristic, not a guaranteed ranking factor.']);
  const jumps = o.headings.filter((heading, index) => index > 0 && heading.level > o.headings[index - 1].level + 1);
  add('on-page.headings', !o.headings.length ? 'not_applicable' : jumps.length ? 'warning' : 'pass', jumps.length ? jumps.map((heading) => `Skipped level before H${heading.level}: ${heading.text}`) : [`${o.headings.length} headings; no upward level gaps observed.`],
    'Checks adjacent headings for jumps such as H2 to H4.', 'Use heading levels that reflect the content hierarchy.', ['Automated structure heuristics do not establish semantic quality.']);
  const missingAlt = o.images.filter((image) => image.alt === null);
  add('on-page.image-alt', !o.images.length ? 'not_applicable' : missingAlt.length ? 'fail' : 'pass', [`${missingAlt.length} of ${o.images.length} sampled images lack an alt attribute.`, ...missingAlt.slice(0, 5).map((image) => image.src || '(no src)')],
    'Checks presence of alt attributes. Empty alt is accepted for declared decorative images.', 'Describe informative images; use alt="" only for decorative images.', ['Alt-text correctness and decorative intent require human review.']);
  const missingDimensions = o.images.filter((image) => !/^[1-9]\d*$/.test(image.width) || !/^[1-9]\d*$/.test(image.height));
  add('on-page.image-dimensions', !o.images.length ? 'not_applicable' : missingDimensions.length ? 'warning' : 'pass', [`${missingDimensions.length} of ${o.images.length} sampled images lack positive width/height attributes.`],
    'Explicit dimensions can reserve space before images load.', 'Declare intrinsic dimensions or reserve space with CSS and verify layout stability.', ['CSS may already reserve space. No image bytes or layout shifts were measured.']);
  const internal = o.links.filter((link) => new URL(link.url).origin === new URL(page.finalUrl).origin && link.url !== page.finalUrl);
  add('on-page.internal-links', internal.length ? 'pass' : 'warning', [`${internal.length} same-origin links to another URL observed.`],
    'Internal links can help users and crawlers discover related pages.', 'Add relevant contextual links when other pages would help readers.', ['A single-page site may not need other internal links. Link destinations were not fetched.']);
  const unnamed = o.links.filter((link) => !link.text);
  const independentUnnamed = unnamed.filter((link) => !link.missingImageAlt);
  add('on-page.anchor-text', !o.links.length ? 'not_applicable' : independentUnnamed.length ? 'warning' : unnamed.length ? 'informational' : 'pass',
    [`${unnamed.length} of ${o.links.length} sampled HTTP links have no extracted name.`, `${unnamed.length - independentUnnamed.length} overlap with missing image alt attributes; review the image-alt finding for the shared cause.`, ...unnamed.slice(0, 5).map((link) => link.url)],
    'Checks link text, aria-label and the first nested image alt as a limited naming signal.', 'Give links descriptive visible text or an appropriate accessible name.', ['This is not a complete accessible-name computation; aria-labelledby and other mechanisms need review.']);
  add('on-page.language', o.lang ? 'pass' : 'warning', [o.lang || 'No HTML lang attribute found.'],
    'Checks for a language declaration on the root element.', 'Set html lang to the appropriate language tag.', ['Presence does not validate the tag or the language of the content.']);
  add('on-page.content', 'informational', [`Approximately ${o.wordCount} whitespace-delimited text tokens in the HTML.`],
    'Reports text available before JavaScript execution; there is no minimum-word-count score.', 'If key content is missing from the response, review server rendering and hydration.',
    ['Does not measure content quality, factual accuracy, rendered visibility or topic completeness. Tokenization varies by language.']);
  return findings;
}
