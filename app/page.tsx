import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/section-heading';
import ProjectsSection from '@/components/sections/projects';
import SkillsSection from '@/components/sections/skills';
import TestimonialsSection from '@/components/sections/testimonials';
import ContactSection from '@/components/sections/contact';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center py-0">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="font-mono text-teal mb-6 text-base md:text-lg">Hi, my name is</h1>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-lighter mb-4">Johannes Schulz.</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-slate mb-8">I build AI systems that scale.</h3>
          <p className="text-slate max-w-lg mb-12 leading-relaxed">
            AI Systems Engineer specializing in production-grade AI systems, enterprise infrastructure,
            and multi-service orchestration. I build clean, minimal, and highly optimized systems with
            a focus on long-term maintainability and measurable impact.
          </p>
          <Button
            asChild
            size="lg"
            className="border-2 border-teal bg-transparent hover:bg-teal/10 text-teal text-base px-8 py-6 rounded font-mono"
          >
            <a href="mailto:contact@johannesschulz.dev">Get In Touch</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading number="01">About Me</SectionHeading>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Text content */}
            <div className="md:col-span-3 space-y-4 text-slate">
              <p className="leading-relaxed">
                I build clean, minimal, and highly optimized systems — no clutter, no unnecessary abstraction.
                My work spans enterprise platform migrations, production ML pipelines, self-hosted infrastructure,
                and AI orchestration, always with a focus on elegant architectural solutions.
              </p>
              <p className="leading-relaxed">
                I have delivered a 99.8% cost reduction (€1.2M/year savings) through enterprise platform
                migration, built computer vision pipelines serving 40+ daily clinical assessments at 90%+
                accuracy, and architected multi-agent platforms for distributed engineering teams.
              </p>
              <p className="leading-relaxed">
                From reverse-engineering Palantir Foundry to deploying 10-service production stacks, I deliver
                systems that scale and drive measurable business impact. I hold an MSc in Machine Learning
                from the University of Tübingen.
              </p>

              <p className="leading-relaxed">Here are some technologies I work with:</p>

              <ul className="grid grid-cols-2 gap-2 text-sm font-mono mt-4">
                {['Python', 'TypeScript', 'Next.js', 'FastAPI', 'Claude API', 'PostgreSQL', 'Docker', 'Cloudflare'].map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span className="text-teal">▹</span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile picture */}
            <div className="md:col-span-2 relative group">
              <div className="relative max-w-xs mx-auto">
                <div className="relative rounded overflow-hidden">
                  <Image
                    src="/professional-picture.png"
                    alt="Johannes Schulz"
                    width={300}
                    height={300}
                    className="rounded grayscale mix-blend-multiply group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-300 object-cover object-[center_20%]"
                    priority
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-teal/30 group-hover:bg-transparent transition-all duration-300 rounded"></div>
                </div>
                <div className="absolute -inset-0 border-2 border-teal rounded translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <ProjectsSection />

      {/* Skills */}
      <SkillsSection />

      {/* Contact */}
      <ContactSection />
    </div>
  );
}
