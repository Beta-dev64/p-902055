import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Reveal, SplitHeadline } from "@/components/motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: {
          type: "contact",
          name: email.split("@")[0],
          email: email.trim(),
          message: "Newsletter subscription request from site footer form.",
        },
      });
      if (error || (data && (data as { error?: unknown }).error)) {
        throw error ?? new Error("Submission rejected");
      }
      setDone(true);
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscription failed", err);
      toast.error("We couldn't sign you up right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="bg-background py-16 sm:py-24">
      <div className="section-container">
        <Reveal className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="pulse-chip">
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                05
              </span>
              <span>Newsletter</span>
            </div>
          </div>

          <SplitHeadline
            text="Subscribe to the newsletter"
            className="mb-4 text-left font-display text-4xl font-bold sm:text-5xl"
          />
          <p className="mb-10 text-left text-xl text-foreground/80">
            Be first to hear about breakthroughs, partnerships, and deployment
            opportunities
          </p>

          {done ? (
            <p role="status" className="font-medium text-primary">
              You&apos;re on the list — talk soon.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start gap-4 md:flex-row md:items-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-full border border-border bg-transparent px-6 py-4 text-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary md:flex-grow"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-motion inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50 md:ml-4 md:w-auto"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Newsletter;
