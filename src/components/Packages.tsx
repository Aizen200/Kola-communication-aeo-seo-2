import React from 'react';
import Arrow from './Arrow';

// Feature names are verbatim from kolacommunications.com/services ("Transparent ways to collaborate."),
// limited to the SEO, AEO & GEO deliverables.
// PLACEHOLDER: prices, the third plan and which features each plan includes are layout
// stand-ins until the final pricing and feature content is provided.
const features = [
  'SEO, AEO & GEO for Google and AI search engines',
  'Technical SEO Audits & Core Web Vitals Remediation',
  'Structured Schema Markup & Rich Snippet Engineering',
  'Answer & Generative Engine Optimization (AEO & GEO) for LLMs & AI Search',
  'High-Intent Keyword Strategy & Content Topic Clusters',
  'High-Quality White-Hat Editorial Link Acquisition',
  'Monthly executive analytics reports',
  'Dedicated account manager & weekly sprints',
];

const plans = [
  {
    tag: 'Milestone Based',
    name: 'One-Time Project',
    description: 'Clearly defined scope & fixed timeline',
    price: '₹XX,XXX',
    period: '/project',
    included: 4,
    ctaText: 'Request Project Proposal',
  },
  {
    tag: 'Continuous Scaling',
    badge: 'Most Popular',
    name: 'Monthly Growth Retainer',
    description:
      'A fully managed monthly engagement covering strategy, execution and reporting, so you can focus on running your business.',
    price: '₹XX,XXX',
    period: '/month',
    included: 7,
    ctaText: 'Inquire for Retainer',
  },
  {
    tag: 'Plan tag',
    name: 'Plan name',
    description: 'Plan description',
    price: '₹XX,XXX',
    period: '/month',
    included: 8,
    ctaText: 'Get Started',
  },
];

function Check() {
  return <span aria-hidden="true" className="mx-[5px] mt-[8px] h-2 w-2 shrink-0 rounded-full bg-orange" />;
}

function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-[3px] shrink-0 opacity-70">
      <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="section">
      <div className="wrap">
        <span className="label">Packages</span>
        <h2 className="h-section mb-14 max-w-[900px]">
          Transparent ways to collaborate.
        </h2>

        <div className="grid items-stretch gap-x-5 gap-y-10 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const popular = Boolean(plan.badge);
            return (
              <article
                key={plan.name}
                data-reveal
                style={{ '--d': `${plans.indexOf(plan) * 90}ms` } as React.CSSProperties}
                className={`relative flex flex-col rounded-2xl border border-ink p-7 sm:p-8 ${popular ? 'bg-ink text-paper' : 'bg-paper'}`}
              >
                {popular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-ink bg-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink">
                    {plan.badge}
                  </div>
                )}
                <span className={`kicker text-[11px] ${popular ? 'text-paper/55' : 'text-muted'}`}>{plan.tag}</span>
                <h3 className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.04em]">{plan.name}</h3>
                <p className={`mt-2 text-[15px] leading-snug lg:min-h-[66px] ${popular ? 'text-paper/65' : 'text-muted'}`}>{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="display text-[50px] leading-none">{plan.price}</span>
                  <span className={`text-[15px] ${popular ? 'text-paper/55' : 'text-muted'}`}>{plan.period}</span>
                </div>

                <a href="#contact" className={`${popular ? 'btn-orange' : 'btn-outline'} order-last mt-8 w-full justify-between`}>
                  {plan.ctaText} <Arrow />
                </a>

                <div className={`mt-7 border-t pt-6 ${popular ? 'border-paper/15' : 'border-ink/15'}`}>
                  <div className={`kicker text-[11px] ${popular ? 'text-paper/55' : 'text-muted'}`}>Key Deliverables:</div>
                  <ul className="mt-4 space-y-3.5">
                    {features.map((f, i) => {
                      const on = i < plan.included;
                      return (
                        <li key={f} className={`flex gap-3 text-[15px] leading-snug ${on ? 'font-semibold' : 'line-through opacity-40'}`}>
                          {on ? <Check /> : <Cross />}
                          <span>
                            {f}
                            <span className="sr-only">{on ? ' (included)' : ' (not included)'}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
