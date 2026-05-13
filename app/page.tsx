'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/section-heading';
import ProjectsSection from '@/components/sections/projects';
import TestimonialsSection from '@/components/sections/testimonials';
import ContactSection from '@/components/sections/contact';
import { Github, Linkedin, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Check if scrolled to bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section id="hero-section" className="relative h-screen h-[100dvh] flex flex-col justify-center md:justify-center py-0 overflow-hidden select-none snap-start">
        <div
          className="absolute inset-0 z-0 bg-[length:auto_180%] md:bg-cover bg-no-repeat bg-[position:5%_top] md:bg-[position:left_top]"
          style={{
            backgroundImage: 'url(/contemplative.jpg)',
          }}
        >
          {/* Base overlay */}
          <div className="absolute inset-0 bg-navy/30"></div>
          {/* Vignette - strong dark corners, minimal center spread */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(10,25,47,0.5)_85%,rgba(10,25,47,0.9)_100%)]"></div>
          {/* Left-to-right gradient - full brightness left, 25% brightness (75% dark) right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/75"></div>
        </div>

        <div className="w-full px-6 md:container md:mx-auto md:px-4 md:max-w-5xl relative z-10 lg:translate-x-[22.5%]">
          <h1 className="font-mono text-teal mb-6 text-xl md:text-[22px] mt-20 md:mt-0">Hi, my name is</h1>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-lighter mb-4">Johannes.</h2>
          <h3 className="text-2xl md:text-5xl font-bold text-slate-lighter mb-8">I build AI systems that scale.</h3>
          <p className="hidden md:block text-slate-lighter max-w-2xl mb-12 leading-relaxed text-xl md:text-[22px]">
            AI Systems Engineer specializing in production-grade AI systems, enterprise infrastructure,
            and multi-service orchestration. I build clean, minimal, and highly optimized systems with
            a focus on long-term maintainability and measurable impact.
          </p>

          {/* Social Icons - Mobile Only */}
          <ul className="lg:hidden flex items-center gap-5 mt-56" aria-label="Social media">
          <li className="text-xs">
            <a
              href="https://github.com/JohannesSchulz97"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-slate-lighter text-slate-lighter"
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
              className="block hover:text-slate-lighter text-slate-lighter"
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
              className="block hover:text-slate-lighter text-slate-lighter"
              aria-label="Preply"
            >
              <GraduationCap className="h-6 w-6" />
            </a>
          </li>
        </ul>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-4 md:px-12 md:py-20 lg:px-24 lg:py-0 snap-start">
        <div className="lg:flex lg:justify-between lg:gap-24">
          {/* Left Column - Fixed */}
          <header className="hidden lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-2/5 lg:flex-col lg:justify-between lg:py-24 lg:-translate-x-[10%]">
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
                      <span className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-lighter group-focus-visible:w-16 group-focus-visible:bg-slate-lighter motion-reduce:transition-none ${activeSection === 'about' ? 'w-16 bg-slate-lighter' : 'w-8 bg-slate-dark'}`}></span>
                      <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-lighter group-focus-visible:text-slate-lighter ${activeSection === 'about' ? 'text-slate-lighter' : 'text-slate'}`}>
                        About
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#projects">
                      <span className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-lighter group-focus-visible:w-16 group-focus-visible:bg-slate-lighter motion-reduce:transition-none ${activeSection === 'projects' ? 'w-16 bg-slate-lighter' : 'w-8 bg-slate-dark'}`}></span>
                      <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-lighter group-focus-visible:text-slate-lighter ${activeSection === 'projects' ? 'text-slate-lighter' : 'text-slate'}`}>
                        Projects
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#testimonials">
                      <span className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-lighter group-focus-visible:w-16 group-focus-visible:bg-slate-lighter motion-reduce:transition-none ${activeSection === 'testimonials' ? 'w-16 bg-slate-lighter' : 'w-8 bg-slate-dark'}`}></span>
                      <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-lighter group-focus-visible:text-slate-lighter ${activeSection === 'testimonials' ? 'text-slate-lighter' : 'text-slate'}`}>
                        Testimonials
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#contact">
                      <span className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-lighter group-focus-visible:w-16 group-focus-visible:bg-slate-lighter motion-reduce:transition-none ${activeSection === 'contact' ? 'w-16 bg-slate-lighter' : 'w-8 bg-slate-dark'}`}></span>
                      <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-lighter group-focus-visible:text-slate-lighter ${activeSection === 'contact' ? 'text-slate-lighter' : 'text-slate'}`}>
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
          <main className="pt-0 lg:w-3/5 lg:pt-12 lg:pb-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-[4.5rem] lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lighter lg:sr-only">
                  About
                </h2>
              </div>
              <div className="hidden lg:block mb-8">
                <SectionHeading number="01">About</SectionHeading>
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

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Contact */}
            <ContactSection />
          </main>
        </div>
      </div>
    </div>
  );
}
