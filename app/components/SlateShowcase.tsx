'use client';

import React from 'react';

const butterflies = [
  { id: 1, left: "29.7%", top: "6.7%", width: "41.2%", floatX: "3px", floatY: "-5px", rot: "2deg", floatDur: "4.2s", flutterDur: "1.2s", delay: "0.2s" },
  { id: 2, left: "68.5%", top: "9.1%", width: "24.1%", floatX: "-4px", floatY: "6px", rot: "5deg", floatDur: "3.8s", flutterDur: "1.4s", delay: "0.7s" },
  { id: 3, left: "20.8%", top: "11.4%", width: "23.4%", floatX: "5px", floatY: "-3px", rot: "-4deg", floatDur: "4.5s", flutterDur: "1.1s", delay: "0.1s" },
  { id: 4, left: "57.9%", top: "14.9%", width: "14.9%", floatX: "-3px", floatY: "-6px", rot: "2deg", floatDur: "3.5s", flutterDur: "0.9s", delay: "0.5s" },
  { id: 5, left: "12.1%", top: "20.6%", width: "28.2%", floatX: "6px", floatY: "4px", rot: "-6deg", floatDur: "5.0s", flutterDur: "1.6s", delay: "0.3s" },
  { id: 6, left: "30.3%", top: "21.9%", width: "16.5%", floatX: "-2px", floatY: "-5px", rot: "3deg", floatDur: "4.1s", flutterDur: "1.3s", delay: "0.9s" },
  { id: 7, left: "68.4%", top: "22.9%", width: "16.1%", floatX: "4px", floatY: "3px", rot: "-2deg", floatDur: "3.9s", flutterDur: "1.5s", delay: "0.4s" },
  { id: 8, left: "31.5%", top: "35.7%", width: "14.9%", floatX: "-5px", floatY: "-4px", rot: "4deg", floatDur: "4.3s", flutterDur: "1.0s", delay: "0.6s" },
  { id: 9, left: "14.7%", top: "38.9%", width: "18.2%", floatX: "3px", floatY: "6px", rot: "-3deg", floatDur: "4.7s", flutterDur: "1.2s", delay: "1.1s" },
  { id: 10, left: "39.9%", top: "42.2%", width: "16.7%", floatX: "-4px", floatY: "-3px", rot: "1deg", floatDur: "3.6s", flutterDur: "0.8s", delay: "0.2s" },
  { id: 11, left: "53.9%", top: "42.6%", width: "32.2%", floatX: "5px", floatY: "5px", rot: "7deg", floatDur: "5.2s", flutterDur: "1.8s", delay: "0.8s" },
  { id: 12, left: "23.6%", top: "45.3%", width: "18.5%", floatX: "-3px", floatY: "-5px", rot: "-5deg", floatDur: "4.0s", flutterDur: "1.3s", delay: "0.5s" },
  { id: 13, left: "72.1%", top: "55.0%", width: "14.8%", floatX: "4px", floatY: "-4px", rot: "2deg", floatDur: "3.7s", flutterDur: "1.1s", delay: "1.3s" },
  { id: 14, left: "65.4%", top: "60.5%", width: "24.1%", floatX: "-5px", floatY: "5px", rot: "-6deg", floatDur: "4.6s", flutterDur: "1.5s", delay: "0.2s" },
  { id: 15, left: "11.2%", top: "66.9%", width: "11.2%", floatX: "3px", floatY: "-3px", rot: "4deg", floatDur: "3.4s", flutterDur: "0.9s", delay: "0.7s" },
  { id: 16, left: "58.6%", top: "70.6%", width: "23.3%", floatX: "-4px", floatY: "-6px", rot: "3deg", floatDur: "4.8s", flutterDur: "1.4s", delay: "0.4s" },
  { id: 17, left: "5.3%", top: "71.6%", width: "45.1%", floatX: "6px", floatY: "4px", rot: "-8deg", floatDur: "5.5s", flutterDur: "2.0s", delay: "1.0s" },
  { id: 18, left: "39.9%", top: "80.6%", width: "24.7%", floatX: "-3px", floatY: "5px", rot: "5deg", floatDur: "4.4s", flutterDur: "1.2s", delay: "0.3s" },
  { id: 19, left: "15.9%", top: "83.8%", width: "12.1%", floatX: "4px", floatY: "-5px", rot: "-3deg", floatDur: "3.9s", flutterDur: "1.0s", delay: "0.9s" },
  { id: 20, left: "27.0%", top: "87.5%", width: "13.9%", floatX: "-2px", floatY: "4px", rot: "2deg", floatDur: "3.6s", flutterDur: "1.1s", delay: "0.1s" }
];

export default function SlateShowcase() {
  return (
    <>
      {/* Dynamic styles for butterflies */}
      <style>{`
        @keyframes butterfly-flutter {
          0%, 20%, 40%, 60%, 100% {
            transform: perspective(300px) rotateY(0deg);
          }
          10%, 30%, 50% {
            transform: perspective(300px) rotateY(68deg);
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
        }
        .butterfly-flutter-image {
          animation: butterfly-flutter var(--flutter-dur, 1.4s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: center;
          will-change: transform;
        }
      `}</style>

      {/* FULL-SCREEN SLATE SHOWCASE */}
      <section id="projects-slate" className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12 md:pt-18 pb-0 relative">
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
            {/* <p className="text-sm text-[var(--text-charcoal)]/80 leading-relaxed font-sans-anthropic">
              An intelligent note-taking application designed for iOS, bridging 
              local-first markdown editing with advanced agentic AI capabilities.
            </p> */}
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
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] xl:max-w-[380px] aspect-[696/1024] mx-auto z-10 justify-self-center">
            {butterflies.map((b) => (
              <div
                key={b.id}
                className="absolute butterfly-float-container"
                style={{
                  left: b.left,
                  top: b.top,
                  width: b.width,
                  "--float-x": b.floatX,
                  "--float-y": b.floatY,
                  "--float-rot": b.rot,
                  "--float-dur": b.floatDur,
                  "--float-delay": b.delay,
                } as React.CSSProperties}
              >
                <div
                  className="w-full h-full butterfly-flutter-image"
                  style={{
                    "--flutter-dur": b.flutterDur,
                    "--flutter-delay": b.delay,
                  } as React.CSSProperties}
                >
                  <img
                    src={`/butterflies/butterfly_${b.id}.png`}
                    alt={`Butterfly ${b.id}`}
                    className="w-full h-auto object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
