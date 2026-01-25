import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, Globe, Award, GraduationCap, FileText } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Full Width Background */}
      <section className="relative pb-12 overflow-hidden">
        {/* Background Image - Full Width */}
        <div className="absolute inset-0 w-full">
          <Image
            src="/home-page.JPG"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Container for Content */}
        <div className="container mx-auto px-4 py-16 max-w-5xl relative">

          <div className="flex flex-col">
            {/* Profile Picture - Above Title */}
            <div className="mb-8 flex justify-center relative z-10">
              <div className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src="/professional-picture.png"
                  alt="Johannes Schulz"
                  fill
                  className="object-cover object-[center_20%]"
                  priority
                />
              </div>
            </div>

            {/* Content - Centered */}
            <div className="text-center relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Johannes Schulz
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
                Software Engineer & Applied AI Developer
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Building production software systems with a foundation in mathematics and computer science.
                I develop scalable applications, AI-powered tools, and infrastructure solutions that solve
                real-world problems with rigorous engineering principles.
              </p>
              <div className="flex gap-4 justify-center mb-8">
                <Button asChild size="lg">
                  <Link href="/projects">View My Projects</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>

              {/* Quick Links */}
              <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://github.com/JohannesSchulz97"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/johannesschulz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:schulz.johannes97@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a
              href="https://preply.com/en/tutor/johannesschulz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>Preply</span>
            </a>
              </div>
            </div>
          </div>

        {/* About Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I'm a Software Engineer with a strong foundation in mathematics, computer science, and machine learning.
                I specialize in building production-grade applications, AI-powered systems, and developer tools
                that solve complex problems with clean, maintainable code.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My work spans full-stack development, AI orchestration platforms, and clinical ML pipelines.
                I've delivered centralized AI development infrastructure with Coder, processing patient data in
                production workflows, and building real-time collaboration platforms with sub-10ms latency.
                From TypeScript and Python to edge computing and LLM integration, I apply rigorous engineering
                and mathematical thinking to every project.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I focus on systems that deliver measurable impact: reducing costs by 70%, cutting deployment
                times by 8x, and accelerating productivity by 30%+. Whether it's infrastructure automation,
                real-time systems, or AI-powered tools, I combine theoretical understanding with practical
                engineering to build solutions that scale.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Key Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Award className="w-10 h-10 mb-2 text-primary" />
                <CardTitle className="text-lg">AI-Assisted Development Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built centralized Claude Code infrastructure with Coder on Hetzner, enabling distributed
                  team collaboration with automated budget optimization and 70% cost reduction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Award className="w-10 h-10 mb-2 text-primary" />
                <CardTitle className="text-lg">Production ML Deployments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deployed biomechanical analysis pipeline processing 40+ daily patient assessments
                  in clinical workflow with 99.9%+ uptime and GDPR compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Award className="w-10 h-10 mb-2 text-primary" />
                <CardTitle className="text-lg">Real-Time AI Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built Kanban platform with 8+ AI assistants and WebSocket sync achieving
                  &lt;10ms latency, reducing PR review time by 50%+.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Core Competencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Software Engineering</Badge>
                <Badge variant="secondary">Full-Stack Development</Badge>
                <Badge variant="secondary">Edge Computing</Badge>
                <Badge variant="secondary">Cloudflare Workers</Badge>
                <Badge variant="secondary">Zero Trust Security</Badge>
                <Badge variant="secondary">Real-Time Systems</Badge>
                <Badge variant="secondary">WebSocket</Badge>
                <Badge variant="secondary">AI Orchestration</Badge>
                <Badge variant="secondary">LLM Integration</Badge>
                <Badge variant="secondary">CI/CD</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">DevOps</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm currently available for freelance machine learning projects and consulting.
                Whether you need help with data analysis, model development, or mathematical problem-solving,
                I'd love to hear from you.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Me</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:schulz.johannes97@gmail.com">Send Email</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
        </div>
      </section>
    </div>
  )
}
