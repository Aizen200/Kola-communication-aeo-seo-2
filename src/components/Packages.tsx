import React from 'react';

// Verbatim from kolacommunications.com/services ("Transparent ways to collaborate."),
// limited to the SEO, AEO & GEO deliverables.
const retainer = {
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
};

const project = {
  tag: 'Milestone Based',
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
};

export default function Packages() {
  return (
    <section id="packages" className="section">
      <div className="wrap">
        <span className="label">(03) Packages</span>
        <h2 className="h-section mb-12 max-w-[900px]">Transparent ways to collaborate.</h2>

        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <article className="flex flex-col border-2 border-ink bg-ink p-8 text-paper shadow-hard-orange sm:p-10">
            <span className="kicker self-start bg-orange px-3 py-1.5 text-ink">{retainer.badge}</span>
            <div className="kicker mt-5 text-paper/70">{retainer.tag}</div>
            <h3 className="display mt-3 text-[48px] sm:text-[60px]">{retainer.name}</h3>
            <p className="mt-5 text-[17px] leading-relaxed text-paper/80">{retainer.description}</p>
            <div className="kicker mt-8 text-orange">Key Deliverables:</div>
            <ul className="mt-3 border-t border-paper/25">
              {retainer.features.map((f) => (
                <li key={f} className="border-b border-paper/25 py-3 text-[16px]">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a href="#contact" className="btn w-full justify-between border-orange bg-orange text-ink">
                {retainer.ctaText} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>

          <article className="flex flex-col border-2 border-ink bg-white p-8 shadow-hard sm:p-10">
            <span className="kicker self-start border-2 border-ink px-3 py-1">{project.tag}</span>
            <h3 className="display mt-9 text-[48px] sm:text-[60px]">{project.name}</h3>
            <p className="mt-5 text-[17px] leading-relaxed">{project.description}</p>
            <div className="kicker mt-8 text-muted">Key Deliverables:</div>
            <ul className="mt-3 border-t-2 border-ink">
              {project.features.map((f) => (
                <li key={f} className="border-b-2 border-ink py-3 text-[16px]">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <a href="#contact" className="btn-outline w-full justify-between">
                {project.ctaText} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-y-2 border-ink py-6 sm:flex-row sm:items-center">
          <p className="font-serif text-[24px] italic leading-snug sm:text-[30px]">
            How do we choose between a monthly retainer and a one-time project?
          </p>
          <a href="#contact" className="btn-dark shrink-0">
            Schedule a Discovery Call <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
