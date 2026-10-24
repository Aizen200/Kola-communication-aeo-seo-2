'use client';

import React, { useState } from 'react';

// Verbatim from Kola's article "8 reasons your website is not on Google"
// (kolacommunications.com/blogs/website-not-indexed-google-fix).
const auditPillars = [
  {
    no: '01',
    title: 'Your website is blocking Google with a noindex tag',
    description:
      'A noindex tag is a piece of code that tells Google not to include a page in search results.',
  },
  {
    no: '02',
    title: 'Your robots.txt file is blocking Google',
    description:
      'robots.txt is a file on your website that tells search engine crawlers which pages or sections they are allowed to visit.',
  },
  {
    no: '03',
    title: 'Your website has no SEO content',
    description:
      'If your website has no text content that matches what people actually search for, it will not appear for those searches regardless of how well it is built technically.',
  },
  {
    no: '04',
    title: 'Your website is too slow',
    description:
      'A website that takes more than three seconds to load on mobile is significantly less likely to rank well, particularly in India where a large share of users are on mobile networks.',
  },
];

export default function WebsiteAudit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `SEO Audit Request - ${formData.company || formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\n${formData.project}`;
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
              <i className="dot"></i> 04 / SEO AUDITS
            </div>
            <h2>
              8 reasons your website
              <br />
              is not on Google
            </h2>
          </div>
          <p>
            For businesses with existing websites that are not performing on Google, Kola also offers SEO audits that identify exactly which of these issues are present and what needs to be done to fix them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-[24px] font-bold text-ink tracking-tight mb-4">
              Technical SEO Audits & Core Web Vitals Remediation
            </h3>

            <div className="p-4 rounded-lg bg-wash border-l-2 border-green text-[13px] text-muted leading-relaxed">
              &ldquo;A website that does not show on Google is, for most practical purposes, a website that does not exist. Potential clients cannot find you, your investment in the build is not working, and the gap between you and competitors who do appear is growing every week.&rdquo;
              <span className="block mt-1 font-semibold not-italic text-ink text-[12px]">— Kola Communications, 8 reasons your website is not on Google and what to do about each one</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {auditPillars.map((pillar) => (
                <div
                  key={pillar.no}
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
              <i className="dot"></i> Response within 3–4 hours
            </div>
            <h3 className="text-[22px] font-bold text-ink mb-2">
              Book a Free Strategy Call
            </h3>
            <p className="text-[13px] text-muted mb-6">
              Tell us about your timeline, goals, and project scope.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Your Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Company / Brand
                </label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-ink mb-1">
                  Tell us about your project
                </label>
                <textarea
                  rows={3}
                  placeholder="What are your goals, timeline, and current challenges?"
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  className="w-full bg-paper border border-line px-3.5 py-2.5 rounded text-[14px] text-ink focus:border-green focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full button justify-between bg-green text-white mt-2"
              >
                <span>Book a Free Strategy Call</span>
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                  <use href="#arrow-up" />
                </svg>
              </button>

              <div className="text-[11px] text-muted text-center pt-2">
                We respect client confidentiality and regularly sign mutual NDAs before reviewing sensitive business data or project requirements.
              </div>

              {status && (
                <div className="p-4 bg-sage/50 border border-line rounded text-[13px] text-ink mt-3">
                  <a
                    href={status}
                    className="inline-flex items-center gap-2 text-green font-bold underline"
                  >
                    Open email draft ↗
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
