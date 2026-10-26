import React from 'react';

// From the kolacommunications.com homepage: "...digital experiences that get you found and get you chosen."
export default function ClosingBanner() {
  return (
    <section aria-label="Get found. Get chosen." className="border-t-2 border-ink bg-orange py-16 sm:py-20">
      <div className="wrap">
        <p className="display text-outline text-[80px] text-ink sm:text-[140px] lg:text-[200px]">Get found.</p>
        <p className="display mt-2 inline-block bg-ink px-4 pt-3 text-[80px] text-paper sm:px-6 sm:text-[140px] lg:text-[200px]">
          Get chosen.
        </p>
      </div>
    </section>
  );
}
