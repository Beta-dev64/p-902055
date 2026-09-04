import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /** Pause the animation on hover. */
  pauseOnHover?: boolean;
  /** Content to place in the marquee. */
  children?: React.ReactNode;
  /** Run the marquee vertically instead of horizontally. */
  vertical?: boolean;
  /** Number of times to repeat the content so the loop reads seamlessly. */
  repeat?: number;
}

/**
 * A seamless, infinitely-looping marquee.
 *
 * The content is duplicated `repeat` times and laid out in a row (or column).
 * Every copy runs the exact same CSS animation, so the moment one copy
 * finishes translating by its own width (+gap), the next copy is already in
 * that exact spot — no visible start/end seam, no JS-driven scroll math.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
