# Project Technical Details Writing Workflow

## Process for writing project technical details sections

This workflow applies to:
- **New projects** being added to the portfolio
- **Existing projects** being rewritten for better narrative flow

### 1. Research Phase
- **Read portfolio markdown** (`../portfolio/projects/<project-name>.md`)
  - Extract: problem, solution, architecture, key decisions, challenges, outcomes
- **Read GitHub repository** (if accessible)
  - Key files: README.md, docs/, scripts/, .github/workflows/
  - Understand: deployment flow, architecture files, automation scripts
  - Look for: technical features not mentioned in portfolio

### 2. Structure
Replace bullet-point lists with **narrative flow** in 3-4 sections:

#### Section 1: The Challenge (2-3 paragraphs)
- Set context: what problem existed
- Why it mattered (business/technical impact)
- Constraints or existing state
- What was needed

#### Section 2: Technical Architecture (3-4 paragraphs)
- How the system works (high-level → specific)
- Key technical decisions woven into narrative
- Infrastructure/deployment details
- Technologies mentioned in context (not as list)

#### Section 3: Implementation Details (2-3 paragraphs) [optional]
- Specific features or capabilities
- Developer experience improvements
- Automation or workflow improvements

#### Section 4: Notable Technical Choices (2-3 paragraphs) [optional]
- Interesting edge cases solved
- Non-obvious design decisions
- Technical finesse demonstrated

### 3. Writing Guidelines

**CRITICAL PRINCIPLE: Document final state, not development journey**
- Explain HOW the system works (final architecture), not how it evolved
- No "I built X, then added Y, then improved Z" — describe final system only
- No "Initial approach failed, so I..." — show final solution that works
- No "We later migrated to..." — document current architecture
- **Exception**: Portfolio docs (`../portfolio/projects/*.md`) include Challenges section for journey/evolution; website cards show only final state

**VOICE & SENTENCE STRUCTURE** (based on Google/Microsoft/AWS style guides + portfolio best practices):
- **Active voice with clear subjects**: "The system maintains sessions" not "Sessions are maintained"
- **Complete sentences**: "The framework uses X" not "Uses X" (no missing subjects)
- **Mix first person + active third person**:
  - First person for ownership/design: "I built a framework that reverse-engineers..."
  - Active third person for how it works: "The extraction system uses binary split isolation..."
- **Why**: First person acceptable for personal portfolios (shows ownership). Active voice mandatory (Google/Microsoft/AWS all require it). Clear subjects prevent ambiguity.
- **Avoid passive voice**: "A response is sent" → "The server sends a response"
- **Avoid fragments**: "Maintains sessions, extracts tokens, bypasses UI" → "The system maintains sessions, extracts tokens, and bypasses the UI."

**Other guidelines:**
- **Remove Results section** from tech details (already in card summary)
- **Narrative paragraphs**, not bullets
- **Technical terms woven in** — for those who know them, not required to understand
- **Increased spacing**: `space-y-6` between sections, `leading-relaxed` for line height
- **Section headings**: text-base, font-semibold, mb-3
- **Explain as you go**: technical concepts explained inline when introduced
- **Show technical finesse**: don't just say what, explain why/how when it shows depth
- **Be precise**: use actual technology names, specific numbers, real constraints
- **Avoid excessive implementation detail**: No script names (`backup_pg.py`), function names (`pg_dump`), exact times (04:00 CET) unless critical to understanding. Focus on architecture and capabilities, not tools.
- **Split dense paragraphs**: If covering 3+ distinct topics in one paragraph, split it. Each paragraph should have clear focus.
- **Avoid redundancy**: If results mention "362 pipelines rebuilt", don't repeat same metric in technical details. Choose most impactful placement.

### 4. Results Writing
**Focus on achievements and outcomes, not just data:**
- Bad: "362 pipeline definitions captured, 204 repositories cloned"
- Good: "362 pipelines and 204 repositories rebuilt on self-hosted stack"
- Emphasize what was DONE with the data, not just that it was captured

