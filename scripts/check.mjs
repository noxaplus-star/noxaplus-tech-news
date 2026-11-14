/*
 * Static validation for NoxaPlus Tech News.
 * Run with: node scripts/check.mjs
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const stats = [];
const fail = (message) => errors.push(message);
const note = (message) => stats.push(message);
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const exists = (rel) => existsSync(join(ROOT, rel)) && statSync(join(ROOT, rel)).isFile();

const required = [
  'index.html', 'article.html', 'category.html', 'search.html', 'bookmarks.html', 'about.html', '404.html',
  'style.css', 'app.js', 'sw.js', 'manifest.webmanifest', 'feed.xml', 'sitemap.xml', 'robots.txt',
  'LICENSE', 'README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md', '.gitignore',
  'assets/data/news.js', 'assets/icons/favicon.svg', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-512.png', 'assets/icons/apple-touch-icon.png', 'assets/og/default.png',
  'scripts/check.mjs', 'scripts/feeds.mjs', 'scripts/covers.mjs', 'scripts/render.mjs',
  'docs/customization.md', 'docs/deployment.md'
];
for (const file of required) if (!exists(file)) fail(`missing required file: ${file}`);

/* ---------- Editorial data ---------- */
const sandbox = { window: {} };
vm.runInNewContext(read('assets/data/news.js'), sandbox);
const { site, categories, authors, articles } = sandbox.window.NOXA_NEWS || {};
if (!site || !Array.isArray(categories) || !authors || typeof authors !== 'object' || !Array.isArray(articles)) {
  fail('news.js does not expose site, categories, authors, and articles');
}

const bilingual = (value, label) => {
  if (!value || typeof value !== 'object') return fail(`${label} must be a bilingual object`);
  if (typeof value.en !== 'string' || !value.en.trim()) fail(`${label}.en is empty`);
  if (typeof value.fa !== 'string' || !value.fa.trim()) fail(`${label}.fa is empty`);
  if (value.fa && !/[\u0600-\u06FF]/.test(value.fa)) fail(`${label}.fa does not contain Persian text`);
};

if (site) {
  bilingual(site.tagline, 'site.tagline');
  bilingual(site.description, 'site.description');
  bilingual(site.edition, 'site.edition');
  if (site.developer !== 'NoxaPlus') fail('site.developer must be NoxaPlus');
  if (!/^https:\/\/www\.noxaplus\.ir\/?$/.test(site.website)) fail('site.website must point to noxaplus.ir');
  if (!/^[^@\s]+@[^@\s]+\.[a-z]+$/i.test(site.email)) fail('site.email is invalid');
  if (!/^https:\/\/noxaplus-star\.github\.io\/noxaplus-tech-news\/$/.test(site.url)) fail('site.url must be the canonical demo URL');
}

const catIds = new Set();
for (const c of categories) {
  if (catIds.has(c.id)) fail(`duplicate category id: ${c.id}`);
  catIds.add(c.id);
  for (const field of ['id', 'en', 'fa', 'shortEn', 'shortFa', 'color', 'soft']) {
    if (!c[field]) fail(`category ${c.id} missing ${field}`);
  }
  bilingual(c.desc, `category ${c.id}.desc`);
}
if (categories.length !== 6) fail(`expected 6 categories, found ${categories.length}`);

