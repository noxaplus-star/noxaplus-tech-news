# Contributing to NoxaPlus Tech News

Thanks for considering a contribution. This project is a static, dependency-free newsroom template; keeping it small, readable, and honest is more valuable than adding features.

## Getting started

1. Fork the repository and create a branch: `feat/short-description` or `fix/short-description`.
2. Serve the root with `python -m http.server 4173` (or any static server). There is no install or build step.
3. Make your change.
4. Run `node scripts/check.mjs`.
5. If you changed rendering or interaction, run the browser suite described in the README.
6. Open a pull request using the checklist below.

## What makes a good change

- **No runtime dependencies.** Do not add frameworks, icon packs, CDN scripts, analytics, or remote fonts. Fonts are self-hosted; artwork is generated locally.
- **Vanilla JavaScript.** `app.js` deliberately uses ES5-style `var` and function declarations for consistency with the existing file. Match the surrounding style.
- **Both languages, always.** Every new interface string belongs in the `UI` dictionary with complete `en` and `fa` values. Every new content field must be bilingual. Persian copy should be natural Persian, not a transliteration.
- **RTL is not an afterthought.** Test any layout change in Persian as well as English, at desktop and mobile widths.
- **Accessibility stays intact.** Preserve landmarks, labels, focus behaviour, keyboard access, reduced-motion handling, and colour contrast.
- **No invented reporting.** The demo stories are editorial samples. If you add a story, mark it clearly as sample content and keep the disclosure in the footer and About page.

## Editorial data changes

- Keep `ARTICLES` sorted newest first and dates unique.
- Slugs use lowercase ASCII and hyphens only.
- Add a cover under `assets/covers/`, then run `node scripts/render.mjs` and `node scripts/feeds.mjs`.
- Never edit `sitemap.xml` or `feed.xml` by hand; they are generated.

## Pull request checklist

- [ ] `node scripts/check.mjs` passes.
- [ ] Tested in English and Persian, light and dark, desktop and mobile.
- [ ] No console errors or warnings.
- [ ] No third-party runtime requests.
- [ ] README or docs updated when behaviour changes.
- [ ] Commit messages describe the reason, not just the file names.

## Commit style

Use short imperative subjects, for example:

```
fix: keep footer columns visible on narrow desktops
feat: add Jalali date formatting to desk pages
docs: document the cover generator
```

## Reporting bugs and ideas

Open an issue with the page, query string, browser, language, and theme. Screenshots help. For security-sensitive reports, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

## License

By contributing, you agree that your work is released under the [MIT License](LICENSE).
