import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "./utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

/**
 * True infinite marquee: content is rendered three times and the track is
 * translated by exactly one copy's width, so the loop point is seamless.
 */
export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
  pauseOnHover = false,
}: MarqueeProps) {
  if (prefersReducedMotion()) {
    return (
      <div className={cn("flex w-full justify-center overflow-hidden", className)}>
        <div className="flex">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex w-max shrink-0 items-center",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee-left ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
      `}</style>
    </div>
  );
}
