import React from 'react';

// Verbatim from Kola's article "What is AEO and why it matters more than SEO in 2026".
export default function WhoWeHelp() {
  return (
    <section id="who-we-help" className="section b2b">
      <div className="wrap b2b-grid">
        <div className="section-intro">
          <div className="eyebrow">
            <i className="dot"></i> 05 / WHAT IS AEO
          </div>
          <h2>
            Why does AEO matter
            <br />
            more than ever in 2026?
          </h2>
          <p>
            SEO and AEO are not opposites, good SEO practice is a foundation for AEO. But they have different goals, different signals, and different outputs.
          </p>
          <a className="text-link" href="#contact">
            Book a Free Strategy Call{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" className="arrow" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </div>
        <div className="buyer-rows">
          <div className="buyer-row">
            <span className="row-num">01</span>
            <div>
              <h3>Write content that directly answers questions</h3>
              <p>
                AI search tools are trained to find content that answers questions clearly and concisely.
              </p>
            </div>
          </div>
          <div className="buyer-row">
            <span className="row-num">02</span>
            <div>
              <h3>Use FAQ sections on every relevant page</h3>
              <p>
                FAQ sections are AEO gold. They are written in question-and-answer format, exactly the structure that AI tools look for when compiling answers.
              </p>
            </div>
          </div>
          <div className="buyer-row">
            <span className="row-num">03</span>
            <div>
              <h3>Implement FAQ Page schema markup</h3>
              <p>
                Schema markup is code added to your website that tells search engines and AI tools what type of content is on the page.
              </p>
            </div>
          </div>
          <div className="buyer-end">
            SEO is about getting someone to your page. AEO is about getting your page to answer the question before someone even visits it.
          </div>
        </div>
      </div>
    </section>
  );
}
