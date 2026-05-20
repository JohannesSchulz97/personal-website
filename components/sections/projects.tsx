"use client";

import { Github, ExternalLink, Youtube, FileText, Play, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionHeading from "@/components/section-heading";
import { useState } from "react";

export default function ProjectsSection() {
  const [openDemo, setOpenDemo] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleProject = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  return (
    <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-[4.5rem] lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lighter lg:sr-only">
          Projects
        </h2>
      </div>
      <div className="hidden lg:block mb-8">
        <SectionHeading number="02">Projects</SectionHeading>
      </div>
      <p className="text-slate mb-12 leading-relaxed lg:text-[16px]">
        A selection of my work spanning enterprise platform migrations, AI systems,
        and production infrastructure — from reverse-engineering Palantir Foundry to
        building self-hosted platforms and computer vision pipelines.
      </p>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
        {/* Project 0: Foundry Migration */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex-1">
              <CardTitle className="mb-3">Enterprise Platform Migration</CardTitle>
              <CardDescription>
                Decommissioned €100k/month Palantir Foundry enterprise platform and migrated 9.5 TB of production data
                with 8,435 resources to self-hosted infrastructure at €200/month — zero downtime, complete functionality preserved
              </CardDescription>
            </div>
            <img src="/project-icons/palantir2.jpg" alt="Palantir Foundry" className="w-12 h-12 rounded-lg flex-shrink-0 object-cover" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Playwright</Badge>
              <Badge variant="teal">PostgreSQL</Badge>
              <Badge variant="teal">Docker</Badge>
              <Badge variant="teal">Dagster</Badge>
              <Badge variant="teal">Cloudflare Zero Trust</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ 99.8% cost reduction: €100,000/month → €200/month</li>
                <li>✓ 9.5 TB migrated across 1,676 datasets with zero data loss</li>
                <li>✓ 362 pipeline definitions captured, 204 repositories cloned with full Git history</li>
                <li>✓ 6 production services running with zero downtime incidents over 6 months</li>
                <li>✓ Zero non-idiomatic code merged to production after blocking hooks introduced</li>
                <li>✓ Complete vendor de-risking from proprietary platform dependency</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(0)}
              className="w-full"
            >
              {expandedProjects.has(0) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(0) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    The company ran its entire data infrastructure on Palantir Foundry at <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">€100k/month</span> — unsustainable for a mid-sized business.
                    The closed, proprietary ecosystem had no documented bulk export capability but held <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">8,435 resources</span> across
                    341 custom object types, <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">9.5 TB</span> across 2,320 datasets, 362 transformation pipelines, and 204 code repositories.
                  </p>
                  <p>
                    The requirement: migrate everything to self-hosted infrastructure with zero downtime and complete data preservation. No official export API existed — the only way out was reverse engineering.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🔓</span>
                    <span>Reverse Engineering the Platform</span>
                  </p>
                  <p className="mb-3">
                    I built a 5,045-line Python framework using **Playwright** to reverse-engineer Foundry's internal APIs. The approach: maintain authenticated browser sessions,
                    intercept network traffic to discover undocumented GraphQL and REST endpoints, extract Bearer tokens from the traffic, then use those tokens for programmatic
                    API access that bypasses the UI entirely.
                  </p>
                  <p className="mb-3">
                    Twelve specialized scripts handled different extraction tasks — lineage discovery (building dependency graphs via GraphQL interception), pipeline extraction
                    (JSON exports ranging from 43 KB to 4.2 MB per pipeline), dataset streaming with PostgreSQL, repository cloning with Git automation, and binary media downloads.
                    Each script followed the same patterns: persistent browser sessions for auth, batched API calls to avoid rate limits, idempotent design for interruption recovery.
                  </p>
                  <p>
                    The extraction system included binary split error isolation 🔍: when a 1,000-row batch failed, it would automatically narrow down to the single problematic row
                    without manual intervention. Primary key tracking enabled multi-day extractions to resume from checkpoint on failure. All 12 scripts ran on the target Hetzner
                    server via tmux — multi-day extractions couldn't block a local terminal.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🏗️</span>
                    <span>Infrastructure Rebuild</span>
                  </p>
                  <p className="mb-3">
                    Replaced the €100k/month SaaS with a single Hetzner CCX63 server: 48-core AMD EPYC, 192 GB RAM, 960 GB NVMe, 1 Gbit/s network — <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">€200/month</span>.
                    Deployed 6 production services from scratch: Dagster (pipeline orchestration), Twenty (CRM), Coder (remote dev workspaces), n8n (workflow automation), SurfSense (AI research), LangGraph (agent orchestration).
                  </p>
                  <p className="mb-3">
                    Each service got its own PostgreSQL instance — isolated resource limits, independent backup schedules, no connection pool contention. Security hardened 🔒:
                    all database ports bound to localhost only, SSH key-only auth, UFW firewall (ports 22/80/443 only), automated SSL via Certbot. Nginx reverse proxy handled
                    SSL termination and WebSocket support for Dagster UI.
                  </p>
                  <p>
                    Cloudflare Zero Trust provided email-based authentication for <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">*.tob.sh</span> wildcard — no client VPN setup required, complete audit logs included.
                    CI/CD pipeline: GitHub Actions builds Docker images on push, Watchtower auto-deploys to server within <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">7 minutes</span> ⚡.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🧠</span>
                    <span>Developer Platform</span>
                  </p>
                  <p className="mb-3">
                    Built a Dagster orchestration platform with blocking hook enforcement (same pattern as CS Automation project). PreToolUse hook intercepts file operations
                    on the <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">pipelines/</span> directory — first access per session is blocked until <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">SKILL.md</span> is read, then every 5th access gets blocked for periodic reminder.
                    Result: impossible to modify pipeline code without understanding Dagster conventions.
                  </p>
                  <p className="mb-3">
                    Created 40+ reference guides covering asset patterns, automation (schedules, sensors, declarative conditions), CLI operations, and 40+ tool integrations.
                    Dual dev/prod environments: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">main</span> branch deploys to production database, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">dev</span> branch deploys to isolated dev database with no production credentials.
                    Shared run queue (max 4 concurrent) prevents resource exhaustion.
                  </p>
                  <p>
                    The team autonomously rebuilt 362 pipelines using the extracted Foundry JSON references as rebuild specs. Schema translation: 341 Foundry object types → 305 production
                    PostgreSQL tables with 291 foreign key relationships preserved. Generated 6,338 lines of DDL, 876 lines of FK constraints, 4,808 total columns. Automated type
                    mapping handled <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">ARRAY</span>/<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">GEOHASH</span>/<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">MEDIA_REFERENCE</span>/<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">VECTOR</span> → PostgreSQL equivalents.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 1: Self-Hosted Production Infrastructure */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex-1">
              <CardTitle className="mb-3">Self-Hosted Production Infrastructure</CardTitle>
              <CardDescription>
                Git-driven deployment platform running ~10 production services for ~5 developers on a single Hetzner dedicated server —
                replacing enterprise SaaS with fully owned infrastructure featuring automated deployments, multi-service orchestration, and comprehensive backup strategy
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Docker</Badge>
              <Badge variant="teal">GitHub Actions</Badge>
              <Badge variant="teal">Watchtower</Badge>
              <Badge variant="teal">PostgreSQL</Badge>
              <Badge variant="teal">Nginx</Badge>
              <Badge variant="teal">BorgBackup</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ ~5 developers deploying without SSH access via automated pipeline</li>
                <li>✓ 10 production services running with automatic SSL renewal</li>
                <li>✓ Daily automated backups with local + off-site redundancy</li>
                <li>✓ Complete infrastructure reproducible from single Git repository</li>
                <li>✓ Zero manual deployment steps — sub-7-minute push-to-live cycle</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(1)}
              className="w-full"
            >
              {expandedProjects.has(1) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(1) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p>
                    Post-Foundry migration, the company needed a production-grade platform to run everything: data orchestration, workflow automation, CRM, AI pipelines,
                    development environments. Everything had to be secure, maintainable, cost-effective, and built from scratch — no pre-existing infrastructure.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🏗️</span>
                    <span>Zero-SSH Deployment</span>
                  </p>
                  <p className="mb-3">
                    Built a fully automated deployment pipeline: <span className="text-slate-lighter">developer push → GitHub Actions → GHCR → Watchtower</span>. Watchtower polls the GitHub Container Registry
                    every 5 minutes, detects new image digests, pulls updated images, and recreates containers automatically. Developers deploy without SSH access — just <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">git push</span>.
                  </p>
                  <p>
                    The <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">tob-infra</span> repository is the single source of truth: Docker Compose stacks, nginx configs, systemd units, backup scripts, cron schedules, and a
                    470+ line runbook documenting every infrastructure decision. Complete infrastructure reproducibility from one Git repository.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>⚙️</span>
                    <span>Production Stack</span>
                  </p>
                  <p className="mb-4">
                    Single Hetzner dedicated server (16-core AMD EPYC, 64 GB RAM, 338 GB SSD, <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">€200/month</span>) running <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">10 services</span> for
                    <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono ml-1">~5 developers</span>. Seven isolated PostgreSQL instances (one per service) — independent backups, no connection pool contention. All database
                    ports bound to <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">127.0.0.1</span> only 🔒.
                  </p>

                  {/* Tech Stack Icons */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/dagster.jpeg" alt="Dagster" className="w-6 h-6 rounded" />
                      <span className="text-xs">Dagster</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/twenty.png" alt="Twenty CRM" className="w-6 h-6 rounded" />
                      <span className="text-xs">Twenty CRM</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/n8n-icon.webp" alt="n8n" className="w-6 h-6 rounded bg-white" />
                      <span className="text-xs">n8n</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/coder.png" alt="Coder" className="w-6 h-6 rounded" />
                      <span className="text-xs">Coder</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/surfsense.png" alt="Oracle/SurfSense" className="w-6 h-6 rounded" />
                      <span className="text-xs">Oracle</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/listmonk.png" alt="Listmonk" className="w-6 h-6 rounded" />
                      <span className="text-xs">Listmonk</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/beszel.jpeg" alt="Beszel" className="w-6 h-6 rounded" />
                      <span className="text-xs">Beszel</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-navy-lighter rounded-lg">
                      <img src="/project-icons/hetzner.png" alt="Hetzner" className="w-6 h-6 rounded" />
                      <span className="text-xs">Hetzner</span>
                    </div>
                  </div>

                  <p>
                    Nginx reverse proxy handles SSL termination with Let's Encrypt auto-renewal, WebSocket upgrades for Twenty/n8n/Coder, bearer token auth for LangGraph,
                    and multi-location routing for Oracle (frontend/backend split). Cloudflare Zero Trust provides email-based authentication for <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">*.tob.sh</span> wildcard —
                    no VPN client setup, complete audit logs.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>💾</span>
                    <span>Backup Architecture</span>
                  </p>
                  <p className="mb-3">
                    Auto-discovery backup system: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">pg_isready</span> scans for running PostgreSQL containers, auto-initializes Borg repositories. Daily 04:00 CET,
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">backup_pg.py</span> runs <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">pg_dump</span>/<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">pg_dumpall</span> per service, then BorgBackup streams to Hetzner Storage Box (10 TB co-located) with
                    zstd,3 compression, encryption, and 10 MB/s rate limiting.
                  </p>
                  <p>
                    Off-site backup: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">pg_dump</span> streams directly to Cloudflare R2 via S3 multipart upload (64 MB parts) — no temp files on disk. All Docker containers
                    log to systemd-journald (searchable, 2 GB / 90-day retention). Daily 04:30 CET, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">backup_configs.py</span> collects all Docker Compose files, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">.env</span> files,
                    and configs from <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/opt/</span> and backs them to the Storage Box.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>✨</span>
                    <span>Developer Experience</span>
                  </p>
                  <p>
                    Dagster dual-environment: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">main</span> branch deploys to production database, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">dev</span> branch to isolated dev database with no production credentials.
                    Coder provides remote workspaces at <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">*.coder.tob.sh</span> (browser/SSH-accessible, no local setup required). Cross-stack Docker networking via shared networks lets
                    services communicate across separate Compose stacks. Beszel monitoring provides lightweight server metrics with Docker container visibility via Unix socket.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Left Column Projects - Hidden by default */}
        {showAllProjects && (
          <>
        {/* Project 2: OpenClaw Agents */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex-1">
              <CardTitle className="mb-3">OpenClaw Agents</CardTitle>
              <CardDescription>
                19 dedicated Slack agents for distributed engineering team across 5 countries,
                each with persistent vector memory, GitHub activity context, and timezone-aware scheduled check-ins
              </CardDescription>
            </div>
            <img src="/project-icons/openclaw.jpeg" alt="OpenClaw" className="w-12 h-12 rounded-lg flex-shrink-0 object-cover" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">OpenClaw</Badge>
              <Badge variant="teal">OpenAI Codex</Badge>
              <Badge variant="teal">QMD Vector Memory</Badge>
              <Badge variant="teal">GitHub API</Badge>
              <Badge variant="teal">GNU Stow</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ 19 autonomous dev agents with persistent memory across Germany and Georgia teams</li>
                <li>✓ Manager agent auto-detects bottlenecks and reports team status</li>
                <li>✓ Single-command provisioning for new agent deployment</li>
                <li>✓ GitHub activity context integration for code-aware assistance</li>
                <li>✓ Timezone-aware scheduled check-ins for distributed coordination</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(2)}
              className="w-full"
            >
              {expandedProjects.has(2) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(2) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    A distributed engineering team (<span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">19 developers</span> across <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">5 countries</span>) used Slack for all communication but had no structured
                    way to track daily work, surface blockers before they became problems, or give the tech lead visibility without micromanaging.
                    No AI platform existed yet.
                  </p>
                  <p>
                    Every developer needed a proactive assistant that understood their context: what they worked on yesterday, their GitHub activity,
                    timezone differences, and actual working hours. The platform had to deploy automatically from GitHub without SSH access, with
                    strict separation between development and production environments.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🏗️</span>
                    <span>Infrastructure & Deployment</span>
                  </p>
                  <p className="mb-3">
                    I set up OpenClaw on a Mac mini in Switzerland and built a one-way deployment pipeline: <span className="text-slate-lighter">dev machine → GitHub →
                    self-hosted Actions runner</span>. Push to main triggers <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">deploy.sh</span>, which pulls latest code, validates architectural
                    invariants, syncs agent type files via <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">sync-agents.sh</span>, deploys configuration using GNU Stow (symlinks from repo into <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">~/.openclaw/</span>),
                    reconciles cron jobs declaratively with <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">apply-cron.sh</span>, and restarts the gateway if needed.
                  </p>
                  <p className="mb-3">
                    The host has git hooks preventing commits and branch switches—it always tracks main 🔒. Agent files (personality, operating manual,
                    scripts) live in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">types/</span> and get copied to each agent's workspace. Runtime state (conversations, memory, credentials) never touches
                    GitHub. This separation ensures credentials stay on-host, conversation privacy is preserved, and the repo remains the single source
                    of truth for configuration.
                  </p>
                  <p>
                    Adding a new developer takes one command: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">create-agent.sh</span> generates the directory structure, substitutes templates (agent identity,
                    user info), registers Slack bindings, adds to the allowlist, creates placeholder cron entries, and deploys via stow 🔄. The inverse
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">remove-agent.sh</span> cleans everything declaratively with flock-based locking to prevent race conditions (discovered when 3 simultaneous
                    agent creations generated duplicate cron jobs within 12 milliseconds).
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🧠</span>
                    <span>Multi-Agent Architecture</span>
                  </p>
                  <p className="mb-3">
                    Each developer gets a dedicated assistant living in their Slack DMs. Agents maintain two-layer memory 💾: <strong>LCM</strong> (Lossless Claw) manages
                    session history via DAG-based summarization to prevent context window overflow, while <strong>QMD</strong> (vector-backed storage) provides semantic
                    search across persistent markdown files written by daily cron jobs. Every evening, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">work-report.sh</span> fetches GitHub activity via Search
                    API (not Events API, which misses private repos) and writes <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">memory/reports/YYYY-MM-DD.md</span>. Every morning, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">daily-summary.sh</span> distills
                    yesterday's DM conversations into <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">memory/YYYY-MM-DD.md</span>. Both are indexed by QMD, giving agents long-term recall across sessions.
                  </p>
                  <p className="mb-3">
                    Three daily check-ins ⏰ (morning planning, midday progress, evening recap) are timed to each developer's work schedule. Before sending,
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">availability-guard.sh</span> checks for time-off entries and working-day patterns. GitHub activity is included in check-in context so agents
                    reference actual work. Friday evening uses "carry over to next week" phrasing; Monday morning references "last week."
                  </p>
                  <p>
                    A manager agent monitors all 19 developer agents from <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">#tech-management</span> 👁️. It runs hourly checks for bottlenecks (agents stuck in loops,
                    3+ missed check-ins) and produces morning/evening status reports. Agents run GPT-5.4 (Codex) for both cron and interactive modes—unified
                    model eliminates personality drift. GLM-5 (202K context) via Fireworks is registered as fallback.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>✨</span>
                    <span>Developer Experience</span>
                  </p>
                  <p className="mb-3">
                    Bootstrap happens on first contact. The agent introduces itself, collects preferred name and communication style, asks about working
                    hours/timezone/weekend availability, writes <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">work-schedule.json</span>, creates the three cron jobs, and marks completion with
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">.BOOTSTRAP.md.done</span> (deletion would cause stow to recreate the file). From that point forward, all check-ins respect the developer's
                    actual schedule—no 3 AM messages for someone in a different timezone.
                  </p>
                  <p>
                    Agents can generate images via Gemini Nano Banana API (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">generate-image.sh</span>), create GitHub issues with duplicate detection
                    (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">create-issue.sh</span> searches open issues before creating), and comment on existing issues. Zoom transcript delivery 🎙️ is opt-in:
                    developers run <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">enable-twenty-zoom-transcripts.sh</span>, and when Twenty CRM receives a Zoom webhook, OpenClaw's hook transform routes
                    the transcript to the developer's DM as a <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">.txt</span> attachment.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 4: LLM Pipeline Framework */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="mb-3">LLM Pipeline Framework</CardTitle>
            <CardDescription>
              Standalone Python pip package for deterministic multi-step LLM pipelines running both in-process for low latency
              and on LangGraph Standalone Server for visual debugging and MCP endpoint exposure — same code, zero duplication, different runtimes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">LangGraph</Badge>
              <Badge variant="teal">LangChain</Badge>
              <Badge variant="teal">LangSmith</Badge>
              <Badge variant="teal">MCP</Badge>
              <Badge variant="teal">FastAPI</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ 2 production pipelines extracted with zero Oracle imports</li>
                <li>✓ LangSmith Studio visual debugging: prompt iteration from minutes to seconds</li>
                <li>✓ Auto-MCP endpoint enabling n8n integration without custom per-pipeline work</li>
                <li>✓ Composable capability protocol pattern validated and documented for all future pipelines</li>
                <li>✓ 6 research reference documents produced — independently referenceable by team</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(4)}
              className="w-full"
            >
              {expandedProjects.has(4) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(4) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    Oracle (the company's AI platform based on SurfSense) had two custom LLM pipelines tightly coupled to its internals: ticket analysis
                    and podcast generation. Both imported Oracle's Foundry OSDK service, LLM configuration resolver, database sessions, TTS services, and
                    Celery task invocation directly. They could only run in-process inside Oracle's FastAPI deployment.
                  </p>
                  <p className="mb-3">
                    This created three compounding problems: no visual debugging 🔍 (LangSmith Studio requires a LangGraph Standalone Server connection, not
                    a custom FastAPI deployment), no external access for n8n workflows or other consumers 🔌 (would require custom per-pipeline integration
                    work), and no resource isolation 🏋️ (pipeline batch jobs competed for CPU and memory with Oracle's interactive chat traffic).
                  </p>
                  <p>
                    A secondary constraint: subject-matter experts (non-coders who know what a good support response or podcast episode should contain)
                    needed to iterate on pipeline behavior without touching Python.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🏗️</span>
                    <span>Dual-Runtime Architecture</span>
                  </p>
                  <p className="mb-3">
                    I built <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">tob-llm-pipelines</span>, a standalone Python pip package housing all deterministic LLM pipelines. The package defines
                    <strong>composable capability protocols</strong> (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">LLMCapability</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">TicketDataCapability</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">TTSCapability</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">RetrievalCapability</span>). Each pipeline
                    declares exactly which capabilities it needs via protocol composition: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">TicketAnalyseContext = LLMCapability & TicketDataCapability</span>.
                  </p>
                  <p className="mb-3">
                    Two context implementations inject the right dependencies at runtime. <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">DirectPipelineContext</span> provides direct service access for
                    in-process Oracle execution—low latency, synchronous database sessions, direct Foundry OSDK calls. <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">HttpPipelineContext</span> uses environment
                    variables and calls Oracle's API over HTTP for the LangGraph Standalone Server—independent scaling, Studio debugging, MCP endpoints.
                  </p>
                  <p className="mb-3">
                    Pipelines are pure 🧪—no Oracle imports, no <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">app.*</span> dependencies. They interact with the outside world exclusively through their
                    context protocols. The same pip package installs in both runtimes; the deployment target determines which context implementation gets
                    injected. Lazy imports (inside method bodies in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">DirectPipelineContext</span>, never at module level) keep the package installable without
                    Oracle present.
                  </p>
                  <p>
                    Deployment flow: <span className="text-slate-lighter">dev machine → GitHub → Oracle (in-process DirectPipelineContext) + LangGraph Server (HttpPipelineContext via Docker
                    Compose)</span>. The Standalone Server runs on Hetzner with 3 containers: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">langgraph-api</span>, PostgreSQL (LangGraph checkpoints on
                    separate database), Redis (streaming on separate database number). LangSmith Studio connects for visual debugging. Auto-MCP endpoint at
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/mcp</span> enables n8n and external consumers to discover and invoke pipelines with zero custom integration.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🔬</span>
                    <span>Research-Driven Design</span>
                  </p>
                  <p className="mb-3">
                    Five targeted deep-research investigations 📚 mapped the complete decision space before any architectural decisions. Each produced a
                    standalone reference document grounded in primary sources—official docs, GitHub issues, community forums, verified production deployments.
                    Key findings eliminated entire candidate architectures before implementation began.
                  </p>
                  <p className="mb-3">
                    The LangFlow→LangGraph bridge doesn't exist and won't exist—GitHub issues #9216 and #4090 closed as "not planned." Data models are
                    fundamentally incompatible (LangFlow's JSON schemas vs. LangGraph's Python StateGraphs). LangFlow is DataStax/IBM; <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">langgraph</span> isn't
                    even installed in LangFlow's project. Visual builders have documented scaling problems past moderate complexity.
                  </p>
                  <p className="mb-3">
                    n8n has architectural ceilings: no persistent agent state across workflow executions, no cyclic graph execution, no mid-reasoning
                    interrupts. GitHub #14361 documents memory nodes storing only input/output messages (not tool call messages), causing agents to
                    hallucinate tool usage. This established the <strong>pipeline boundary rule</strong>: n8n owns the outer loop (triggers, scheduling,
                    data routing), LangGraph owns the inner loop (persistent state, adaptive reasoning, streaming, human-in-the-loop).
                  </p>
                  <p>
                    Consumer-first interface design 🎨: I sketched ideal pipeline node code first ("what should this look like with no Oracle imports?")
                    before defining the interface. Working from Oracle's coupling map would have mirrored implementation details rather than conceptual needs.
                    This approach consistently produces cleaner, more stable abstractions—confirmed when the initial monolithic interface evolved to
                    composable protocols after mapping which capabilities each pipeline actually uses.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>✨</span>
                    <span>Production Deployment</span>
                  </p>
                  <p className="mb-3">
                    Two production pipelines now run in both environments. <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">ticket_analyse</span> has 3 sequential nodes: fetch open tickets from Foundry
                    (configurable max), retrieve structural analysis reports per customer via RAG, generate structured German-language feedback via LLM.
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">podcaster</span> has 2 nodes: generate transcript via LLM, create audio via concurrent TTS segment generation → FFmpeg merge (voice mapping
                    per provider: Kokoro for self-hosted, ElevenLabs for cloud).
                  </p>
                  <p className="mb-3">
                    Non-coder accessibility uses the LangGraph Assistants pattern 🎛️: each pipeline exposes a <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">Configuration</span> dataclass with tunable fields
                    (system prompts, model selection, domain-specific parameters). Subject-matter experts create configured variants through Oracle's Next.js
                    frontend without touching pipeline code. Developer codes the graph once with a schema; non-coders customize via UI.
                  </p>
                  <p className="mb-3">
                    Standardized 6-file pipeline structure: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">graph.py</span> (StateGraph definition), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">state.py</span> (dataclass State), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">nodes.py</span> (node
                    implementations), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">configuration.py</span> (Assistants schema), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">prompts.py</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">__init__.py</span>. This pattern is documented and enforced
                    for all future pipelines.
                  </p>
                  <p>
                    Custom exception types (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">PipelineDataError</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">PipelineLLMError</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">PipelineTTSError</span>) provide consistent error semantics
                    across both runtimes—both implementations raise the same exceptions for the same semantic failures. Celery task wrappers remain in
                    Oracle's codebase; the pip package is unaware of Celery. On the Standalone Server, the Agent Server's managed task queue handles
                    background execution.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 5: TOB Vibe Kanban */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="mb-3">TOB Vibe Kanban</CardTitle>
            <CardDescription>
              Advanced dual-fork architecture enabling autonomous AI agent orchestration at scale through
              sophisticated patch management, seamless GitHub integration, and cross-platform distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Rust</Badge>
              <Badge variant="teal">TypeScript</Badge>
              <Badge variant="teal">stgit</Badge>
              <Badge variant="teal">NPM</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ Zero upstream merge conflicts via stgit methodology (6 months production)</li>
                <li>✓ 6 platform targets with automated CI/CD builds</li>
                <li>✓ Sub-3-minute installation via npx (including binary download)</li>
                <li>✓ 15+ enterprise repositories onboarded via GitHub integration</li>
                <li>✓ Single-command organizational rollout: npx tob-vibe-kanban init &lt;org&gt;</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(5)}
              className="w-full"
            >
              {expandedProjects.has(5) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(5) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    Enterprise needed unified AI orchestration merging VibeKanban's workflow engine with Claude MPM's multi-agent capabilities. Existing
                    tools offered either workflow management OR agent orchestration, not both. Forking both projects risked falling behind upstream
                    improvements—no methodology existed for maintaining dual forks with custom integrations while tracking upstream changes.
                  </p>
                  <p>
                    The constraint: preserve full upstream compatibility. Both VibeKanban and Claude MPM continued active development. Any fork that
                    diverged permanently would lose community improvements. Traditional git workflows (rebase, vendor branches) create tangled histories
                    where conflicts become monolithic merges.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🏗️</span>
                    <span>Patch Stack Architecture</span>
                  </p>
                  <p className="mb-3">
                    I used <strong>stgit</strong> (stacked git) for patch management—maintains patches as a stack on top of upstream branches 📚. Each
                    enterprise customization lives as an independent patch: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">01-headless-mode.patch</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">02-executor-override-api.patch</span>,
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">03-github-org-integration.patch</span>. When upstream updates arrive, pop all patches (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">stg pop -a</span>), rebase upstream
                    branch, re-apply patches (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">stg push -a</span>). Conflicts are isolated to specific patches, not monolithic merges.
                  </p>
                  <p className="mb-3">
                    Dual-fork structure: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">tob-vibe-kanban</span> (fork of VibeKanban's TypeScript workflow engine) and <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">tob-mpm</span> (fork of Claude
                    MPM's Rust multi-agent core). Each maintains its own upstream tracking branch and stgit patch stack. Automated weekly sync workflow 🔄:
                    fetch both upstreams → pop patches → rebase → re-apply → run full test suite → auto-merge if tests pass, create PR for manual review
                    if conflicts.
                  </p>
                  <p>
                    Patch stack structure minimizes conflict surface area. <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">01-headless-mode.patch</span> only touches CLI initialization, not core agent logic.
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">02-executor-override-api.patch</span> adds trait definitions without modifying existing execution paths. When conflicts occur, stgit isolates
                    them—resolution is surgical, not sweeping.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🤖</span>
                    <span>Headless Mode Engineering</span>
                  </p>
                  <p className="mb-3">
                    Claude MPM originally required interactive terminal (TUI) for agent orchestration. I engineered headless mode via control inversion 🔄:
                    instead of "UI prompts user," design "user provides decision hooks, tool calls them." Added command override API (replaces interactive
                    prompts with programmatic decisions), event stream API (publishes agent lifecycle events: spawned, running, completed, failed), and
                    structured JSON logging for CI/CD integration.
                  </p>
                  <p className="mb-3">
                    Integration flow: <span className="text-slate-lighter">VibeKanban detects task with @agent annotation → spawns headless MPM session via executor override → MPM
                    lifecycle events stream to Kanban UI → results merge to workflow state → workflow continues</span>. Custom executor trait bridges both
                    systems:
                  </p>
                  <p className="mb-3">
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">TaskExecutor</span> trait with <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">can_handle()</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">execute()</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">stream_progress()</span> methods. <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">MPMExecutor</span> implementation
                    detects tasks with <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">@agent</span> annotation or <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">mpm</span> command prefix, spawns headless session, sets task context, waits for completion,
                    collects results. Early implementation streamed every log line as separate events—overwhelmed VibeKanban UI, caused memory leaks. Fixed
                    with batched event streaming (100ms buffer), event filtering (only state changes, not verbose logs), backpressure handling (pause MPM if
                    VibeKanban can't keep up).
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>📦</span>
                    <span>Cross-Platform Distribution</span>
                  </p>
                  <p className="mb-3">
                    Production NPM package with pre-built binaries for <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">6 platforms</span>: linux-x64/arm64, darwin-x64/arm64 (macOS Intel/Apple Silicon),
                    win32-x64/arm64. GitHub Actions matrix builds cross-compile Rust binaries, build TypeScript bundles, run integration tests, package
                    binaries, upload release artifacts. Installation: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">npm install -g tob-vibe-kanban</span> → detects platform → downloads correct binary from
                    CDN → caches in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">~/.tob-vibe-kanban/</span> → symlinks to global bin → validates checksum.
                  </p>
                  <p className="mb-3">
                    Initial NPM binary resolution used <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">optionalDependencies</span>—unreliable on ARM Macs (downloaded wrong platform). Fixed with explicit
                    platform detection in postinstall script: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">{'const platform = `${os.platform()}-${os.arch()}`'}</span>, validate binary exists, throw if
                    missing. Cross-compilation toolchain initially timed out on GitHub Actions—solved with cached toolchains (sccache), parallel matrix jobs,
                    platform-specific Docker containers, smoke tests per platform.
                  </p>
                  <p>
                    GitHub organization integration 🔗: one-click OAuth GitHub App for org access, bulk repo cloning (respects <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">.gitignore</span>, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">.tobignore</span>
                    patterns), project initialization (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">CLAUDE.md</span> templates, workflows, pre-commit hooks), webhook configuration, team permissions mapping
                    (GitHub teams → TOB roles). Reduces enterprise onboarding from 40 hours manual setup to 30 minutes automated: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">npx tob-vibe-kanban
                    init &lt;org&gt;</span> onboards entire organization.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 10: CAPS/TIDE */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="mb-3">CAPS/TIDE Orchestration Platform</CardTitle>
            <CardDescription>
              Enterprise-scale AI development platform enabling production applications through natural language — combining frozen specifications,
              multi-agent builds in git worktrees, and self-improving feedback loops
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Cloudflare Workers</Badge>
              <Badge variant="teal">React Server Components</Badge>
              <Badge variant="teal">Git Worktrees</Badge>
              <Badge variant="teal">Multi-Agent AI</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ Eliminated scope creep: 0 mid-sprint requirement changes after DESIGN.md freezing (previously 3-5 per sprint)</li>
                <li>✓ 15+ projects built using CAPS framework</li>
                <li>✓ 40+ upstream improvements contributed back to template</li>
                <li>✓ 70%+ test coverage enforced via CI gates</li>
                <li>✓ Sub-10ms global latency via Cloudflare Workers edge deployment</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(10)}
              className="w-full"
            >
              {expandedProjects.has(10) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(10) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    AI-assisted development produces "vibe coding"—unstructured workflows causing scope creep and technical debt. Teams need disciplined
                    scrum cycles with AI orchestration. Without frozen specifications, AI-assisted builds drift mid-sprint as requirements change
                    conversationally. No existing system connects <span className="text-slate-lighter">conversational design → structured planning → autonomous implementation →
                    self-improvement</span>.
                  </p>
                  <p>
                    Goal: eliminate scope creep through frozen PRD enforcement, automate complete scrum cycles from design to deployment, enable parallel
                    autonomous builds with git worktree isolation, create self-improving system where every project makes CAPS better for all users.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🔄</span>
                    <span>Scrum Cycle Automation</span>
                  </p>
                  <p className="mb-3">
                    Built self-improving AI orchestration system enforcing scrum discipline through four core slash commands. <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/design</span>: Socratic
                    questioning produces frozen PRD—specialized design agent asks probing questions, iterative refinement, captures problem statement/user
                    personas/core features/technical constraints/success metrics, outputs frozen <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">DESIGN.md</span> preventing scope creep, extracts template
                    variables for initialization.
                  </p>
                  <p className="mb-3">
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/breakdown</span>: INVEST-compliant issue generation—parses <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">DESIGN.md</span> into discrete deliverables, applies INVEST criteria
                    (Independent, Negotiable, Valuable, Estimable, Small, Testable), generates acceptance criteria per issue, creates GitHub Issues via API
                    with labels and milestones. Once <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/breakdown</span> runs, PRD is locked 🔒. Changes require explicit <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/design</span> re-run and new
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/breakdown</span>, making cost of scope changes visible.
                  </p>
                  <p className="mb-3">
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/retro</span>: Upstream improvement feedback—reviews sprint completion (what worked, what friction occurred), identifies CAPS-specific
                    issues (not project bugs), creates issues in CAPS template repository via GitHub API, tags with improvement category
                    (documentation/workflow/pattern/tooling). Classification step separates project bugs (stay local) from CAPS workflow issues (go upstream),
                    reduced upstream noise by <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">80%</span>.
                  </p>
                  <p>
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/update</span>: Template sync—pulls latest improvements from CAPS upstream, updates <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">CLAUDE.md</span>/skills/workflows, runs
                    automatically on session start, preserves project-specific customizations via merge strategy. Feedback loop is the product 🔁: every
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/retro</span> that generates upstream issue makes CAPS better for all future projects. This compounds—later projects have richer
                    documentation and fewer workflow issues than earlier ones.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🛠️</span>
                    <span>Multi-Agent Build System</span>
                  </p>
                  <p className="mb-3">
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/build</span>: Multi-agent autonomous implementation. <strong>PLANNER</strong> reads issue, creates step-by-step implementation plan,
                    identifies files to modify, forced to read encoded domain knowledge (RedwoodSDK routing rules, D1 migration syntax, Cloudflare Workers
                    limitations) before creating plan. <strong>CODER</strong> creates git worktree, implements feature following plan, writes tests.
                    <strong>QA</strong> runs test suite, validates against acceptance criteria, checks <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">70%+ coverage</span> threshold. <strong>FIXER</strong> if tests fail,
                    analyzes errors, applies fixes, re-runs validation. <strong>MERGE</strong> reviews diff, ensures no unintended changes, merges worktree to
                    main, cleans up.
                  </p>
                  <p className="mb-3">
                    <strong>Git worktree isolation</strong>: multiple features built in parallel without branch conflicts, clean file tree per feature (no
                    stashing/switching needed), atomic feature validation before merge, easy rollback (delete worktree, no main branch pollution). Worktrees
                    provide true isolation—branches = pointer moves, worktrees = separate directories. Automatic cleanup: MERGE agent removes worktree after
                    successful merge, FIXER agent removes after too many failed attempts, <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/cleanup</span> command scans for orphaned worktrees.
                  </p>
                  <p className="mb-3">
                    Structured handoff protocol 📝: each agent writes <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">HANDOFF.md</span> in worktree with status, files modified, next steps. Subsequent
                    agents read this before starting. Prevents agents from overwriting each other's work or missing context. Specialized agents reduce
                    hallucination (narrower context per agent), enforce quality gates (tests must pass), enable autonomous builds without constant supervision.
                  </p>
                  <p>
                    Encoded domain knowledge prevents AI hallucinations—AI agents frequently hallucinated RedwoodSDK syntax (wrong import paths, invalid route
                    patterns, D1 migration errors). Fixed by encoding patterns in CAPS skills. PLANNER forced to read these before creating implementation plan.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>✨</span>
                    <span>Production Deployment</span>
                  </p>
                  <p className="mb-3">
                    Deployed to <strong>Cloudflare Workers</strong> edge platform—zero cold starts, global distribution, sub-10ms latency, integrated D1 SQL.
                    <strong>React 19 Server Components</strong>: streaming SSR, server-first rendering reduces client bundle, built-in async components.
                    RedwoodSDK provides Workers-native routing, D1 migrations, type-safe environment, zero-config deployment.
                  </p>
                  <p className="mb-3">
                    CI/CD pipeline: <span className="text-slate-lighter">GitHub push → GitHub Actions → build React app → run tests (requires 70%+ coverage) → deploy to Cloudflare
                    Workers (preview, staging, production) → D1 migration execution → Cloudflare Zero Trust security</span>. Preview: per-branch automatic
                    deployment. Staging: pre-production validation. Production: edge deployment across <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">300+ global PoPs</span>.
                  </p>
                  <p className="mb-3">
                    Repository structure: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">apps/web/</span> (React Server Components app with file-based routes, components, business logic),
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">workers/api/</span> (edge API workers), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">db/</span> (D1 database schema, versioned migrations), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">DESIGN.md</span> (frozen PRD
                    created by <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/design</span>), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">CLAUDE.md</span> (project instructions), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">.github/workflows/deploy.yml</span> (CI/CD pipeline).
                  </p>
                  <p>
                    <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">15+ projects</span> built using CAPS framework, <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">40+ upstream improvements</span> contributed back to template. Autonomous builds:
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">/build</span> completes features end-to-end without human intervention (except approval). Self-improvement validated: projects using
                    CAPS contributed D1 pattern docs, RedwoodSDK routing fixes, git worktree cleanup automation. Developer confidence: frozen specs reduce
                    anxiety about shifting requirements. Quality consistency: multi-agent gates prevent untested or incomplete code from merging.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
          </>
        )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
        {/* Project 3: Customer Support Automation */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-start gap-4">
            <div className="flex-1">
              <CardTitle className="mb-3">Customer Support Automation</CardTitle>
              <CardDescription>
                Production-grade customer support automation combining n8n workflow orchestration, 6 specialized AI agents,
                and Palantir Foundry integration to deliver coach-level support with deep customer context and expert knowledge retrieval
              </CardDescription>
            </div>
            <img src="/project-icons/n8n-icon.webp" alt="n8n" className="w-12 h-12 rounded-lg flex-shrink-0 object-cover bg-white" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">n8n</Badge>
              <Badge variant="teal">Gemini API</Badge>
              <Badge variant="teal">Palantir Foundry</Badge>
              <Badge variant="teal">LangChain</Badge>
              <Badge variant="teal">ChromaDB</Badge>
              <Badge variant="teal">Slack API</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ 1 week framework setup → 2 months junior team expansion (13x growth in Action Handler)</li>
                <li>✓ Zero AI hallucination incidents (hook system prevented configuration errors)</li>
                <li>✓ Coach-level responses with customer biomechanics, training history, and expert knowledge</li>
                <li>✓ Complete Slack-native helpdesk with live queues, voice replies, and automated media pipelines</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(3)}
              className="w-full"
            >
              {expandedProjects.has(3) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(3) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p>
                    A fitness/biomechanics company needed to automate customer support while maintaining the personalized, expert-level quality of human coaches. Support agents had no quick access
                    to customer context — biomechanical analysis reports, session history, billing data, expert coaching knowledge — and had to manually switch between systems. The automation also needed
                    to be maintainable by junior developers using AI assistance, without introducing AI hallucination risks or configuration errors.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🛡️</span>
                    <span>Framework Innovation</span>
                  </p>
                  <p className="mb-3">
                    Built a developer framework with smart blocking hooks to prevent AI hallucinations. **PreToolUse hook** intercepts n8n API calls — first access per session is blocked until
                    documentation is read, then every 5th call gets blocked for periodic reminder (combats context drift). Reading the docs resets the counter to zero. Result: impossible to modify
                    workflow code without understanding n8n conventions.
                  </p>
                  <p>
                    Created 6 comprehensive n8n skill modules covering webhooks, workflow patterns, data tables, HTTP authentication, error handling, and tool integrations. Cloudflare Access Patch:
                    Node.js preload script transparently injects Zero Trust auth headers for Foundry API calls. Junior developers built complex workflows with AI assistance — <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">zero hallucination incidents</span> due to
                    framework guardrails.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🤖</span>
                    <span>Multi-Agent Architecture</span>
                  </p>
                  <p className="mb-3">
                    Six specialized Gemini 2.0 Flash agents, each with domain-specific Palantir Foundry OSDK tool access: **Tech** (app/login issues + biomechanical data),
                    **Coaching** (training/exercises + RAG through GBs of Zoom coaching transcripts), **Billing** (invoices from Foundry + Bexio PDF fetching), **Events** (appointments/registration),
                    **Summit** (summit logistics), **General** (catch-all with knowledge base access).
                  </p>
                  <p>
                    Incoming tickets flow through <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">CS: Smart Ticket Classifier</span> (89 nodes) — Gemini classification determines category, then routes to <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">CS: Request Analyzer</span> (69 nodes) where
                    the appropriate agent generates a structured proposal. Foundry OSDK provides 20+ integrations: biomechanical analysis, session history, invoices, past tickets. Zod schema validation
                    ensures reliable, parseable outputs with <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">confidence</span> scoring (low/medium/high).
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>Production Scale</span>
                  </p>
                  <p className="mb-3">
                    <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">16 active workflows</span>, <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">601+ nodes</span>. Core workflows: Smart Ticket Classifier (duplicate detection, DNC enforcement, AI classification),
                    Request Analyzer (multi-agent analysis), Action Handler (172 nodes — 13x expansion from 13-node MVP, handles all Slack interactive buttons). Bidirectional Slack sync — full helpdesk
                    in Slack, agents never need to open FluentSupport UI.
                  </p>
                  <p>
                    Race condition prevention 🔒: Early lock + Wait node pattern handles concurrent ticket submissions. Async webhook resume: Zoom→Vimeo pipeline suspends execution via n8n Wait node,
                    resumes when Vimeo transcoding completes. Live-updating agent queues: Pinned Slack messages + DM lists continuously rebuilt as tickets arrive. Voice reply support 🎙️: Audio transcription
                    enables mobile-first workflows. Invoice PDF automation: Billing agent fetches PDFs from Bexio, uploads directly to Slack thread.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Right Column Projects - Hidden by default */}
        {showAllProjects && (
          <>
        {/* Project 6: Biomechanical Structure Analysis */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Biomechanical Structure Analysis</CardTitle>
            <CardDescription>
              Production-grade biomechanical posture analysis pipeline deployed to clinical workflow,
              analyzing patient posture with privacy-preserving computer vision
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">MediaPipe</Badge>
              <Badge variant="teal">BiRefNet</Badge>
              <Badge variant="teal">Gemini API</Badge>
              <Badge variant="teal">Palantir Foundry</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ Deployed to production clinical workflow processing 40+ patient assessments daily</li>
                <li>✓ Reduced biomechanical assessment time from 30 minutes to 5 minutes (80%+ reduction)</li>
                <li>✓ Achieved 90%+ accuracy in posture deviation detection</li>
                <li>✓ 100% GDPR compliance with privacy-preserving blur layers</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(6)}
              className="w-full"
            >
              {expandedProjects.has(6) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(6) && (
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Key Capabilities:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Multi-stage computer vision pipeline combining MediaPipe pose estimation, BiRefNet segmentation, and Gemini LLM analysis</li>
                  <li>Bottom-up kinetic chain analysis (Ankle → Knee → Hip → Pelvis → Thorax → Cervical)</li>
                  <li>Privacy-preserving features with background blur and face blur</li>
                  <li>Deployed to production clinical workflow on Palantir Foundry</li>
                  <li>German-language output for end users with detailed biomechanical feedback</li>
                </ul>
              </div>
            )}

            {/* Demo Preview - Always Visible */}
            <div
              className="border rounded-lg overflow-hidden bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 hover:from-emerald-500/10 hover:to-cyan-500/10 transition-all cursor-pointer group relative h-[120px] flex items-center justify-center"
              onClick={() => setOpenDemo('structure-viewer')}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="flex items-center gap-3 z-10">
                <Play className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-sm font-semibold">View Interactive Demo</p>
                  <p className="text-xs text-muted-foreground">Biomechanical analysis pipeline</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project 7: LLM Pipeline Orchestration System */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>LLM Pipeline Orchestration System</CardTitle>
            <CardDescription>
              Visual pipeline builder for orchestrating multi-stage LLM analysis workflows, enabling
              specialized AI agents to collaborate on generating comprehensive biomechanical assessment reports
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Next.js</Badge>
              <Badge variant="teal">React</Badge>
              <Badge variant="teal">TypeScript</Badge>
              <Badge variant="teal">LLM Orchestration</Badge>
              <Badge variant="teal">DAG Architecture</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ Reduced report generation time from 2 hours to 10 minutes (90%+ reduction)</li>
                <li>✓ Eliminated 95%+ of pipeline configuration errors with visual validation</li>
                <li>✓ Enabled non-technical users to customize analysis workflows</li>
                <li>✓ Processed 150+ clinical assessments with zero pipeline failures</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(7)}
              className="w-full"
            >
              {expandedProjects.has(7) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(7) && (
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Clinical teams needed automated biomechanical assessment reports, but manual LLM orchestration was error-prone and required technical expertise.</p>

                <p className="font-semibold mt-3">Solution - Key Capabilities:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Visual DAG editor for designing specialized LLM agent pipelines with dependency resolution</li>
                  <li>Multi-stage analysis workflow: pose estimation → anatomical assessment → biomechanical interpretation → clinical recommendations</li>
                  <li>Node-based architecture enabling modular, reusable AI analysis components</li>
                  <li>Real-time cycle detection and validation ensuring robust pipeline execution</li>
                  <li>Produces high-quality, structured biomechanical analysis reports through agent collaboration</li>
                </ul>
              </div>
            )}

            {/* Demo Preview - Always Visible */}
            <div
              className="border rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/5 to-purple-500/5 hover:from-blue-500/10 hover:to-purple-500/10 transition-all cursor-pointer group relative h-[120px] flex items-center justify-center"
              onClick={() => window.location.href = '/demos/dependency-graph'}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="flex items-center gap-3 z-10">
                <Play className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-sm font-semibold">View Interactive Demo</p>
                  <p className="text-xs text-muted-foreground">LLM pipeline orchestration interface</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project 8: Veterinary Knowledge Assistant */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="mb-3">Veterinary Knowledge Assistant</CardTitle>
            <CardDescription>
              RAG-powered clinical reference system embedded in Haven shelter management app — instant access to veterinary literature
              with split-panel PDF viewer, chunk-level highlighting, and precise source citations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Firebase</Badge>
              <Badge variant="teal">Supabase pgvector</Badge>
              <Badge variant="teal">Voyage AI</Badge>
              <Badge variant="teal">Cohere Rerank</Badge>
              <Badge variant="teal">React</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ Hybrid search (BM25 + vector) + Cohere reranking + sibling chunk boosting</li>
                <li>✓ 3,000+ Merck Veterinary Manual articles + vet textbooks indexed</li>
                <li>✓ Split-panel PDF viewer with cross-page text highlighting</li>
                <li>✓ 614-line evaluation framework with golden dataset for regression testing</li>
                <li>✓ PR open, pending final review and merge</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(8)}
              className="w-full"
            >
              {expandedProjects.has(8) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(8) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    Shelter staff and vets needed quick answers to clinical questions—symptoms, treatments, dosages—without manually searching through
                    large veterinary textbooks or the Merck Veterinary Manual. Generic AI assistants hallucinate veterinary facts and provide no source
                    traceability. The shelter already ran Haven (an internal shelter management app on Firebase) and needed an embedded knowledge assistant,
                    not a separate tool.
                  </p>
                  <p>
                    Requirement: RAG chat interface over veterinary literature directly within Haven, with precise source citations and chunk-level
                    highlighting in a PDF viewer. Conversation persistence across sessions. Accurate retrieval—minimize hallucination through strong
                    retrieval + reranking.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🏗️</span>
                    <span>RAG Pipeline Architecture</span>
                  </p>
                  <p className="mb-3">
                    Built as self-contained module (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">dr-paw/</span>) within Haven monorepo. RAG backend runs as Firebase Cloud Function
                    (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">functions/api.ts</span>, 912 lines). Knowledge stored in Supabase with <strong>pgvector</strong> for vector search and separate BM25/FTS
                    index for <strong>hybrid retrieval</strong>—both vector and full-text search in one database, eliminating external dependencies like Pinecone.
                  </p>
                  <p className="mb-3">
                    Pipeline flow: <span className="text-slate-lighter">user query → Voyage AI embedding → Supabase hybrid search (BM25 + vector with RRF fusion) → sibling chunk boosting
                    (±1 neighboring chunks added) → Cohere Rerank API (cross-encoder scoring) → dynamic token budget trimming → OpenAI GPT-4o streaming with
                    injected chunks + citation instruction → response with numbered [1], [2] citation markers</span>.
                  </p>
                  <p className="mb-3">
                    Evaluated embedding models on veterinary text—settled on <strong>Voyage AI</strong> (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">voyage-3</span>) over OpenAI embeddings for better
                    domain performance. <strong>Sibling chunk boosting</strong> adds neighboring chunks after retrieval to restore context lost at chunk boundaries
                    without permanently increasing chunk size (which hurts precision). Best of both: small precise chunks for retrieval, expanded context for
                    generation.
                  </p>
                  <p>
                    Knowledge sources 📚: vet book PDFs uploaded to Firebase Storage → extracted by custom TypeScript extractor
                    (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">pdfExtractor.ts</span>, 1,790 lines) → chunked → embedded → stored in Supabase. <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">3,000+ Merck Veterinary Manual articles</span> scraped
                    via separate WebScraper repo (Playwright + BeautifulSoup), embedded into same Supabase store. Custom extractor needed to preserve page
                    number metadata, handle multi-column layouts, associate chunks with exact page ranges for PDF viewer highlighting.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>📄</span>
                    <span>Split-Panel PDF Viewer</span>
                  </p>
                  <p className="mb-3">
                    React frontend (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">VetBot.tsx</span>) with split-panel layout: chat left, PDF viewer right. Source citations appear as numbered badges
                    in response; clicking one opens PDF to correct page with matched chunk highlighted. Built with react-pdf (wojtekmaj)—best React
                    integration, handles large PDFs page-by-page.
                  </p>
                  <p className="mb-3">
                    Hardest problem: text highlighting across page boundaries 🎨. PDF chunks sometimes span two pages. react-pdf renders pages independently—no
                    DOM element spans page boundaries. Solved by splitting chunk highlights into per-page segments, applying each independently. Tracked in
                    research doc <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">pdf-viewer-text-highlighting-2026-02-09.md</span>.
                  </p>
                  <p className="mb-3">
                    PDF viewer components: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">PDFDocument.tsx</span> (568 lines — page rendering, chunk highlighting, cross-page support),
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">PDFViewerPanel.tsx</span> (256 lines — panel layout, scroll-to-page), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">PDFControls.tsx</span> (126 lines — zoom, navigation),
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">usePDFState.ts</span> (107 lines — state management). Fixed page position lost on window resize by re-scrolling to target page after
                    resize events. Fixed slow PDF open by preloading blob when citation clicked rather than waiting for panel open.
                  </p>
                  <p>
                    Conversation persistence via Firestore. Two retrieval modes: first message injects all top chunks directly into context; follow-up
                    messages use <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">searchVetKnowledge</span> tool triggered automatically when bot detects topic change (smart context switching). Debug panel
                    (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">DebugPanel.tsx</span>, 228 lines) added to inspect retrieval results during development.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>✨</span>
                    <span>Production Quality</span>
                  </p>
                  <p className="mb-3">
                    RAG evaluation framework (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">evalRag.ts</span>, <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">614 lines</span>) with golden dataset of Q&A pairs and expected sources. Measures context
                    recall, context precision, faithfulness (LLM-as-judge), citation accuracy. Results stored for historical comparison. Made pipeline tuning
                    quantitative rather than impressionistic—built early in development cycle.
                  </p>
                  <p className="mb-3">
                    Hybrid search (BM25 + vector) consistently outperformed pure vector search on domain-specific text. <strong>Cross-encoder reranking</strong>
                    via Cohere Rerank API was highest-leverage improvement—no GPU needed in Firebase Functions, production-quality reranking without infra
                    overhead. Small candidate set reranked well beats large candidate set from pure embedding similarity.
                  </p>
                  <p className="mb-3">
                    Fixed duplicate chunks in vector database (issue #349) by adding deduplication check on content hash before upsert; migration
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">20260316_delete_stale_vetbook_chunks.sql</span> cleaned up existing duplicates. Supabase migrations tracked in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">supabase/migrations/</span>:
                    FTS index, pgvector column for Voyage embeddings, search function UUID fix, cleanup scripts.
                  </p>
                  <p>
                    Research-driven decisions 🔬: evaluated embedding models (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">embedding-model-evaluation-2025-03-15.md</span>), PDF viewer libraries
                    (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">react-pdf-viewer-comparison-2026-02-11.md</span>), RAG pipeline approaches (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">rag-best-practices-2025-03-09.md</span>). Each decision
                    grounded in documented research comparing alternatives. All research docs in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">dr-paw/docs/research/</span>.
                  </p>
                </div>
              </div>
            )}

            {/* GitHub Link - Always Visible */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://github.com/JohannesSchulz97/VetBot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project 9: Web Scraping Infrastructure */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="mb-3">Web Scraping Infrastructure</CardTitle>
            <CardDescription>
              Enterprise-grade data extraction pipelines: medical literature structuring (5,000+ documents)
              and automated review monitoring, deployed to Palantir Foundry with scheduled orchestration
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Playwright</Badge>
              <Badge variant="teal">BeautifulSoup</Badge>
              <Badge variant="teal">Python asyncio</Badge>
              <Badge variant="teal">Palantir Foundry</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ 5,000+ medical articles scraped and structured (4,771 clean, deduplicated)</li>
                <li>✓ 10+ hours/week manual work → automated (zero human time)</li>
                <li>✓ 99%+ uptime over 6 months (180 daily executions, 2 failures due to site outages)</li>
                <li>✓ Zero detection incidents in 1,080 total scrapes</li>
                <li>✓ Execution time: 45 minutes bulk, 90 seconds daily incremental</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(9)}
              className="w-full"
            >
              {expandedProjects.has(9) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(9) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    Multiple clients needed production-grade web scraping for distinct use cases: (1) ML training dataset requiring <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">5,000+ structured</span> medical
                    articles from Merck Veterinary Manual; (2) competitive intelligence requiring daily automated review monitoring across Trustpilot and
                    ProvenExpert. Manual extraction was time-consuming (<span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">10+ hours/week</span> for reviews, infeasible for 5,000 articles).
                  </p>
                  <p>
                    Existing scraping tools (Octoparse, ParseHub) couldn't handle JavaScript-heavy sites, lacked scheduling, had no integration with client
                    infrastructure (Palantir Foundry). Anti-detection requirements—rate limiting, user agent rotation, intelligent retry logic—needed custom
                    implementation.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🏗️</span>
                    <span>Dual Pipeline Architecture</span>
                  </p>
                  <p className="mb-3">
                    Built Python-based scraping framework using <strong>Playwright</strong> (headless browser automation for JavaScript execution) and
                    BeautifulSoup (HTML parsing). Async/await for concurrency—10 parallel browser contexts = 10x throughput vs sequential. Deployed to Palantir
                    Foundry as scheduled Transforms: medical article scraper (one-time bulk extraction) and review monitor (daily incremental updates).
                  </p>
                  <p className="mb-3">
                    <strong>Medical Knowledge Extraction</strong>: <span className="text-slate-lighter">sitemap discovery (fetch sitemap.xml, extract URLs, filter, 5,247 URLs → 5,018 valid
                    articles) → concurrent scraping (10 parallel browser contexts, 500ms rate limiting, 3-attempt exponential backoff retry) → HTML cleaning
                    (BeautifulSoup strip navigation/ads/footers, preserve structure as markdown) → deduplication (SHA-256 body hash, removed 229 duplicates) →
                    schema validation (enforce non-empty title, hierarchical category, &gt;100 char body, valid ISO date, rejected 18 malformed) → output
                    (4,771 final clean articles)</span>.
                  </p>
                  <p className="mb-3">
                    <strong>Review Monitoring System</strong>: <span className="text-slate-lighter">scheduled execution (Foundry Transform, daily 6am UTC) → Trustpilot scraper (Playwright
                    navigate, wait for div.review-card, infinite scroll loop, extract per review: platform/date/rating/title/body/reviewer/company response) →
                    ProvenExpert scraper (click "Show all reviews" AJAX load, wait for div.rating-item, extract same schema) → incremental update logic (load
                    previous scrape results, identify new reviews via date + body hash dedupe, append new reviews) → competitive intelligence alerts (detect
                    rating &lt;3, send Slack notification, daily summary)</span>.
                  </p>
                  <p>
                    Infinite scroll implementation for Trustpilot/ProvenExpert (no pagination links): <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">infinite_scroll()</span> evaluates
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">document.body.scrollHeight</span>, scrolls to bottom, waits 2s for new content, checks height again—loop until no height change. JavaScript
                    rendering mandatory—requests + BeautifulSoup returned empty sections. Playwright executes JavaScript, waits for AJAX-loaded content.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🛡️</span>
                    <span>Anti-Detection Engineering</span>
                  </p>
                  <p className="mb-3">
                    Trustpilot detected Playwright's headless browser (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">navigator.webdriver</span> property), blocked with 403. Solved with stealth techniques 🕵️:
                    remove webdriver property via init script (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">Object.defineProperty(navigator, 'webdriver', get: () =&gt; undefined)</span>), rotate
                    user agents (20 realistic browsers—Chrome Windows/macOS/Linux, Firefox), rate limiting (500ms delay between requests), randomized viewport
                    sizes (mimic different devices).
                  </p>
                  <p className="mb-3">
                    Result: <strong>zero blocks</strong> over 6 months (180 daily scrapes = 1,080 total executions). Polite scraping beats sophisticated evasion—rate
                    limiting + realistic user agents + remove webdriver property = sufficient. Proxy rotation ($100+/month) and captcha solving ($2/1000 solves)
                    expensive overkill unless massive scale (100k+ pages/day).
                  </p>
                  <p>
                    Intelligent retry logic: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">scrape_with_retry()</span> with exponential backoff (2s, 4s, 8s). On timeout (likely rate limited), wait 30s,
                    swap user agent, retry. Duplicate review detection via composite hash: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">SHA-256(date|body|reviewer_name)</span> (body-only failed—identical
                    reviews from different users).
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>Production Deployment</span>
                  </p>
                  <p className="mb-3">
                    Deployed to Palantir Foundry Transforms—native integration with client data infrastructure (data lineage, scheduling, access control).
                    Standalone service would require data replication, auth integration, separate monitoring. Medical article scraper as one-time bulk Transform;
                    review monitor as scheduled daily Transform with incremental update logic.
                  </p>
                  <p className="mb-3">
                    Incremental updates 10x faster execution (1 min vs 10 min), lower detection risk (fewer requests), preserves historical data. Full re-scrape
                    wastes resources. Checkpoint-based resumption for long-running scrapes: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">scrape_with_checkpoints()</span> saves progress after each URL—medical
                    article scraper initially timed out after 30 min (Foundry limit). Split into 10 batches (500 URLs each), executed sequentially with
                    checkpoint file tracking progress.
                  </p>
                  <p className="mb-3">
                    HTML structure changes inevitable—ProvenExpert redesigned site month 3, broke CSS selectors, scraper returned empty. Fixed with centralized
                    selector configuration (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">selectors.json</span>), fallback selectors (try 3 possible selectors per field), automated alerts on extraction
                    failures (Slack notification), monthly manual validation (spot-check sample).
                  </p>
                  <p>
                    Repository structure: <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">scrapers/</span> (merck_manual.py, trustpilot.py, provenexpert.py), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">utils/</span> (anti_detection.py, html_cleaner.py,
                    schema_validator.py), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">foundry/</span> (merck_transform.py, reviews_transform.py), <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">config/</span> (user_agents.json, selectors.json),
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">tests/</span> (reliability, anti-detection). ML dataset ready—structured JSON used for veterinary NLP model training. Competitive
                    intelligence—daily review monitoring enabled proactive customer service. Zero maintenance after initial deployment—ran autonomously 6 months.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 11: Screw Manufacturing Optimization */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="mb-3">Screw Manufacturing Optimization</CardTitle>
            <CardDescription>
              Binary classification system predicting defective screws from production data for large-scale
              industrial manufacturer (SPAX), processing 4 years of MES records with feature engineering and imbalanced learning
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="teal">Python pandas</Badge>
              <Badge variant="teal">scikit-learn</Badge>
              <Badge variant="teal">Random Forest</Badge>
              <Badge variant="teal">XGBoost</Badge>
              <Badge variant="teal">scipy.sparse</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-inside space-y-1">
                <li>✓ 4 years production data merged across MES + Messautomat tables</li>
                <li>✓ 418 one-hot-encoded features → staged reduction via importance scoring</li>
                <li>✓ 90/10 class imbalance → random undersampling outperformed SMOTE</li>
                <li>✓ Feature importance analysis identified root causes for defects</li>
                <li>✓ Full preprocessing pipeline documented across 10+ notebooks</li>
              </ul>
            </div>

            {/* Expand/Collapse Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleProject(11)}
              className="w-full"
            >
              {expandedProjects.has(11) ? (
                <><ChevronUp className="h-4 w-4 mr-2" /> Hide Technical Details</>
              ) : (
                <><ChevronDown className="h-4 w-4 mr-2" /> Show Technical Details</>
              )}
            </Button>

            {/* Collapsible Details */}
            {expandedProjects.has(11) && (
              <div className="text-sm text-muted-foreground space-y-6 pt-4 border-t leading-relaxed">
                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    <span>The Challenge</span>
                  </p>
                  <p className="mb-3">
                    SPAX (industrial screw manufacturer) runs 100% quality testing on production batches using a measurement machine (Messautomat) that
                    records dimensional attributes per screw—thread diameter, length, curvature—with pass/fail outcomes. Each production order generates
                    thousands of tests. Business question: can we predict pass/fail outcomes and identify which production factors drive failures without
                    relying solely on post-production measurement?
                  </p>
                  <p>
                    Two data sources existed: <strong>MES</strong> (Manufacturing Execution System) with 4 years (2021–2024) of production order metadata
                    (machine, workplace, process step, quantity, material number), and <strong>Messautomat</strong> with per-screw measurement results across
                    two tables (Tab04: test metadata; Tab05: individual attribute measurements).
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🔧</span>
                    <span>Data Preprocessing & Merging</span>
                  </p>
                  <p className="mb-3">
                    <strong>MES preprocessing</strong>: <span className="text-slate-lighter">merge 4 yearly tables → remove columns absent from all years → remove irrelevant columns,
                    rename → remove entries with non-numeric order/workplace IDs → reformat German locale floats (commas → dots) → type-cast</span>.
                    <strong>Messautomat preprocessing</strong>: <span className="text-slate-lighter">drop Tab06 (raw measurements already summarized in Tab05) → create boolean flag for
                    manual vs automatic measurement (6.51% manual, dropped complexity) → remove entries with missing order IDs, non-5-digit machine numbers →
                    encode Prüfart (test type) to integer (mapping saved to <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">Prüfarten-Kodierung.json</span>) → join Tab04 + Tab05 on foreign key</span>.
                  </p>
                  <p className="mb-3">
                    <strong>Merge challenge</strong> 🔗: MES and Messautomat couldn't be cleanly joined at row level. For a given order-workplace combination,
                    both tables have ~100 entries each, but production-to-measurement delay is unknown—individual MES rows can't reliably link to individual
                    measurement rows. Only <strong>process step</strong> (Prozessschritt) was unambiguous (few order-workplace combinations have &gt;1 process
                    step), so only that field extracted from MES and joined. All MES entries with zero quantity removed. Process step labels unified and
                    re-encoded ('Kontrolle 100%', 'KONTROLLE', 'Kontrol' → 'KONTROLLE') with frequency-based integer encoding saved to
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">Prozessschritt-Encoding.json</span>.
                  </p>
                  <p>
                    Discovered that core assumption (MES and Messautomat records can be joined) was false—changed entire feature space. Starting simple
                    (minimal features, fast baseline) surfaced this early rather than after weeks of modelling. Final merged table:
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">data/output/data.csv</span>—Messautomat measurements + process step.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>🤖</span>
                    <span>ML Pipeline & Class Imbalance</span>
                  </p>
                  <p className="mb-3">
                    <strong>Feature engineering</strong>: Material number (Materialnummer) encodes screw properties per article key
                    (<span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">Artikelschlüssel_SPAX.xlsx</span>). Extracted: Warengruppe (product group), Werkstoff (material), Veredelung (surface
                    finish), Durchmesser (diameter), Länge (length), Verpackung (packaging). After one-hot encoding all categoricals: <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">418 features</span>.
                    Memory-prohibitive as dense—stored as <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">scipy.sparse.matrix</span>.
                  </p>
                  <p className="mb-3">
                    <strong>Staged feature reduction</strong>: manual removal (Verpackung, ID columns, Pruefanzahl, raw Pruefart, Veredelung) → removal of rare
                    test categories (&lt;1,000 occurrences) → RandomForest importance score-based elimination. Final preprocessing: Z-score normalization
                    (mean=0, std=1), one-hot encoding, sparse storage.
                  </p>
                  <p className="mb-3">
                    <strong>Class imbalance</strong>: <span className="inline-flex items-center px-1.5 py-0.5 bg-teal/10 text-teal rounded text-xs font-mono">90% pass / 10% fail</span>. Compared three mitigation strategies: class weight adjustment (underperformed),
                    SMOTE oversampling (computationally expensive at this scale, marginal gain), <strong>random undersampling</strong> (best precision-recall
                    tradeoff, selected). Dataset large enough that undersampling doesn't lose statistical power.
                  </p>
                  <p>
                    <strong>Model comparison</strong> on 10% data baseline: Naive Bayes (poor on imbalanced high-dimensional), Logistic Regression (too linear),
                    XGBoost (viable candidate), <strong>Random Forest</strong> (best performance, selected). Evaluated two strategies: regression (predict
                    measured value → derive pass/fail from tolerance bounds, less effective) vs classification (direct pass/fail prediction with undersampling,
                    better performance, selected). Hyperparameter tuning via grid search on 10% data. Final model trained on full dataset:
                    <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">random_forest_clf_downsampled_30_0.5_20_500.pkl</span>.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-base mb-3 flex items-center gap-2">
                    <span>📊</span>
                    <span>Analysis & Outcomes</span>
                  </p>
                  <p className="mb-3">
                    Feature importance scores analyzed in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">feature_importance_scores.ipynb</span>—identified which production and material features most
                    strongly predict failures, usable for root cause analysis. Precision-recall tradeoff analyzed in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">precision_recall.ipynb</span>.
                    Messautomat measurement count discrepancy investigated in <span className="font-mono text-xs bg-navy-lighter px-1 py-0.5 rounded">mes_vs_messautomat.ipynb</span>—data indicated ~90% screws measured,
                    but per-order counts showed only ~0.003% measured (26 measurements for 816,867-screw order). Resolved: Messautomat table represents
                    measurement sessions (each covering a sample), not individual screw records.
                  </p>
                  <p className="mb-3">
                    Working Random Forest classifier for pass/fail prediction 🎯, feature importance analysis identifying key drivers, full preprocessing and
                    feature engineering pipeline documented across 10+ notebooks (reproducible from raw MES + Messautomat exports). Recommendations for better
                    data collection: coherent column naming, clear MES-to-Messautomat linkage, consistent category labels.
                  </p>
                  <p>
                    Key lesson: data mergeability must be verified before scoping ML project. Sparse matrix representation essential when one-hot encoding
                    high-cardinality categoricals at scale—dense representation would have been prohibitively slow.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
          </>
        )}
        </div>

        {/* Show More Projects Button */}
        {!showAllProjects && (
          <div className="col-span-full flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllProjects(true)}
              className="min-w-[200px]"
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Show More Projects (7)
            </Button>
          </div>
        )}

        {/* Show Fewer Projects Button */}
        {showAllProjects && (
          <div className="col-span-full flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllProjects(false)}
              className="min-w-[200px]"
            >
              <ChevronUp className="h-4 w-4 mr-2" />
              Show Fewer Projects
            </Button>
          </div>
        )}
      </div>

      {/* Demo Modals */}
      <Dialog open={openDemo === 'dependency-graph'} onOpenChange={(open) => !open && setOpenDemo(null)}>
        <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0 flex flex-col">
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle>DependencyGraph Tool - Interactive Demo</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            <iframe
              src="/demos/dependency-graph"
              className="w-full h-full border-0"
              title="DependencyGraph Tool Demo"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDemo === 'structure-viewer'} onOpenChange={(open) => !open && setOpenDemo(null)}>
        <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0 flex flex-col">
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle>StrukturAnalyse Layer Viewer - Interactive Demo</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0">
            <iframe
              src="/structure-viewer.html"
              className="w-full h-full border-0"
              title="Structure Viewer Demo"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
