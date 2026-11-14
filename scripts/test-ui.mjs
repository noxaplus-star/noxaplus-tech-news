/*
 * Browser smoke test for NoxaPlus Tech News.
 * Use an isolated Chrome profile with remote debugging and a local static server
 * that serves 404.html (status 404) for missing paths. Defaults: port 9222 and
 * http://127.0.0.1:4173/. Override with NOXA_CDP_PORT and NOXA_BASE.
 * Run against both root and deployment-subpath mounts. Not part of CI.
 * Screenshots go to a temporary directory unless NOXA_SHOTS is supplied.
 */
import { writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const PORT = Number(process.env.NOXA_CDP_PORT || 9222);
const BASE = (process.env.NOXA_BASE || 'http://127.0.0.1:4173/').replace(/\/?$/, '/');
const OUT = process.env.NOXA_SHOTS || mkdtempSync(join(tmpdir(), 'noxa-ui-shots-'));
mkdirSync(OUT, { recursive: true });

const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  if (data.id && pending.has(data.id)) {
    const { resolve, reject } = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) reject(new Error(data.error.message));
    else resolve(data.result);
  } else if (data.method) {
    events.push(data);
  }
};

function send(method, params = {}) {
  id += 1;
  const current = id;
  ws.send(JSON.stringify({ id: current, method, params }));
  return new Promise((resolve, reject) => pending.set(current, { resolve, reject }));
}

const consoleProblems = [];
function recordProblems() {
  for (const event of events.splice(0)) {
    if (event.method === 'Runtime.exceptionThrown') {
      const d = event.params.exceptionDetails;
      consoleProblems.push('EXCEPTION: ' + (d.exception?.description || d.text));
    } else if (event.method === 'Runtime.consoleAPICalled' && ['error', 'warning', 'assert'].includes(event.params.type)) {
      consoleProblems.push(event.params.type.toUpperCase() + ': ' + event.params.args.map((a) => a.value ?? a.description).join(' '));
    } else if (event.method === 'Log.entryAdded' && ['error', 'warning'].includes(event.params.entry.level)) {
      consoleProblems.push('LOG ' + event.params.entry.level.toUpperCase() + ': ' + event.params.entry.text);
    }
  }
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}

async function waitFor(expression, timeout = 8000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await evaluate(expression)) return true;
    await new Promise((r) => setTimeout(r, 120));
  }
  throw new Error('Timed out waiting for: ' + expression);
}

async function goto(path) {
  await send('Page.navigate', { url: BASE + path });
  await waitFor('document.readyState === "complete" && !!document.querySelector("#page")?.children.length');
  await new Promise((r) => setTimeout(r, 250));
}

async function shot(name, fullPage = true) {
  const metrics = await send('Page.getLayoutMetrics');
  const size = fullPage ? metrics.cssContentSize : metrics.cssLayoutViewport;
  const result = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: fullPage,
    clip: { x: 0, y: 0, width: Math.ceil(size.width), height: Math.min(Math.ceil(size.height), 12000), scale: 1 }
  });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(result.data, 'base64'));
  return `${OUT}/${name}.png`;
}

const checks = [];
function check(name, condition, detail = '') {
  checks.push({ name, pass: Boolean(condition), detail });
  console.log((condition ? 'PASS ' : 'FAIL ') + name + (condition ? '' : ' — ' + detail));
}

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.addScriptToEvaluateOnNewDocument', {
  source: 'if (navigator.serviceWorker) { navigator.serviceWorker.register = function () { return Promise.resolve(); }; }'
});
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });

