import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold text-ink mb-2">404 · Page Not Found</h2>
      <p className="text-muted mb-6">Could not find the requested resource.</p>
      <Link href="/" className="btn-dark">
        Return Home
      </Link>
    </div>
  );
}

