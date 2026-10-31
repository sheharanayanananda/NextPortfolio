"use client";

import Image from "next/image";

export default function TreeBranches() {
  return (
    <>
      <style>{`
        /* 
          Natural Branch Pivot Physics:
          - Each branch pivots strictly from its stem anchor at the screen edge.
          - The base has 0px movement; the outer tips experience smooth, continuous swing.
          - Pure sine ease-in-out for calm, organic motion without unnatural warping or jerks.
        */
        @keyframes swayRightMain {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(2.2deg);
          }
        }

        @keyframes swayTopLeft {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-2.6deg);
          }
        }

        @keyframes swayTopRightCanopy {
          0%, 100% {
            transform: scaleX(-1) rotate(0deg);
          }
          50% {
            transform: scaleX(-1) rotate(2.2deg);
          }
        }

        @keyframes swayLowerRight {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-2deg);
          }
        }

        @keyframes swayLowerLeft {
          0%, 100% {
            transform: scaleX(-1) rotate(0deg);
          }
          50% {
            transform: scaleX(-1) rotate(2.2deg);
          }
        }

        .tree-branch-container {
          animation: swayRightMain 9s ease-in-out infinite;
          will-change: transform;
        }
        .tree-sprig-container {
          animation: swayTopLeft 8.5s ease-in-out infinite;
          will-change: transform;
        }
        .tree-canopy-container {
          animation: swayTopRightCanopy 10.5s ease-in-out infinite;
          will-change: transform;
        }
        .tree-lower-right-container {
          animation: swayLowerRight 10s ease-in-out infinite;
          will-change: transform;
        }
        .tree-lower-left-container {
          animation: swayLowerLeft 9.5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* 1. Top-Left Branchlet: delicate hanging conifer sprig with binocular double-vision blur */}
      <div
        aria-hidden="true"
        className="absolute -top-3 sm:-top-5 left-0 sm:left-4 md:left-8 lg:left-12 xl:left-16 pointer-events-none select-none z-[6] overflow-visible w-[120px] sm:w-[155px] md:w-[200px] lg:w-[245px] xl:w-[275px] max-w-[35vw]"
        style={{
          transformOrigin: "top left",
        }}
      >
        <div className="relative w-full h-auto tree-sprig-container">
          {/* Ghost Diplopia Layer */}
          <div className="absolute inset-0 pointer-events-none select-none translate-x-1.5 translate-y-1 sm:translate-x-2.5 sm:translate-y-1.5 md:translate-x-3 md:translate-y-2 opacity-50 blur-[6px] md:blur-[7.5px]">
            <Image
              src="/nordic_spruce_branchlet.webp"
              alt=""
              width={740}
              height={746}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
          {/* Primary Bokeh Layer */}
          <div className="relative pointer-events-none select-none opacity-80 blur-[4.5px] md:blur-[5.5px]">
            <Image
              src="/nordic_spruce_branchlet.webp"
              alt="Nordic Spruce Sprig"
              width={740}
              height={746}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Top-Right Canopy Whisps: high canopy needles entering from top edge framing above moon */}
      <div
        aria-hidden="true"
        className="absolute -top-4 sm:-top-6 right-24 sm:right-32 md:right-44 lg:right-60 xl:right-72 pointer-events-none select-none z-[4] overflow-visible w-[110px] sm:w-[140px] md:w-[180px] lg:w-[215px] opacity-65 blur-[4px] sm:blur-[5px]"
        style={{
          transformOrigin: "top right",
        }}
      >
        <div className="w-full h-auto tree-canopy-container">
          <Image
            src="/nordic_spruce_branchlet.webp"
            alt="Overhead Spruce Canopy"
            width={740}
            height={746}
            className="w-full h-auto object-contain pointer-events-none select-none"
          />
        </div>
      </div>

      {/* 3. Primary Mid-Right Bough: main Nordic spruce branch with human out-of-focus double vision */}
      <div
        aria-hidden="true"
        className="absolute -right-4 sm:-right-6 md:-right-8 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-36 pointer-events-none select-none z-[6] overflow-visible w-[220px] sm:w-[280px] md:w-[380px] lg:w-[460px] xl:w-[520px] 2xl:w-[580px] max-w-[55vw]"
        style={{
          transformOrigin: "100% 65%",
        }}
      >
        <div className="relative w-full h-auto tree-branch-container">
          {/* Ghost Diplopia Layer (Offset Disparity Contour) */}
          <div className="absolute inset-0 pointer-events-none select-none -translate-x-2.5 translate-y-1.5 sm:-translate-x-3.5 sm:translate-y-2 md:-translate-x-5 md:translate-y-2.5 opacity-55 blur-[7.5px] md:blur-[9.5px]">
            <Image
              src="/nordic_spruce_branch.webp"
              alt=""
              width={1085}
              height={542}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
          {/* Primary Bokeh Layer */}
          <div className="relative pointer-events-none select-none opacity-80 blur-[5.5px] sm:blur-[6.5px] md:blur-[7px]">
            <Image
              src="/nordic_spruce_branch.webp"
              alt="Nordic Spruce Tree Branch"
              width={1085}
              height={542}
              priority
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Lower-Right Transition Bough: unique descending Nordic spruce branch with double vision */}
      <div
        aria-hidden="true"
        className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-20 bottom-0 -mb-10 sm:-mb-14 md:-mb-18 lg:-mb-22 pointer-events-none select-none z-[6] overflow-visible w-[180px] sm:w-[230px] md:w-[300px] lg:w-[360px] xl:w-[400px]"
        style={{
          transformOrigin: "100% 50%",
        }}
      >
        <div className="relative w-full h-auto tree-lower-right-container">
          {/* Ghost Diplopia Layer */}
          <div className="absolute inset-0 pointer-events-none select-none -translate-x-2 translate-y-1 sm:-translate-x-3 sm:translate-y-1.5 md:-translate-x-4 md:translate-y-2 opacity-50 blur-[7px] sm:blur-[8.5px]">
            <Image
              src="/nordic_spruce_lower_branch.webp"
              alt=""
              width={1281}
              height={665}
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
          {/* Primary Bokeh Layer */}
          <div className="relative pointer-events-none select-none opacity-75 blur-[5px] sm:blur-[6.5px]">
            <Image
              src="/nordic_spruce_lower_branch.webp"
              alt="Lower-Right Nordic Spruce Transition Bough"
              width={1281}
              height={665}
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </div>

      {/* 5. Lower-Left Branch: solidly anchored off-screen on the left edge with double vision */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute -left-8 sm:-left-12 md:-left-16 bottom-4 sm:bottom-6 md:bottom-8 pointer-events-none select-none z-[6] overflow-visible w-[150px] sm:w-[190px] md:w-[240px] lg:w-[280px]"
        style={{
          transformOrigin: "0% 65%",
        }}
      >
        <div className="relative w-full h-auto tree-lower-left-container">
          {/* Ghost Diplopia Layer */}
          <div className="absolute inset-0 pointer-events-none select-none translate-x-2 translate-y-1.5 sm:translate-x-3 sm:translate-y-2 opacity-45 blur-[6.5px] md:blur-[8px]">
            <Image
              src="/nordic_spruce_branch.webp"
              alt=""
              width={1085}
              height={542}
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
          {/* Primary Bokeh Layer */}
          <div className="relative pointer-events-none select-none opacity-70 blur-[5px] md:blur-[6.5px]">
            <Image
              src="/nordic_spruce_branch.webp"
              alt="Lower-Left Nordic Spruce Branch"
              width={1085}
              height={542}
              className="w-full h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </>
  );
}
