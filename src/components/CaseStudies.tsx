import React from 'react';

const caseStudies = [
  {
    client: 'Dhanuka Investments',
    industry: 'Wealth Management & Financial Advisory',
    website: 'dhanukainvestments.com',
    description:
      'SEO, AEO & GEO for a wealth management and financial advisory firm. We structured the site for wealth management search with target keyphrases, FinancialService and LocalBusiness schema, and FAQ content built around their advisory services and how they build long-term client wealth.',
    deliverables: [
      'SEO structure for wealth management search',
      'FinancialService + LocalBusiness schema markup',
      'AEO FAQs with FAQPage schema',
    ],
    results: [
      '4 target keyphrases (SEO)',
      '2 schema types (FinancialService + LocalBusiness)',
      '3 AEO FAQs live (FAQPage schema)',
    ],
  },
  {
    client: 'Kanodia Enterprises',
    industry: 'Steel Solutions & Industrial Products',
    website: 'kanodiaenterprise.com',
    description:
      'SEO and AEO for a steel solutions and industrial products business. We structured the site for steel solutions search with target keyphrases, LocalBusiness and Product schema, and FAQ content covering their product range, industrial expertise and B2B client acquisition.',
    deliverables: [
      'SEO structure for steel solutions search',
      'LocalBusiness + Product schema markup',
      'AEO FAQs with FAQPage schema',
    ],
    results: [
      '4 target keyphrases (SEO)',
      '2 schema types (LocalBusiness + Product)',
      '3 AEO FAQs live (FAQPage schema)',
    ],
  },
  {
    client: 'Revent AI',
    industry: 'AI Document-to-Presentation Platform',
    website: 'revent.ai',
    description:
      'SEO and AEO for an AI platform that converts documents into branded slides. We structured the site for AI presentation search with target keyphrases, SoftwareApplication and FAQPage schema, and FAQ content on its templates, brand sync, one-click workflow and use across 63+ countries.',
    deliverables: [
      'SEO structure for AI presentation search',
      'SoftwareApplication + FAQPage schema markup',
      'AEO FAQs with FAQPage schema',
    ],
    results: [
      '5 target keyphrases (SEO)',
      '2 schema types (SoftwareApplication + FAQPage)',
      '3 AEO FAQs live (FAQPage schema)',
    ],
  },
  {
    client: 'Veena Developers',
    industry: 'Real Estate · Mumbai',
    website: 'veenadevelopers.com',
    description:
      'SEO and AEO for one of Mumbai’s trusted real estate builders. We structured the site for Mumbai real estate search with target keyphrases, RealEstateAgent and LocalBusiness schema, and FAQ content covering their residential and commercial portfolio, redevelopment services and community impact.',
    deliverables: [
      'SEO structure for Mumbai real estate search',
      'RealEstateAgent + LocalBusiness schema markup',
      'AEO FAQs with FAQPage schema',
    ],
    results: [
      '5 target keyphrases (SEO)',
      '2 schema types (RealEstateAgent + LocalBusiness)',
      '3 AEO FAQs live (FAQPage schema)',
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section case-studies bg-wash">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 02 / CLIENT WORK
            </div>
            <h2>
              Real clients.
              <br />
              Real search foundations.
            </h2>
          </div>
          <p>
            Each client gets target keyphrases, schema markup and AEO-ready FAQ content, structured so Google and AI answer engines can understand, rank and cite the business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {caseStudies.map((study, idx) => (
            <article
              key={idx}
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
                  </div>
                </div>

                <p className="text-[15px] text-muted leading-relaxed mb-6">
                  {study.description}
                </p>

                <div className="mb-6">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink mb-3">
                    SEO, AEO & GEO Work:
                  </div>
                  <ul className="space-y-2">
                    {study.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-[13px] text-muted">
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
                <div className="text-[11px] font-bold uppercase tracking-wider text-green mb-2">
                  Search Foundations Shipped:
                </div>
                <div className="text-[13px] text-ink font-medium leading-relaxed">
                  {study.results.join(' · ')}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[14px] text-muted mb-4">
            +218% average organic traffic growth across clients · 199+ brands scaled across 6 markets.
          </p>
          <a className="button" href="#contact">
            Discuss your search visibility{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

