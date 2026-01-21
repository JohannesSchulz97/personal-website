import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Brain, Globe, Wrench, Languages } from "lucide-react";

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Skills & Expertise</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive overview of my technical skills and proficiencies
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Programming Languages */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <CardTitle>Programming Languages</CardTitle>
            </div>
            <CardDescription>Core programming competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Python</Badge>
                  <Badge variant="secondary">5+ years</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Proficient - Main language for ML and data processing
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>C</Badge>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Strong understanding of low-level programming
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>C++</Badge>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Familiar with OOP and performance optimization
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Java</Badge>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Backend development and software engineering
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>SQL</Badge>
                  <Badge variant="outline">Intermediate</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Queries, database manipulation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Machine Learning & Data Science */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <CardTitle>Machine Learning & Data Science</CardTitle>
            </div>
            <CardDescription>ML libraries and expertise areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Libraries & Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>scikit-learn</Badge>
                  <Badge>pandas</Badge>
                  <Badge>numpy</Badge>
                  <Badge variant="outline">TensorFlow</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Expertise Areas</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Feature Engineering</Badge>
                  <Badge variant="secondary">Data Preprocessing</Badge>
                  <Badge variant="secondary">Probabilistic Modeling</Badge>
                  <Badge variant="secondary">Statistical Analysis</Badge>
                  <Badge variant="secondary">Predictive Modeling</Badge>
                  <Badge variant="secondary">Model Optimization</Badge>
                  <Badge variant="secondary">LLM Integration</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Web Development & APIs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Web Development & APIs</CardTitle>
            </div>
            <CardDescription>Frontend and backend technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">HTML</Badge>
                  <Badge variant="outline">CSS</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Intermediate - Web frontend fundamentals
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Backend & Automation</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">FastAPI</Badge>
                  <Badge variant="outline">Playwright</Badge>
                  <Badge variant="outline">BeautifulSoup4</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  REST API development, web scraping and automation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools & Technologies */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              <CardTitle>Tools & Technologies</CardTitle>
            </div>
            <CardDescription>Development and productivity tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">LaTeX</span>
                <Badge>Proficient</Badge>
              </div>
              <p className="text-sm text-muted-foreground -mt-2">
                Academic writing and documentation
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Git</span>
                <Badge variant="outline">Intermediate</Badge>
              </div>
              <p className="text-sm text-muted-foreground -mt-2">
                Version control
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Linux</span>
                <Badge variant="outline">Intermediate</Badge>
              </div>
              <p className="text-sm text-muted-foreground -mt-2">
                Shell scripting, server setup
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Excel & PowerPoint</span>
                <Badge variant="outline">Basic</Badge>
              </div>
              <p className="text-sm text-muted-foreground -mt-2">
                Reporting and visualization
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Spoken Languages */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              <CardTitle>Spoken Languages</CardTitle>
            </div>
            <CardDescription>Communication proficiencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">German</span>
                  <Badge>Native (C2)</Badge>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">English</span>
                  <Badge>Fluent (C2)</Badge>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">French</span>
                  <Badge variant="outline">Intermediate (B1)</Badge>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
