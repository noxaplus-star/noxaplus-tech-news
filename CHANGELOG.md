# Changelog

All notable changes to NoxaPlus Tech News are documented here. This project follows [Semantic Versioning](https://semver.org/).

## [2.0.0] — 2026-11-12

A complete rebuild: new editorial identity, real multi-page architecture, bilingual content, and a production-ready static newsroom.

### Added

- **Seven routed pages** — front page, story, desk, search, reading list, about, and a branded 404, all sharing one masthead and footer.
- **Twelve original bilingual articles** across AI, mobile, cybersecurity, space, software, and hardware, with decks, tags, key takeaways, pull quotes, and section headings.
- **Editorial design system** — paper-and-ink light theme, true dark theme, serif display typography, hard-edged cards, live ticker, asymmetric hero, sticky masthead, and responsive layouts.
- **Full Persian experience** — RTL layout, Vazirmatn, Persian numerals, Jalali dates, and bilingual UI copy for every control.
- **Persian-aware search** — normalisation of Arabic/Persian characters and diacritics, safe match highlighting, and category filtering.
- **Private reading list** — save stories to `localStorage`, with counts, empty states, and clear-all confirmation.
- **Article tools** — reading progress, generated table of contents, related stories, older/newer navigation, copy link, and native share with clipboard fallback.
- **Demo newsletter** — validation and local-only storage, with explicit disclosure.
- **PWA and offline mode** — manifest, favicon, standard and maskable icons, app shortcuts, precache, navigation fallback, and stale-while-revalidate updates.
- **SEO and structured data** — per-page meta, Open Graph/Twitter cards, a default card plus twelve per-story PNG cards, `WebSite`, `Organization`, `BlogPosting`, `BreadcrumbList`, and `CollectionPage` JSON-LD.
- **Generated feeds** — 20-URL sitemap, 12-item RSS feed, and robots rules generated from the same editorial data.
- **Self-hosted assets** — four WOFF2 fonts and twelve deterministic SVG covers; no CDN, analytics, or third-party runtime requests.
- **Tooling** — dependency-free static validator, cover generator, social-card renderer, feed generator, and a browser smoke suite.
- **Complete documentation** — English README, contribution guide, security policy, code of conduct, customization guide, and deployment guide.
- **CI and deployment** — GitHub Actions validation plus a Pages deployment workflow.

### Changed

- Replaced the single-page demo with query-routed static shells and a data-driven renderer.
- Reworked language and theme storage (`noxa_lang`, `noxa_theme`) and moved all fonts to self-hosted files.
- Replaced placeholder SVG artwork with generated editorial covers.
- Expanded licensing and credit to name NoxaPlus Tech News explicitly.

### Fixed

- Removed dead `#` navigation and the fake newsletter submit path.
- Fixed dark-theme contrast in the top bar, footer, ink panels, developer card, save buttons, and counters.
- Fixed recursive 404 rendering for unknown stories and desks.
- Fixed search highlighting corrupting HTML entities.
- Fixed unlocalised skip-link text and Escape focus return for both drawers.
- Fixed footer rendering without its dark wrapper.

### Removed

- Legacy `script.js`, placeholder category illustrations, and outdated documentation claims.

## [1.0.0] — 2026-11-08

### Added

- Initial demo release: single-page layout, gradient dark theme, ticker, six sample cards, category list, language toggle, mobile menu, and placeholder SVG images.
- MIT License and initial README, changelog, and docs structure.
