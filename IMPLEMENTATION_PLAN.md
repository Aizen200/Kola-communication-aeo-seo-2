# Implementation plan

The current deliverable is a real single-page evidence report inspired by the detail of the supplied reference PDF. Its grades and externally sourced results are not reproduced. Work is on the `audit` branch.

| Capability | State | Remaining scope |
| --- | --- | --- |
| Foundation and `/audit` | Implemented | Maintain strict types, contracts and docs |
| Secure HTTP collection | Implemented | Verify infrastructure egress before public deployment |
| Deterministic findings | Implemented; 21 on successful HTML | Add only checks with explicit evidence and interpretation |
| Detailed inventories | Implemented | Rendered observations remain separate work |
| Crawler files | Implemented: robots, one sitemap, llms | Multi-page crawl queue, robots-aware scheduling, duplicate/broken-link analysis |
| Static AEO/GEO/video signals | Limited inventories implemented | Answer quality, entity truth, citations and rendered video behavior are not verified |
| Performance | Actual final HTTP timing/bytes | Lighthouse and field data provider integration |
| Results/export | Implemented: evidence tables, filters, PDF and JSON | PDF visual refinements and broader Unicode font coverage |
| Persistence | Bounded temporary snapshots only | Accounts, ownership, database history and multi-instance storage |
| Operations | Local admission/access controls | Shared rate limits, jobs, load tests, CPU isolation and deployment |

## Next engineering increments

1. Add an isolated browser measurement adapter or PageSpeed integration. Establish official API behavior, quotas, potential cost, provenance and failure semantics before calls. Lab measurements and field observations must remain distinct. Do not synthesize scores when data is unavailable.
2. Add a bounded crawl frontier with per-origin policy, deduplication, depth/page limits and cancellation. A robots declaration must not silently become crawl permission when retrieval failed. Define what a broken link means for redirects/auth/bot blocks.
3. Introduce durable reports only with account ownership, retention and shared storage. Queue jobs when execution duration and deployment constraints justify them.

For each increment, define contracts and resource budgets, use controlled success/failure/adversarial fixtures, implement server behavior, then UI and export presentation, and update the engineering guide. Existing report versions remain historical observations, not rewritten scores.