**Avoid defensive phrasing:**
- Bad: "Server IP no longer directly reachable" (highlights it WAS reachable - negative)
- Good: "Zero-trust security via Cloudflare Tunnel" (positive architecture)
- Frame security as proactive design, not fixing vulnerabilities

**Provide context for specifics:**
- If mentioning one service among many, explain why (otherwise appears arbitrary)
- Technical details need enough context to be understood (e.g., "shared run queue" - shared between what?)

### 5. Technical Details to Include
- Infrastructure (where it runs, how it's deployed)
- Dev/prod separation
- CI/CD pipeline
- Key architectural patterns
- Important scripts/automation
- Memory/state management
- Integration points
- Security/safety measures
- Notable features (not in main summary)

### 6. Section Scope & Organization
**Section titles should match content breadth:**
- Bad: "Backup, Monitoring & Developer Platform" covering 5 different topics
- Good: Split into focused sections or rename to match actual scope

**Each paragraph needs clear focus:**
- If covering 3+ distinct topics, split into multiple paragraphs
- Each paragraph = one main idea with supporting details
- Dense paragraphs feel like bullet points

### 7. Styling & Formatting
**MUST follow**: `docs/styling-logic.md`

Consistent styling rules:
- **Code style**: scripts, paths, files (`deploy.sh`, `~/.openclaw/`)
- **Bold**: technical systems on first introduction with definition (**LCM**, **QMD**)
- **Metric badges**: only impressive numbers (`19 developers`, `5 countries`)
- **Flow arrows**: deployment/data flows (`dev → GitHub → runner`)
- **Plain text**: everything else (tech names, regular numbers, narrative)

**Project icons**:
- **If single representative icon exists**: add next to title in CardHeader (12x12 rounded)
- **If multiple icons (10+ tech stack)**: add to technical details section instead
- Icons in `/project-icons/` folder

Key principle: **Less is more.** Style guides attention, doesn't decorate every term.

### 8. What NOT to Include
- Generic "built using X" statements without context
- Repetition of results (already in card)
- Vague "implemented best practices"
- Bullet lists (convert to narrative)
- Overly academic explanations

### 9. Tone
- Technical but accessible
- Story-driven (problem → solution → outcome)
- Confident, not defensive
- Show don't tell ("built X that does Y" not "used advanced techniques")

## Example transformation

**Before** (bullets):
```
Multi-Agent Architecture:
- 19 dedicated Slack agents
- Persistent QMD vector memory
- GitHub Search API integration
- Manager agent monitors all
```

**After** (narrative):
```
I built a multi-agent platform where every developer gets a dedicated 
personal assistant living in their Slack DMs. Each agent maintains 
persistent memory using QMD (vector-backed storage enabling semantic 
search across past conversations) and knows its developer's GitHub 
username, working hours, and timezone.

A separate manager agent monitors all 19 developer agents from the 
#tech-management channel, watching for missed check-ins and producing 
status reports. Before each check-in, agents fetch recent GitHub 
activity using the Search API—commits, PRs, issues—so they can reference 
actual work.
```

## Quality Check
- [ ] Removed Results section from tech details
- [ ] No bullet lists (except where truly necessary)
- [ ] Spacing increased (space-y-6, leading-relaxed)
- [ ] Technical terms explained inline
- [ ] Flows as narrative, not spec
- [ ] Shows technical depth (not just what, but how/why)
- [ ] Accurate details from both portfolio and repo
- [ ] Readable by non-expert, valuable for expert

## 10. Final Review

**REQUIRED LAST STEP** before completion:

Read through the entire technical details section and check for:

### Redundancies
- Same information mentioned multiple times across sections
- Duplicate explanations of features or architecture
- Repeated technical details (e.g., mentioning setup twice)
- Overlapping context between sections

### Inconsistencies
- Contradictory information
- Different terminology for same concept
- Mismatched technical details
- Timeline or sequence errors

### Flow
- Logical progression from section to section
- Each section builds on previous without repetition
- Information appears in the most appropriate section
- Smooth transitions between topics

**Action**: Remove redundancies, fix inconsistencies, improve flow. Each detail should appear exactly once, in its most logical location.
