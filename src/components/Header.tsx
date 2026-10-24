'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="topbar sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div className="wrap nav">
        <a className="brand" href="#" aria-label="Kola Communications home">
          <span className="brand-main">Kola.</span>
          <span className="brand-separator"></span>
          <span className="brand-sub">
            communications
            <br />
            SEO, AEO & GEO
          </span>
        </a>
        <nav
          className={`navlinks ${isMenuOpen ? 'open' : ''}`}
          id="navigation"
          aria-label="Main navigation"
        >
          <a href="#expertise" onClick={closeMenu}>
            SEO, AEO & GEO
          </a>
          <a href="#case-studies" onClick={closeMenu}>
            Projects
          </a>
          <a href="#packages" onClick={closeMenu}>
            Packages
          </a>
          <a href="#audit" onClick={closeMenu}>
            SEO Audits
          </a>
          <a href="#approach" onClick={closeMenu}>
            How we work
          </a>
          <a href="#faq" onClick={closeMenu}>
            FAQs
          </a>
          <a className="button" href="#contact" onClick={closeMenu}>
            Contact{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
