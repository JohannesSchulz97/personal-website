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
import StructureAnalysisDemo from "@/components/demos/structure-analysis";
import ProjectCard from "@/components/project-card";
import ProjectDetailsModal from "@/components/project-details-modal";
import { projects } from "@/lib/projectsData";
import { useState } from "react";

function BiomechDemosModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-full h-[90vh] p-0 flex flex-col outline-none">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle>Structure Analysis</DialogTitle>
        </DialogHeader>

        {/* Demo Content */}
        <div className="flex-1 min-h-0">
          <StructureAnalysisDemo />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsSection() {
  const [openDemo, setOpenDemo] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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
        {/* Default Projects (4 shown initially) */}
        <div className="space-y-8">
        {/* 1. Foundry Migration */}
        <ProjectCard
          project={projects[0]}
          onViewDetails={() => setSelectedProject('foundry')}
        />

        {/* 2. Biomechanical Structure Analysis */}
        <ProjectCard
          project={projects[1]}
          onViewDetails={() => setSelectedProject('biomech')}
          demoContent={
            <div
              className="border rounded-lg overflow-hidden bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 hover:from-emerald-500/10 hover:to-cyan-500/10 transition-all cursor-pointer group relative h-[120px] flex items-center justify-center outline-none"
              onClick={() => setOpenDemo('biomech-demos')}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="flex items-center gap-3 z-10">
                <Play className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-sm font-semibold">View Interactive Demo</p>
                </div>
              </div>
            </div>
          }
        />

        {/* 3. OpenClaw Agents */}
        <ProjectCard
          project={projects[2]}
          onViewDetails={() => setSelectedProject('openclaw')}
        />

        {/* 4. Customer Support Automation */}
        <ProjectCard
          project={projects[3]}
          onViewDetails={() => setSelectedProject('customer-support')}
        />

        {/* Additional Projects - Hidden by default (6 more) */}
        {showAllProjects && (
          <>
        {/* 5. CAPS */}
        <ProjectCard
          project={projects[4]}
          onViewDetails={() => setSelectedProject('caps')}
        />

        {/* 6. Vet Assistant */}
        <ProjectCard
          project={projects[5]}
          onViewDetails={() => setSelectedProject('vet-assistant')}
        />

        {/* 7. Web Scraping */}
        <ProjectCard
          project={projects[6]}
          onViewDetails={() => setSelectedProject('web-scraping')}
        />

        {/* 8. LLM Pipeline Framework */}
        <ProjectCard
          project={projects[7]}
          onViewDetails={() => setSelectedProject('llm-pipeline')}
        />

        {/* 9. TOB Vibe Kanban */}
        <ProjectCard
          project={projects[8]}
          onViewDetails={() => setSelectedProject('tob-vibe')}
        />

        {/* 10. Screw Manufacturing */}
        <ProjectCard
          project={projects[9]}
          onViewDetails={() => setSelectedProject('screw-manufacturing')}
        />
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
              Show More Projects (6)
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
      <BiomechDemosModal
        open={openDemo === 'biomech-demos'}
        onOpenChange={(open) => !open && setOpenDemo(null)}
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={projects.find((p) => p.id === selectedProject) || null}
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
}
