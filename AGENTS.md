# Team Standards
@~/Projects/OriginalBody/tob-claude-setup/.claude/instructions/response-style-user.md
@~/Projects/OriginalBody/tob-claude-setup/.claude/instructions/conflict-handling.md

# Project-Specific

## Testimonials Workflow

When user receives testimonial submission via email from Formspree:

1. User provides submission data (name, role, company, rating, testimonial, project, completionDate, linkedIn)
2. Claude adds entry to `data/testimonials.json` with next available ID
3. Claude commits and pushes changes
4. Site rebuilds automatically on Vercel

See `TESTIMONIALS.md` for full system documentation.

# Layout Versions

## Available Layouts

### Mixed Layout (Current)
**Commit**: `5829373`  
Full-width hero section with contemplative.jpg background at top, followed by a sticky sidebar two-column layout below.

### Pure Two-Column Layout
**Commit**: `74d5200`  
Two-column layout from the start. Left sidebar sticky with name, title, nav links, and social icons. Right column scrollable with About, Projects, and Contact sections.

### Single Column Layout
**Commit**: `3cc1f97`  
Original one-column design with landscape background, About, Projects, and Contact sections stacked vertically.

## Switching Between Versions

```bash
# Switch to mixed layout (hero + two-column)
git checkout 5829373

# Switch to pure two-column layout
git checkout 74d5200

# Switch to single column layout
git checkout 3cc1f97

# Return to latest
git checkout main
```

# References

## Interesting Portfolio Sites

- [steventomlinson.dev](https://steventomlinson.dev/)

# Project Overrides

