import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { AcademyProgram } from "@/hooks/use-academy-programs";
import frontendDev from "@/assets/frontend-dev.jpg";
import backendDev from "@/assets/backend-dev.jpg";
import aiMlDev from "@/assets/ai-ml-dev.jpg";

const FALLBACK_IMAGE: Record<string, string> = {
  "frontend-development": frontendDev,
  "backend-development": backendDev,
  "ai-ml-development": aiMlDev,
};

interface AcademyTracksProps {
  programs: AcademyProgram[];
  loading: boolean;
  selectedSlug: string | null;
  onSelectSlug: (slug: string) => void;
}

const AcademyTracks = ({ programs, loading, selectedSlug, onSelectSlug }: AcademyTracksProps) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(selectedSlug);

  useEffect(() => {
    if (!activeSlug && programs.length > 0) {
      setActiveSlug(programs[0].slug);
    }
  }, [programs, activeSlug]);

  const active = programs.find((p) => p.slug === activeSlug) ?? programs[0];

  return (
    <section id="tracks" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Choose your track
          </span>
          <h2 className="mt-4 font-academy text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-foreground">
            Three ways in, one standard of work.
          </h2>
        </div>

        {loading ? (
          <p className="mt-10 text-foreground/60">Loading tracks…</p>
        ) : programs.length === 0 ? (
          <p className="mt-10 text-foreground/60">Tracks are being updated — check back shortly.</p>
        ) : (
          <>
            <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-4">
              {programs.map((program) => {
                const isActive = program.slug === active?.slug;
                return (
                  <button
                    key={program.slug}
                    type="button"
                    onClick={() => setActiveSlug(program.slug)}
                    className={
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                      (isActive
                        ? "bg-foreground text-background"
                        : "text-foreground/60 hover:bg-foreground/8 hover:text-foreground")
                    }
                  >
                    {program.title}
                  </button>
                );
              })}
            </div>

            {active && (
              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                <div className="overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(30,27,22,0.35)]">
                  <img
                    src={active.image || FALLBACK_IMAGE[active.slug] || frontendDev}
                    alt={active.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  {active.tagline && (
                    <p className="font-academy text-xl italic text-foreground/80 sm:text-2xl">
                      &ldquo;{active.tagline}&rdquo;
                    </p>
                  )}
                  {active.description && (
                    <p className="mt-4 text-base leading-relaxed text-foreground/65">
                      {active.description}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                    {active.price && (
                      <span className="rounded-full bg-primary/12 px-3 py-1.5 font-semibold text-primary">
                        {active.price}
                      </span>
                    )}
                    {active.duration && (
                      <span className="rounded-full border border-border px-3 py-1.5 text-foreground/70">
                        {active.duration}
                      </span>
                    )}
                    {active.level && (
                      <span className="rounded-full border border-border px-3 py-1.5 text-foreground/70">
                        {active.level}
                      </span>
                    )}
                  </div>

                  {active.syllabus && active.syllabus.length > 0 && (
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {active.syllabus.slice(0, 6).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href="#enroll"
                    onClick={() => onSelectSlug(active.slug)}
                    className="group mt-8 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Apply for {active.title}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AcademyTracks;
