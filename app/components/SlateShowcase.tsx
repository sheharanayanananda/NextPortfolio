'use client';

import React from 'react';

const butterflies = [
  { id: 1, left: "29.7%", top: "6.7%", width: "41.4%", angle: -3.67, cx: 50.15, cy: 41.59 },
  { id: 2, left: "68.5%", top: "9.1%", width: "24.3%", angle: 36.7, cx: 41.3, cy: 57.47 },
  { id: 3, left: "20.7%", top: "11.4%", width: "23.7%", angle: 31.82, cx: 42.63, cy: 55.52 },
  { id: 4, left: "57.9%", top: "14.9%", width: "15.1%", angle: 63.72, cx: 46.66, cy: 55.13 },
  { id: 5, left: "12.1%", top: "20.6%", width: "28.4%", angle: 40.98, cx: 41.05, cy: 54.16 },
  { id: 6, left: "30.3%", top: "21.9%", width: "16.7%", angle: -29.26, cx: 53.71, cy: 52.9 },
  { id: 7, left: "68.4%", top: "21.9%", width: "16.2%", angle: 13.52, cx: 49.89, cy: 52.84 },
  { id: 8, left: "31.5%", top: "35.7%", width: "15.1%", angle: 45.5, cx: 40.65, cy: 59.02 },
  { id: 9, left: "14.7%", top: "38.8%", width: "18.4%", angle: 20.9, cx: 46.38, cy: 51.15 },
  { id: 10, left: "39.9%", top: "42.2%", width: "16.8%", angle: -51.65, cx: 48.65, cy: 58.28 },
  { id: 11, left: "53.9%", top: "42.6%", width: "32.5%", angle: 28.78, cx: 42.54, cy: 51.19 },
  { id: 12, left: "23.6%", top: "45.3%", width: "18.7%", angle: -32.5, cx: 56.56, cy: 53.16 },
  { id: 13, left: "72.1%", top: "55.0%", width: "14.9%", angle: -28.25, cx: 56.16, cy: 54.46 },
  { id: 14, left: "65.4%", top: "60.5%", width: "24.3%", angle: 45.36, cx: 42.85, cy: 57.36 },
  { id: 15, left: "11.2%", top: "66.9%", width: "11.4%", angle: -53.75, cx: 55.0, cy: 54.93 },
  { id: 16, left: "58.6%", top: "70.6%", width: "23.4%", angle: 44.54, cx: 43.1, cy: 55.15 },
  { id: 17, left: "5.3%", top: "71.5%", width: "22.4%", angle: -16.17, cx: 56.67, cy: 54.13 },
  { id: 18, left: "25.4%", top: "72.0%", width: "25.1%", angle: 37.25, cx: 38.66, cy: 56.82 },
  { id: 19, left: "39.9%", top: "80.6%", width: "24.9%", angle: -27.46, cx: 55.25, cy: 53.75 },
  { id: 20, left: "15.8%", top: "83.8%", width: "12.4%", angle: 4.86, cx: 48.36, cy: 51.12 },
  { id: 21, left: "27.0%", top: "87.5%", width: "14.1%", angle: -21.05, cx: 52.98, cy: 53.07 }
];

