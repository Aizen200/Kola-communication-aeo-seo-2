'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    service: 'Monthly Growth Retainer',
    goal: '',
  });

  const [status, setStatus] = useState<{
    submitted: boolean;
    mailtoUrl: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body =
      `Name: ${formData.name}\n` +
      `Work Email: ${formData.email}\n` +
      `Company: ${formData.website}\n` +
      `Preferred Engagement: ${formData.service}\n\n` +
      `Project:\n${formData.goal}`;

    const mailtoUrl =
      'mailto:business@kolacommunications.com?subject=' +
      encodeURIComponent(`Free Strategy Call - ${formData.website || formData.name}`) +
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
            <i className="dot"></i> 08 / CONTACT
          </div>
          <h2>
            Let's build something
            <br />
            <span>extraordinary together.</span>
          </h2>
          <p>
            Tell us about your timeline, goals, and project scope.
          </p>

          <div className="mt-8 space-y-4">
            <a className="contact-email" href="mailto:business@kolacommunications.com">
              business@kolacommunications.com{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#arrow-up" />
              </svg>
            </a>

            <div className="text-[13px] text-muted-foreground/80 text-[#c6d0c2] leading-relaxed pt-2">
              <strong>Phone:</strong> <a href="tel:+918928984774" className="hover:text-white underline">+91-8928984774</a>
              <br />
              <strong>Address:</strong> 23, 2nd Floor, Sharda Bhavan, Opposite Gala Provision Store, Fatak Road / Narayan Joshi Road, Kandivali West, Mumbai – 400067, Maharashtra, India
              <br />
              <strong>Business Hours:</strong> Mon – Fri: 9:30 AM – 9:00 PM IST (Flexible timezone coverage for US, UK, Australia & UAE)
            </div>
          </div>
        </div>

        <form className="contact-form" id="review-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              placeholder="Jane Smith"
              autoComplete="name"
              required
              maxLength={120}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              autoComplete="email"
              required
              maxLength={160}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="website">Company / Brand</label>
            <input
              id="website"
              name="website"
              type="text"
                            placeholder="Acme Inc."
              required
              maxLength={300}
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="service">Engagement</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="Monthly Growth Retainer" className="bg-[#203c32] text-white">
                Monthly Growth Retainer
              </option>
              <option value="One-Time Project" className="bg-[#203c32] text-white">
                One-Time Project
              </option>
            </select>
          </div>

          <div className="field wide">
            <label htmlFor="goal">
              Tell us about your project
            </label>
            <textarea
              id="goal"
              name="goal"
              placeholder="Goals, timeline, budget…"
              rows={2}
              maxLength={2000}
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            ></textarea>
          </div>

          <div className="form-submit">
            <button className="button" type="submit">
              Send Message{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#arrow-up" />
              </svg>
            </button>
            <span className="form-note">
              Response within 3–4 hours
            </span>
          </div>

          <div className="form-status" aria-live="polite" id="form-status">
            {status?.submitted && (
              <>
                <span>We'll be in touch! </span>
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
