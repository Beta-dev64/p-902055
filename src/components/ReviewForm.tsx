import React, { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const emptyForm = {
  author: "",
  role: "",
  email: "",
  content: "",
  rating: 5,
};

const ReviewForm = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.author.trim() || !formData.role.trim() || !formData.content.trim()) {
      toast.error("Please fill in your name, role, and review.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert([
        {
          author: formData.author.trim(),
          role: formData.role.trim(),
          content: formData.content.trim(),
          email: formData.email.trim() || null,
          rating: formData.rating,
          status: "pending",
          source: "visitor",
          avatar: null,
          background_image: null,
        },
      ]);

      if (error) throw error;

      setFormData(emptyForm);
      setIsSuccess(true);
      toast.success("Thanks! Your review was submitted for approval.");
      window.setTimeout(() => setIsSuccess(false), 6000);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Could not submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="leave-a-review" className="bg-muted py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Visitor Reviews
          </div>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Share your experience
          </h2>
          <p className="text-muted-foreground">
            Leave a review for FuseLabs IO. Approved reviews appear on the site alongside our client
            testimonials.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8">
          {isSuccess ? (
            <div
              className="flex min-h-[16rem] flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500"
              role="status"
              aria-live="polite"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                <CheckCircle2 className="h-10 w-10" strokeWidth={1.75} />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                Review submitted
              </h3>
              <p className="max-w-md text-muted-foreground">
                Thanks for the feedback. We'll review it shortly — once approved, it will show on
                the homepage.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="btn-motion mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium hover:border-primary hover:text-primary"
              >
                Write another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Your name *"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role / company *"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional, not shown publicly)"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Rating</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, rating: value }))}
                      className="rounded p-1 transition-transform hover:scale-110"
                      aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          value <= formData.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Your review *"
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-motion w-full rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;
