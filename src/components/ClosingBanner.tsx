import React from 'react';
import Arrow from './Arrow';

// From the kolacommunications.com homepage: "...digital experiences that get you found and get you chosen."
export default function ClosingBanner() {
  return (
    <section aria-label="Get found. Get chosen." className="relative overflow-hidden border-t border-line py-16 sm:py-24">
      <div aria-hidden="true" className="absolute -bottom-24 right-[18%] h-72 w-72 rounded-full bg-orange/40 blur-[110px]" />
      <div className="wrap relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <p className="font-tight text-[64px] font-bold leading-[0.96] tracking-[-0.04em] sm:text-[112px] lg:text-[150px] xl:text-[168px]">
          Get found.
          <br />
          <span className="text-orange">
            Get chosen<span className="text-ink">.</span>
          </span>
        </p>
        <div className="max-w-[300px] lg:pb-6">
          <a href="#contact" className="btn-dark w-full justify-between">
            Book a Free Strategy Call <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
