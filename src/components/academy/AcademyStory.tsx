import { Play } from "lucide-react";
import posterImage from "@/assets/academic-hero.jpg";

const academyVideoSrc = "/academy-hero-student-success.mp4";

const AcademyStory = () => {
  return (
    <section className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(30,27,22,0.35)]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={posterImage}
              aria-hidden="true"
            >
              <source src={academyVideoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b16]/35 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[#1e1b16]/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F7F3EC] backdrop-blur-sm">
              <Play className="h-3 w-3" fill="currentColor" aria-hidden />
              A day inside the cohort
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              What a cohort looks like
            </span>
            <h2 className="mt-4 font-academy text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.01em] text-foreground">
              Standups, pair sessions, and a lot of shipped code.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-foreground/65 sm:text-lg">
              Every week runs like a real engineering team: a Monday standup,
              structured mentor office hours, live code review on your actual
              pull requests, and a demo on Friday. No filler modules — every
              exercise maps to something you&rsquo;ll be asked to do on the
              job.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-foreground/70">
              <li className="flex gap-3">
                <span className="font-academy font-semibold text-primary">01</span>
                Weekly 1:1 mentor check-ins, not just group calls
              </li>
              <li className="flex gap-3">
                <span className="font-academy font-semibold text-primary">02</span>
                Pull-request-style code review on every project
              </li>
              <li className="flex gap-3">
                <span className="font-academy font-semibold text-primary">03</span>
                A public demo day, recorded for your portfolio
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyStory;
