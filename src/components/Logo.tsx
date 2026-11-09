import React from 'react';

// Round orange mark with the KOLA. wordmark
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-orange">
        <span className="h-2 w-2 rounded-full bg-ink" />
      </span>
      <span className={`text-[19px] font-extrabold tracking-[-0.05em] ${light ? 'text-paper' : 'text-ink'}`}>
        KOLA<span className="text-orange">.</span>
      </span>
    </span>
  );
}
