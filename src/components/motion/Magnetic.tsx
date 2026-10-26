import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "animejs";
import { cn } from "@/lib/utils";
import { finePointer, prefersReducedMotion } from "./utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor offset the element follows by. */
  strength?: number;
};

/** Cursor-following "magnetic" wrapper for CTAs — desktop only. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !finePointer()) return;

    let anim: ReturnType<typeof animate> | undefined;

    const move = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      anim?.cancel();
      anim = animate(el, { translateX: x, translateY: y, duration: 350, ease: "outQuint" });
    };

    const leave = () => {
      anim?.cancel();
      anim = animate(el, { translateX: 0, translateY: 0, duration: 650, ease: "outElastic(1, 0.4)" });
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      anim?.cancel();
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}
