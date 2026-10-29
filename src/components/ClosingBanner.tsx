import React from 'react';

// From the kolacommunications.com homepage: "...digital experiences that get you found and get you chosen."
export default function ClosingBanner() {
  return (
    <section aria-label="Get found. Get chosen." className="relative overflow-hidden border-t border-line bg-paper py-20 sm:py-28">
      <div aria-hidden="true" className="absolute right-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange/50 blur-[100px]" />
      <div className="wrap relative">
        <p className="display text-[72px] sm:text-[128px] lg:text-[176px]">Get found.</p>
        <p className="display text-[72px] text-orange sm:text-[128px] lg:text-[176px]">Get chosen.</p>
      </div>
    </section>
  );
}
