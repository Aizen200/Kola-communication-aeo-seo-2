'use client';
import { useState } from 'react';
import type { EvidenceSection } from '../domain/types';

export default function EvidenceInventory({ section }: { section: EvidenceSection }) {
  const [query, setQuery] = useState(''); const [page, setPage] = useState(0);
  const filtered = section.rows.filter(row => row.some(cell => cell.toLowerCase().includes(query.toLowerCase())));
  const size = 20; const pages = Math.max(1, Math.ceil(filtered.length / size));
  return <details id={`evidence-${section.id}`} className="min-w-0 border border-ink/25 bg-white p-4 sm:p-6" open={section.id === 'unmeasured'}>
    <summary className="cursor-pointer text-lg font-bold">{section.title}<span className="ml-3 text-xs font-normal text-muted">{section.rows.length} collected / {section.totalRows} observed rows</span></summary>
    <div className="mt-4 space-y-3 text-sm">
      <p>{section.method}</p><p className="break-all text-xs text-muted">Source: {section.sourceUrl}</p>
      {section.notes.map((note, index) => <p className="text-xs text-muted" key={index}>{note}</p>)}
      {section.rows.length > size && <label className="block text-xs font-bold">Filter {section.title}<input type="search" className="mt-1 w-full border border-ink/30 p-2 text-sm font-normal" value={query} onChange={e => { setQuery(e.target.value); setPage(0); }} /></label>}
      {filtered.length ? <div className="max-w-full overflow-x-auto" role="region" aria-label={`${section.title} table`} tabIndex={0}>
        <table className="w-full table-fixed border-collapse text-left text-xs" style={{ minWidth: section.columns.length > 3 ? 760 : 480 }}>
          <thead><tr>{section.columns.map((column, i) => <th key={i} scope="col" className="border-b-2 border-ink bg-sand p-3 align-top">{column}</th>)}</tr></thead>
          <tbody>{filtered.slice(page * size, (page + 1) * size).map((row, i) => <tr key={i} className="border-b border-ink/15">{row.map((cell, j) => <td key={j} className="break-words p-3 align-top [overflow-wrap:anywhere]">{cell || '(empty)'}</td>)}</tr>)}</tbody>
        </table>
      </div> : <p className="py-3 text-muted">{query ? 'No collected rows match this filter.' : 'No matching declarations observed. See the coverage notes before interpreting absence.'}</p>}
      {pages > 1 && <div className="flex items-center gap-3 text-xs"><button className="border border-ink px-3 py-2 disabled:opacity-40" disabled={!page} onClick={() => setPage(p => p - 1)}>Previous rows</button><span>Page {page + 1} of {pages}</span><button className="border border-ink px-3 py-2 disabled:opacity-40" disabled={page + 1 >= pages} onClick={() => setPage(p => p + 1)}>Next rows</button></div>}
    </div>
  </details>;
}
