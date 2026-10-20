import { useCallback, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "./utils";
import { CurtainContext } from "./pageCurtainContext";

const scrollToHash = (hash: string) => {
  const target = document.getElementById(hash.replace("#", ""));
  if (!target) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
};

/**
 * Four ember-lit panels wipe up the viewport across a route change. Timers back
 * every anime callback up: a backgrounded tab pauses rAF, and navigation must
 * never depend on the animation being allowed to finish.
 */
export function PageCurtainProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const wipe = useCallback((run: () => void) => {
    const panels = trackRef.current
      ? (Array.from(trackRef.current.children) as HTMLDivElement[])
      : [];
    const canWipe =
      panels.length > 0 &&
      !prefersReducedMotion() &&
      window.matchMedia("(min-width: 1024px)").matches;

    if (!canWipe) {
      run();
      return;
    }

    busy.current = true;
    let routed = false;
    let lifted = false;

    panels.forEach((panel) => {
      panel.style.transformOrigin = "bottom";
    });

    const settle = () => {
      panels.forEach((panel) => {
        panel.style.transformOrigin = "top";
        panel.style.transform = "scaleY(0%)";
      });
      busy.current = false;
    };

    const lift = () => {
      if (lifted) return;
      lifted = true;
      panels.forEach((panel) => {
        panel.style.transformOrigin = "top";
      });
      animate(panels, {
        scaleY: ["100%", "0%"],
        duration: 560,
        ease: "inOutExpo",
        delay: stagger(65, { start: 90 }),
        onComplete: settle,
      });
      setTimeout(settle, 1400);
    };

    const route = () => {
      if (routed) return;
      routed = true;
      run();
      setTimeout(lift, 260);
    };

    animate(panels, {
      scaleY: ["0%", "100%"],
      duration: 420,
      ease: "inOutExpo",
      delay: stagger(65),
      onComplete: route,
    });
    setTimeout(route, 760);
  }, []);

  const go = useCallback(
    (to: string) => {
      if (busy.current) return;
      const path = to.split("#")[0];
      const hash = to.includes("#") ? to.slice(to.indexOf("#")) : "";
      if (hash && path === window.location.pathname) {
        scrollToHash(hash);
        return;
      }
      wipe(() => {
        navigate(to);
        if (hash) requestAnimationFrame(() => scrollToHash(hash));
      });
    },
    [navigate, wipe]
  );

  return (
    <CurtainContext.Provider value={{ go }}>
      {children}
      <div
        ref={trackRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[75] hidden lg:flex"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-full flex-1 bg-[#0e0c0c]"
            style={{ transform: "scaleY(0)" }}
          >
            {i === 1 && (
              <div className="h-full w-full bg-[radial-gradient(circle_at_50%_115%,rgba(222,131,33,0.25),transparent_60%)]" />
            )}
          </div>
        ))}
      </div>
    </CurtainContext.Provider>
  );
}
