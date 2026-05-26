# Johannes Schulz - Portfolio

Personal portfolio website showcasing projects, testimonials, and professional experience.

## Features

- Single-page homepage with About, Projects, Testimonials, and Contact sections
- Project details modals backed by `lib/projectsData.ts`
- Testimonials from `data/testimonials.json` with Formspree submission flow
- Interactive demos under `/demos`
- Standalone `/skills` page and `/testimonials` archive

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui-style components

## Scripts

```bash
npm install
npm run dev      # local development
npm run build    # production build
npm run lint     # ESLint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Routes

| Path | Description |
|------|-------------|
| `/` | Main portfolio (canonical) |
| `/#projects`, `/#testimonials`, `/#contact` | Homepage sections |
| `/projects`, `/contact` | Redirect to homepage anchors |
| `/skills` | Extended skills page |
| `/testimonials` | Full testimonials list |
| `/submit-testimonial` | Formspree submission form |
| `/demos/*` | Interactive project demos |

## Testimonials

See [TESTIMONIALS.md](./TESTIMONIALS.md) for the approval workflow.

## Project Content

When updating project technical details, follow [docs/project-writing-workflow.md](./docs/project-writing-workflow.md). Source of truth for copy is `lib/projectsData.ts`.
