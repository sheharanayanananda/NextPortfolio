"use client";

import { useRef, useEffect, useCallback, MouseEvent } from "react";

export default function HangingNameBadge() {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const groupRef = useRef<SVGGElement | null>(null);

  // Physics state (pure refs - zero React re-renders for buttery 120fps smoothness)
  const angleRef = useRef(11.5); // Initial tilt angle in degrees
  const velocityRef = useRef(0); // Velocity in deg/s
  const lastTimeRef = useRef<number | null>(null);
  const animRef = useRef<number | null>(null);
  const lastTriggerTimeRef = useRef(0);

  // Natural physical pendulum simulation
  const updatePhysics = useCallback(() => {
    const now = performance.now();
    if (lastTimeRef.current === null) {
      lastTimeRef.current = now;
    }
    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.033);
    lastTimeRef.current = now;

    // Graceful, silky pendulum physics constants:
    // Natural frequency omega0^2 = 24.0 (~0.78 Hz cycle)
    // Damping = 1.85 (calm, elegant harmonic decay)
    const omega0Sq = 24.0;
    const damping = 1.85;

    const rad = (angleRef.current * Math.PI) / 180;
    const accel = -omega0Sq * Math.sin(rad) * (180 / Math.PI) - damping * velocityRef.current;

    velocityRef.current += accel * dt;
    angleRef.current += velocityRef.current * dt;

    // Direct GPU transform update on the DOM node (zero React render overhead)
    if (groupRef.current) {
      groupRef.current.style.transform = `rotate(${angleRef.current.toFixed(2)}deg)`;
    }

    // Continue loop until fully rested
    if (Math.abs(angleRef.current) > 0.03 || Math.abs(velocityRef.current) > 0.25) {
      animRef.current = requestAnimationFrame(updatePhysics);
    } else {
      angleRef.current = 0;
      velocityRef.current = 0;
      if (groupRef.current) {
        groupRef.current.style.transform = "rotate(0deg)";
      }
      animRef.current = null;
      lastTimeRef.current = null;
    }
  }, []);

  const startPhysics = useCallback(() => {
    lastTimeRef.current = null;
    if (!animRef.current) {
      animRef.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  // Smooth entrance swing from initial tilt
  const triggerEntranceSwing = useCallback(
    (forced = false) => {
      const now = performance.now();
      // Debounce automatic triggers (cooldown 1.5s) unless explicitly forced
      if (!forced && now - lastTriggerTimeRef.current < 1500) {
        return;
      }
      lastTriggerTimeRef.current = now;

      // Start from an elegant, gentle tilt (+11.5 degrees)
      angleRef.current = 11.5;
      velocityRef.current = 0;
      if (groupRef.current) {
        groupRef.current.style.transform = "rotate(11.50deg)";
      }
      startPhysics();
    },
    [startPhysics]
  );

  // Apply subtle, non-aggressive impulse (in deg/s)
  const applyImpulse = useCallback(
    (impulse: number) => {
      velocityRef.current += impulse;
      velocityRef.current = Math.max(-60, Math.min(60, velocityRef.current));
      startPhysics();
    },
    [startPhysics]
  );

  // 1. Initial page load entrance swing
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerEntranceSwing(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [triggerEntranceSwing]);

  // 2. Play animation whenever user returns to the tab or switches back to the window
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        triggerEntranceSwing();
      } else {
        // Pause physics when tab is inactive to save battery
        if (animRef.current) {
          cancelAnimationFrame(animRef.current);
          animRef.current = null;
        }
      }
    };

    const handleWindowFocus = () => {
      triggerEntranceSwing();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [triggerEntranceSwing]);

  // 3. Play gentle entrance swing when user scrolls back into view
  useEffect(() => {
    const target = containerRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;

    let hasInitiallyShown = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (hasInitiallyShown) {
              triggerEntranceSwing();
            }
            hasInitiallyShown = true;
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerEntranceSwing]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Subtle, calm user reactivity (not overly sensitive)
  const handleMouseEnter = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pivotX = rect.left + rect.width * 0.5;
    // Gentle directional nudge (+/- 18 deg/s)
    const direction = e.clientX < pivotX ? -1 : 1;
    applyImpulse(direction * 18);
  };

  const handleClick = () => {
    // Gentle playful tap (+/- 28 deg/s)
    applyImpulse(angleRef.current >= 0 ? -28 : 28);
  };

  return (
    <span
      ref={containerRef}
      className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-auto select-none"
      style={{
        width: "1.45em",
        height: "1.65em",
      }}
    >
      <svg
        viewBox="0 0 160 175"
        className="w-full h-full overflow-visible cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        aria-label="Also known as Shei - Hanging name badge"
      >
        <defs>
          <filter id="board-drop-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="rgba(20, 20, 19, 0.09)" />
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(20, 20, 19, 0.05)" />
          </filter>
        </defs>

        {/* The entire hanging assembly pivots smoothly around the dot of 'i' at (80, 26) */}
        <g
          ref={groupRef}
          style={{
            transformOrigin: "80px 26px",
            transform: "rotate(11.5deg)",
            willChange: "transform",
          }}
        >
          {/* Continuous Cord Path:
              Starts at Left Board Peg (44.8, 107.5) -> loops over the Dot of 'i' at (80, 26) -> goes to Right Board Peg (106.8, 89.8) */}
          <path
            d="M 44.8 107.5 L 73.5 27.5 A 6.8 6.8 0 0 1 86.5 27.5 L 106.8 89.8"
            fill="none"
            stroke="rgba(20, 20, 19, 0.32)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Small ring/knot loop accents on the board attachment pegs */}
          <circle cx="44.8" cy="107.5" r="2.2" fill="rgba(20, 20, 19, 0.45)" />
          <circle cx="106.8" cy="89.8" r="2.2" fill="rgba(20, 20, 19, 0.45)" />

          {/* The Hanging Sign Board (Tilted at -16 degrees resting position) */}
          <g transform="translate(80, 114) rotate(-16)">
            {/* White Board Card */}
            <rect
              x="-47"
              y="-17"
              width="94"
              height="34"
              rx="7.5"
              fill="#ffffff"
              stroke="#e5e1d8"
              strokeWidth="1.3"
              filter="url(#board-drop-shadow)"
            />

            {/* Subtle inner card border accent */}
            <rect
              x="-46"
              y="-16"
              width="92"
              height="32"
              rx="6.5"
              fill="none"
              stroke="rgba(240, 238, 230, 0.6)"
              strokeWidth="0.8"
            />

            {/* Board Text: AKA SHEI */}
            <text
              x="0"
              y="5.2"
              textAnchor="middle"
              className="font-sans-anthropic select-none font-bold"
              style={{
                fontSize: "13.5px",
                letterSpacing: "0.07em",
              }}
            >
              <tspan fill="#141413">AKA </tspan>
              <tspan fill="#D97757">SHEI</tspan>
            </text>
          </g>
        </g>
      </svg>
    </span>
  );
}
