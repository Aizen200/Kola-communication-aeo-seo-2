import { loadBuffer } from 'cheerio';
import type { FetchedPage } from './transport/fetch-page';

export interface PageObservations {
  baseUrl: string;
  titles: string[];
  descriptions: string[];
  headings: Array<{ level: number; text: string }>;
  canonicals: string[];
  robots: string[];
  viewport: string;
  lang: string;
  images: Array<{ src: string; alt: string | null; width: string; height: string }>;
  links: Array<{ url: string; text: string; missingImageAlt: boolean }>;
  wordCount: number;
  sampled: boolean;
}

const clean = (text = '') => text.replace(/\s+/g, ' ').trim().slice(0, 400);

export function extractPage(page: FetchedPage): PageObservations {
  const charset = /charset\s*=\s*["']?([^;\s"']+)/i.exec(page.headers['content-type'] ?? '')?.[1];
  const $ = loadBuffer(page.body, { encoding: { transportLayerEncodingLabel: charset } });
  const meta = (name: string) => $('meta').filter((_i, el) => ($(el).attr('name') ?? '').toLowerCase() === name);
  const canonicals = $('link').filter((_i, el) => ($(el).attr('rel') ?? '').toLowerCase().split(/\s+/).includes('canonical'));
  const allImages = $('img');
  const sampledImages = new Set(allImages.slice(0, 2000).toArray());
  const allLinks = $('a[href]');
  const headings = $('h1,h2,h3,h4,h5,h6');
  let baseUrl = page.finalUrl;
  try { baseUrl = new URL($('base[href]').first().attr('href') ?? page.finalUrl, page.finalUrl).href; } catch { /* keep document URL */ }
  const links: PageObservations['links'] = [];
  allLinks.slice(0, 2000).each((_i, element) => {
    try {
      const url = new URL($(element).attr('href')!, baseUrl);
      if (!['https:', 'http:'].includes(url.protocol)) return;
      url.hash = '';
      const image = $(element).find('img').first();
      links.push({ url: url.href, text: clean($(element).text() || $(element).attr('aria-label') || image.attr('alt')),
        missingImageAlt: image.length > 0 && sampledImages.has(image[0]) && image.attr('alt') === undefined });
    } catch { /* malformed href is not a fetch target */ }
  });
  const data: PageObservations = {
    baseUrl,
    titles: $('title').slice(0, 10).map((_i, element) => clean($(element).text())).get(),
    descriptions: meta('description').slice(0, 10).map((_i, element) => clean($(element).attr('content'))).get(),
    headings: headings.slice(0, 500).map((_i, element) => ({ level: Number(element.tagName.slice(1)), text: clean($(element).text()) })).get(),
    canonicals: canonicals.slice(0, 10).map((_i, element) => $(element).attr('href') ?? '').get(),
    robots: [...meta('robots').map((_i, element) => $(element).attr('content') ?? '').get(),
      ...meta('googlebot').map((_i, element) => `googlebot: ${$(element).attr('content') ?? ''}`).get(),
      ...(Array.isArray(page.headers['x-robots-tag']) ? page.headers['x-robots-tag'] : [page.headers['x-robots-tag'] ?? ''])].filter(Boolean),
    viewport: clean(meta('viewport').first().attr('content')),
    lang: clean($('html').attr('lang')),
    images: allImages.slice(0, 2000).map((_i, element) => ({
      src: clean($(element).attr('src')), alt: $(element).attr('alt') === undefined ? null : clean($(element).attr('alt')),
      width: $(element).attr('width') ?? '', height: $(element).attr('height') ?? '',
    })).get(),
    links, wordCount: 0,
    sampled: allImages.length > 2000 || allLinks.length > 2000 || headings.length > 500,
  };
  $('script,style,noscript,template,[hidden]').remove();
  const text = $('body').text().replace(/\s+/g, ' ').trim();
  data.wordCount = text ? text.split(/\s+/u).length : 0;
  return data;
}
