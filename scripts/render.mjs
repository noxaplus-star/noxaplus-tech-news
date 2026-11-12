/*
 * Renders the PNG icon set and the per-article Open Graph images with
 * headless Chrome. Run with: node scripts/render.mjs
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find((candidate) => existsSync(candidate));

if (!CHROME) {
  console.error('Chrome or Edge was not found.');
  process.exit(1);
}

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(ROOT, 'assets/data/news.js'), 'utf8'), sandbox);
const { site, categories, articles } = sandbox.window.NOXA_NEWS;
const categoryById = new Map(categories.map((c) => [c.id, c]));

const work = mkdtempSync(join(tmpdir(), 'noxa-render-'));
const fileUrl = (rel) => pathToFileURL(join(ROOT, rel)).href;
const fontUrl = (rel) => fileUrl(rel);

function shoot(html, file, width, height) {
  const page = join(work, `page-${Math.random().toString(36).slice(2)}.html`);
  writeFileSync(page, html, 'utf8');
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--disable-extensions',
    '--force-device-scale-factor=1',
    `--user-data-dir=${join(work, 'profile')}`,
    `--window-size=${width},${height}`,
    '--virtual-time-budget=4000',
    `--screenshot=${file}`,
    pathToFileURL(page).href
  ], { stdio: 'ignore' });
}

const shell = (body) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
@font-face{font-family:Newsreader;src:url("${fontUrl('assets/fonts/newsreader-latin-var.woff2')}") format("woff2");font-weight:200 800;font-style:normal;font-display:block}
@font-face{font-family:Newsreader;src:url("${fontUrl('assets/fonts/newsreader-latin-italic-var.woff2')}") format("woff2");font-weight:200 800;font-style:italic;font-display:block}
@font-face{font-family:Inter;src:url("${fontUrl('assets/fonts/inter-latin-var.woff2')}") format("woff2");font-weight:100 900;font-style:normal;font-display:block}
*{box-sizing:border-box}
html,body{margin:0;width:100%;height:100%;overflow:hidden}
body{background:#f4f1e8;color:#12130f;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
</style></head><body>${body}</body></html>`;

/* ---- PNG icons ---- */
mkdirSync(join(ROOT, 'assets/icons'), { recursive: true });
const iconJobs = [
  ['assets/icons/icon-square.svg', 'assets/icons/icon-192.png', 192],
  ['assets/icons/icon-square.svg', 'assets/icons/icon-512.png', 512],
  ['assets/icons/icon-square.svg', 'assets/icons/apple-touch-icon.png', 180],
  ['assets/icons/icon-maskable.svg', 'assets/icons/icon-maskable-512.png', 512]
];
for (const [source, out, size] of iconJobs) {
  shoot(shell(`<img src="${fileUrl(source)}" width="${size}" height="${size}" style="display:block">`), join(ROOT, out), size, size);
  console.log('icon', out);
}

/* ---- Open Graph cards ---- */
const fmt = (iso) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));

