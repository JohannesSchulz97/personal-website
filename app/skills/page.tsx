import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Brain, Globe, Cloud, Zap, Database } from "lucide-react";

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative pb-12 overflow-hidden">
        {/* Background Image - Full Width */}
        <div className="absolute inset-0 w-full">
          <Image
            src="/P1000026.JPG"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Technical Skills</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Focused on building production systems with strong foundations in mathematics, computer science, and AI.
          Specialized in full-stack development, machine learning infrastructure, and scalable cloud applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Programming Languages */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <CardTitle>Programming Languages</CardTitle>
            </div>
            <CardDescription>Primary languages for production development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Python</span>
                  <Badge>Expert</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ML/AI development, data processing, backend services, automation
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">TypeScript/JavaScript</span>
                  <Badge>Expert</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full-stack web development, Node.js backend, React/Next.js
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">SQL</span>
                  <Badge variant="secondary">Advanced</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Database design, complex queries, optimization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Web Development & Full-Stack */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>Web Development</CardTitle>
            </div>
            <CardDescription>Modern full-stack technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Next.js</Badge>
                  <Badge>React</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Node.js</Badge>
                  <Badge>FastAPI</Badge>
                  <Badge variant="outline">REST APIs</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Testing</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Playwright</Badge>
                  <Badge>pytest</Badge>
                  <Badge variant="outline">Jest</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI & Machine Learning */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <CardTitle>AI & Machine Learning</CardTitle>
            </div>
            <CardDescription>ML frameworks and AI integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">ML Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>scikit-learn</Badge>
                  <Badge>pandas</Badge>
                  <Badge>numpy</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">LLM & AI Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Claude API</Badge>
                  <Badge>LangChain</Badge>
                  <Badge>Gemini API</Badge>
                  <Badge variant="outline">RAG Systems</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Computer Vision</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>MediaPipe</Badge>
                  <Badge variant="outline">Image Processing</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cloud & Infrastructure */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              <CardTitle>Cloud & Infrastructure</CardTitle>
            </div>
            <CardDescription>Deployment and DevOps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Cloud Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Cloudflare Workers</Badge>
                  <Badge>Hetzner</Badge>
                  <Badge variant="outline">Edge Computing</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">CI/CD & Automation</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>GitHub Actions</Badge>
                  <Badge>CI/CD Pipelines</Badge>
                  <Badge>Docker</Badge>
                  <Badge>Git</Badge>
                  <Badge variant="outline">Coder</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Monitoring & Security</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Zero Trust</Badge>
                  <Badge variant="outline">SSL/TLS</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Databases & Data */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>Databases & Data</CardTitle>
            </div>
            <CardDescription>Data storage and processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Databases</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>PostgreSQL</Badge>
                  <Badge>SQLite</Badge>
                  <Badge>Cloudflare D1</Badge>
                  <Badge variant="outline">ChromaDB</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Data Processing</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Palantir Foundry</Badge>
                  <Badge variant="secondary">ETL Pipelines</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-Time & Performance */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <CardTitle>Real-Time & Performance Engineering</CardTitle>
            </div>
            <CardDescription>Low-latency systems and optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 text-sm">Real-Time Technologies</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">WebSocket</span>
                      <Badge variant="secondary">Expert</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Real-time bidirectional communication, sub-10ms latency
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Event-Driven Architecture</span>
                      <Badge variant="secondary">Advanced</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      State synchronization, real-time collaboration systems
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-sm">Development Practices</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Async/Await Patterns</span>
                      <Badge variant="secondary">Expert</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      High-performance concurrent systems
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">AI-Assisted Development</span>
                      <Badge variant="secondary">Advanced</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Claude Code, workflow automation, productivity optimization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Technical Skills */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Additional Competencies</CardTitle>
            <CardDescription>Supporting technical skills and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2 text-sm">Development Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Claude Code</Badge>
                  <Badge variant="secondary">Coder</Badge>
                  <Badge variant="secondary">Git/GitHub</Badge>
                  <Badge variant="outline">VS Code</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Python Tooling</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">conda</Badge>
                  <Badge variant="secondary">uv</Badge>
                  <Badge variant="secondary">ruff</Badge>
                  <Badge variant="secondary">mypy</Badge>
                  <Badge variant="outline">Poetry</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">Other Languages</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">C</Badge>
                  <Badge variant="outline">C++</Badge>
                  <Badge variant="outline">Java</Badge>
                  <Badge variant="outline">Bash</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
        </div>
      </section>
    </div>
  );
}
