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

### 2. Impressive Facts (Bold White)
**When**: Important, impressive metrics and facts that deserve emphasis  
**Style**: `**text**` in markdown (renders as bold white)  
**Renders as**: `<strong class="font-bold text-white">text</strong>`

**Use for:**
- **Impressive numbers/metrics**: **€100k/month**, **9.5 TB**, **99.8% cost reduction**
- **Scale indicators**: **8,435 resources**, **19 developers**, **5 countries**
- **Key achievements**: **zero downtime**, **90%+ accuracy**
- **First introduction** of technical system with explanation: **LCM** (Lossless Claw)

**Don't use for:**
- Regular numbers (3 check-ins, 12ms)
- Common technical terms (use single asterisk)
- Every metric (only truly impressive ones)

### 3. Technical Terms (Bold Light Slate)
**When**: Technical terms, technologies, protocols, and technical concepts  
**Style**: `*text*` in markdown (renders as bold light slate, not italic)  
**Renders as**: `<em class="font-bold not-italic text-slate-light">text</em>`  
**Color**: `#a8b2d1` (slate-light)

**Use for:**
- Technology names: *GraphQL*, *PostgreSQL*, *Docker*, *React*
- Protocols: *REST*, *WebSocket*, *HTTP*
- Data formats: *JSON*, *YAML*, *CSV*
- Programming concepts: *async/await*, *lazy loading*, *dependency injection*
- Technical systems after first bold introduction: *LCM*, *QMD*

**Don't use for:**
- Product names: GitHub, Slack, OpenClaw (use plain text)
- File names or paths (use code style)
- Impressive metrics (use double asterisk)

### 4. Metric Badges
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

### 5. Visual Flow Arrows
**When**: Showing data/deployment flow between systems  
**Style**: `<span className="text-slate-lighter">A → B → C</span>`

**Use for:**
- Deployment pipelines: `dev machine → GitHub → self-hosted runner`
- Data flows: `API → transform → database`
- Processing stages: `extract → validate → load`

**Don't use for:**
- Comparisons (use "vs" or "over")
- Progressions in time (use "then")

### 6. Plain Text
**When**: Everything else  
**Style**: Regular paragraph text

**Use for:**
- Product/company names: OpenClaw, GitHub, Slack, Vercel, Palantir Foundry
- Model names: GPT-5.4, GLM-5, Claude Opus
- Regular numbers: 3 check-ins, 12 milliseconds, 202K context, 16 cores
- Features, descriptions, explanations
- All narrative content

## Summary Table

| Element | Style | Example |
|---------|-------|---------|
| Scripts/files | Code (teal) | `deploy.sh`, `~/.openclaw/` |
| Impressive facts/metrics | Bold White (**) | **€100k/month**, **9.5 TB** |
| Technical terms/technologies | Bold Light Slate (*) | *GraphQL*, *PostgreSQL*, *JSON* |
| Impressive metrics (legacy) | Badge | `19 developers`, `5 countries` |
| Regular numbers | Plain | 3 check-ins, 12ms |
| Product/company names | Plain | GitHub, Slack, OpenClaw |
| Flow between systems | Arrow | `dev → GitHub → runner` |
| Everything else | Plain | Regular paragraph text |

## 7. Project Icons

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
