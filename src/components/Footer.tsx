import React from 'react';
import Arrow from './Arrow';
import Logo from './Logo';

const columns = [
  {
    title: 'Services',
    links: [
      { href: '#expertise', label: 'SEO, AEO & GEO' },
      { href: '#packages', label: 'Packages' },
      { href: '#audit', label: 'Website Audit' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#case-studies', label: 'Projects' },
      { href: '#approach', label: 'How we work' },
      { href: '#faq', label: 'FAQs' },
      { href: '#contact', label: 'Contact' },
    ],
  },
];

// Contact details live in the contact section just above, so they are not repeated here
export default function Footer() {
  return (
    <footer className="dot-grid relative overflow-hidden bg-ink text-paper">
      <div className="wrap relative grid gap-10 border-t border-paper/10 pb-10 pt-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="#top" aria-label="Kola Communications home">
            <Logo light />
          </a>
          <p className="mt-4 text-[15px] text-paper/60">Get found. Get chosen.</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={`${c.title} links`}>
            <div className="kicker text-[11px] text-paper/45">{c.title}</div>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {c.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-orange">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none whitespace-nowrap text-center text-[25vw] font-extrabold leading-[0.8] tracking-[-0.07em] text-paper/[0.07]">
        KOLA.
      </div>

      <div className="wrap relative flex items-center justify-between gap-4 border-t border-paper/10 py-5 text-[12px] font-semibold uppercase tracking-[0.06em] text-paper/50">
        <span>© 2026 Kola Communications. All rights reserved.</span>
        <a href="#top" aria-label="Back to top" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange text-ink transition-colors hover:bg-paper">
          <Arrow size={14} className="-rotate-90" />
        </a>
      </div>
    </footer>
  );
}
