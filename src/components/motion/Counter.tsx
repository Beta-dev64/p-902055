import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "./utils";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Counts up from 0 (or `from`) to `to` once the element scrolls into view. */
export function Counter({
  to,
  from = 0,
  duration = 1600,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (v: number) =>
      `${prefix}${v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    if (prefersReducedMotion()) {
      el.textContent = format(to);
      return;
    }

    el.textContent = format(from);
    const state = { value: from };
    let anim: ReturnType<typeof animate> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          anim = animate(state, {
            value: to,
            duration,
            ease: "outExpo",
            onUpdate: () => {
              el.textContent = format(state.value);
            },
          });
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      anim?.cancel();
    };
  }, [to, from, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
