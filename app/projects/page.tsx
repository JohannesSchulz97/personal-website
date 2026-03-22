"use client";

import Image from "next/image";
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
import { useState } from "react";

export default function ProjectsPage() {
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
    <div className="min-h-screen bg-background">
      <section className="relative pb-12 overflow-hidden">
        {/* Background Image - Full Width */}
        <div className="absolute inset-0 w-full">
          <Image
            src="/P1000017.JPG"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
            quality={50}
            sizes="100vw"
          />
        </div>

        <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my work in machine learning, data science, and software development.
          From biomechanical analysis tools to veterinary AI assistants, these projects
          demonstrate my passion for building innovative solutions.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
        {/* Project 0: Foundry Migration */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Enterprise Platform Migration: 99.8% Cost Reduction</CardTitle>
            <CardDescription>
              Decommissioned €100k/month Palantir Foundry enterprise platform and migrated 9.5 TB of production data
              with 8,435 resources to self-hosted infrastructure at €200/month — zero downtime, complete functionality preserved
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Playwright</Badge>
              <Badge variant="secondary">PostgreSQL</Badge>
              <Badge variant="secondary">Docker</Badge>
              <Badge variant="secondary">Dagster</Badge>
              <Badge variant="secondary">Cloudflare Zero Trust</Badge>
              <Badge variant="secondary">Reverse Engineering</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Company ran entire data infrastructure on Palantir Foundry at €100,000/month — unsustainable for a mid-sized business. The closed, proprietary ecosystem had no documented bulk export capability but held 8,435 production resources, 341 custom object types, 9.5 TB across 2,320 datasets, 362 transformation pipelines, and 204 code repositories. Migration required zero downtime and complete data preservation.</p>

                <p className="font-semibold mt-3">Extraction Framework — Reverse Engineering:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Built 5,045-line Python framework using Playwright to reverse-engineer Foundry's internal APIs</li>
                  <li>Authenticated browser sessions intercepting network traffic to discover undocumented endpoints</li>
                  <li>Extracted Bearer tokens from traffic for programmatic API access bypassing UI entirely</li>
                  <li>12 specialized scripts: lineage discovery, pipeline extraction, dataset streaming, repository cloning</li>
                  <li>Binary split error isolation: auto-narrows failed 1,000-row batches to single bad row without manual intervention</li>
                  <li>Idempotent design with primary key tracking — multi-day extractions resume from checkpoint on failure</li>
                </ul>

                <p className="font-semibold mt-3">Infrastructure Rebuild:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Single Hetzner CCX63 server (48 cores, 192 GB RAM, €200/month) replacing €100k/month SaaS</li>
                  <li>6 production services deployed: Dagster orchestration, Twenty CRM, Coder workspaces, n8n automation, SurfSense AI, LangGraph agents</li>
                  <li>One PostgreSQL instance per service — isolated resource limits, independent backups, no connection pool contention</li>
                  <li>Nginx reverse proxy + Certbot SSL + Cloudflare Zero Trust email-based auth with complete audit logs</li>
                  <li>GitHub Actions + Watchtower CI/CD: sub-7-minute push-to-live deployment pipeline</li>
                </ul>

                <p className="font-semibold mt-3">Developer Platform — Dagster Orchestration:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Blocking hook system preventing code modifications until framework documentation is read (same pattern as CS Automation)</li>
                  <li>40+ reference guides covering asset patterns, automation, CLI operations, and 40+ tool integrations</li>
                  <li>Dual dev/prod environments: isolated databases, shared run queue, no production credentials in dev</li>
                  <li>Team autonomously rebuilding 362 pipelines using extracted Foundry JSON references as rebuild specs</li>
                </ul>

                <p className="font-semibold mt-3">Schema Translation:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>341 Foundry object types → 305 production PostgreSQL tables with 291 foreign key relationships preserved</li>
                  <li>6,338 lines of DDL, 876 lines of FK constraints, 4,808 total columns</li>
                  <li>Automated type mapping: ARRAY/GEOHASH/MEDIA_REFERENCE/VECTOR → PostgreSQL equivalents</li>
                  <li>15 junction tables generated for many-to-many relationships</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 1: Self-Hosted Production Infrastructure */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Self-Hosted Production Infrastructure</CardTitle>
            <CardDescription>
              Git-driven deployment platform running ~10 production services for ~5 developers on a single Hetzner dedicated server —
              replacing enterprise SaaS with fully owned infrastructure featuring automated deployments, multi-service orchestration, and comprehensive backup strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Docker</Badge>
              <Badge variant="secondary">GitHub Actions</Badge>
              <Badge variant="secondary">Watchtower</Badge>
              <Badge variant="secondary">PostgreSQL</Badge>
              <Badge variant="secondary">Nginx</Badge>
              <Badge variant="secondary">BorgBackup</Badge>
              <Badge variant="secondary">DevOps</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Company needed capable self-hosted platform to replace Palantir Foundry infrastructure — data orchestration, workflow automation, CRM, AI pipelines, development environments — all secure, maintainable, and cost-effective. No pre-existing infrastructure; everything built from scratch.</p>

                <p className="font-semibold mt-3">Zero-SSH Deployment Pipeline:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Push to GitHub → GitHub Actions builds Docker image → GHCR registry → Watchtower auto-deploys every 5 minutes</li>
                  <li>Developers deploy without SSH access — just git push</li>
                  <li>470+ line runbook documenting all infrastructure decisions and operational procedures</li>
                  <li>All services version-controlled: Docker Compose stacks, nginx configs, systemd units, backup scripts</li>
                </ul>

                <p className="font-semibold mt-3">Production Services Stack:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Single Hetzner dedicated server (16-core AMD EPYC, 64 GB RAM, 338 GB SSD, €200/month)</li>
                  <li>10 production services: Dagster orchestration, Twenty CRM, n8n automation, Oracle AI platform, LangGraph agents, Coder workspaces, Listmonk email, monitoring</li>
                  <li>7 isolated PostgreSQL instances (one per service) — independent backups, no connection pool contention</li>
                  <li>Nginx reverse proxy + Let's Encrypt SSL with automatic renewal</li>
                  <li>Cloudflare Zero Trust email-based authentication with complete audit logs</li>
                </ul>

                <p className="font-semibold mt-3">Backup Architecture:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Auto-discovery backup system: pg_isready scans for PostgreSQL containers, auto-initializes Borg repos</li>
                  <li>Daily encrypted, deduplicated BorgBackup to Hetzner Storage Box (10 TB co-located)</li>
                  <li>Off-site Cloudflare R2 backup: pg_dump streaming directly to R2 multipart upload (no temp files)</li>
                  <li>systemd-journald unified logging: all containers → searchable logs with 2 GB / 90-day retention</li>
                </ul>

                <p className="font-semibold mt-3">Developer Experience:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Dagster dual-environment: main branch → production DB, dev branch → isolated dev DB with no prod credentials</li>
                  <li>Coder remote workspaces: browser/SSH-accessible at *.coder.tob.sh, no local setup required</li>
                  <li>Cross-stack Docker networking: services communicate via container names across separate Compose stacks</li>
                  <li>Beszel monitoring: lightweight server metrics with Docker container visibility via Unix socket</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
        {/* Project 2: CAPS */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>CAPS (Claude Automated Programming System)</CardTitle>
            <CardDescription>
              Self-improving AI development system orchestrating complete scrum cycles from conversation to production,
              eliminating scope creep through frozen specifications and autonomous multi-agent builds
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Cloudflare Workers</Badge>
              <Badge variant="secondary">React Server Components</Badge>
              <Badge variant="secondary">Multi-Agent Systems</Badge>
              <Badge variant="secondary">Git Worktrees</Badge>
              <Badge variant="secondary">Scrum Automation</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Eliminated scope creep through frozen PRD enforcement</li>
                <li>✓ System improves itself: every project makes CAPS better for all users</li>
                <li>✓ Parallel autonomous builds with isolated git worktree execution</li>
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>AI-assisted development produces "vibe coding" — unstructured workflows causing scope creep and technical debt. Teams need disciplined scrum cycles with AI orchestration.</p>

                <p className="font-semibold mt-3">Scrum Cycle Automation:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>/design → Socratic questioning produces frozen PRD preventing mid-sprint scope changes</li>
                  <li>/breakdown → PRD atomizes into INVEST-compliant GitHub Issues automatically</li>
                  <li>/build → Multi-agent system (PLANNER → CODER → QA → FIXER → MERGE) ships features autonomously</li>
                  <li>/retro → End-of-sprint retrospective creating issues in upstream CAPS repository, not current project</li>
                </ul>

                <p className="font-semibold mt-3">Self-Improving System Architecture:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Every project's /retro identifies CAPS workflow friction and creates upstream template issues</li>
                  <li>/update command pulls improvements from upstream — runs automatically at session start</li>
                  <li>Creates feedback loop: user experience → upstream fixes → all projects benefit automatically</li>
                  <li>Encoded domain knowledge prevents AI hallucinations (RedwoodSDK, D1 patterns, git workflows)</li>
                </ul>

                <p className="font-semibold mt-3">Production Stack:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Cloudflare Workers edge deployment with React 19 Server Components</li>
                  <li>Multi-environment pipeline with 70% coverage gates and Zero Trust security</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
        </div>

        {/* Show More Projects Button */}
        {!showAllProjects && (
          <div className="col-span-full flex justify-center my-8">
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

        {/* Additional Projects - Hidden by default */}
        {showAllProjects && (
          <>
            {/* Additional Left Column */}
            <div className="space-y-8">
        {/* Project 3: Customer Support Automation */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI-Powered Customer Support Automation with Multi-Agent System</CardTitle>
            <CardDescription>
              Production-grade customer support automation combining n8n workflow orchestration, 6 specialized AI agents,
              and Palantir Foundry integration to deliver coach-level support with deep customer context and expert knowledge retrieval
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">n8n</Badge>
              <Badge variant="secondary">Multi-Agent AI</Badge>
              <Badge variant="secondary">Gemini 2.0</Badge>
              <Badge variant="secondary">Palantir Foundry</Badge>
              <Badge variant="secondary">LangChain</Badge>
              <Badge variant="secondary">RAG/Vector Search</Badge>
              <Badge variant="secondary">Slack</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Fitness/biomechanics company needed to automate customer support while maintaining personalized, expert-level quality. Agents required instant access to customer biomechanics, training history, billing data, and expert coaching knowledge — without sacrificing response quality.</p>

                <p className="font-semibold mt-3">Development Framework Innovation:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Smart Blocking Hook: PreToolUse hook forces AI to read documentation before n8n API calls, preventing hallucinations</li>
                  <li>Adaptive strategy: 1st call → DENY, every 5th call → DENY (combat context drift), others → ALLOW with checklist</li>
                  <li>Cloudflare Access Patch: Node.js preload script transparently injects Zero Trust auth headers</li>
                  <li>6 comprehensive n8n skill modules: Enabled junior developers to build complex workflows with AI guardrails</li>
                </ul>

                <p className="font-semibold mt-3">Multi-Agent AI Architecture:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>6 specialized agents (Tech, Coaching, Billing, Events, Summit, General) — each with domain-specific tool access</li>
                  <li>Category-based routing: Ticket classification determines which expert agent handles the request</li>
                  <li>RAG system: Vector search through GBs of Zoom coaching transcripts (expert knowledge retrieval)</li>
                  <li>Palantir Foundry OSDK: 20+ integrations providing biomechanical analysis, session history, invoices, ticket history</li>
                  <li>Structured outputs: Zod schema validation ensures reliable, parseable AI responses</li>
                </ul>

                <p className="font-semibold mt-3">Production System Scale:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>16 active workflows, 601+ nodes in customer support system</li>
                  <li>CS: Smart Ticket Classifier (89 nodes) — duplicate detection, DNC enforcement, AI classification, live queue updates</li>
                  <li>CS: Request Analyzer (69 nodes) — multi-agent analysis with Foundry context, confidence-scored proposals</li>
                  <li>CS: Action Handler (172 nodes) — 13x expansion from 13-node MVP, handles all Slack interactions</li>
                  <li>Bidirectional Slack sync — full helpdesk in Slack, agents never need FluentSupport UI</li>
                </ul>

                <p className="font-semibold mt-3">Key Innovations:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Race condition prevention: Early lock + Wait node pattern handles concurrent ticket submissions</li>
                  <li>Async webhook resume: Zoom→Vimeo pipeline suspends execution, resumes on transcoding callback</li>
                  <li>Live-updating agent queues: Pinned Slack messages + DM lists continuously rebuilt as tickets arrive</li>
                  <li>Invoice PDF automation: Billing agent fetches invoices from Bexio, uploads to Slack thread</li>
                  <li>Voice reply support: Audio transcription enables mobile-first agent workflows</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 4: Dual-Runtime LLM Pipeline Framework */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Dual-Runtime LLM Pipeline Framework</CardTitle>
            <CardDescription>
              Standalone Python pip package for deterministic multi-step LLM pipelines running both in-process for low latency
              and on LangGraph Standalone Server for visual debugging and MCP endpoint exposure — same code, zero duplication, different runtimes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">LangGraph</Badge>
              <Badge variant="secondary">LangChain</Badge>
              <Badge variant="secondary">LangSmith Studio</Badge>
              <Badge variant="secondary">MCP Protocol</Badge>
              <Badge variant="secondary">FastAPI</Badge>
              <Badge variant="secondary">Architecture Design</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Custom LLM pipelines (ticket analysis, podcast generation) were tightly coupled to Oracle platform internals — could only run in-process. No visual debugging (Studio requires LangGraph Standalone Server), no external access for n8n workflows, no resource isolation for batch jobs competing with interactive chat traffic.</p>

                <p className="font-semibold mt-3">Architecture Innovation — Composable Capability Protocols:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Pipelines define capability protocols (LLMCapability, TicketDataCapability, TTSCapability, RetrievalCapability)</li>
                  <li>DirectPipelineContext: direct service injection for in-process Oracle execution (low latency)</li>
                  <li>HttpPipelineContext: environment variables + Oracle API calls over HTTP for LangGraph Server</li>
                  <li>Same pip package, same code version — runtime injection determines context implementation</li>
                  <li>Zero Oracle imports in pipeline code — pure functions interacting through capability protocols</li>
                </ul>

                <p className="font-semibold mt-3">Dual Deployment Strategy:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>LangGraph Standalone Server (langgraph.tob.sh): LangSmith Studio debugging, auto-MCP endpoint at /mcp, independent scaling</li>
                  <li>Oracle in-process: DirectPipelineContext for low-latency text-callable execution from chat agents</li>
                  <li>n8n workflows consume pipelines via MCP protocol — zero custom integration work per pipeline</li>
                  <li>3-container Docker Compose: langgraph-api, PostgreSQL (checkpoints), Redis (streaming)</li>
                </ul>

                <p className="font-semibold mt-3">Research-Driven Architecture:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>5 targeted deep-research investigations before implementation: LangChain ecosystem, SurfSense architecture, n8n integration, LangGraph Platform, production adoption patterns</li>
                  <li>LangFlow→LangGraph bridge eliminated (GitHub issues #9216, #4090 closed as "not planned" — data models incompatible)</li>
                  <li>Pipeline boundary rule established: LangGraph for multi-step reasoning with state, n8n for system integration and simple prompt chains</li>
                  <li>Consumer-first interface design: sketched ideal pipeline node code before defining protocols</li>
                </ul>

                <p className="font-semibold mt-3">Production Pipelines:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>ticket_analyse: 3 nodes — fetch tickets from Foundry → retrieve structural analyses via RAG → generate German feedback</li>
                  <li>podcaster: 2 nodes — generate transcript via LLM → concurrent TTS segments → FFmpeg merge</li>
                  <li>LangGraph Assistants pattern: Configuration dataclass per pipeline with tunable fields for non-coder customization</li>
                  <li>Standardized 6-file structure: graph.py, state.py, nodes.py, configuration.py, prompts.py, __init__.py</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project 5: TOB Vibe Kanban */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>TOB Vibe Kanban: Enterprise Multi-Agent Orchestration Platform</CardTitle>
            <CardDescription>
              Advanced dual-fork architecture enabling autonomous AI agent orchestration at scale through
              sophisticated patch management, seamless GitHub integration, and cross-platform distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Rust</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Fork Engineering</Badge>
              <Badge variant="secondary">Agent Orchestration</Badge>
              <Badge variant="secondary">Cross-Platform</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Successfully maintained dual forks with zero upstream merge conflicts via stgit methodology</li>
                <li>✓ Enabled enterprise-scale headless agent orchestration across distributed development teams</li>
                <li>✓ Achieved single-command organizational rollout eliminating manual installation overhead</li>
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Enterprise required unified AI orchestration platform merging VibeKanban's workflow engine with Claude MPM's advanced agent capabilities while preserving upstream compatibility across both evolving codebases.</p>

                <p className="font-semibold mt-3">Dual Fork Architecture:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Engineered headless mode for Claude MPM enabling fully autonomous multi-agent execution</li>
                  <li>Built custom executor integration bridging VibeKanban and MPM through command override architecture</li>
                  <li>Implemented stgit-based patch management maintaining clean separation of enterprise customizations from upstream</li>
                  <li>GitHub organization integration with one-click repository cloning and project initialization</li>
                </ul>

                <p className="font-semibold mt-3">Enterprise Distribution:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Production NPM package with optimized binaries across 6 platform targets (Linux, macOS, Windows)</li>
                  <li>Fully automated CI/CD pipeline with pre-release validation and multi-architecture builds</li>
                  <li>Zero-configuration deployment via npx with intelligent binary caching and platform detection</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

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
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">MediaPipe</Badge>
              <Badge variant="secondary">BiRefNet</Badge>
              <Badge variant="secondary">Gemini LLM</Badge>
              <Badge variant="secondary">Palantir Foundry</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
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
              className="border-2 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all cursor-pointer group relative h-[300px] flex items-center justify-center"
              onClick={() => setOpenDemo('structure-viewer')}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="text-center z-10">
                <Play className="h-16 w-16 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-lg font-semibold">Click to View Interactive Demo</p>
                <p className="text-sm text-muted-foreground mt-2">Biomechanical analysis pipeline</p>
              </div>
            </div>
          </CardContent>
        </Card>
            </div>

            {/* Additional Right Column */}
            <div className="space-y-8">
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
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">LLM Orchestration</Badge>
              <Badge variant="secondary">DAG Architecture</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
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
              className="border-2 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all cursor-pointer group relative h-[300px] flex items-center justify-center"
              onClick={() => window.location.href = '/demos/dependency-graph'}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="text-center z-10">
                <Play className="h-16 w-16 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-lg font-semibold">Click to View Interactive Demo</p>
                <p className="text-sm text-muted-foreground mt-2">LLM pipeline orchestration interface</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project 8: Multi-Modal Veterinary AI Assistant */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Multi-Modal Veterinary AI Assistant</CardTitle>
            <CardDescription>
              Production-grade RAG system with multi-modal analysis capabilities, processing GBs of veterinary
              textbooks and patient case histories for personalized diagnostic support
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">LangChain</Badge>
              <Badge variant="secondary">Google AI</Badge>
              <Badge variant="secondary">ChromaDB</Badge>
              <Badge variant="secondary">Multi-Modal RAG</Badge>
              <Badge variant="secondary">Computer Vision</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Reduced diagnostic research time from 30+ minutes to &lt;3 minutes (90%+ reduction)</li>
                <li>✓ Processed 8+ GB of veterinary textbooks with semantic search</li>
                <li>✓ Achieved 80%+ accuracy in image-based disease identification</li>
                <li>✓ 100% response traceability with citation chain to sources</li>
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Veterinary professionals needed instant access to multi-GB medical knowledge base with image-based disease identification capabilities and full citation traceability.</p>

                <p className="font-semibold mt-3">Solution - Key Capabilities:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Multi-GB knowledge base: High-quality veterinary science textbooks with semantic search across text and images</li>
                  <li>Patient-specific analysis: Loads individual medical case histories for personalized diagnostic recommendations</li>
                  <li>Multi-modal disease detection: Analyzes uploaded images, semantically compares with textbook reference images to identify conditions</li>
                  <li>Explainable AI: Split-view PDF source viewer highlighting exact pages, chunks, and images used in response generation</li>
                  <li>Grounded responses with citation chain: Every recommendation traceable to authoritative veterinary literature</li>
                </ul>
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

        {/* Project 9: Production Web Scraping Infrastructure */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Production Web Scraping Infrastructure</CardTitle>
            <CardDescription>
              Enterprise-grade data extraction pipelines for multiple clients: medical literature structuring (5000+ documents)
              and automated review monitoring, deployed to Palantir Foundry with scheduled orchestration
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Playwright</Badge>
              <Badge variant="secondary">BeautifulSoup</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Palantir Foundry</Badge>
              <Badge variant="secondary">ETL Pipelines</Badge>
            </div>

            {/* Results - Always Visible */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Processed 5000+ medical articles into structured ML datasets</li>
                <li>✓ Automated daily monitoring eliminating 10+ hours/week of manual work</li>
                <li>✓ Maintained 99%+ uptime with zero detection/blocking incidents</li>
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
              <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                <p className="font-semibold">Challenge:</p>
                <p>Multiple clients needed production-grade web scraping: large-scale medical literature extraction for ML datasets, and automated review monitoring for competitive intelligence.</p>

                <p className="font-semibold mt-3">Medical Knowledge Extraction:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Scraped and structured 5000+ articles from Merck Veterinary Manual for ML training datasets</li>
                  <li>Automated ETL pipeline converting HTML to clean JSON with scheduled execution</li>
                </ul>

                <p className="font-semibold mt-3">Review Monitoring System:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Multi-source scraping: Trustpilot and ProvenExpert with daily automated updates</li>
                  <li>Deployed to Palantir Foundry with scheduled orchestration for competitive intelligence</li>
                </ul>

                <p className="font-semibold mt-3">Technical Infrastructure:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Playwright headless browser automation handling JavaScript-heavy sites</li>
                  <li>Anti-detection: Rotating user agents, rate limiting, and intelligent retry logic</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
            </div>

            {/* Show Fewer Projects Button */}
            <div className="col-span-full flex justify-center my-8">
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
          </>
        )}
      </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Interested in collaborating or learning more about these projects?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Get in touch
            </a>
          </p>
        </div>
        </div>
      </section>

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
    </div>
  );
}
