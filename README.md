# NoxaPlus Tech News

> **⚠️ This is a DEMO website template.**
> Main site: [www.noxaplus.ir](https://www.noxaplus.ir) | 📞 09198690446

A free, fully responsive technology news website template built with plain HTML, CSS, and JavaScript — no frameworks, no build steps, no dependencies.

---

## Live Demo

[🌐 Open NoxaPlus Tech News Demo](https://noxaplus-star.github.io/noxaplus-tech-news/)

---

## Preview

```
┌─────────────────────────────────────────────┐
│  NoxaPlus         Home  Categories  About   │
├─────────────────────────────────────────────┤
│ 🔴 BREAKING  OpenAI unveils GPT-5 ... >>>>  │
├─────────────────────────────────────────────┤
│  ┌──────────┐  The Next Frontier:            │
│  │ Hero Img │  How AI Is Reshaping           │
│  │          │  Every Industry...             │
│  └──────────┘  [Read Full Story →]           │
├──────────────────┬──────────────────────────┤
│  Latest Stories  │  Categories              │
│  ┌────┐ ┌────┐   │  • AI (42)               │
│  │Card│ │Card│   │  • Mobile (38)           │
│  └────┘ └────┘   │  • Cybersecurity (29)    │
│  ┌────┐ ┌────┐   │  • Space (21)            │
│  │Card│ │Card│   │  Trending                │
│  └────┘ └────┘   │  1. xAI raises $20B...  │
├──────────────────┴──────────────────────────┤
│  Footer: NoxaPlus | noxaplus.ir | Contact   │
└─────────────────────────────────────────────┘
```

---

## What is this project?

**NoxaPlus Tech News** is a complete, production-ready technology news website template. It is designed for developers, agencies, and content creators who need a polished, fast-loading news portal without the overhead of a CMS or JavaScript framework.

The template covers everything a real news site needs: breaking news ticker, featured hero story, categorized news grid, trending sidebar, newsletter signup, bilingual support (English + Persian), and a fully responsive layout for mobile and desktop.

**Author / Brand:** [NoxaPlus](https://www.noxaplus.ir)

---

## Features

- **Dark modern design** — deep navy/black theme with cyan accent colors
- **Breaking news ticker** — smooth auto-scrolling headline bar
- **Hero section** — large featured story card with image, category badge, and excerpt
- **News grid** — 6 news cards with category color-coding, dates, and hover effects
- **Category sidebar** — AI, Mobile, Cybersecurity, Space, Software, Hardware
- **Trending panel** — numbered list of trending stories
- **Newsletter signup** — email input with success feedback
- **EN / FA language toggle** — switches all text between English and Persian with one click; persists in `localStorage`
- **RTL support** — full right-to-left layout activated automatically in Persian mode
- **Persian typography** — Vazirmatn font loaded on demand for FA mode
- **Fully responsive** — works on mobile (320px) through 4K desktop
- **Zero dependencies** — vanilla HTML, CSS, JavaScript only; no npm, no build step
- **SEO-ready structure** — semantic HTML5, proper heading hierarchy, alt text

---

## Getting started

### Option 1 — Open directly

1. Download or clone this repository
2. Open `index.html` in any modern browser
3. Done — no installation, server, or terminal required

### Option 2 — Clone via Git

```bash
git clone https://github.com/noxaplus-star/noxaplus-tech-news.git
cd noxaplus-tech-news
# Open index.html in your browser
```

---

## Project structure

```
noxaplus-tech-news/
├── index.html          # Main page — all sections in one file
├── style.css           # Full stylesheet with CSS variables and responsive breakpoints
├── script.js           # Language toggle, mobile menu, newsletter feedback
├── assets/
│   ├── hero.svg        # Hero section placeholder image
│   ├── mobile.svg      # Mobile category placeholder
│   ├── cyber.svg       # Cybersecurity category placeholder
│   ├── space.svg       # Space category placeholder
│   ├── software.svg    # Software category placeholder
│   ├── hardware.svg    # Hardware category placeholder
│   └── ai2.svg         # AI category placeholder
├── docs/
│   ├── customization.md   # How to replace content, colors, and fonts
│   └── deployment.md      # How to deploy to GitHub Pages, Netlify, or a server
├── README.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

---

## Customization

### Change the color scheme

Edit the CSS variables in `style.css`:

```css
:root {
  --bg: #0a0f1e;       /* Main background */
  --accent: #00d4ff;   /* Primary accent color */
  --card-bg: #111827;  /* Card background */
  --text: #e2e8f0;     /* Primary text */
}
```

### Replace sample news content

Open `index.html` and edit the `data-en` and `data-fa` attributes on any element:

```html
<h3 data-en="Your English headline" data-fa="تیتر فارسی شما">Your English headline</h3>
```

### Replace images

Swap the SVG files in `assets/` with your own images (JPG, PNG, WebP). Update the `src` attributes in `index.html`.

### Add more news cards

Copy any `<article class="card">` block inside `.news-grid` and update its content.

---

## Language toggle

All user-visible text carries both a `data-en` and a `data-fa` attribute. The `script.js` file reads these and swaps content on click. The chosen language is saved in `localStorage` under the key `noxaplus_lang` so it persists across page reloads.

```html
<!-- Example bilingual element -->
<span data-en="Categories" data-fa="دسته‌بندی‌ها">Categories</span>
```

---

## Deployment

### GitHub Pages (free)

1. Push the repository to GitHub (already done if you forked this)
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch → main → / (root)**
4. Your site is live at `https://<your-username>.github.io/noxaplus-tech-news/`

### Netlify (free)

1. Drag and drop the project folder into [netlify.com/drop](https://netlify.com/drop)
2. Your site is live instantly with a free subdomain

### Any static host

Upload all files to the server root. No backend or configuration needed.

---

## Why use this template?

| Feature | This template | WordPress | React/Next.js |
|---|---|---|---|
| Setup time | 0 min | 30+ min | 30+ min |
| Dependencies | None | Plugins | node_modules |
| Page speed | ⚡ Instant | 🐢 Varies | ⚡ Fast |
| Hosting cost | Free | Paid plan | Free/Paid |
| Maintenance | None | Updates | Updates |
| Bilingual (EN/FA) | ✅ Built-in | Plugin needed | Custom |

---

## Current limitations

- Sample news content is placeholder data — not a live news feed
- No backend, CMS, or database integration
- No admin panel or content management system
- Language support covers English and Persian only (extendable)
- No search functionality in this version
- Image placeholders are SVG — replace with real photography for production

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request on [GitHub](https://github.com/noxaplus-star/noxaplus-tech-news).

Star ⭐ the repository if this template helped you — it supports the NoxaPlus team in building more open tools.

Follow **[@noxaplus-star](https://github.com/noxaplus-star)** on GitHub to get notified when new templates and tools are released.

---

## AI assistance

AI assistance was used to draft and revise the template code and documentation. Content is placeholder data and does not represent real news or events.

---

## License

Licensed under the **MIT License**. See [LICENSE](LICENSE).

Free to use, modify, and distribute — commercially or personally. Attribution appreciated but not required.

---

## فارسی

### معرفی

**NoxaPlus Tech News** یک قالب وب‌سایت خبری فناوری، کامل، واکنش‌گرا و رایگان است که با HTML، CSS و JavaScript ساخته شده — بدون فریم‌ورک، بدون مرحله build، بدون وابستگی خارجی.

این قالب برای توسعه‌دهندگان، آژانس‌ها و تولیدکنندگان محتوا طراحی شده که به یک پورتال خبری حرفه‌ای و سریع نیاز دارند.

### ویژگی‌ها

- طراحی تاریک و مدرن با رنگ‌بندی سایان
- تیکر اخبار فوری با اسکرول خودکار
- بخش هیرو با خبر ویژه
- گرید ۶ خبر با دسته‌بندی رنگی
- سایدبار دسته‌بندی و ترند
- دکمه تغییر زبان EN/FA با پشتیبانی RTL کامل
- فونت وزیرمتن برای حالت فارسی
- واکنش‌گرا برای موبایل و دسکتاپ

### شروع سریع

فایل `index.html` را دانلود کن و مستقیم در مرورگر باز کن. هیچ نصب یا سروری لازم نیست.

### پشتیبانی و توسعه

برند و توسعه‌دهنده: **NoxaPlus**
وب‌سایت: [www.noxaplus.ir](https://www.noxaplus.ir)
تماس: 09198690446

اگه این قالب به کارت اومد، ⭐ بزن و اکانت **[@noxaplus-star](https://github.com/noxaplus-star)** رو دنبال کن تا از قالب‌ها و ابزارهای جدید مطلع بشی.
