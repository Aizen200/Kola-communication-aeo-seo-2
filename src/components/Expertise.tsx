import React from 'react';

const columns = [
  {
    acronym: 'SEO',
    name: 'Search Engine Optimisation',
    title: 'Goal: rank in a list of search results',
    text: 'Traditional SEO gets your page to rank in a list of results.',
    scope: 'Keyword research / Link building / Technical SEO',
    accent: false,
  },
  {
    acronym: 'AEO',
    name: 'Answer Engine Optimisation',
    title: 'Goal: be cited as the direct answer',
    text: 'It is the practice of structuring your website content so that AI-powered platforms: ChatGPT, Claude, Perplexity, Google AI Overviews, Bing Copilot, and others can find, understand, and quote your content when a user asks a relevant question.',
    scope: 'FAQ schema / Structured data / Clear Q&A formatting',
    accent: true,
  },
  {
    acronym: 'GEO',
    name: 'Generative Engine Optimization',
    title: 'Build topical authority, not just keyword density',
    text: 'AI systems evaluate sources not just by individual page quality but by whether a website is a genuine authority on a topic.',
    scope: 'Answer & Generative Engine Optimization (AEO & GEO) for LLMs & AI Search',
    accent: false,
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section border-t border-line bg-white">
      <div className="wrap">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="label">(01) SEO, AEO &amp; GEO</span>
            <h2 className="h-section">How is AEO different from SEO?</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-muted">
            Search is evolving rapidly. We optimize your digital presence not only for traditional search engines like Google and Bing, but also for generative AI answer engines (ChatGPT, Perplexity, Google Gemini). We build enduring organic authority that turns searchers into qualified buyers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((c) => (
            <article
              key={c.acronym}
              className={`flex flex-col rounded-2xl p-8 lg:p-10 ${c.accent ? 'bg-ink text-white shadow-float' : 'border border-line bg-paper'}`}
            >
              <div className={`display text-[72px] lg:text-[88px] ${c.accent ? 'text-orange' : ''}`}>{c.acronym}</div>
              <div className={`kicker mt-3 ${c.accent ? 'text-white/60' : 'text-muted'}`}>{c.name}</div>
              <h3 className="mt-8 text-[22px] font-bold leading-snug tracking-[-0.02em]">{c.title}</h3>
              <p className={`mt-4 text-[16px] leading-relaxed ${c.accent ? 'text-white/75' : 'text-muted'}`}>{c.text}</p>
              <div className="mt-auto pt-8">
                <div className={`border-t pt-5 text-[14px] font-bold ${c.accent ? 'border-white/15' : 'border-line'}`}>{c.scope}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
