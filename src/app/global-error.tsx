'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-paper text-ink min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-3">Application Error</h2>
          <p className="text-muted mb-6 text-sm">
            {error.message || 'A critical error occurred.'}
          </p>
          <button className="btn-dark" type="button" onClick={() => reset()}>
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}

