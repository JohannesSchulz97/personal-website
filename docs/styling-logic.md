# Project Technical Details Styling Logic

## Consistent formatting rules for technical content

### 1. Code/Terminal Styling
**When**: Anything you'd type in code or see in a terminal  
**Style**: `<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">`

**Use for:**
- Script names: `deploy.sh`, `sync-agents.sh`, `create-agent.sh`
- File paths: `~/.openclaw/`, `/types/`, `memory/reports/`
- Config files: `work-schedule.json`, `openclaw.json`
- File extensions: `.txt`, `.md`, `.sh`
- Channel names: `#tech-management`, `#engineering`
- Technical identifiers: `sessionKey`, `agentId`

**Don't use for:**
- Technology names: LCM, QMD, GNU Stow (use plain text or bold)
- Model names: GPT-5.4, GLM-5 (use plain text)
- Company/product names: OpenClaw, GitHub, Slack (use plain text)

### 2. Bold Text
**When**: Technical systems/concepts being defined or introduced for the first time  
**Style**: `<strong>...</strong>`

**Use for:**
- **First introduction** of technical system with explanation:
  - **LCM** (Lossless Claw) manages session history...
  - **QMD** (vector-backed storage) provides semantic search...
- **Key architectural concepts** being defined in context

**After first introduction**: use plain text for subsequent mentions
- "Both are indexed by QMD" ← plain text
- "LCM compacts old turns" ← plain text

**Don't use for:**
- Emphasis or importance (not a highlighter)
- Technology names without definition
- Random emphasis throughout text

### 3. Metric Badges
**When**: Only truly impressive/key numbers that demonstrate scale or achievement  
**Style**: `<span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">`

**Use for:**
- Team/user scale: `19 developers`, `100+ users`, `5,000 customers`
- Geographic spread: `5 countries`, `12 timezones`
- Data volume (if impressive): `9.5 TB`, `1M+ records`
- Cost reduction (if impressive): `99.8% reduction`, `€1.2M saved`
- Performance (if impressive): `90%+ accuracy`, `<100ms latency`

**Threshold**: Would this number impress a technical hiring manager? If not, use plain text.

**Don't use for:**
- Regular numbers: 3 check-ins, 12 milliseconds, 202K context
- Version numbers: v2.0.1, Node 18
- Counts that aren't impressive: 40 files, 15 scripts
- Technical specs: 48 cores, 192 GB RAM (unless exceptional)

### 4. Visual Flow Arrows
**When**: Showing data/deployment flow between systems  
**Style**: `<span className="text-slate-lighter">A → B → C</span>`

**Use for:**
- Deployment pipelines: `dev machine → GitHub → self-hosted runner`
- Data flows: `API → transform → database`
- Processing stages: `extract → validate → load`

**Don't use for:**
- Comparisons (use "vs" or "over")
- Progressions in time (use "then")

### 5. Plain Text
**When**: Everything else  
**Style**: Regular paragraph text

**Use for:**
- Technology names (after introduction): LCM, QMD, GNU Stow, Docker, PostgreSQL
- Model names: GPT-5.4, GLM-5, Claude Opus
- Company/product names: OpenClaw, GitHub, Slack, Vercel
- Regular numbers: 3 check-ins, 12 milliseconds, 202K context, 16 cores
- Features, descriptions, explanations
- All narrative content

## Summary Table

| Element | Style | Example |
|---------|-------|---------|
| Scripts/files | Code | `deploy.sh`, `~/.openclaw/` |
| First technical intro | Bold | **LCM** (Lossless Claw) |
| Subsequent mentions | Plain | LCM compacts old turns |
| Impressive metrics | Badge | `19 developers`, `5 countries` |
| Regular numbers | Plain | 3 check-ins, 12ms |
| Tech names | Plain | GNU Stow, PostgreSQL |
| Flow between systems | Arrow | `dev → GitHub → runner` |
| Everything else | Plain | Regular paragraph text |

## 6. Project Icons

**Location**: `/project-icons/`

**Placement rules**:

### Single representative icon → Overview card
When project has one clear representative technology/platform:
- Place next to title in CardHeader
- Size: `w-12 h-12 rounded-lg flex-shrink-0`
- Layout: flexbox row with icon left, title/description right

```tsx
<CardHeader className="flex flex-row items-start gap-4">
  <img src="/project-icons/openclaw.jpeg" alt="OpenClaw" className="w-12 h-12 rounded-lg flex-shrink-0" />
  <div className="flex-1">
    <CardTitle>Project Name</CardTitle>
    <CardDescription>...</CardDescription>
  </div>
</CardHeader>
```

### Multiple icons (10+ tech stack) → Technical details
When project uses many technologies (self-hosted infrastructure with Dagster, Twenty, n8n, etc.):
- Add icon grid inside expanded technical details section
- Show all relevant technologies with labels
- Don't clutter overview card

```tsx
<div className="flex flex-wrap gap-3 my-4">
  <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
    <img src="/project-icons/dagster.jpeg" className="w-6 h-6 rounded" />
    <span className="text-xs">Dagster</span>
  </div>
  <!-- more icons -->
</div>
```

## Key Principle

**Less is more.** Styling should guide the eye to what matters, not decorate every technical term. When in doubt, use plain text.
