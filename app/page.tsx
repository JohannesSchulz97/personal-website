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
        <div
          className="absolute inset-0 w-full bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/home-page.JPG')" }}
        />

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
                  quality={75}
                  sizes="(max-width: 768px) 208px, 208px"
                />
              </div>
            </div>

            {/* Content - Centered */}
            <div className="text-center relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Johannes Schulz
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6">
                AI Systems Engineer
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                AI Systems Engineer specializing in production-grade AI systems, enterprise infrastructure,
                and multi-service orchestration. I build clean, minimal, and highly optimized systems with
                a focus on long-term maintainability and measurable impact.
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
              href="https://www.linkedin.com/in/johannes-schulz-6b0396311/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:contact@johannesschulz.dev"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a
              href="https://preply.com/en/tutor/3870616"
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
        <section className="mt-16 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I build clean, minimal, and highly optimized systems — no clutter, no unnecessary abstraction.
                My work spans enterprise platform migrations, production ML pipelines, self-hosted infrastructure,
                and AI orchestration, always with a focus on elegant architectural solutions, long-term
                maintainability, and eliminating technical debt before it accumulates.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I have delivered a 99.8% cost reduction (€1.2M/year savings) through enterprise platform
                migration, built computer vision pipelines serving 40+ daily clinical assessments at 90%+
                accuracy, and architected multi-agent platforms for distributed engineering teams. From
                reverse-engineering Palantir Foundry to deploying 10-service production stacks, I deliver
                systems that scale and drive measurable business impact. I hold an MSc in Machine Learning
                from the University of Tübingen.
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
                <CardTitle className="text-lg">Multi-Modal Veterinary AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built production RAG system with image-based disease detection across 8+ GB of medical textbooks,
                  reducing diagnostic research time from 30+ minutes to under 3 minutes with 100% citation traceability.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm available for software engineering projects and consulting across full-stack development,
                system architecture, AI integration, and infrastructure automation. Whether you need production
                applications built, ML systems deployed, or technical guidance on complex problems, I'd love to
                hear from you.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Me</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:contact@johannesschulz.dev">Send Email</a>
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
