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
    <header className="topbar">
      <div className="wrap nav">
        <a className="brand" href="#" aria-label="Kola Communications home">
          <span className="brand-main">Kola.</span>
          <span className="brand-separator"></span>
          <span className="brand-sub">
            communications
            <br />
            Search & AI visibility
          </span>
        </a>
        <nav
          className={`navlinks ${isMenuOpen ? 'open' : ''}`}
          id="navigation"
          aria-label="Main navigation"
        >
          <a href="#expertise" onClick={closeMenu}>
            Expertise
          </a>
          <a href="#approach" onClick={closeMenu}>
            Our approach
          </a>
          <a href="#faq" onClick={closeMenu}>
            FAQs
          </a>
          <a className="button" href="#contact" onClick={closeMenu}>
            Let’s talk{' '}
            <svg aria-hidden="true">
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
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}

