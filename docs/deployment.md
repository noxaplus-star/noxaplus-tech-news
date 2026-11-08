# Deployment Guide

NoxaPlus Tech News is a static site. It runs on any host that can serve HTML files.

---

## GitHub Pages (free, recommended)

1. Push the repository to GitHub (already done)
2. Go to your repository → **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site is live at:
   `https://<your-username>.github.io/noxaplus-tech-news/`

Changes pushed to `main` redeploy automatically.

---

## Netlify (free, instant)

1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag and drop the `noxaplus-tech-news` folder
3. Your site is live immediately with a free `.netlify.app` subdomain
4. Connect to GitHub for automatic deployments on push

---

## Vercel (free)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **New Project** → import your GitHub repository
3. No build command needed — set **Output Directory** to `.` (root)
4. Click **Deploy**

---

## Traditional web hosting (FTP/cPanel)

1. Upload all files to your `public_html` (or `www`) folder via FTP or cPanel File Manager
2. Keep the folder structure intact
3. Open your domain in a browser

No `.htaccess`, server config, or backend setup is required.

---

## Local development

Open `index.html` directly in any browser — no local server needed.

For a cleaner local URL, use VS Code's **Live Server** extension or:

```bash
# Python 3
python -m http.server 8080
# Then open: http://localhost:8080
```
