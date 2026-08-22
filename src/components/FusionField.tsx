import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CoreParticle = {
  theta: number;
  phi: number;
  radius: number;
  size: number;
  alpha: number;
  speed: number;
  shade: 0 | 1 | 2;
};

type Star = {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: 0 | 1 | 2;
  depth: number;
  driftX: number;
  driftY: number;
};

type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

type FusionFieldProps = {
  className?: string;
};

const AMBER = [222, 131, 33] as const;
const CREAM = [248, 230, 211] as const;
const HEAT = [195, 91, 60] as const;
const STARLIGHT = [196, 214, 255] as const;
const NEBULA_VIOLET = [104, 89, 168] as const;

function shadeColor(shade: CoreParticle["shade"]) {
  if (shade === 0) return CREAM;
  if (shade === 1) return AMBER;
  return HEAT;
}

function starColor(hue: Star["hue"]) {
  if (hue === 2) return STARLIGHT;
  if (hue === 1) return AMBER;
  return CREAM;
}

function createCoreParticles(count: number): CoreParticle[] {
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

function createStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    const depth = Math.pow(Math.random(), 1.4);
    const hueRoll = Math.random();
    return {
      x: Math.random(),
      y: Math.random(),
      size: 0.35 + depth * 1.55,
      baseAlpha: 0.12 + depth * 0.68,
      twinkleSpeed: 0.35 + Math.random() * 1.7,
      twinklePhase: Math.random() * Math.PI * 2,
      hue: hueRoll > 0.9 ? 2 : hueRoll > 0.62 ? 1 : 0,
      depth,
      driftX: (Math.random() - 0.5) * 0.008,
      driftY: (Math.random() - 0.5) * 0.006 + 0.004,
    };
  });
}

const wrap01 = (v: number) => ((v % 1) + 1) % 1;

export function FusionField({ className }: FusionFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const coreParticles = createCoreParticles(isMobile ? 64 : 150);
    const stars = createStars(isMobile ? 90 : 220);
    const comets: Comet[] = [];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let lastTime = 0;
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

    const maybeSpawnComet = () => {
      if (isMobile || reduced || comets.length >= 2) return;
      if (Math.random() > 0.0028) return;
      const fromLeft = Math.random() > 0.5;
      const startY = height * (0.05 + Math.random() * 0.45);
      const angle = (fromLeft ? 1 : -1) * (0.28 + Math.random() * 0.22);
      const travel = (0.55 + Math.random() * 0.35) * Math.max(width, height);
      comets.push({
        x: fromLeft ? -20 : width + 20,
        y: startY,
        vx: Math.cos(angle) * travel * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * travel,
        life: 1,
        maxLife: 1,
        size: 1.4 + Math.random() * 1.1,
      });
    };

    const drawNebula = (t: number) => {
      const wisps: { x: number; y: number; r: number; color: readonly [number, number, number]; alpha: number }[] = [
        {
          x: width * (0.28 + Math.sin(t * 0.05) * 0.06),
          y: height * (0.38 + Math.cos(t * 0.04) * 0.05),
          r: Math.max(width, height) * 0.55,
          color: HEAT,
          alpha: 0.1,
        },
        {
          x: width * (0.72 + Math.cos(t * 0.045) * 0.05),
          y: height * (0.32 + Math.sin(t * 0.06) * 0.06),
          r: Math.max(width, height) * 0.48,
          color: AMBER,
          alpha: 0.08,
        },
        {
          x: width * (0.84 + Math.sin(t * 0.03) * 0.04),
          y: height * (0.78 + Math.cos(t * 0.035) * 0.05),
          r: Math.max(width, height) * 0.4,
          color: NEBULA_VIOLET,
          alpha: 0.07,
        },
      ];

      for (const wisp of wisps) {
        const gradient = ctx.createRadialGradient(wisp.x, wisp.y, 0, wisp.x, wisp.y, wisp.r);
        const [r, g, b] = wisp.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${wisp.alpha})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${wisp.alpha * 0.35})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawStars = (t: number) => {
      for (const star of stars) {
        const driftedX = wrap01(star.x + star.driftX * t * 0.02);
        const driftedY = wrap01(star.y + star.driftY * t * 0.02);
        const parallax = 10 + star.depth * 22;
        const px = driftedX * width + mouse.x * parallax;
        const py = driftedY * height + mouse.y * parallax;

        const twinkle = 0.45 + 0.55 * Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.baseAlpha * Math.max(0.08, twinkle);
        const [r, g, b] = starColor(star.hue);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.depth > 0.82) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.22})`;
          ctx.arc(px, py, star.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawComets = (dt: number) => {
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.x += comet.vx * dt;
        comet.y += comet.vy * dt;
        comet.life -= dt * 1.1;

        if (comet.life <= 0 || comet.x < -60 || comet.x > width + 60 || comet.y > height + 60) {
          comets.splice(i, 1);
          continue;
        }

        const fade = Math.sin(Math.min(1, Math.max(0, comet.life)) * Math.PI);
        const tailX = comet.x - comet.vx * 0.05;
        const tailY = comet.y - comet.vy * 0.05;
        const trail = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
        trail.addColorStop(0, "rgba(248, 230, 211, 0)");
        trail.addColorStop(1, `rgba(248, 230, 211, ${0.75 * fade})`);
        ctx.strokeStyle = trail;
        ctx.lineWidth = comet.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(comet.x, comet.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 250, 240, ${0.9 * fade})`;
        ctx.arc(comet.x, comet.y, comet.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawFrame = (time: number, dt: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.46;
      const field = Math.min(width, height) * 0.42;
      const t = time * 0.001;

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      drawNebula(t);
      drawStars(t);
      if (!reduced) drawComets(dt);

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, field * 1.35);
      core.addColorStop(0, "rgba(222, 131, 33, 0.28)");
      core.addColorStop(0.22, "rgba(195, 91, 60, 0.12)");
      core.addColorStop(0.55, "rgba(222, 131, 33, 0.04)");
      core.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, width, height);

      const rotY = t * 0.22 + mouse.x * 0.55;
      const rotX = t * 0.08 + mouse.y * 0.35;

      const projected: { x: number; y: number; z: number; p: CoreParticle }[] = [];

      for (const p of coreParticles) {
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
        const twinkle = 0.82 + 0.18 * Math.sin(t * 1.6 + item.p.theta * 3);
        const alpha = item.p.alpha * (0.25 + depth * 0.75) * twinkle;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      maybeSpawnComet();
    };

    let looping = false;

    const tick = (time: number) => {
      looping = false;
      if (!running) return;
      const dt = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
      lastTime = time;
      drawFrame(time, dt);
      if (!reduced && running) {
        looping = true;
        frame = window.requestAnimationFrame(tick);
      }
    };

    const start = () => {
      running = true;
      if (reduced) {
        lastTime = 0;
        drawFrame(0, 0);
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
      if (reduced) drawFrame(0, 0);
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
