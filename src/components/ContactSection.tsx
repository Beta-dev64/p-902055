import { MessageSquare } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { Reveal, SplitHeadline } from "@/components/motion";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-muted py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <Reveal>
          <MessageSquare className="mb-5 h-8 w-8 text-primary" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase text-primary">Contact FuseLabs</p>
          <SplitHeadline
            text="Send us an enquiry."
            className="mt-3 font-display text-3xl font-semibold sm:text-4xl"
          />
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
            Have a question about our services, Academy or a possible
            collaboration? Tell us what&rsquo;s on your mind.
          </p>
        </Reveal>
        <Reveal delay={150} y={28} className="min-w-0">
          <LeadForm type="contact" submitLabel="Send enquiry" />
        </Reveal>
      </div>
    </section>
  );
}
