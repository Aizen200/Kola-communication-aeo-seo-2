import React from 'react';
import Arrow from './Arrow';

// Hero copy and "Trusted by" brands follow the approved hero design.
const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#4285F4', '#34A853', '#EA4335'];

function KTile({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center bg-black font-extrabold text-orange"
      style={{ width: size, height: size, fontSize: size * 0.55 }}
    >
      K
    </span>
  );
}

function ChatGptIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <rect key={r} x="12.5" y="4" width="7" height="14" rx="3.5" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${r} 16 16)`} />
      ))}
    </svg>
  );
}

// Card tilt shared by both floating cards
const tilt = '[transform:perspective(1800px)_rotateY(-12deg)_rotateX(4deg)_rotateZ(2.4deg)]';

function HeroVisual() {
  return (
    <div
      className="relative mx-auto mb-6 h-[460px] w-full max-w-[740px] sm:h-[560px] lg:mb-0 lg:absolute lg:right-0 lg:top-0 lg:h-[600px] lg:w-[51%] lg:max-w-none"
      role="img"
      aria-label="Illustration: Kola Communications shown in a Google search result and in a ChatGPT answer."
    >
      <div aria-hidden="true" className="absolute inset-0">
        {/* Stone block */}
        <div className="stone absolute right-[14%] top-[2%] h-[94%] w-[54%] [clip-path:polygon(0_6%,62%_0,100%_4%,100%_100%,0_100%)]" />
        {/* Fluted wall, right */}
        <div className="absolute right-0 top-[6%] h-[92%] w-[25%] [clip-path:polygon(0_0,100%_6%,100%_100%,0_100%)]">
          <div className="fluted absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/[0.08] via-transparent to-white/40" />
        </div>
        {/* Fluted base, bottom left */}
        <div className="absolute bottom-[1%] left-0 h-[30%] w-[26%] [clip-path:polygon(0_14%,100%_0,100%_100%,0_100%)]">
          <div className="fluted absolute inset-0 opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/70 to-transparent" />
        </div>
        <div className="stone absolute bottom-0 left-[8%] h-[6%] w-[70%] opacity-70" />
        {/* Orange glow */}
        <div className="absolute left-[10%] top-[44%] h-36 w-36 rounded-full bg-orange blur-[48px] sm:h-44 sm:w-44" />
        {/* Orbit line */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 740 600" fill="none" preserveAspectRatio="none">
          <ellipse cx="390" cy="350" rx="355" ry="190" stroke="#FF5A1F" strokeOpacity="0.6" strokeWidth="1.2" transform="rotate(-8 420 360)" />
        </svg>
      </div>

      {/* Google result card */}
      <div className={`absolute left-[12%] top-[10%] w-[80%] sm:left-[17%] sm:top-[8%] sm:w-[62%] rounded-xl bg-white px-[3.5%] pb-[4%] pt-[3%] shadow-float ${tilt}`}>
        <div className="text-[26px] font-medium tracking-[-0.04em] sm:text-[32px]" aria-hidden="true" style={{ fontFamily: 'Arial, sans-serif' }}>
          {'Google'.split('').map((ch, i) => (
            <span key={i} style={{ color: googleColors[i] }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-full border border-line px-4 py-2.5 text-[12px] shadow-[0_1px_6px_rgba(32,33,36,0.12)] sm:text-[14px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
            <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2" />
            <path d="m16 16 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="flex-1 truncate">Digital marketing services Mumbai</span>
          <span className="text-[15px] leading-none text-muted" aria-hidden="true">✕</span>
          <svg width="14" height="16" viewBox="0 0 14 20" aria-hidden="true" className="hidden shrink-0 sm:block">
            <rect x="4" y="0" width="6" height="12" rx="3" fill="#4285F4" />
            <path d="M1.5 9a5.5 5.5 0 0 0 11 0" stroke="#EA4335" strokeWidth="1.6" fill="none" />
            <path d="M7 14.5V19" stroke="#34A853" strokeWidth="1.6" />
          </svg>
        </div>
        <div className="mt-3 flex gap-5 border-b border-line text-[10px] text-muted sm:text-[11px]" aria-hidden="true">
          <span className="border-b-2 border-ink pb-2 text-ink">All</span>
          <span>Images</span>
          <span>News</span>
          <span className="hidden sm:inline">Videos</span>
          <span className="hidden sm:inline">Shopping</span>
          <span className="hidden sm:inline">› More</span>
        </div>
        <div className="mt-4 flex items-start gap-3">
          <KTile size={34} />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-medium sm:text-[14px]">Kola Communications</div>
            <div className="truncate text-[10px] text-muted sm:text-[11px]">https://kolacommunications.com</div>
            <div className="mt-2 text-[12px] font-medium text-[#1a0dab] sm:text-[14px]">SEO, AEO and GEO Strategy for Modern Businesses</div>
            <div className="mt-3 h-1.5 w-full rounded bg-sand" />
            <div className="mt-1.5 h-1.5 w-4/5 rounded bg-sand" />
          </div>
        </div>
      </div>

      {/* ChatGPT answer card */}
      <div className={`absolute left-[4%] top-[50%] w-[80%] sm:left-[12%] sm:top-[51%] sm:w-[57%] rounded-xl bg-[#111] px-[4%] pb-[4%] pt-[3.5%] text-white shadow-float ${tilt}`}>
        <div className="flex items-center gap-4 text-[11px] text-white/85 sm:text-[12px]">
          <ChatGptIcon />
          ChatGPT
        </div>
        <div className="mt-2 text-[15px] sm:pl-[46px] leading-snug sm:text-[19px]">
          How do I find a reliable digital marketing agency in Mumbai?
        </div>
        <div className="sm:ml-[46px] mt-4 h-1.5 rounded bg-white/15" />
        <div className="sm:ml-[46px] mt-1.5 h-1.5 w-1/2 rounded bg-white/15" />
        <div className="sm:ml-[46px] mt-5 flex items-center gap-3 rounded-lg bg-white/[0.06] px-3 py-3">
          <KTile size={30} />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] sm:text-[12px]">Kola Communications</div>
            <div className="mt-1.5 h-1 w-3/4 rounded bg-white/10" />
          </div>
          <Arrow size={13} />
        </div>
      </div>
    </div>
  );
}

