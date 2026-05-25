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
    description: 'Decommissioned €100k/month Palantir Foundry enterprise platform and migrated 9.5 TB of production data with 8,435 resources to self-hosted infrastructure at €200/month — zero downtime, complete functionality preserved, full operational platform delivered',
    image: '/project-icons/palantir2.jpg',
    badges: ['Playwright', 'PostgreSQL', 'Docker', 'Watchtower', 'Cloudflare Tunnel', 'BorgBackup', 'Beszel'],
    results: [
      '€1.2M/year saved: €100,000/month → €200/month (99.8% cost reduction)',
      '9.5 TB migrated with zero data loss and zero downtime during live migration',
      'Reverse-engineered proprietary platform with no documented export API',
      '362 pipelines and 204 repositories rebuilt on self-hosted stack',
      '9 production services with automated deployment, monitoring, and backups',
      '~10 developers deploy without SSH via sub-7-minute automated pipeline',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'The company ran its entire data infrastructure on Palantir Foundry at **€100k/month** — unsustainable for a mid-sized business. The closed, proprietary ecosystem had no documented bulk export capability but held **8,435 resources** across 341 custom object types, **9.5 TB** across 2,320 datasets, 362 transformation pipelines, and 204 code repositories with real-time systems running 24/7.',
            'The requirement: migrate everything to self-hosted infrastructure with **zero downtime** and complete data preservation, then build a production platform that developers could deploy to without DevOps expertise. No official export *API* existed — the only way out was reverse engineering. Beyond extraction, the company needed operational systems: automated deployment, backups, monitoring, and security hardening.',
          ],
        },
        {
          icon: '🔓',
          title: 'Reverse Engineering & Extraction',
          paragraphs: [
            'I built a 5,045-line *Python* framework using *Playwright* to reverse-engineer Foundry\'s internal *APIs*. The framework maintains authenticated browser sessions, intercepts network traffic to discover undocumented *GraphQL* and *REST* endpoints, extracts Bearer tokens from the traffic, then uses those tokens for programmatic *API* access that bypasses the UI entirely.',
            'Twelve specialized scripts handle different extraction tasks — lineage discovery (building dependency graphs via *GraphQL* interception), pipeline extraction (*JSON* exports ranging from 43 KB to 4.2 MB per pipeline), dataset streaming with *PostgreSQL*, repository cloning with *Git* automation, and binary media downloads. Each script uses persistent browser sessions for auth, batched *API* calls to avoid rate limits, and idempotent design for interruption recovery.',
            'The extraction system includes binary split error isolation: when a 1,000-row batch fails, the system automatically narrows down to the single problematic row without manual intervention. Primary key tracking enables multi-day extractions to resume from checkpoint on failure.',
            'The system uses performance tuning for TB-scale extraction: `synchronous_commit = off` (*PostgreSQL* doesn\'t fsync on every commit), write throttling (50ms sleep between batches), 5 parallel workers, and watchdog monitoring that auto-stops on resource breaches (disk I/O >70%, available RAM <2GB).',
          ],
        },
        {
          icon: '🏗️',
          title: 'Infrastructure & Operations',
          paragraphs: [
            'I deployed **9 production services** on a single *Hetzner* dedicated server (16-core AMD EPYC, 64 GB RAM, 338 GB SSD, 5 TB volume) at **€200/month**: Dagster (pipeline orchestration), Twenty CRM, n8n (workflow automation), Oracle (AI research), LangGraph (agent orchestration), Coder (remote dev workspaces), Listmonk (email campaigns), Beszel (monitoring), Watchtower (auto-deployment).',
            'The zero-*SSH* deployment pipeline works as follows: developer pushes to *GitHub* `→` *GitHub Actions* builds *Docker* image `→` pushes to *GHCR* `→` *Watchtower* polls every 5 minutes, detects new digest, recreates container. Developers deploy without *SSH* access — just `git push`. The system achieves sub-7-minute push-to-live cycle.',
            'Each service has its own *PostgreSQL* instance (6 total, Listmonk shares Twenty\'s) — isolated resource limits, independent backup schedules, no connection pool contention. Security hardening includes all database ports bound to `127.0.0.1` only, *SSH* key-only auth, automated *SSL* via *Certbot*. The *Nginx* reverse proxy handles *SSL* termination, *WebSocket* upgrades, and multi-location routing.',
            '*Cloudflare Tunnel* routes all `*.tob.sh` services through an outbound-only connection — no open inbound ports needed. The *Hetzner* Firewall blocks inbound TCP 80/443 at network level. All traffic flows through *Cloudflare*\'s security layer (WAF, rate limiting, DDoS protection). I configured bypass rules for external webhooks.',
          ],
        },
        {
          icon: '💾',
          title: 'Backup, Monitoring & Developer Platform',
          paragraphs: [
            'The auto-discovery backup system scans for running *PostgreSQL* containers and auto-initializes repositories on first use. Daily backups stream to *Hetzner* Storage Box (10 TB co-located) with compression and encryption. The off-site backup streams directly to *Cloudflare R2* via *S3* multipart upload — no temp files on disk (server SSD is 338 GB; 1 TB dataset can\'t be staged locally).',
            'I configured monitoring with 6 production alerts (*Slack* webhook): system down, CPU >80%, Memory >85%, Disk >80%, Temperature >80°C, Load Average >13 (80% of 16 cores). Unified container logging via *systemd-journald* provides searchable logs with retention limited to 2 GB / 90 days. Weekly auto-prune prevents disk accumulation.',
            'I implemented structural dev/prod isolation: production deployments sync to live systems with full credentials; development deployments use isolated databases with **no production credentials** (makes wrong thing impossible, not just discouraged). This prevents accidental production writes during development.',
            'I set up Dagster as the pipeline orchestration platform for rebuilding business logic from extracted Foundry *JSON* exports. The rebuild process uses these JSON files as rebuild specs. Schema translation: 341 Foundry object types → 305 production *PostgreSQL* tables with 291 foreign key relationships preserved. This replicates complete functionality on the self-hosted stack.',
          ],
        },
      ],
    },
  },
  {
    id: 'biomech',
    title: 'Biomechanical Structure Analysis',
    description: 'Production-grade biomechanical posture analysis system combining computer vision pipeline (MediaPipe, BiRefNet) with multi-agent LLM analysis — deployed to clinical workflow processing 40+ patient assessments daily',
    badges: ['MediaPipe', 'BiRefNet', 'Gemini API', 'LangGraph', 'Palantir Foundry'],
    results: [
      'Assessment time: 30 minutes → 3 minutes (90% reduction)',
      '90%+ accuracy in posture deviation detection vs expert coaches',
      '100% GDPR compliance with privacy-preserving blur layers',
      'Multi-agent LLM pipeline with specialist agents for granular biomechanical analysis',
      'Non-linear LangGraph architecture with conditional routing based on detected deviations',
      '150+ clinical assessments processed with zero pipeline failures',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'A fitness and biomechanics company needed to scale expert posture analysis beyond limited coach capacity. Manual biomechanical assessments took **30 minutes** per patient and required deep anatomical expertise — coaches analyzed patient photos, identified postural deviations through bottom-up kinetic chain methodology (ankle → knee → hip → pelvis → thorax → cervical), determined root causes, and prescribed corrective exercises.',
            'The solution required encoding this expert methodology into an automated system. I needed to understand how coaches analyzed posture at a granular level, then build a multi-agent *LLM* pipeline where each agent specialized in specific biomechanical details — pelvic tilt angles, lumbar curve deviations, thoracic positioning, kinetic chain compensations. The system also required computer vision for landmark detection and *GDPR*-compliant privacy layers for all stored images.',
          ],
        },
        {
          icon: '🔬',
          title: 'Computer Vision Pipeline',
          paragraphs: [
            'The multi-stage *Python* pipeline extracts **33 anatomical landmarks** via *MediaPipe Pose* — complete coordinate system with *X/Y* pixel position, *Z* depth relative to pelvis, visibility scores per point. This enables precise angle measurements: pelvic tilt via horizontal reference planes, knee valgus in frontal plane, shoulder rotation via arctan.',
            'The privacy layer uses *BiRefNet* segmentation to separate patient from background, then applies two-stage Gaussian blur (background + face) with different kernels to prevent deblur attacks. The legal team confirmed **100% *GDPR* compliance** — irreversible via deconvolution, zero privacy incidents across production use. The pure function architecture passes metadata dictionary through successive stages (`validate → standardize → detect → measure`), building analysis context without file *I/O*.',
          ],
        },
        {
          icon: '🧠',
          title: 'Multi-Agent LLM Architecture',
          paragraphs: [
            'The *LangGraph* pipeline encodes expert biomechanical methodology through specialist agents. Each agent analyzes a specific structural domain: Lumbar (lordosis 20-40° norms, deviation patterns), Thorax (kyphosis 20-45°, scapular position), Pelvis (tilt/translation three planes), Lower Limb (knee-ankle alignment), Cervical (positioning relative to trunk). Agents receive *MediaPipe* coordinates, privacy image, and upstream context.',
            'The non-linear execution follows biomechanical dependencies. The lower limb agent runs first — knee position affects pelvic interpretation. Spinal agents (lumbar, thorax) execute in parallel once pelvic context is available. A kinetic breaks agent identifies force transmission failures causing upstream compensations. Conditional routing activates specialized analysis: anterior pelvic tilt triggers hip flexor analysis, while posterior tilt triggers hamstring assessment. The final synthesis agent (*Spannungsdreieck* — tension triangle) receives complete findings and produces a root cause hierarchy distinguishing primary dysfunctions from secondary compensations.',
          ],
        },
        {
          icon: '⚙️',
          title: 'Three-Tier Report System',
          paragraphs: [
            'The system generates **three report versions** from identical analysis data: **Leads** (600 words, conversational, accessible metaphors), **Customer** (800 words, structured sections with explained biomechanical terms), **Full Report** (2,000+ words, node-by-node analysis with classification codes *K1-F-*, *B3*, *C1*, *D1b*, precise measurements, kinetic chain mechanics). Specialist agents output structured *JSON* findings, then a synthesis agent generates all three natural-language versions from the shared foundation.',
            'The language adapts per audience while maintaining consistent conclusions. Leads: "Your body has formed a Z-shape: knees forward – hips back – ribcage back – head forward." Customer: "Your pelvis tilts backward, called **posterior tilt**." Full: "**B3-Pattern**: P0 neutral pelvic translation with T- posterior tilt, stacking difference +3.4cm indicating moderate anterior lower thorax positioning." The complete pipeline (*WordPress* upload → vision → agents → three reports) runs **<3 minutes** per patient.',
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
      '19 dedicated Slack agents with persistent memory across 5-country distributed team',
      'Manager agent auto-detects bottlenecks and reports team status',
      'Rich automation: Zoom transcripts, persistent tasks, fully custom cron jobs per developer',
      'Single-command provisioning for new agent deployment',
      'GitHub activity context integration for code-aware assistance',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'A distributed engineering team (**19 developers** across **5 countries**) used Slack for all communication but had no structured way to track daily work, surface blockers before they became problems, or give the tech lead visibility without micromanaging. No AI platforms existed yet that could provide this capability.',
            'Every developer needed a proactive assistant that understood their context: what they worked on yesterday, their GitHub activity, timezone differences, and actual working hours. The platform had to deploy automatically from GitHub without *SSH* access.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Infrastructure & Deployment',
          paragraphs: [
            'I deployed OpenClaw on a Mac mini in Switzerland with a one-way deployment pipeline: dev machine → *GitHub* → self-hosted Actions runner. Pushing to main triggers automated deployment that pulls latest code, validates architectural invariants, syncs agent type files, deploys configuration using *GNU Stow* (symlinks from repo into home directory), reconciles cron jobs declaratively, and restarts the gateway if needed.',
            'The gateway runs as a *launchd* service with automatic restart on crash. *caffeinate* prevents system sleep during operations. Scheduled agent tasks run via *cron*, while the gateway process listens for *Slack* events and spawns agent processes on demand for interactive conversations.',
            'The host has *git* hooks preventing commits and branch switches — it always tracks main as read-only. Agent configuration files (personality, operating manual, scripts) live in version control and get copied to each agent\'s workspace. Runtime state (conversations, memory, credentials) never touches *GitHub*. This separation ensures credentials stay on-host, conversation privacy is preserved, and the repo remains the single source of truth for configuration.',
            'Adding a new developer takes one command. The provisioning system generates directory structure, substitutes templates with agent identity and user info, registers *Slack* bindings, updates allowlists, creates cron schedules, and deploys. The inverse cleanup process uses flock-based locking to prevent race conditions during concurrent operations.',
          ],
        },
        {
          icon: '🧠',
          title: 'Multi-Agent Architecture',
          paragraphs: [
            'Each developer gets a dedicated assistant living in their *Slack* DMs. Agents maintain **two-layer memory**: **LCM** (Lossless Claw Memory) manages session history via *DAG*-based summarization to prevent context window overflow, while **QMD** (vector-backed storage) provides semantic search across persistent markdown files. Daily automation fetches *GitHub* activity via *Search API* (not *Events API*, which misses private repos) and writes work reports. Morning automation distills previous conversations into daily summaries. Both layers get indexed by *QMD*, giving agents long-term recall across sessions.',
            'Three daily check-ins (morning planning, midday progress, evening recap) align with each developer\'s work schedule. The system checks for time-off entries and working-day patterns before sending. *GitHub* activity gets included in check-in context so agents reference actual work. The system adjusts phrasing based on day of week — Friday evening mentions carrying over to next week, Monday morning references last week.',
            'A manager agent monitors all **19 developer agents** from a dedicated *Slack* channel. It runs hourly checks for bottlenecks (agents stuck in loops, multiple missed check-ins) and produces morning and evening status reports. Agents run *GPT-5.4* (Codex) for both scheduled and interactive modes — unified model eliminates personality drift. *GLM-5* (202K context window) via Fireworks serves as fallback.',
          ],
        },
        {
          icon: '✨',
          title: 'Developer Experience',
          paragraphs: [
            'The bootstrap process runs on first contact. The agent introduces itself, collects the developer\'s preferred name and communication style, asks about working hours, timezone, and weekend availability, then writes the work schedule configuration and creates the three cron jobs. From that point forward, all check-ins respect the developer\'s actual schedule — no early morning messages for someone in a different timezone.',
            'Daily work reports combine *GitHub* activity, conversation history, and check-in responses into structured summaries delivered to each developer. Check-in responses support voice messages — agents automatically transcribe and integrate them into memory, allowing developers to respond hands-free during commutes or away from keyboard.',
            'Agents can generate images via *Gemini Nano Banana API*, create *GitHub* issues with duplicate detection (searches existing issues before creating new ones), and comment on existing issues. Zoom transcript delivery is opt-in: when Twenty *CRM* receives a Zoom webhook, the system routes the transcript to the developer\'s *Slack* DM as text attachment.',
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
      'Zero AI hallucination incidents (hook system prevented configuration errors)',
      'Coach-level responses with customer biomechanics, training history, and expert knowledge',
      'Complete Slack-native helpdesk with live queues, voice replies, and automated media pipelines',
      '13x growth in Action Handler implementation through supervised junior developer expansion',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'The customer needed to automate customer support while maintaining the personalized, expert-level quality of human coaches. Support agents had **no quick access** to customer context — biomechanical analysis reports, session history, billing data, expert coaching knowledge — and had to manually switch between systems. The automation also needed to be maintainable by junior developers using *AI* assistance, without introducing *AI* hallucination risks or configuration errors.',
          ],
        },
        {
          icon: '🛡️',
          title: 'Framework Innovation',
          paragraphs: [
            'I set up the initial framework and designed the architecture to be safe by default, with guardrails that manage unprofessional practices if they occur during junior developer work. A **PreToolUse hook** intercepts n8n *API* calls — the first access per session gets blocked until the developer reads targeted Claude skills containing best practices for constructing n8n pipelines, then periodic blocks combat context drift. Reading the skills resets the counter. This makes it impossible to modify workflow code without understanding the curated best practices.',
            'The framework leverages highly-regarded Claude skills covering n8n best practices: webhooks, workflow patterns, data tables, *HTTP* authentication, error handling, and tool integrations. These skills provide concise, targeted guidance more focused than general documentation. A *Cloudflare Access* patch uses *Node.js* preload script to transparently inject Zero Trust auth headers for Foundry *API* calls. I then onboarded junior developers into the project and supervised their work. Over time, we improved the system and made it much more feature-rich and robust, with zero hallucination incidents due to the framework guardrails.',
          ],
        },
        {
          icon: '🤖',
          title: 'Multi-Agent Architecture',
          paragraphs: [
            'Six specialized *Gemini 2.0 Flash* agents handle different support domains, each with domain-specific *Palantir Foundry OSDK* tool access: **Tech** (app and login issues plus biomechanical data), **Coaching** (training and exercises with *RAG* through Zoom coaching transcripts), **Billing** (invoices from Foundry and Bexio *PDF* fetching), **Events** (appointments and registration), **Summit** (summit logistics), and **General** (catch-all with knowledge base access).',
            'Incoming tickets flow through intelligent classification to determine category, then route to an analysis workflow where the appropriate agent generates a structured proposal. Foundry *OSDK* provides comprehensive integrations: biomechanical analysis, session history, invoices, and past tickets. *Zod* schema validation ensures reliable, parseable outputs with confidence scoring.',
          ],
        },
        {
          icon: '📊',
          title: 'Production Scale',
          paragraphs: [
            'The system runs multiple active workflows covering ticket classification (duplicate detection, DNC enforcement, *AI* categorization), multi-agent analysis, and action handling for all *Slack* interactive buttons. Bidirectional *Slack* sync provides a complete helpdesk in *Slack* — agents never need to open the FluentSupport UI.',
            'The architecture handles concurrent ticket submissions through early lock patterns. Asynchronous webhook resume enables long-running pipelines like Zoom → Vimeo transcoding to suspend execution and resume when processing completes. Live-updating agent queues use pinned *Slack* messages and *DM* lists that continuously rebuild as tickets arrive. Voice reply support via audio transcription enables mobile-first workflows. Invoice *PDF* automation fetches documents from Bexio and uploads directly to *Slack* threads.',
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
            '*AI*-assisted development produces "vibe coding"—unstructured workflows causing scope creep and technical debt. Teams need disciplined scrum cycles with *AI* orchestration. Without frozen specifications, *AI*-assisted builds drift mid-sprint as requirements change conversationally. **No existing system** connects conversational design → structured planning → autonomous implementation → self-improvement.',
            'The goal was to **eliminate scope creep** through frozen *PRD* enforcement, automate complete scrum cycles from design to deployment, enable parallel autonomous builds with *git worktree* isolation, and create a self-improving system where every project makes CAPS better for all users.',
          ],
        },
        {
          icon: '🔄',
          title: 'Scrum Cycle Automation',
          paragraphs: [
            'I built a self-improving *AI* orchestration system enforcing scrum discipline through specialized commands. The design phase uses Socratic questioning to produce frozen specifications — a specialized agent asks probing questions through iterative refinement, captures problem statement, user personas, core features, technical constraints, and success metrics. The frozen spec prevents scope creep and extracts template variables for initialization.',
            'The breakdown phase generates *INVEST*-compliant issues by parsing specifications into discrete deliverables. The system applies *INVEST* criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable), generates acceptance criteria per issue, and creates *GitHub* Issues via *API* with labels and milestones. Once breakdown completes, the spec locks. Changes require explicit redesign and new breakdown, making the cost of scope changes visible.',
            'The retrospective phase enables self-improvement by reviewing sprint completion, identifying CAPS-specific issues (not project bugs), creating issues in the CAPS template repository via *GitHub API*, and tagging with improvement categories (documentation, workflow, pattern, tooling). Classification separates project bugs (stay local) from CAPS workflow issues (go upstream).',
            'The update phase syncs latest improvements from CAPS upstream, updating project instructions and workflows automatically on session start while preserving project-specific customizations via merge strategy. The feedback loop compounds — later projects have richer documentation and fewer workflow issues than earlier ones.',
          ],
        },
        {
          icon: '🛠️',
          title: 'Multi-Agent Build System',
          paragraphs: [
            'The build system uses multi-agent autonomous implementation. A planner agent reads issues, creates step-by-step implementation plans, identifies files to modify, and must read encoded domain knowledge (RedwoodSDK routing rules, *D1* migration syntax, *Cloudflare Workers* limitations) before planning. A coder agent creates *git worktrees*, implements features following plans, and writes tests. A QA agent runs test suites, validates against acceptance criteria, and enforces coverage thresholds. A fixer agent analyzes errors and applies fixes when tests fail. A merge agent reviews diffs, ensures no unintended changes, merges worktrees to main, and cleans up.',
            '*Git worktree* isolation enables multiple features to build in parallel without branch conflicts. Each feature gets a clean file tree with no stashing or switching needed. Atomic feature validation happens before merge, and rollback is easy (delete worktree without polluting main branch). Worktrees provide true isolation — branches are pointer moves, worktrees are separate directories. Automatic cleanup removes worktrees after successful merge or too many failed attempts.',
            'Structured handoff protocols pass context between agents. Each agent writes status, modified files, and next steps to a handoff document in the worktree. Subsequent agents read this before starting, preventing agents from overwriting work or missing context. Specialized agents reduce hallucination through narrower context per agent, enforce quality gates through test requirements, and enable autonomous builds without constant supervision.',
            'Encoded domain knowledge prevents *AI* hallucinations. The system encodes patterns in CAPS skills — RedwoodSDK routing rules, *D1* migration syntax, *Cloudflare Workers* limitations. Planning agents must read this knowledge before creating implementation plans.',
          ],
        },
        {
          icon: '✨',
          title: 'Production Deployment',
          paragraphs: [
            'Projects deploy to *Cloudflare Workers* edge platform with zero cold starts, global distribution, sub-10ms latency, and integrated *D1 SQL*. *React 19 Server Components* provide streaming *SSR*, server-first rendering that reduces client bundle size, and built-in async components. RedwoodSDK provides Workers-native routing, *D1* migrations, type-safe environment, and zero-config deployment.',
            'The *CI/CD* pipeline flows from *GitHub* push through *GitHub Actions* to build the *React* app, run tests with enforced coverage thresholds, deploy to *Cloudflare Workers* environments (preview, staging, production), execute *D1* migrations, and apply *Cloudflare Zero Trust* security. Preview environments deploy automatically per branch. Staging enables pre-production validation. Production deploys globally across edge locations.',
            'The build system completes features end-to-end autonomously with approval gates. The self-improvement loop has produced pattern documentation, routing fixes, and cleanup automation contributed back to the template. Frozen specifications reduce anxiety about shifting requirements. Multi-agent quality gates prevent untested or incomplete code from merging.',
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
      'Comprehensive evaluation framework with golden dataset for regression testing',
      'PR open, pending final review and merge',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Shelter staff and vets needed quick answers to clinical questions—symptoms, treatments, dosages—without manually searching through large veterinary textbooks or the Merck Veterinary Manual. Generic *AI* assistants hallucinate veterinary facts and provide **no source traceability**. The shelter already ran Haven (an internal shelter management app on Firebase) and needed an embedded knowledge assistant, not a separate tool.',
            'The requirement was a *RAG* chat interface over veterinary literature directly within Haven, with precise source citations and chunk-level highlighting in a *PDF* viewer. The system needed conversation persistence across sessions and accurate retrieval to minimize hallucination through strong retrieval and reranking.',
          ],
        },
        {
          icon: '🏗️',
          title: 'RAG Pipeline Architecture',
          paragraphs: [
            'I built the system as a self-contained module within the Haven monorepo. The *RAG* backend runs as a *Firebase Cloud Function*. Knowledge stores in *Supabase* with *pgvector* for vector search and a separate *BM25/FTS* index for hybrid retrieval — both vector and full-text search in one database, eliminating external dependencies like Pinecone.',
            'The pipeline flows from user query through *Voyage AI* embedding to *Supabase* hybrid search (*BM25* + vector with *RRF* fusion), then applies sibling chunk boosting (adding neighboring chunks), cross-encoder scoring via *Cohere Rerank API*, dynamic token budget trimming, and finally *OpenAI GPT-4o* streaming with injected chunks and citation instructions. Responses include numbered citation markers.',
            'Sibling chunk boosting adds neighboring chunks after retrieval to restore context lost at chunk boundaries without permanently increasing chunk size (which hurts precision). This provides small precise chunks for retrieval and expanded context for generation. The system uses *Voyage AI* embeddings for better domain performance on veterinary text compared to *OpenAI* embeddings.',
            'Knowledge sources include vet book *PDFs* uploaded to *Firebase Storage*, extracted by a custom *TypeScript* extractor, then chunked, embedded, and stored in *Supabase*. Over **3,000 Merck Veterinary Manual articles** scraped via *Playwright* and *BeautifulSoup* feed into the same store. The custom extractor preserves page number metadata, handles multi-column layouts, and associates chunks with exact page ranges for *PDF* viewer highlighting.',
          ],
        },
        {
          icon: '📄',
          title: 'Split-Panel PDF Viewer',
          paragraphs: [
            'The *React* frontend uses a split-panel layout with chat on the left and *PDF* viewer on the right. Source citations appear as numbered badges in responses; clicking one opens the *PDF* to the correct page with the matched chunk highlighted. The viewer uses *react-pdf* for *React* integration and handles large *PDFs* page-by-page.',
            'Text highlighting across page boundaries presented a challenge. *PDF* chunks sometimes span two pages, but *react-pdf* renders pages independently with no DOM element spanning page boundaries. The system splits chunk highlights into per-page segments and applies each independently.',
            'The *PDF* viewer includes components for page rendering and chunk highlighting with cross-page support, panel layout with scroll-to-page navigation, zoom and navigation controls, and state management. The system maintains page position during window resize by re-scrolling to the target page after resize events. Citation response times improve through blob preloading when citations get clicked.',
            'Conversation persistence uses *Firestore*. The system operates in two retrieval modes: first messages inject top chunks directly into context, while follow-up messages use tool-triggered retrieval when the bot detects topic changes. A debug panel enables inspection of retrieval results.',
          ],
        },
        {
          icon: '✨',
          title: 'Production Quality',
          paragraphs: [
            'The *RAG* evaluation framework uses a golden dataset of Q&A pairs and expected sources to measure context recall, context precision, faithfulness via *LLM*-as-judge, and citation accuracy. Results store for historical comparison, making pipeline tuning quantitative rather than impressionistic.',
            'Hybrid search (*BM25* + vector) consistently outperforms pure vector search on domain-specific text. Cross-encoder reranking via *Cohere Rerank API* provides production-quality reranking without *GPU* infrastructure in *Firebase Functions*. A small candidate set reranked well beats a large candidate set from pure embedding similarity.',
            'The system includes deduplication checks on content hash before database upsert to prevent duplicate chunks. *Supabase* migrations maintain *FTS* indexes, *pgvector* columns for *Voyage* embeddings, search function improvements, and cleanup scripts.',
            'Technical decisions ground in documented research comparing alternatives: embedding model comparisons, *PDF* viewer library evaluations, and *RAG* pipeline approach assessments.',
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
      '5,000+ medical articles scraped and structured with deduplication',
      '10+ hours/week manual work → fully automated',
      'High uptime over 6 months production use',
      'Zero anti-bot detection incidents',
      'Fast incremental updates with checkpoint-based resumption',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Multiple clients needed production-grade web scraping for distinct use cases: (1) *ML* training dataset requiring **5,000+ structured** medical articles from Merck Veterinary Manual; (2) competitive intelligence requiring daily automated review monitoring across Trustpilot and ProvenExpert. Manual extraction was time-consuming (**10+ hours/week** for reviews, **infeasible for 5,000 articles**).',
            'Existing scraping tools (Octoparse, ParseHub) couldn\'t handle *JavaScript*-heavy sites, lacked scheduling, had **no integration** with client infrastructure (Palantir Foundry). Anti-detection requirements—rate limiting, user agent rotation, intelligent retry logic—needed custom implementation.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Dual Pipeline Architecture',
          paragraphs: [
            'I built a *Python*-based scraping framework using *Playwright* for headless browser automation with *JavaScript* execution and *BeautifulSoup* for *HTML* parsing. The system uses async/await for concurrent scraping with parallel browser contexts. Both pipelines deploy to *Palantir Foundry* as scheduled Transforms: medical article scraper for bulk extraction and review monitor for daily incremental updates.',
            'The medical knowledge extraction pipeline discovers articles via sitemap, scrapes concurrently with rate limiting and exponential backoff retry, cleans *HTML* by stripping navigation and ads while preserving structure as markdown, deduplicates via content hashing, validates schema (enforcing non-empty titles, hierarchical categories, valid dates), and outputs structured articles.',
            'The review monitoring system runs on scheduled execution as a Foundry Transform. Trustpilot and ProvenExpert scrapers navigate sites, handle infinite scroll patterns, extract review data (platform, date, rating, title, body, reviewer, company response), and apply incremental update logic by identifying new reviews via date and content hash deduplication. The system sends competitive intelligence alerts for low ratings via *Slack*.',
            'Infinite scroll handling evaluates page height, scrolls to bottom, waits for new content, and loops until height stabilizes. *Playwright* executes *JavaScript* and waits for *AJAX*-loaded content, which standard *HTTP* requests miss.',
          ],
        },
        {
          icon: '🛡️',
          title: 'Anti-Detection Engineering',
          paragraphs: [
            'The system uses stealth techniques to avoid detection: removing webdriver properties via initialization scripts, rotating user agents across realistic browser profiles (Chrome on Windows/macOS/Linux, Firefox variants), applying rate limiting delays between requests, and randomizing viewport sizes to mimic different devices.',
            'Polite scraping with rate limiting and realistic user agents proved sufficient over extended production use with zero detection incidents. Expensive solutions like proxy rotation and captcha solving services remain unnecessary at this scale.',
            'Intelligent retry logic applies exponential backoff on failures. On timeout (likely rate limiting), the system waits, swaps user agent, and retries. Duplicate review detection uses composite content hashing combining date, body text, and reviewer name.',
          ],
        },
        {
          icon: '📊',
          title: 'Production Deployment',
          paragraphs: [
            'The system deploys to *Palantir Foundry* Transforms with native integration for data lineage, scheduling, and access control. The medical article scraper runs as a one-time bulk Transform, while the review monitor runs as a scheduled daily Transform with incremental update logic.',
            'Incremental updates provide faster execution, lower detection risk through fewer requests, and preserve historical data. Checkpoint-based resumption enables long-running scrapes by saving progress after each batch, allowing sequential execution across multiple batches with progress tracking.',
            'The architecture handles *HTML* structure changes through centralized selector configuration, fallback selectors that try multiple options per field, automated alerts on extraction failures via *Slack*, and manual validation sampling. The system ran autonomously over extended production periods with minimal maintenance.',
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
      'Production pipelines extracted with zero Oracle imports',
      'LangSmith Studio visual debugging: rapid prompt iteration',
      'Auto-MCP endpoint enabling n8n integration without custom per-pipeline work',
      'Composable capability protocol pattern validated and documented for all future pipelines',
      'Comprehensive research documentation independently referenceable by team',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Oracle (the company\'s *AI* platform based on SurfSense) had **two custom** *LLM* pipelines tightly coupled to its internals: ticket analysis and podcast generation. Both imported Oracle\'s Foundry *OSDK* service, *LLM* configuration resolver, database sessions, *TTS* services, and *Celery* task invocation directly. They could **only run in-process** inside Oracle\'s *FastAPI* deployment.',
            'This created **three compounding problems**: no visual debugging (LangSmith Studio requires a LangGraph Standalone Server connection, not a custom *FastAPI* deployment), no external access for n8n workflows or other consumers (would require custom per-pipeline integration work), and **no resource isolation** (pipeline batch jobs competed for *CPU* and memory with Oracle\'s interactive chat traffic).',
            'A secondary constraint: subject-matter experts (non-coders who know what a good support response or podcast episode should contain) needed to iterate on pipeline behavior without touching *Python*.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Dual-Runtime Architecture',
          paragraphs: [
            'I built a standalone *Python* pip package housing all deterministic *LLM* pipelines. The package defines composable capability protocols for *LLM* calls, ticket data access, *TTS* services, and retrieval operations. Each pipeline declares exactly which capabilities it needs via protocol composition.',
            'Two context implementations inject the right dependencies at runtime. The direct context provides in-process Oracle execution with low latency, synchronous database sessions, and direct Foundry *OSDK* calls. The *HTTP* context uses environment variables and calls Oracle\'s *API* over *HTTP* for the *LangGraph* Standalone Server deployment, enabling independent scaling, Studio debugging, and *MCP* endpoints.',
            'Pipelines remain pure with no Oracle imports or application dependencies. They interact with the outside world exclusively through context protocols. The same pip package installs in both runtimes; the deployment target determines which context implementation gets injected. Lazy imports keep the package installable without Oracle present.',
            'The deployment flow runs from dev machine through *GitHub* to both Oracle (in-process execution) and *LangGraph* Server (*Docker Compose* deployment on *Hetzner*). The Standalone Server runs *PostgreSQL* for checkpoint storage and *Redis* for streaming. *LangSmith Studio* connects for visual debugging. Auto-*MCP* endpoints enable n8n and external consumers to discover and invoke pipelines without custom integration.',
          ],
        },
        {
          icon: '🔬',
          title: 'Research-Driven Design',
          paragraphs: [
            'Deep-research investigations mapped the complete decision space before architectural decisions. Each produced standalone reference documentation grounded in primary sources: official docs, community forums, and verified production deployments. Key findings eliminated entire candidate architectures before implementation began.',
            'Research confirmed that LangFlow and *LangGraph* bridges don\'t exist due to fundamentally incompatible data models (*JSON* schemas vs *Python* StateGraphs). LangFlow\'s ownership and lack of *LangGraph* installation made integration infeasible. Visual builders have documented scaling problems past moderate complexity.',
            'n8n research revealed architectural limitations: no persistent agent state across workflow executions, no cyclic graph execution, and no mid-reasoning interrupts. Memory nodes store only input/output messages (not tool call messages), which causes agents to hallucinate tool usage. This established the pipeline boundary rule: n8n owns the outer loop (triggers, scheduling, data routing) while *LangGraph* owns the inner loop (persistent state, adaptive reasoning, streaming, human-in-the-loop).',
            'Consumer-first interface design started by sketching ideal pipeline code without Oracle dependencies before defining the interface. This approach produces cleaner, more stable abstractions compared to mirroring implementation details. The interface evolved from monolithic to composable protocols through capability mapping.',
          ],
        },
        {
          icon: '✨',
          title: 'Production Deployment',
          paragraphs: [
            'Production pipelines run in both environments. The ticket analysis pipeline fetches open tickets from Foundry, retrieves structural analysis reports per customer via *RAG*, and generates structured German-language feedback via *LLM*. The podcast pipeline generates transcripts via *LLM* and creates audio via concurrent *TTS* segment generation with *FFmpeg* merging.',
            'Non-coder accessibility uses the *LangGraph* Assistants pattern. Each pipeline exposes configuration with tunable fields (system prompts, model selection, domain-specific parameters). Subject-matter experts create configured variants through Oracle\'s *Next.js* frontend without touching pipeline code. Developers code the graph once with schema; non-coders customize via UI.',
            'Standardized pipeline structure includes graph definition, state management, node implementations, configuration schema, and prompts. This pattern is documented and enforced for all future pipelines.',
            'Custom exception types provide consistent error semantics across both runtimes. Both implementations raise the same exceptions for the same semantic failures. *Celery* task wrappers remain in Oracle\'s codebase while the pip package stays unaware of *Celery*. The Standalone Server\'s managed task queue handles background execution.',
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
      'Zero upstream merge conflicts via stgit methodology over extended production use',
      'Multiple platform targets with automated CI/CD builds',
      'Fast installation via npx with binary download',
      'Enterprise repositories onboarded via GitHub integration',
      'Single-command organizational rollout for complete org onboarding',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'Enterprise needed unified *AI* orchestration merging VibeKanban\'s workflow engine with Claude MPM\'s multi-agent capabilities. Existing tools offered either workflow management OR agent orchestration, **not both**. Forking both projects risked falling behind upstream improvements—**no methodology existed** for maintaining dual forks with custom integrations while tracking upstream changes.',
            'The constraint: **preserve full upstream compatibility**. Both VibeKanban and Claude MPM continued active development. Any fork that diverged permanently would lose community improvements. Traditional *git* workflows (rebase, vendor branches) create tangled histories where conflicts become monolithic merges.',
          ],
        },
        {
          icon: '🏗️',
          title: 'Patch Stack Architecture',
          paragraphs: [
            'I used *stgit* (stacked *git*) for patch management, which maintains patches as a stack on top of upstream branches. Each enterprise customization lives as an independent patch. When upstream updates arrive, the system pops all patches, rebases the upstream branch, and re-applies patches. Conflicts isolate to specific patches rather than becoming monolithic merges.',
            'The dual-fork structure maintains a fork of VibeKanban\'s *TypeScript* workflow engine and a fork of Claude MPM\'s *Rust* multi-agent core. Each maintains its own upstream tracking branch and patch stack. Automated weekly sync workflow fetches both upstreams, pops patches, rebases, re-applies, runs the full test suite, and auto-merges if tests pass or creates a *PR* for manual review if conflicts occur.',
            'The patch stack structure minimizes conflict surface area. Individual patches touch specific subsystems without modifying core execution paths. When conflicts occur, stgit isolates them for surgical resolution rather than sweeping changes.',
          ],
        },
        {
          icon: '🤖',
          title: 'Headless Mode Engineering',
          paragraphs: [
            'Claude MPM originally required an interactive terminal (*TUI*) for agent orchestration. I engineered headless mode via control inversion: instead of the *UI* prompting users, users provide decision hooks that tools call. I added a command override *API* that replaces interactive prompts with programmatic decisions, an event stream *API* that publishes agent lifecycle events (spawned, running, completed, failed), and structured *JSON* logging for *CI/CD* integration.',
            'The integration flow has VibeKanban detect tasks with @agent annotations, spawn headless MPM sessions via executor override, stream MPM lifecycle events to the Kanban *UI*, merge results to workflow state, and continue workflow execution. A custom executor trait bridges both systems.',
            'The executor implementation detects tasks with @agent annotations or command prefixes, spawns headless sessions, sets task context, waits for completion, and collects results. The system uses batched event streaming with buffering, event filtering for state changes only, and backpressure handling to prevent overwhelming the *UI*.',
          ],
        },
        {
          icon: '📦',
          title: 'Cross-Platform Distribution',
          paragraphs: [
            'The production *NPM* package includes pre-built binaries for multiple platforms covering Linux, macOS (Intel and Apple Silicon), and Windows on both x64 and ARM64 architectures. *GitHub Actions* matrix builds cross-compile *Rust* binaries, build *TypeScript* bundles, run integration tests, package binaries, and upload release artifacts. Installation detects platform, downloads the correct binary from *CDN*, caches locally, symlinks to global bin, and validates checksums.',
            'The binary resolution system uses explicit platform detection in post install scripts with validation. The cross-compilation toolchain employs cached toolchains, parallel matrix jobs, platform-specific *Docker* containers, and smoke tests per platform.',
            '*GitHub* organization integration provides one-click *OAuth* access, bulk repository cloning with ignore pattern support, project initialization with templates and workflows, webhook configuration, and team permissions mapping. This enables rapid enterprise onboarding across entire organizations.',
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
      'Multi-year production data merged across MES and measurement systems',
      'High-dimensional feature space reduced via staged importance scoring',
      'Class imbalance handled: random undersampling outperformed SMOTE',
      'Feature importance analysis identified root causes for defects',
      'Full preprocessing pipeline documented with reproducible notebooks',
    ],
    technicalDetails: {
      sections: [
        {
          icon: '🎯',
          title: 'The Challenge',
          paragraphs: [
            'SPAX (industrial screw manufacturer) runs comprehensive quality testing on production batches using a measurement machine (Messautomat) that records dimensional attributes per screw — thread diameter, length, curvature — with pass/fail outcomes. Each production order generates extensive test data. The business question: can we predict pass/fail outcomes and identify which production factors drive failures without relying solely on post-production measurement?',
            'Two data sources existed: *MES* (Manufacturing Execution System) with years of production order metadata (machine, workplace, process step, quantity, material number), and Messautomat with per-screw measurement results across multiple tables containing test metadata and individual attribute measurements.',
          ],
        },
        {
          icon: '🔧',
          title: 'Data Preprocessing & Merging',
          paragraphs: [
            '*MES* preprocessing merged yearly tables, removed absent and irrelevant columns, cleaned entries with invalid identifiers, reformatted German locale floats, and performed type-casting. Messautomat preprocessing dropped redundant tables, created boolean flags for measurement types, removed entries with missing identifiers or invalid machine numbers, encoded test types to integers, and joined tables on foreign keys.',
            'The merge challenge revealed that *MES* and Messautomat couldn\'t be cleanly joined at row level. Production-to-measurement delays prevented reliable linking of individual records. Only the process step field proved unambiguous for joining. Process step labels were unified and re-encoded with frequency-based integer encoding.',
            'The core assumption that records could be fully joined proved incorrect, changing the feature space approach. Starting simple with minimal features surfaced this early. The final merged dataset combined Messautomat measurements with process step metadata.',
          ],
        },
        {
          icon: '🤖',
          title: 'ML Pipeline & Class Imbalance',
          paragraphs: [
            'Feature engineering extracted screw properties from material numbers including product group, material, surface finish, diameter, and length. One-hot encoding all categoricals produced a high-dimensional feature space. The system used sparse matrix storage since dense representation would be memory-prohibitive.',
            'Staged feature reduction applied manual removal of irrelevant features, elimination of rare test categories, and importance score-based feature selection via Random Forest. Final preprocessing included *Z-score* normalization, one-hot encoding, and sparse storage.',
            'The dataset exhibited significant class imbalance. Three mitigation strategies were compared: class weight adjustment (underperformed), *SMOTE* oversampling (computationally expensive with marginal gain), and random undersampling (best precision-recall tradeoff, selected). The large dataset size made undersampling viable without losing statistical power.',
            'Model comparison evaluated *Naive Bayes* (poor on imbalanced high-dimensional data), *Logistic Regression* (too linear), *XGBoost* (viable candidate), and *Random Forest* (best performance, selected). Two prediction strategies were compared: regression predicting measured values then deriving pass/fail from tolerance bounds (less effective) versus direct classification with undersampling (better performance, selected). Hyperparameter tuning used grid search on sample data before training the final model on the full dataset.',
          ],
        },
        {
          icon: '📊',
          title: 'Analysis & Outcomes',
          paragraphs: [
            'Feature importance analysis identified which production and material features most strongly predict failures, enabling root cause analysis. Precision-recall tradeoff analysis informed model selection. Investigation of measurement count discrepancies revealed that the Messautomat table represents measurement sessions covering samples rather than individual screw records.',
            'The final deliverables include a working *Random Forest* classifier for pass/fail prediction, feature importance analysis identifying key drivers, and a full preprocessing and feature engineering pipeline documented in reproducible notebooks. Recommendations for better data collection include coherent column naming, clear system linkage, and consistent category labels.',
            'Key lessons: data mergeability must be verified before scoping *ML* projects. Sparse matrix representation is essential when one-hot encoding high-cardinality categoricals at scale, as dense representation would be prohibitively slow.',
          ],
        },
      ],
    },
  },
];
