# Monona Coach Website

Marketing site for [Monona Coach](https://monona-sports.com), an AI basketball shooting coach app that analyzes shooting form and compares it to pro players.

**Live site:** https://monona-sports.com

## About the project

Monona Coach helps players improve their shot through phase breakdowns, detailed analysis, and personalized coaching feedback. This repository is the public-facing website: product overview, app screenshots, team info, demo booking, and legal pages.

Built as a **static site** (HTML, CSS, vanilla JavaScript) and hosted on **GitHub Pages** with a custom domain (`CNAME`).

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `index.html` | Hero, feature carousels, download links |
| Book a demo | `book-demo.html` | Calendly scheduling embed |
| Team | `team.html` | Co-founders and LinkedIn links |
| Privacy Notice | `privacy.html` | App and website privacy policy |
| Linktree | `linktree/index.html` | Social links and quick actions for bio pages |

## Project structure

```
├── index.html          # Main landing page
├── book-demo.html      # Demo scheduling (Calendly)
├── team.html           # Team page
├── privacy.html        # Privacy notice
├── linktree/           # Link-in-bio style page
├── styles.css          # Global styles
├── scripts.js          # Home page interactions (carousel, typewriter, nav)
├── analytics.js        # Google Analytics 4 + event tracking
├── cookie-consent.js   # Cookie consent banner
├── images/             # Logos and team photos
└── app_images/         # App screenshot assets (referenced from index.html)
```

## Local development

No build step or dependencies. Serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Analytics

The site uses **Google Analytics 4** with a cookie consent banner. Tracking runs only after the user accepts cookies.

- Measurement ID is configured in `analytics.js` (`GA_MEASUREMENT_ID`)
- Custom events include demo clicks, App Store downloads, social links, and Calendly bookings

To change the ID or add a new property, update `GA_MEASUREMENT_ID` in `analytics.js` and redeploy. Verify hits in GA4 **Realtime** or **DebugView** after accepting cookies on the live site.

## Contact

**Support:** support@monona-sports.com
