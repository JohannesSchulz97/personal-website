import Image from "next/image";
import { Mail, MapPin, ExternalLink, Code, Briefcase, GraduationCap, Trophy, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="relative py-16 overflow-hidden min-h-screen">
        {/* Background Image - Full Width */}
        <div className="absolute inset-0 w-full">
          <Image
            src="/contact-page.JPG"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I'm always open to discussing new projects, collaboration opportunities,
          or technical challenges in software engineering, AI systems, and system architecture.
          Feel free to reach out through any of the channels below!
        </p>
      </div>

      {/* Contact Information Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Get in touch directly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <a
              href="mailto:contact@johannesschulz.dev"
              className="text-foreground hover:text-primary transition-colors"
            >
              contact@johannesschulz.dev
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Professional Profiles Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Professional Profiles</CardTitle>
          <CardDescription>Connect with me on various platforms</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {/* GitHub */}
          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4 hover:bg-accent"
            asChild
          >
            <a href="https://github.com/JohannesSchulz97" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-5 w-5" />
                <span className="font-semibold">GitHub</span>
                <ExternalLink className="h-4 w-4 ml-auto" />
              </div>
              <span className="text-sm text-muted-foreground text-left">
                Code repositories and open source work
              </span>
            </a>
          </Button>

          {/* LinkedIn */}
          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4 hover:bg-accent"
            asChild
          >
            <a href="https://www.linkedin.com/in/johannes-schulz-6b0396311/" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-2 mb-2">
                <Linkedin className="h-5 w-5" />
                <span className="font-semibold">LinkedIn</span>
                <ExternalLink className="h-4 w-4 ml-auto" />
              </div>
              <span className="text-sm text-muted-foreground text-left">
                Professional network and career updates
              </span>
            </a>
          </Button>

          {/* Preply */}
          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4 hover:bg-accent sm:col-span-2"
            asChild
          >
            <a href="https://preply.com/en/tutor/3870616" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5" />
                <span className="font-semibold">Preply</span>
                <ExternalLink className="h-4 w-4 ml-auto" />
              </div>
              <span className="text-sm text-muted-foreground text-left">
                Mathematics and computer science tutoring
              </span>
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Availability Note */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Currently available</strong> for software engineering projects, system architecture consulting,
            and AI integration opportunities. I typically respond to emails within 24-48 hours.
          </p>
        </CardContent>
      </Card>
        </div>
      </section>
    </div>
  );
}
