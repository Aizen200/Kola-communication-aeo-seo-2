import React from 'react';
import Arrow from './Arrow';

// From the kolacommunications.com homepage: "...digital experiences that get you found and get you chosen."
export default function ClosingBanner() {
  return (
    <section aria-label="Get found. Get chosen." className="dot-grid bg-ink py-24 text-paper sm:py-32">
      <div className="wrap">
        <span className="label text-paper/50">Free website audit</span>
        <p data-reveal className="display text-[56px] sm:text-[88px] lg:text-[112px]">
          Get found.
          <br />
          <span className="text-orange">Get chosen.</span>
        </p>
        <a data-reveal href="#audit" style={{ '--d': '120ms' } as React.CSSProperties} className="btn-light mt-10">
          Run website audit <Arrow />
        </a>
      </div>
    </section>
  );
}
