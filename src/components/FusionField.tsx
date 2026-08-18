import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  theta: number;
  phi: number;
  radius: number;
  size: number;
  alpha: number;
  speed: number;
  shade: 0 | 1 | 2;
};

type FusionFieldProps = {
  className?: string;
};

const AMBER = [222, 131, 33] as const;
const CREAM = [248, 230, 211] as const;
const HEAT = [195, 91, 60] as const;

function shadeColor(shade: Particle["shade"]) {
  if (shade === 0) return CREAM;
  if (shade === 1) return AMBER;
  return HEAT;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const roll = Math.random();
    return {
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      radius: 0.18 + Math.pow(Math.random(), 0.55) * 0.82,
      size: 0.6 + Math.random() * 2.2,
      alpha: 0.18 + Math.random() * 0.7,
      speed: 0.12 + Math.random() * 0.28,
      shade: roll > 0.72 ? 0 : roll > 0.32 ? 1 : 2,
    };
  });
}

export function FusionField({ className }: FusionFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const particles = createParticles(isMobile ? 72 : 168);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.46;
      const field = Math.min(width, height) * 0.42;
      const t = time * 0.001;

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, field * 1.35);
      core.addColorStop(0, "rgba(222, 131, 33, 0.28)");
      core.addColorStop(0.22, "rgba(195, 91, 60, 0.12)");
      core.addColorStop(0.55, "rgba(222, 131, 33, 0.04)");
      core.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, width, height);

      const rotY = t * 0.22 + mouse.x * 0.55;
      const rotX = t * 0.08 + mouse.y * 0.35;

      const projected: { x: number; y: number; z: number; p: Particle }[] = [];

      for (const p of particles) {
        const theta = p.theta + rotY * p.speed;
        const phi = p.phi + Math.sin(t * 0.15 + p.theta) * 0.04;
        const x = p.radius * Math.sin(phi) * Math.cos(theta);
        let y = p.radius * Math.cos(phi);
        let z = p.radius * Math.sin(phi) * Math.sin(theta);

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y2;
        z = z2;

        projected.push({ x, y, z, p });
      }

      projected.sort((a, b) => a.z - b.z);

      for (const item of projected) {
        const perspective = 1.35 / (1.6 - item.z);
        const px = cx + item.x * field * perspective;
        const py = cy + item.y * field * perspective * 0.92;
        const depth = (item.z + 1) / 2;
        const [r, g, b] = shadeColor(item.p.shade);
        const size = item.p.size * perspective * (isMobile ? 0.9 : 1.15);
        const alpha = item.p.alpha * (0.25 + depth * 0.75);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let looping = false;

    const tick = (time: number) => {
      looping = false;
      if (!running) return;
      drawFrame(time);
      if (!reduced && running) {
        looping = true;
        frame = window.requestAnimationFrame(tick);
      }
    };

    const start = () => {
      running = true;
      if (reduced) {
        drawFrame(0);
        return;
      }
      if (!looping) {
        looping = true;
        frame = window.requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      running = false;
      looping = false;
      window.cancelAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onLeave = () => {
      mouse.tx = 0;
      mouse.ty = 0;
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    resize();
    start();

    const onResize = () => {
      resize();
      if (reduced) drawFrame(0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
