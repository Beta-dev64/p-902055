import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { animate, stagger } from "animejs";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "./utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px, before easing. */
  y?: number;
  /** When set, direct children animate as a staggered sequence. */
  stagger?: number;
  as?: ElementType;
};

/** Scroll-reveal wrapper powered by anime.js — fades/slides up once in view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  stagger: staggerAmount,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = staggerAmount ? Array.from(el.children) : [el];

    if (prefersReducedMotion()) {
      targets.forEach((t) => {
        (t as HTMLElement).style.opacity = "1";
        (t as HTMLElement).style.transform = "";
      });
      return;
    }

    targets.forEach((t) => {
      const node = t as HTMLElement;
      node.style.opacity = "0";
      node.style.transform = `translateY(${y}px)`;
    });

    let anim: ReturnType<typeof animate> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          anim = animate(targets, {
            opacity: [0, 1],
            translateY: [y, 0],
            duration: 820,
            delay: staggerAmount
              ? stagger(staggerAmount, { start: delay })
              : delay,
            ease: "outExpo",
          });
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      anim?.cancel();
    };
  }, [delay, y, staggerAmount]);

  return <Tag ref={ref} className={cn(className)}>{children}</Tag>;
}

/**
 * Safety net for legacy `.reveal` / `.animate-on-scroll` nodes (class-driven
 * CSS transitions) that mount after route changes — observes them and flips
 * `is-visible` on intersection. Reduced-motion setups show everything outright.
 */
export function RevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) {
      document
        .querySelectorAll(".reveal, .animate-on-scroll")
        .forEach((n) => n.classList.add("is-visible", "animate-fade-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible", "animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll(".reveal, .animate-on-scroll").forEach((n) => {
        if (!n.classList.contains("is-visible")) observer.observe(n);
      });
    };

    observeAll();
    const t1 = window.setTimeout(observeAll, 200);
    const t2 = window.setTimeout(observeAll, 800);

    return () => {
      observer.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
