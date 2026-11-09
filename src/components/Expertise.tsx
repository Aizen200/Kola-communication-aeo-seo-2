import React from 'react';

function K({ size = 22 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center bg-black font-bold text-orange"
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
        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 ${i === 0 ? 'bg-white shadow-soft' : 'bg-white/50'}`}>
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
      <div className="ml-auto w-[70%]  bg-white/10 px-4 py-3">
        <div className="h-1.5 w-full rounded bg-white/40" />
        <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/40" />
      </div>
      <div className="w-[85%]  bg-white px-4 py-3">
        <div className="h-1.5 w-full rounded bg-line" />
        <div className="mt-1.5 h-1.5 w-4/5 rounded bg-line" />
        <div className="mt-3 flex items-center gap-2 bg-paper px-2 py-1.5">
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
        <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#111111" strokeOpacity="0.15" strokeWidth="0.8" />
      ))}
      <line x1="20" y1="22" x2="50" y2="8" stroke="#111111" strokeOpacity="0.1" strokeWidth="0.6" />
      <line x1="88" y1="62" x2="62" y2="88" stroke="#111111" strokeOpacity="0.1" strokeWidth="0.6" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 5 : 4} fill="#fff" stroke="#E4E4E4" strokeWidth="1" />
      ))}
      <circle cx="50" cy="50" r="18" fill="#FF4500" fillOpacity="0.18" />
      <rect x="40" y="40" width="20" height="20" fill="#000" />
      <text x="50" y="55.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FF4500">K</text>
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

const toneList = [
  { card: 'bg-paper', panel: 'bg-sand', muted: 'text-muted', line: 'border-ink/15', chip: 'border-ink/70' },
  { card: 'bg-ink text-paper', panel: 'bg-[#222]', muted: 'text-paper/55', line: 'border-paper/15', chip: 'border-paper/40' },
  { card: 'bg-orange', panel: 'bg-[#ff7656]', muted: 'text-ink/65', line: 'border-ink/20', chip: 'border-ink/70' },
];

function Plus() {
  return (
    <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-current text-[18px] leading-none opacity-70">
      +
    </span>
  );
}

export default function Expertise() {
  return (
    <section id="expertise" className="section">
      <div className="wrap">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="label">SEO, AEO &amp; GEO</span>
            <h2 className="h-section">
              How is <span className="mark">AEO</span> different from SEO?
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
                <div className="flex items-center justify-between">
                  <span className="kicker text-[12px]">
                    0{i + 1} {c.acronym}
                  </span>
                  <Plus />
                </div>
                <div aria-hidden="true" className={`relative mt-5 flex h-[180px] items-center justify-center overflow-hidden rounded-xl ${t.panel}`}>
                  <div className="relative flex w-full justify-center">{c.visual}</div>
                </div>
                <div className={`kicker mt-6 text-[11px] ${t.muted}`}>{c.name}</div>
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
