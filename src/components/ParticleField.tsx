// Style: Molten Systems — a restrained signal field that makes the agency hero feel alive without competing with the promise.
import { useEffect, useRef } from "react";

type ParticleFieldProps = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

const ParticleField = ({ className = "" }: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let particles: Particle[] = [];
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = coarsePointer.matches ? 34 : Math.min(88, Math.floor((width * height) / 16000));
      particles = Array.from({ length: Math.max(26, count) }, (_, index) => ({
        x: (index * 137.31) % width,
        y: (index * 83.17) % height,
        vx: ((index % 3) - 1) * 0.08,
        vy: (((index + 1) % 3) - 1) * 0.06,
        r: index % 5 === 0 ? 1.8 : 1.1,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * 0.62, height * 0.42, 0, width * 0.62, height * 0.42, Math.max(width, height) * 0.64);
      glow.addColorStop(0, "rgba(222, 131, 33, 0.13)");
      glow.addColorStop(0.48, "rgba(222, 131, 33, 0.025)");
      glow.addColorStop(1, "rgba(14, 12, 12, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (const particle of particles) {
        if (!reduceMotion.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }

        if (pointer.active && !coarsePointer.matches && !reduceMotion.matches) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 170 && distance > 0) {
            const force = (1 - distance / 170) * 0.34;
            particle.x -= (dx / distance) * force;
            particle.y -= (dy / distance) * force;
          }
        }

        context.beginPath();
        context.fillStyle = "rgba(248, 230, 211, 0.72)";
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fill();
      }

      if (!reduceMotion.matches && !coarsePointer.matches) {
        for (let index = 0; index < particles.length; index += 1) {
          for (let next = index + 1; next < particles.length; next += 1) {
            const first = particles[index];
            const second = particles[next];
            const distance = Math.hypot(first.x - second.x, first.y - second.y);
            if (distance < 118) {
              context.strokeStyle = `rgba(222, 131, 33, ${0.16 * (1 - distance / 118)})`;
              context.lineWidth = 0.7;
              context.beginPath();
              context.moveTo(first.x, first.y);
              context.lineTo(second.x, second.y);
              context.stroke();
            }
          }
        }
      }

      if (!reduceMotion.matches) animationFrame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
};

export default ParticleField;
