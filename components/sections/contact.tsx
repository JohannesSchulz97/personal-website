import { Mail, ExternalLink, Code, GraduationCap, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <SectionHeading number="04" className="justify-center">Get In Touch</SectionHeading>
        <p className="text-slate mb-12 max-w-xl mx-auto leading-relaxed">
          I'm currently available for software engineering projects, system architecture consulting,
          and AI integration opportunities. Whether you have a project in mind or just want to chat
          about tech, my inbox is always open.
        </p>

        <Button
          asChild
          size="lg"
          className="border-2 border-teal bg-transparent hover:bg-teal/10 text-teal text-base px-8 py-6 rounded font-mono mb-12"
        >
          <a href="mailto:contact@johannesschulz.dev">Say Hello</a>
        </Button>

        <div className="flex justify-center gap-8 text-slate-light">
          <a
            href="https://github.com/JohannesSchulz97"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/johannes-schulz-6b0396311/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://preply.com/en/tutor/3870616"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal transition-colors"
            aria-label="Preply"
          >
            <GraduationCap className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
