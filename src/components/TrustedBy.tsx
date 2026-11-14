import React from 'react';

// Clients and the "199+ Global Founders & Clients" line are from the strip under the
// hero on kolacommunications.com.
const clientLogos = [
  { file: 'veena-developers', name: 'Veena Developers' },
  { file: 'vayu-valves', name: 'Vayu Valves' },
  { file: 'tazaari', name: 'Tazaari' },
  { file: 'roy-infra', name: 'Roy Infra' },
  { file: 'purva-desai', name: 'Purva Desai Company' },
  { file: 'premier-league-news-now', name: 'Premier League News Now' },
];

function LogoRow({ logos, reverse = false, hidden = false }: { logos: typeof clientLogos; reverse?: boolean; hidden?: boolean }) {
  return (
    <div className="group relative overflow-hidden" aria-hidden={hidden ? true : undefined}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
      {/* Marquee: the logos are rendered four times and shifted by -50% for a seamless loop */}
      <div className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] ${reverse ? '[animation-direction:reverse]' : ''}`}>
        {[0, 1, 2, 3].map((copy) => (
          <ul key={copy} aria-hidden={copy > 0 ? true : undefined} className="flex items-center gap-14 pr-14">
            {logos.map((logo) => (
              <li key={logo.file} className="shrink-0">
                <img src={`/logos/${logo.file}.svg`} alt={copy > 0 || hidden ? '' : logo.name} loading="lazy" className="h-16 w-auto object-contain opacity-70 grayscale md:h-20" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section aria-labelledby="trusted-title" className="pb-6 pt-20 sm:pt-24">
      <div className="wrap flex flex-col items-center text-center">
        <span className="label">Trusted by growing businesses</span>
        <h2 id="trusted-title" className="h-section">199+ Global Founders &amp; Clients</h2>
      </div>
      <div data-reveal className="mt-10 space-y-4">
        <LogoRow logos={clientLogos} />
      </div>
    </section>
  );
}