function card({ kicker, title, dek, category, date, cover, big, mark }) {
  const color = category ? category.color : '#12130f';
  const soft = category ? category.soft : '#e6e1d1';
  const titleSize = big ? 74 : (title.length > 62 ? 50 : 58);
  return shell(`
  <div style="position:absolute;inset:0;padding:46px 56px;display:flex;flex-direction:column">
    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #12130f;padding-bottom:16px">
      <div style="display:flex;align-items:center;gap:14px">
        <svg width="34" height="34" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#12130f"/><path d="M151 366V146" stroke="#d8ff3e" stroke-width="46"/><path d="M151 146L361 366" stroke="#d8ff3e" stroke-width="52"/><path d="M361 366V146" stroke="#d8ff3e" stroke-width="46"/><rect x="349" y="112" width="46" height="46" fill="#2b4bff"/></svg>
        <span style="font-weight:800;font-size:19px;letter-spacing:.16em;text-transform:uppercase">NoxaPlus Tech News</span>
      </div>
      <span style="font-weight:700;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#5a5c50">${site.edition.en}</span>
    </div>
    <div style="flex:1;display:flex;gap:44px;padding-top:38px;align-items:flex-start">
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;height:100%">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:22px">
          <span style="background:${color};color:#fff;font-weight:800;font-size:13px;letter-spacing:.13em;text-transform:uppercase;padding:7px 12px">${kicker}</span>
          <span style="font-weight:600;font-size:14px;color:#5a5c50">${date}</span>
        </div>
        <div style="font-family:Newsreader,Georgia,serif;font-weight:600;font-size:${titleSize}px;line-height:1.02;letter-spacing:-.02em;margin-bottom:18px">${title}</div>
        <div style="font-size:19px;line-height:1.45;color:#3d3f35;max-width:600px">${dek}</div>
        ${mark ? `<div style="margin-top:auto;display:flex;gap:42px;padding-top:36px">
          <div><div style="font-family:Newsreader,Georgia,serif;font-size:44px;line-height:1">06</div><div style="font-weight:800;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5a5c50;margin-top:6px">Desks</div></div>
          <div><div style="font-family:Newsreader,Georgia,serif;font-size:44px;line-height:1">12</div><div style="font-weight:800;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5a5c50;margin-top:6px">Original stories</div></div>
          <div><div style="font-family:Newsreader,Georgia,serif;font-size:44px;line-height:1">02</div><div style="font-weight:800;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5a5c50;margin-top:6px">Languages</div></div>
          <div><div style="font-family:Newsreader,Georgia,serif;font-size:44px;line-height:1">00</div><div style="font-weight:800;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5a5c50;margin-top:6px">Tracker scripts</div></div>
        </div>` : ''}
        <div style="margin-top:${mark ? '24px' : 'auto'};display:flex;align-items:center;justify-content:space-between;gap:16px;border-top:2px solid #d8d2c2;padding-top:14px;white-space:nowrap">
          <span style="font-weight:700;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#5a5c50">noxaplus-star.github.io/noxaplus-tech-news</span>
          <span style="font-weight:800;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#12130f">Developed by NoxaPlus</span>
        </div>
      </div>
      ${cover ? `<div style="width:430px;flex:0 0 430px;padding-top:6px">
        <div style="border:3px solid #12130f;box-shadow:12px 12px 0 ${soft};background:${soft}">
          <img src="${fileUrl(cover)}" width="430" height="242" style="display:block;width:100%;height:auto">
        </div>
      </div>` : ''}
      ${mark ? `<div style="width:330px;flex:0 0 330px;padding-top:34px">
        <div style="border:3px solid #12130f;box-shadow:14px 14px 0 #d8ff3e">
          <img src="${fileUrl('assets/icons/icon-square.svg')}" width="330" height="330" style="display:block">
        </div>
        <div style="margin-top:30px;font-weight:800;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#5a5c50">An open-source demo newsroom</div>
        <div style="margin-top:8px;font-family:Newsreader,Georgia,serif;font-style:italic;font-size:22px;line-height:1.25;color:#12130f">Six desks. Twelve original stories. Two languages.</div>
      </div>` : ''}
    </div>
  </div>`);
}

mkdirSync(join(ROOT, 'assets/og'), { recursive: true });

shoot(card({
  kicker: 'The front page',
  title: 'Signals, not noise.',
  dek: 'A bilingual technology newsroom about the systems, devices, and ideas that will still matter next year.',
  category: null,
  date: 'Est. ' + site.established,
  big: true,
  mark: true
}), join(ROOT, 'assets/og/default.png'), 1200, 630);
console.log('og default');

for (const article of articles) {
  const category = categoryById.get(article.category);
  shoot(card({
    kicker: category.en,
    title: article.title.en,
    dek: article.dek.en,
    category,
    date: fmt(article.date),
    cover: article.cover
  }), join(ROOT, `assets/og/${article.slug}.png`), 1200, 630);
  console.log('og', article.slug);
}

rmSync(work, { recursive: true, force: true });
console.log('done');
