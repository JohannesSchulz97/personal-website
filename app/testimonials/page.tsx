"use client";

import { Star, ChevronDown, ChevronUp, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";
import testimonials from "@/data/testimonials.json";

export default function TestimonialsPage() {
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set());

  const toggleTestimonial = (index: number) => {
    const newExpanded = new Set(expandedTestimonials);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTestimonials(newExpanded);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Image - Full Width */}
      <div
        className="absolute inset-0 w-full bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/P1000017.JPG')" }}
      />
      <section className="relative pb-12">

        <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Testimonials</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What people say about working with me on machine learning, data infrastructure,
              and software development projects.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {testimonial.role} at {testimonial.company}
                      </CardDescription>
                    </div>
                    {testimonial.linkedIn && (
                      <a
                        href={testimonial.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                        aria-label={`${testimonial.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  {renderStars(testimonial.rating)}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-4">
                  <p className="text-muted-foreground italic">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </p>

                  {/* Expand/Collapse Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleTestimonial(index)}
                    className="w-full"
                  >
                    {expandedTestimonials.has(index) ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" /> Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" /> Show Project Details
                      </>
                    )}
                  </Button>

                  {/* Collapsible Details */}
                  {expandedTestimonials.has(index) && (
                    <div className="text-sm text-muted-foreground space-y-2 pt-2 border-t">
                      <div>
                        <span className="font-semibold">Project: </span>
                        {testimonial.project}
                      </div>
                      <div>
                        <span className="font-semibold">Completed: </span>
                        {testimonial.completionDate}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <div className="bg-card border rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">Worked with me?</h2>
              <p className="text-muted-foreground mb-6">
                Share your experience to help others understand what it's like to work together.
              </p>
              <Button asChild size="lg">
                <Link href="/submit-testimonial">
                  Submit a Testimonial
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Interested in working together?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </section>

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
    </div>
  );
}
