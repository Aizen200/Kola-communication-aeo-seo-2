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
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <img
            src="/images/aeo-chatgpt.jpg"
            alt="Person typing a question into ChatGPT on a laptop"
            width={1400}
            height={787}
            loading="lazy"
            className="aspect-[4/3.4] w-full rounded-2xl object-cover object-[60%_center]"
          />
          <blockquote className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-6 shadow-float sm:left-auto sm:right-[-24px] sm:max-w-[380px]">
            <p className="text-[17px] font-bold leading-snug tracking-[-0.02em]">
              SEO is about getting someone to your page.{' '}
              <span className="text-orange">AEO is about getting your page to answer the question before someone even visits it.</span>
            </p>
          </blockquote>
        </div>
        <div className="pt-10 lg:pt-0">
          <span className="label">(05) What is AEO</span>
          <h2 className="h-section">Why does AEO matter more than ever in 2026?</h2>
          <ol className="mt-10 space-y-3">
            {practices.map((p, i) => (
              <li key={p.title} className="flex items-center gap-5 rounded-xl border border-line bg-white px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange/10 text-[14px] font-bold text-orange">
                  0{i + 1}
                </span>
                <h3 className="text-[17px] font-bold leading-snug tracking-[-0.015em]">{p.title}</h3>
              </li>
            ))}
          </ol>
          <a href="#contact" className="btn-orange mt-10">
            Book a Free Strategy Call <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
