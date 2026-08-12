"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent, ReactNode } from "react";

interface FloatingArcButtonProps {
  href: string;
  label: string;
  target?: string;
  rel?: string;
  ariaLabel: string;
  baseRotation?: number; // Base tilt angle in degrees e.g. 20, 0, -20
  className?: string;
  children?: ReactNode;
}

export default function FloatingArcButton({
  href,
  label,
  target,
  rel,
  ariaLabel,
  baseRotation = 0,
  className = "",
  children,
}: FloatingArcButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isHoveredRef = useRef(false);
  const isAnimatingRef = useRef(false);

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

  // 60fps Liquid LERP loop with smooth opacity interpolation
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
      `perspective(600px) rotateZ(${baseRotation}deg) rotateX(${cur.rotateX.toFixed(3)}deg) rotateY(${cur.rotateY.toFixed(3)}deg) translateZ(${cur.translateZ.toFixed(2)}px) scale3d(${cur.scale.toFixed(4)}, ${cur.scale.toFixed(4)}, 1)`
    );

    if (Math.abs(cur.shadowX) > 0.01 || Math.abs(cur.shadowY) > 0.01) {
      setShadowStyle(
        `${cur.shadowX.toFixed(1)}px ${cur.shadowY.toFixed(1)}px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)`
      );
    } else {
      setShadowStyle("none");
    }

    setGlareStyle(
      `radial-gradient(circle at ${cur.glareX.toFixed(1)}% ${cur.glareY.toFixed(1)}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 75%)`
    );

    setGlareOpacity(Number(cur.glareOpacity.toFixed(3)));

    const diff =
      Math.abs(tgt.rotateX - cur.rotateX) +
      Math.abs(tgt.rotateY - cur.rotateY) +
      Math.abs(tgt.translateZ - cur.translateZ) +
      Math.abs(tgt.glareOpacity - cur.glareOpacity);

    if (diff < 0.001 && !isHoveredRef.current) {
      cur.rotateX = 0;
      cur.rotateY = 0;
      cur.translateZ = 0;
      cur.scale = 1;
      cur.shadowX = 0;
      cur.shadowY = 0;
      cur.glareOpacity = 0;
      setTransformStyle(`perspective(600px) rotateZ(${baseRotation}deg) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`);
      setShadowStyle("none");
      setGlareOpacity(0);
      isAnimatingRef.current = false;
      rafId.current = null;
      return;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [baseRotation]);

  const startAnimationLoop = useCallback(() => {
    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetRef.current = {
      rotateX: -((y - centerY) / centerY) * 7.0,
      rotateY: ((x - centerX) / centerX) * 7.0,
      translateZ: -4,
      scale: 1.04,
      shadowX: (centerX - x) * 0.06,
      shadowY: (centerY - y) * 0.06,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.9,
    };

    startAnimationLoop();
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    isHoveredRef.current = true;
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    currentRef.current.glareX = glareX;
    currentRef.current.glareY = glareY;
    targetRef.current.glareX = glareX;
    targetRef.current.glareY = glareY;
    targetRef.current.glareOpacity = 0.9;

    startAnimationLoop();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
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

    startAnimationLoop();
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`hidden lg:flex absolute z-10 items-center justify-center text-center bg-[var(--card-bg)] text-[var(--text-charcoal)] rounded-xl font-sans-anthropic font-semibold text-xs uppercase border border-[var(--border-light)] overflow-hidden cursor-pointer select-none will-change-transform ${className}`}
      style={{
        transform: transformStyle || `perspective(600px) rotateZ(${baseRotation}deg) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
        boxShadow: shadowStyle,
        transformStyle: "preserve-3d",
      }}
    >
      <span className="relative z-10">{label}</span>

      {/* Specular glare */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl mix-blend-overlay"
        style={{
          background: glareStyle,
          opacity: glareOpacity,
        }}
      />
    </a>
  );
}
