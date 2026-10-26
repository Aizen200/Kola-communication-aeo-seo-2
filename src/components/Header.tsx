'use client';

import React, { useEffect, useState } from 'react';

const links = [
  { href: '#expertise', label: 'SEO, AEO & GEO' },
  { href: '#case-studies', label: 'Projects' },
  { href: '#packages', label: 'Packages' },
  { href: '#audit', label: 'Website Audit' },
  { href: '#approach', label: 'How we work' },
  { href: '#faq', label: 'FAQs' },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" aria-label="Kola Communications home" className="flex items-end gap-3">
      <span className={`font-display text-[40px] leading-none ${light ? 'text-paper' : 'text-ink'}`}>
        KOLA<span className="text-orange">.</span>
      </span>
      <span className={`pb-0.5 text-[11px] uppercase leading-[1.35] tracking-[0.14em] ${light ? 'text-paper/75' : 'text-muted'}`}>
        Communications
        <br />
        SEO, AEO &amp; GEO
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="bg-ink text-paper">
        <div className="wrap flex items-center justify-between gap-4 py-2 text-[13px]">
          <span>Free website audit: find out if ChatGPT knows your business.</span>
          <a href="#audit" className="shrink-0 font-bold text-orange underline underline-offset-4">
            Run it now
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur">
        <div className="wrap flex items-center justify-between gap-6 py-5">
          <Logo />
          <nav
            id="navigation"
            aria-label="Main navigation"
            className={`${
              open ? 'flex' : 'hidden'
            } absolute inset-x-0 top-full flex-col gap-1 border-y-2 border-ink bg-paper px-4 py-4 lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0`}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-[15px] hover:text-orange lg:py-0">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-dark mt-2 lg:mt-0">
              Contact <span aria-hidden="true">→</span>
            </a>
          </nav>
          <button
            type="button"
            className="border-2 border-ink p-2 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
