"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";
import Image from "next/image";

export default function ArcCardInteractive() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Target and current physics state for liquid LERP damping
  const targetRef = useRef({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    scale: 1,
    shadowX: 0,
    shadowY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const currentRef = useRef({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
    scale: 1,
    shadowX: 0,
    shadowY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const rafId = useRef<number | null>(null);

  const [transformStyle, setTransformStyle] = useState("");
  const [shadowStyle, setShadowStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState("");
  const [glareOpacity, setGlareOpacity] = useState(0);

  // 60fps Liquid LERP loop with smooth opacity interpolation (no DOM pop)
  const animate = useCallback(() => {
    const cur = currentRef.current;
    const tgt = targetRef.current;
    const lerpFactor = 0.08;

    cur.rotateX += (tgt.rotateX - cur.rotateX) * lerpFactor;
    cur.rotateY += (tgt.rotateY - cur.rotateY) * lerpFactor;
    cur.translateZ += (tgt.translateZ - cur.translateZ) * lerpFactor;
    cur.scale += (tgt.scale - cur.scale) * lerpFactor;
    cur.shadowX += (tgt.shadowX - cur.shadowX) * lerpFactor;
    cur.shadowY += (tgt.shadowY - cur.shadowY) * lerpFactor;
    cur.glareX += (tgt.glareX - cur.glareX) * lerpFactor;
    cur.glareY += (tgt.glareY - cur.glareY) * lerpFactor;
    cur.glareOpacity += (tgt.glareOpacity - cur.glareOpacity) * lerpFactor;

    setTransformStyle(
      `perspective(1000px) rotateX(${cur.rotateX.toFixed(3)}deg) rotateY(${cur.rotateY.toFixed(3)}deg) translateZ(${cur.translateZ.toFixed(2)}px) scale3d(${cur.scale.toFixed(4)}, ${cur.scale.toFixed(4)}, 1)`
    );

    if (Math.abs(cur.shadowX) > 0.01 || Math.abs(cur.shadowY) > 0.01) {
      setShadowStyle(
        `${cur.shadowX.toFixed(1)}px ${cur.shadowY.toFixed(1)}px 24px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.02)`
      );
    } else {
      setShadowStyle("none");
    }

    setGlareStyle(
      `radial-gradient(circle at ${cur.glareX.toFixed(1)}% ${cur.glareY.toFixed(1)}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`
    );

    setGlareOpacity(Number(cur.glareOpacity.toFixed(3)));

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetRef.current = {
      rotateX: -((y - centerY) / centerY) * 5.5,
      rotateY: ((x - centerX) / centerX) * 5.5,
      translateZ: -5,
      scale: 0.992,
      shadowX: (centerX - x) * 0.04,
      shadowY: (centerY - y) * 0.04,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.85,
    };
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    // Set initial position to exact enter coordinates to prevent position jump
    currentRef.current.glareX = glareX;
    currentRef.current.glareY = glareY;
    targetRef.current.glareX = glareX;
    targetRef.current.glareY = glareY;
    targetRef.current.glareOpacity = 0.85;
  };

  const handleMouseLeave = () => {
    targetRef.current = {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      scale: 1,
      shadowX: 0,
      shadowY: 0,
      glareX: currentRef.current.glareX,
      glareY: currentRef.current.glareY,
      glareOpacity: 0,
    };
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden border border-[var(--border-light)] bg-[var(--card-bg)] z-10 cursor-pointer rounded-2xl will-change-transform"
      style={{
        transform: transformStyle || "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        boxShadow: shadowStyle,
        transformStyle: "preserve-3d"
      }}
    >
      <Image
        src="/arc_card.svg"
        alt="Arc Card, Thineth Shehara, Software Engineer"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover pointer-events-none select-none"
      />

      {/* Specular glare: always mounted, opacity LERP-controlled for zero color flash */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl mix-blend-overlay"
        style={{
          background: glareStyle,
          opacity: glareOpacity
        }}
      />
    </div>
  );
}
