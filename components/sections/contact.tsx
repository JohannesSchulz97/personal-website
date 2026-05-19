'use client';

import { Mail, Copy, Check } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import { useState } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "contact@johannesschulz.dev";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-[4.5rem] lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lighter lg:sr-only">
          Contact
        </h2>
      </div>
      <div className="hidden lg:block mb-8">
        <SectionHeading number="04">Get In Touch</SectionHeading>
      </div>
      <p className="text-slate mb-8 max-w-xl leading-relaxed lg:text-[16px]">
        I'm currently available for software engineering projects, system architecture consulting,
        and AI integration opportunities. Whether you have a project in mind or just want to chat
        about tech, my inbox is always open.
      </p>

      <div className="flex items-center gap-3 mb-12">
        <Mail className="h-5 w-5 text-teal" />
        <a
          href={`mailto:${email}`}
          className="text-teal text-lg hover:text-teal/80 transition-colors font-mono"
        >
          {email}
        </a>
        <button
          onClick={copyEmail}
          className="p-2 hover:bg-teal/10 rounded transition-colors"
          aria-label="Copy email"
        >
          {copied ? (
            <Check className="h-4 w-4 text-teal" />
          ) : (
            <Copy className="h-4 w-4 text-slate hover:text-teal transition-colors" />
          )}
        </button>
      </div>
    </section>
  );
}
