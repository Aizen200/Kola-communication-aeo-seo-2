import React from 'react';
import Arrow from './Arrow';

// Verbatim from Kola's project CMS (cms.kolacommunications.com). Only projects whose
// SEO/AEO work is visible on the client's live site are listed here.
// Images are screenshots of the client's live website.
const caseStudies = [
  {
    client: 'Dhanuka Investments',
    industry: 'Wealth Management & Financial Advisory Services',
    website: 'dhanukainvestments.com',
    image: '/images/project-dhanuka.jpg',
    category: 'SEO, AEO & GEO',
    description: 'How we built trust into every page of Dhanuka Investments',
    results: ['4 Target Keyphrases (SEO)', '2 Schema Types', '3 AEO FAQs Live'],
  },
  {
    client: 'Kanodia Enterprises',
    industry: 'Steel Solutions & Industrial Products',
    website: 'kanodiaenterprise.com',
    image: '/images/project-kanodia.jpg',
    category: 'SEO',
    description: 'How we positioned Kanodia Enterprises as an industrial brand online',
    results: ['4 Target Keyphrases (SEO)', '3 AEO FAQs Live'],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section">
      <div className="wrap">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="label">(02) Projects</span>
            <h2 className="h-section">Our Work</h2>
          </div>
          <a href="https://kolacommunications.com/projects" target="_blank" rel="noopener noreferrer" className="btn-link">
            View Projects <Arrow />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <a
              key={study.client}
              href={`https://${study.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-shadow hover:shadow-float"
            >
              <div className="relative bg-sand p-5 pb-0 sm:p-7 sm:pb-0">
                <div className="overflow-hidden rounded-t-xl border border-b-0 border-line bg-white">
                  <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="ml-3 truncate text-[10px] text-muted">{study.website}</span>
                  </div>
                  <img
                    src={study.image}
                    alt={`${study.client} website homepage`}
                    width={1440}
                    height={900}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <span className="absolute right-8 top-8 rounded-full bg-orange px-3 py-1 text-[12px] font-bold text-ink sm:right-10 sm:top-10">
                  {study.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <div className="kicker text-[10px] text-muted">{study.industry}</div>
                <h3 className="display mt-3 flex items-center justify-between gap-4 text-[30px] sm:text-[36px]">
                  {study.client}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-orange group-hover:bg-orange">
                    <Arrow size={14} />
                  </span>
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{study.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {study.results.map((r) => (
                    <li key={r} className="rounded-full border border-line bg-paper px-3 py-1.5 text-[12px] font-bold">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
