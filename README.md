# 💻 ASTRAFOLIO

> **Information Systems • Programming • Artificial Intelligence**

A premium, futuristic developer platform with a cyberpunk aesthetic. Built with pure HTML, CSS, and JavaScript — fast, responsive, and PWA-ready.

![Theme](https://img.shields.io/badge/theme-cyberpunk-00E5FF?style=flat-square) ![Stack](https://img.shields.io/badge/stack-HTML%20%2B%20CSS%20%2B%20JS-8B5CF6?style=flat-square) ![PWA](https://img.shields.io/badge/PWA-ready-F472B6?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-00E5FF?style=flat-square)

---

## ✨ Features

- 🎨 **Cyberpunk theme** — neon blue `#00E5FF`, purple `#8B5CF6`, black `#0B0F19`
- 🪟 **Glassmorphism** cards with soft glow
- ⚡ **Pure vanilla** — no frameworks, no build step
- 🌗 **Dark / Light** mode toggle (saved in `localStorage`)
- 🔍 **Live search** + **category filter** for articles
- 🧮 **Animated counters** for stats
- 🌀 **Animated particle network** + glowing grid background
- 🖱️ **Custom cursor** (desktop)
- 📱 **Fully responsive** — desktop, tablet, mobile
- ♿ **Accessible** — semantic HTML, ARIA, reduced-motion support
- 📲 **PWA-ready** — installable, theme color, manifest
- ⬆️ **Back-to-top** button, sticky nav, floating social buttons, smooth scroll
- 🔤 **Typography** — Inter + JetBrains Mono

## 🗂️ Structure

```
astrafolio/
├── index.html
├── manifest.json
├── css/
│   └── style.css
└── js/
    └── main.js
```

## 🚀 Run locally

Just open `index.html` in a modern browser — no build tools required.

```bash
git clone https://github.com/KRYZENSYS/astrafolio.git
cd astrafolio
# open index.html
```

Or serve it locally with any static server:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## 🌐 Deploy

Drop the folder into **Vercel**, **Netlify**, **GitHub Pages**, or **Cloudflare Pages** — zero config.

## 🧩 Customise

- **Brand colors** → edit CSS variables in `css/style.css` under `:root`
- **Articles** → edit cards in `index.html#articles` and add a matching filter pill
- **Categories** → edit cards in `index.html#categories`; set `data-cat` to a filter name
- **Telegram link** → replace `https://t.me/astrafolio` in `index.html`
- **Theme** → defaults to dark; user choice persists in `localStorage` as `astrafolio-theme`

## 📜 License

MIT — © 2026 ASTRAFOLIO. All rights reserved.
