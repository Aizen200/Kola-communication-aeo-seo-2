import { NextResponse } from 'next/server';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

// Website audit: "Does ChatGPT know your business?"
// Scores a website on three things: AI crawler access, schema, and llms.txt.
// Optionally audits a competitor too, so the UI can show the gaps.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BROWSER_UA = 'Mozilla/5.0 (compatible; KolaWebsiteAudit/1.0; +https://kolacommunications.com)';
const GPTBOT_UA = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)';
const MAX_HTML_BYTES = 3_000_000;
const FETCH_TIMEOUT_MS = 12_000;

// AI crawlers that decide whether ChatGPT, Claude, Perplexity and Gemini can read a site.
const AI_BOTS = [
  { token: 'gptbot', label: 'GPTBot (OpenAI)' },
  { token: 'oai-searchbot', label: 'OAI-SearchBot (ChatGPT search)' },
  { token: 'chatgpt-user', label: 'ChatGPT-User (ChatGPT browsing)' },
  { token: 'claudebot', label: 'ClaudeBot (Anthropic)' },
  { token: 'perplexitybot', label: 'PerplexityBot (Perplexity)' },
  { token: 'google-extended', label: 'Google-Extended (Gemini)' },
];

// Schema types that identify the business itself (Organization and common subtypes).
const ORG_TYPES = [
  'organization', 'corporation', 'localbusiness', 'professionalservice', 'financialservice', 'store',
  'onlinestore', 'onlinebusiness', 'medicalorganization', 'educationalorganization', 'ngo',
  'realestateagent', 'homeandconstructionbusiness', 'legalservice', 'accountingservice', 'manufacturer',
];

type Item = { id: string; label: string; pass: boolean; detail: string };
type Category = { id: 'crawlers' | 'schema' | 'llms'; score: number; items: Item[] };
type SiteResult = { url: string; score: number; categories: Category[] };

class AuditError extends Error {}

// ---------- SSRF protection: only public http(s) hosts ----------

function isPrivateIp(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  const v6 = ip.toLowerCase();
  if (v6.startsWith('::ffff:')) return isPrivateIp(v6.slice(7));
  return v6 === '::' || v6 === '::1' || /^f[cd]/.test(v6) || /^fe[89ab]/.test(v6);
}

async function assertPublicUrl(url: URL) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new AuditError('Only http and https websites can be checked.');
  if (url.port && url.port !== '80' && url.port !== '443') throw new AuditError('Only standard web ports can be checked.');
  if (url.username || url.password) throw new AuditError('URLs with credentials are not allowed.');
  const host = url.hostname.replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) throw new AuditError('This address cannot be checked.');
  const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (!addrs.length || addrs.some((a) => isPrivateIp(a.address))) throw new AuditError('This address cannot be checked.');
}

// Follows redirects manually so every hop is re-checked against private addresses.
async function safeFetch(start: URL, ua = BROWSER_UA, timeoutMs = FETCH_TIMEOUT_MS) {
  let url = start;
  for (let hop = 0; hop < 5; hop++) {
    await assertPublicUrl(url);
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'user-agent': ua, accept: 'text/html,text/plain,text/markdown,*/*;q=0.8' },
      signal: AbortSignal.timeout(timeoutMs),
      cache: 'no-store',
    });
    const loc = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && loc) {
      url = new URL(loc, url);
      continue;
    }
    return { res, finalUrl: url };
  }
  throw new AuditError('Too many redirects.');
}

async function readText(res: Response, limit = MAX_HTML_BYTES): Promise<string> {
  if (!res.body) return '';
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

async function fetchOptionalText(url: URL, limit: number) {
  try {
    const { res } = await safeFetch(url, BROWSER_UA, 8_000);
    return { status: res.status, type: res.headers.get('content-type') || '', text: res.ok ? await readText(res, limit) : '' };
  } catch {
    return { status: 0, type: '', text: '' };
  }
}

// ---------- Basic per-IP rate limit (best effort, per server instance) ----------

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 10;
}

