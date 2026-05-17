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

## Projects Section Writing

When writing or updating project technical details in `components/sections/projects.tsx`:

**MUST follow workflow**: `docs/project-writing-workflow.md`

Key requirements:
- Research from both `../portfolio/projects/<name>.md` AND GitHub repo
- Narrative paragraphs, not bullet lists
- Technical terms woven into story (not required to understand, but valuable for experts)
- Show technical finesse (precise details, architectural decisions, edge cases solved)
- Increased spacing (space-y-6, leading-relaxed)
- Remove Results section from tech details (already in card summary)

# Project Overrides

