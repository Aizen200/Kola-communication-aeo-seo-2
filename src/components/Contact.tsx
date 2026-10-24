'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    service: 'Monthly SEO, AEO & GEO Retainer',
    goal: '',
  });

  const [status, setStatus] = useState<{
    submitted: boolean;
    mailtoUrl: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body =
      `Website Review & Partnership Request\n\n` +
      `Name: ${formData.name}\n` +
      `Work Email: ${formData.email}\n` +
      `Website: ${formData.website}\n` +
      `Preferred Engagement: ${formData.service}\n\n` +
      `Goals & Requirements:\n` +
      (formData.goal ||
        'I would like to discuss SEO, AEO, and search visibility for my B2B business.');

    const mailtoUrl =
      'mailto:business@kolacommunications.com?subject=' +
      encodeURIComponent(`Search & AEO Consultation Request - ${formData.website || formData.name}`) +
      '&body=' +
      encodeURIComponent(body);

    setStatus({
      submitted: true,
      mailtoUrl,
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <div className="eyebrow">
            <i className="dot"></i> 08 / START A CONVERSATION
          </div>
          <h2>
            Your next chapter
            <br />
            in search <span>starts here.</span>
          </h2>
          <p>
            Share your website and what you want to improve. We’ll review your live search presence and schedule a strategic consultation with our technical team in Mumbai.
          </p>

          <div className="mt-8 space-y-4">
            <a className="contact-email" href="mailto:business@kolacommunications.com">
              business@kolacommunications.com{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#arrow-up" />
              </svg>
            </a>

            <div className="text-[13px] text-muted-foreground/80 text-[#c6d0c2] leading-relaxed pt-2">
              <strong>Direct Phone:</strong> <a href="tel:+918928984774" className="hover:text-white underline">+91 89289 84774</a>
              <br />
              <strong>Office:</strong> 23, 2nd Floor, Sharda Bhavan, Fatak Road / Narayan Joshi Road, Kandivali West, Mumbai – 400067
              <br />
              <strong>Hours:</strong> Mon – Fri, 9:30 AM – 9:00 PM IST
              <br />
              <strong>Global Clientele:</strong> India · Australia · United States · United Kingdom · UAE
            </div>
          </div>
        </div>

        <form className="contact-form" id="review-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              placeholder="Full name"
              autoComplete="name"
              required
              maxLength={120}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
              maxLength={160}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="website">Company website</label>
            <input
              id="website"
              name="website"
              type="text"
              inputMode="url"
              placeholder="www.yourcompany.com"
              required
              maxLength={300}
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="service">Engagement of interest</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="SEO, AEO & GEO Website Audit" className="bg-[#203c32] text-white">
                SEO, AEO & GEO Website Audit
              </option>
              <option value="Monthly SEO, AEO & GEO Retainer" className="bg-[#203c32] text-white">
                Monthly SEO, AEO & GEO Retainer
              </option>
              <option value="One-Time SEO, AEO & GEO Setup" className="bg-[#203c32] text-white">
                One-Time SEO, AEO & GEO Setup
              </option>
            </select>
          </div>

          <div className="field wide">
            <label htmlFor="goal">
              What are your key goals or challenges? <span>Optional</span>
            </label>
            <textarea
              id="goal"
              name="goal"
              placeholder="Tell us about your current rankings, indexing issues, or the questions you want to be found for."
              rows={2}
              maxLength={2000}
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            ></textarea>
          </div>

          <div className="form-submit">
            <button className="button" type="submit">
              Request a website review{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#arrow-up" />
              </svg>
            </button>
            <span className="form-note">
              Prepares an email draft to business@kolacommunications.com. You review before sending. We respond within 3–4 hours.
            </span>
          </div>

          <div className="form-status" aria-live="polite" id="form-status">
            {status?.submitted && (
              <>
                <span>Your consultation draft is ready. Nothing has been sent yet. </span>
                <a href={status.mailtoUrl} className="text-[#dcebcf] underline font-bold">
                  Open email draft in your mail app ↗
                </a>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
