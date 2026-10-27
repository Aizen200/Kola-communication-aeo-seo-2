import React from 'react';

// All copy on this site is taken verbatim from kolacommunications.com
// (pages, project CMS and the SEO/AEO blog posts). Do not add new claims here.
const stats = [
  { value: '1999', label: 'Brands Scaled Across 6 Markets', accent: false },
  { value: '+218%', label: 'Organic traffic, average client growth', accent: true },
  { value: '3–4 hrs', label: 'Response within 3–4 hours', accent: false },
];

export default function Hero() {
  return (
    <>
      <section className="wrap pb-16 pt-10 sm:pt-14 lg:pb-20" aria-labelledby="hero-title">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
          <div>
            <h1 id="hero-title" className="display text-[42px] leading-[0.93] sm:text-[60px] lg:text-[72px] xl:text-[80px]">
              Own search rankings across Google and{' '}
              <span className="serif-accent text-orange">AI search engines.</span>
            </h1>
            <p className="mt-6 max-w-[540px] text-[18px] leading-relaxed text-muted sm:text-[20px]">
              Dominate Google organic rankings and establish clear authority across AI search engines and generative platforms like ChatGPT, Google AI, Claude, Perplexity and more.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
              <a href="#contact" className="btn-orange">
                Book a Free Strategy Call <span aria-hidden="true">→</span>
              </a>
              <a href="#case-studies" className="text-[17px] font-bold underline-offset-4 hover:underline">
                View Projects
              </a>
            </div>
          </div>

          <div
            className="relative pt-6 pr-2"
            role="img"
            aria-label="Illustration of a search result and an AI answer, using an example question from Kola Communications' AEO article."
          >
            <div className="absolute -top-2 right-0 z-20 flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full bg-ink text-center text-paper sm:h-[132px] sm:w-[132px]">
              <span className="display text-[32px] text-orange sm:text-[38px]">1999</span>
              <span className="text-[10px] uppercase leading-tight tracking-[0.14em]">
                Brands scaled
                <br />6 markets
              </span>
            </div>

            <div className="relative z-0 -rotate-1 border-2 border-ink bg-white shadow-hard">
              <div className="flex gap-2 border-b-2 border-ink bg-sand px-4 py-3">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-ink" />
                <span className="h-3.5 w-3.5 rounded-full border-2 border-ink" />
                <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-orange" />
              </div>
              <div className="p-5 pb-7">
                <div className="flex items-center gap-3 border-2 border-ink px-4 py-3 text-[15px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" />
                    <path d="m16 16 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Digital marketing services Mumbai
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <span className="display flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-[18px] text-orange">K</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold">Kola Communications</div>
                    <div className="text-[13px] text-muted">kolacommunications.com</div>
                  </div>
                  <span className="kicker border-2 border-ink px-2 py-0.5 text-[10px]">Sample</span>
                </div>
                <div className="mt-3 text-[15px] font-bold">Output: a link the user clicks</div>
              </div>
            </div>

            <div className="relative z-10 -mt-3 ml-6 rotate-[0.6deg] border-2 border-ink bg-forest p-6 text-paper shadow-hard sm:ml-12">
              <div className="kicker text-[11px] text-orange">ChatGPT, Perplexity, Google AI Overview</div>
              <div className="mt-3 font-serif text-[24px] italic leading-snug sm:text-[28px]">
                How do I find a good digital marketing agency in Mumbai?
              </div>
              <div className="mt-4 h-2 w-full bg-paper/25" />
              <div className="mt-2 h-2 w-2/3 bg-paper/25" />
              <div className="mt-5 inline-block bg-orange px-3 py-1.5 text-[13px] font-bold text-ink">
                Output: an answer the user reads without clicking
              </div>
            </div>
            <div className="kicker mt-6 text-[11px] text-muted">
              Featured snippet wins / AI citations / zero-click visibility
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Kola Communications in numbers" className="wrap">
        <div className="grid border-b-2 border-ink sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className={`py-8 sm:px-8 ${i > 0 ? 'border-t-2 border-ink sm:border-l-2 sm:border-t-0' : 'sm:pl-0'}`}>
              <div className={`display text-[64px] sm:text-[80px] lg:text-[104px] ${s.accent ? 'text-orange' : ''}`}>{s.value}</div>
              <div className="mt-2 text-[16px]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
