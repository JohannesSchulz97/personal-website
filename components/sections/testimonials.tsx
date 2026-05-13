"use client";

import { Star, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";
import Link from "next/link";
import testimonialsData from "@/data/testimonials.json";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  testimonial: string;
  project: string;
  completionDate: string;
  linkedIn: string | null;
}

const testimonials = testimonialsData as Testimonial[];

export default function TestimonialsSection() {

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "fill-teal text-teal" : "fill-none text-slate-dark"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-[4.5rem] lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-lighter lg:sr-only">
          Testimonials
        </h2>
      </div>
      <div className="hidden lg:block mb-8">
        <SectionHeading number="03">Testimonials</SectionHeading>
      </div>
      <p className="text-slate mb-12 leading-relaxed">
        What people say about working with me on machine learning, data infrastructure,
        and software development projects.
      </p>

      {/* Testimonials */}
      <div className="space-y-12 mb-12">
        {testimonials.slice(0, 2).map((testimonial, index) => (
          <div key={testimonial.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-lighter">{testimonial.name}</h3>
                  {testimonial.linkedIn && (
                    <a
                      href={testimonial.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-teal transition-colors"
                      aria-label={`${testimonial.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-slate">
                  {testimonial.role}{testimonial.role && " at "}{testimonial.company}
                </p>
              </div>
              {renderStars(testimonial.rating)}
            </div>

            <p className="text-slate leading-relaxed italic">
              &ldquo;{testimonial.testimonial}&rdquo;
            </p>

            {/* Project Details */}
            <div className="text-sm text-slate space-y-1">
              <div>
                <span className="text-slate-dark">Projects: </span>
                <span>{testimonial.project}</span>
              </div>
              <div>
                <span className="text-slate-dark">Completed: </span>
                <span>{testimonial.completionDate}</span>
              </div>
            </div>

            {index < 1 && (
              <hr className="border-t border-slate-dark/20 mt-8" />
            )}
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mb-12">
        <Button asChild variant="outline">
          <Link href="/testimonials">
            View All Testimonials
          </Link>
        </Button>
      </div>

      {/* Call to Action */}
      <div className="mt-8 space-y-4">
        <p className="text-slate leading-relaxed">
          Worked with me? <a href="/submit-testimonial" className="text-teal hover:text-teal/80 transition-colors">Share your experience</a> or <a href="#contact" className="text-teal hover:text-teal/80 transition-colors">get in touch</a> if you're interested in working together.
        </p>
      </div>

      {/* Schema.org Review Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Johannes Schulz",
            jobTitle: "AI Systems Engineer",
            review: testimonials.map((t) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: t.name,
                jobTitle: `${t.role} at ${t.company}`,
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: t.rating,
                bestRating: 5,
              },
              reviewBody: t.testimonial,
              itemReviewed: {
                "@type": "Service",
                name: t.project,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
