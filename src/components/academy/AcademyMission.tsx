import { GraduationCap, Sparkles, Users2 } from "lucide-react";
import mentorPhoto from "@/assets/academy/academy-memory-mentor.jpg";

const FACTS = [
  { icon: Users2, label: "Small cohorts", detail: "Capped so mentors know your name and your code." },
  { icon: Sparkles, label: "Real projects", detail: "You ship things that go in a portfolio, not a syllabus." },
  { icon: GraduationCap, label: "3-month sprint", detail: "Frontend, backend or AI/ML — job-ready, on purpose." },
];

const AcademyMission = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(30,27,22,0.35)]">
              <img
                src={mentorPhoto}
                alt="A mentor explaining a concept at a whiteboard to two FuseLabs Academy students"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              The Academy
            </span>
            <h2 className="mt-4 max-w-xl font-academy text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-foreground">
              A single home for people who want to ship real software.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/65 sm:text-lg">
              FuseLabs Academy grew out of our client studio — the same
              engineers who ship MVPs for founders also design and teach the
              curriculum. You&rsquo;re not learning theory in isolation; you&rsquo;re
              learning the exact workflow, tools and review process we use on
              paid work.
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              {FACTS.map(({ icon: Icon, label, detail }) => (
                <div key={label} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <dt className="font-semibold text-foreground">{label}</dt>
                    <dd className="mt-0.5 text-sm text-foreground/60">{detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyMission;
