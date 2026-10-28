# Security model

## Current access boundary

Local development binds the Next.js server to `127.0.0.1` by default. The handler also expects a localhost request URL; that hostname check is a convenience guard, not proof of caller identity. Do not expose a development server to the Internet.

Production rejects audits unless `AUDIT_ACCESS_TOKEN` is configured with 32–256 characters and the request supplies the matching bearer credential. Digests are compared using `timingSafeEqual`. Tokens stay server-side except when an authorized operator manually supplies their credential in the production form. There are no public unauthenticated production audits.

Requests carrying an Origin must match this app's request origin. Native clients may omit Origin, but production authentication still applies. No `x-forwarded-for` value is trusted as client identity.

## Implemented controls

| Boundary | Control and source |
| --- | --- |
| Input | JSON content type, valid object/string shape, 4 KiB streamed body cap and five-second body deadline in `handle-audit.ts` |
| URL | HTTP(S), no credentials, standard protocol ports, bounded length and hostname checks |
| DNS | Fresh A and AAAA resolution per hop; all returned addresses classified; missing or failed resolution is explicit |
| Destination | `ipaddr.js` unicast classification plus conservative IPv6 `2000::/3` restrictions; private, loopback, link-local, mapped/transition, multicast, documentation and special-use ranges rejected |
| Cloud resources | Link-local and CGN ranges rejected; Azure's platform virtual address `168.63.129.16` explicitly denied |
| Rebinding | Connect to approved numeric IP; original hostname retained in Host/TLS SNI; remote socket address checked |
| TLS | Certificate verification remains enabled; no insecure TLS bypass |
| Redirects | Only standard redirect statuses followed, manually; destination and DNS revalidated, loop detection, at most five hops |
| HTTP headers | Fixed user-agent/Accept/encoding headers; no user cookies or credentials forwarded; 16 KiB response-header cap |
| Response body | HTML required for main page; text/Markdown for robots/llms and text/XML for sitemap; main encoded/decoded cap 2 MiB, auxiliary cap 512 KiB; gzip/deflate/Brotli decoded in bounded stream pipelines |
| Lifecycle | Fifteen-second total fetch deadline across DNS and hops; 35-second handler budget; cancellation aborts requests/resolvers and destroys streams |
| Admission | Two active audits/PDF exports and ten starts/minute per process; bounded timestamp storage; slots released in `finally`; retry guidance on rejection |
| Rendering | Extracted strings are rendered through React escaping; target HTML/scripts are never injected or executed |
| Errors | Stable codes and safe messages; unexpected internal exceptions do not expose stack traces or secrets |

The address/connection design applies the validation and network-boundary principles in the [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html). Microsoft's [platform-address documentation](https://learn.microsoft.com/azure/virtual-network/what-is-ip-address-168-63-129-16) explains why that additional address is denied.

## Resource and measurement limitations

A timer can abort asynchronous I/O, but cannot preempt synchronous Cheerio parsing on the Node event loop. The byte limit and two-operation gate bound normal work; this is not a CPU-isolated hostile-document sandbox. Extraction samples up to 2,000 images, 2,000 links and 500 headings and discloses sampling.

An incomplete response is an error, never silently truncated into supposedly complete evidence. Non-2xx response bodies are discarded: the engine can report the HTTP failure but cannot reliably evaluate the intended content. No robots.txt result or AI crawler access is inferred from missing evidence.

## Tests and what they establish

`destination-policy.test.ts` covers private/special-use addresses, mapped/transition IPv6, mixed answers, malformed inputs and cloud endpoints. `transport.test.ts` covers pinning options, per-hop DNS changes, unsafe redirects, loops, chain caps, total deadlines, cancellation, original Host, real local HTTP streaming, compression expansion, wrong content type, oversized bodies, slow headers/body and error-document handling.

`handler.test.ts` covers runtime request validation, body limits/deadline, origin handling, production token enforcement, rate/concurrency limits, slot cleanup and safe error responses. Engine fixtures and browser tests cover report semantics and rendering. These are concrete automated checks, not a claim of complete penetration testing or universal SSRF immunity.

## Required before public deployment

- Enforce network-level egress restrictions against internal services, platform endpoints and organization-specific addresses. These cannot be established from repository code and have not been deployed or verified here.
- Use HTTPS and a strong rotated operator credential. Shared-token access is not individual user authentication or audit ownership.
- Replace/augment the in-process gate with shared admission controls before running multiple instances. Restarting a process resets its budget.
- Review and update the inherited Node/framework/tooling versions and verify vulnerability remediation. The current build emits a transitive `punycode` warning.
- Avoid logging query strings, tokens and full target pages; use safe request IDs and bounded evidence. This implementation does not add raw response logging.
- Add per-user ownership and shared retention before introducing multi-user history. Current exports share the operator credential and process-local snapshots.

The app fetches the submitted page plus robots.txt, llms.txt and one selected sitemap (including bounded redirects). Each auxiliary request uses the same destination policy, a four-second deadline, two-redirect limit and 512 KiB encoded/decoded cap. Cross-origin sitemap declarations are not selected. No sitemap children, linked pages, target images or scripts are fetched.

XML DTD/entity declarations are rejected; entity processing is disabled. JSON-LD is parsed as data with bounded traversal. Detailed extraction queries inspect at most 200 matching elements, with 100 JSON-LD blocks. These limits bound ordinary parser work, not execution time in a separate worker process.

PDF export authenticates before lookup, renders only engine snapshots, uses the shared admission gate, and reads bundled local fonts. It performs no network access or target HTML execution. Inventories are bounded to 60 rows per section and 500 characters per cell. Snapshots are UUID-keyed, retained at most 15 minutes/10 reports/5 MiB per report and never accepted from the client. They can contain public-page contact details and query URLs; avoid auditing secret-bearing URLs. Reload/restart/eviction can invalidate a PDF download ID. Multi-instance persistence is not implemented.

A future target browser needs isolation and destination authorization for subresources and WebSockets, not only navigation. A timer cannot preempt synchronous parsing/PDF layout; public-scale operation requires CPU isolation, shared budgets and deployment egress controls.