const brands = [
  {
    name: 'sortafamous',
    mark: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="2.4" />
        <path d="M8 19c3-8 11-12 14-8M9 20c5 1 10-1 13-6M7 15c4-6 13-6 16 0" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    className: 'text-[21px] font-bold tracking-[-0.03em]',
  },
  {
    name: 'AIRKOM',
    mark: (
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M15 2 28 27h-8l-5-10-5 10H2z" fill="currentColor" />
        <path d="M15 17l-3 6h6z" fill="#F6F5F3" />
      </svg>
    ),
    className: 'text-[19px] font-bold tracking-[0.12em]',
  },
  {
    name: 'CASA BRIO',
    mark: (
      <svg width="40" height="30" viewBox="0 0 40 30" fill="none" aria-hidden="true">
        <path d="M20 8c-3-6-14-8-15-3s4 9 10 10c-6 1-9 6-6 9s9-2 11-9c2 7 8 12 11 9s0-8-6-9c6-1 11-5 10-10S23 2 20 8Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 8v14" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    className: 'text-[17px] font-bold tracking-[0.14em]',
    stacked: true,
  },
  {
    name: 'MIYA ROBOTICS',
    mark: (
      <svg width="70" height="34" viewBox="0 0 70 34" fill="none" aria-hidden="true">
        <ellipse cx="22" cy="17" rx="20" ry="11" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="40" cy="17" rx="20" ry="11" stroke="currentColor" strokeWidth="2" transform="rotate(-12 40 17)" />
        <ellipse cx="31" cy="17" rx="8" ry="13" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    className: 'text-[13px] font-bold tracking-[0.06em]',
  },
  {
    name: 'FAMER',
    mark: (
      <svg width="30" height="32" viewBox="0 0 30 32" fill="none" aria-hidden="true">
        <path d="M4 28V8l11-6 11 6v12c0 5-5 9-11 10" stroke="currentColor" strokeWidth="2.2" />
        <path d="M4 28c6-2 13-9 15-18M10 20c3 0 7 1 10 4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    className: 'text-[26px] font-extrabold tracking-[-0.02em]',
  },
  {
    name: 'CANCURE',
    mark: null,
    className: 'font-[Georgia,serif] text-[28px] font-normal tracking-[0.02em]',
  },
];

function TrustedBy() {
  return (
    <section aria-label="Trusted by growing businesses" className="border-y border-line bg-white py-5">
      <div className="wrap text-[11px] font-bold uppercase tracking-[0.26em] text-muted">Trusted by growing businesses</div>
      {/* Marquee: the list is rendered twice and shifted by -50% for a seamless loop */}
      <div className="group mt-2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex items-center text-[#5A5A5A]">
              {brands.map((b) => (
                <li
                  key={b.name}
                  className={`flex h-[60px] w-[220px] shrink-0 items-center justify-center border-l border-line sm:w-[260px] ${
                    b.stacked ? 'flex-col gap-0.5' : 'gap-3'
                  }`}
                >
                  {b.mark}
                  <span className={`leading-none ${b.className}`}>{b.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="wrap relative z-10">
        <div className="pb-8 pt-12 sm:pt-16 lg:flex lg:min-h-[600px] lg:max-w-[50%] lg:flex-col lg:justify-center lg:py-10">
          <h1 id="hero-title" className="text-[54px] font-bold leading-[0.93] tracking-[-0.055em] sm:text-[84px] lg:text-[78px] xl:text-[92px]">
            Own your
            <br />
            visibility across
            <br />
            Google and
            <br />
            <span className="text-orange">AI search.</span>
          </h1>
          <div className="mt-12 flex flex-wrap items-center gap-10">
            <a href="#contact" className="btn-orange px-8 py-[18px] text-[18px]">
              Book a free strategy call <Arrow />
            </a>
            <a href="#case-studies" className="btn-link text-[18px]">
              View projects <Arrow />
            </a>
          </div>
        </div>
      </div>
      <HeroVisual />
    </section>
    <TrustedBy />
    </>
  );
}
