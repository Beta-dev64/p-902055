import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

/** Scroll-reveal wrapper — fades/slides up when entering the viewport. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ transitionDelay: `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Observes `.reveal` / `.animate-on-scroll` nodes after route changes. */
export function RevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
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
    // Catch content that mounts after async fetches
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
