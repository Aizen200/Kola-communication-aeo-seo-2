'use client';

import React, { useState } from 'react';
import Arrow from './Arrow';

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
    <section id="contact" className="section relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-orange/25 blur-[120px]" />
      <div className="wrap relative grid gap-14 lg:grid-cols-2">
        <div>
          <span className="label text-white/50">(08) Contact</span>
          <h2 className="h-section text-white">
            Let&apos;s build something{" "}
            <span className="block text-orange">extraordinary together.</span>
          </h2>
          <p className="mt-7 max-w-[420px] text-[18px] leading-relaxed text-white/80">
            Tell us about your timeline, goals, and project scope.
          </p>

          <a
            className="mt-10 inline-flex items-center gap-3 break-all border-b border-orange pb-1.5 text-[20px] font-bold text-orange sm:text-[22px]"
            href="mailto:business@kolacommunications.com"
          >
            business@kolacommunications.com <Arrow />
          </a>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-white/80">
            <p>
              <strong className="text-white">Phone:</strong>{" "}
              <a href="tel:+918928984774" className="underline hover:text-orange">
                +91-8928984774
              </a>
            </p>
            <p>
              <strong className="text-white">Address:</strong> 23, 2nd Floor, Sharda Bhavan, Opposite Gala Provision Store, Fatak Road / Narayan Joshi Road, Kandivali West, Mumbai – 400067, Maharashtra, India
            </p>
            <p>
              <strong className="text-white">Business Hours:</strong> Mon – Fri: 9:30 AM – 9:00 PM IST (Flexible timezone coverage for US, UK, Australia &amp; UAE)
            </p>
          </div>
        </div>

        <form id="review-form" onSubmit={handleSubmit} className="grid content-start gap-x-8 gap-y-7 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Your Name</label>
            <input
              id="name"
              name="name"
              placeholder="Your full name"
              autoComplete="name"
              required
              maxLength={120}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field-line"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@yourcompany.com"
              autoComplete="email"
              required
              maxLength={160}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="field-line"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Company / Brand</label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="Your company name"
              required
              maxLength={300}
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="field-line"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Engagement</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="field-line"
            >
              <option value="Monthly Growth Retainer" className="bg-ink text-white">
                Monthly Growth Retainer
              </option>
              <option value="One-Time Project" className="bg-ink text-white">
                One-Time Project
              </option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="goal" className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Tell us about your project</label>
            <textarea
              id="goal"
              name="goal"
              placeholder="Goals, timeline, budget…"
              rows={3}
              maxLength={2000}
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="field-line resize-y"
            ></textarea>
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className="btn-orange w-full justify-between py-5 hover:bg-white hover:text-ink">
              Send Message <Arrow />
            </button>
            <p className="mt-4 text-[14px] text-white/70">Response within 3–4 hours</p>
            <div aria-live="polite" id="form-status" className="mt-3 text-[15px]">
              {status?.submitted && (
                <>
                  <span>We&apos;ll be in touch! </span>
                  <a href={status.mailtoUrl} className="font-bold text-orange underline">
                    Open email draft in your mail app ↗
                  </a>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
