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
    <section id="case-studies" className="pb-20 pt-10 sm:pb-24 sm:pt-12 lg:pb-32 lg:pt-14">
      <div className="wrap">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="label">Projects</span>
            <h2 className="h-section">Our Work</h2>
          </div>
          <a href="https://kolacommunications.com/projects" target="_blank" rel="noopener noreferrer" className="btn-link py-2">
            View Projects <Arrow />
          </a>
        </div>

        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study, i) => (
            <a
              key={study.client}
              href={`https://${study.website}`}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
              className="group block"
            >
              <div className="halftone aspect-[4/3] rounded-2xl border border-ink">
                <img
                  src={study.image}
                  alt={`${study.client} website homepage`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <span className="mt-4 inline-block rounded-full bg-orange px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.05em]">{study.result}</span>
              <h3 className="mt-3 text-[22px] font-bold leading-tight tracking-[-0.035em] transition-colors group-hover:text-orange">{study.client}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-ink/70">{study.description}</p>
              <div className="kicker mt-4 border-b border-ink/15 pb-3 text-[11px] text-muted">{study.website}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
