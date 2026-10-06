import { ArrowRight, CalendarDays, Check, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { AcademyProgram } from "@/hooks/use-academy-programs";

interface Props {
  programs: AcademyProgram[];
  loading: boolean;
}

export default function AcademyCurriculum({ programs, loading }: Props) {
  return (
    <section id="curriculum" className="scroll-mt-24 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <p className="text-sm font-semibold uppercase text-primary">Curriculum</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">From foundations to practical projects.</h2>
        {loading ? <p role="status" className="mt-8 text-muted-foreground">Loading curriculum…</p> : programs.length === 0 ? (
          <p className="mt-8 text-muted-foreground">Program details will be published here when available.</p>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {programs.map(program => (
              <article key={program.id} className="flex flex-col border-t border-border pt-6">
                <h3 className="font-display text-2xl font-semibold">{program.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{program.level}</p>
                <ol className="mt-6 flex-1 space-y-4">
                  {(program.syllabus ?? []).map((item, index) => (
                    <li key={`${index}-${item}`} className="flex gap-3 text-sm leading-relaxed">
                      <span className="shrink-0 font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                {!program.syllabus?.length && <p className="mt-4 text-sm text-muted-foreground">Full syllabus to be announced.</p>}
                {!!program.tools?.length && <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">{program.tools.join(" · ")}</p>}
                <Button asChild variant="link" className="mt-5 h-auto justify-start whitespace-normal px-0">
                  <Link to={`/academic/${program.slug}`}>Explore {program.title}<ArrowRight aria-hidden="true" /></Link>
                </Button>
              </article>
            ))}
          </div>
        )}

        <div id="schedule" className="mt-20 scroll-mt-24 border-t border-border pt-10">
          <p className="text-sm font-semibold uppercase text-primary">Course schedule</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Plan your learning.</h2>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Monitor className="h-4 w-4 text-primary" aria-hidden="true" />Online learning</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />Next cohort: dates to be announced</span>
          </div>
          <div className="mt-8 divide-y divide-border">
            {programs.map(program => (
              <div key={program.id} className="grid items-start gap-3 py-6 sm:grid-cols-[2fr_1fr_1fr_auto]">
                <h3 className="font-semibold">{program.title}</h3>
                <p className="text-sm text-muted-foreground">{program.duration || "Duration to be confirmed"}</p>
                <p className="text-sm font-semibold">{program.price || "Fee to be confirmed"}</p>
                <Button asChild variant="outline" className="w-fit"><Link to={`/enroll?program=${encodeURIComponent(program.slug)}`}>Apply<ArrowRight aria-hidden="true" /></Link></Button>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Class days and times will be confirmed with each cohort’s timetable.</p>
        </div>
      </div>
    </section>
  );
}