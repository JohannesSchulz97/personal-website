"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";

type AnalysisState = "initial" | "analyzing" | "complete";
type TextVersion = "leads" | "kunden" | "full";

export default function StructureAnalysisDemo() {
  const [state, setState] = useState<AnalysisState>("initial");
  const [activeTab, setActiveTab] = useState<TextVersion>("kunden");
  const [leadsText, setLeadsText] = useState<string>("");
  const [kundenText, setKundenText] = useState<string>("");
  const [fullText, setFullText] = useState<string>("");

  const handleAnalyze = async () => {
    setState("analyzing");

    // Simulate analysis processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Load text files
    const [leads, kunden, full] = await Promise.all([
      fetch("/demos/structure-analysis/leads_version.md").then((r) => r.text()),
      fetch("/demos/structure-analysis/kunden_version.md").then((r) => r.text()),
      fetch("/demos/structure-analysis/full_report.md").then((r) => r.text()),
    ]);

    setLeadsText(leads);
    setKundenText(kunden);
    setFullText(full);
    setState("complete");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {state === "initial" && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-8 lg:border-r">
            <div className="relative aspect-[9/16] max-h-[350px] md:max-h-[500px] lg:max-h-[700px] rounded-lg overflow-hidden border-2 border-border">
              <img
                src="/demos/structure-analysis/original.png"
                alt="Patient original photo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Button */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-8">
            <Button
              onClick={handleAnalyze}
              size="lg"
              className="w-full max-w-md"
            >
              <Play className="h-5 w-5 mr-2" />
              Conduct Structure Analysis
            </Button>
          </div>
        </div>
      )}

      {state === "analyzing" && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Analyzing structure...</p>
              <p className="text-sm text-muted-foreground">
                Processing pose estimation, biomechanical analysis, and generating report
              </p>
            </div>
          </div>
        </div>
      )}

      {state === "complete" && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-8 lg:border-r">
            <div className="relative aspect-[9/16] max-h-[350px] md:max-h-[500px] lg:max-h-[700px] rounded-lg overflow-hidden border-2 border-border">
              <img
                src="/demos/structure-analysis/annotated_blurred.png"
                alt="Analyzed structure with annotations"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Tabbed text results */}
          <div className="w-full lg:w-1/2 flex flex-col min-h-0">
            {/* Tab navigation */}
            <div className="flex gap-1 px-4 md:px-6 pt-4 md:pt-6 border-b flex-wrap">
              <button
                onClick={() => setActiveTab("kunden")}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors rounded-t-lg ${
                  activeTab === "kunden"
                    ? "bg-teal/10 text-teal border-b-2 border-teal"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors rounded-t-lg ${
                  activeTab === "leads"
                    ? "bg-teal/10 text-teal border-b-2 border-teal"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Leads
              </button>
              <button
                onClick={() => setActiveTab("full")}
                className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors rounded-t-lg ${
                  activeTab === "full"
                    ? "bg-teal/10 text-teal border-b-2 border-teal"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Full Report
              </button>
            </div>

            {/* Text content */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 min-h-0">
              <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:mb-4 md:prose-h1:mb-6 prose-h1:mt-0 prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 md:prose-h3:mt-8 prose-h3:mb-3 md:prose-h3:mb-4 prose-h3:border-b prose-h3:border-slate-700 prose-h3:pb-2 prose-p:mb-3 md:prose-p:mb-4 prose-p:leading-relaxed prose-strong:text-teal-400 prose-strong:font-semibold">
                {activeTab === "kunden" && (
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkEmoji]}>{kundenText}</ReactMarkdown>
                )}
                {activeTab === "leads" && (
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkEmoji]}>{leadsText}</ReactMarkdown>
                )}
                {activeTab === "full" && (
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkEmoji]}>{fullText}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
