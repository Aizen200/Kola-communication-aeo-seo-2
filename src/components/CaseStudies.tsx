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
    <section id="case-studies" className="section border-y-2 border-ink bg-forest text-paper">
      <div className="wrap">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="label text-paper/75">(02) Projects</span>
            <h2 className="h-section text-paper">Our Work</h2>
          </div>
          <p className="text-[17px] leading-relaxed text-paper/80">
            This is why Kola Communications builds FAQ sections into every client project page we publish, not for decoration, but because the question-and-answer format is directly indexed by AI systems as answer-ready content.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {caseStudies.map((study, idx) => {
            const accent = idx % 2 === 1;
            return (
              <article
                key={study.client}
                className={`flex flex-col border-2 border-ink p-7 text-ink sm:p-9 ${
                  accent ? 'bg-orange shadow-hard-paper' : 'bg-paper shadow-hard-orange'
                }`}
              >
                <div className="kicker text-[11px]">{study.industry}</div>
                <h3 className="display mt-3 text-[40px] sm:text-[52px]">{study.client}</h3>
                <div className="mt-2 text-[14px]">
                  <a href={`https://${study.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {study.website}
                  </a>
                  <span className="mx-2">/</span>
                  {study.category}
                </div>
                <p className="mt-5 font-serif text-[24px] italic leading-snug">{study.description}</p>
                <ul className="mt-6 border-t-2 border-ink">
                  {study.deliverables.map((item) => (
                    <li key={item} className="border-b-2 border-ink py-3 text-[16px]">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {study.results.map((r, i) => {
                    const last = i === study.results.length - 1;
                    const chip = last
                      ? accent
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-orange text-ink border-ink'
                      : 'border-ink';
                    return (
                      <span key={r} className={`border-2 px-2.5 py-1 text-[13px] font-bold ${chip}`}>
                        {r}
                      </span>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-[17px] text-paper/80">
            +218% Organic traffic, average client growth <span className="mx-2">/</span> 1999 Brands Scaled Across 6 Markets
          </p>
          <a
            href="https://kolacommunications.com/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="btn border-paper bg-paper text-ink"
          >
            View Projects <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
