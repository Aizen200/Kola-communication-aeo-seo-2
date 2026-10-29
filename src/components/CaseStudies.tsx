import React from 'react';
import Arrow from './Arrow';

// Verbatim from Kola's project CMS (cms.kolacommunications.com).
// Images are screenshots of the client's live website.
const caseStudies = [
  {
    client: 'Dhanuka Investments',
    industry: 'Wealth Management & Financial Advisory Services',
    website: 'dhanukainvestments.com',
    image: '/images/project-dhanuka.jpg',
    description: 'How we built trust into every page of Dhanuka Investments',
    result: '4 Target Keyphrases (SEO)',
  },
  {
    client: 'Kanodia Enterprises',
    industry: 'Steel Solutions & Industrial Products',
    website: 'kanodiaenterprise.com',
    image: '/images/project-kanodia.jpg',
    description: 'How we positioned Kanodia Enterprises as an industrial brand online',
    result: '4 Target Keyphrases (SEO)',
  },
  {
    client: 'Tazaari',
    industry: 'Men & Women Fashion That Blends Comfort With Class',
    website: 'tazaari.com',
    image: '/images/project-tazaari.jpg',
    description: 'Building Tazaari — our approach to fashion e-commerce that converts',
    result: '6 Target Keyphrases (SEO)',
  },
  {
    client: 'Livyor',
    industry: 'Premium Dry Fruits, Nuts & Healthy Snacks Online',
    website: 'livyor.com',
    image: '/images/project-livyor.jpg',
    description: "From brief to build — how we brought Livyor's health brand to Shopify",
    result: '5 Target Keyphrases (SEO)',
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section">
      <div className="wrap">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="label">(02) Projects</span>
            <h2 className="h-section">Our Work</h2>
          </div>
          <a href="https://kolacommunications.com/projects" target="_blank" rel="noopener noreferrer" className="btn-link">
            View Projects <Arrow />
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study) => (
            <a
              key={study.client}
              href={`https://${study.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-float"
            >
              <div className="overflow-hidden border-b border-line">
                <img
                  src={study.image}
                  alt={`${study.client} website homepage`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="kicker line-clamp-1 text-[10px] text-muted">{study.industry}</div>
                <h3 className="mt-2 flex items-center justify-between gap-3 text-[20px] font-bold tracking-[-0.025em]">
                  {study.client}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-orange group-hover:bg-orange">
                    <Arrow size={12} />
                  </span>
                </h3>
                <p className="mt-2 text-[14px] leading-snug text-muted">{study.description}</p>
                <div className="mt-auto pt-4">
                  <span className="inline-block rounded-full bg-paper px-3 py-1 text-[12px] font-bold">{study.result}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
