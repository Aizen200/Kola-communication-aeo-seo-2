import React from 'react';

// All copy on this site is taken verbatim from kolacommunications.com
// (pages, project CMS and the SEO/AEO blog posts). Do not add new claims here.
export default function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <i className="dot"></i> SEO, AEO & GEO
        </div>
        <h1 id="hero-title">
          Own search
          <br />
          rankings across
          <br />
          Google and
          <br />
          <span>AI search engines.</span>
        </h1>
        <p>
          Dominate Google organic rankings and establish clear authority across AI search engines and generative platforms like ChatGPT, Google AI, Claude, Perplexity and more.
        </p>
        <div className="hero-actions">
          <a className="button" href="#contact">
            Book a Free Strategy Call{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
          <a className="text-link" href="#case-studies">
            View Projects{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" className="arrow" aria-hidden="true">
              <use href="#arrow-right" />
            </svg>
          </a>
        </div>
        <div className="hero-footnote">
          <span></span> 199+ Brands Scaled Across 6 Markets
        </div>
      </div>

      <div
        className="search-scene"
        role="img"
        aria-label="Illustration of a search result and an AI answer, using an example question from Kola Communications' AEO article."
      >
        <div className="scene-grid"></div>
        <div className="scene-orbit"></div>
        <div className="scene-caption">
          <span>SEO</span>
          <span>AEO</span>
        </div>
        <div className="search-card">
          <div className="query">
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#search" />
            </svg>
            <span>Digital marketing services Mumbai</span>
          </div>
          <div className="result">
            <div className="result-site">
              <span className="small-mark">↗</span>
              <div className="site-name">
                Kola Communications
                <small>kolacommunications.com</small>
              </div>
            </div>
            <div className="result-title">Output: a link the user clicks</div>
          </div>
        </div>
        <div className="ai-card">
          <div className="answer-label">
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#spark" />
            </svg>{' '}
            ChatGPT, Perplexity, Google AI Overview
          </div>
          <div className="answer-question">How do I find a good digital marketing agency in Mumbai?</div>
          <div className="answer-line"></div>
          <div className="answer-line short"></div>
          <div className="source-token">
            <i></i>Output: an answer the user reads without clicking
          </div>
        </div>
        <div className="scene-bottom">
          <span>Featured snippet wins, AI citations, zero-click visibility</span>
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
