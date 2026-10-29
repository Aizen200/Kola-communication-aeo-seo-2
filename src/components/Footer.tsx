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
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="wrap py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Logo light />
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-white/70">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-orange">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-[14px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Kola Communications. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-6">
            <a href="mailto:business@kolacommunications.com" className="hover:text-orange">
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
