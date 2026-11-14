import React from 'react';
import Arrow from './Arrow';

// Verbatim from Kola's article "What is AEO and why it matters more than SEO in 2026".
const practices = [
  {
    title: 'Write content that directly answers questions',
    text: 'AI search tools are trained to find content that answers questions clearly and concisely.',
  },
  {
    title: 'Use FAQ sections on every relevant page',
    text: 'FAQ sections are AEO gold. They are written in question-and-answer format, exactly the structure that AI tools look for when compiling answers.',
  },
  {
    title: 'Implement FAQ Page schema markup',
    text: 'Schema markup is code added to your website that tells search engines and AI tools what type of content is on the page.',
  },
];

export default function WhoWeHelp() {
  return (
    <section id="who-we-help" className="section pb-10 sm:pb-12 lg:pb-14">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="dot-shadow mr-3">
          <div className="halftone aspect-[4/3.4] rounded-2xl border border-ink">
            <img
              src="/images/aeo-chatgpt.jpg"
              alt="Person typing a question into ChatGPT on a laptop"
              width={1400}
              height={787}
              loading="lazy"
              className="h-full w-full object-cover object-[60%_center]"
            />
          </div>
        </div>
        <div>
          <span className="label">What is AEO</span>
          <h2 className="h-section">
            Why does AEO matter more than ever in 2026?
          </h2>
          <ol className="mt-10 border-t border-ink/15">
            {practices.map((p, i) => (
              <li key={p.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties} className="flex items-center gap-5 border-b border-ink/15 py-4">
                <span className="kicker w-8 shrink-0 text-[12px] text-muted">0{i + 1}</span>
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.02em]">{p.title}</h3>
              </li>
            ))}
          </ol>
          <a href="#contact" className="btn-dark mt-10">
            Book a Free Strategy Call <Arrow />
          </a>
        </div>
      </div>

      <div className="wrap mt-20">
        <blockquote data-reveal className="rounded-3xl bg-sand p-8 sm:p-12">
          <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true" className="text-orange">
            <path d="M2 24V14C2 7 6 3 13 2l1 3c-4 1-6 4-6 8h6v11H2Zm18 0V14c0-7 4-11 11-12l1 3c-4 1-6 4-6 8h6v11H20Z" stroke="currentColor" strokeWidth="2" />
          </svg>
          <p className="mt-6 max-w-[1000px] text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[40px]">
            SEO is about getting someone to your page. <span className="text-orange">AEO is about getting your page to answer the question before someone even visits it.</span>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
