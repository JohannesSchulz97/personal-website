import { Mail, ExternalLink, Code, GraduationCap, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";

export default function ContactSection() {
  return (
    <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lighter lg:sr-only">
          Contact
        </h2>
      </div>
      <p className="text-slate mb-8 max-w-xl leading-relaxed">
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
    </section>
  );
}
