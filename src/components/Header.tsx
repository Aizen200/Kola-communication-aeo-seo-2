'use client';

import React, { useEffect, useState } from 'react';
import Arrow from './Arrow';
import Logo from './Logo';

const links = [
  { href: '#expertise', label: 'SEO, AEO & GEO' },
  { href: '#case-studies', label: 'Projects' },
  { href: '#packages', label: 'Packages' },
  { href: '#audit', label: 'Website Audit' },
  { href: '#approach', label: 'How we work' },
  { href: '#faq', label: 'FAQs' },
];

const pill = 'rounded-full border border-ink/15 bg-paper/75 backdrop-blur-md';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Highlight the link for the section currently in view
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="flex items-center justify-between gap-3">
        <div className={`flex items-center gap-6 py-2 pl-3 pr-3 lg:pr-6 ${pill}`}>
          <a href="#top" aria-label="Kola Communications home" className="py-1.5">
            <Logo />
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.href ? 'true' : undefined}
                className={`text-[14px] transition-colors hover:text-orange ${active === l.href ? 'font-semibold text-ink' : 'text-ink/75'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={`flex items-center gap-2 p-1.5 ${pill}`}>
          <a href="#contact" className="btn-dark min-h-[40px] text-[14px]">
            <span className="hidden sm:inline">Book a strategy call</span>
            <span className="sm:hidden">Book a call</span>
            <Arrow size={14} />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" /> : <path d="M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.8" />}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`mt-2 origin-top rounded-2xl border border-ink/15 bg-paper p-3 shadow-[0_20px_40px_-20px_rgba(20,20,20,0.35)] transition-[opacity,transform,visibility] duration-300 lg:hidden ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-[17px] font-semibold hover:bg-sand">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
