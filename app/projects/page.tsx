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
        {/* Project 1: TOB Claude Enablement */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>TOB Claude Enablement</CardTitle>
            <CardDescription>
              Organization-wide AI assistant configuration infrastructure enabling standardized development
              workflows across distributed teams with automated budget management
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Bash</Badge>
              <Badge variant="secondary">Claude Code</Badge>
              <Badge variant="secondary">YAML</Badge>
              <Badge variant="secondary">Git Automation</Badge>
              <Badge variant="secondary">DevOps</Badge>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Challenge:</p>
              <p>Development organization needed centralized AI-assisted development infrastructure with standardized workflows and budget management across distributed team.</p>

              <p className="font-semibold mt-3">Solution:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Deployed Claude Code workspaces via Coder on Hetzner infrastructure for centralized development</li>
                <li>Four-tier CLAUDE.md configuration hierarchy for standardized AI assistant behavior</li>
                <li>Cross-repository template synchronization system with bidirectional sync</li>
                <li>Automated token budget tracking and optimization</li>
                <li>TIDE workflow (Think → Implement → Deploy → Evaluate) integration</li>
              </ul>

              <p className="font-semibold mt-3">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Centralized AI-assisted development infrastructure for distributed team</li>
                <li>✓ Reduced token costs by 70% with budget optimization</li>
                <li>✓ Cut developer onboarding time from days to hours</li>
                <li>✓ Achieved 90%+ consistency in AI output quality</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 2: TIDE Development Platform */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>TIDE Development Platform</CardTitle>
            <CardDescription>
              Internal developer platform with automated deployment pipelines, Zero Trust security,
              and AI-powered autonomous development workflows
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Cloudflare Workers</Badge>
              <Badge variant="secondary">Edge Computing</Badge>
              <Badge variant="secondary">Zero Trust</Badge>
              <Badge variant="secondary">CI/CD</Badge>
              <Badge variant="secondary">TypeScript</Badge>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Challenge:</p>
              <p>Need to deploy Claude-powered applications across development, staging, and production environments with zero-downtime guarantees and enterprise security requirements.</p>

              <p className="font-semibold mt-3">Solution:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Three-environment deployment pipeline (development/preview/production)</li>
                <li>Auto-Claude pipeline for autonomous feature builds with QA review gates</li>
                <li>Zero Trust security architecture with Cloudflare Access</li>
                <li>Automated SSL/TLS certificate management</li>
                <li>Edge-native deployment on Cloudflare infrastructure</li>
              </ul>

              <p className="font-semibold mt-3">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Maintained 99.9%+ uptime across production environments</li>
                <li>✓ Reduced deployment time from hours to minutes (8x improvement)</li>
                <li>✓ Zero security incidents with Zero Trust architecture</li>
                <li>✓ Eliminated manual SSL certificate management overhead</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 3: Vibe Kanban */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Vibe Kanban</CardTitle>
            <CardDescription>
              Real-time collaboration platform integrating multiple AI assistants with GitHub workflows
              and high-performance WebSocket synchronization
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">WebSocket</Badge>
              <Badge variant="secondary">Real-time Sync</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">GitHub Integration</Badge>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Challenge:</p>
              <p>Development teams needed real-time collaboration platform integrating 8+ specialized AI assistants with GitHub PR workflows and instant synchronization across distributed teams.</p>

              <p className="font-semibold mt-3">Solution:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>WebSocket-based real-time synchronization with bounded history management</li>
                <li>Multi-agent executor supporting 8+ AI assistants (code review, docs, testing, deployment)</li>
                <li>GitHub PR review automation with AI-powered narrative generation</li>
                <li>High-performance backend achieving sub-10ms latency</li>
                <li>Cross-platform distribution via npx with automatic binary downloads</li>
              </ul>

              <p className="font-semibold mt-3">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Reduced PR review time by 50%+ with AI-assisted reviews</li>
                <li>✓ Achieved &lt;10ms WebSocket latency for real-time collaboration</li>
                <li>✓ Increased team productivity by 30%+ with unified workflow</li>
                <li>✓ Supported 6 platform targets with single npx command</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 4: Struktur Analyse */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Struktur Analyse</CardTitle>
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

        {/* Project 5: LLM Pipeline Orchestration System */}
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
              onClick={() => setOpenDemo('dependency-graph')}
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

        {/* Project 6: CAPS */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>CAPS (Claude Automated Programming System)</CardTitle>
            <CardDescription>
              Organization-wide AI assistant infrastructure supporting 200+ concurrent agent workspaces
              with token budget management across distributed development teams
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Bash</Badge>
              <Badge variant="secondary">Claude Code</Badge>
              <Badge variant="secondary">DevOps</Badge>
              <Badge variant="secondary">Git Automation</Badge>
              <Badge variant="secondary">YAML</Badge>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Challenge:</p>
              <p>Development organization needed to coordinate AI-assisted development across 200+ concurrent workspaces while managing merge conflicts and ensuring code quality consistency.</p>

              <p className="font-semibold mt-3">Solution - Key Capabilities:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Four-level CLAUDE.md configuration hierarchy for organization-wide AI assistant standardization</li>
                <li>TIDE workflow (Think → Implement → Deploy → Evaluate) with autonomous builds</li>
                <li>AI-powered merge conflict resolution for parallel development workflows</li>
                <li>Cross-repository template synchronization keeping 200+ workspaces aligned</li>
                <li>Token budget management system optimizing AI usage across development teams</li>
              </ul>

              <p className="font-semibold mt-3">Results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>✓ Reduced merge conflict resolution time by 70%+ with AI automation</li>
                <li>✓ Synchronized 200+ repositories with zero manual intervention</li>
                <li>✓ Reduced developer wait time by 60%+ with autonomous builds</li>
                <li>✓ Maintained consistent code quality across all projects</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 7: VetBot */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>VetBot: Multi-Modal Veterinary AI Assistant</CardTitle>
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
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4 mr-2" />
                  Demo
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Article
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project 8: Web Scraping & Review Analytics Suite */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Web Scraping & Review Analytics Suite</CardTitle>
            <CardDescription>
              Production-grade web scraping infrastructure for automated data extraction and sentiment analysis,
              deployed to Palantir Foundry with scheduled pipelines
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Playwright</Badge>
              <Badge variant="secondary">BeautifulSoup</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Palantir Foundry</Badge>
              <Badge variant="secondary">Sentiment Analysis</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Key Capabilities:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Multi-source review scraping: Trustpilot and ProvenExpert with automated regular updates</li>
                <li>Deployed to Palantir Foundry code repository with scheduled pipeline orchestration</li>
                <li>Sentiment analysis and competitive intelligence for business insights</li>
                <li>Merck Veterinary Manual scraper: 5000+ structured articles for ML/NLP training datasets</li>
                <li>Robust error handling, rate limiting, and anti-detection mechanisms for production reliability</li>
              </ul>
            </div>
            <div className="flex gap-2 mt-auto">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://github.com"
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
