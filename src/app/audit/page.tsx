import type { Metadata } from 'next';
import Link from 'next/link';
import AuditSetup from '@/features/audit/components/AuditSetup';
import { auditCategories } from '@/features/audit/domain/catalog';

export const metadata: Metadata = {
  title: 'Website Audit Workspace | Kola Communications',
  description: 'Run a single-page technical and on-page SEO audit with measured evidence and actionable recommendations.',
  robots: { index: false, follow: false },
};

export default function AuditPage() {
  return (
    <>
      <header className="border-b-2 border-ink">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight">KOLA<span className="text-orange">.</span> <span className="text-sm font-normal text-muted">/ Website Audit</span></Link>
          <span className="border border-ink px-3 py-1 text-xs font-bold uppercase tracking-wider">Single-page SEO audit</span>
        </div>
      </header>
      <main id="main" className="wrap pb-20 pt-12 sm:pt-16">
        <div className="max-w-3xl">
          <p className="kicker text-muted">Website audit workspace</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Understand your website.<br /><span className="text-muted">One finding at a time.</span></h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">A rule-based review of search, content and website quality. Each finding connects an observation to evidence and a practical fix.</p>
        </div>

        <div className="mt-10"><AuditSetup tokenRequired={process.env.NODE_ENV === 'production'} /></div>

        <section aria-labelledby="coverage-heading" className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
            <div><p className="kicker text-muted">Audit coverage</p><h2 id="coverage-heading" className="mt-2 text-2xl font-bold sm:text-3xl">Seven perspectives. Explicit evidence.</h2></div>
            <p className="text-sm text-muted">HTML and crawler-file checks are available. Browser and external metrics are explicitly unmeasured.</p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {auditCategories.map((category, index) => (
              <li key={category.id} className="border border-ink/25 bg-white p-6">
                <div className="flex items-center justify-between gap-3"><span aria-hidden="true" className="font-mono text-sm text-muted">0{index + 1}</span><span className="bg-sand px-2 py-1 text-xs font-bold">{['technical', 'on-page'].includes(category.id) ? 'Available · partial coverage' : category.id === 'performance' ? 'HTTP measurements only' : 'Static signals only'}</span></div>
                <h3 className="mt-5 text-lg font-bold">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="method-heading" className="mt-12 border-l-4 border-orange pl-5">
          <h2 id="method-heading" className="text-lg font-bold">How to read your results</h2>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted">There is no aggregate score or letter grade. Each result names its source and what was actually observed. Missing evidence is marked unable to verify. Content assessments are labeled as heuristics. A crawl cannot establish search indexing, complete accessibility compliance or AI citations.</p>
        </section>
      </main>
      <footer className="border-t border-ink/25"><div className="wrap flex flex-wrap justify-between gap-3 py-6 text-sm text-muted"><span>Kola Communications · Website Audit</span><Link href="/" className="underline underline-offset-4">Back to website</Link></div></footer>
    </>
  );
}
