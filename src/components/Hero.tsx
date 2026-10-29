import React from 'react';
import Arrow from './Arrow';
import { HeroAuditForm } from './AuditForm';

// Hero copy follows the approved hero design.
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
      className="relative mx-auto mb-6 h-[460px] w-full max-w-[740px] sm:h-[560px] lg:mb-0 lg:absolute lg:right-0 lg:top-[40px] lg:h-[600px] lg:w-[51%] lg:max-w-none"
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

// Replicates the client strip under the hero on kolacommunications.com: avatars, rating and
// "199+ Global Founders & Clients" on the left, a scrolling row of client logos on the right.
const avatars = [
  'photo-1534528741775-53994a69daeb',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1494790108377-be9c29b29330',
  'photo-1500648767791-00dcc994a43e',
  'photo-1573496359142-b8d87734a5a2',
];

const clientLogos = [
  { file: 'veena-developers', name: 'Veena Developers' },
  { file: 'vayu-valves', name: 'Vayu Valves' },
  { file: 'tazaari', name: 'Tazaari' },
  { file: 'roy-infra', name: 'Roy Infra' },
  { file: 'purva-desai', name: 'Purva Desai Company' },
  { file: 'premier-league-news-now', name: 'Premier League News Now' },
];

function Star() {
  return (
    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function TrustedBy() {
  return (
    <section aria-label="199+ Global Founders & Clients" className="overflow-hidden border-y border-line py-12">
      <div className="wrap">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((id, i) => (
                <img
                  key={id}
                  src={`https://images.unsplash.com/${id}?w=120&auto=format&fit=crop&q=80`}
                  alt={`Happy client ${i + 1}`}
                  loading="lazy"
                  className="h-8 w-8 rounded-full border-2 border-paper object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-0.5 text-ink" role="img" aria-label="Rated 5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} />
                ))}
              </div>
              <span className="text-xs font-medium text-muted">199+ Global Founders &amp; Clients</span>
            </div>
          </div>

          {/* Marquee: the logos are rendered twice and shifted by -50% for a seamless loop */}
          <div className="group relative w-full flex-1 overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex items-center gap-12 pr-12">
                  {clientLogos.map((logo) => (
                    <li key={logo.file} className="flex shrink-0 items-center">
                      <img
                        src={`/logos/${logo.file}.svg`}
                        alt={copy === 1 ? '' : logo.name}
                        className="h-16 w-auto object-contain opacity-70 grayscale md:h-20"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
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
        <div className="pb-8 pt-12 sm:pt-16 lg:flex lg:min-h-[680px] lg:max-w-[50%] lg:flex-col lg:justify-center lg:py-14">
          <h1 id="hero-title" className="font-tight text-[50px] font-bold leading-[1.04] tracking-[-0.025em] sm:text-[78px] lg:text-[72px] xl:text-[84px]">
            Own your
            <br />
            visibility across
            <br />
            Google and
            <br />
            <span className="text-orange">AI search.</span>
          </h1>
          <div className="mt-10">
            <HeroAuditForm />
          </div>
        </div>
      </div>
      <HeroVisual />
    </section>
    <TrustedBy />
    </>
  );
}
