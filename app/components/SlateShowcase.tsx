'use client';

import React from 'react';

const butterflies = [
  // TOP LOOP OF THE "S"
  { id: 1, assetId: 2, left: "14%", top: "21%", width: "24%", baseRot: 45, floatX: "3px", floatY: "-5px", floatRot: "2deg", floatDur: "4.2s", flutterDur: "7.2s", delay: "0.2s", flapType: "full" }, // Swallowtail
  { id: 2, assetId: 1, left: "21%", top: "11%", width: "19%", baseRot: 30, floatX: "-4px", floatY: "6px", floatRot: "4deg", floatDur: "3.8s", flutterDur: "8.5s", delay: "0.7s", flapType: "subtle" }, // Monarch
  { id: 3, assetId: 9, left: "30%", top: "21%", width: "13%", baseRot: 65, floatX: "5px", floatY: "-3px", floatRot: "-3deg", floatDur: "4.5s", flutterDur: "6.0s", delay: "0.1s", flapType: "subtle" }, // Death's-head
  { id: 4, assetId: 5, left: "35%", top: "5%", width: "34%", baseRot: 0, floatX: "-3px", floatY: "-6px", floatRot: "2deg", floatDur: "3.5s", flutterDur: "9.0s", delay: "0.5s", flapType: "slow" }, // Luna Moth
  { id: 5, assetId: 6, left: "57%", top: "15%", width: "14%", baseRot: 45, floatX: "6px", floatY: "4px", floatRot: "-5deg", floatDur: "5.0s", flutterDur: "6.8s", delay: "0.3s", flapType: "subtle" }, // Sulphur
  { id: 6, assetId: 11, left: "68%", top: "9%", width: "22%", baseRot: -45, floatX: "-2px", floatY: "-5px", floatRot: "3deg", floatDur: "4.1s", flutterDur: "7.5s", delay: "0.9s", flapType: "full" }, // Crimson Rose
  { id: 7, assetId: 10, left: "67%", top: "23%", width: "15%", baseRot: -30, floatX: "4px", floatY: "3px", floatRot: "-2deg", floatDur: "3.9s", flutterDur: "6.5s", delay: "0.4s", flapType: "subtle" }, // Rosy Maple

  // DIAGONAL MIDDLE OF THE "S"
  { id: 8, assetId: 13, left: "15%", top: "39%", width: "16%", baseRot: 15, floatX: "-5px", floatY: "-4px", floatRot: "3deg", floatDur: "4.3s", flutterDur: "8.2s", delay: "0.6s", flapType: "full" }, // Glasswing
  { id: 9, assetId: 15, left: "31%", top: "35%", width: "13%", baseRot: 40, floatX: "3px", floatY: "6px", floatRot: "-4deg", floatDur: "4.7s", flutterDur: "6.2s", delay: "1.1s", flapType: "subtle" }, // Emerald Swallowtail
  { id: 10, assetId: 3, left: "24%", top: "45%", width: "17%", baseRot: 25, floatX: "-4px", floatY: "-3px", floatRot: "2deg", floatDur: "3.6s", flutterDur: "7.2s", delay: "0.2s", flapType: "subtle" }, // Blue Morpho
  { id: 11, assetId: 11, left: "40%", top: "42%", width: "14%", baseRot: -60, floatX: "5px", floatY: "5px", floatRot: "6deg", floatDur: "5.2s", flutterDur: "6.9s", delay: "0.8s", flapType: "subtle" }, // Crimson Rose
  { id: 12, assetId: 15, left: "54%", top: "42%", width: "30%", baseRot: -20, floatX: "-3px", floatY: "-5px", floatRot: "-4deg", floatDur: "4.0s", flutterDur: "9.5s", delay: "0.5s", flapType: "slow" }, // Emerald Swallowtail

  // BOTTOM LOOP OF THE "S"
  { id: 13, assetId: 6, left: "72%", top: "54%", width: "13%", baseRot: 45, floatX: "4px", floatY: "-4px", floatRot: "2deg", floatDur: "3.7s", flutterDur: "6.4s", delay: "1.3s", flapType: "subtle" }, // Sulphur
  { id: 14, assetId: 4, left: "64%", top: "60%", width: "23%", baseRot: -45, floatX: "-5px", floatY: "5px", floatRot: "-5deg", floatDur: "4.6s", flutterDur: "7.8s", delay: "0.2s", flapType: "full" }, // Peacock
  { id: 15, assetId: 12, left: "58%", top: "70%", width: "22%", baseRot: -35, floatX: "3px", floatY: "-3px", floatRot: "4deg", floatDur: "3.4s", flutterDur: "8.5s", delay: "0.7s", flapType: "slow" }, // Purple Emperor
  { id: 16, assetId: 9, left: "12%", top: "66%", width: "10%", baseRot: 20, floatX: "-4px", floatY: "-6px", floatRot: "3deg", floatDur: "4.8s", flutterDur: "6.0s", delay: "0.4s", flapType: "subtle" }, // Death's-head
  { id: 17, assetId: 8, left: "6%", top: "71%", width: "21%", baseRot: -30, floatX: "6px", floatY: "4px", floatRot: "-6deg", floatDur: "5.5s", flutterDur: "7.6s", delay: "1.0s", flapType: "full" }, // Atlas Moth
  { id: 18, assetId: 6, left: "16%", top: "83%", width: "11%", baseRot: 25, floatX: "-3px", floatY: "5px", floatRot: "4deg", floatDur: "4.4s", flutterDur: "6.3s", delay: "0.3s", flapType: "subtle" }, // Sulphur
  { id: 19, assetId: 11, left: "26%", top: "87%", width: "12%", baseRot: -20, floatX: "4px", floatY: "-5px", floatRot: "-3deg", floatDur: "3.9s", flutterDur: "7.0s", delay: "0.9s", flapType: "subtle" }, // Crimson Rose
  { id: 20, assetId: 7, left: "25%", top: "73%", width: "23%", baseRot: 40, floatX: "-2px", floatY: "4px", floatRot: "3deg", floatDur: "3.6s", flutterDur: "8.8s", delay: "0.1s", flapType: "slow" }, // Sunset Moth
  { id: 21, assetId: 2, left: "40%", top: "80%", width: "24%", baseRot: 45, floatX: "2px", floatY: "3px", floatRot: "-2deg", floatDur: "4.0s", flutterDur: "8.2s", delay: "0.5s", flapType: "full" }, // Swallowtail
];

