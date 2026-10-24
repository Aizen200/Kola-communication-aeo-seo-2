import React from 'react';

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">01 / CONNECTED SEARCH</div>
            <h2>
              One strategy.
              <br />
              Three ways to be discovered.
            </h2>
          </div>
          <p>A clear, credible presence across the places your customers look for answers.</p>
        </div>
        <div className="service-columns">
          <article className="service">
            <div className="service-top">
              <div>
                <div className="service-acronym">SEO</div>
                <div className="service-name">Search engine optimisation</div>
              </div>
              <span className="service-no">01</span>
            </div>
            <h3>Be discoverable.</h3>
            <p>
              Improve your website’s technical foundations, content and relevance so the right buyers can find you.
            </p>
            <div className="service-scope">
              Technical SEO <span>·</span> On-page <span>·</span> Content
            </div>
          </article>
          <article className="service">
            <div className="service-top">
              <div>
                <div className="service-acronym">AEO</div>
                <div className="service-name">Answer engine optimisation</div>
              </div>
              <span className="service-no">02</span>
            </div>
            <h3>Be understood.</h3>
            <p>
              Turn your expertise into clear answers and useful page structures that address real buyer questions.
            </p>
            <div className="service-scope">
              Buyer questions <span>·</span> Clarity <span>·</span> Structure
            </div>
          </article>
          <article className="service">
            <div className="service-top">
              <div>
                <div className="service-acronym">GEO</div>
                <div className="service-name">Generative engine optimisation</div>
              </div>
              <span className="service-no">03</span>
            </div>
            <h3>Be part of the research.</h3>
            <p>
              Prepare your content and brand information for discovery across AI-assisted search experiences.
            </p>
            <div className="service-scope">
              Brand information <span>·</span> AI discovery
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

