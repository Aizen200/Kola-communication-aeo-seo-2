# Project state

Updated 28 October 2026. Branch: `audit`. Workspace: http://localhost:3000/audit. Changes remain local and uncommitted.

## Current implementation

Schema 2 / `evidence-audit/2.0.0` replaces the former partial scoring rubric with real observations and explicit coverage. No aggregate/category score remains in engine output or UI.

- Secure pinned HTTP transport with original Host/SNI, all-answer DNS validation, bounded redirects/decompression and cancellation.
- Actual final-response header timing, body-completion timing and encoded/decoded byte counters.
- Sixteen base findings, JSON-LD syntax and form naming checks, plus robots/sitemap/llms findings on successful pages.
- Detailed metadata, headings, images, links, schema, social, assets, video, form, contact, term and crawler-file inventories.
- Three bounded auxiliary requests with observed/missing/unavailable semantics; one sitemap only, without recursion.
- Evidence tables, priorities, filters, explicit unmeasured capabilities, PDF and JSON export from the same report.
- Bounded process-local snapshots, shared production access policy for auditing/export, local-font PDF rendering.
- Updated engineering documentation with concepts, data flow, construction sequence, limitations and debugging.

## Verification

- `npm run check`: lint, strict type checking and **103 unit/integration tests passed**.
- `npm run test:e2e`: **14 desktop/mobile tests passed**, including evidence tables, JSON export and PDF expiry feedback.
- `npm run build`: passed with the audit POST and PDF GET routes.
- One live audit of `https://www.lite-stays.com/`: HTTP 200, 21 findings, 16 evidence sections, 7 image declarations and 28 links. No score fields. Crawler-file requests returned HTML and were explicitly unavailable, not treated as successful files.
- Actual local PDF endpoint returned HTTP 200 / application/pdf; its 43-page output was text-inspected and visually sampled. The report contains source observations and unmeasured capabilities, without `/100` grades.
- Saved live report inspected in Chrome at 1440px and 390px: no page errors or horizontal document overflow. Screenshots and verification artifacts are temporary files outside the repository.
- Production smoke check: `/audit` returned 200 with the access-token field; both anonymous audit and PDF endpoints returned 503 / AUDIT_DISABLED before target access.
- Documentation links and `git diff --check` passed. Development restored to port 3000.

These are observed checks of this implementation, not complete security/accessibility certification. Live timings and third-party content can change.

## Remaining capabilities

No multi-page crawl, broken-link validation, rendered screenshots, target JavaScript execution, Lighthouse/CrUX integration, rankings/traffic/backlinks provider, Business Profile data or observed AI citations. Static entity/contact/answer signals are not externally verified. The report explicitly lists what was not measured.

Snapshots are temporary and process-local. There are no accounts, database history, shared quotas, background jobs or deployment. Public operation still requires infrastructure egress controls, CPU isolation review, shared authorization/storage and dependency lifecycle review. PDF exports have disclosed row/cell limits and limited font coverage; they are not certified accessible PDFs.

Read [the engineering guide](docs/ENGINEERING_GUIDE.md) for the concepts and [the implementation plan](IMPLEMENTATION_PLAN.md) for subsequent increments.
