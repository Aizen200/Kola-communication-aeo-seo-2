import { authorizeAuditRequest } from '@/features/audit/server/access';
import { reportStore } from '@/features/audit/server/report-store';
import { renderReportPdf } from '@/features/audit/server/render-report-pdf';
import { admissionGate } from '@/features/audit/server/admission';
import { AuditError } from '@/features/audit/server/errors';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request, { params }: { params: { id: string } }) {
  let release: (() => void) | undefined;
  try {
    authorizeAuditRequest(request);
    const report = /^[0-9a-f-]{36}$/.test(params.id) ? reportStore.get(params.id) : undefined;
    if (!report) throw new AuditError('REPORT_EXPIRED', 'This report expired or the server restarted. Run the audit again to download its PDF.', 404);
    release = admissionGate.acquire();
    const pdf = await renderReportPdf(report);
    return new Response(new Uint8Array(pdf), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="website-audit.pdf"', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  } catch (error) {
    const failure = error instanceof AuditError ? error : new AuditError('PDF_FAILED', 'The PDF could not be generated.', 500);
    return Response.json({ code: failure.code, error: failure.message }, { status: failure.status, headers: { 'Cache-Control': 'no-store' } });
  } finally { release?.(); }
}
