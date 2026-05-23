"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { Project } from "@/lib/projectsData";

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
  demoContent?: React.ReactNode;
}

export default function ProjectCard({ project, onViewDetails, demoContent }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex-1">
          <CardTitle className="mb-3">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className={`w-12 h-12 rounded-lg flex-shrink-0 object-cover${project.image.includes('n8n-icon') ? ' bg-white' : ''}`}
          />
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {project.badges.map((badge) => (
            <Badge key={badge} variant="teal">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Results */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-semibold">Results:</p>
          <ul className="list-inside space-y-1">
            {project.results.map((result, idx) => (
              <li key={idx}>✓ {result}</li>
            ))}
          </ul>
        </div>

        {/* Optional demo content (for biomech) */}
        {demoContent}

        {/* View Details Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="w-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
