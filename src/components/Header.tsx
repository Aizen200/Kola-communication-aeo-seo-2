'use client';

import React, { useEffect, useState } from 'react';
import Arrow from './Arrow';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#expertise', label: 'SEO, AEO & GEO' },
  { href: '#case-studies', label: 'Projects' },
  { href: '#packages', label: 'Packages' },
  { href: '#audit', label: 'Website Audit' },
  { href: '#approach', label: 'How we work' },
  { href: '#faq', label: 'FAQs' },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" aria-label="Kola Communications home" className="flex flex-col">
      <span className={`display text-[34px] leading-[0.8] tracking-[-0.06em] ${light ? 'text-white' : 'text-ink'}`}>
        KOLA<span className="text-orange">.</span>
      </span>
      <span className={`mt-2 text-[10px] uppercase leading-none tracking-[0.42em] ${light ? 'text-white/70' : 'text-ink'}`}>
        Communications
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Highlight the nav item for the section currently in view
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="wrap flex items-center justify-between gap-6 py-5">
        <Logo />
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={`${
            open ? 'flex' : 'hidden'
          } absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-paper px-4 py-4 lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-2 text-[15px] transition-colors hover:text-orange lg:py-0 ${isActive ? 'font-bold' : ''}`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-3 left-1/2 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orange ${isActive ? 'lg:block' : ''}`}
                />
              </a>
            );
          })}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-dark mt-3 lg:hidden">
            Book a strategy call <Arrow />
          </a>
        </nav>
        <a href="#contact" className="btn-dark hidden px-6 py-[15px] text-[17px] font-medium lg:inline-flex">
          Book a strategy call <Arrow />
        </a>
        <button
          type="button"
          className="rounded-[3px] border border-ink p-2 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" />
            ) : (
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
