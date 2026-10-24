'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<{
    submitted: boolean;
    mailtoUrl: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const website = data.get('website') as string;
    const goal = data.get('goal') as string;

    const body =
      'Website review request\n\nName: ' +
      name +
      '\nWork email: ' +
      email +
      '\nWebsite: ' +
      website +
      '\n\nGoals:\n' +
      (goal || 'I would like to discuss search visibility for my business.');

    const mailtoUrl =
      'mailto:hello@kolacommunications.com?subject=' +
      encodeURIComponent('Website review request') +
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
            <i className="dot"></i> LET’S FIND THE OPPORTUNITY
          </div>
          <h2>
            Your next chapter
            <br />
            in search <span>starts here.</span>
          </h2>
          <p>
            Share your website and what you want to improve. We’ll start with a conversation about your business and priorities.
          </p>
          <a className="contact-email" href="mailto:hello@kolacommunications.com">
            hello@kolacommunications.com{' '}
            <svg aria-hidden="true">
              <use href="#arrow-up" />
            </svg>
          </a>
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
            />
          </div>
          <div className="field wide">
            <label htmlFor="website">Company website</label>
            <input
              id="website"
              name="website"
              type="text"
              inputMode="url"
              placeholder="www.yourcompany.com"
              required
              maxLength={300}
            />
          </div>
          <div className="field wide">
            <label htmlFor="goal">
              What would you like to improve? <span>Optional</span>
            </label>
            <textarea
              id="goal"
              name="goal"
              placeholder="Tell us a little about your goals."
              rows={2}
              maxLength={2000}
            ></textarea>
          </div>
          <div className="form-submit">
            <button className="button" type="submit">
              Request a website review{' '}
              <svg aria-hidden="true">
                <use href="#arrow-up" />
              </svg>
            </button>
            <span className="form-note">Prepare an email request. You review it before sending.</span>
          </div>
          <div className="form-status" aria-live="polite" id="form-status">
            {status?.submitted && (
              <>
                <span>Your request is ready. Nothing has been sent. </span>
                <a href={status.mailtoUrl}>Open email draft ↗</a>
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

