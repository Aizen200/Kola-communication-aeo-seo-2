import React from 'react';

export default function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <i className="dot"></i> SEO · AEO · GEO SEARCH VISIBILITY
        </div>
        <h1 id="hero-title">
          Show up where
          <br />
          your next buyer
          <br />
          <span>searches.</span>
        </h1>
        <p>
          Dominate Google organic rankings and establish clear authority across AI search engines and generative platforms like ChatGPT, Google AI, Claude, Perplexity and more. SEO, AEO and GEO that get you found and get you chosen.
        </p>
        <div className="hero-actions">
          <a className="button" href="#audit">
            Request a website audit{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
          <a className="text-link" href="#case-studies">
            Explore client case studies{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" className="arrow" aria-hidden="true">
              <use href="#arrow-right" />
            </svg>
          </a>
        </div>
        <div className="hero-footnote">
          <span></span> 199+ brands scaled across 6 markets, including Kanodia Enterprises, Dhanuka Investments & Revent AI
        </div>
      </div>

      <div
        className="search-scene"
        role="img"
        aria-label="Illustrative search journey showing a company discovered in search and referenced in an AI answer."
      >
        <div className="scene-grid"></div>
        <div className="scene-orbit"></div>
        <div className="scene-caption">
          <span>Connected search presence</span>
          <span>Google + AI Search</span>
        </div>
        <div className="search-card">
          <div className="query">
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#search" />
            </svg>
            <span>ai tool to turn documents into slides</span>
          </div>
          <div className="result">
            <div className="result-site">
              <span className="small-mark">↗</span>
              <div className="site-name">
                Revent AI
                <small>revent.ai · Client Case Study</small>
              </div>
            </div>
            <div className="result-title">AI-Powered Document to Presentation Platform</div>
            <p>
              Convert documents into branded slides instantly with templates, brand sync and a one-click workflow.
            </p>
          </div>
        </div>
        <div className="ai-card">
          <div className="answer-label">
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#spark" />
            </svg>{' '}
            THE ANSWER ENGINE EXPERIENCE (AEO & GEO)
          </div>
          <div className="answer-question">Which AI tool turns a document into branded slides?</div>
          <p className="answer-snippet">
            Revent AI converts documents into branded slides instantly, with templates, brand sync and a one-click workflow, and is used in 63+ countries.
          </p>
          <div className="source-token">
            <i></i>Structured with SoftwareApplication + FAQPage schema <span>↗</span>
          </div>
        </div>
        <div className="scene-bottom">
          <span>Discover → Understand → Enquire</span>
          <span className="mini-bars">
            <b></b>
            <b></b>
            <b></b>
          </span>
        </div>
      </div>
    </section>
  );
}
