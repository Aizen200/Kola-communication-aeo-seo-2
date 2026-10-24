import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-line-subtle bg-paper">
      <div className="wrap">
        <div className="footer-main">
          <a className="brand" href="#" aria-label="Kola Communications home">
            <span className="brand-main">Kola.</span>
            <span className="brand-separator"></span>
            <span className="brand-sub">
              communications
              <br />
              SEO, AEO & GEO
            </span>
          </a>
          <p>
            SEO, AEO & GEO for Google and AI search engines
          </p>
          <nav className="footer-links flex-wrap" aria-label="Footer navigation">
            <a href="#expertise">SEO, AEO & GEO</a>
            <a href="#case-studies">Projects</a>
            <a href="#packages">Packages</a>
            <a href="#audit">SEO Audits</a>
            <a href="#approach">How we work</a>
            <a href="#faq">FAQs</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kola Communications. All rights reserved.</span>
          <span>
            <a href="mailto:business@kolacommunications.com" className="hover:text-green">business@kolacommunications.com</a>
            {' · '}
            <a href="tel:+918928984774" className="hover:text-green">+91-8928984774</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
