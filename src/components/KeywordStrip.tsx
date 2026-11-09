import React from 'react';

// Scope names used across the SEO, AEO & GEO cards
const words = ['Keyword research', 'Link building', 'Technical SEO', 'FAQ schema', 'Structured data', 'Clear Q&A formatting', 'LLMs & AI Search'];

function Globe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-orange">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function KeywordStrip() {
  return (
    <div aria-hidden="true" className="overflow-hidden bg-ink py-4 text-paper">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {words.map((w) => (
              <span key={w} className="flex items-center gap-8 pr-8 text-[24px] font-bold tracking-[-0.03em] sm:text-[28px]">
                {w}
                <Globe />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
