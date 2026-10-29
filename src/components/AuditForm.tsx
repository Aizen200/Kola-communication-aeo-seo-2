'use client';

import React, { useState } from 'react';
import Arrow from './Arrow';

// Event the hero form fires; WebsiteAudit listens for it and runs the audit.
export const AUDIT_EVENT = 'kola:audit';

type AuditFormProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

// Website audit form shared by the hero and the "Does ChatGPT know your business?" section
export default function AuditForm({ id, value, onChange, onSubmit, loading = false }: AuditFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full max-w-[520px]"
    >
      <label htmlFor={id} className="block text-[17px] font-bold tracking-[-0.015em]">
        Website Address
      </label>
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-white px-4 shadow-soft transition-colors focus-within:border-ink">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-muted">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <input
          id={id}
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          placeholder="https://yourwebsite.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[60px] w-full min-w-0 border-0 bg-transparent text-[16px] text-ink placeholder:text-muted/70 focus:outline-none focus:ring-0"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-orange mt-4 w-full justify-between py-[18px] text-[17px] disabled:cursor-wait disabled:opacity-70">
        {loading ? 'Running audit…' : 'Run Audit'} <Arrow />
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
        document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );
}
