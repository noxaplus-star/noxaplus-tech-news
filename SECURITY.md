# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 2.x | Yes |
| 1.x | No |

## Reporting a vulnerability

Email **NoxaPlus2025@gmail.com** with:

- a description of the issue and its impact,
- the page and query string involved,
- reproduction steps or a minimal proof of concept,
- browser and operating system,
- whether the issue affects the hosted demo or self-hosted copies.

Please do not open a public issue for an undisclosed vulnerability. You can expect an acknowledgement within a few days. Fixes are published as a new commit and changelog entry; credit is given on request.

## Scope

NoxaPlus Tech News is a static site. It has no server, database, login, or analytics. The only persisted data is stored in the visitor's `localStorage`:

- `noxa_lang` — interface language,
- `noxa_theme` — light or dark preference,
- `noxa_bookmarks` — saved article slugs,
- `noxa_newsletter` — the demo form's email value (never transmitted).

Nothing is sent to NoxaPlus or any third party. Reports that are most useful include cross-site scripting through editorial data, unsafe URL construction, service-worker cache poisoning, dependency or workflow compromise, and privacy leaks in generated files.

## Hardening notes for self-hosting

- Replace the demo content and review every link before publishing.
- Keep the Content Security Policy of your host as strict as your setup allows. The site needs `'self'` for scripts, styles, fonts, and images; the inline theme bootstrap requires either a hash or `'unsafe-inline'` for scripts if you add a CSP.
- Serve over HTTPS so the service worker and install prompt are available.
- Bump `VERSION` in `sw.js` whenever cached assets change.
- Review GitHub Actions permissions; the deployment workflow only needs `pages: write` and `id-token: write`.
