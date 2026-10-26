import React from 'react';
import { Logo } from './Header';

const links = [
  { href: '#expertise', label: 'SEO, AEO & GEO' },
  { href: '#case-studies', label: 'Projects' },
  { href: '#packages', label: 'Packages' },
  { href: '#audit', label: 'Website Audit' },
  { href: '#approach', label: 'How we work' },
  { href: '#faq', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper/20 bg-ink text-paper">
      <div className="wrap py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo light />
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-paper/80">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-orange">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-3 text-[14px] text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Kola Communications. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-4">
            <a href="mailto:business@kolacommunications.com" className="underline hover:text-orange">
              business@kolacommunications.com
            </a>
            <a href="tel:+918928984774" className="hover:text-orange">
              +91-8928984774
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
