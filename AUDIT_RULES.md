# Audit rules and evidence

Schema 2; rule set `evidence-audit/2.0.0`. **No aggregate score, category score or letter grade is calculated.** The previous weighted rubric has been removed from code, API and UI.

## Status semantics

| Status | Meaning |
| --- | --- |
| Pass | Evidence satisfies this named predicate only |
| Fail | A directly observed requirement is violated |
| Warning | Contextual issue needing review; intentional configurations can be valid |
| Informational | Observation without an assumed requirement |
| Not applicable | No relevant subject for this check |
| Unable to verify | Required evidence was not available |

Each finding records ID, category, source URL, timestamp, evidence, action, severity, confidence and limitations. `assessment: heuristic` explicitly identifies interpretation that needs contextual review. Confidence concerns the stated observation, not predicted business or ranking outcomes. Priorities sort by severity; no scores are derived from status counts.

## Base rules

| Rule | Predicate and interpretation |
| --- | --- |
| HTTP status | Final 2xx passes; another terminal status fails. Availability of this request only. |
| HTTPS | Final URL uses HTTPS with certificate validation in transport. HTTP redirect enforcement is a separate unmeasured capability. |
| Redirect path | Informational list of observed hops. Loops/excess hops fail transport. |
| Indexing directives | Observed noindex/none warns. Absence passes the declaration check, not actual indexing. Crawler scope and intent require review. |
| Canonical | One usable HTTP(S), credential-free URL: same-origin passes; cross-origin warns. Missing warns; invalid/duplicate fails. Target is not fetched. |
| Viewport | Device-width declaration passes; otherwise warns. Heuristic, not a responsive layout test. |
| Title | One nonempty title passes; absent/empty fails; duplicates warn. No arbitrary character-length penalty. |
| Description | One nonempty description passes; otherwise warns. Search engines can rewrite snippets. |
| H1 | One nonempty H1 passes; otherwise warns. Organization heuristic, not a ranking factor assertion. |
| Heading order | Adjacent level gaps greater than one warn; no headings is inapplicable. Semantic structure requires review. |
| Image alt | Missing attribute fails; empty alt is accepted as declared decorative intent. Correctness is not verified. |
| Image dimensions | Positive integer width/height attributes pass; missing values warn. CSS can already reserve space; CLS is unmeasured. |
| Internal links | At least one same-origin link to another URL passes; absence warns. Heuristic; single-page sites may need none. |
| Link names | Extracted text/ARIA label/image alt is a limited naming signal. Missing names warn. Missing-alt overlap points to the image finding. Not a full accessible-name calculation. |
| HTML language | Nonempty lang passes. Tag correctness and actual content language are not validated. |
| Text count | Approximate whitespace-delimited tokens, informational. No minimum-word-count or quality penalty. |

Base extraction samples 2,000 images, 2,000 links and 500 headings. Findings show at most eight evidence strings of 400 characters. Complete normalized metadata values up to the separate inventory cell limit are available in the tables. Non-2xx documents are discarded; thirteen content-dependent base checks become unavailable.

## Added checks

| Rule | Evidence and outcome |
| --- | --- |
| JSON-LD syntax | JSON.parse on up to 100 blocks. Invalid JSON fails; valid JSON passes syntax only; no blocks is inapplicable. Not vocabulary or rich-result validation. |
| Form naming signals | Common label/wrapping-label/ARIA declarations on up to 200 controls. Missing recognized signal warns; no controls is inapplicable. Explicit heuristic; ARIA references and rendered names need browser verification. |
| robots.txt | Actual request and parsed policy for the exact audited URL. Googlebot disallow warns; allowed passes the policy check only. 404/410 is informational; other fetch failures are unavailable. Intentional exclusion is valid. |
| Sitemap | One selected same-origin declaration or `/sitemap.xml`. Well-formed populated urlset/sitemapindex and usable location syntax pass these checks. Invalid structure/locations warn; 404/410 is informational; transport failure is unavailable. No XSD validation, recursion or indexing inference. |
| llms.txt | Optional fetched text is informational; absence is not a failure. Retrieval problems are unavailable. No AI visibility claim. |

A successful page normally returns 21 findings. Missing subjects may be inapplicable. Additional evidence sections do not automatically add more failures.

## Inventories and measurement provenance

The report includes HTTP headers/counters, redirects, metadata and Unicode character counts, heading counts/outline, images, links, Open Graph/Twitter/social URLs, JSON-LD/microdata declarations, scripts/styles, video/iframe declarations, form signals, contact/date markup, question headings, top text terms, crawler policies and fetched crawler-file source/locations.

Detailed extraction queries inspect at most 200 matching elements, except 100 JSON-LD blocks. Complete element counts are retained for headings/images/links/forms/videos; totals in other sections describe matching sampled records. Tables retain at most 200 rows and 2,048 characters per cell, with truncation notes. PDF uses at most 60 rows/section and 500 characters/cell; JSON preserves all collected rows. Neither export includes the entire original HTML or every possible asset.

Response headers time includes final-request connection/TLS through headers, excluding DNS and earlier redirects. Download time extends that clock through decoded body completion. Encoded/decoded counters are actual final response-body bytes; they exclude HTTP/TLS headers, images, CSS and scripts. These are not browser load time, LCP, INP, CLS or Lighthouse scores.

Top terms are descriptive counts: Unicode letter/number runs of at least three characters, a small English stop-word list, top 30 terms. They include navigation/footer text and are not keyword rankings, search volume or recommended density. Question headings are an English-prefix/question-mark heuristic. Contact, author/date and schema values are declarations, not independently verified trust signals.

## Explicitly unmeasured

Lighthouse/mobile performance, CrUX field CWV, rankings/traffic/indexing, backlinks, business reviews, AI citations, browser screenshots, full accessibility, browser errors, broken links, full-site duplicates, HTTP-to-HTTPS enforcement and email DNS policy require additional data. The report lists these separately and never substitutes zero or a fabricated grade.