const authorIds = new Set(Object.keys(authors));
const slugs = new Set();
const covers = new Set();
let featured = 0;
let trending = 0;
for (const a of articles) {
  const label = a.slug || '(missing slug)';
  if (!a.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)) fail(`invalid slug: ${label}`);
  if (slugs.has(a.slug)) fail(`duplicate slug: ${label}`);
  slugs.add(a.slug);
  if (!catIds.has(a.category)) fail(`${label}: unknown category ${a.category}`);
  if (!authorIds.has(a.author)) fail(`${label}: unknown author ${a.author}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date) || Number.isNaN(Date.parse(a.date))) fail(`${label}: invalid date`);
  if (a.featured) featured += 1;
  if (a.trending) trending += 1;
  bilingual(a.title, `${label}.title`);
  bilingual(a.dek, `${label}.dek`);
  if (!a.cover || !exists(a.cover)) fail(`${label}: cover missing (${a.cover})`);
  else covers.add(a.cover);
  if (!exists(`assets/og/${a.slug}.png`)) fail(`${label}: OG image missing`);
  for (const lang of ['en', 'fa']) {
    if (!a.readMins || typeof a.readMins[lang] !== 'number' || a.readMins[lang] < 1) fail(`${label}: readMins.${lang} invalid`);
    if (!Array.isArray(a.takeaways?.[lang]) || a.takeaways[lang].length < 2) fail(`${label}: takeaways.${lang} needs at least 2 items`);
  }
  if (!Array.isArray(a.tags) || !a.tags.length) fail(`${label}: tags are required`);
  else a.tags.forEach((tag, i) => bilingual(tag, `${label}.tags[${i}]`));
  if (!Array.isArray(a.body) || a.body.length < 5) fail(`${label}: body needs at least 5 blocks`);
  else {
    for (const [i, block] of a.body.entries()) {
      if (!['p', 'h2', 'quote', 'list'].includes(block.type)) fail(`${label}: body[${i}] has unknown type ${block.type}`);
      if (block.type === 'list') {
        for (const lang of ['en', 'fa']) {
          if (!Array.isArray(block[lang]) || !block[lang].length) fail(`${label}: body[${i}].${lang} list is empty`);
        }
      } else {
        bilingual(block, `${label}.body[${i}]`);
      }
    }
  }
  if (a.title && a.title.en.length > 110) fail(`${label}: title.en is too long`);
  if (a.dek && a.dek.en.length > 260) fail(`${label}: dek.en is too long`);
}

if (articles.length !== 12) fail(`expected 12 articles, found ${articles.length}`);
if (featured < 3) fail(`expected at least 3 featured articles, found ${featured}`);
if (trending < 4) fail(`expected at least 4 trending articles, found ${trending}`);
if (new Set(articles.map((a) => a.date)).size !== articles.length) fail('article dates must be unique');
for (let i = 1; i < articles.length; i += 1) {
  if (articles[i].date >= articles[i - 1].date) fail(`articles must be sorted newest first (${articles[i].slug})`);
}
note(`${articles.length} articles, ${categories.length} desks, ${authorIds.size} bylines`);

/* ---------- Covers referenced from data ---------- */
const coverFiles = articles.map((a) => a.cover);
for (const cover of coverFiles) if (!exists(cover)) fail(`cover referenced but missing: ${cover}`);
note(`${covers.size} unique covers`);

/* ---------- Manifest ---------- */
let manifest;
try {
  manifest = JSON.parse(read('manifest.webmanifest'));
} catch (error) {
  fail('manifest.webmanifest is not valid JSON: ' + error.message);
}
if (manifest) {
  for (const key of ['name', 'short_name', 'start_url', 'display', 'background_color', 'theme_color']) {
    if (!manifest[key]) fail(`manifest missing ${key}`);
  }
  if (!manifest.name.startsWith('NoxaPlus')) fail('manifest name must start with NoxaPlus');
  for (const icon of manifest.icons || []) if (!exists(icon.src)) fail(`manifest icon missing: ${icon.src}`);
  if ((manifest.icons || []).length < 3) fail('manifest needs at least 3 icons');
}

/* ---------- HTML shells ---------- */
const pages = ['index.html', 'article.html', 'category.html', 'search.html', 'bookmarks.html', 'about.html', '404.html'];
const pageTypes = {
  'index.html': 'home', 'article.html': 'article', 'category.html': 'category', 'search.html': 'search',
  'bookmarks.html': 'bookmarks', 'about.html': 'about', '404.html': '404'
};
const external = /^(?:https?:|mailto:|tel:|data:|javascript:)/i;
for (const page of pages) {
  const html = read(page);
  const checks = {
    charset: /<meta charset="utf-8">/i,
    viewport: /name="viewport"/i,
    title: /<title>[^<]+<\/title>/i,
    description: /name="description" content="[^"]+"/i,
    canonical: /rel="canonical" href="https:\/\/noxaplus-star\.github\.io\/noxaplus-tech-news\//i,
    ogTitle: /property="og:title"/i,
    ogImage: /property="og:image" content="https:\/\/noxaplus-star\.github\.io\/noxaplus-tech-news\/assets\/og\//i,
    twitter: /name="twitter:card"/i,
    icon: /rel="icon" href="assets\/icons\/favicon\.svg"/i,
    manifest: /rel="manifest" href="manifest\.webmanifest"/i,
    feed: /type="application\/rss\+xml"/i,
    themeInit: /localStorage\.getItem\('noxa_lang'\)/.test(html) && /localStorage\.getItem\('noxa_theme'\)/.test(html),
    page: new RegExp(`<body data-page="${pageTypes[page]}">`).test(html),
    headerMount: /id="site-header"/.test(html),
    main: /<main id="main">/.test(html),
    footerMount: /id="site-footer"/.test(html),
    dataScript: /assets\/data\/news\.js/.test(html) && /app\.js/.test(html),
    noscript: /<noscript>/.test(html)
  };
  for (const [name, ok] of Object.entries(checks)) if (!ok) fail(`${page}: missing ${name}`);
  if (!/NoxaPlus/.test(html)) fail(`${page}: NoxaPlus brand missing from source`);
  if (page === 'index.html' || page === 'about.html') {
    if (/name="robots"/.test(html)) fail(`${page}: should be indexable (no robots meta)`);
  } else if (page === 'article.html' || page === 'category.html') {
    if (/name="robots"/.test(html)) fail(`${page}: robots meta should be managed at runtime`);
  } else if (!/name="robots" content="noindex/.test(html)) {
    fail(`${page}: must be noindex`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (!target || target.startsWith('#') || external.test(target) || target.startsWith('//')) continue;
    const clean = target.split(/[?#]/)[0];
    if (!clean || clean.endsWith('/')) continue;
    if (!exists(decodeURIComponent(clean))) fail(`${page}: broken local reference ${target}`);
  }
}

/* ---------- Nested 404 deployment base and static fallback ---------- */
const notFound = read('404.html');
const baseHref = notFound.match(/<base href="([^"]+)"/);
if (!baseHref || baseHref[1] !== new URL(site.url).pathname) {
  fail('404.html deployment base must match site.url in assets/data/news.js');
}
if (notFound.indexOf('<base ') > notFound.indexOf('<link rel="icon"')) fail('404.html must set its base before loading relative assets');
if (!/<div id="page"[^>]*>\s*<section class="error-page">/.test(notFound)) fail('404.html needs a visible static fallback');

/* ---------- app.js asset references ---------- */
const app = read('app.js');
for (const match of app.matchAll(/(?:'|")(assets\/[^'"]+)(?:'|")/g)) {
  if (match[1].endsWith('/')) continue;
  if (!exists(match[1])) fail(`app.js references missing asset: ${match[1]}`);
}
for (const page of pages) {
  if (!app.includes(`'${pageTypes[page]}'`) && page !== 'index.html') fail(`app.js does not route ${page}`);
}
if (/https?:\/\/(?:fonts|cdn|unpkg|cdnjs|jsdelivr)/i.test(app) || /https?:\/\/(?:fonts|cdn|unpkg|cdnjs|jsdelivr)/i.test(read('style.css'))) {
  fail('runtime third-party CDN or font requests found');
}
if (!/nothing is sent anywhere|هیچ‌جا ارسال نمی‌شود/i.test(app)) fail('newsletter demo disclosure missing');

/* ---------- Search folding, original offsets, and escaping ---------- */
const searchSandbox = {};
const searchHelpers = ['esc', 'escapeRegExp', 'foldSearchText', 'normalize', 'highlight'].map((name) => {
  const source = app.match(new RegExp('  function ' + name + '\\([^]*?\\n  }'));
  if (!source) throw new Error('Missing search helper: ' + name);
  return source[0];
});
vm.runInNewContext(searchHelpers.join('\n'), searchSandbox);
const highlightCases = [
  ['Persian letter variants', 'باتری', 'باتري', '<mark>باتری</mark>'],
  ['Arabic letter variants', 'كيى', 'کیی', '<mark>كيى</mark>'],
  ['diacritics and offsets', 'الف بَاتریِ بعد', 'باتري', 'الف <mark>بَاتریِ</mark> بعد'],
  ['English case', 'Battery BATTERY', 'battery', '<mark>Battery</mark> <mark>BATTERY</mark>'],
  ['longest term first', 'battery', 'bat battery', '<mark>battery</mark>'],
  ['literal regex and HTML', '<b>A+B & "x"</b>', 'a+b &', '&lt;b&gt;<mark>A+B</mark> <mark>&amp;</mark> &quot;x&quot;&lt;/b&gt;'],
  ['HTML in query', '<img onerror=x>', '<img', '<mark>&lt;img</mark> onerror=x&gt;'],
  ['empty folded query', '<b>باتری</b>', '\u064E', '&lt;b&gt;باتری&lt;/b&gt;'],
  ['UTF-16 offsets', '\u{1F680} باتری', 'باتري', '\u{1F680} <mark>باتری</mark>'],
  ['lowercase expansion', '\u0130 bat', 'i bat', '<mark>\u0130</mark> <mark>bat</mark>']
];
for (const [name, value, query, expected] of highlightCases) {
  if (searchSandbox.highlight(value, query) !== expected) fail(`search highlight: ${name}`);
}
if (searchSandbox.normalize('  كِيى\n BATTERY  ') !== 'کیی battery') fail('search normalization changed');
note(`${highlightCases.length} search highlight regressions`);

/* ---------- Service worker ---------- */
const sw = read('sw.js');
const precacheEntries = [...sw.matchAll(/'([^']+\.(?:html|css|js|webmanifest|svg|png|woff2|xml))'/g)].map((m) => m[1]);
if (!precacheEntries.length) fail('sw.js does not list any precache assets');
else {
  for (const entry of precacheEntries) if (!exists(entry)) fail(`sw.js precache missing: ${entry}`);
  for (const cover of coverFiles) if (!precacheEntries.includes(cover)) fail(`sw.js does not precache cover: ${cover}`);
  note(`service worker precaches ${precacheEntries.length} files`);
}
if (!/VERSION/.test(sw) || !/fetch/.test(sw)) fail('sw.js is missing cache versioning or a fetch handler');
const workerEvents = {};
const cacheNames = new Set(['sibling-app-v1', 'other-noxa-news-v1', 'noxa-news-v2', 'noxa-news-v3']);
let claimed = false;
const workerSandbox = {
  self: {
    addEventListener: (name, callback) => { workerEvents[name] = callback; },
    clients: { claim: async () => { claimed = true; } }
  },
  caches: {
    keys: async () => [...cacheNames],
    delete: async (name) => cacheNames.delete(name)
  }
};
vm.runInNewContext(sw, workerSandbox);
if (workerSandbox.CACHE_PREFIX !== 'noxa-news-' || !workerSandbox.VERSION.startsWith('noxa-news-') || workerSandbox.VERSION === 'noxa-news-v3') {
  fail('service worker must retain its cache namespace and advance beyond v3');
}
cacheNames.add(workerSandbox.VERSION);
let activation;
workerEvents.activate({ waitUntil: (promise) => { activation = promise; } });
await activation;
if (!claimed || cacheNames.size !== 3 || !['sibling-app-v1', 'other-noxa-news-v1', workerSandbox.VERSION].every((name) => cacheNames.has(name))) {
  fail('service worker activation must remove only obsolete own caches and claim clients');
}
note('service worker activation preserves sibling caches');

/* ---------- Feeds and sitemap ---------- */
const sitemap = read('sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (sitemapUrls.length !== 2 + categories.length + articles.length) {
  fail(`sitemap has ${sitemapUrls.length} urls; expected ${2 + categories.length + articles.length}`);
}
for (const a of articles) if (!sitemapUrls.some((u) => u.endsWith('article.html?slug=' + a.slug))) fail(`sitemap missing ${a.slug}`);
if (sitemapUrls.some((u) => /search\.html|bookmarks\.html/.test(u))) fail('sitemap must not list noindex pages');
if ((read('feed.xml').match(/<item>/g) || []).length !== articles.length) fail('feed.xml item count does not match articles');
if (!/Sitemap: https:\/\/noxaplus-star\.github\.io\/noxaplus-tech-news\/sitemap\.xml/.test(read('robots.txt'))) fail('robots.txt sitemap line missing');
note(`${sitemapUrls.length} sitemap urls, ${articles.length} feed items`);

/* ---------- Documentation and license ---------- */
const readme = read('README.md');
for (const phrase of ['NoxaPlus', 'MIT', 'npm', 'assets/data/news.js', 'noxaplus.ir']) {
  if (!readme.includes(phrase)) fail(`README.md missing "${phrase}"`);
}
if (!/MIT License/.test(read('LICENSE'))) fail('LICENSE is not an MIT license');
if (!/NoxaPlus/.test(read('LICENSE'))) fail('LICENSE does not credit NoxaPlus');
if (!/NoxaPlus Tech News/.test(read('LICENSE'))) fail('LICENSE does not name the project');
if (!/2\.0\.0/.test(read('CHANGELOG.md'))) fail('CHANGELOG.md is not at 2.0.0');

/* ---------- Placeholder and encoding sanity ---------- */
const textFiles = [...pages, 'app.js', 'style.css', 'assets/data/news.js', 'README.md', 'feed.xml', 'sitemap.xml'];
for (const file of textFiles) {
  const content = read(file);
  if (/lorem ipsum/i.test(content)) fail(`${file}: Lorem ipsum placeholder found`);
  if (/\[OBJECT OBJECT\]/.test(content)) fail(`${file}: serialization bug text found`);
  if (content.includes('\uFFFD')) fail(`${file}: replacement character found`);
  if (/Noxa(?!Plus)/.test(content.replace(/NoxaPlus/g, ''))) fail(`${file}: standalone "Noxa" brand found`);
}

if (errors.length) {
  console.error(`\n${errors.length} problem(s) found:\n`);
  for (const error of errors) console.error(' - ' + error);
  process.exit(1);
}
console.log('Static checks passed.');
for (const line of stats) console.log(' · ' + line);
