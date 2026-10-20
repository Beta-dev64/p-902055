import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SplitHeadline } from "./SplitHeadline";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/** Dark immersive header band shared by all internal marketing pages. */
export function PageHero({ eyebrow, title, description, className, children }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#070605] pb-16 pt-36 text-white sm:pb-20 sm:pt-44",
        className
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute bottom-[-30%] left-1/2 h-[70%] w-[110%] -translate-x-1/2 opacity-60"
          style={{
            background:
              "conic-gradient(from 210deg at 50% 100%, transparent 0deg, rgba(222,131,33,0.22) 42deg, transparent 88deg, rgba(195,91,60,0.14) 130deg, transparent 180deg)",
            filter: "blur(52px)",
          }}
        />
        <div className="absolute -top-24 right-[-10%] h-[32vmin] w-[32vmin] rounded-full bg-primary-500/10 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        {eyebrow && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
            {eyebrow}
          </p>
        )}
        <SplitHeadline
          as="h1"
          text={title}
          delay={100}
          className="max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
        />
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
