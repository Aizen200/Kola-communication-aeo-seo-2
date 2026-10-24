import React from 'react';

export default function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <i className="dot"></i> SEO · AEO · GEO FOR B2B
        </div>
        <h1 id="hero-title">
          Show up where
          <br />
          your next buyer
          <br />
          <span>searches.</span>
        </h1>
        <p>
          Search visibility for B2B businesses and manufacturers. We connect technical SEO, useful content and AI discovery.
        </p>
        <div className="hero-actions">
          <a className="button" href="#contact">
            Request a website review{' '}
            <svg aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
          <a className="text-link" href="#expertise">
            Explore our approach{' '}
            <svg className="arrow" aria-hidden="true">
              <use href="#arrow-right" />
            </svg>
          </a>
        </div>
        <div className="hero-footnote">
          Clear priorities <span></span> Practical execution <span></span> Measurable progress
        </div>
      </div>

      <div
        className="search-scene"
        role="img"
        aria-label="Illustrative search journey showing a company discovered in search and referenced in an AI answer. This is a concept, not a result or performance claim."
      >
        <div className="scene-grid"></div>
        <div className="scene-orbit"></div>
        <div className="scene-caption">
          <span>A connected search presence</span>
          <span>Illustrative</span>
        </div>
        <div className="search-card">
          <div className="query">
            <svg aria-hidden="true">
              <use href="#search" />
            </svg>
            <span>industrial automation partner in India</span>
          </div>
          <div className="result">
            <div className="result-site">
              <span className="small-mark">↗</span>
              <div className="site-name">
                Your company
                <small>yourcompany.com</small>
              </div>
            </div>
            <div className="result-title">The right expertise. Ready to be found.</div>
          </div>
        </div>
        <div className="ai-card">
          <div className="answer-label">
            <svg aria-hidden="true">
              <use href="#spark" />
            </svg>{' '}
            THE ANSWER EXPERIENCE
          </div>
          <div className="answer-question">What should I look for in an automation partner?</div>
          <p className="answer-snippet">
            Industry credentials, proven integration capabilities, and transparent compliance standards.
          </p>
          <div className="source-token">
            <i></i>Your expertise, referenced <span>↗</span>
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
