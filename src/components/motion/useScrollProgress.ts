import { useEffect, useRef } from "react";
import { onScroll } from "animejs";

/**
 * Scrubbed scroll progress (0 → 1) for an element travelling through the
 * viewport. Returns a ref to attach to the tracked element and a ref that
 * always holds the current progress — read it inside rAF-driven callbacks.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = onScroll({
      target: el,
      enter: "enter 0%",
      leave: "leave 100%",
      sync: false,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    return () => {
      observer.revert();
    };
  }, []);

  return { elementRef, progressRef };
}
