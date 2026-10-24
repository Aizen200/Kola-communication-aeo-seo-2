import React from 'react';

const packages = [
  {
    tag: 'Continuous Scaling',
    badge: 'Most Popular',
    name: 'Monthly SEO, AEO & GEO Retainer',
    description:
      'A fully managed monthly engagement covering search strategy, execution and reporting across Google and AI search engines, so you can focus on running your business.',
    timeline: 'Monthly · Weekly Sprints',
    features: [
      'Dedicated account manager & weekly sprints',
      'SEO, AEO & GEO for Google and AI search engines',
      'High-intent keyword strategy & content topic clusters',
      'Question-led FAQ content with FAQPage schema',
      'High-quality white-hat editorial link acquisition',
      'Monthly executive analytics reports',
    ],
    ctaText: 'Inquire for Retainer',
    popular: true,
  },
  {
    tag: 'Milestone Based',
    badge: 'Fixed Scope',
    name: 'One-Time SEO, AEO & GEO Setup',
    description:
      'End-to-end execution of a defined search scope: fix what stops Google from indexing and ranking your site, then structure your key pages so AI answer engines can cite them.',
    timeline: 'Clearly Defined Scope & Milestones',
    features: [
      'Technical SEO audit & Core Web Vitals remediation',
      'Answer & Generative Engine Optimization (AEO & GEO) for LLMs & AI Search',
      'Structured schema markup & rich snippet engineering',
      'FAQ sections & FAQPage schema on key pages',
      'Dedicated project manager & milestone reviews',
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
              <i className="dot"></i> 03 / ENGAGEMENT MODELS
            </div>
            <h2>
              Two ways to work with us.
              <br />
              Clear scope, no surprises.
            </h2>
          </div>
          <p>
            Choose a one-time setup for a defined search scope, or a monthly retainer for ongoing SEO, AEO and GEO. Either way you get clear milestones and transparent reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
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
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      pkg.popular
                        ? 'bg-green text-white'
                        : 'bg-sage/70 text-ink'
                    }`}
                  >
                    {pkg.badge}
                  </span>
                </div>

                <h3 className="text-[25px] font-bold text-ink tracking-tight mb-3">
                  {pkg.name}
                </h3>
                <p className="text-[14px] text-muted leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="text-[12px] font-semibold text-green bg-sage/40 rounded px-3 py-2 mb-6 inline-block">
                  Timeline: {pkg.timeline}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink mb-3">
                    What’s Included:
                  </div>
                  {pkg.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
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
          <div>
            <div className="text-[16px] font-bold text-ink mb-1">
              Not sure which engagement fits?
            </div>
            <p className="text-[14px] text-muted">
              We review your current organic search rankings, Core Web Vitals, and AI citation footprint before recommending an engagement model.
            </p>
          </div>
          <a className="button shrink-0 text-[13px] py-3 px-5" href="#audit">
            Start with a Technical Audit{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5">
              <use href="#arrow-right" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

