'use client';

import React, { useState } from 'react';
import { scrollToElement } from '@/lib/smooth';

// Event the hero form fires; WebsiteAudit listens for it and runs the audit.
export const AUDIT_EVENT = 'kola:audit';

type AuditFormProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  dark?: boolean;
};

// Website audit form shared by the hero and the "Does ChatGPT know your business?" section
export default function AuditForm({ id, value, onChange, onSubmit, loading = false, dark = false }: AuditFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full max-w-[520px]"
    >
      <label htmlFor={id} className={`block text-[17px] font-semibold tracking-[-0.015em] ${dark ? 'text-white' : ''}`}>
        Website address
      </label>
      <input
        id={id}
        type="text"
        inputMode="url"
        autoComplete="url"
        required
        placeholder="https://www.yourwebsite.com/"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-3 w-full ${dark ? 'h-[54px]' : 'h-[62px]'} rounded-none border-2 border-ink bg-white px-5 text-[17px] text-ink shadow-[0_0_0_2px_#FF5A36] placeholder:text-muted/70 focus:outline-none focus:ring-0`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full justify-between px-7 disabled:cursor-wait disabled:opacity-70 ${dark ? 'btn-orange mt-4 h-[56px] text-[17px] hover:bg-white hover:text-ink' : 'btn-dark mt-6 h-[66px] rounded-none text-[18px]'}`}
      >
        {loading ? 'Running audit…' : 'Run website audit'}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

// Hero version: hands the URL to the audit section and scrolls there for the report
export function HeroAuditForm() {
  const [url, setUrl] = useState('');
  return (
    <AuditForm
      id="hero-audit-url"
      value={url}
      onChange={setUrl}
      onSubmit={() => {
        window.dispatchEvent(new CustomEvent(AUDIT_EVENT, { detail: url }));
        const section = document.getElementById('audit');
        if (section) scrollToElement(section);
      }}
    />
  );
}
