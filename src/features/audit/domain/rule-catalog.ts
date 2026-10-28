import type { AuditCategory, Severity } from './types';

interface RuleDefinition { name: string; category: AuditCategory; severity: Severity }
export const ruleDefinitions = {
  'technical.http-status': { name: 'HTTP response', category: 'technical', severity: 'high' },
  'technical.https': { name: 'HTTPS on the final page', category: 'technical', severity: 'high' },
  'technical.redirects': { name: 'Redirect path', category: 'technical', severity: 'info' },
  'technical.indexability': { name: 'Observed indexing directives', category: 'technical', severity: 'high' },
  'technical.canonical': { name: 'Canonical URL declaration', category: 'technical', severity: 'medium' },
  'technical.viewport': { name: 'Mobile viewport declaration', category: 'technical', severity: 'medium' },
  'on-page.title': { name: 'Page title', category: 'on-page', severity: 'high' },
  'on-page.description': { name: 'Meta description', category: 'on-page', severity: 'medium' },
  'on-page.h1': { name: 'Main heading', category: 'on-page', severity: 'medium' },
  'on-page.headings': { name: 'Heading sequence', category: 'on-page', severity: 'low' },
  'on-page.image-alt': { name: 'Image alt attributes', category: 'on-page', severity: 'medium' },
  'on-page.image-dimensions': { name: 'Image dimensions in HTML', category: 'on-page', severity: 'low' },
  'on-page.internal-links': { name: 'Internal page links', category: 'on-page', severity: 'low' },
  'on-page.anchor-text': { name: 'Link names in HTML', category: 'on-page', severity: 'low' },
  'on-page.language': { name: 'HTML language declaration', category: 'on-page', severity: 'low' },
  'on-page.content': { name: 'Text in the response HTML', category: 'on-page', severity: 'info' },
} satisfies Record<string, RuleDefinition>;
export type RuleId = keyof typeof ruleDefinitions;
export const RULE_SET_VERSION = 'evidence-audit/2.0.0';
export const severityWeights: Record<Severity, number> = { critical: 5, high: 3, medium: 2, low: 1, info: 0 };
