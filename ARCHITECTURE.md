# Architecture

One Next.js modular monolith. The browser presents evidence; Node collects and evaluates it. No runtime generative model, database, worker or external measurement provider is involved.

```mermaid
sequenceDiagram
  actor User
  participant UI as AuditSetup
  participant API as Audit API
  participant Transport as Pinned HTTP transport
  participant Engine as Parsers and rules
  participant Store as Bounded snapshot store
  User->>UI: Submit public URL
  UI->>API: POST JSON, optional operator token, cancellation
  API->>API: Access, admission, body and URL validation
  API->>Transport: GET page with DNS and IP policy
  Transport->>Transport: Revalidate every redirect, bound time and bytes
  Transport-->>Engine: Bytes, headers, timings, status and redirects
  Engine->>Engine: Extract observations and evaluate named checks
  Engine->>Transport: Bounded robots.txt and llms.txt requests
  Engine->>Transport: One selected same-origin sitemap request
  Engine->>Engine: Parse policy/XML; retain unknown outcomes
  Engine-->>API: Version 2 report without scores
  API->>Store: Retain snapshot for up to 15 minutes
  API-->>UI: Report and opaque audit ID
  UI-->>User: Findings, inventories and explicit coverage
  User->>API: GET report PDF with same access policy
  API->>Store: Read snapshot
  API-->>User: PDF rendered from plain-text data and local fonts
```

## Module responsibilities

Paths below are under `src/features/audit/` unless prefixed with `src/app/`.

| Module | Responsibility |
| --- | --- |
| `domain/parse-target.ts` | Browser-safe syntax normalization; never destination authorization |
| `domain/types.ts` | Versioned report, findings, evidence tables and resource outcomes |
| `domain/report-validation.ts` | Validate API result shape before React reads it; reject obsolete score fields |
| `domain/rule-catalog.ts` | Base rule IDs, severity and rule-set version; no scoring formula |
| `components/AuditSetup.tsx` | Form state, request cancellation, errors and token input |
| `components/AuditResults.tsx` | Status counts, priorities, filters, exports and coverage |
| `components/EvidenceInventory.tsx` | Plain-text tables with filtering, pagination and source notes |
| `server/access.ts` | Shared API/PDF origin and production-token enforcement |
| `server/admission.ts` | Bounded process-local concurrency and rolling start rate |
| `server/handle-audit.ts` | Bounded JSON reader, lifecycle, error mapping and snapshot creation |
| `server/transport/destination-policy.ts` | Cancellable DNS and public-address authorization |
| `server/transport/fetch-page.ts` | Numeric-IP connection, original Host/SNI, TLS, redirects, content modes, bounded decoding and counters |
| `server/extract-page.ts` | Observations for base checks; no network calls |
| `server/evaluate-page.ts` | Sixteen base predicates with explanation, action and limitations |
| `server/detailed-evidence.ts` | Bounded evidence inventories, JSON-LD syntax and form-label signals |
| `server/site-resources.ts` | Three auxiliary requests, robots policy, one sitemap and llms.txt observations |
| `server/run-audit.ts` | Compose findings, sources, timestamps, unmeasured capabilities and coverage |
| `server/report-store.ts` | Ten snapshots, 15-minute TTL, UUID IDs and 5 MiB serialized report cap |
| `server/render-report-pdf.ts` | Trusted PDF layout; local fonts, plain text, no network calls |
| `src/app/api/audit/route.ts` | Node POST adapter |
| `src/app/api/audit/[id]/report/route.ts` | Authenticated snapshot PDF download |

## Contracts and failure boundaries

`AuditReport.schemaVersion = 2` describes data shape. `ruleSetVersion = evidence-audit/2.0.0` describes interpretation. There are no score fields. A finding has an `assessment` of observation or heuristic. A table has source, method, rows, total count and limits. A resource has requested/final URL, HTTP status if known, observation time, retained bytes and observed/missing/unavailable outcome.

Main transport failures return an API error. An observed non-2xx page response returns transport findings with unavailable content checks. Auxiliary failures preserve the useful page report and produce unknown policy/check outcomes. Cancellation propagates and rejects the audit rather than publishing a cancelled run.

Server code is never imported by client components. HTML extraction cannot fetch discovered links. JSON-LD values are parsed as data, not code or verified facts. Sitemap entities/DTDs are rejected and no child URLs are fetched. PDF accepts only a stored engine snapshot, never an arbitrary client-supplied report or target URL.

## Deliberate tradeoffs

Static parsing gives predictable, inspectable evidence without executing target scripts. It cannot establish browser behavior. In-process snapshots avoid adding a database merely for download support, but are unsuitable for load-balanced persistent history. A fixed set of auxiliary resources increases useful coverage without introducing a crawl queue. A generic evidence-table contract lets UI, JSON and PDF present the same observations without independently recomputing them.

Timing measures one server request, not a user's browser. Counts are exact within the stated collection/sample boundary. Severity is a suggested work priority, not a search-engine weight. Future external adapters must add real provenance, timestamps and unavailable states rather than inventing replacements when data is missing.
