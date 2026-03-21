"use client";

import Image from "next/image";
import { Github, ExternalLink, Youtube, FileText, Play } from "lucide-react";
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {/* Project 1: CAPS */}
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

            <div className="text-sm text-muted-foreground space-y-2">
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

              <p className="font-semibold mt-3">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Eliminated scope creep through frozen PRD enforcement</li>
                <li>✓ System improves itself: every project makes CAPS better for all users</li>
                <li>✓ Parallel autonomous builds with isolated git worktree execution</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 2: TOB Vibe Kanban */}
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

            <div className="text-sm text-muted-foreground space-y-2">
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

              <p className="font-semibold mt-3">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Successfully maintained dual forks with zero upstream merge conflicts via stgit methodology</li>
                <li>✓ Enabled enterprise-scale headless agent orchestration across distributed development teams</li>
                <li>✓ Achieved single-command organizational rollout eliminating manual installation overhead</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 3: Biomechanical Structure Analysis */}
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
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Key Capabilities:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Multi-stage computer vision pipeline combining MediaPipe pose estimation, BiRefNet segmentation, and Gemini LLM analysis</li>
                <li>Bottom-up kinetic chain analysis (Ankle → Knee → Hip → Pelvis → Thorax → Cervical)</li>
                <li>Privacy-preserving features with background blur and face blur</li>
                <li>Deployed to production clinical workflow on Palantir Foundry</li>
                <li>German-language output for end users with detailed biomechanical feedback</li>
              </ul>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Deployed to production clinical workflow processing 40+ patient assessments daily</li>
                <li>✓ Reduced biomechanical assessment time from 30 minutes to 5 minutes (80%+ reduction)</li>
                <li>✓ Achieved 90%+ accuracy in posture deviation detection</li>
                <li>✓ 100% GDPR compliance with privacy-preserving blur layers</li>
              </ul>
            </div>

            {/* Demo Preview */}
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

        {/* Project 4: LLM Pipeline Orchestration System */}
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

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Challenge:</p>
              <p>Clinical teams needed automated biomechanical assessment reports, but manual LLM orchestration was error-prone and required technical expertise.</p>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-semibold">Solution - Key Capabilities:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Visual DAG editor for designing specialized LLM agent pipelines with dependency resolution</li>
                <li>Multi-stage analysis workflow: pose estimation → anatomical assessment → biomechanical interpretation → clinical recommendations</li>
                <li>Node-based architecture enabling modular, reusable AI analysis components</li>
                <li>Real-time cycle detection and validation ensuring robust pipeline execution</li>
                <li>Produces high-quality, structured biomechanical analysis reports through agent collaboration</li>
              </ul>
            </div>

            <div className="text-sm text-muted-foreground space-y-2 mt-3">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Reduced report generation time from 2 hours to 10 minutes (90%+ reduction)</li>
                <li>✓ Eliminated 95%+ of pipeline configuration errors with visual validation</li>
                <li>✓ Enabled non-technical users to customize analysis workflows</li>
                <li>✓ Processed 150+ clinical assessments with zero pipeline failures</li>
              </ul>
            </div>

            {/* Demo Preview */}
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

        {/* Project 5: Multi-Modal Veterinary AI Assistant */}
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

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Challenge:</p>
              <p>Veterinary professionals needed instant access to multi-GB medical knowledge base with image-based disease identification capabilities and full citation traceability.</p>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-semibold mt-3">Solution - Key Capabilities:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Multi-GB knowledge base: High-quality veterinary science textbooks with semantic search across text and images</li>
                <li>Patient-specific analysis: Loads individual medical case histories for personalized diagnostic recommendations</li>
                <li>Multi-modal disease detection: Analyzes uploaded images, semantically compares with textbook reference images to identify conditions</li>
                <li>Explainable AI: Split-view PDF source viewer highlighting exact pages, chunks, and images used in response generation</li>
                <li>Grounded responses with citation chain: Every recommendation traceable to authoritative veterinary literature</li>
              </ul>
            </div>

            <div className="text-sm text-muted-foreground space-y-2 mt-3">
              <p className="font-semibold">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Reduced diagnostic research time from 30+ minutes to &lt;3 minutes (90%+ reduction)</li>
                <li>✓ Processed 8+ GB of veterinary textbooks with semantic search</li>
                <li>✓ Achieved 80%+ accuracy in image-based disease identification</li>
                <li>✓ 100% response traceability with citation chain to sources</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
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

        {/* Project 6: Production Web Scraping Infrastructure */}
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

            <div className="text-sm text-muted-foreground space-y-2">
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

              <p className="font-semibold mt-3">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Processed 5000+ medical articles into structured ML datasets</li>
                <li>✓ Automated daily monitoring eliminating 10+ hours/week of manual work</li>
                <li>✓ Maintained 99%+ uptime with zero detection/blocking incidents</li>
              </ul>
            </div>
          </CardContent>
        </Card>
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
