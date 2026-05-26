"use client";

import BackToHome from "@/components/layout/back-to-home";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useState } from "react";

export default function SubmitTestimonialPage() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      alert('Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Thank You!</CardTitle>
            <CardDescription className="text-base">
              Your testimonial has been submitted successfully. I'll review it and add it to the
              website shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => (window.location.href = "/testimonials")}>
              View Testimonials
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="pb-12">

        <div className="container mx-auto px-4 py-12 max-w-3xl relative z-10">
          <BackToHome />
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Submit a Testimonial</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your experience working with me. Your feedback helps others understand
              what it's like to collaborate on a project.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Testimonial</CardTitle>
              <CardDescription>
                Fields marked with * are required. Your testimonial will be reviewed before being published.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action="https://formspree.io/f/mgodnlwq"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Hidden fields */}
                <input type="hidden" name="rating" value={rating} />
                <input type="hidden" name="_subject" value="New Testimonial Submission" />
                <p className="hidden">
                  <Label>
                    Don't fill this out if you're human: <Input name="_gotcha" />
                  </Label>
                </p>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Smith"
                    required
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role *</Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="e.g., CTO, Product Manager, Founder"
                    required
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Company Name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    For verification only - will not be published
                  </p>
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add credibility - your LinkedIn will be linked with a small icon
                  </p>
                </div>

                {/* Projects */}
                <div className="space-y-2">
                  <Label htmlFor="project">Projects *</Label>
                  <Input
                    id="project"
                    name="project"
                    placeholder="e.g., ML Pipeline Infrastructure, Data Migration"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    List all projects we worked on together
                  </p>
                </div>

                {/* Completion Date */}
                <div className="space-y-2">
                  <Label htmlFor="completionDate">Completion Date *</Label>
                  <Input
                    id="completionDate"
                    name="completionDate"
                    placeholder="May 2026"
                    defaultValue={new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Month and year when project was completed (editable)
                  </p>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label>Rating *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            star <= (hoveredRating || rating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Selected: {rating} star{rating !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Testimonial */}
                <div className="space-y-2">
                  <Label htmlFor="testimonial">Your Testimonial *</Label>
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    rows={6}
                    className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Share your experience working with me. What was the outcome? How was the collaboration?"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Mention specific results or outcomes for maximum impact
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Submit Testimonial
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => (window.location.href = "/testimonials")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Your testimonial will be reviewed before being published. Thank you for taking
              the time to share your experience!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
