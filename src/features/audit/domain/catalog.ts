import type { AuditCategory } from './types';

export const auditCategories: ReadonlyArray<{
  id: AuditCategory;
  name: string;
  description: string;
  milestone: number;
}> = [
  { id: 'technical', name: 'Technical SEO', description: 'HTTP responses, HTTPS, redirects, indexing directives, canonical URLs, robots.txt and a sitemap.', milestone: 3 },
  { id: 'on-page', name: 'On-page SEO', description: 'Titles, descriptions, headings, images and internal links.', milestone: 3 },
  { id: 'aeo', name: 'Answer engine optimization', description: 'Question-heading inventory; no assessment of answer correctness or search selection.', milestone: 6 },
  { id: 'geo', name: 'Generative engine optimization', description: 'Declared identity, author/date metadata and crawler policy; no claims of AI visibility.', milestone: 6 },
  { id: 'video', name: 'Video SEO', description: 'HTML video, iframe and track declarations; player contents and caption quality are not verified.', milestone: 6 },
  { id: 'performance', name: 'Performance', description: 'Server-side response timing and HTML transfer bytes. Lighthouse and Core Web Vitals are not measured.', milestone: 7 },
  { id: 'accessibility', name: 'Accessibility & quality', description: 'Selected automated checks, with manual review still required.', milestone: 6 },
];
