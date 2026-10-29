'use client';

import React, { useState } from 'react';
import Arrow from './Arrow';

// Website audit: "Does ChatGPT know your business?" Scores a website on AI crawler
// access, schema and llms.txt, shows gaps against a competitor, and hands off to WhatsApp.

const WHATSAPP_NUMBER = '918928984774'; // +91-8928984774, from kolacommunications.com

const categories = [
  {
    id: 'crawlers',
    no: '01',
    title: 'AI crawler access',
    description:
      'Whether GPTBot, ChatGPT, ClaudeBot, PerplexityBot and Gemini are allowed in your robots.txt, can reach your website, and can read your content without JavaScript.',
  },
  {
    id: 'schema',
    no: '02',
    title: 'Schema',
    description:
      'Schema markup is code added to your website that tells search engines and AI tools what type of content is on the page.',
  },
  {
    id: 'llms',
    no: '03',
    title: 'llms.txt',
    description:
      'A plain-text file at yourdomain.com/llms.txt that summarises your business and key pages for AI tools.',
  },
] as const;

type CategoryId = (typeof categories)[number]['id'];
type Item = { id: string; label: string; pass: boolean; detail: string };
type Category = { id: CategoryId; score: number; items: Item[] };
type SiteResult = { url: string; score: number; categories: Category[] };
type AuditResponse = { site: SiteResult; competitor: SiteResult | null };

const GOOD = '#3FA06B';
const scoreColor = (n: number) => (n >= 80 ? GOOD : n >= 50 ? '#F2C14E' : '#FF5A2C');
const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

function ScoreRing({ value, label }: { value: number; label?: string }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="96" height="96" viewBox="0 0 96 96" role="img" aria-label={`${label ?? 'Score'}: ${value} out of 100`}>
        <circle cx="48" cy="48" r={r} fill="none" stroke="#3a3a3a" strokeWidth="9" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke={scoreColor(value)}
          strokeWidth="9"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          transform="rotate(-90 48 48)"
        />
        <text x="48" y="54" textAnchor="middle" fontSize="28" fill="#FFFFFF" style={{ fontFamily: 'var(--font-display)' }}>
          {value}
        </text>
        <text x="48" y="70" textAnchor="middle" fontSize="10" fill="#FFFFFF" opacity="0.6">
          /100
        </text>
      </svg>
      {label && <span className="kicker max-w-[130px] truncate text-[10px] text-white/70">{label}</span>}
    </div>
  );
}

function StatusIcon({ state }: { state: 'pass' | 'partial' | 'fail' }) {
  const styles = {
    pass: { bg: GOOD, mark: '✓' },
    partial: { bg: '#F2C14E', mark: '!' },
    fail: { bg: '#FF5A2C', mark: '✕' },
  }[state];
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-ink"
      style={{ background: styles.bg }}
    >
      {styles.mark}
    </span>
  );
}

const categoryState = (score: number) => (score >= 80 ? 'pass' : score >= 40 ? 'partial' : 'fail');

