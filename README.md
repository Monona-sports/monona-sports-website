# Hoop Mo Website

Marketing site for [Hoop Mo](https://monona-sports.com), an AI basketball shooting coach with **Live Shoot**, **Mo**, and **Pro Comparison**.

**Live site:** https://monona-sports.com

## About the project

Hoop Mo helps players improve through realtime Live Shoot feedback, Mo (a companion that remembers every shot), progress tracking, and optional pro player comparison. This repository is the public-facing static site on GitHub Pages.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home (Live Shoot + Mo) | `index.html` | Hero Live Shoot demo, Mo chat, activity progress, FAQ, download |
| Pro Comparison | `pro-comparison.html` | NBA form matching, analytics, drills, promo video |
| Book a demo | `book-demo.html` | Calendly scheduling embed |
| Privacy Notice | `privacy.html` | App and website privacy policy |
| Linktree | `linktree/index.html` | Social links and quick actions for bio pages |

## Project structure

```
├── index.html              # Live Shoot + Mo homepage
├── pro-comparison.html     # Pro player comparison
├── book-demo.html
├── privacy.html
├── linktree/
├── styles.css
├── scripts.js
├── analytics.js
├── cookie-consent.js
├── images/                 # Logos and Mo mascot
└── app_images/             # Promo videos, chat, activity, analysis screens
```

## Local development

```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Contact

**Support:** support@monona-sports.com
