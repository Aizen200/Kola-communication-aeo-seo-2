import Link from 'next/link';

export default function WebsiteAudit() {
  return (
    <section id="audit" className="section border-y-2 border-ink bg-orange">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="label text-ink/70">(04) Website audit</span>
          <h2 className="h-section">Evidence behind every finding.</h2>
          <p className="mt-6 max-w-xl text-lg">Run a single-page SEO audit with evidence behind each finding. Check technical and on-page signals, then review practical recommendations.</p>
        </div>
        <div className="border-2 border-ink bg-paper p-7 shadow-hard sm:p-9">
          <p className="kicker text-muted">Single-page SEO audit</p>
          <h3 className="mt-4 text-3xl font-bold">Check your website.</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">Inspect a public webpage with detailed evidence tables, crawler-file checks and PDF export. Browser and external metrics are explicitly marked when not measured.</p>
          <Link href="/audit" className="btn-dark mt-7 w-full justify-between">Open audit workspace <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
