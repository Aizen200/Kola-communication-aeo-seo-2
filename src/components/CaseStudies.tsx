import React from 'react';
import Arrow from './Arrow';

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
    <section id="case-studies" className="section">
      <div className="wrap">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="label">(02) Projects</span>
            <h2 className="h-section">Our Work</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-muted">
            This is why Kola Communications builds FAQ sections into every client project page we publish, not for decoration, but because the question-and-answer format is directly indexed by AI systems as answer-ready content.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, idx) => {
            const dark = idx % 2 === 1;
            return (
              <article
                key={study.client}
                className={`flex flex-col rounded-2xl p-7 sm:p-10 ${dark ? 'bg-ink text-white shadow-float' : 'card'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`kicker text-[11px] ${dark ? 'text-white/60' : 'text-muted'}`}>{study.industry}</div>
                  <span className="shrink-0 rounded-full bg-orange px-3 py-1 text-[12px] font-bold text-ink">{study.category}</span>
                </div>
                <h3 className="display mt-6 text-[38px] sm:text-[48px]">{study.client}</h3>
                <a
                  href={`https://${study.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 inline-flex items-center gap-2 self-start text-[14px] hover:text-orange ${dark ? 'text-white/70' : 'text-muted'}`}
                >
                  {study.website} <Arrow size={12} />
                </a>
                <p className="mt-6 text-[21px] font-bold leading-snug tracking-[-0.02em]">{study.description}</p>
                <ul className={`mt-6 border-t ${dark ? 'border-white/15' : 'border-line'}`}>
                  {study.deliverables.map((item) => (
                    <li key={item} className={`border-b py-3.5 text-[15px] ${dark ? 'border-white/15 text-white/80' : 'border-line text-muted'}`}>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">
                  {study.results.map((r) => (
                    <span
                      key={r}
                      className={`rounded-full border px-3 py-1.5 text-[12px] font-bold ${dark ? 'border-white/20' : 'border-line bg-paper'}`}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-[16px] text-muted">
            +218% Organic traffic, average client growth <span className="mx-2">/</span> 1999 Brands Scaled Across 6 Markets
          </p>
          <a href="https://kolacommunications.com/projects" target="_blank" rel="noopener noreferrer" className="btn-link">
            View Projects <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
