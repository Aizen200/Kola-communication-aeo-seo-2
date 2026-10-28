# Website Audit Platform

The workspace is at **http://localhost:3000/audit**, on branch `audit`.

Enter a public webpage to collect actual HTTP/HTML evidence, inspect crawler files, review actionable findings, and download a PDF or JSON report. **There is no aggregate score, category score, letter grade or invented ranking estimate.** No generative AI service is called at runtime.

## What the report contains

- HTTP status, final HTTPS URL, redirect chain, selected response headers, measured response/download timing and HTML transfer bytes.
- Exact metadata with character counts, heading counts/outline, images, links, social metadata, structured-data declarations, scripts/styles, videos/embeds, form naming signals and explicit contact/date markup.
- Actual requests for robots.txt, one sitemap and llms.txt; parsed crawler policy and sitemap locations, with failures preserved as unknown.
- 21 findings on a successfully fetched HTML page, including contextual heuristics. Failed HTTP responses produce transport observations and unavailable HTML checks instead.
- Source URLs, timestamps, limitations, bounded inventories, priorities and filters. PDF and JSON are generated from the same report snapshot.

This is a **single static page plus three auxiliary files**, not a whole-site crawl. Lighthouse, CrUX, search rankings/traffic, backlinks, Google Business Profile, browser screenshots, complete accessibility and AI citations are **not measured**. The report lists the evidence/provider needed for each. The reference PDF informed the desired detail; its grades, claims, branding and results were not copied.

## Run and verify

Use Node 22 and npm (verified local runtime: 22.12.0):

```sh
npm ci
npm run dev
```

Open [localhost:3000/audit](http://localhost:3000/audit). Development binds to `127.0.0.1`. No database, Redis or paid API is required.

```sh
npm run check
npm run test:e2e
```

The check command runs lint, strict types and Node tests. Transport tests use controlled local HTTP servers; UI tests use fixture-derived reports. Browser tests require the app on port 3000 and installed Google Chrome. Stop dev before `npm run build` because both use `.next`. The inherited layout fetches Google fonts during a clean build.

## Access and downloads

Production auditing and PDF export require the same server-only `AUDIT_ACCESS_TOKEN` of 32–256 characters. See `.env.example`. Enter it in the production form; it remains in page memory and is sent as a bearer credential. This shared operator gate is not multi-user authentication.

`POST /api/audit` with JSON `{ "url": "https://example.com/" }` returns `{ "auditId": "...", "report": { "schemaVersion": 2, ... } }`.

`GET /api/audit/{auditId}/report` returns a PDF from the stored engine snapshot, without refetching the website. Snapshots are process-local, limited to 10 reports and 15 minutes, and disappear on restart/eviction. JSON downloads use the report already in the browser. Errors have `code` and `error`; all responses use `Cache-Control: no-store`.

Main fetch: 15 seconds, 2 MiB encoded/decoded, five redirects. Each auxiliary file: four seconds, 512 KiB encoded/decoded, two redirects. Handler: 35 seconds; client: 40 seconds. Admission: two active operations and ten starts/minute per process, shared by audits and PDF exports. PDF inventories contain at most 60 rows per section and 500 characters per cell, explicitly labeled; JSON retains all collected report rows.

Ship `public/fonts/KolaSans-Regular.otf` and `KolaSans-Bold.otf` with the server. PDFKit loads those local fonts; it never loads target HTML or remote assets. A multi-instance deployment needs shared authenticated storage/admission before report download IDs work reliably across instances. Nothing has been deployed.

## Reading order

1. [Engineering guide](docs/ENGINEERING_GUIDE.md): concepts, construction sequence, request flow, tradeoffs and debugging.
2. [Architecture](ARCHITECTURE.md): modules, contracts and boundaries.
3. [Audit rules](AUDIT_RULES.md): exact predicates and interpretation.
4. [Security](SECURITY.md): controls, budgets and deployment requirements.
5. [Implementation plan](IMPLEMENTATION_PLAN.md) and [project state](PROJECT_STATE.md): completed scope and remaining work.
