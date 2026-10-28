import PDFDocument from 'pdfkit';
import { join } from 'node:path';
import type { AuditReport } from '../domain/types';
import { severityWeights } from '../domain/rule-catalog';

/** Render collected plain-text evidence only. No remote fonts, images, HTML or new website requests. */
export async function renderReportPdf(report: AuditReport): Promise<Buffer> {
  const doc = new PDFDocument({ size: 'A4', margin: 48, font: join(process.cwd(), 'public/fonts/KolaSans-Regular.otf'), bufferPages: true,
    info: { Title: `Website audit — ${new URL(report.finalUrl).hostname}`, Author: 'Kola Communications', Subject: 'Measured evidence and explicit audit coverage' } });
  doc.registerFont('Body', join(process.cwd(), 'public/fonts/KolaSans-Regular.otf'));
  doc.registerFont('Bold', join(process.cwd(), 'public/fonts/KolaSans-Bold.otf'));
  const chunks: Buffer[] = [];
  const complete = new Promise<Buffer>((resolve, reject) => { doc.on('data', chunk => chunks.push(chunk)); doc.on('end', () => resolve(Buffer.concat(chunks))); doc.on('error', reject); });
  const body = (s: string, size = 9) => { doc.font('Body').fontSize(size).fillColor('#26352e').text(s, { lineGap: 3 }); doc.moveDown(0.4); };
  const title = (s: string) => { doc.font('Bold').fontSize(19).fillColor('#17251c').text(s); doc.moveDown(0.6); };
  const sub = (s: string) => { if (doc.y > 680) doc.addPage(); doc.font('Bold').fontSize(11).fillColor('#17251c').text(s); doc.moveDown(0.4); };
  title('KOLA / WEBSITE AUDIT');
  body('Evidence report · Single page · No aggregate score', 13);
  body(report.finalUrl, 12);
  body(`Requested: ${report.targetUrl}\nStarted: ${report.startedAt}\nCompleted: ${report.completedAt}\nRule set: ${report.ruleSetVersion}`);
  const verified = report.findings.filter(f => f.assessment === 'observation' && f.status !== 'unable_to_verify');
  body(`${report.coverage.pagesAnalyzed} page analyzed · ${report.findings.length} findings · ${verified.length} observation findings · ${report.findings.filter(f => f.assessment === 'heuristic').length} heuristic checks`);
  sub('How to read this report');
  body('Pass refers only to the named check. Warning is a review item; it is not automatically an SEO defect. Declared metadata and crawler policies do not prove indexing, rankings or AI citations. Severity is a triage suggestion, not a search-engine weight.');
  report.coverage.limitations.forEach(note => body(`• ${note}`));
  sub('Recommended next steps');
  const priority = report.findings.filter(f => ['fail','warning'].includes(f.status)).sort((a,b) => severityWeights[b.severity]-severityWeights[a.severity]);
  if (!priority.length) body('No failed checks or warnings in the measured set. This is not a claim that the whole website is issue-free.');
  priority.forEach((f,i) => body(`${i+1}. ${f.checkName} (${f.severity}; ${f.assessment}): ${f.recommendedFix}`));
  doc.addPage(); title('Findings & evidence');
  for (const f of report.findings) {
    sub(`${f.status.toUpperCase().replaceAll('_',' ')} — ${f.checkName}`);
    body(`${f.assessment} · ${f.severity} priority · ${f.observedAt}`, 8);
    body(`Source: ${f.affectedUrl}`, 8);
    body(f.explanation);
    f.evidence.forEach(e => body(`Evidence: ${e}`, 8));
    body(`Action: ${f.recommendedFix}`);
    if (f.limitations.length) body(`Limits: ${f.limitations.join(' ')}`, 8);
  }
  doc.addPage(); title('Auxiliary requests');
  for (const r of report.resources) { sub(`${r.kind}: ${r.state}`); body(`${r.requestedUrl}\nFinal: ${r.finalUrl}\n${r.detail}\nObserved: ${r.observedAt}`); }
  if (!report.resources.length) body('Not attempted because the page response was unsuccessful.');
  for (const section of report.sections) {
    doc.addPage(); title(section.title); body(`Source: ${section.sourceUrl}`, 8); body(section.method);
    section.notes.forEach(note => body(`Limit: ${note}`, 8));
    body(`Collected ${section.rows.length} of ${section.totalRows} observed rows. PDF includes ${Math.min(section.rows.length, 60)} rows, with cells limited to 500 characters. Download JSON for all collected rows.`, 8);
    if (!section.rows.length) body('No matching declarations observed in the collected HTML.');
    section.rows.slice(0, 60).forEach((row, i) => {
      sub(`Record ${i + 1}`);
      row.forEach((cell, column) => body(`${section.columns[column]}: ${cell.length > 500 ? `${cell.slice(0, 499)}… [truncated]` : cell || '(empty)'}`, 8));
    });
  }
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    // Place footer without normal page-flow creating another page.
    doc.font('Body').fontSize(8).fillColor('#657068').text(`KOLA · Evidence audit · ${i + 1} / ${range.count}`, 48, 805, { lineBreak: false });
  }
  doc.end(); return complete;
}
