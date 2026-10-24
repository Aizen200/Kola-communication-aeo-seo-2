import React from 'react';

// Verbatim from kolacommunications.com/services ("Transparent ways to collaborate."),
// limited to the SEO, AEO & GEO deliverables.
const packages = [
  {
    tag: 'Continuous Scaling',
    badge: 'Most Popular',
    name: 'Monthly Growth Retainer',
    description:
      'A fully managed monthly engagement covering strategy, execution and reporting, so you can focus on running your business.',
    features: [
      'Dedicated account manager & weekly sprints',
      'SEO, AEO & GEO for Google and AI search engines',
      'High-Intent Keyword Strategy & Content Topic Clusters',
      'High-Quality White-Hat Editorial Link Acquisition',
      'Monthly executive analytics reports',
    ],
    ctaText: 'Inquire for Retainer',
    popular: true,
  },
  {
    tag: 'Milestone Based',
    badge: 'One-Time Project',
    name: 'One-Time Project',
    description: 'Clearly defined scope & fixed timeline',
    features: [
      'Technical SEO Audits & Core Web Vitals Remediation',
      'Answer & Generative Engine Optimization (AEO & GEO) for LLMs & AI Search',
      'Structured Schema Markup & Rich Snippet Engineering',
      'Dedicated project manager & milestone reviews',
      'Strict adherence to budgets & deliverables',
    ],
    ctaText: 'Request Project Proposal',
    popular: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="section packages">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 03 / PACKAGES
            </div>
            <h2>
              Transparent ways
              <br />
              to collaborate.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 sm:p-10 rounded-lg border flex flex-col justify-between transition-all duration-200 ${
                pkg.popular
                  ? 'border-green bg-wash/80 shadow-md ring-1 ring-green/20'
                  : 'border-line-subtle bg-paper shadow-sm hover:border-line'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    {pkg.tag}
                  </span>
                  {pkg.popular && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green text-white">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-[25px] font-bold text-ink tracking-tight mb-3">
                  {pkg.name}
                </h3>
                <p className="text-[14px] text-muted leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink mb-3">
                    Key Deliverables:
                  </div>
                  {pkg.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5 text-[13px] text-muted leading-snug"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-green mt-0.5 shrink-0"
                        aria-hidden="true"
                      >
                        <use href="#check" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-line-subtle">
                <a
                  className={`w-full button justify-between ${
                    pkg.popular
                      ? 'bg-green text-white hover:bg-[#335345]'
                      : 'bg-paper text-ink border-line hover:border-green hover:bg-wash'
                  }`}
                  href="#contact"
                >
                  <span>{pkg.ctaText}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                    <use href="#arrow-up" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 sm:p-8 bg-wash rounded-lg border border-line-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[16px] font-bold text-ink">
            How do we choose between a monthly retainer and a one-time project?
          </div>
          <a className="button shrink-0 text-[13px] py-3 px-5" href="#contact">
            Schedule a Discovery Call{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5">
              <use href="#arrow-right" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
