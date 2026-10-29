import React from 'react';
import Arrow from './Arrow';

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

function Deliverables({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={`mt-4 border-t ${dark ? 'border-white/15' : 'border-line'}`}>
      {items.map((f) => (
        <li key={f} className={`flex gap-3 border-b py-3.5 text-[15px] ${dark ? 'border-white/15 text-white/85' : 'border-line'}`}>
          <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
          {f}
        </li>
      ))}
    </ul>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="section border-y border-line bg-white">
      <div className="wrap">
        <span className="label">(03) Packages</span>
        <h2 className="h-section mb-14 max-w-[900px]">Transparent ways to collaborate.</h2>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <article className="relative flex flex-col overflow-hidden rounded-2xl bg-ink p-8 text-white shadow-float sm:p-11">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/40 blur-[80px]" />
            <div className="relative flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange px-3 py-1 text-[12px] font-bold text-ink">{retainer.badge}</span>
              <span className="kicker text-[11px] text-white/60">{retainer.tag}</span>
            </div>
            <h3 className="display relative mt-8 text-[40px] sm:text-[52px]">{retainer.name}</h3>
            <p className="relative mt-5 text-[17px] leading-relaxed text-white/75">{retainer.description}</p>
            <div className="kicker relative mt-10 text-[11px] text-orange">Key Deliverables:</div>
            <Deliverables items={retainer.features} dark />
            <div className="relative mt-auto pt-10">
              <a href="#contact" className="btn-orange w-full justify-between">
                {retainer.ctaText} <Arrow />
              </a>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-line bg-paper p-8 sm:p-11">
            <span className="kicker self-start text-[11px] text-muted">{project.tag}</span>
            <h3 className="display mt-8 text-[40px] sm:text-[52px]">{project.name}</h3>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{project.description}</p>
            <div className="kicker mt-10 text-[11px] text-muted">Key Deliverables:</div>
            <Deliverables items={project.features} />
            <div className="mt-auto pt-10">
              <a href="#contact" className="btn-dark w-full justify-between">
                {project.ctaText} <Arrow />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
