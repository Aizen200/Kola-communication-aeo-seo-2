import React from 'react';

export default function WhoWeHelp() {
  return (
    <section id="who-we-help" className="section b2b">
      <div className="wrap b2b-grid">
        <div className="section-intro">
          <div className="eyebrow">02 / A B2B PERSPECTIVE</div>
          <h2>
            Your buyers research
            <br />
            before they enquire.
          </h2>
          <p>
            Product specifications. Applications. Comparisons. Credentials. Your website should answer the questions that move a buyer towards a conversation.
          </p>
          <a className="text-link" href="#contact">
            Let’s talk about your business{' '}
            <svg className="arrow" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </div>
        <div className="buyer-rows">
          <div className="buyer-row">
            <span className="row-num">01</span>
            <div>
              <h3>Products & capabilities</h3>
              <p>Make complex offerings easier to find, compare and understand.</p>
            </div>
          </div>
          <div className="buyer-row">
            <span className="row-num">02</span>
            <div>
              <h3>Industries & applications</h3>
              <p>Connect what you offer with the problems your buyers need to solve.</p>
            </div>
          </div>
          <div className="buyer-row">
            <span className="row-num">03</span>
            <div>
              <h3>Expertise & credibility</h3>
              <p>Give prospects useful evidence when they evaluate suppliers and partners.</p>
            </div>
          </div>
          <div className="buyer-end">Built around your buyer’s questions.</div>
        </div>
      </div>
    </section>
  );
}

