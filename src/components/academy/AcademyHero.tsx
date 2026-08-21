import { ArrowRight } from "lucide-react";
import heroPhoto from "@/assets/academy/academy-hero-photo.jpg";

const IN_PAGE_LINKS = [
  { label: "Tracks", href: "#tracks" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Memories", href: "#memories" },
  { label: "Enroll", href: "#enroll" },
];

const AcademyHero = () => {
  return (
    <section className="relative isolate">
      <div className="relative flex min-h-[92svh] flex-col overflow-hidden bg-[#1e1b16] sm:min-h-[88vh]">
        <img
          src={heroPhoto}
          alt="FuseLabs Academy students collaborating around laptops in a bright studio"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110d] via-[#14110d]/35 to-transparent" />
        <div className="absolute inset-0 bg-[#1e1b16]/10" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F3E7CE]">
            FuseLabs Academy &middot; Cohort-based training
          </span>

          <h1 className="mt-5 max-w-3xl font-academy text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.01em] text-[#FBF6EC]">
            Learn the work.
            <br />
            <span className="italic text-[#F3E7CE]">Ship the proof.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#EFE7D8]/85 sm:text-lg">
            Three months of hands-on mentorship in frontend, backend or AI/ML —
            real projects, a reviewed portfolio, and a certificate that means
            something, taught by the same team that ships client work.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#tracks"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
            >
              Explore tracks
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#enroll"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FBF6EC]/35 bg-[#FBF6EC]/[0.06] px-6 py-3.5 text-sm font-medium text-[#FBF6EC] backdrop-blur-sm transition-colors hover:border-[#FBF6EC]/60 hover:bg-[#FBF6EC]/[0.12]"
            >
              Apply now
            </a>
          </div>
        </div>
      </div>

      <div className="w-full bg-background">
        <nav
          aria-label="Academy sections"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:justify-between sm:px-8 lg:px-10"
        >
          {IN_PAGE_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={
                "relative py-1 transition-colors hover:text-foreground " +
                (index !== 0 ? "sm:border-l sm:border-border sm:pl-6" : "")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default AcademyHero;
