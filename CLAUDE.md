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

# Project Overrides

