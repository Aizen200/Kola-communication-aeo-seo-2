import React from 'react';

export default function WhoWeHelp() {
  return (
    <section id="who-we-help" className="section b2b">
      <div className="wrap b2b-grid">
        <div className="section-intro">
          <div className="eyebrow">
            <i className="dot"></i> 05 / HOW PEOPLE SEARCH NOW
          </div>
          <h2>
            Your customers are asking AI,
            <br />
            not just Google.
          </h2>
          <p>
            When someone wants to know which agency to hire or how long a process takes, they are increasingly not typing that question into Google and scrolling through ten blue links. They are asking ChatGPT, Perplexity, and Google’s own AI Overview at the top of the results page.
          </p>
          <a className="text-link" href="#contact">
            Let’s review your search presence{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" className="arrow" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </div>
        <div className="buyer-rows">
          <div className="buyer-row">
            <span className="row-num">01</span>
            <div>
              <h3>Search Engines (SEO)</h3>
              <p>
                Traditional Google search is still enormous and remains critical. Technical SEO, high-intent keywords and editorial links get your page ranked in the list of results people click.
              </p>
            </div>
          </div>
          <div className="buyer-row">
            <span className="row-num">02</span>
            <div>
              <h3>Answer Engines (AEO)</h3>
              <p>
                ChatGPT, Perplexity and Google AI Overview answer questions directly. FAQ sections and FAQPage schema make your content the answer they quote, before anyone even visits your page.
              </p>
            </div>
          </div>
          <div className="buyer-row">
            <span className="row-num">03</span>
            <div>
              <h3>Generative Platforms (GEO)</h3>
              <p>
                AI tools evaluate content quality and clarity, not just domain power. A well-written, question-focused page can be cited alongside much larger organisations.
              </p>
            </div>
          </div>
          <div className="buyer-end">The businesses doing best in 2026 do both: strong technical SEO with AEO-ready content on top.</div>
        </div>
      </div>
    </section>
  );
}
