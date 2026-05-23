export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  badges: string[];
  results: string[];
  technicalDetails: {
    sections: Array<{
      icon: string;
      title: string;
      paragraphs: string[];
    }>;
  };
}

export const projects: Project[] = [
  {
    id: 'foundry',
    title: 'Enterprise Platform Migration',
    description: 'Decommissioned €100k/month Palantir Foundry enterprise platform and migrated 9.5 TB of production data with 8,435 resources to self-hosted infrastructure at €200/month — zero downtime, complete functionality preserved',
    image: '/project-icons/palantir2.jpg',
    badges: ['Playwright', 'PostgreSQL', 'Docker', 'Dagster', 'Cloudflare Zero Trust'],
    results: [
      '99.8% cost reduction: €100,000/month → €200/month',
      '9.5 TB migrated across 1,676 datasets with zero data loss',
      '362 pipeline definitions captured, 204 repositories cloned with full Git history',
      '6 production services running with zero downtime incidents over 6 months',
      'Zero non-idiomatic code merged to production after blocking hooks introduced',
      'Complete vendor de-risking from proprietary platform dependency',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'The company ran its entire data infrastructure on Palantir Foundry at **€100k/month** — unsustainable for a mid-sized business. The closed, proprietary ecosystem had no documented bulk export capability but held **8,435 resources** across 341 custom object types, **9.5 TB** across 2,320 datasets, 362 transformation pipelines, and 204 code repositories.',
            'The requirement: migrate everything to self-hosted infrastructure with zero downtime and complete data preservation. No official export API existed — the only way out was reverse engineering.',
          ],
        },
        {
          icon: '🔓',
          title: 'Reverse Engineering the Platform',
          paragraphs: [
            'I built a 5,045-line Python framework using **Playwright** to reverse-engineer Foundry\'s internal APIs. The approach: maintain authenticated browser sessions, intercept network traffic to discover undocumented GraphQL and REST endpoints, extract Bearer tokens from the traffic, then use those tokens for programmatic API access that bypasses the UI entirely.',
            'Twelve specialized scripts handled different extraction tasks — lineage discovery (building dependency graphs via GraphQL interception), pipeline extraction (JSON exports ranging from 43 KB to 4.2 MB per pipeline), dataset streaming with PostgreSQL, repository cloning with Git automation, and binary media downloads. Each script followed the same patterns: persistent browser sessions for auth, batched API calls to avoid rate limits, idempotent design for interruption recovery.',
            'The extraction system included binary split error isolation 🔍: when a 1,000-row batch failed, it would automatically narrow down to the single problematic row without manual intervention. Primary key tracking enabled multi-day extractions to resume from checkpoint on failure. All 12 scripts ran on the target Hetzner server via tmux — multi-day extractions couldn\'t block a local terminal.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Infrastructure Rebuild',
          paragraphs: [
            'Replaced the €100k/month SaaS with a single Hetzner CCX63 server: 48-core AMD EPYC, 192 GB RAM, 960 GB NVMe, 1 Gbit/s network — **€200/month**. Deployed 6 production services from scratch: Dagster (pipeline orchestration), Twenty (CRM), Coder (remote dev workspaces), n8n (workflow automation), SurfSense (AI research), LangGraph (agent orchestration).',
            'Each service got its own PostgreSQL instance — isolated resource limits, independent backup schedules, no connection pool contention. Security hardened 🔒: all database ports bound to localhost only, SSH key-only auth, UFW firewall (ports 22/80/443 only), automated SSL via Certbot. Nginx reverse proxy handled SSL termination and WebSocket support for Dagster UI.',
            'Cloudflare Zero Trust provided email-based authentication for `*.tob.sh` wildcard — no client VPN setup required, complete audit logs included. CI/CD pipeline: GitHub Actions builds Docker images on push, Watchtower auto-deploys to server within **7 minutes** ⚡.',
          ],
        },
        {
          icon: '🧠',
          title: 'Developer Platform',
          paragraphs: [
            'Built a Dagster orchestration platform with blocking hook enforcement (same pattern as CS Automation project). PreToolUse hook intercepts file operations on the `pipelines/` directory — first access per session is blocked until `SKILL.md` is read, then every 5th access gets blocked for periodic reminder. Result: impossible to modify pipeline code without understanding Dagster conventions.',
            'Created 40+ reference guides covering asset patterns, automation (schedules, sensors, declarative conditions), CLI operations, and 40+ tool integrations. Dual dev/prod environments: `main` branch deploys to production database, `dev` branch deploys to isolated dev database with no production credentials. Shared run queue (max 4 concurrent) prevents resource exhaustion.',
            'The team autonomously rebuilt 362 pipelines using the extracted Foundry JSON references as rebuild specs. Schema translation: 341 Foundry object types → 305 production PostgreSQL tables with 291 foreign key relationships preserved. Generated 6,338 lines of DDL, 876 lines of FK constraints, 4,808 total columns. Automated type mapping handled `ARRAY`/`GEOHASH`/`MEDIA_REFERENCE`/`VECTOR` → PostgreSQL equivalents.',
          ],
        },
      ],
    },
  },
  {
    id: 'biomech',
    title: 'Biomechanical Structure Analysis',
    description: 'Production-grade biomechanical posture analysis system combining computer vision pipeline (MediaPipe, BiRefNet) with visual LLM orchestration tool — deployed to clinical workflow processing 40+ patient assessments daily',
    badges: ['MediaPipe', 'BiRefNet', 'Gemini API', 'React Flow', 'Palantir Foundry'],
    results: [
      'Assessment time: 30 minutes → 3 minutes (90% reduction)',
      '90%+ accuracy in posture deviation detection vs expert coaches',
      '100% GDPR compliance with privacy-preserving blur layers',
      'Visual orchestration eliminated 95%+ pipeline configuration errors',
      'Non-technical coaches customize analysis workflows via DAG editor',
      '150+ clinical assessments processed with zero pipeline failures',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Fitness/biomechanics company needed to scale expert posture analysis beyond limited coach capacity. Manual biomechanical assessments took **30 minutes** per patient and required deep anatomical expertise — coaches analyzed patient photos, identified postural deviations through bottom-up kinetic chain methodology (ankle → knee → hip → pelvis → thorax → cervical), determined root causes, and prescribed corrective exercises.',
            'As the LLM analysis stage grew in complexity (10+ specialized biomechanical analysis agents — Ankle-Knee, Pelvis Tilt, Lumbar, Thorax, Kinetic Breaks), manual orchestration became error-prone. Non-technical coaches couldn\'t customize analysis workflows or understand multi-agent dependencies. Privacy regulations (GDPR) required face/background anonymization on all stored images.',
            'Needed: automated pipeline matching coach-level quality, GDPR-compliant privacy layers, and a visual tool for coaches to design custom LLM analysis workflows without touching Python.',
          ],
        },
        {
          icon: '🔬',
          title: 'Computer Vision Pipeline',
          paragraphs: [
            'Built multi-stage Python pipeline deployed to Palantir Foundry as a production Transform. Stage 1: **MediaPipe Pose** detects 33 anatomical landmarks (nose, shoulders, elbows, wrists, hips, knees, ankles, etc.) with confidence scoring per landmark. Configuration: `model_complexity=2` (heavy model, most accurate) for production quality. Outputs coordinate system (X/Y pixel position, Z depth relative to pelvis, visibility 0-1) enabling precise angle measurements — shoulder angle via arctan, pelvic tilt via horizontal reference, knee valgus in frontal plane.',
            'Stage 2: **BiRefNet** (Hugging Face portrait segmentation model) generates binary mask separating patient from background. Chosen over Mask R-CNN (better edge quality) and SAM (faster). Stage 3: Privacy layers — background Gaussian blur (radius=50px, irreversible via deconvolution per legal audit), face blur using MediaPipe FaceMesh landmarks with 1.5× padding. Two-stage blur with different kernels prevents single deblur attack. Legal team confirmed GDPR compliance: **100%** compliant, zero privacy incidents over 4 months production.',
            'Pure function architecture: all processing functions accept bytes, return bytes/dicts (no file I/O). Metadata accumulation pattern — properties dict passed through pipeline stages (`validate_image → standardize_image → detect_landmarks → calculate_measurements`). Dual segmentation modes: IS-Net for speed (~50ms), BiRefNet for accuracy (~1-2s), configurable per deployment. Final output: multi-page TIFF with layered data (original, blur, annotations) in single file.',
          ],
        },
        {
          icon: '🧠',
          title: 'Visual LLM Orchestration',
          paragraphs: [
            'Stage 4 (LLM analysis) grew complex enough that manual prompt chaining became error-prone. Built standalone HTML application (**85.6 KB** single file) with visual DAG editor for designing multi-stage LLM agent pipelines. Node-based architecture where each node represents a specialized biomechanical analysis agent — **10 pre-configured nodes**: Ankle-Knee (lower limb), Knee-Hip (mid-limb kinetic chain), Pelvis Tilt & Translation, Lumbar (lordosis/kyphosis), Thorax (thoracic kyphosis), Trunk Pressure Distribution, Cervical-Head (neck/jaw positioning), Shoulder-Arm Rotation, Kinetic Breaks (compensation pattern detection), Spannungsdreieck (integration node synthesizing tension triangle).',
            'Custom SVG rendering engine implements graph algorithms: **BFS** for real-time cycle detection (prevents users from creating invalid pipelines), **DFS** for dependency traversal, **topological sort** (Kahn\'s algorithm) for execution ordering and layer-based layout. Zero build step deployment — React 18 + Babel Standalone loaded from CDN, JSX transpilation in browser, no Node.js/webpack required.',
            'Dependency resolution ensures nodes execute in correct order: build adjacency list from edges, count in-degrees, start with zero-dependency nodes, process queue while decrementing in-degrees. If sorted length < nodes length, cycle detected. Connection validation rejects edges where cycle would form — visual feedback immediate, no execution-time errors. Each node declares input/output schema; connections validated for type compatibility.',
            'React Flow foundation handles zoom/pan/selection/edge routing — custom node components encode domain expertise. Example: Biomechanical Interpretation node exposes configuration (analysis depth: basic/detailed/comprehensive, output language: German/English) without exposing prompt engineering. Non-technical coaches create custom pipelines after **30-minute** training — **8 reusable templates** created (Full Assessment, Quick Screen, Exercise Focus).',
          ],
        },
        {
          icon: '⚙️',
          title: 'Production Integration',
          paragraphs: [
            'Foundry Transform integration: patient photos uploaded to Media Set via WordPress form trigger pipeline execution. CV pipeline (`mediapipe_pose → birefnet_segment → apply_privacy_layers`) generates landmarks and privacy-preserved images. LLM orchestration tool outputs analysis configuration (which agents, what order, dependencies). Gemini API performs multi-modal analysis (landmarks JSON + privacy image) following bottom-up kinetic chain methodology.',
            'Output: structured German-language report with deviation summary table, root cause identification (e.g., "tight hip flexors causing anterior pelvic tilt" vs secondary compensations "resulting thoracic kyphosis"), and corrective exercise plan (3-5 exercises with sets/reps/notes). Performance: initial pipeline **8-12 minutes** → optimized to **2.5-3.5 minutes** via GPU acceleration (MediaPipe), model quantization (BiRefNet), batch API (Gemini), media caching (Foundry).',
            'Edge case handling: MediaPipe fails on extreme postures (severe scoliosis) → graceful degradation with manual annotation workflow. Multiple people in photo → BiRefNet pre-filter keeps only largest segment, intake workflow updated to request re-photo if multiple detected. German output quality initially mixed → explicit prompt instruction + few-shot examples + post-processing validation (reject if >5% English words).',
          ],
        },
      ],
    },
  },
  {
    id: 'infrastructure',
    title: 'Self-Hosted Production Infrastructure',
    description: 'Git-driven deployment platform running ~10 production services for ~5 developers on a single Hetzner dedicated server — replacing enterprise SaaS with fully owned infrastructure featuring automated deployments, multi-service orchestration, and comprehensive backup strategy',
    badges: ['Docker', 'GitHub Actions', 'Watchtower', 'PostgreSQL', 'Nginx', 'BorgBackup'],
    results: [
      '~5 developers deploying without SSH access via automated pipeline',
      '10 production services running with automatic SSL renewal',
      'Daily automated backups with local + off-site redundancy',
      'Complete infrastructure reproducible from single Git repository',
      'Zero manual deployment steps — sub-7-minute push-to-live cycle',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Post-Foundry migration, the company needed a production-grade platform to run everything: data orchestration, workflow automation, CRM, AI pipelines, development environments. Everything had to be secure, maintainable, cost-effective, and built from scratch — no pre-existing infrastructure.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Zero-SSH Deployment',
          paragraphs: [
            'Built a fully automated deployment pipeline: developer push → GitHub Actions → GHCR → Watchtower. Watchtower polls the GitHub Container Registry every 5 minutes, detects new image digests, pulls updated images, and recreates containers automatically. Developers deploy without SSH access — just `git push`.',
            'The `tob-infra` repository is the single source of truth: Docker Compose stacks, nginx configs, systemd units, backup scripts, cron schedules, and a 470+ line runbook documenting every infrastructure decision. Complete infrastructure reproducibility from one Git repository.',
          ],
        },
        {
          icon: '⚙️',
          title: 'Production Stack',
          paragraphs: [
            'Single Hetzner dedicated server (16-core AMD EPYC, 64 GB RAM, 338 GB SSD, **€200/month**) running **10 services** for **~5 developers**. Seven isolated PostgreSQL instances (one per service) — independent backups, no connection pool contention. All database ports bound to `127.0.0.1` only 🔒.',
            'Services: Dagster (data orchestration), Twenty CRM, n8n (workflow automation), Coder (remote dev workspaces), Oracle/SurfSense (AI research), Listmonk (email campaigns), Beszel (monitoring), plus LangGraph and other internal tools.',
            'Nginx reverse proxy handles SSL termination with Let\'s Encrypt auto-renewal, WebSocket upgrades for Twenty/n8n/Coder, bearer token auth for LangGraph, and multi-location routing for Oracle (frontend/backend split). Cloudflare Zero Trust provides email-based authentication for `*.tob.sh` wildcard — no VPN client setup, complete audit logs.',
          ],
        },
        {
          icon: '💾',
          title: 'Backup Architecture',
          paragraphs: [
            'Auto-discovery backup system: `pg_isready` scans for running PostgreSQL containers, auto-initializes Borg repositories. Daily 04:00 CET, `backup_pg.py` runs `pg_dump`/`pg_dumpall` per service, then BorgBackup streams to Hetzner Storage Box (10 TB co-located) with zstd,3 compression, encryption, and 10 MB/s rate limiting.',
            'Off-site backup: `pg_dump` streams directly to Cloudflare R2 via S3 multipart upload (64 MB parts) — no temp files on disk. All Docker containers log to systemd-journald (searchable, 2 GB / 90-day retention). Daily 04:30 CET, `backup_configs.py` collects all Docker Compose files, `.env` files, and configs from `/opt/` and backs them to the Storage Box.',
          ],
        },
        {
          icon: '✨',
          title: 'Developer Experience',
          paragraphs: [
            'Dagster dual-environment: `main` branch deploys to production database, `dev` branch to isolated dev database with no production credentials. Coder provides remote workspaces at `*.coder.tob.sh` (browser/SSH-accessible, no local setup required). Cross-stack Docker networking via shared networks lets services communicate across separate Compose stacks. Beszel monitoring provides lightweight server metrics with Docker container visibility via Unix socket.',
          ],
        },
      ],
    },
  },
  {
    id: 'openclaw',
    title: 'OpenClaw Agents',
    description: '19 dedicated Slack agents for distributed engineering team across 5 countries, each with persistent vector memory, GitHub activity context, and timezone-aware scheduled check-ins',
    image: '/project-icons/openclaw.jpeg',
    badges: ['OpenClaw', 'OpenAI Codex', 'QMD Vector Memory', 'GitHub API', 'GNU Stow'],
    results: [
      '19 autonomous dev agents with persistent memory across Germany and Georgia teams',
      'Manager agent auto-detects bottlenecks and reports team status',
      'Single-command provisioning for new agent deployment',
      'GitHub activity context integration for code-aware assistance',
      'Timezone-aware scheduled check-ins for distributed coordination',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'A distributed engineering team (**19 developers** across **5 countries**) used Slack for all communication but had no structured way to track daily work, surface blockers before they became problems, or give the tech lead visibility without micromanaging. No AI platform existed yet.',
            'Every developer needed a proactive assistant that understood their context: what they worked on yesterday, their GitHub activity, timezone differences, and actual working hours. The platform had to deploy automatically from GitHub without SSH access, with strict separation between development and production environments.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Infrastructure & Deployment',
          paragraphs: [
            'I set up OpenClaw on a Mac mini in Switzerland and built a one-way deployment pipeline: dev machine → GitHub → self-hosted Actions runner. Push to main triggers `deploy.sh`, which pulls latest code, validates architectural invariants, syncs agent type files via `sync-agents.sh`, deploys configuration using GNU Stow (symlinks from repo into `~/.openclaw/`), reconciles cron jobs declaratively with `apply-cron.sh`, and restarts the gateway if needed.',
            'The host has git hooks preventing commits and branch switches—it always tracks main 🔒. Agent files (personality, operating manual, scripts) live in `types/` and get copied to each agent\'s workspace. Runtime state (conversations, memory, credentials) never touches GitHub. This separation ensures credentials stay on-host, conversation privacy is preserved, and the repo remains the single source of truth for configuration.',
            'Adding a new developer takes one command: `create-agent.sh` generates the directory structure, substitutes templates (agent identity, user info), registers Slack bindings, adds to the allowlist, creates placeholder cron entries, and deploys via stow 🔄. The inverse `remove-agent.sh` cleans everything declaratively with flock-based locking to prevent race conditions (discovered when 3 simultaneous agent creations generated duplicate cron jobs within 12 milliseconds).',
          ],
        },
        {
          icon: '🧠',
          title: 'Multi-Agent Architecture',
          paragraphs: [
            'Each developer gets a dedicated assistant living in their Slack DMs. Agents maintain two-layer memory 💾: **LCM** (Lossless Claw) manages session history via DAG-based summarization to prevent context window overflow, while **QMD** (vector-backed storage) provides semantic search across persistent markdown files written by daily cron jobs. Every evening, `work-report.sh` fetches GitHub activity via Search API (not Events API, which misses private repos) and writes `memory/reports/YYYY-MM-DD.md`. Every morning, `daily-summary.sh` distills yesterday\'s DM conversations into `memory/YYYY-MM-DD.md`. Both are indexed by QMD, giving agents long-term recall across sessions.',
            'Three daily check-ins ⏰ (morning planning, midday progress, evening recap) are timed to each developer\'s work schedule. Before sending, `availability-guard.sh` checks for time-off entries and working-day patterns. GitHub activity is included in check-in context so agents reference actual work. Friday evening uses "carry over to next week" phrasing; Monday morning references "last week."',
            'A manager agent monitors all 19 developer agents from `#tech-management` 👁️. It runs hourly checks for bottlenecks (agents stuck in loops, 3+ missed check-ins) and produces morning/evening status reports. Agents run GPT-5.4 (Codex) for both cron and interactive modes—unified model eliminates personality drift. GLM-5 (202K context) via Fireworks is registered as fallback.',
          ],
        },
        {
          icon: '✨',
          title: 'Developer Experience',
          paragraphs: [
            'Bootstrap happens on first contact. The agent introduces itself, collects preferred name and communication style, asks about working hours/timezone/weekend availability, writes `work-schedule.json`, creates the three cron jobs, and marks completion with `.BOOTSTRAP.md.done` (deletion would cause stow to recreate the file). From that point forward, all check-ins respect the developer\'s actual schedule—no 3 AM messages for someone in a different timezone.',
            'Agents can generate images via Gemini Nano Banana API (`generate-image.sh`), create GitHub issues with duplicate detection (`create-issue.sh` searches open issues before creating), and comment on existing issues. Zoom transcript delivery 🎙️ is opt-in: developers run `enable-twenty-zoom-transcripts.sh`, and when Twenty CRM receives a Zoom webhook, OpenClaw\'s hook transform routes the transcript to the developer\'s DM as a `.txt` attachment.',
          ],
        },
      ],
    },
  },
  {
    id: 'customer-support',
    title: 'Customer Support Automation',
    description: 'Production-grade customer support automation combining n8n workflow orchestration, 6 specialized AI agents, and Palantir Foundry integration to deliver coach-level support with deep customer context and expert knowledge retrieval',
    image: '/project-icons/n8n-icon.webp',
    badges: ['n8n', 'Gemini API', 'Palantir Foundry', 'LangChain', 'ChromaDB', 'Slack API'],
    results: [
      '1 week framework setup → 2 months junior team expansion (13x growth in Action Handler)',
      'Zero AI hallucination incidents (hook system prevented configuration errors)',
      'Coach-level responses with customer biomechanics, training history, and expert knowledge',
      'Complete Slack-native helpdesk with live queues, voice replies, and automated media pipelines',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'A fitness/biomechanics company needed to automate customer support while maintaining the personalized, expert-level quality of human coaches. Support agents had no quick access to customer context — biomechanical analysis reports, session history, billing data, expert coaching knowledge — and had to manually switch between systems. The automation also needed to be maintainable by junior developers using AI assistance, without introducing AI hallucination risks or configuration errors.',
          ],
        },
        {
          icon: '🛡️',
          title: 'Framework Innovation',
          paragraphs: [
            'Built a developer framework with smart blocking hooks to prevent AI hallucinations. **PreToolUse hook** intercepts n8n API calls — first access per session is blocked until documentation is read, then every 5th call gets blocked for periodic reminder (combats context drift). Reading the docs resets the counter to zero. Result: impossible to modify workflow code without understanding n8n conventions.',
            'Created 6 comprehensive n8n skill modules covering webhooks, workflow patterns, data tables, HTTP authentication, error handling, and tool integrations. Cloudflare Access Patch: Node.js preload script transparently injects Zero Trust auth headers for Foundry API calls. Junior developers built complex workflows with AI assistance — zero hallucination incidents due to framework guardrails.',
          ],
        },
        {
          icon: '🤖',
          title: 'Multi-Agent Architecture',
          paragraphs: [
            'Six specialized Gemini 2.0 Flash agents, each with domain-specific Palantir Foundry OSDK tool access: **Tech** (app/login issues + biomechanical data), **Coaching** (training/exercises + RAG through GBs of Zoom coaching transcripts), **Billing** (invoices from Foundry + Bexio PDF fetching), **Events** (appointments/registration), **Summit** (summit logistics), **General** (catch-all with knowledge base access).',
            'Incoming tickets flow through `CS: Smart Ticket Classifier` (89 nodes) — Gemini classification determines category, then routes to `CS: Request Analyzer` (69 nodes) where the appropriate agent generates a structured proposal. Foundry OSDK provides 20+ integrations: biomechanical analysis, session history, invoices, past tickets. Zod schema validation ensures reliable, parseable outputs with `confidence` scoring (low/medium/high).',
          ],
        },
        {
          icon: '📊',
          title: 'Production Scale',
          paragraphs: [
            '16 active workflows, 601+ nodes. Core workflows: Smart Ticket Classifier (duplicate detection, DNC enforcement, AI classification), Request Analyzer (multi-agent analysis), Action Handler (172 nodes — 13x expansion from 13-node MVP, handles all Slack interactive buttons). Bidirectional Slack sync — full helpdesk in Slack, agents never need to open FluentSupport UI.',
            'Race condition prevention: Early lock + Wait node pattern handles concurrent ticket submissions. Async webhook resume: Zoom→Vimeo pipeline suspends execution via n8n Wait node, resumes when Vimeo transcoding completes. Live-updating agent queues: Pinned Slack messages + DM lists continuously rebuilt as tickets arrive. Voice reply support: Audio transcription enables mobile-first workflows. Invoice PDF automation: Billing agent fetches PDFs from Bexio, uploads directly to Slack thread.',
          ],
        },
      ],
    },
  },
  {
    id: 'caps',
    title: 'CAPS',
    description: 'Claude Automated Programming System (CAPS) — enterprise-scale AI development platform enabling production applications through natural language, combining frozen specifications, multi-agent builds in git worktrees, and self-improving feedback loops',
    badges: ['Cloudflare Workers', 'React Server Components', 'Git Worktrees', 'Multi-Agent AI'],
    results: [
      'Eliminated scope creep: 0 mid-sprint requirement changes after DESIGN.md freezing (previously 3-5 per sprint)',
      '15+ projects built using CAPS framework',
      '40+ upstream improvements contributed back to template',
      '70%+ test coverage enforced via CI gates',
      'Sub-10ms global latency via Cloudflare Workers edge deployment',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'AI-assisted development produces "vibe coding"—unstructured workflows causing scope creep and technical debt. Teams need disciplined scrum cycles with AI orchestration. Without frozen specifications, AI-assisted builds drift mid-sprint as requirements change conversationally. No existing system connects conversational design → structured planning → autonomous implementation → self-improvement.',
            'Goal: eliminate scope creep through frozen PRD enforcement, automate complete scrum cycles from design to deployment, enable parallel autonomous builds with git worktree isolation, create self-improving system where every project makes CAPS better for all users.',
          ],
        },
        {
          icon: '🔄',
          title: 'Scrum Cycle Automation',
          paragraphs: [
            'Built self-improving AI orchestration system enforcing scrum discipline through four core slash commands. `/design`: Socratic questioning produces frozen PRD—specialized design agent asks probing questions, iterative refinement, captures problem statement/user personas/core features/technical constraints/success metrics, outputs frozen `DESIGN.md` preventing scope creep, extracts template variables for initialization.',
            '`/breakdown`: INVEST-compliant issue generation—parses `DESIGN.md` into discrete deliverables, applies INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable), generates acceptance criteria per issue, creates GitHub Issues via API with labels and milestones. Once `/breakdown` runs, PRD is locked. Changes require explicit `/design` re-run and new `/breakdown`, making cost of scope changes visible.',
            '`/retro`: Upstream improvement feedback—reviews sprint completion (what worked, what friction occurred), identifies CAPS-specific issues (not project bugs), creates issues in CAPS template repository via GitHub API, tags with improvement category (documentation/workflow/pattern/tooling). Classification step separates project bugs (stay local) from CAPS workflow issues (go upstream), reduced upstream noise by 80%.',
            '`/update`: Template sync—pulls latest improvements from CAPS upstream, updates `CLAUDE.md`/skills/workflows, runs automatically on session start, preserves project-specific customizations via merge strategy. Feedback loop is the product: every `/retro` that generates upstream issue makes CAPS better for all future projects. This compounds—later projects have richer documentation and fewer workflow issues than earlier ones.',
          ],
        },
        {
          icon: '🛠️',
          title: 'Multi-Agent Build System',
          paragraphs: [
            '`/build`: Multi-agent autonomous implementation. **PLANNER** reads issue, creates step-by-step implementation plan, identifies files to modify, forced to read encoded domain knowledge (RedwoodSDK routing rules, D1 migration syntax, Cloudflare Workers limitations) before creating plan. **CODER** creates git worktree, implements feature following plan, writes tests. **QA** runs test suite, validates against acceptance criteria, checks 70%+ coverage threshold. **FIXER** if tests fail, analyzes errors, applies fixes, re-runs validation. **MERGE** reviews diff, ensures no unintended changes, merges worktree to main, cleans up.',
            '**Git worktree isolation**: multiple features built in parallel without branch conflicts, clean file tree per feature (no stashing/switching needed), atomic feature validation before merge, easy rollback (delete worktree, no main branch pollution). Worktrees provide true isolation—branches = pointer moves, worktrees = separate directories. Automatic cleanup: MERGE agent removes worktree after successful merge, FIXER agent removes after too many failed attempts, `/cleanup` command scans for orphaned worktrees.',
            'Structured handoff protocol: each agent writes `HANDOFF.md` in worktree with status, files modified, next steps. Subsequent agents read this before starting. Prevents agents from overwriting each other\'s work or missing context. Specialized agents reduce hallucination (narrower context per agent), enforce quality gates (tests must pass), enable autonomous builds without constant supervision.',
            'Encoded domain knowledge prevents AI hallucinations—AI agents frequently hallucinated RedwoodSDK syntax (wrong import paths, invalid route patterns, D1 migration errors). Fixed by encoding patterns in CAPS skills. PLANNER forced to read these before creating implementation plan.',
          ],
        },
        {
          icon: '✨',
          title: 'Production Deployment',
          paragraphs: [
            'Deployed to **Cloudflare Workers** edge platform—zero cold starts, global distribution, sub-10ms latency, integrated D1 SQL. **React 19 Server Components**: streaming SSR, server-first rendering reduces client bundle, built-in async components. RedwoodSDK provides Workers-native routing, D1 migrations, type-safe environment, zero-config deployment.',
            'CI/CD pipeline: GitHub push → GitHub Actions → build React app → run tests (requires 70%+ coverage) → deploy to Cloudflare Workers (preview, staging, production) → D1 migration execution → Cloudflare Zero Trust security. Preview: per-branch automatic deployment. Staging: pre-production validation. Production: edge deployment across 300+ global PoPs.',
            'Repository structure: `apps/web/` (React Server Components app with file-based routes, components, business logic), `workers/api/` (edge API workers), `db/` (D1 database schema, versioned migrations), `DESIGN.md` (frozen PRD created by `/design`), `CLAUDE.md` (project instructions), `.github/workflows/deploy.yml` (CI/CD pipeline).',
            '15+ projects built using CAPS framework, 40+ upstream improvements contributed back to template. Autonomous builds: `/build` completes features end-to-end without human intervention (except approval). Self-improvement validated: projects using CAPS contributed D1 pattern docs, RedwoodSDK routing fixes, git worktree cleanup automation. Developer confidence: frozen specs reduce anxiety about shifting requirements. Quality consistency: multi-agent gates prevent untested or incomplete code from merging.',
          ],
        },
      ],
    },
  },
  {
    id: 'vet-assistant',
    title: 'Veterinary Knowledge Assistant',
    description: 'RAG-powered clinical reference system embedded in Haven shelter management app — instant access to veterinary literature with split-panel PDF viewer, chunk-level highlighting, and precise source citations',
    badges: ['Firebase', 'Supabase pgvector', 'Voyage AI', 'Cohere Rerank', 'React'],
    results: [
      'Hybrid search (BM25 + vector) + Cohere reranking + sibling chunk boosting',
      '3,000+ Merck Veterinary Manual articles + vet textbooks indexed',
      'Split-panel PDF viewer with cross-page text highlighting',
      '614-line evaluation framework with golden dataset for regression testing',
      'PR open, pending final review and merge',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Shelter staff and vets needed quick answers to clinical questions—symptoms, treatments, dosages—without manually searching through large veterinary textbooks or the Merck Veterinary Manual. Generic AI assistants hallucinate veterinary facts and provide no source traceability. The shelter already ran Haven (an internal shelter management app on Firebase) and needed an embedded knowledge assistant, not a separate tool.',
            'Requirement: RAG chat interface over veterinary literature directly within Haven, with precise source citations and chunk-level highlighting in a PDF viewer. Conversation persistence across sessions. Accurate retrieval—minimize hallucination through strong retrieval + reranking.',
          ],
        },
        {
          icon: '🏗️',
          title: 'RAG Pipeline Architecture',
          paragraphs: [
            'Built as self-contained module (`dr-paw/`) within Haven monorepo. RAG backend runs as Firebase Cloud Function (`functions/api.ts`, 912 lines). Knowledge stored in Supabase with **pgvector** for vector search and separate BM25/FTS index for **hybrid retrieval**—both vector and full-text search in one database, eliminating external dependencies like Pinecone.',
            'Pipeline flow: user query → Voyage AI embedding → Supabase hybrid search (BM25 + vector with RRF fusion) → sibling chunk boosting (±1 neighboring chunks added) → Cohere Rerank API (cross-encoder scoring) → dynamic token budget trimming → OpenAI GPT-4o streaming with injected chunks + citation instruction → response with numbered [1], [2] citation markers.',
            'Evaluated embedding models on veterinary text—settled on **Voyage AI** (`voyage-3`) over OpenAI embeddings for better domain performance. **Sibling chunk boosting** adds neighboring chunks after retrieval to restore context lost at chunk boundaries without permanently increasing chunk size (which hurts precision). Best of both: small precise chunks for retrieval, expanded context for generation.',
            'Knowledge sources 📚: vet book PDFs uploaded to Firebase Storage → extracted by custom TypeScript extractor (`pdfExtractor.ts`, 1,790 lines) → chunked → embedded → stored in Supabase. **3,000+ Merck Veterinary Manual articles** scraped via separate WebScraper repo (Playwright + BeautifulSoup), embedded into same Supabase store. Custom extractor needed to preserve page number metadata, handle multi-column layouts, associate chunks with exact page ranges for PDF viewer highlighting.',
          ],
        },
        {
          icon: '📄',
          title: 'Split-Panel PDF Viewer',
          paragraphs: [
            'React frontend (`VetBot.tsx`) with split-panel layout: chat left, PDF viewer right. Source citations appear as numbered badges in response; clicking one opens PDF to correct page with matched chunk highlighted. Built with react-pdf (wojtekmaj)—best React integration, handles large PDFs page-by-page.',
            'Hardest problem: text highlighting across page boundaries 🎨. PDF chunks sometimes span two pages. react-pdf renders pages independently—no DOM element spans page boundaries. Solved by splitting chunk highlights into per-page segments, applying each independently. Tracked in research doc `pdf-viewer-text-highlighting-2026-02-09.md`.',
            'PDF viewer components: `PDFDocument.tsx` (568 lines — page rendering, chunk highlighting, cross-page support), `PDFViewerPanel.tsx` (256 lines — panel layout, scroll-to-page), `PDFControls.tsx` (126 lines — zoom, navigation), `usePDFState.ts` (107 lines — state management). Fixed page position lost on window resize by re-scrolling to target page after resize events. Fixed slow PDF open by preloading blob when citation clicked rather than waiting for panel open.',
            'Conversation persistence via Firestore. Two retrieval modes: first message injects all top chunks directly into context; follow-up messages use `searchVetKnowledge` tool triggered automatically when bot detects topic change (smart context switching). Debug panel (`DebugPanel.tsx`, 228 lines) added to inspect retrieval results during development.',
          ],
        },
        {
          icon: '✨',
          title: 'Production Quality',
          paragraphs: [
            'RAG evaluation framework (`evalRag.ts`, **614 lines**) with golden dataset of Q&A pairs and expected sources. Measures context recall, context precision, faithfulness (LLM-as-judge), citation accuracy. Results stored for historical comparison. Made pipeline tuning quantitative rather than impressionistic—built early in development cycle.',
            'Hybrid search (BM25 + vector) consistently outperformed pure vector search on domain-specific text. **Cross-encoder reranking** via Cohere Rerank API was highest-leverage improvement—no GPU needed in Firebase Functions, production-quality reranking without infra overhead. Small candidate set reranked well beats large candidate set from pure embedding similarity.',
            'Fixed duplicate chunks in vector database (issue #349) by adding deduplication check on content hash before upsert; migration `20260316_delete_stale_vetbook_chunks.sql` cleaned up existing duplicates. Supabase migrations tracked in `supabase/migrations/`: FTS index, pgvector column for Voyage embeddings, search function UUID fix, cleanup scripts.',
            'Research-driven decisions 🔬: evaluated embedding models (`embedding-model-evaluation-2025-03-15.md`), PDF viewer libraries (`react-pdf-viewer-comparison-2026-02-11.md`), RAG pipeline approaches (`rag-best-practices-2025-03-09.md`). Each decision grounded in documented research comparing alternatives. All research docs in `dr-paw/docs/research/`.',
          ],
        },
      ],
    },
  },
  {
    id: 'web-scraping',
    title: 'Web Scraping Infrastructure',
    description: 'Enterprise-grade data extraction pipelines: medical literature structuring (5,000+ documents) and automated review monitoring, deployed to Palantir Foundry with scheduled orchestration',
    badges: ['Playwright', 'BeautifulSoup', 'Python asyncio', 'Palantir Foundry'],
    results: [
      '5,000+ medical articles scraped and structured (4,771 clean, deduplicated)',
      '10+ hours/week manual work → automated (zero human time)',
      '99%+ uptime over 6 months (180 daily executions, 2 failures due to site outages)',
      'Zero detection incidents in 1,080 total scrapes',
      'Execution time: 45 minutes bulk, 90 seconds daily incremental',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Multiple clients needed production-grade web scraping for distinct use cases: (1) ML training dataset requiring **5,000+ structured** medical articles from Merck Veterinary Manual; (2) competitive intelligence requiring daily automated review monitoring across Trustpilot and ProvenExpert. Manual extraction was time-consuming (**10+ hours/week** for reviews, infeasible for 5,000 articles).',
            'Existing scraping tools (Octoparse, ParseHub) couldn\'t handle JavaScript-heavy sites, lacked scheduling, had no integration with client infrastructure (Palantir Foundry). Anti-detection requirements—rate limiting, user agent rotation, intelligent retry logic—needed custom implementation.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Dual Pipeline Architecture',
          paragraphs: [
            'Built Python-based scraping framework using **Playwright** (headless browser automation for JavaScript execution) and BeautifulSoup (HTML parsing). Async/await for concurrency—10 parallel browser contexts = 10x throughput vs sequential. Deployed to Palantir Foundry as scheduled Transforms: medical article scraper (one-time bulk extraction) and review monitor (daily incremental updates).',
            '**Medical Knowledge Extraction**: sitemap discovery (fetch sitemap.xml, extract URLs, filter, 5,247 URLs → 5,018 valid articles) → concurrent scraping (10 parallel browser contexts, 500ms rate limiting, 3-attempt exponential backoff retry) → HTML cleaning (BeautifulSoup strip navigation/ads/footers, preserve structure as markdown) → deduplication (SHA-256 body hash, removed 229 duplicates) → schema validation (enforce non-empty title, hierarchical category, >100 char body, valid ISO date, rejected 18 malformed) → output (4,771 final clean articles).',
            '**Review Monitoring System**: scheduled execution (Foundry Transform, daily 6am UTC) → Trustpilot scraper (Playwright navigate, wait for div.review-card, infinite scroll loop, extract per review: platform/date/rating/title/body/reviewer/company response) → ProvenExpert scraper (click "Show all reviews" AJAX load, wait for div.rating-item, extract same schema) → incremental update logic (load previous scrape results, identify new reviews via date + body hash dedupe, append new reviews) → competitive intelligence alerts (detect rating <3, send Slack notification, daily summary).',
            'Infinite scroll implementation for Trustpilot/ProvenExpert (no pagination links): `infinite_scroll()` evaluates `document.body.scrollHeight`, scrolls to bottom, waits 2s for new content, checks height again—loop until no height change. JavaScript rendering mandatory—requests + BeautifulSoup returned empty sections. Playwright executes JavaScript, waits for AJAX-loaded content.',
          ],
        },
        {
          icon: '🛡️',
          title: 'Anti-Detection Engineering',
          paragraphs: [
            'Trustpilot detected Playwright\'s headless browser (`navigator.webdriver` property), blocked with 403. Solved with stealth techniques 🕵️: remove webdriver property via init script (`Object.defineProperty(navigator, \'webdriver\', get: () => undefined)`), rotate user agents (20 realistic browsers—Chrome Windows/macOS/Linux, Firefox), rate limiting (500ms delay between requests), randomized viewport sizes (mimic different devices).',
            'Result: **zero blocks** over 6 months (180 daily scrapes = 1,080 total executions). Polite scraping beats sophisticated evasion—rate limiting + realistic user agents + remove webdriver property = sufficient. Proxy rotation ($100+/month) and captcha solving ($2/1000 solves) expensive overkill unless massive scale (100k+ pages/day).',
            'Intelligent retry logic: `scrape_with_retry()` with exponential backoff (2s, 4s, 8s). On timeout (likely rate limited), wait 30s, swap user agent, retry. Duplicate review detection via composite hash: `SHA-256(date|body|reviewer_name)` (body-only failed—identical reviews from different users).',
          ],
        },
        {
          icon: '📊',
          title: 'Production Deployment',
          paragraphs: [
            'Deployed to Palantir Foundry Transforms—native integration with client data infrastructure (data lineage, scheduling, access control). Standalone service would require data replication, auth integration, separate monitoring. Medical article scraper as one-time bulk Transform; review monitor as scheduled daily Transform with incremental update logic.',
            'Incremental updates 10x faster execution (1 min vs 10 min), lower detection risk (fewer requests), preserves historical data. Full re-scrape wastes resources. Checkpoint-based resumption for long-running scrapes: `scrape_with_checkpoints()` saves progress after each URL—medical article scraper initially timed out after 30 min (Foundry limit). Split into 10 batches (500 URLs each), executed sequentially with checkpoint file tracking progress.',
            'HTML structure changes inevitable—ProvenExpert redesigned site month 3, broke CSS selectors, scraper returned empty. Fixed with centralized selector configuration (`selectors.json`), fallback selectors (try 3 possible selectors per field), automated alerts on extraction failures (Slack notification), monthly manual validation (spot-check sample).',
            'Repository structure: `scrapers/` (merck_manual.py, trustpilot.py, provenexpert.py), `utils/` (anti_detection.py, html_cleaner.py, schema_validator.py), `foundry/` (merck_transform.py, reviews_transform.py), `config/` (user_agents.json, selectors.json), `tests/` (reliability, anti-detection). ML dataset ready—structured JSON used for veterinary NLP model training. Competitive intelligence—daily review monitoring enabled proactive customer service. Zero maintenance after initial deployment—ran autonomously 6 months.',
          ],
        },
      ],
    },
  },
  {
    id: 'llm-pipeline',
    title: 'LLM Pipeline Framework',
    description: 'Standalone Python pip package for deterministic multi-step LLM pipelines running both in-process for low latency and on LangGraph Standalone Server for visual debugging and MCP endpoint exposure — same code, zero duplication, different runtimes',
    badges: ['LangGraph', 'LangChain', 'LangSmith', 'MCP', 'FastAPI'],
    results: [
      '2 production pipelines extracted with zero Oracle imports',
      'LangSmith Studio visual debugging: prompt iteration from minutes to seconds',
      'Auto-MCP endpoint enabling n8n integration without custom per-pipeline work',
      'Composable capability protocol pattern validated and documented for all future pipelines',
      '6 research reference documents produced — independently referenceable by team',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Oracle (the company\'s AI platform based on SurfSense) had two custom LLM pipelines tightly coupled to its internals: ticket analysis and podcast generation. Both imported Oracle\'s Foundry OSDK service, LLM configuration resolver, database sessions, TTS services, and Celery task invocation directly. They could only run in-process inside Oracle\'s FastAPI deployment.',
            'This created three compounding problems: no visual debugging (LangSmith Studio requires a LangGraph Standalone Server connection, not a custom FastAPI deployment), no external access for n8n workflows or other consumers (would require custom per-pipeline integration work), and no resource isolation (pipeline batch jobs competed for CPU and memory with Oracle\'s interactive chat traffic).',
            'A secondary constraint: subject-matter experts (non-coders who know what a good support response or podcast episode should contain) needed to iterate on pipeline behavior without touching Python.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Dual-Runtime Architecture',
          paragraphs: [
            'I built `tob-llm-pipelines`, a standalone Python pip package housing all deterministic LLM pipelines. The package defines **composable capability protocols** (`LLMCapability`, `TicketDataCapability`, `TTSCapability`, `RetrievalCapability`). Each pipeline declares exactly which capabilities it needs via protocol composition: `TicketAnalyseContext = LLMCapability & TicketDataCapability`.',
            'Two context implementations inject the right dependencies at runtime. `DirectPipelineContext` provides direct service access for in-process Oracle execution—low latency, synchronous database sessions, direct Foundry OSDK calls. `HttpPipelineContext` uses environment variables and calls Oracle\'s API over HTTP for the LangGraph Standalone Server—independent scaling, Studio debugging, MCP endpoints.',
            'Pipelines are pure—no Oracle imports, no `app.*` dependencies. They interact with the outside world exclusively through their context protocols. The same pip package installs in both runtimes; the deployment target determines which context implementation gets injected. Lazy imports (inside method bodies in `DirectPipelineContext`, never at module level) keep the package installable without Oracle present.',
            'Deployment flow: dev machine → GitHub → Oracle (in-process DirectPipelineContext) + LangGraph Server (HttpPipelineContext via Docker Compose). The Standalone Server runs on Hetzner with 3 containers: `langgraph-api`, PostgreSQL (LangGraph checkpoints on separate database), Redis (streaming on separate database number). LangSmith Studio connects for visual debugging. Auto-MCP endpoint at `/mcp` enables n8n and external consumers to discover and invoke pipelines with zero custom integration.',
          ],
        },
        {
          icon: '🔬',
          title: 'Research-Driven Design',
          paragraphs: [
            'Five targeted deep-research investigations mapped the complete decision space before any architectural decisions. Each produced a standalone reference document grounded in primary sources—official docs, GitHub issues, community forums, verified production deployments. Key findings eliminated entire candidate architectures before implementation began.',
            'The LangFlow→LangGraph bridge doesn\'t exist and won\'t exist—GitHub issues #9216 and #4090 closed as "not planned." Data models are fundamentally incompatible (LangFlow\'s JSON schemas vs. LangGraph\'s Python StateGraphs). LangFlow is DataStax/IBM; `langgraph` isn\'t even installed in LangFlow\'s project. Visual builders have documented scaling problems past moderate complexity.',
            'n8n has architectural ceilings: no persistent agent state across workflow executions, no cyclic graph execution, no mid-reasoning interrupts. GitHub #14361 documents memory nodes storing only input/output messages (not tool call messages), causing agents to hallucinate tool usage. This established the **pipeline boundary rule**: n8n owns the outer loop (triggers, scheduling, data routing), LangGraph owns the inner loop (persistent state, adaptive reasoning, streaming, human-in-the-loop).',
            'Consumer-first interface design: I sketched ideal pipeline node code first ("what should this look like with no Oracle imports?") before defining the interface. Working from Oracle\'s coupling map would have mirrored implementation details rather than conceptual needs. This approach consistently produces cleaner, more stable abstractions—confirmed when the initial monolithic interface evolved to composable protocols after mapping which capabilities each pipeline actually uses.',
          ],
        },
        {
          icon: '✨',
          title: 'Production Deployment',
          paragraphs: [
            'Two production pipelines now run in both environments. `ticket_analyse` has 3 sequential nodes: fetch open tickets from Foundry (configurable max), retrieve structural analysis reports per customer via RAG, generate structured German-language feedback via LLM. `podcaster` has 2 nodes: generate transcript via LLM, create audio via concurrent TTS segment generation → FFmpeg merge (voice mapping per provider: Kokoro for self-hosted, ElevenLabs for cloud).',
            'Non-coder accessibility uses the LangGraph Assistants pattern: each pipeline exposes a `Configuration` dataclass with tunable fields (system prompts, model selection, domain-specific parameters). Subject-matter experts create configured variants through Oracle\'s Next.js frontend without touching pipeline code. Developer codes the graph once with a schema; non-coders customize via UI.',
            'Standardized 6-file pipeline structure: `graph.py` (StateGraph definition), `state.py` (dataclass State), `nodes.py` (node implementations), `configuration.py` (Assistants schema), `prompts.py`, `__init__.py`. This pattern is documented and enforced for all future pipelines.',
            'Custom exception types (`PipelineDataError`, `PipelineLLMError`, `PipelineTTSError`) provide consistent error semantics across both runtimes—both implementations raise the same exceptions for the same semantic failures. Celery task wrappers remain in Oracle\'s codebase; the pip package is unaware of Celery. On the Standalone Server, the Agent Server\'s managed task queue handles background execution.',
          ],
        },
      ],
    },
  },
  {
    id: 'tob-vibe',
    title: 'TOB Vibe Kanban',
    description: 'Advanced dual-fork architecture enabling autonomous AI agent orchestration at scale through sophisticated patch management, seamless GitHub integration, and cross-platform distribution',
    badges: ['Rust', 'TypeScript', 'stgit', 'NPM'],
    results: [
      'Zero upstream merge conflicts via stgit methodology (6 months production)',
      '6 platform targets with automated CI/CD builds',
      'Sub-3-minute installation via npx (including binary download)',
      '15+ enterprise repositories onboarded via GitHub integration',
      'Single-command organizational rollout: npx tob-vibe-kanban init <org>',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Enterprise needed unified AI orchestration merging VibeKanban\'s workflow engine with Claude MPM\'s multi-agent capabilities. Existing tools offered either workflow management OR agent orchestration, not both. Forking both projects risked falling behind upstream improvements—no methodology existed for maintaining dual forks with custom integrations while tracking upstream changes.',
            'The constraint: preserve full upstream compatibility. Both VibeKanban and Claude MPM continued active development. Any fork that diverged permanently would lose community improvements. Traditional git workflows (rebase, vendor branches) create tangled histories where conflicts become monolithic merges.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Patch Stack Architecture',
          paragraphs: [
            'I used **stgit** (stacked git) for patch management—maintains patches as a stack on top of upstream branches. Each enterprise customization lives as an independent patch: `01-headless-mode.patch`, `02-executor-override-api.patch`, `03-github-org-integration.patch`. When upstream updates arrive, pop all patches (`stg pop -a`), rebase upstream branch, re-apply patches (`stg push -a`). Conflicts are isolated to specific patches, not monolithic merges.',
            'Dual-fork structure: `tob-vibe-kanban` (fork of VibeKanban\'s TypeScript workflow engine) and `tob-mpm` (fork of Claude MPM\'s Rust multi-agent core). Each maintains its own upstream tracking branch and stgit patch stack. Automated weekly sync workflow: fetch both upstreams → pop patches → rebase → re-apply → run full test suite → auto-merge if tests pass, create PR for manual review if conflicts.',
            'Patch stack structure minimizes conflict surface area. `01-headless-mode.patch` only touches CLI initialization, not core agent logic. `02-executor-override-api.patch` adds trait definitions without modifying existing execution paths. When conflicts occur, stgit isolates them—resolution is surgical, not sweeping.',
          ],
        },
        {
          icon: '🤖',
          title: 'Headless Mode Engineering',
          paragraphs: [
            'Claude MPM originally required interactive terminal (TUI) for agent orchestration. I engineered headless mode via control inversion: instead of "UI prompts user," design "user provides decision hooks, tool calls them." Added command override API (replaces interactive prompts with programmatic decisions), event stream API (publishes agent lifecycle events: spawned, running, completed, failed), and structured JSON logging for CI/CD integration.',
            'Integration flow: VibeKanban detects task with @agent annotation → spawns headless MPM session via executor override → MPM lifecycle events stream to Kanban UI → results merge to workflow state → workflow continues. Custom executor trait bridges both systems:',
            '`TaskExecutor` trait with `can_handle()`, `execute()`, `stream_progress()` methods. `MPMExecutor` implementation detects tasks with `@agent` annotation or `mpm` command prefix, spawns headless session, sets task context, waits for completion, collects results. Early implementation streamed every log line as separate events—overwhelmed VibeKanban UI, caused memory leaks. Fixed with batched event streaming (100ms buffer), event filtering (only state changes, not verbose logs), backpressure handling (pause MPM if VibeKanban can\'t keep up).',
          ],
        },
        {
          icon: '📦',
          title: 'Cross-Platform Distribution',
          paragraphs: [
            'Production NPM package with pre-built binaries for 6 platforms: linux-x64/arm64, darwin-x64/arm64 (macOS Intel/Apple Silicon), win32-x64/arm64. GitHub Actions matrix builds cross-compile Rust binaries, build TypeScript bundles, run integration tests, package binaries, upload release artifacts. Installation: `npm install -g tob-vibe-kanban` → detects platform → downloads correct binary from CDN → caches in `~/.tob-vibe-kanban/` → symlinks to global bin → validates checksum.',
            'Initial NPM binary resolution used `optionalDependencies`—unreliable on ARM Macs (downloaded wrong platform). Fixed with explicit platform detection in postinstall script: `const platform = \`${os.platform()}-${os.arch()}\``, validate binary exists, throw if missing. Cross-compilation toolchain initially timed out on GitHub Actions—solved with cached toolchains (sccache), parallel matrix jobs, platform-specific Docker containers, smoke tests per platform.',
            'GitHub organization integration: one-click OAuth GitHub App for org access, bulk repo cloning (respects `.gitignore`, `.tobignore` patterns), project initialization (`CLAUDE.md` templates, workflows, pre-commit hooks), webhook configuration, team permissions mapping (GitHub teams → TOB roles). Reduces enterprise onboarding from 40 hours manual setup to 30 minutes automated: `npx tob-vibe-kanban init <org>` onboards entire organization.',
          ],
        },
      ],
    },
  },
  {
    id: 'screw-manufacturing',
    title: 'Screw Manufacturing Optimization',
    description: 'Binary classification system predicting defective screws from production data for large-scale industrial manufacturer (SPAX), processing 4 years of MES records with feature engineering and imbalanced learning',
    badges: ['Python pandas', 'scikit-learn', 'Random Forest', 'XGBoost', 'scipy.sparse'],
    results: [
      '4 years production data merged across MES + Messautomat tables',
      '418 one-hot-encoded features → staged reduction via importance scoring',
      '90/10 class imbalance → random undersampling outperformed SMOTE',
      'Feature importance analysis identified root causes for defects',
      'Full preprocessing pipeline documented across 10+ notebooks',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'SPAX (industrial screw manufacturer) runs 100% quality testing on production batches using a measurement machine (Messautomat) that records dimensional attributes per screw—thread diameter, length, curvature—with pass/fail outcomes. Each production order generates thousands of tests. Business question: can we predict pass/fail outcomes and identify which production factors drive failures without relying solely on post-production measurement?',
            'Two data sources existed: **MES** (Manufacturing Execution System) with 4 years (2021–2024) of production order metadata (machine, workplace, process step, quantity, material number), and **Messautomat** with per-screw measurement results across two tables (Tab04: test metadata; Tab05: individual attribute measurements).',
          ],
        },
        {
          icon: '🔧',
          title: 'Data Preprocessing & Merging',
          paragraphs: [
            '**MES preprocessing**: merge 4 yearly tables → remove columns absent from all years → remove irrelevant columns, rename → remove entries with non-numeric order/workplace IDs → reformat German locale floats (commas → dots) → type-cast. **Messautomat preprocessing**: drop Tab06 (raw measurements already summarized in Tab05) → create boolean flag for manual vs automatic measurement (6.51% manual, dropped complexity) → remove entries with missing order IDs, non-5-digit machine numbers → encode Prüfart (test type) to integer (mapping saved to `Prüfarten-Kodierung.json`) → join Tab04 + Tab05 on foreign key.',
            '**Merge challenge** 🔗: MES and Messautomat couldn\'t be cleanly joined at row level. For a given order-workplace combination, both tables have ~100 entries each, but production-to-measurement delay is unknown—individual MES rows can\'t reliably link to individual measurement rows. Only **process step** (Prozessschritt) was unambiguous (few order-workplace combinations have >1 process step), so only that field extracted from MES and joined. All MES entries with zero quantity removed. Process step labels unified and re-encoded (\'Kontrolle 100%\', \'KONTROLLE\', \'Kontrol\' → \'KONTROLLE\') with frequency-based integer encoding saved to `Prozessschritt-Encoding.json`.',
            'Discovered that core assumption (MES and Messautomat records can be joined) was false—changed entire feature space. Starting simple (minimal features, fast baseline) surfaced this early rather than after weeks of modelling. Final merged table: `data/output/data.csv`—Messautomat measurements + process step.',
          ],
        },
        {
          icon: '🤖',
          title: 'ML Pipeline & Class Imbalance',
          paragraphs: [
            '**Feature engineering**: Material number (Materialnummer) encodes screw properties per article key (`Artikelschlüssel_SPAX.xlsx`). Extracted: Warengruppe (product group), Werkstoff (material), Veredelung (surface finish), Durchmesser (diameter), Länge (length), Verpackung (packaging). After one-hot encoding all categoricals: **418 features**. Memory-prohibitive as dense—stored as `scipy.sparse.matrix`.',
            '**Staged feature reduction**: manual removal (Verpackung, ID columns, Pruefanzahl, raw Pruefart, Veredelung) → removal of rare test categories (<1,000 occurrences) → RandomForest importance score-based elimination. Final preprocessing: Z-score normalization (mean=0, std=1), one-hot encoding, sparse storage.',
            '**Class imbalance**: **90% pass / 10% fail**. Compared three mitigation strategies: class weight adjustment (underperformed), SMOTE oversampling (computationally expensive at this scale, marginal gain), **random undersampling** (best precision-recall tradeoff, selected). Dataset large enough that undersampling doesn\'t lose statistical power.',
            '**Model comparison** on 10% data baseline: Naive Bayes (poor on imbalanced high-dimensional), Logistic Regression (too linear), XGBoost (viable candidate), **Random Forest** (best performance, selected). Evaluated two strategies: regression (predict measured value → derive pass/fail from tolerance bounds, less effective) vs classification (direct pass/fail prediction with undersampling, better performance, selected). Hyperparameter tuning via grid search on 10% data. Final model trained on full dataset: `random_forest_clf_downsampled_30_0.5_20_500.pkl`.',
          ],
        },
        {
          icon: '📊',
          title: 'Analysis & Outcomes',
          paragraphs: [
            'Feature importance scores analyzed in `feature_importance_scores.ipynb`—identified which production and material features most strongly predict failures, usable for root cause analysis. Precision-recall tradeoff analyzed in `precision_recall.ipynb`. Messautomat measurement count discrepancy investigated in `mes_vs_messautomat.ipynb`—data indicated ~90% screws measured, but per-order counts showed only ~0.003% measured (26 measurements for 816,867-screw order). Resolved: Messautomat table represents measurement sessions (each covering a sample), not individual screw records.',
            'Working Random Forest classifier for pass/fail prediction 🎯, feature importance analysis identifying key drivers, full preprocessing and feature engineering pipeline documented across 10+ notebooks (reproducible from raw MES + Messautomat exports). Recommendations for better data collection: coherent column naming, clear MES-to-Messautomat linkage, consistent category labels.',
            'Key lesson: data mergeability must be verified before scoping ML project. Sparse matrix representation essential when one-hot encoding high-cardinality categoricals at scale—dense representation would have been prohibitively slow.',
          ],
        },
      ],
    },
  },
];
