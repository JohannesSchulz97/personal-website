'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/section-heading';
import ProjectsSection from '@/components/sections/projects';
import TestimonialsSection from '@/components/sections/testimonials';
import ContactSection from '@/components/sections/contact';
import { Github, Linkedin, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
// @ts-ignore - CommonJS module
const LethargyModule = require('lethargy');

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('about');
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    // Set viewport height once on load
    setViewportHeight(window.innerHeight);

    // Detect mouse wheel using lethargy (momentum detection)
    // Trackpad has inertial scrolling, mouse doesn't
    // Tuned params: (stability, sensitivity, tolerance, delay)
    // Higher sensitivity = fewer false positives from strong trackpad scrolls
    const lethargy = new LethargyModule.Lethargy(10, 150, 1.2, 150);
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const check = lethargy.check(e);

      console.log('Wheel event:', {
        deltaMode: e.deltaMode,
        deltaY: e.deltaY,
        lethargCheck: check,
        isMouse: check !== false,
        timestamp: Date.now()
      });

      // check !== false means non-inertial scrolling (mouse wheel)
      if (check !== false) {
        // Disable snap + smooth while using mouse (recovers from false positives)
        document.documentElement.classList.add('using-mouse');
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          document.documentElement.classList.remove('using-mouse');
        }, 500);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'testimonials', 'contact'];
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
      <section id="hero-section" className="relative flex flex-col justify-center md:justify-center py-0 overflow-hidden select-none snap-start snap-always" style={{ height: viewportHeight ? `${viewportHeight}px` : '100vh' }}>
        <div
          className="absolute inset-0 z-0 bg-[length:auto_180%] md:bg-cover bg-no-repeat bg-[position:5%_top] md:bg-[position:left_top]"
          style={{
            backgroundImage: 'url(/contemplative.jpg)',
          }}
        >
          {/* Base overlay */}
          <div className="absolute inset-0 bg-[#081220]/30"></div>
          {/* Vignette - strong dark corners, minimal center spread */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(8,18,32,0.5)_85%,rgba(8,18,32,0.9)_100%)]"></div>
          {/* Left-to-right gradient - full brightness left, 25% brightness (75% dark) right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/75"></div>
        </div>

        <div className="w-full px-6 md:container md:mx-auto md:px-4 md:max-w-5xl relative z-10 lg:translate-x-[33%]">
          <h1 className="text-2xl md:text-[22px] font-bold text-teal mb-4">Hi, my name is</h1>
          <h2 className="text-6xl md:text-7xl font-bold text-slate-lighter mb-4">Johannes Schulz.</h2>
          <p className="hidden md:block text-slate-lighter max-w-2xl mb-12 leading-relaxed text-xl md:text-[22px]">
            Freelance Fullstack Engineer helping teams build and ship — frontend, backend, infrastructure, and AI integration.
          </p>

          {/* Social Icons - Mobile Only */}
          <ul className="lg:hidden flex items-center gap-5 mt-8" aria-label="Social media">
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
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-4 md:px-12 md:py-20 lg:px-12 lg:py-0 xl:px-16 snap-start snap-always">
        <div className="lg:flex lg:justify-between lg:gap-16 xl:gap-20 2xl:gap-24">
          {/* Left Column - Fixed */}
          <header className="hidden lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[38%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-lighter sm:text-5xl">
                Johannes Schulz
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-lighter sm:text-xl">
                Fullstack Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate lg:text-[17px]">
                I help teams build and ship fullstack products — frontend, backend, infrastructure, and AI integration.
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
          <main className="pt-0 lg:w-[50%] lg:pt-12 lg:pb-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-[4.5rem] lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#081220]/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lighter lg:sr-only">
                  About
                </h2>
              </div>
              <div className="hidden lg:block mb-8">
                <SectionHeading number="01">About</SectionHeading>
              </div>
              <div className="space-y-4 text-slate lg:text-[16px]">
                <p className="leading-relaxed">
                  I build and ship fullstack products — features, refactors, and embedded delivery across the entire stack.
                  From React/Next.js frontends to Python/FastAPI backends, PostgreSQL databases, and AWS/Docker infrastructure.
                  Clean architecture, no unnecessary abstractions, focused on systems that scale.
                </p>
                <p className="leading-relaxed">
                  I've built LLM-powered features, RAG pipelines, and custom agentic systems — backed by an M.Sc.
                  in Machine Learning from the University of Tübingen. This includes production work with OpenCLAW
                  infrastructure, structural analysis systems, and the CAPS framework (Claude Automated Programming System).
                </p>
                <p className="leading-relaxed">
                  For early-stage products, I set up entire stacks: frontend, API, database, CI/CD, deployment, monitoring.
                  I've also worked fractionally as tech lead and architect — system design, architectural decisions,
                  code reviews, async technical leadership. Projects span enterprise platform migrations (€1.2M/year savings),
                  computer vision pipelines (90%+ clinical accuracy), and multi-agent orchestration platforms.
                </p>

                <p className="leading-relaxed">Technologies I work with daily:</p>

                <ul className="grid grid-cols-2 gap-2 text-sm font-mono mt-4">
                  {['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="text-teal">▹</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>

                <p className="leading-relaxed mt-6 text-slate-lighter">
                  Currently available for contract work — ~25h/week, remote.
                </p>
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
