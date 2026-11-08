# Customization Guide

This guide explains how to adapt the NoxaPlus Tech News template to your own brand and content.

---

## 1. Change the site name and logo

Open `index.html` and find all occurrences of `NoxaPlus`. Replace them with your brand name.

The logo SVG in the header and footer uses the letter **N** — change the letter and the `fill` color to match your brand:

```html
<rect width="36" height="36" rx="8" fill="#00d4ff"/>
<text ... fill="#0a0f1e">N</text>
```

---

## 2. Change the color scheme

All colors are CSS custom properties in `style.css`. Edit the `:root` block:

```css
:root {
  --bg: #0a0f1e;        /* Page background */
  --bg2: #0f172a;       /* Section background */
  --bg3: #1e293b;       /* Input / widget background */
  --accent: #00d4ff;    /* Primary accent (cyan) */
  --accent2: #0ea5e9;   /* Secondary accent (blue) */
  --card-bg: #111827;   /* News card background */
  --text: #e2e8f0;      /* Primary text */
  --text2: #94a3b8;     /* Secondary / muted text */
  --border: #1e293b;    /* Border color */
}
```

---

## 3. Replace news content

Every visible text element has `data-en` and `data-fa` attributes:

```html
<h3 data-en="Your English headline" data-fa="تیتر فارسی">Your English headline</h3>
```

Update both attributes. The JS will switch between them based on the selected language.

---

## 4. Replace images

Swap the SVG files in `assets/` with your own photos. Any format works (JPG, PNG, WebP, SVG). Update the `src` attributes in `index.html`:

```html
<img src="assets/your-image.jpg" alt="Description" />
```

Recommended image sizes:
- Hero: 800 × 450 px
- News cards: 600 × 340 px

---

## 5. Add more news cards

Copy any `<article class="card">` block inside `.news-grid` and update its content. The grid handles layout automatically.

---

## 6. Change category colors

Category badge colors are defined in `style.css`:

```css
.ai       { background: rgba(139,92,246,.15); color: #a78bfa; }
.mobile   { background: rgba(34,197,94,.15);  color: #4ade80; }
.cyber    { background: rgba(239,68,68,.15);  color: #f87171; }
.space    { background: rgba(0,212,255,.15);  color: #00d4ff; }
.software { background: rgba(251,191,36,.15); color: #fbbf24; }
.hardware { background: rgba(249,115,22,.15); color: #fb923c; }
```

---

## 7. Remove the DEMO banner

Find and delete (or comment out) the `.demo-banner` div in `index.html`:

```html
<!-- DEMO BANNER — remove this for production -->
<div class="demo-banner"> ... </div>
```

Also remove its CSS block in `style.css`.

---

## 8. Update footer contact details

Find the `.footer-dev` section in `index.html` and update:

```html
<a href="https://www.yoursite.com" target="_blank">www.yoursite.com</a>
<a href="tel:YOUR_NUMBER">📞 YOUR_NUMBER</a>
```
