import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FusionField } from "./FusionField";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#070605] text-white"
    >
      <FusionField />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div
          className="absolute bottom-[-18%] left-1/2 h-[70%] w-[90%] -translate-x-1/2 opacity-70"
          style={{
            background:
              "conic-gradient(from 210deg at 50% 100%, transparent 0deg, rgba(222,131,33,0.28) 42deg, transparent 88deg, rgba(195,91,60,0.18) 130deg, transparent 180deg)",
            filter: "blur(52px)",
          }}
        />
        <div className="absolute left-1/2 top-[44%] h-[38vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/20 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8 sm:pt-32">
        <div
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 opacity-0 animate-fade-in backdrop-blur-sm"
          style={{ animationDelay: "0.05s" }}
        >
          <span>Now booking builds</span>
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-primary-foreground">
            60 days
          </span>
        </div>

        <h1
          className="font-display text-[clamp(2.6rem,7.2vw,6.25rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-balance opacity-0 animate-fade-in"
          style={{ animationDelay: "0.18s" }}
        >
          The partner that builds,
          <br className="hidden sm:block" /> ships, and{" "}
          <span className="text-primary">grows</span>.
        </h1>

        <p
          className="mt-6 max-w-xl text-base leading-relaxed text-white/65 opacity-0 animate-fade-in sm:text-lg"
          style={{ animationDelay: "0.32s" }}
        >
          FuseLabs IO is the technical partner for founders who need an MVP, a
          growth engine, and a team that stays after launch. If we don&apos;t
          deliver, you don&apos;t pay.
        </p>

        <div
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 opacity-0 animate-fade-in sm:w-auto sm:flex-row"
          style={{ animationDelay: "0.46s" }}
        >
          <a href="#details" className="hero-cta-primary group">
            Start a Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <Link to="/academic" className="hero-cta-secondary">
            Join Academy
          </Link>
        </div>

        <p
          className="mt-8 text-[11px] uppercase tracking-[0.22em] text-white/40 opacity-0 animate-fade-in sm:text-xs"
          style={{ animationDelay: "0.58s" }}
        >
          60-day MVPs · Pay for results · No headaches
        </p>
      </div>

      <a
        href="#features"
        className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 transition-colors hover:text-white/80"
      >
        Scroll to explore
        <ArrowDown className="h-3.5 w-3.5" />
      </a>
    </section>
  );
};

export default Hero;