function whatsappLink(site: SiteResult, gaps: Item[], competitor: SiteResult | null) {
  const failing = gaps.length ? gaps : site.categories.flatMap((c) => c.items).filter((i) => !i.pass);
  const lines = [
    `Hi Kola Communications, I checked ${hostOf(site.url)} on "Does ChatGPT know your business?" and scored ${site.score}/100.`,
    competitor ? `My competitor ${hostOf(competitor.url)} scored ${competitor.score}/100.` : '',
    failing.length ? `Gaps: ${failing.slice(0, 6).map((i) => i.label).join('; ')}.` : '',
    'Please fix this for me.',
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function WebsiteAudit() {
  const [url, setUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url, competitor: competitorUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const site = result?.site;
  const rival = result?.competitor ?? null;
  const rivalItems = new Map((rival?.categories.flatMap((c) => c.items) ?? []).map((i) => [i.id, i]));
  // Gaps: checks your competitor passes and you fail
  const gaps = site ? site.categories.flatMap((c) => c.items).filter((i) => !i.pass && rivalItems.get(i.id)?.pass) : [];

  return (
    <section id="audit" className="section relative overflow-hidden border-y border-line bg-sand">
      <div aria-hidden="true" className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-orange/30 blur-[110px]" />
      <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="label">(04) Website audit</span>
          <h2 className="h-section">Does ChatGPT know your business?</h2>
          <p className="mt-7 max-w-[520px] text-[18px] leading-relaxed text-muted">
            When ChatGPT answers a question and attributes the information to your website by name, that is a brand signal that is difficult to manufacture any other way.
          </p>

          <p className="mt-10 text-[13px] font-bold uppercase tracking-[0.2em] text-muted">Enter your website. Get a score for:</p>
          <ol className="mt-5 border-t border-line">
            {categories.map((cat) => {
              const mine = site?.categories.find((c) => c.id === cat.id)?.score;
              const theirs = rival?.categories.find((c) => c.id === cat.id)?.score;
              return (
                <li key={cat.id} className="flex items-center gap-5 border-b border-line py-4">
                  <span className="display w-8 shrink-0 text-[15px] tracking-normal text-orange">{cat.no}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[19px] font-bold tracking-[-0.015em]">{cat.title}</h3>
                      {mine !== undefined && (
                        <span className="text-[14px] font-bold">
                          You {mine}/100{theirs !== undefined && <span className="font-normal"> · Competitor {theirs}/100</span>}
                        </span>
                      )}
                    </div>
                                      </div>
                </li>
              );
            })}
          </ol>

          {site && (
            <div className="mt-10 space-y-6">
              {categories.map((cat) => {
                const mine = site.categories.find((c) => c.id === cat.id);
                if (!mine) return null;
                return (
                  <div key={cat.id}>
                    <div className="kicker mb-3 text-[11px] text-muted">{cat.title}</div>
                    <ul className="space-y-2">
                      {mine.items.map((item) => {
                        const theirs = rivalItems.get(item.id);
                        return (
                          <li key={item.id} className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[14px]">
                            <StatusIcon state={item.pass ? 'pass' : 'fail'} />
                            <span className="min-w-0 flex-1">
                              <span className="font-bold">{item.label}</span>
                              <span className="sr-only">{item.pass ? ' passed' : ' failed'}</span>
                              <span className="block break-words text-[13px] text-muted">{item.detail}</span>
                            </span>
                            {theirs && (
                              <span className="kicker shrink-0 text-[10px]" title={theirs.detail}>
                                Competitor {theirs.pass ? '✓' : '✕'}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-8 lg:sticky lg:top-28">
          <div className="card p-7 sm:p-9">
            <div className="kicker text-[11px] text-muted">Free website audit</div>
            <h3 className="display mt-4 text-[32px] sm:text-[40px]">Does ChatGPT know your business?</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Check your AI crawler access, schema and llms.txt, and see your gaps against a competitor.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="audit-url" className="mb-2 block text-[14px] font-bold">
                  Your website <span aria-hidden="true">*</span>
                </label>
                <input
                  id="audit-url"
                  type="text"
                  inputMode="url"
                  required
                  placeholder="yourdomain.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="field-box"
                />
              </div>
              <div>
                <label htmlFor="audit-competitor" className="mb-2 block text-[14px] font-bold">
                  Competitor website <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="audit-competitor"
                  type="text"
                  inputMode="url"
                  placeholder="competitor.com"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  className="field-box"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-dark w-full justify-between py-4 disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? 'Running audit…' : 'Run Website Audit'} <Arrow />
              </button>
              {loading && (
                <p className="text-[13px] text-muted" aria-live="polite">
                  Checking robots.txt, AI crawler access, schema and llms.txt…
                </p>
              )}
              {error && (
                <p className="rounded-[3px] bg-orange px-3 py-2 text-[14px] font-bold" role="alert">
                  {error}
                </p>
              )}
            </form>
          </div>

          <div className="rounded-2xl bg-ink p-7 text-white shadow-float sm:p-8" aria-live="polite">
            {!site ? (
              <>
                <div className="kicker text-[11px] text-white/70">Sample report preview, not a real site</div>
                <div className="mt-5 flex items-center gap-6">
                  <ScoreRing value={72} />
                  <ul className="space-y-3 text-[15px]">
                    <li className="flex items-center gap-3">
                      <StatusIcon state="pass" /> AI crawler access: allowed
                    </li>
                    <li className="flex items-center gap-3">
                      <StatusIcon state="partial" /> Schema: partly missing
                    </li>
                    <li className="flex items-center gap-3">
                      <StatusIcon state="fail" /> llms.txt: not found
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="kicker text-[11px] text-white/70">Your report</div>
                <div className="mt-5 flex flex-wrap items-start justify-around gap-6">
                  <ScoreRing value={site.score} label={hostOf(site.url)} />
                  {rival && <ScoreRing value={rival.score} label={hostOf(rival.url)} />}
                </div>
                <ul className="mt-6 space-y-3 text-[15px]">
                  {categories.map((cat) => {
                    const score = site.categories.find((c) => c.id === cat.id)?.score ?? 0;
                    return (
                      <li key={cat.id} className="flex items-center gap-3">
                        <StatusIcon state={categoryState(score)} /> {cat.title}: {score}/100
                      </li>
                    );
                  })}
                </ul>

                {rival && (
                  <div className="mt-6 border-t border-white/25 pt-5">
                    <div className="kicker text-[11px] text-orange">Your gaps vs {hostOf(rival.url)}</div>
                    {gaps.length ? (
                      <ul className="mt-3 space-y-2 text-[14px]">
                        {gaps.map((g) => (
                          <li key={g.id} className="flex items-start gap-3">
                            <StatusIcon state="fail" /> {g.label}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-[14px] text-white/75">Your competitor passes nothing that you fail.</p>
                    )}
                  </div>
                )}

                <a
                  className="btn mt-7 w-full justify-between bg-[#25D366] text-ink hover:bg-white"
                  href={whatsappLink(site, gaps, rival)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fix this for me
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
                  </svg>
                </a>
                <p className="mt-2 text-center text-[12px] text-white/60">Opens WhatsApp with your report summary.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
