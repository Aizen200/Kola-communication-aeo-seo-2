import React from 'react';

// Verbatim from kolacommunications.com and the AEO vs SEO article (comparison table).
type Column = {
  acronym: string;
  name: string;
  title: string;
  rows: [string, string][];
  text: string;
  scope: string[];
  accent: boolean;
};

const columns: Column[] = [
  {
    acronym: 'SEO',
    name: 'Search Engine Optimisation',
    title: 'Goal: rank in a list of search results',
    rows: [
      ['Optimises for', 'keywords, backlinks, page authority'],
      ['Output', 'a link the user clicks'],
      ['Measures', 'rankings, organic traffic, click-through rate'],
      ['Platform', 'Google, Bing search results pages'],
    ],
    text: '',
    scope: ['Keyword research', 'Link building', 'Technical SEO'],
    accent: false,
  },
  {
    acronym: 'AEO',
    name: 'Answer Engine Optimisation',
    title: 'Goal: be cited as the direct answer',
    rows: [
      ['Optimises for', 'question clarity, structured content, schema'],
      ['Output', 'an answer the user reads without clicking'],
      ['Measures', 'featured snippet wins, AI citations, zero-click visibility'],
      ['Platform', 'ChatGPT, Perplexity, Google AI Overview, voice search'],
    ],
    text: '',
    scope: ['FAQ schema', 'Structured data', 'Clear Q&A formatting'],
    accent: true,
  },
  {
    acronym: 'GEO',
    name: 'Generative Engine Optimization',
    title: 'Build topical authority, not just keyword density',
    rows: [],
    text: 'AI systems evaluate sources not just by individual page quality but by whether a website is a genuine authority on a topic. A website that has ten well-researched articles about SEO and AEO will be cited more reliably than a website with one keyword-stuffed page on the same topic.',
    scope: ['LLMs & AI Search'],
    accent: false,
  },
];

const toneList = [
  { card: 'bg-paper', muted: 'text-muted', line: 'border-ink/15', chip: 'border-ink/70' },
  { card: 'bg-ink text-paper', muted: 'text-paper/55', line: 'border-paper/15', chip: 'border-paper/40' },
  { card: 'bg-orange', muted: 'text-ink/65', line: 'border-ink/20', chip: 'border-ink/70' },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section">
      <div className="wrap">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="label">SEO, AEO &amp; GEO</span>
            <h2 className="h-section">
              How is AEO different from SEO?
            </h2>
          </div>
          <p data-reveal className="max-w-[420px] text-[16px] leading-relaxed text-ink/75 lg:justify-self-end">
            SEO and AEO are not opposites, good SEO practice is a foundation for AEO. But they have different goals, different signals, and different outputs.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((c, i) => {
            const t = toneList[i];
            return (
              <article
                key={c.acronym}
                data-reveal
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                className={`flex flex-col rounded-2xl border border-ink p-6 sm:p-7 ${t.card}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="display text-[64px] leading-none">{c.acronym}</span>
                  <span className={`kicker text-[12px] ${t.muted}`}>0{i + 1}</span>
                </div>
                <div className={`kicker mt-4 border-t pt-4 text-[11px] ${t.muted} ${t.line}`}>{c.name}</div>
                <h3 className="mt-2 text-[26px] font-bold leading-[1.08] tracking-[-0.04em]">{c.title}</h3>
                {c.rows.length > 0 && (
                  <dl className={`mt-4 border-t text-[14px] ${t.line}`}>
                    {c.rows.map(([term, value]) => (
                      <div key={term} className={`grid grid-cols-[100px_1fr] gap-3 border-b py-2.5 ${t.line}`}>
                        <dt className={t.muted}>{term}</dt>
                        <dd className="leading-snug">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {c.text && <p className={`mt-4 text-[15px] leading-relaxed ${t.muted}`}>{c.text}</p>}
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {c.scope.map((s) => (
                    <li key={s} className={`rounded-full border px-3 py-1 text-[12px] font-semibold ${t.chip}`}>
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
