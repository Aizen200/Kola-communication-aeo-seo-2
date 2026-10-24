import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-main">
          <a className="brand" href="#" aria-label="Kola Communications home">
            <span className="brand-main">Kola.</span>
            <span className="brand-separator"></span>
            <span className="brand-sub">
              communications
              <br />
              Search & AI visibility
            </span>
          </a>
          <p>Clear thinking. Connected search.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#expertise">Expertise</a>
            <a href="#approach">Approach</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kola Communications. Mumbai, India.</span>
          <span>SEO · AEO · GEO</span>
        </div>
      </div>
    </footer>
  );
}

