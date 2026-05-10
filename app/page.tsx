import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/section-heading';
import ProjectsSection from '@/components/sections/projects';
import ContactSection from '@/components/sections/contact';
import { Github, Linkedin, GraduationCap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex flex-col justify-center py-0 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/contemplative.jpg)',
            backgroundSize: '120%',
            backgroundPosition: 'left top',
          }}
        >
          <div className="absolute inset-0 bg-navy/40"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <h1 className="font-mono text-teal mb-6 text-base md:text-lg">Hi, my name is</h1>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-lighter mb-4">Johannes Schulz.</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-slate-lighter mb-8">I build AI systems that scale.</h3>
          <p className="text-slate-lighter max-w-lg mb-12 leading-relaxed">
            AI Systems Engineer specializing in production-grade AI systems, enterprise infrastructure,
            and multi-service orchestration. I build clean, minimal, and highly optimized systems with
            a focus on long-term maintainability and measurable impact.
          </p>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Fixed */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-lighter sm:text-5xl">
                Johannes Schulz
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-lighter sm:text-xl">
                AI Systems Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate">
                I build accessible, production-grade AI systems that scale.
              </p>

              <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  <li>
                    <a className="group flex items-center py-3" href="#about">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-dark transition-all group-hover:w-16 group-hover:bg-slate-lighter group-focus-visible:w-16 group-focus-visible:bg-slate-lighter motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate group-hover:text-slate-lighter group-focus-visible:text-slate-lighter">
                        About
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#projects">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-dark transition-all group-hover:w-16 group-hover:bg-slate-lighter group-focus-visible:w-16 group-focus-visible:bg-slate-lighter motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate group-hover:text-slate-lighter group-focus-visible:text-slate-lighter">
                        Projects
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#contact">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-dark transition-all group-hover:w-16 group-hover:bg-slate-lighter group-focus-visible:w-16 group-focus-visible:bg-slate-lighter motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate group-hover:text-slate-lighter group-focus-visible:text-slate-lighter">
                        Contact
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
              <li className="text-xs">
                <a
                  href="https://github.com/JohannesSchulz97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-slate-lighter"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
              </li>
              <li className="text-xs">
                <a
                  href="https://www.linkedin.com/in/johannes-schulz-6b0396311/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-slate-lighter"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </li>
              <li className="text-xs">
                <a
                  href="https://preply.com/en/tutor/3870616"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-slate-lighter"
                  aria-label="Preply"
                >
                  <GraduationCap className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </header>

          {/* Right Column - Scrollable */}
          <main className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lighter lg:sr-only">
                  About
                </h2>
              </div>
              <div className="space-y-4 text-slate">
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
            </section>

            {/* Projects */}
            <ProjectsSection />

            {/* Contact */}
            <ContactSection />
          </main>
        </div>
      </div>
    </div>
  );
}