export default function SlateShowcase() {
  return (
    <>
      {/* Dynamic styles for butterflies */}
      <style>{`
        /* Subtle Flapping (Twitches and rests) */
        @keyframes flap-subtle-left {
          0%, 50%, 58%, 60%, 80%, 84%, 100% {
            transform: rotateY(0deg);
          }
          52% {
            transform: rotateY(28deg);
          }
          54% {
            transform: rotateY(8deg);
          }
          56% {
            transform: rotateY(32deg);
          }
          82% {
            transform: rotateY(24deg);
          }
        }
        @keyframes flap-subtle-right {
          0%, 50%, 58%, 60%, 80%, 84%, 100% {
            transform: rotateY(0deg);
          }
          52% {
            transform: rotateY(-28deg);
          }
          54% {
            transform: rotateY(-8deg);
          }
          56% {
            transform: rotateY(-32deg);
          }
          82% {
            transform: rotateY(-24deg);
          }
        }

        /* Full Flapping (Deep folds and rests) */
        @keyframes flap-full-left {
          0%, 40%, 58%, 60%, 100% {
            transform: rotateY(0deg);
          }
          43% {
            transform: rotateY(72deg);
          }
          46% {
            transform: rotateY(15deg);
          }
          49% {
            transform: rotateY(75deg);
          }
          52% {
            transform: rotateY(10deg);
          }
          55% {
            transform: rotateY(70deg);
          }
        }
        @keyframes flap-full-right {
          0%, 40%, 58%, 60%, 100% {
            transform: rotateY(0deg);
          }
          43% {
            transform: rotateY(-72deg);
          }
          46% {
            transform: rotateY(-15deg);
          }
          49% {
            transform: rotateY(-75deg);
          }
          52% {
            transform: rotateY(-10deg);
          }
          55% {
            transform: rotateY(-70deg);
          }
        }

        /* Slow Flapping (Gentle cycles) */
        @keyframes flap-slow-left {
          0%, 30%, 70%, 100% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(48deg);
          }
        }
        @keyframes flap-slow-right {
          0%, 30%, 70%, 100% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-48deg);
          }
        }

        /* Rapid Flapping (Constant vibration) */
        @keyframes flap-rapid-left {
          0%, 20%, 40%, 60%, 80%, 100% {
            transform: rotateY(0deg);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: rotateY(60deg);
          }
        }
        @keyframes flap-rapid-right {
          0%, 20%, 40%, 60%, 80%, 100% {
            transform: rotateY(0deg);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: rotateY(-60deg);
          }
        }

        @keyframes butterfly-float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(var(--float-x, 6px), var(--float-y, -10px)) rotate(var(--float-rot, 3deg));
          }
          50% {
            transform: translate(calc(var(--float-x, 6px) * -0.6), calc(var(--float-y, -10px) * 0.7)) rotate(calc(var(--float-rot, 3deg) * -1.2));
          }
          75% {
            transform: translate(calc(var(--float-x, 6px) * 0.8), calc(var(--float-y, -10px) * -0.5)) rotate(calc(var(--float-rot, 3deg) * 0.8));
          }
        }

        .butterfly-float-container {
          animation: butterfly-float var(--float-dur, 5s) ease-in-out infinite var(--float-delay, 0s);
          will-change: transform;
          transform-style: preserve-3d;
        }

        /* Left Wing Classes */
        .butterfly-wing-left.subtle {
          animation: flap-subtle-left var(--flutter-dur, 8s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: right center;
          will-change: transform;
        }
        .butterfly-wing-left.full {
          animation: flap-full-left var(--flutter-dur, 10s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: right center;
          will-change: transform;
        }
        .butterfly-wing-left.slow {
          animation: flap-slow-left var(--flutter-dur, 12s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: right center;
          will-change: transform;
        }
        .butterfly-wing-left.rapid {
          animation: flap-rapid-left var(--flutter-dur, 1.8s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: right center;
          will-change: transform;
        }

        /* Right Wing Classes */
        .butterfly-wing-right.subtle {
          animation: flap-subtle-right var(--flutter-dur, 8s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: left center;
          will-change: transform;
        }
        .butterfly-wing-right.full {
          animation: flap-full-right var(--flutter-dur, 10s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: left center;
          will-change: transform;
        }
        .butterfly-wing-right.slow {
          animation: flap-slow-right var(--flutter-dur, 12s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: left center;
          will-change: transform;
        }
        .butterfly-wing-right.rapid {
          animation: flap-rapid-right var(--flutter-dur, 1.8s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: left center;
          will-change: transform;
        }
      `}</style>

      {/* FULL-SCREEN SLATE SHOWCASE */}
      <section id="projects-slate" className="w-full py-40 flex flex-col items-center">
        <div className="w-[80%] bg-[#f5e6ce] rounded-3xl p-15 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-items-center relative overflow-hidden select-none">
          
          {/* Left Column — Editorial Info */}
          <div className="flex flex-col justify-center items-center text-center gap-10 z-10 w-full">
            <h1 className="font-serif-anthropic text-6xl font-normal text-[var(--text-charcoal)] leading-[1.2]">
              Announcing <br />
              Slate Agentic
            </h1>
            <p className="text-lg text-[var(--text-charcoal)]/80 leading-relaxed font-serif-anthropic">
              Revolutionize the way you take notes
            </p>
            {/* <p className="text-sm text-[var(--text-charcoal)]/80 leading-relaxed font-sans-anthropic">
              An intelligent note-taking application designed for iOS, bridging 
              local-first markdown editing with advanced agentic AI capabilities.
            </p> */}
            <div className="pt-4">
              <a
                href="/slate"
                className="flex items-center justify-center bg-black text-white hover:bg-black/90 px-5 py-3 rounded-lg font-sans-anthropic transition-all duration-200"
              >
                Explore Slate
              </a>
            </div>
          </div>

          {/* Right Column — Animated Butterflies "S" Shape */}
          <div className="relative w-full max-w-[500px] aspect-[696/1024] mx-auto z-10 justify-self-center">
            {butterflies.map((b) => {
              const assetPath = `/butterflies/butterfly_${b.assetId}.png`;
              
              return (
                <div
                  key={b.id}
                  className="absolute butterfly-float-container"
                  style={{
                    left: b.left,
                    top: b.top,
                    width: b.width,
                    "--float-x": b.floatX,
                    "--float-y": b.floatY,
                    "--float-rot": b.floatRot,
                    "--float-dur": b.floatDur,
                    "--float-delay": b.delay,
                  } as React.CSSProperties}
                >
                  <div 
                    className="relative w-full aspect-square flex items-center justify-center" 
                    style={{ 
                      perspective: "1000px", 
                      transformStyle: "preserve-3d",
                      transform: `rotate(${b.baseRot}deg)`
                    }}
                  >
                    {/* Left Wing Container */}
                    <div 
                      className={`absolute right-1/2 top-0 bottom-0 w-1/2 overflow-hidden butterfly-wing-left ${b.flapType}`}
                      style={{
                        "--flutter-dur": b.flutterDur,
                        "--flutter-delay": b.delay,
                      } as React.CSSProperties}
                    >
                      <img
                        src={assetPath}
                        alt={`Butterfly ${b.id} Left Wing`}
                        className="absolute top-0 left-0 w-[200%] max-w-none h-full object-contain pointer-events-none"
                        loading="lazy"
                      />
                    </div>

                    {/* Right Wing Container */}
                    <div 
                      className={`absolute left-1/2 top-0 bottom-0 w-1/2 overflow-hidden butterfly-wing-right ${b.flapType}`}
                      style={{
                        "--flutter-dur": b.flutterDur,
                        "--flutter-delay": b.delay,
                      } as React.CSSProperties}
                    >
                      <img
                        src={assetPath}
                        alt={`Butterfly ${b.id} Right Wing`}
                        className="absolute top-0 left-[-100%] w-[200%] max-w-none h-full object-contain pointer-events-none"
                        loading="lazy"
                      />
                    </div>
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
