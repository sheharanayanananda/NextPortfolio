"use client";

import { useState, useRef, useEffect, useCallback, PointerEvent, MouseEvent } from "react";

export default function HangingNameBadge() {
  const [extraRotation, setExtraRotation] = useState(14); // Start at initial tilt for entrance swing
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Physics state
  const angleRef = useRef(14); // Initial angle in degrees
  const velocityRef = useRef(0); // Velocity in deg/s
  const isDraggingRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);
  const animRef = useRef<number | null>(null);

  // Drag tracking
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastDragAngleRef = useRef(14);
  const lastDragTimeRef = useRef(0);

  // Natural physical pendulum simulation
  const updatePhysics = useCallback(() => {
    if (isDraggingRef.current) return;

    const now = performance.now();
    if (lastTimeRef.current === null) {
      lastTimeRef.current = now;
    }
    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.033);
    lastTimeRef.current = now;

    // Pendulum physics constants:
    // omega0^2 = g / L (approx 36 for ~1 Hz oscillation frequency)
    // damping = natural air resistance & cord friction
    const omega0Sq = 36.0;
    const damping = 2.2;

    const rad = (angleRef.current * Math.PI) / 180;
    const accel = -omega0Sq * Math.sin(rad) * (180 / Math.PI) - damping * velocityRef.current;

    velocityRef.current += accel * dt;
    angleRef.current += velocityRef.current * dt;

    setExtraRotation(angleRef.current);

    // Continue running until settled at resting point
    if (Math.abs(angleRef.current) > 0.05 || Math.abs(velocityRef.current) > 0.5) {
      animRef.current = requestAnimationFrame(updatePhysics);
    } else {
      angleRef.current = 0;
      velocityRef.current = 0;
      setExtraRotation(0);
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

  // Give the hanging board a physical kick velocity (in deg/s)
  const applyImpulse = useCallback(
    (impulse: number) => {
      velocityRef.current += impulse;
      // Clamp velocity to prevent excessive spinning
      velocityRef.current = Math.max(-280, Math.min(280, velocityRef.current));
      startPhysics();
    },
    [startPhysics]
  );

  // Initial entrance swing when hero section mounts
  useEffect(() => {
    // Gentle delay to coordinate with page paint
    const timer = setTimeout(() => {
      startPhysics();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [startPhysics]);

  // Reactive cursor hover & movement
  const handleMouseEnter = (e: MouseEvent<SVGSVGElement>) => {
    if (isDraggingRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pivotX = rect.left + rect.width * 0.5;
    // Push in direction of entry
    const direction = e.clientX < pivotX ? -1 : 1;
    applyImpulse(direction * 45);
  };

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (isDraggingRef.current) return;
    if (Math.abs(e.movementX) > 1.5) {
      // Gentle reactive nudge based on cursor speed
      applyImpulse(e.movementX * 1.6);
    }
  };

  // Interactive Drag & Release physics
  const getAngleFromPointer = (clientX: number, clientY: number): number => {
    if (!svgRef.current) return 0;
    const rect = svgRef.current.getBoundingClientRect();
    // In SVG viewBox (0 0 160 175), the pivot is at (80, 26)
    const pivotX = rect.left + rect.width * 0.5;
    const pivotY = rect.top + rect.height * (26 / 175);

    const dx = clientX - pivotX;
    const dy = clientY - pivotY;

    // Angle from downward vertical in degrees
    const rad = Math.atan2(dx, dy);
    const deg = (rad * 180) / Math.PI;

    // Clamp angle to realistic physical range
    return Math.max(-38, Math.min(38, deg));
  };

  const handlePointerDown = (e: PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    isDraggingRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };

    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture is not supported
    }

    const angle = getAngleFromPointer(e.clientX, e.clientY);
    angleRef.current = angle;
    lastDragAngleRef.current = angle;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
    setExtraRotation(angle);
  };

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;

    const angle = getAngleFromPointer(e.clientX, e.clientY);
    const now = performance.now();
    const dt = (now - lastDragTimeRef.current) / 1000;

    if (dt > 0.008) {
      // Track pointer velocity for realistic release impulse
      velocityRef.current = (angle - lastDragAngleRef.current) / dt;
      lastDragAngleRef.current = angle;
      lastDragTimeRef.current = now;
    }

    angleRef.current = angle;
    setExtraRotation(angle);
  };

  const handlePointerUp = (e: PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    // Check if it was a quick click rather than a drag
    if (dragStartPosRef.current) {
      const dist = Math.hypot(e.clientX - dragStartPosRef.current.x, e.clientY - dragStartPosRef.current.y);
      if (dist < 4) {
        // Playful tap/click impulse
        applyImpulse(angleRef.current >= 0 ? -65 : 65);
        return;
      }
    }

    // Smooth release with inherited inertia
    startPhysics();
  };

  return (
    <span
      className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-auto select-none"
      style={{
        width: "1.45em",
        height: "1.65em",
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 160 175"
        className="w-full h-full overflow-visible cursor-grab active:cursor-grabbing touch-none"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label="Also known as Shei - Interactive hanging badge"
      >
        <defs>
          <filter id="board-drop-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="rgba(20, 20, 19, 0.09)" />
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="rgba(20, 20, 19, 0.05)" />
          </filter>
        </defs>

        {/* The entire hanging assembly pivots smoothly around the dot of 'i' at (80, 26) */}
        <g
          style={{
            transformOrigin: "80px 26px",
            transform: `rotate(${extraRotation.toFixed(2)}deg)`,
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

          {/* The Hanging Sign Board (Tilted at -16 degrees) */}
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
