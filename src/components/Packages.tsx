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
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-[3px] shrink-0 text-orange">
      <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-[3px] shrink-0 text-muted/40">
      <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="section">
      <div className="wrap">
        <span className="label">(03) Packages</span>
        <h2 className="h-section mb-14 max-w-[900px]">Transparent ways to collaborate.</h2>

        <div className="grid items-stretch gap-x-5 gap-y-14 pt-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const popular = Boolean(plan.badge);
            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-white p-7 sm:p-8 ${
                  popular ? 'border-2 border-orange shadow-float' : 'border border-line'
                }`}
              >
                {popular && (
                  <div className="absolute inset-x-[-2px] -top-9 flex h-10 items-center justify-center rounded-t-2xl bg-orange text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                    {plan.badge}
                  </div>
                )}
                <span className="kicker text-[11px] text-muted">{plan.tag}</span>
                <h3 className="mt-3 text-[26px] font-bold leading-tight tracking-[-0.03em]">{plan.name}</h3>
                <p className="mt-2 text-[15px] lg:min-h-[66px] leading-snug text-muted">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="display text-[46px] leading-none">{plan.price}</span>
                  <span className="text-[15px] font-bold text-muted">{plan.period}</span>
                </div>

                <a href="#contact" className={`${popular ? 'btn-orange' : 'btn-outline'} mt-7 w-full justify-between`}>
                  {plan.ctaText} <Arrow />
                </a>

                <div className="mt-8 border-t border-line pt-6">
                  <div className="kicker text-[11px] text-muted">Key Deliverables:</div>
                  <ul className="mt-4 space-y-3.5">
                    {features.map((f, i) => {
                      const on = i < plan.included;
                      return (
                        <li key={f} className={`flex gap-3 text-[15px] leading-snug ${on ? 'font-bold text-ink' : 'text-muted/50 line-through decoration-muted/30'}`}>
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
