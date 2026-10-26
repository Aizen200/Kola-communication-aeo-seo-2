'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold text-ink mb-2">Something went wrong!</h2>
      <p className="text-muted mb-6 text-sm max-w-md">
        {error.message || 'An unexpected error occurred while rendering the page.'}
      </p>
      <button className="btn-dark" type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

