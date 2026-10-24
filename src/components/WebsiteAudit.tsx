'use client';

import React, { useState } from 'react';

const auditPillars = [
  {
    no: '01',
    title: 'Indexing & Technical SEO',
    description:
      'We check whether Google can find and index your site: sitemap submission in Search Console, accidental noindex tags, robots.txt blocks, and mobile page speed via PageSpeed Insights.',
  },
  {
    no: '02',
    title: 'AEO Readiness',
    description:
      'Does your content directly answer the questions your audience asks? Do key pages have FAQ sections with concise answers? Is FAQPage schema in place so AI tools like ChatGPT and Perplexity can read them?',
  },
  {
    no: '03',
    title: 'Schema & Rich Snippets',
    description:
      'We review the structured data on your pages (Organization, LocalBusiness, Product, FAQPage) that tells search engines and AI tools what your content is and makes it eligible for rich results.',
  },
  {
    no: '04',
    title: 'Keywords, Content & Links',
    description:
      'We look at whether your pages contain the phrases customers actually search for, whether you are targeting keywords you can realistically compete for yet, and whether any sites link to you.',
  },
];

export default function WebsiteAudit() {
  const [formData, setFormData] = useState({
    website: '',
    email: '',
    company: '',
    industry: 'Industrial & Manufacturing',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Free B2B SEO, AEO & GEO Audit Request - ${formData.company || formData.website}`;
    const body = `Hi Kola Communications Team,\n\nI would like to request a comprehensive SEO, AEO & GEO Visibility Audit.\n\nWebsite: ${formData.website}\nCompany: ${formData.company}\nWork Email: ${formData.email}\nPrimary Industry: ${formData.industry}\n\nPlease audit our Technical SEO, Core Web Vitals, AEO (AI answer visibility), GEO (Generative Engine Optimization), and schema architecture.\n\nThank you!`;
    const mailto = `mailto:business@kolacommunications.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus(mailto);
  };

  return (
    <section id="audit" className="section audit bg-paper border-t border-line-subtle">
      <div className="wrap">
        <div className="section-header">
          <div>
            <div className="eyebrow">
              <i className="dot"></i> 04 / COMPREHENSIVE SEO, AEO & GEO AUDIT
            </div>
            <h2>
              Find out where your website
              <br />
              is losing organic buyers.
            </h2>
          </div>
          <p>
            Request a diagnostic assessment of your website’s technical SEO foundations, Core Web Vitals, and readiness for generative AI answer engines (AEO & GEO).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-[24px] font-bold text-ink tracking-tight mb-4">
              What Our Website Audit Evaluates:
            </h3>

            <div className="p-4 rounded-lg bg-wash border-l-2 border-green text-[13px] text-muted leading-relaxed">
              &ldquo;A website that does not show on Google is, for most practical purposes, a website that does not exist. Potential clients cannot find you, your investment in the build is not working, and the gap between you and competitors who do appear is growing every week.&rdquo;
              <span className="block mt-1 font-semibold not-italic text-ink text-[12px]">— Kola Communications, 8 reasons your website is not on Google</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {auditPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-wash border border-line-subtle flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[12px] font-bold text-green mb-2 block">
                      {pillar.no}
                    </span>
                    <h4 className="text-[17px] font-bold text-ink mb-2 leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-[13px] text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-wash p-8 sm:p-10 rounded-lg border border-line-subtle shadow-sm">
            <div className="eyebrow text-green mb-3">
              <i className="dot"></i> NO OBLIGATION AUDIT
            </div>
            <h3 className="text-[22px] font-bold text-ink mb-2">
              Request Your SEO, AEO & GEO Audit
            </h3>
            <p className="text-[13px] text-muted mb-6">
              Enter your business website and work email. We review your live search indexation, Core Web Vitals, and AI answer citations to deliver prioritized recommendations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Company Website <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. www.yourcompany.com"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Work Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your Business or Brand"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Industry / Sector
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                >
                  <option value="Industrial & Manufacturing">
                    Industrial & Manufacturing
                  </option>
                  <option value="Real Estate & Infrastructure">
                    Real Estate & Infrastructure
                  </option>
                  <option value="Technology & SaaS">
                    Technology & SaaS
                  </option>
                  <option value="Financial & Professional Services">
                    Financial & Professional Services
                  </option>
                  <option value="E-commerce & D2C">
                    E-commerce & D2C
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full button justify-between bg-green text-white mt-2"
              >
                <span>Generate Audit Request</span>
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                  <use href="#arrow-up" />
                </svg>
              </button>

              <div className="text-[11px] text-muted text-center pt-2">
                We respect confidentiality. Mutual NDAs signed upon request.
              </div>

              {status && (
                <div className="p-4 bg-sage/50 border border-line rounded text-[13px] text-ink mt-3">
                  <p className="font-semibold mb-1">Your request is prepared!</p>
                  <p className="text-muted text-[12px] mb-2">
                    Click below to open your email client and send your audit details directly to the Kola team.
                  </p>
                  <a
                    href={status}
                    className="inline-flex items-center gap-2 text-green font-bold underline"
                  >
                    Open Email Draft ↗
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

