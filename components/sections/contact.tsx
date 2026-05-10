'use client';

import { Mail, Copy, Check } from "lucide-react";
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
    <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-lighter mb-8">Get In Touch</h2>
      <p className="text-slate mb-8 max-w-xl leading-relaxed">
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
