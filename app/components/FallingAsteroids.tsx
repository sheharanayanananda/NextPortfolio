"use client";

import { useEffect, useRef } from "react";

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  thickness: number;
  opacity: number;
  fadeSpeed: number;
  life: number;
  maxLife: number;
}

export default function FallingAsteroids({ className = "z-[2]" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let meteors: Meteor[] = [];
    let isVisible = true;
    let nextSpawnTime = performance.now() + 1500; // First one spawns shortly after mount

    // Handle high DPI displays
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause animation when tab or hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const spawnMeteor = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Realistic shooting star angles: 35deg to 55deg downward
      const angle = (Math.PI / 180) * (36 + Math.random() * 18);
      // Fast speed crossing sky in < 1 second
      const speed = 12 + Math.random() * 8; // px per frame
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      // Spawn either from top or from top-left side
      const spawnFromTop = Math.random() < 0.7;
      let startX: number;
      let startY: number;

      if (spawnFromTop) {
        startX = Math.random() * (w * 0.75);
        startY = -20;
      } else {
        startX = -20;
        startY = Math.random() * (h * 0.4);
      }

      const length = 100 + Math.random() * 120;
      const thickness = 1.2 + Math.random() * 1.0;
      const maxLife = 40 + Math.random() * 25; // frames

      meteors.push({
        x: startX,
        y: startY,
        vx,
        vy,
        length,
        thickness,
        opacity: 0,
        fadeSpeed: 0.045 + Math.random() * 0.02,
        life: 0,
        maxLife,
      });

      // Schedule next meteor: random interval between 4.5s and 9s
      nextSpawnTime = now + 4500 + Math.random() * 4500;
    };

    let lastTime = performance.now();

    const loop = (now: number) => {
      animationFrameId = requestAnimationFrame(loop);

      if (!isVisible) {
        lastTime = now;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Check if it's time to spawn a new asteroid
      if (now >= nextSpawnTime) {
        spawnMeteor(now);
      }

      // Update and draw active meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;

        // Fade in rapidly during first few frames, then gradual fade out
        if (m.life < 8) {
          m.opacity = Math.min(1.0, m.opacity + 0.2);
        } else if (m.life > m.maxLife - 20) {
          m.opacity = Math.max(0, m.opacity - m.fadeSpeed);
        }

        // Calculate tail end coordinates
        const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.length;
        const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.length;

        // Draw glowing meteor tail
        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        // Bright white glowing head with subtle warm amber incandescent atmosphere
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity * 0.95})`);
        gradient.addColorStop(0.15, `rgba(255, 250, 240, ${m.opacity * 0.75})`);
        gradient.addColorStop(0.5, `rgba(235, 245, 255, ${m.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.thickness;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Bright small head point
        ctx.fillStyle = `rgba(255, 255, 255, ${m.opacity})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thickness * 0.9, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Remove meteors that faded out or moved completely offscreen
        if (m.life >= m.maxLife || m.opacity <= 0 || m.x > w + 100 || m.y > h + 100) {
          meteors.splice(i, 1);
        }
      }

      lastTime = now;
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
}
