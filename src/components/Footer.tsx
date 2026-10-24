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
              Search & AI visibility
            </span>
          </a>
          <p>
            SEO, AEO and GEO that get you found on Google and cited by AI search engines. Real results, not just good looks.
          </p>
          <nav className="footer-links flex-wrap" aria-label="Footer navigation">
            <a href="#expertise">Expertise</a>
            <a href="#case-studies">Case Studies</a>
            <a href="#packages">Packages</a>
            <a href="#audit">Website Audit</a>
            <a href="#approach">Approach</a>
            <a href="#faq">FAQs</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kola Communications. Mumbai, Maharashtra, India.</span>
          <span>
            <a href="mailto:business@kolacommunications.com" className="hover:text-green">business@kolacommunications.com</a>
            {' · '}
            <a href="tel:+918928984774" className="hover:text-green">+91 89289 84774</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
