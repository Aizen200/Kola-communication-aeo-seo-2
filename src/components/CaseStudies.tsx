import React from 'react';

// Verbatim from Kola's project CMS (cms.kolacommunications.com). Only projects whose
// SEO/AEO work is visible on the client's live site are listed here.
const caseStudies = [
  {
    client: 'Dhanuka Investments',
    industry: 'Wealth Management & Financial Advisory Services',
    website: 'dhanukainvestments.com',
    category: 'SEO, AEO & GEO',
    description: 'How we built trust into every page of Dhanuka Investments',
    deliverables: [
      'SEO structure for wealth management search',
      'Dhanuka Investments advisory services & financial expertise',
      'How Dhanuka Investments builds long-term client wealth',
    ],
    results: [
      '4 Target Keyphrases (SEO)',
      '2 Schema Types (FinancialService + LocalBusiness)',
      '3 AEO FAQs Live (Schema: FAQPage)',
    ],
  },
  {
    client: 'Kanodia Enterprises',
    industry: 'Steel Solutions & Industrial Products',
    website: 'kanodiaenterprise.com',
    category: 'SEO',
    description: 'How we positioned Kanodia Enterprises as an industrial brand online',
    deliverables: [
      'SEO structure for steel solutions search',
      'Kanodia Enterprises product range & industrial expertise',
      'Kanodia Enterprises B2B digital presence & client acquisition',
    ],
    results: ['4 Target Keyphrases (SEO)', '3 AEO FAQs Live (Schema: FAQPage)'],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section case-studies bg-wash">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 02 / PROJECTS
            </div>
            <h2>
              Our Work
            </h2>
          </div>
          <p>
            This is why Kola Communications builds FAQ sections into every client project page we publish, not for decoration, but because the question-and-answer format is directly indexed by AI systems as answer-ready content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {caseStudies.map((study) => (
            <article
              key={study.client}
              className="bg-paper p-8 sm:p-10 rounded-lg border border-line-subtle shadow-sm flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="mb-5 border-b border-line-subtle pb-4">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-green bg-sage/50 px-2.5 py-0.5 rounded mb-2">
                    {study.industry}
                  </span>
                  <h3 className="text-[24px] font-bold text-ink tracking-tight">
                    {study.client}
                  </h3>
                  <div className="text-[12px] text-muted font-normal mt-1 flex items-center gap-1.5">
                    <a href={`https://${study.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-green">{study.website} ↗</a>
                    <span>·</span>
                    <span>{study.category}</span>
                  </div>
                </div>

                <p className="text-[15px] text-muted leading-relaxed mb-6">
                  {study.description}
                </p>

                <div className="mb-6">
                  <ul className="space-y-2">
                    {study.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-muted">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-green mt-0.5 shrink-0"
                          aria-hidden="true"
                        >
                          <use href="#check" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-line-subtle pt-5 mt-2 bg-wash/60 -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 p-6 sm:px-10 rounded-b-lg">
                <div className="text-[13px] text-ink font-medium leading-relaxed">
                  {study.results.join(' · ')}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[14px] text-muted mb-4">
            +218% Organic traffic, average client growth · 199+ Brands Scaled Across 6 Markets
          </p>
          <a className="button" href="https://kolacommunications.com/projects" target="_blank" rel="noopener noreferrer">
            View Projects{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
