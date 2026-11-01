"use client";

import React from 'react';
import DuskMoon from './DuskMoon';
import FallingAsteroids from './FallingAsteroids';

export default function SlateShowcase() {
  return (
    <>
      {/* FULL-SCREEN SLATE SHOWCASE */}
      <section id="projects-slate" className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-12 md:py-16 lg:py-12 relative">
        <div className="w-full lg:min-h-[400px] xl:min-h-[460px] bg-[#749bd0] rounded-[32px] py-12 px-6 md:py-16 md:px-12 lg:py-25 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center justify-items-center relative overflow-hidden select-none">
          
          {/* Falling Asteroids / Shooting stars in sky background (Layer 2, z-[2]) */}
          <FallingAsteroids className="z-[2]" />

          {/* Left Column | Editorial Info */}
          <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-5 lg:gap-6 z-10 max-w-md lg:max-w-2xl w-full">
            <h1 className="font-serif-anthropic font-normal leading-[1.2] md:leading-[1.1] text-center text-[#faf9f5]">
              <span className="text-2xl md:text-3xl lg:text-4xl block mb-1.5 opacity-95">Announcing</span>
              <span className="text-4xl md:text-5xl lg:text-6xl block font-normal whitespace-nowrap">Slate Genesis</span>
            </h1>

            {/* Mobile/Tablet Real Dawn Moon (shown under heading, hidden on lg+) */}
            <div className="lg:hidden mx-auto z-[1] my-2 pointer-events-none flex items-center justify-center">
              <DuskMoon
                phase={0.76}
                angle={-45}
                opacity={0.72}
                className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
              />
            </div>

            <p className="text-sm md:text-base text-[#faf9f5]/90 leading-relaxed font-serif-anthropic">
              An intelligent notes app for iOS built on a hybrid block canvas, with 3 tuned AI tiers and emerging GenUI capabilities.
            </p>
            <div className="pt-2 md:pt-4">
              <a
                href="/slate?v=genesis"
                className="flex items-center justify-center bg-[#141413] text-[#faf9f5] hover:bg-[#141413]/85 px-5 py-3 rounded-xl font-sans-anthropic text-sm transition-all duration-200 shadow-sm"
              >
                Explore Slate
              </a>
            </div>
          </div>

          {/* Right Column | Real Dawn Moon (Desktop, hidden below lg) */}
          <div className="hidden lg:flex relative w-full items-center justify-center z-[1] pointer-events-none">
            <DuskMoon
              phase={0.76}
              angle={-45}
              opacity={0.72}
              className="w-[280px] h-[280px] xl:w-[320px] xl:h-[320px] 2xl:w-[350px] 2xl:h-[350px]"
            />
          </div>

        </div>
      </section>
    </>
  );
}