export default function SlateShowcase() {
  return (
    <>
      {/* 3D Flapping Animations for Landed Butterflies */}
      <style>{`
        .butterfly-flat-container {
          pointer-events: none;
          will-change: transform;
        }
        .butterfly-wing-left,
        .butterfly-wing-right {
          animation-duration: var(--animation-duration);
          animation-delay: var(--animation-delay);
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Map behaviors to subclasses */
        .butterfly-flap-0 .butterfly-wing-left { animation-name: flap-basking-left; }
        .butterfly-flap-0 .butterfly-wing-right { animation-name: flap-basking-right; }

        .butterfly-flap-1 .butterfly-wing-left { animation-name: flap-quiver-left; }
        .butterfly-flap-1 .butterfly-wing-right { animation-name: flap-quiver-right; }

        .butterfly-flap-2 .butterfly-wing-left { animation-name: flap-rhythmic-left; }
        .butterfly-flap-2 .butterfly-wing-right { animation-name: flap-rhythmic-right; }

        .butterfly-flap-3 .butterfly-wing-left { animation-name: flap-closed-left; }
        .butterfly-flap-3 .butterfly-wing-right { animation-name: flap-closed-right; }

        /* Animation 0: Basking (mostly open, occasional slow deep fold) */
        @keyframes flap-basking-left {
          0%, 75%, 100% {
            transform: rotate(var(--angle)) rotateY(0deg) rotate(var(--neg-angle));
          }
          85% {
            transform: rotate(var(--angle)) rotateY(55deg) rotate(var(--neg-angle));
          }
          92% {
            transform: rotate(var(--angle)) rotateY(10deg) rotate(var(--neg-angle));
          }
        }
        @keyframes flap-basking-right {
          0%, 75%, 100% {
            transform: rotate(var(--angle)) rotateY(0deg) rotate(var(--neg-angle));
          }
          85% {
            transform: rotate(var(--angle)) rotateY(-55deg) rotate(var(--neg-angle));
          }
          92% {
            transform: rotate(var(--angle)) rotateY(-10deg) rotate(var(--neg-angle));
          }
        }

        /* Animation 1: Quivering (highly active/alert, quivers wings rapidly) */
        @keyframes flap-quiver-left {
          0%, 35%, 65%, 100% {
            transform: rotate(var(--angle)) rotateY(12deg) rotate(var(--neg-angle));
          }
          40%, 50%, 60% {
            transform: rotate(var(--angle)) rotateY(38deg) rotate(var(--neg-angle));
          }
          45%, 55% {
            transform: rotate(var(--angle)) rotateY(18deg) rotate(var(--neg-angle));
          }
        }
        @keyframes flap-quiver-right {
          0%, 35%, 65%, 100% {
            transform: rotate(var(--angle)) rotateY(-12deg) rotate(var(--neg-angle));
          }
          40%, 50%, 60% {
            transform: rotate(var(--angle)) rotateY(-38deg) rotate(var(--neg-angle));
          }
          45%, 55% {
            transform: rotate(var(--angle)) rotateY(-18deg) rotate(var(--neg-angle));
          }
        }

        /* Animation 2: Rhythmic Breathing (continuous calm breathing-like flapping) */
        @keyframes flap-rhythmic-left {
          0%, 100% {
            transform: rotate(var(--angle)) rotateY(2deg) rotate(var(--neg-angle));
          }
          50% {
            transform: rotate(var(--angle)) rotateY(42deg) rotate(var(--neg-angle));
          }
        }
        @keyframes flap-rhythmic-right {
          0%, 100% {
            transform: rotate(var(--angle)) rotateY(-2deg) rotate(var(--neg-angle));
          }
          50% {
            transform: rotate(var(--angle)) rotateY(-42deg) rotate(var(--neg-angle));
          }
        }

        /* Animation 3: Deep Resting (mostly folded closed, brief openings) */
        @keyframes flap-closed-left {
          0%, 15%, 85%, 100% {
            transform: rotate(var(--angle)) rotateY(72deg) rotate(var(--neg-angle));
          }
          45%, 55% {
            transform: rotate(var(--angle)) rotateY(8deg) rotate(var(--neg-angle));
          }
        }
        @keyframes flap-closed-right {
          0%, 15%, 85%, 100% {
            transform: rotate(var(--angle)) rotateY(-72deg) rotate(var(--neg-angle));
          }
          45%, 55% {
            transform: rotate(var(--angle)) rotateY(-8deg) rotate(var(--neg-angle));
          }
        }
      `}</style>

      {/* FULL-SCREEN SLATE SHOWCASE */}
      <section id="projects-slate" className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12 md:pt-18 pb-25 relative">
        <div className="w-full min-h-[calc(100vh-160px)] bg-[#f5e6ce] rounded-[32px] p-8 md:p-16 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-items-center relative overflow-hidden select-none">
          
          {/* Left Column — Editorial Info */}
          <div className="flex flex-col justify-center items-center text-center gap-5 z-10 max-w-md w-full">
            <h1 className="font-serif-anthropic text-6xl font-normal text-[var(--text-charcoal)] leading-[1.2]">
              Announcing <br />
              Slate App
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-[var(--text-charcoal)]/80 leading-relaxed font-serif-anthropic">
              Revolutionize the way you take notes
            </p>
            <div className="pt-4">
              <a
                href="/slate"
                className="flex items-center justify-center bg-black text-white hover:bg-black/90 px-5 py-3 rounded-lg font-sans-anthropic text-sm transition-all duration-200"
              >
                Explore Slate
              </a>
            </div>
          </div>

          {/* Right Column — Animated Butterflies "S" Shape */}
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] xl:max-w-[380px] aspect-[696/1024] mx-auto z-10 justify-self-center" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
            {butterflies.map((b) => {
              // Distribute behavior types randomly/sequentially
              const behaviorId = b.id % 4;
              
              // Unique duration and negative delay so they flap asynchronously
              const duration = (4.0 + (b.id % 5) * 1.5).toFixed(1);
              const delay = ((b.id % 7) * -1.8).toFixed(1);

              return (
                <div
                  key={b.id}
                  className={`absolute butterfly-flat-container butterfly-flap-${behaviorId}`}
                  style={{
                    left: b.left,
                    top: b.top,
                    width: b.width,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Left Wing (Relative to preserve sizing) */}
                  <div
                    className="relative w-full h-auto butterfly-wing-left"
                    style={{
                      clipPath: `polygon(0% 0%, ${b.cx}% 0%, ${b.cx}% 100%, 0% 100%)`,
                      transformOrigin: `${b.cx}% ${b.cy}%`,
                      ['--angle' as any]: `${b.angle}deg`,
                      ['--neg-angle' as any]: `${-b.angle}deg`,
                      ['--animation-duration' as any]: `${duration}s`,
                      ['--animation-delay' as any]: `${delay}s`,
                    }}
                  >
                    <img
                      src={`/butterflies_extracted/butterfly_${b.id}.png`}
                      alt={`Butterfly ${b.id} Left Wing`}
                      className="w-full h-auto object-contain pointer-events-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Right Wing (Absolute overlays left wing) */}
                  <div
                    className="absolute inset-0 w-full h-full butterfly-wing-right"
                    style={{
                      clipPath: `polygon(${b.cx}% 0%, 100% 0%, 100% 100%, ${b.cx}% 100%)`,
                      transformOrigin: `${b.cx}% ${b.cy}%`,
                      ['--angle' as any]: `${b.angle}deg`,
                      ['--neg-angle' as any]: `${-b.angle}deg`,
                      ['--animation-duration' as any]: `${duration}s`,
                      ['--animation-delay' as any]: `${delay}s`,
                    }}
                  >
                    <img
                      src={`/butterflies_extracted/butterfly_${b.id}.png`}
                      alt={`Butterfly ${b.id} Right Wing`}
                      className="w-full h-auto object-contain pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
