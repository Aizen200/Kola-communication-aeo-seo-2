import React from 'react';

function K({ size = 22 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center bg-black font-extrabold text-orange"
      style={{ width: size, height: size, fontSize: size * 0.55 }}
    >
      K
    </span>
  );
}

// Mini SERP: Kola ranked first
function SeoVisual() {
  return (
    <div className="w-[78%] space-y-2.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${i === 0 ? 'bg-white shadow-soft' : 'bg-white/50'}`}>
          <span className={`text-[11px] font-bold ${i === 0 ? 'text-orange' : 'text-muted/60'}`}>#{i + 1}</span>
          {i === 0 ? <K /> : <span className="h-[22px] w-[22px] rounded bg-line" />}
          <div className="flex-1 space-y-1.5">
            <div className={`h-1.5 rounded ${i === 0 ? 'w-3/4 bg-[#1a0dab]/70' : 'w-2/3 bg-line'}`} />
            <div className="h-1.5 w-full rounded bg-line/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Question in, Kola cited as the answer
function AeoVisual() {
  return (
    <div className="w-[80%] space-y-3">
      <div className="ml-auto w-[70%] rounded-2xl rounded-br-sm bg-white/10 px-4 py-3">
        <div className="h-1.5 w-full rounded bg-white/40" />
        <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/40" />
      </div>
      <div className="w-[85%] rounded-2xl rounded-bl-sm bg-white px-4 py-3">
        <div className="h-1.5 w-full rounded bg-line" />
        <div className="mt-1.5 h-1.5 w-4/5 rounded bg-line" />
        <div className="mt-3 flex items-center gap-2 rounded-md bg-paper px-2 py-1.5">
          <K size={18} />
          <span className="text-[10px] font-bold text-ink">kolacommunications.com</span>
        </div>
      </div>
    </div>
  );
}

// Topical authority: Kola at the centre of a topic graph
function GeoVisual() {
  const nodes = [
    [20, 22], [80, 18], [88, 62], [62, 88], [16, 74], [50, 8],
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-[150px] w-[150px]" aria-hidden="true">
      {nodes.map(([x, y], i) => (
        <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#0E0E0E" strokeOpacity="0.15" strokeWidth="0.8" />
      ))}
      <line x1="20" y1="22" x2="50" y2="8" stroke="#0E0E0E" strokeOpacity="0.1" strokeWidth="0.6" />
      <line x1="88" y1="62" x2="62" y2="88" stroke="#0E0E0E" strokeOpacity="0.1" strokeWidth="0.6" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 5 : 4} fill="#fff" stroke="#E2E0DC" strokeWidth="1" />
      ))}
      <circle cx="50" cy="50" r="18" fill="#FF5A1F" fillOpacity="0.18" />
      <rect x="40" y="40" width="20" height="20" fill="#000" />
      <text x="50" y="55.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FF5A1F">K</text>
    </svg>
  );
}

// Verbatim from kolacommunications.com and the AEO vs SEO article (comparison table).
type Column = {
  acronym: string;
  name: string;
  title: string;
  rows: [string, string][];
  text: string;
  scope: string[];
  visual: React.ReactNode;
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
    visual: <SeoVisual />,
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
    visual: <AeoVisual />,
    accent: true,
  },
  {
    acronym: 'GEO',
    name: 'Generative Engine Optimization',
    title: 'Build topical authority, not just keyword density',
    rows: [],
    text: 'AI systems evaluate sources not just by individual page quality but by whether a website is a genuine authority on a topic. A website that has ten well-researched articles about SEO and AEO will be cited more reliably than a website with one keyword-stuffed page on the same topic.',
    scope: ['LLMs & AI Search'],
    visual: <GeoVisual />,
    accent: false,
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section">
      <div className="wrap">
        <span className="label">(01) SEO, AEO &amp; GEO</span>
        <h2 className="h-section max-w-[820px]">How is AEO different from SEO?</h2>
        <p className="mb-14 mt-6 max-w-[680px] text-[18px] leading-relaxed text-muted">
          SEO and AEO are not opposites, good SEO practice is a foundation for AEO. But they have different goals, different signals, and different outputs.
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((c) => (
            <article
              key={c.acronym}
              className={`flex flex-col overflow-hidden rounded-2xl ${c.accent ? 'bg-ink text-white shadow-float' : 'border border-line bg-white'}`}
            >
              <div
                aria-hidden="true"
                className={`relative flex h-[210px] items-center justify-center ${c.accent ? 'bg-[#1a1a1a]' : 'bg-sand'}`}
              >
                {c.accent && <div className="absolute h-32 w-32 rounded-full bg-orange/40 blur-[50px]" />}
                <div className="relative flex w-full justify-center">{c.visual}</div>
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <div className={`display text-[48px] ${c.accent ? 'text-orange' : ''}`}>{c.acronym}</div>
                  <div className={`kicker text-right text-[10px] ${c.accent ? 'text-white/50' : 'text-muted'}`}>{c.name}</div>
                </div>
                <h3 className="mt-4 text-[20px] font-bold leading-snug tracking-[-0.02em]">{c.title}</h3>
                {c.rows.length > 0 && (
                  <dl className={`mt-5 border-t text-[14px] ${c.accent ? 'border-white/15' : 'border-line'}`}>
                    {c.rows.map(([term, value]) => (
                      <div key={term} className={`grid grid-cols-[110px_1fr] gap-3 border-b py-3 ${c.accent ? 'border-white/15' : 'border-line'}`}>
                        <dt className={`font-bold ${c.accent ? 'text-white/50' : 'text-muted'}`}>{term}</dt>
                        <dd className="leading-snug">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {c.text && <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.text}</p>}
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {c.scope.map((s) => (
                    <li
                      key={s}
                      className={`rounded-full px-3 py-1.5 text-[12px] font-bold ${c.accent ? 'bg-white/10' : 'border border-line bg-paper'}`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
