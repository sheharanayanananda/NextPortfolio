"use client";

import Image from "next/image";

export default function TreeBranches() {
  return (
    <>
      <style>{`
        @keyframes gentleBranchSway {
          0% {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
          33% {
            transform: rotate(0.9deg) translate3d(-2px, -3px, 0);
          }
          66% {
            transform: rotate(-0.6deg) translate3d(2px, 1px, 0);
          }
          100% {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
        }
        @keyframes gentleSprigSway {
          0% {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
          40% {
            transform: rotate(-1.1deg) translate3d(2px, -1px, 0);
          }
          75% {
            transform: rotate(0.8deg) translate3d(-1px, 2px, 0);
          }
          100% {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
        }
        @keyframes gentleCanopySway {
          0% {
            transform: scaleX(-1) rotate(0deg) translate3d(0, 0, 0);
          }
          35% {
            transform: scaleX(-1) rotate(1.2deg) translate3d(-2px, 2px, 0);
          }
          70% {
            transform: scaleX(-1) rotate(-0.7deg) translate3d(2px, -1px, 0);
          }
          100% {
            transform: scaleX(-1) rotate(0deg) translate3d(0, 0, 0);
          }
        }
        @keyframes gentleLowerRightSway {
          0% {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
          45% {
            transform: rotate(1deg) translate3d(-2px, -1px, 0);
          }
          80% {
            transform: rotate(-0.8deg) translate3d(1px, 2px, 0);
          }
          100% {
            transform: rotate(0deg) translate3d(0, 0, 0);
          }
        }
        @keyframes gentleLowerLeftSway {
          0% {
            transform: scaleX(-1) rotate(0deg) translate3d(0, 0, 0);
          }
          50% {
            transform: scaleX(-1) rotate(-1.2deg) translate3d(2px, -2px, 0);
          }
          100% {
            transform: scaleX(-1) rotate(0deg) translate3d(0, 0, 0);
          }
        }
        .tree-branch-container {
          animation: gentleBranchSway 12s ease-in-out infinite;
          will-change: transform;
        }
        .tree-sprig-container {
          animation: gentleSprigSway 14s ease-in-out infinite;
          will-change: transform;
        }
        .tree-canopy-container {
          animation: gentleCanopySway 16s ease-in-out infinite;
          will-change: transform;
        }
        .tree-lower-right-container {
          animation: gentleLowerRightSway 13s ease-in-out infinite;
          will-change: transform;
        }
        .tree-lower-left-container {
          animation: gentleLowerLeftSway 15s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* 1. Top-Left Branchlet: delicate hanging conifer sprig entering from top edge */}
      <div
        aria-hidden="true"
        className="absolute -top-3 sm:-top-5 left-0 sm:left-4 md:left-8 lg:left-12 xl:left-16 pointer-events-none select-none z-[6] overflow-visible w-[120px] sm:w-[155px] md:w-[200px] lg:w-[245px] xl:w-[275px] max-w-[35vw] opacity-90"
        style={{
          transformOrigin: "top left",
        }}
      >
        <div className="w-full h-auto tree-sprig-container">
          <Image
            src="/nordic_spruce_branchlet.webp"
            alt="Nordic Spruce Sprig"
            width={740}
            height={746}
            priority
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(10,20,35,0.14)]"
          />
        </div>
      </div>

      {/* 2. Top-Right Canopy Whisps: high canopy needles entering from top edge framing above moon */}
      <div
        aria-hidden="true"
        className="absolute -top-4 sm:-top-6 right-24 sm:right-32 md:right-44 lg:right-60 xl:right-72 pointer-events-none select-none z-[4] overflow-visible w-[110px] sm:w-[140px] md:w-[180px] lg:w-[215px] opacity-65 blur-[1.2px]"
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

      {/* 3. Primary Mid-Right Bough: main Nordic spruce branch in sharp focus entering from right edge */}
      <div
        aria-hidden="true"
        className="absolute -right-4 sm:-right-6 md:-right-8 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-36 pointer-events-none select-none z-[6] overflow-visible w-[220px] sm:w-[280px] md:w-[380px] lg:w-[460px] xl:w-[520px] 2xl:w-[580px] max-w-[55vw]"
        style={{
          transformOrigin: "100% 65%",
        }}
      >
        <div className="w-full h-auto tree-branch-container">
          <Image
            src="/nordic_spruce_branch.webp"
            alt="Nordic Spruce Tree Branch"
            width={1085}
            height={542}
            priority
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_12px_24px_rgba(10,20,35,0.18)]"
          />
        </div>
      </div>

      {/* 4. Lower-Right Transition Bough: unique descending Nordic spruce branch reaching into the Bio section */}
      <div
        aria-hidden="true"
        className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-20 bottom-0 -mb-10 sm:-mb-14 md:-mb-18 lg:-mb-22 pointer-events-none select-none z-[6] overflow-visible w-[180px] sm:w-[230px] md:w-[300px] lg:w-[360px] xl:w-[400px] opacity-80 blur-[0.6px]"
        style={{
          transformOrigin: "100% 50%",
        }}
      >
        <div className="w-full h-auto tree-lower-right-container">
          <Image
            src="/nordic_spruce_lower_branch.webp"
            alt="Lower-Right Nordic Spruce Transition Bough"
            width={1281}
            height={665}
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_10px_20px_rgba(10,20,35,0.12)]"
          />
        </div>
      </div>

      {/* 5. Lower-Left Branch: solidly anchored off-screen on the left edge, reaching into the scene */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute -left-8 sm:-left-12 md:-left-16 bottom-4 sm:bottom-6 md:bottom-8 pointer-events-none select-none z-[6] overflow-visible w-[150px] sm:w-[190px] md:w-[240px] lg:w-[280px] opacity-70 blur-[1px]"
        style={{
          transformOrigin: "0% 65%",
        }}
      >
        <div className="w-full h-auto tree-lower-left-container">
          <Image
            src="/nordic_spruce_branch.webp"
            alt="Lower-Left Nordic Spruce Branch"
            width={1085}
            height={542}
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_10px_20px_rgba(10,20,35,0.12)]"
          />
        </div>
      </div>
    </>
  );
}
