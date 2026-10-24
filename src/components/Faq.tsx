import React from 'react';

export default function Faq() {
  return (
    <section id="faq" className="section faq">
      <div className="wrap faq-grid">
        <div className="section-intro">
          <div className="eyebrow">04 / A LITTLE MORE CLARITY</div>
          <h2>
            Good questions.
            <br />
            Clear answers.
          </h2>
          <p>A few things you might be wondering before we start a conversation.</p>
          <a className="text-link" href="#contact">
            Ask us something else{' '}
            <svg className="arrow" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </div>
        <div className="questions">
          <details open>
            <summary>
              Do we need SEO, AEO and GEO separately?
              <i className="plus" aria-hidden="true"></i>
            </summary>
            <p>
              They share foundations. We assess your website and audience, then combine the work that is relevant to your business.
            </p>
          </details>
          <details>
            <summary>
              Do you work with manufacturers?
              <i className="plus" aria-hidden="true"></i>
            </summary>
            <p>
              Yes. Our B2B approach focuses on making complex products, capabilities and applications easier for potential buyers to find and understand.
            </p>
          </details>
          <details>
            <summary>
              Can you work with our website team?
              <i className="plus" aria-hidden="true"></i>
            </summary>
            <p>
              We can define priorities and recommendations for your team, or agree an implementation scope together.
            </p>
          </details>
          <details>
            <summary>
              When should we expect progress?
              <i className="plus" aria-hidden="true"></i>
            </summary>
            <p>
              The starting point, competition and scope affect timing. We agree realistic milestones after the initial review and track progress against them.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

