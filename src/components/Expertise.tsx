import React from 'react';

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 01 / SEO, AEO & GEO
            </div>
            <h2>
              How is AEO
              <br />
              different from SEO?
            </h2>
          </div>
          <p>
            Search is evolving rapidly. We optimize your digital presence not only for traditional search engines like Google and Bing, but also for generative AI answer engines (ChatGPT, Perplexity, Google Gemini). We build enduring organic authority that turns searchers into qualified buyers.
          </p>
        </div>
        <div className="service-columns">
          <article className="service">
            <div className="service-top">
              <div>
                <div className="service-acronym">SEO</div>
                <div className="service-name">Search Engine Optimisation</div>
              </div>
              <span className="service-no">01</span>
            </div>
            <h3>Goal: rank in a list of search results</h3>
            <p>
              Traditional SEO gets your page to rank in a list of results.
            </p>
            <div className="service-scope">
              Keyword research <span>·</span> Link building <span>·</span> Technical SEO
            </div>
          </article>
          <article className="service">
            <div className="service-top">
              <div>
                <div className="service-acronym">AEO</div>
                <div className="service-name">Answer Engine Optimisation</div>
              </div>
              <span className="service-no">02</span>
            </div>
            <h3>Goal: be cited as the direct answer</h3>
            <p>
              It is the practice of structuring your website content so that AI-powered platforms: ChatGPT, Claude, Perplexity, Google AI Overviews, Bing Copilot, and others can find, understand, and quote your content when a user asks a relevant question.
            </p>
            <div className="service-scope">
              FAQ schema <span>·</span> Structured data <span>·</span> Clear Q&A formatting
            </div>
          </article>
          <article className="service">
            <div className="service-top">
              <div>
                <div className="service-acronym">GEO</div>
                <div className="service-name">Generative Engine Optimization</div>
              </div>
              <span className="service-no">03</span>
            </div>
            <h3>Build topical authority, not just keyword density</h3>
            <p>
              AI systems evaluate sources not just by individual page quality but by whether a website is a genuine authority on a topic.
            </p>
            <div className="service-scope">
              Answer & Generative Engine Optimization (AEO & GEO) for LLMs & AI Search
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
