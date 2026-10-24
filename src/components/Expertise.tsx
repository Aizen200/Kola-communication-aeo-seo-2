import React from 'react';

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 01 / CONNECTED SEARCH STRATEGY
            </div>
            <h2>
              Own search rankings across
              <br />
              Google and AI search engines.
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
            <h3>Be discoverable on Google & Bing.</h3>
            <p>
              Technical SEO audits and Core Web Vitals remediation, high-intent keyword strategy and content topic clusters, and high-quality white-hat editorial link acquisition, so your pages rank in the results when people search on Google and Bing.
            </p>
            <div className="service-scope">
              Technical SEO Audits <span>·</span> Keyword Topic Clusters <span>·</span> White-Hat Editorial Links
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
            <h3>Be cited as the direct answer in AI.</h3>
            <p>
              AEO structures your website content so AI-powered platforms (ChatGPT, Claude, Perplexity, Google AI Overviews, Bing Copilot) can find, understand, and quote it. Traditional SEO gets your page to rank in a list of results; AEO gets your content cited as the answer itself.
            </p>
            <div className="service-scope">
              FAQ Sections <span>·</span> FAQPage Schema <span>·</span> Question-Led Content
            </div>
          </article>
          <article className="service">
            <div className="service-top">
              <div>
                <div className="service-acronym">GEO</div>
                <div className="service-name">Generative Engine Optimisation</div>
              </div>
              <span className="service-no">03</span>
            </div>
            <h3>Build authority in AI-generated answers.</h3>
            <p>
              Establish clear authority across generative platforms like ChatGPT, Google AI, Claude and Perplexity. Structured schema markup, rich snippets and consistent, question-focused content build the topical authority AI systems look for when choosing which sources to cite.
            </p>
            <div className="service-scope">
              Schema Markup <span>·</span> Rich Snippet Engineering <span>·</span> Topical Authority
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
