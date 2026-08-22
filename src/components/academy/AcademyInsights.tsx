import { Code, Server, Brain, ArrowUpRight } from "lucide-react";
import type { AcademyProgram } from "@/hooks/use-academy-programs";

const ICONS: Record<string, typeof Code> = {
  "frontend-development": Code,
  "backend-development": Server,
  "ai-ml-development": Brain,
};

interface AcademyInsightsProps {
  programs: AcademyProgram[];
  onSelectSlug: (slug: string) => void;
}

const AcademyInsights = ({ programs, onSelectSlug }: AcademyInsightsProps) => {
  if (programs.length === 0) return null;

  return (
    <section id="outcomes" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Outcomes
          </span>
          <h2 className="mt-4 font-academy text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-foreground">
            What you&rsquo;ll actually walk away with.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {programs.map((program) => {
            const Icon = ICONS[program.slug] ?? Code;
            return (
              <a
                key={program.slug}
                href="#tracks"
                onClick={() => onSelectSlug(program.slug)}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-25px_rgba(30,27,22,0.35)] sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-academy text-xl font-medium text-foreground">
                  {program.title}
                </h3>
                {program.outcomes && program.outcomes.length > 0 && (
                  <ul className="mt-4 flex-1 space-y-2 text-sm text-foreground/65">
                    {program.outcomes.slice(0, 3).map((outcome) => (
                      <li key={outcome} className="leading-relaxed">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  View curriculum
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademyInsights;
