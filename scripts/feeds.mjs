/*
 * Generates sitemap.xml, feed.xml, and robots.txt from the editorial data.
 * Run with: node scripts/feeds.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(resolve(ROOT, 'assets/data/news.js'), 'utf8'), sandbox);
const { site, categories, articles } = sandbox.window.NOXA_NEWS;

const BASE = site.url;
const TODAY = '2026-11-12';
const esc = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const staticPages = [
  ['', '1.0', 'daily'],
  ['about.html', '0.6', 'monthly'],
  ...categories.map((c) => ['category.html?c=' + c.id, '0.7', 'weekly'])
];

const urls = [
  ...staticPages.map(([path, priority, changefreq]) =>
    `  <url>\n    <loc>${esc(BASE + path)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`),
  ...articles.map((a) =>
    `  <url>\n    <loc>${esc(BASE + 'article.html?slug=' + a.slug)}</loc>\n    <lastmod>${a.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
];

writeFileSync(resolve(ROOT, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.join('\n') + '\n</urlset>\n', 'utf8');

const feedItems = articles.map((a) => {
  const link = BASE + 'article.html?slug=' + a.slug;
  const category = categories.find((c) => c.id === a.category);
  const pub = new Date(a.date + 'T08:00:00Z').toUTCString();
  return `    <item>\n` +
    `      <title>${esc(a.title.en)}</title>\n` +
    `      <link>${esc(link)}</link>\n` +
    `      <guid isPermaLink="true">${esc(link)}</guid>\n` +
    `      <pubDate>${pub}</pubDate>\n` +
    `      <category>${esc(category.en)}</category>\n` +
    `      <dc:creator>NoxaPlus Tech News</dc:creator>\n` +
    `      <description>${esc(a.dek.en)}</description>\n` +
    `    </item>`;
}).join('\n');

writeFileSync(resolve(ROOT, 'feed.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">\n' +
  '  <channel>\n' +
  `    <title>${esc(site.name)}</title>\n` +
  `    <link>${esc(BASE)}</link>\n` +
  `    <description>${esc(site.description.en)}</description>\n` +
  '    <language>en</language>\n' +
  `    <lastBuildDate>${new Date(TODAY + 'T12:00:00Z').toUTCString()}</lastBuildDate>\n` +
  '    <generator>NoxaPlus Tech News static generator</generator>\n' +
  `    <atom:link href="${esc(BASE + 'feed.xml')}" rel="self" type="application/rss+xml"/>\n` +
  '    <copyright>© 2026 NoxaPlus. Stories are editorial demo samples under the MIT license.</copyright>\n' +
  feedItems + '\n' +
  '  </channel>\n</rss>\n', 'utf8');

writeFileSync(resolve(ROOT, 'robots.txt'),
  'User-agent: *\n' +
  'Allow: /\n' +
  'Disallow: /search.html\n' +
  'Disallow: /bookmarks.html\n' +
  '\n' +
  'Sitemap: ' + BASE + 'sitemap.xml\n', 'utf8');

console.log('wrote sitemap.xml (' + (staticPages.length + articles.length) + ' urls)');
console.log('wrote feed.xml (' + articles.length + ' items)');
console.log('wrote robots.txt');
