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
    <section id="contact" className="section border-t-2 border-ink bg-ink text-paper">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <div>
          <span className="label text-paper/70">(08) Contact</span>
          <h2 className="h-section text-paper">
            Let&apos;s build something{" "}
            <span className="serif-accent block text-orange">extraordinary together.</span>
          </h2>
          <p className="mt-6 max-w-[420px] text-[18px] leading-relaxed text-paper/80">
            Tell us about your timeline, goals, and project scope.
          </p>

          <a
            className="mt-8 inline-block break-all text-[20px] font-bold text-orange hover:underline sm:text-[22px]"
            href="mailto:business@kolacommunications.com"
          >
            business@kolacommunications.com <span aria-hidden="true">→</span>
          </a>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-paper/80">
            <p>
              <strong className="text-paper">Phone:</strong>{" "}
              <a href="tel:+918928984774" className="underline hover:text-orange">
                +91-8928984774
              </a>
            </p>
            <p>
              <strong className="text-paper">Address:</strong> 23, 2nd Floor, Sharda Bhavan, Opposite Gala Provision Store, Fatak Road / Narayan Joshi Road, Kandivali West, Mumbai – 400067, Maharashtra, India
            </p>
            <p>
              <strong className="text-paper">Business Hours:</strong> Mon – Fri: 9:30 AM – 9:00 PM IST (Flexible timezone coverage for US, UK, Australia &amp; UAE)
            </p>
          </div>
        </div>

        <form id="review-form" onSubmit={handleSubmit} className="grid content-start gap-x-8 gap-y-7 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-[12px] font-bold uppercase tracking-[0.12em] text-paper/80">Your Name</label>
            <input
              id="name"
              name="name"
              placeholder="Jane Smith"
              autoComplete="name"
              required
              maxLength={120}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field-line"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[12px] font-bold uppercase tracking-[0.12em] text-paper/80">Email Address</label>
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
              className="field-line"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-[12px] font-bold uppercase tracking-[0.12em] text-paper/80">Company / Brand</label>
            <input
              id="website"
              name="website"
              type="text"
              placeholder="Acme Inc."
              required
              maxLength={300}
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="field-line"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-[12px] font-bold uppercase tracking-[0.12em] text-paper/80">Engagement</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="field-line"
            >
              <option value="Monthly Growth Retainer" className="bg-ink text-paper">
                Monthly Growth Retainer
              </option>
              <option value="One-Time Project" className="bg-ink text-paper">
                One-Time Project
              </option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="goal" className="block text-[12px] font-bold uppercase tracking-[0.12em] text-paper/80">Tell us about your project</label>
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
            <button type="submit" className="btn w-full justify-between border-orange bg-orange py-4 text-ink">
              Send Message <span aria-hidden="true">→</span>
            </button>
            <p className="mt-4 text-[14px] text-paper/70">Response within 3–4 hours</p>
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
