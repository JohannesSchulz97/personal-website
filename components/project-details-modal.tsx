import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/projectsData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ProjectDetailsModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDetailsModal({
  project,
  open,
  onOpenChange,
}: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b pb-4 shrink-0">
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            {project.description}
          </p>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-1">
          <div className="prose prose-slate dark:prose-invert max-w-none pb-6 space-y-8">
            {project.technicalDetails.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className={`text-xl font-semibold flex items-center gap-3 mb-4 ${idx === 0 ? 'mt-0' : ''}`}>
                  <span className="text-2xl">{section.icon}</span>
                  <span>{section.title}</span>
                </h3>
                {section.paragraphs.map((paragraph, pIdx) => (
                  <div key={pIdx} className="text-sm leading-relaxed text-muted-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {paragraph}
                    </ReactMarkdown>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
