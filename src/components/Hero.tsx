import React from 'react';
import { HeroAuditForm } from './AuditForm';

// Hero copy follows the approved hero design; the paragraph is verbatim from kolacommunications.com/services.
const avatars = [
  'photo-1534528741775-53994a69daeb',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1494790108377-be9c29b29330',
  'photo-1500648767791-00dcc994a43e',
];

function KTile({ size = 30 }: { size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-md bg-ink font-extrabold text-orange" style={{ width: size, height: size, fontSize: size * 0.55 }}>
      K
    </span>
  );
}

function Check() {
  return (
    <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-[11px] font-bold text-ink">
      ✓
    </span>
  );
}

// Audit check names from the website audit
function CheckChip({ label, className, delay }: { label: string; className: string; delay: string }) {
  return (
    <div className={`float absolute z-20 ${className}`} style={{ animationDelay: delay }}>
      <div className="stack-shadow flex items-center gap-2 rounded-full border border-ink bg-paper py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold">
        <Check />
        {label}
      </div>
    </div>
  );
}

// Kola shown as the top Google result and as the source ChatGPT cites
function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration: Kola Communications as a Google search result and as the source cited in a ChatGPT answer."
      className="relative mx-auto h-[640px] w-full max-w-[580px] sm:h-[600px]"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[28px] border border-ink bg-orange">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#141414_1.1px,transparent_1.4px)] [background-size:9px_9px] [mask-image:radial-gradient(circle_at_70%_30%,#000,transparent_70%)] opacity-40" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-ink/30" />
        <div className="absolute -bottom-36 -left-28 h-96 w-96 rounded-full border border-ink/20" />
      </div>

      <div aria-hidden="true">
        {/* Google result */}
        <div className="float absolute left-[5%] top-[8%] w-[84%] sm:left-[7%] sm:w-[76%]" style={{ animationDelay: '-1s' }}>
          <div className="dot-shadow -rotate-2">
            <div className="rounded-2xl border border-ink bg-paper p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="text-[22px] font-bold tracking-[-0.04em]">Google</span>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-ink/40 px-3 py-1.5 text-[12px] sm:text-[13px]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="2.2" />
                    <path d="m16 16 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                  <span className="truncate">Digital marketing services Mumbai</span>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-xl bg-sand p-3">
                <KTile size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold">Kola Communications</span>
                    <span className="rounded-full bg-orange px-1.5 py-px text-[10px] font-bold">#1</span>
                  </div>
                  <div className="truncate text-[11px] text-muted">https://kolacommunications.com</div>
                  <div className="mt-1.5 text-[13px] font-semibold leading-snug text-[#1a0dab] sm:text-[14px]">SEO, AEO and GEO Strategy for Modern Businesses</div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 px-1">
                <div className="h-1.5 w-full rounded bg-ink/10" />
                <div className="h-1.5 w-3/4 rounded bg-ink/10" />
              </div>
            </div>
          </div>
        </div>

        {/* ChatGPT answer */}
        <div className="float absolute bottom-[7%] right-[4%] w-[84%] sm:right-[6%] sm:w-[74%]" style={{ animationDelay: '-4s' }}>
          <div className="dot-shadow rotate-[1.5deg]">
            <div className="rounded-2xl border border-ink bg-ink p-4 text-paper sm:p-5">
              <div className="kicker text-[11px] text-paper/50">ChatGPT</div>
              <div className="mt-2 text-[15px] font-semibold leading-snug sm:text-[17px]">How do I find a reliable digital marketing agency in Mumbai?</div>
              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-paper/15" />
                <div className="h-1.5 w-5/6 rounded bg-paper/15" />
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-paper/15 p-2.5">
                <KTile size={28} />
                <span className="flex-1 text-[13px] font-semibold">Kola Communications</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-ink">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <CheckChip label="AI crawler access" className="right-[3%] top-[49%] sm:-right-5 sm:top-[47%]" delay="-2s" />
        <CheckChip label="Schema" className="left-[3%] top-[49%] sm:-left-6 sm:top-[52%]" delay="-5s" />
        <CheckChip label="llms.txt" className="bottom-[1%] left-[6%] sm:-bottom-3" delay="-3.5s" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.12fr_1fr] lg:gap-12">
        <div>
          <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper py-1 pl-1 pr-3 text-[12px] font-semibold uppercase tracking-[0.06em]">
            <span className="rounded-full bg-orange px-2 py-0.5 text-ink">SEO</span>
            AEO &amp; GEO
          </div>
          <h1 id="hero-title" data-reveal className="display mt-6 text-[50px] sm:text-[72px] lg:text-[80px]">
            Own your visibility across Google and <span className="mark">AI search.</span>
          </h1>
          <p data-reveal className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-ink/75">
            Search is evolving rapidly. We optimize your digital presence not only for traditional search engines like Google and Bing, but also for generative AI answer engines (ChatGPT, Perplexity, Google Gemini).
          </p>
          <div data-reveal className="mt-8">
            <HeroAuditForm />
          </div>
          <div data-reveal className="mt-10 flex items-center gap-4 border-l border-ink pl-4">
            <div className="flex -space-x-2">
              {avatars.map((id, i) => (
                <img
                  key={id}
                  src={`https://images.unsplash.com/${id}?w=120&auto=format&fit=crop&q=80`}
                  alt={`Happy client ${i + 1}`}
                  className="h-9 w-9 rounded-full border-2 border-paper object-cover"
                />
              ))}
            </div>
            <div>
              <div className="text-[28px] font-bold leading-none tracking-[-0.04em]">199+</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Brands Scaled Across 6 Markets</div>
            </div>
          </div>
        </div>

        <div data-reveal>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
