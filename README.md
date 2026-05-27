<p align="center">
  <img src="app/icon.svg" alt="JS" width="64" height="64" />
</p>

<h1 align="center">Johannes Schulz — Portfolio</h1>

<p align="center">
  <a href="https://www.johannesschulz.dev"><img src="https://img.shields.io/badge/site-johannesschulz.dev-64ffda?style=flat-square" alt="Live site" /></a>
  <a href="https://github.com/JohannesSchulz97/personal-website/actions/workflows/ci.yml"><img src="https://github.com/JohannesSchulz97/personal-website/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react" alt="React 19" />
</p>

> Freelance fullstack engineer portfolio — single-page site with a full-viewport hero, sticky two-column layout, rich project case studies, client testimonials, and an interactive structure-analysis demo.

Live at **[johannesschulz.dev](https://www.johannesschulz.dev)**. Deployed on Vercel with automatic rebuilds on push to `main`.

## Features

- **Mixed layout** — full-viewport hero (`contemplative.jpg`) followed by a sticky sidebar two-column section (fixed nav + scrollable content)
- **10 project case studies** — cards with results, tech badges, and narrative technical details rendered as markdown in a modal
- **Interactive demo** — embedded structure-analysis walkthrough with EN/DE report variants (`components/demos/structure-analysis.tsx`)
- **Testimonials system** — curated JSON archive, homepage preview, full archive page with Schema.org review markup, Formspree submission form
- **Scroll UX** — CSS scroll snapping with Lethargy-based mouse-wheel detection so trackpad and mouse behave differently
- **Dark theme** — custom navy/teal palette, Space Grotesk, cursor spotlight, Radix UI primitives

## Quick start

**Requirements:** Node.js 20+, npm

```bash
git clone git@github.com:JohannesSchulz97/personal-website.git
cd personal-website
npm install
npm run dev    # http://localhost:3000
```

Other scripts:

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next.js config) |

CI runs lint + build on every push and pull request to `main` (`.github/workflows/ci.yml`).

## Routes

| Path | Description |
|------|-------------|
| `/` | Main portfolio — About, Projects, Testimonials, Contact |
| `/testimonials` | Full testimonials archive with Schema.org markup |
| `/submit-testimonial` | Formspree submission form (reviewed before publishing) |
| `/projects` | Redirect → `/#projects` |
| `/contact` | Redirect → `/#contact` |

## Project structure

```
app/
  page.tsx                  # Homepage — hero, layout, scroll behavior
  layout.tsx                # Root layout, metadata, fonts
  testimonials/             # Full testimonials archive
  submit-testimonial/       # Formspree form
components/
  sections/                 # About-adjacent sections (projects, testimonials, contact)
  demos/                    # Interactive project demos
  ui/                       # Radix-based primitives (dialog, button, card, …)
lib/
  projectsData.ts           # All project content (source of truth)
data/
  testimonials.json         # Published testimonials
public/
  demos/structure-analysis/ # Demo assets (images + markdown reports)
docs/
  project-writing-workflow.md
  styling-logic.md
  market_positioning.md
```

## Content workflows

### Projects

All project copy lives in `lib/projectsData.ts`. Each entry includes title, description, badges, results, and multi-section `technicalDetails` (markdown paragraphs per section).

When adding or rewriting project content, follow `docs/project-writing-workflow.md` for narrative structure and `docs/styling-logic.md` for markdown formatting conventions (bold metrics, technical term styling, monospace for paths/commands).

### Testimonials

1. Client submits via `/submit-testimonial` → Formspree sends an email notification.
2. Review the submission, then add an entry to `data/testimonials.json` with the next available `id`.
3. Commit and push — Vercel rebuilds automatically.

Fields: `name`, `role`, `company`, `rating`, `testimonial`, `project`, `completionDate`, `linkedIn`.

> [!TIP]
> The homepage shows a preview of testimonials; the full archive lives at `/testimonials` with structured data for search engines.

## Layout & scroll behavior

**Hero** — full viewport height, layered overlays (base tint, vignette, left-to-right gradient). Collapses gracefully on mobile with social links inline.

**Two-column (desktop)** — sticky left sidebar (name, title, active-section nav, social icons) + scrollable right column. Mobile uses sticky section headers with backdrop blur instead of the sidebar nav.

**Scroll snapping** — sections use CSS `scroll-snap`. Lethargy detects non-inertial mouse-wheel events and temporarily adds a `using-mouse` class to disable snap + smooth scroll; the class is removed 500ms after the last wheel event so trackpad inertia keeps working.

## Tech stack

| Layer | Libraries |
|-------|-----------|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, `@tailwindcss/typography`, Space Grotesk |
| UI | Radix UI Dialog + Slot, lucide-react, class-variance-authority, tailwind-merge |
| Content | react-markdown, remark-gfm, remark-emoji |
| Scroll | Lethargy (trackpad vs. mouse momentum detection) |
| Forms | Formspree |
| Deployment | Vercel |

## Layout versions

The site has evolved through three layout commits. To preview an older version:

```bash
git checkout 5829373   # Mixed layout (current) — hero + two-column
git checkout 74d5200   # Pure two-column (sidebar from the start)
git checkout 3cc1f97   # Original single-column
git checkout main      # Return to latest
```

See `AGENTS.md` for agent-specific maintenance notes (testimonials workflow, layout switching).

## Deployment

Push to `main` → Vercel builds and deploys. No environment variables required for the static content site; Formspree form endpoint is configured in the submit-testimonial page component.
