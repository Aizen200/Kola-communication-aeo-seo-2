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
    <section id="who-we-help" className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="label">(05) What is AEO</span>
          <h2 className="h-section">Why does AEO matter more than ever in 2026?</h2>
          <p className="mt-7 max-w-[480px] text-[18px] leading-relaxed text-muted">
            SEO and AEO are not opposites, good SEO practice is a foundation for AEO. But they have different goals, different signals, and different outputs.
          </p>
          <a href="#contact" className="btn-orange mt-10">
            Book a Free Strategy Call <Arrow />
          </a>
        </div>
        <div>
          <ol className="border-t border-line">
            {practices.map((p, i) => (
              <li key={p.title} className="flex gap-6 border-b border-line py-8">
                <span className="display w-10 shrink-0 text-[15px] tracking-normal text-orange">0{i + 1}</span>
                <div>
                  <h3 className="display text-[26px] sm:text-[30px]">{p.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <blockquote className="mt-10 rounded-2xl bg-ink p-8 text-white sm:p-10">
            <p className="display text-[24px] leading-snug sm:text-[28px]">
              SEO is about getting someone to your page. <span className="text-orange">AEO is about getting your page to answer the question before someone even visits it.</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
