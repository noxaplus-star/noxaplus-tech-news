# Deployment guide

NoxaPlus Tech News is a pure static site: HTML, CSS, JavaScript, fonts, images, and generated feeds. It needs no server runtime, database, build step, or environment variables. Any host that serves files over HTTPS can run it.

---

## GitHub Pages with Actions (included)

The repository ships with `.github/workflows/ci.yml` (validation) and `.github/workflows/pages.yml` (deployment).

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `master`. The workflow validates the project, uploads the repository root as a Pages artifact, and deploys it.
5. The site appears at `https://<owner>.github.io/<repo>/`.

The canonical URL is defined in `SITE.url` (`assets/data/news.js`) and used by canonicals, Open Graph, JSON-LD, the sitemap, and the feed. If your repository or domain differs, update `SITE.url` first, then run:

```bash
node scripts/feeds.mjs
node scripts/check.mjs
```

### Repository settings that help

- Description: “A bilingual, open-source technology newsroom. Twelve original stories, six desks, offline-ready, MIT.”
- Homepage: the live Pages URL.
- Topics: `static-site`, `news-template`, `bilingual`, `persian`, `rtl`, `pwa`, `github-pages`, `vanilla-javascript`, `mit-license`.
- Enable **Discussions** or **Issues** if you want public feedback.

---

## Branch-based Pages (alternative)

If you prefer the classic branch deployment:

1. **Settings → Pages → Source: Deploy from a branch.**
2. Select `master` and `/ (root)`.
3. Remove or disable `.github/workflows/pages.yml` to avoid competing deployments.
4. Save; GitHub serves the root directory.

No Jekyll configuration is required because the project has no files that need processing. If you add underscored folders, add an empty `.nojekyll` file at the root.

---

## Custom domain

1. Add your domain in **Settings → Pages → Custom domain**.
2. Create the DNS records GitHub shows (an apex `A`/`AAAA` set or a `CNAME` for a subdomain).
3. Wait for DNS, then enable **Enforce HTTPS**.
4. Update `SITE.url` to `https://your-domain/`, regenerate feeds, and push.

If you host on GitHub Pages with a custom domain, add a `CNAME` file at the repository root containing only the domain name (no protocol, no trailing slash). Keep it in sync with the Pages setting.

---

## Other static hosts

### Netlify

- Drag the repository folder into <https://app.netlify.com/drop>, or connect the Git repository.
- Build command: leave empty.
- Publish directory: `.` (repository root).
- No redirects are needed; query strings work on static files.

### Vercel

- Import the repository.
- Framework preset: **Other**.
- Build command: empty.
- Output directory: `.` (root).

### Cloudflare Pages

- Connect the repository.
- Framework preset: **None**.
- Build command: empty.
- Build output directory: `/`.

### Nginx or Apache / cPanel

Upload the repository contents to the web root, preserving folders. Ensure `.webmanifest` is served as `application/manifest+json` and `.woff2` as `font/woff2` if your server's MIME map is old. `sw.js` must be served from the site root or a path that scopes the pages you want offline.

---

## Caching and updates

- HTML shells are small and network-first in the service worker, so navigation tries the network before falling back to cache.
- Static assets are stale-while-revalidate: visitors get the cached copy immediately and the fresh copy on the next load.
- **Always bump `VERSION` in `sw.js` when CSS, JS, data, fonts, covers, or icons change.** Without a bump, installed clients keep the previous precache until the background update lands.
- GitHub Pages sets short cache lifetimes for HTML and longer ones for hashed assets. Because filenames here are stable, the service worker is the main update mechanism.
- After a deploy, a hard reload (or DevTools → Application → Service Workers → Update) verifies the new version immediately.

---

## Verification after deploy

Run through this list on the live URL:

- [ ] `/` loads in English; the language button switches to Persian with RTL layout and Persian numerals.
- [ ] Theme button switches light/dark, persists after reload, and the browser theme colour changes.
- [ ] `/article.html?slug=small-models-big-shift` renders title, body, table of contents, takeaways, related stories, and correct meta/JSON-LD.
- [ ] `/category.html?c=mobile&sort=oldest` sorts correctly.
- [ ] `/search.html?q=battery` highlights matches; a nonsense query shows the empty state.
- [ ] `/bookmarks.html` lists a saved story and survives a reload.
- [ ] `/about.html` renders the editorial note and NoxaPlus credits.
- [ ] An unknown slug and an unknown path show the 404 page.
- [ ] `manifest.webmanifest`, `sw.js`, `feed.xml`, `sitemap.xml`, and `robots.txt` return 200.
- [ ] Open Graph images resolve at `assets/og/<slug>.png`.
- [ ] Offline: load the site, switch DevTools to Offline, navigate to another page — the shell and cached data still render.
- [ ] Console has no errors or warnings in either language or theme.

`node scripts/check.mjs` covers most static failures before they reach production. The optional browser suite (`scripts/test-ui.mjs`) automates the interaction checks locally.

---

## Rollback

Pages deployments are ordinary commits. Revert the offending commit and push; the workflow redeploys the previous state. If a service-worker regression is involved, ship a revert **and** bump `VERSION` so installed clients pick up the fix.
