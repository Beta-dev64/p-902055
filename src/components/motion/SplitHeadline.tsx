import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { animate, stagger } from "animejs";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "./utils";

type SplitHeadlineProps = {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  staggerMs?: number;
  /** Rendered inside the heading after the animated words (e.g. <span>). */
  extra?: ReactNode;
};

/**
 * Word-by-word masked headline reveal — each word slides up out of an
 * overflow-hidden sleeve the first time the heading enters the viewport.
 */
export function SplitHeadline({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  staggerMs = 55,
  extra,
}: SplitHeadlineProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(
      el.querySelectorAll<HTMLElement>("[data-split-word]")
    );
    if (!words.length) return;

    if (prefersReducedMotion()) {
      words.forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
      return;
    }

    let anim: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          anim = animate(words, {
            opacity: [0, 1],
            translateY: ["115%", "0%"],
            duration: 900,
            delay: stagger(staggerMs, { start: delay }),
            ease: "outExpo",
          });
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      anim?.cancel();
    };
  }, [text, delay, staggerMs]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("text-balance", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="contents"
        >
          <span
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <span data-split-word className="inline-block opacity-0 will-change-transform">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
      {extra}
    </Tag>
  );
}
