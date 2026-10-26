'use client';

import React, { useState } from 'react';

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

const scoreColor = (n: number) => (n >= 80 ? '#2f6b4f' : n >= 50 ? '#b7791f' : '#c0392b');
const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="88" height="88" viewBox="0 0 88 88" role="img" aria-label={`${label}: ${value} out of 100`}>
        <circle cx="44" cy="44" r={r} fill="none" stroke="#e6ede4" strokeWidth="8" />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke={scoreColor(value)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          transform="rotate(-90 44 44)"
        />
        <text x="44" y="50" textAnchor="middle" fontSize="22" fontWeight="700" fill="#202824">
          {value}
        </text>
      </svg>
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted max-w-[120px] truncate">{label}</span>
    </div>
  );
}

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
    <section id="audit" className="section audit bg-paper border-t border-line-subtle">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 04 / WEBSITE AUDIT
            </div>
            <h2>
              Does ChatGPT know
              <br />
              your business?
            </h2>
          </div>
          <p>
            When ChatGPT answers a question and attributes the information to your website by name, that is a brand signal that is difficult to manufacture any other way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-[24px] font-bold text-ink tracking-tight mb-4">
              Enter your website. Get a score for:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {categories.map((cat) => {
                const mine = site?.categories.find((c) => c.id === cat.id)?.score;
                const theirs = rival?.categories.find((c) => c.id === cat.id)?.score;
                return (
                  <div key={cat.id} className="p-6 rounded-lg bg-wash border border-line-subtle flex flex-col">
                    <span className="text-[12px] font-bold text-green mb-2 block">{cat.no}</span>
                    <h4 className="text-[17px] font-bold text-ink mb-2 leading-snug">{cat.title}</h4>
                    <p className="text-[13px] text-muted leading-relaxed">{cat.description}</p>
                    {mine !== undefined && (
                      <div className="mt-4 pt-3 border-t border-line text-[12px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted">You</span>
                          <b style={{ color: scoreColor(mine) }}>{mine}/100</b>
                        </div>
                        {theirs !== undefined && (
                          <div className="flex justify-between">
                            <span className="text-muted">Competitor</span>
                            <b style={{ color: scoreColor(theirs) }}>{theirs}/100</b>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {site && (
              <div className="space-y-4">
                {categories.map((cat) => {
                  const mine = site.categories.find((c) => c.id === cat.id);
                  if (!mine) return null;
                  return (
                    <div key={cat.id}>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-ink mb-2">{cat.title}</div>
                      <ul className="space-y-2">
                        {mine.items.map((item) => {
                          const theirs = rivalItems.get(item.id);
                          return (
                            <li
                              key={item.id}
                              className="flex items-start gap-3 bg-wash border border-line-subtle rounded px-3 py-2.5 text-[13px]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-0.5 shrink-0 font-bold"
                                style={{ color: item.pass ? '#2f6b4f' : '#c0392b' }}
                              >
                                {item.pass ? '✓' : '✗'}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="text-ink">{item.label}</span>
                                <span className="sr-only">{item.pass ? ' passed' : ' failed'}</span>
                                <span className="block text-[12px] text-muted break-words">{item.detail}</span>
                              </span>
                              {theirs && (
                                <span
                                  className="shrink-0 text-[11px] font-bold uppercase tracking-wider"
                                  style={{ color: theirs.pass ? '#2f6b4f' : '#c0392b' }}
                                  title={theirs.detail}
                                >
                                  Competitor {theirs.pass ? '✓' : '✗'}
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

          <div className="lg:col-span-5 bg-wash p-8 sm:p-10 rounded-lg border border-line-subtle shadow-sm">
            <div className="eyebrow text-green mb-3">
              <i className="dot"></i> FREE WEBSITE AUDIT
            </div>
            <h3 className="text-[22px] font-bold text-ink mb-2">Does ChatGPT know your business?</h3>
            <p className="text-[13px] text-muted mb-6">
              Check your AI crawler access, schema and llms.txt, and see your gaps against a competitor.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="audit-url" className="block text-[12px] font-bold text-ink mb-1">
                  Your website <span className="text-red-600">*</span>
                </label>
                <input
                  id="audit-url"
                  type="text"
                  inputMode="url"
                  required
                  placeholder="yourdomain.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="audit-competitor" className="block text-[12px] font-bold text-ink mb-1">
                  Competitor website <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  id="audit-competitor"
                  type="text"
                  inputMode="url"
                  placeholder="competitor.com"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full button justify-between bg-green text-white disabled:opacity-60 disabled:cursor-wait"
              >
                <span>{loading ? 'Running audit…' : 'Run Website Audit'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                  <use href="#arrow-up" />
                </svg>
              </button>
              {loading && (
                <p className="text-[12px] text-muted" aria-live="polite">
                  Checking robots.txt, AI crawler access, schema and llms.txt…
                </p>
              )}
              {error && (
                <p className="text-[13px] text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2" role="alert">
                  {error}
                </p>
              )}
            </form>

            {site && (
              <div className="mt-6 pt-6 border-t border-line" aria-live="polite">
                <div className="flex items-start justify-around gap-4 mb-5">
                  <ScoreRing value={site.score} label={hostOf(site.url)} />
                  {rival && <ScoreRing value={rival.score} label={hostOf(rival.url)} />}
                </div>

                {rival && (
                  <div className="mb-5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
                      Your gaps vs {hostOf(rival.url)}
                    </div>
                    {gaps.length ? (
                      <ul className="space-y-1.5">
                        {gaps.map((g) => (
                          <li key={g.id} className="flex items-start gap-2 text-[13px] text-ink">
                            <span aria-hidden="true" className="font-bold text-[#c0392b]">✗</span>
                            {g.label}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[13px] text-muted">Your competitor passes nothing that you fail.</p>
                    )}
                  </div>
                )}

                <a
                  className="w-full button justify-between text-white"
                  style={{ background: '#1f8f4e', borderColor: '#1f8f4e' }}
                  href={whatsappLink(site, gaps, rival)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Fix this for me</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px]" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
                  </svg>
                </a>
                <p className="text-[11px] text-muted text-center mt-2">Opens WhatsApp with your report summary.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