/* Home, English light */
await goto('index.html');
await evaluate('localStorage.clear()');
await goto('index.html');
check('home title', (await evaluate('document.title')).includes('NoxaPlus Tech News'));
check('latest grid has 5 cards', (await evaluate('document.querySelectorAll(".news-grid .story-card").length')) === 5);
check('ticker present', await evaluate('!!document.querySelector(".ticker")'));
check('hero lead present', await evaluate('!!document.querySelector(".lead-story")'));
check('header nav has 8 links', (await evaluate('document.querySelectorAll(".mainnav .nav-link").length')) === 8);
check('no horizontal overflow', await evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'), await evaluate('document.documentElement.scrollWidth + "/" + window.innerWidth'));
await shot('home-light-en');

/* language toggle */
await evaluate('document.querySelector("[data-action=lang]").click()');
await waitFor('document.documentElement.lang === "fa"');
check('fa dir rtl', (await evaluate('document.documentElement.dir')) === 'rtl');
check('fa persisted', (await evaluate('localStorage.getItem("noxa_lang")')) === 'fa');
check('fa hero text', (await evaluate('document.body.innerText')).includes('سیگنال'));
check('fa numerals in dates', /[۰-۹]/.test(await evaluate('document.querySelector(".topbar-date").innerText')));
await shot('home-light-fa');

/* theme toggle */
await evaluate('document.querySelector("[data-action=theme]").click()');
await waitFor('document.documentElement.dataset.theme === "dark"');
check('dark persisted', (await evaluate('localStorage.getItem("noxa_theme")')) === 'dark');
check('dark background applied', (await evaluate('getComputedStyle(document.body).backgroundColor')) === 'rgb(14, 16, 12)', await evaluate('getComputedStyle(document.body).backgroundColor'));
await evaluate('window.scrollTo(0, 600)');
await new Promise((r) => setTimeout(r, 200));
await shot('home-dark-fa');

/* back to English + light */
await evaluate('document.querySelector("[data-action=lang]").click(); document.querySelector("[data-action=theme]").click()');
await waitFor('document.documentElement.lang === "en" && document.documentElement.dataset.theme === "light"');

/* article */
await goto('article.html?slug=small-models-big-shift');
check('article title', (await evaluate('document.title')).includes('small-model'));
check('article body blocks', (await evaluate('document.querySelectorAll(".article-body > *").length')) >= 10);
check('article TOC', (await evaluate('document.querySelectorAll(".rail-toc a").length')) >= 2);
check('article takeaways', (await evaluate('document.querySelectorAll(".takeaways li").length')) >= 3);
check('article JSON-LD BlogPosting', (await evaluate('JSON.parse(document.getElementById("page-jsonld").textContent)["@graph"].some(function (n) { return n["@type"] === "BlogPosting"; })')));
await shot('article-light-en');

/* save bookmark, then check bookmarks page */
await evaluate('document.querySelector("[data-action=bookmark]").click()');
await waitFor('JSON.parse(localStorage.getItem("noxa_bookmarks") || "[]").includes("small-models-big-shift")');
await goto('bookmarks.html');
check('bookmark listed', (await evaluate('document.querySelectorAll(".story-card").length')) === 1);
check('bookmark count badge', (await evaluate('document.querySelector(".tool-count").textContent')) === '1');
await shot('bookmarks-light-en');

/* category sort */
await goto('category.html?c=mobile&sort=oldest');
check('category chips 7', (await evaluate('document.querySelectorAll(".toolbar .chips .chip").length')) === 7);
const firstHref = await evaluate('document.querySelector(".news-grid .story-card a").getAttribute("href")');
check('sort oldest works', firstHref.includes('satellite-messaging-roaming'), firstHref);

/* search */
await goto('search.html?q=battery');
check('search results found', (await evaluate('document.querySelectorAll(".result-row").length')) >= 1);
check('search highlight', (await evaluate('document.querySelectorAll("mark").length')) >= 1);
check('search noindex', (await evaluate('document.querySelector(\'meta[name="robots"]\').content')).includes('noindex'));
await shot('search-light-en');

/* newsletter */
await goto('index.html');
await evaluate('document.querySelector(".newsletter-form input").value = "editor@example.com"');
await evaluate('document.querySelector(".newsletter-form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))');
await waitFor('!!localStorage.getItem("noxa_newsletter")');
check('newsletter stored locally', (await evaluate('localStorage.getItem("noxa_newsletter")')).includes('editor@example.com'));

/* about + 404 */
await goto('about.html');
check('about standards', (await evaluate('[...document.querySelectorAll(".about-prose h2")].map(function (h) { return h.textContent; }).join("|")')).includes('Editorial note'));
await shot('about-light-en');
await goto('article.html?slug=does-not-exist');
check('unknown article offers 404', (await evaluate('document.body.dataset.page')) === '404');
await shot('404-light-en');

/* mobile */
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await goto('index.html');
check('mobile no horizontal overflow', await evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'), await evaluate('document.documentElement.scrollWidth + "/" + window.innerWidth'));
await evaluate('document.querySelector("[data-action=menu]").click()');
await waitFor('!document.getElementById("mobile-drawer").hidden');
check('mobile drawer opens', await evaluate('!document.getElementById("mobile-drawer").hidden'));
await shot('home-mobile-menu');
await evaluate('document.querySelector("[data-action=menu]").click()');
await goto('index.html');
await shot('home-mobile');
await send('Emulation.clearDeviceMetricsOverride');

/* PWA + meta */
check('manifest linked', await evaluate('!!document.querySelector(\'link[rel="manifest"]\')'));
const manifest = await (await fetch(BASE + 'manifest.webmanifest')).json();
check('manifest icons exist', manifest.icons.length === 3);
const sw = await fetch(BASE + 'sw.js');
check('service worker served', sw.ok);
const sitemap = await (await fetch(BASE + 'sitemap.xml')).text();
check('sitemap has 20 urls', (sitemap.match(/<url>/g) || []).length === 20);
const feed = await (await fetch(BASE + 'feed.xml')).text();
check('feed has 12 items', (feed.match(/<item>/g) || []).length === 12);

recordProblems();
const problems = consoleProblems.filter((p) => !p.includes('favicon.ico'));
check('no console errors or warnings', problems.length === 0, problems.join(' | '));

const failed = checks.filter((c) => !c.pass);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
if (failed.length) {
  console.log('Failed:', failed.map((f) => f.name).join(', '));
  process.exitCode = 1;
}
ws.close();