// ---------- Helpers ----------

const visibleText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Parses robots.txt into user-agent groups and reports whether `token` may crawl "/".
function parseRobots(robots: string) {
  const groups: { agents: string[]; rules: { allow: boolean; path: string }[] }[] = [];
  let current: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const val = line.slice(idx + 1).trim();
    if (key === 'user-agent') {
      if (!lastWasAgent || !current) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (current && (key === 'allow' || key === 'disallow')) current.rules.push({ allow: key === 'allow', path: val });
    }
  }
  return (token: string) => {
    const specific = groups.filter((g) => g.agents.some((a) => a !== '*' && token.includes(a)));
    const applicable = specific.length ? specific : groups.filter((g) => g.agents.includes('*'));
    const rules = applicable.flatMap((g) => g.rules).filter((r) => r.path && '/'.startsWith(r.path.replace(/\*$/, '')));
    if (!rules.length) return { allowed: true, explicit: specific.length > 0 };
    // Longest matching rule wins; Allow wins ties.
    rules.sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
    return { allowed: rules[0].allow, explicit: specific.length > 0 };
  };
}

function schemaTypes(html: string): string[] {
  const types = new Set<string>();
  const blocks = Array.from(html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)).map((m) => m[1]);
  for (const block of blocks) {
    for (const m of Array.from(block.matchAll(/"@type"\s*:\s*(\[[^\]]*\]|"[^"]+")/g))) {
      for (const t of Array.from(m[1].matchAll(/"([^"]+)"/g))) types.add(t[1]);
    }
  }
  for (const m of Array.from(html.matchAll(/itemtype=["']https?:\/\/schema\.org\/([A-Za-z]+)["']/gi))) types.add(m[1]);
  return Array.from(types);
}

// ---------- Audit one site ----------

async function auditSite(input: string): Promise<SiteResult> {
  let target: URL;
  try {
    target = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    throw new AuditError(`"${input}" is not a valid website address.`);
  }

  let page;
  try {
    page = await safeFetch(target);
  } catch (err) {
    if (err instanceof AuditError) throw err;
    throw new AuditError(`We could not reach ${target.hostname}. Please check the address.`);
  }
  if (!page.res.ok) throw new AuditError(`${target.hostname} responded with status ${page.res.status}.`);
  const html = await readText(page.res);
  const origin = page.finalUrl.origin;

  const [robotsRes, llmsRes, gptbotStatus] = await Promise.all([
    fetchOptionalText(new URL('/robots.txt', origin), 200_000),
    fetchOptionalText(new URL('/llms.txt', origin), 200_000),
    safeFetch(page.finalUrl, GPTBOT_UA, 10_000).then((r) => r.res.status).catch(() => 0),
  ]);

  // 1. AI crawler access
  const robotsText = robotsRes.status === 200 && !/^\s*</.test(robotsRes.text) ? robotsRes.text : '';
  const canCrawl = parseRobots(robotsText);
  const botItems: Item[] = AI_BOTS.map((bot) => {
    const r = canCrawl(bot.token);
    return {
      id: `bot-${bot.token}`,
      label: bot.label,
      pass: r.allowed,
      detail: r.allowed
        ? r.explicit ? 'Allowed in robots.txt' : 'Not blocked in robots.txt'
        : 'Blocked in robots.txt',
    };
  });
  const firewallOk = gptbotStatus >= 200 && gptbotStatus < 400;
  const words = visibleText(html).split(' ').filter((w) => /[a-z]{2,}/i.test(w)).length;
  const readable = words >= 150;
  const crawlerItems: Item[] = [
    ...botItems,
    {
      id: 'firewall',
      label: 'Website responds to AI crawlers',
      pass: firewallOk,
      detail: firewallOk
        ? `Homepage returned ${gptbotStatus} to a GPTBot request`
        : gptbotStatus ? `Homepage returned ${gptbotStatus} to a GPTBot request (likely blocked by a firewall)` : 'Homepage did not respond to a GPTBot request',
    },
    {
      id: 'readable',
      label: 'Content readable without JavaScript',
      pass: readable,
      detail: readable
        ? `${words} words of text in the page HTML`
        : `Only ${words} words in the page HTML. AI crawlers do not run JavaScript, so they see almost no content.`,
    },
  ];
  const botShare = botItems.filter((i) => i.pass).length / botItems.length;
  const crawlerScore = Math.round((botShare * 0.5 + (firewallOk ? 0.25 : 0) + (readable ? 0.25 : 0)) * 100);

  // 2. Schema
  const types = schemaTypes(html);
  const lower = types.map((t) => t.toLowerCase());
  const hasAny = types.length > 0;
  const hasOrg = lower.some((t) => ORG_TYPES.includes(t));
  const hasFaq = lower.includes('faqpage');
  const schemaItems: Item[] = [
    {
      id: 'schema-any',
      label: 'Structured data (schema) on the homepage',
      pass: hasAny,
      detail: hasAny ? `Found: ${types.slice(0, 8).join(', ')}${types.length > 8 ? '…' : ''}` : 'No JSON-LD or microdata found',
    },
    {
      id: 'schema-org',
      label: 'Organization / LocalBusiness schema',
      pass: hasOrg,
      detail: hasOrg ? 'Your business is described as an entity AI can identify' : 'No Organization or LocalBusiness schema found',
    },
    {
      id: 'schema-faq',
      label: 'FAQPage schema',
      pass: hasFaq,
      detail: hasFaq ? 'Questions and answers are marked up for AI answers' : 'No FAQPage schema found',
    },
  ];
  const schemaScore = Math.round(((hasAny ? 0.3 : 0) + (hasOrg ? 0.35 : 0) + (hasFaq ? 0.35 : 0)) * 100);

  // 3. llms.txt
  const llmsExists = llmsRes.status === 200 && llmsRes.text.trim().length > 0 && !/^\s*</.test(llmsRes.text);
  const llmsValid = llmsExists && /^\s*#\s+\S/.test(llmsRes.text);
  const llmsItems: Item[] = [
    {
      id: 'llms-exists',
      label: 'llms.txt file',
      pass: llmsExists,
      detail: llmsExists ? `Found at ${origin}/llms.txt` : `No llms.txt at ${origin}/llms.txt`,
    },
    {
      id: 'llms-format',
      label: 'llms.txt follows the standard format',
      pass: llmsValid,
      detail: llmsValid ? 'Starts with a "# Title" heading' : llmsExists ? 'File should start with a "# Title" heading' : 'Add an llms.txt that summarises your business for AI tools',
    },
  ];
  const llmsScore = llmsValid ? 100 : llmsExists ? 50 : 0;

  const score = Math.round(crawlerScore * 0.4 + schemaScore * 0.35 + llmsScore * 0.25);
  return {
    url: page.finalUrl.toString(),
    score,
    categories: [
      { id: 'crawlers', score: crawlerScore, items: crawlerItems },
      { id: 'schema', score: schemaScore, items: schemaItems },
      { id: 'llms', score: llmsScore, items: llmsItems },
    ],
  };
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many audits. Please wait a minute and try again.' }, { status: 429 });
  }

  let body: { url?: unknown; competitor?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    /* handled below */
  }
  const url = String(body.url || '').trim();
  const competitor = String(body.competitor || '').trim();
  if (!url || url.length > 300 || competitor.length > 300) {
    return NextResponse.json({ error: 'Please enter your website address.' }, { status: 400 });
  }

  try {
    const [site, rival] = await Promise.all([auditSite(url), competitor ? auditSite(competitor) : Promise.resolve(null)]);
    return NextResponse.json({ site, competitor: rival });
  } catch (err) {
    const message = err instanceof AuditError ? err.message : 'Something went wrong while checking. Please try again.';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
