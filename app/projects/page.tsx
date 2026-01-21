"use client";

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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
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
        {/* Project 1: DependencyGraph Tool */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>DependencyGraph Tool</CardTitle>
            <CardDescription>
              Interactive visual tool for designing LLM analysis node architectures for
              biomechanical structural analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind</Badge>
              <Badge variant="secondary">SVG</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Drag and drop nodes</li>
                <li>Add/remove connections</li>
                <li>Cycle detection</li>
                <li>Zoom and pan controls</li>
                <li>Auto-layout algorithm</li>
                <li>Undo/Redo support</li>
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
                <p className="text-sm text-muted-foreground mt-2">Node dependency graph editor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project 2: Gemini Structure Analysis */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Gemini Structure Analysis</CardTitle>
            <CardDescription>
              Biomechanical structure analysis using Google's Gemini AI to analyze body
              posture from side-view images
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Google AI</Badge>
              <Badge variant="secondary">Computer Vision</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Analyzes 6 anatomical landmarks</li>
                <li>Measures deviations from gravity line</li>
                <li>Generates detailed biomechanical feedback in German</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 3: StrukturAnalyse Layer Viewer */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>StrukturAnalyse Layer Viewer</CardTitle>
            <CardDescription>
              Interactive visualization tool for biomechanical analysis layers with
              dual-image comparison capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind</Badge>
              <Badge variant="secondary">Canvas API</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Toggle different analysis layers</li>
                <li>Dual-image comparison mode</li>
                <li>Interactive visualization controls</li>
                <li>Real-time layer compositing</li>
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
                <p className="text-sm text-muted-foreground mt-2">Biomechanical layer visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project 4: tob-claude-setup */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>tob-claude-setup</CardTitle>
            <CardDescription>
              Shared Claude Code configurations for team projects with standardized
              workflows and automation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Bash</Badge>
              <Badge variant="secondary">Claude Code</Badge>
              <Badge variant="secondary">DevOps</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Standardized project instructions</li>
                <li>Custom slash commands</li>
                <li>Git hooks integration</li>
                <li>Project setup automation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Project 5: VetBot */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>VetBot</CardTitle>
            <CardDescription>
              Veterinary assistant chatbot using RAG pipeline to provide grounded,
              accurate responses from veterinary datasets
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">LangChain</Badge>
              <Badge variant="secondary">Google AI</Badge>
              <Badge variant="secondary">ChromaDB</Badge>
              <Badge variant="secondary">Python</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Retrieval-Augmented Generation (RAG) pipeline</li>
                <li>Minimizes AI hallucinations</li>
                <li>Grounded responses from veterinary dataset</li>
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

        {/* Project 6: Merck Veterinary Manual Scraper */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Merck Veterinary Manual Scraper</CardTitle>
            <CardDescription>
              Web scraping project creating structured dataset of veterinary science
              articles for ML/NLP applications
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Playwright</Badge>
              <Badge variant="secondary">BeautifulSoup</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">Web Scraping</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Automated data extraction</li>
                <li>Structured article dataset</li>
                <li>Optimized for ML/NLP applications</li>
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
              src="/demos/structure-viewer"
              className="w-full h-full border-0"
              title="Structure Viewer Demo"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
