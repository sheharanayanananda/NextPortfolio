'use client';

import React from 'react';

const butterflies = [
  { id: 1, left: "29.7%", top: "6.7%", width: "41.4%" },
  { id: 2, left: "68.5%", top: "9.1%", width: "24.3%" },
  { id: 3, left: "20.7%", top: "11.4%", width: "23.7%" },
  { id: 4, left: "57.9%", top: "14.9%", width: "15.1%" },
  { id: 5, left: "12.1%", top: "20.6%", width: "28.4%" },
  { id: 6, left: "30.3%", top: "21.9%", width: "16.7%" },
  { id: 7, left: "68.4%", top: "21.9%", width: "16.2%" },
  { id: 8, left: "31.5%", top: "35.7%", width: "15.1%" },
  { id: 9, left: "14.7%", top: "38.8%", width: "18.4%" },
  { id: 10, left: "39.9%", top: "42.2%", width: "16.8%" },
  { id: 11, left: "53.9%", top: "42.6%", width: "32.5%" },
  { id: 12, left: "23.6%", top: "45.3%", width: "18.7%" },
  { id: 13, left: "72.1%", top: "55.0%", width: "14.9%" },
  { id: 14, left: "65.4%", top: "60.5%", width: "24.3%" },
  { id: 15, left: "11.2%", top: "66.9%", width: "11.4%" },
  { id: 16, left: "58.6%", top: "70.6%", width: "23.4%" },
  { id: 17, left: "5.3%", top: "71.5%", width: "22.4%" },
  { id: 18, left: "25.4%", top: "72.0%", width: "25.1%" },
  { id: 19, left: "39.9%", top: "80.6%", width: "24.9%" },
  { id: 20, left: "15.8%", top: "83.8%", width: "12.4%" },
  { id: 21, left: "27.0%", top: "87.5%", width: "14.1%" },
];

export default function SlateShowcase() {
  return (
    <>
      {/* Flat styles for static butterflies */}
      <style>{`
        .butterfly-flat-container {
          pointer-events: none;
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
                className="absolute butterfly-flat-container"
                style={{
                  left: b.left,
                  top: b.top,
                  width: b.width,
                }}
              >
                <img
                  src={`/butterflies/butterfly_${b.id}.png`}
                  alt={`Butterfly ${b.id}`}
                  className="w-full h-auto object-contain pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
