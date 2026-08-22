import { Check } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import type { AcademyProgram } from "@/hooks/use-academy-programs";

const INCLUDED = [
  "Weekly 1:1 mentor sessions",
  "Real client-style project reviews",
  "A public demo day for your portfolio",
  "Certificate of completion",
];

interface AcademyEnrollProps {
  programs: AcademyProgram[];
  selectedSlug: string | null;
}

const AcademyEnroll = ({ programs, selectedSlug }: AcademyEnrollProps) => {
  const selected = programs.find((p) => p.slug === selectedSlug);

  return (
    <section id="enroll" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Apply now
            </span>
            <h2 className="mt-4 font-academy text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-foreground">
              Ready to start shipping?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/65 sm:text-lg">
              Tell us where you are today and which track fits. An advisor
              replies within one business day with cohort dates and next
              steps.
            </p>

            <ul className="mt-8 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/70">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_30px_60px_-30px_rgba(30,27,22,0.25)] sm:p-8">
            {selected && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/12 px-3.5 py-1.5 text-xs font-semibold text-primary">
                Applying for {selected.title}
                <a href="#tracks" className="underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
                  change
                </a>
              </div>
            )}
            <LeadForm
              type="enrollment"
              programSlug={selectedSlug ?? undefined}
              submitLabel="Apply for this program"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyEnroll;
