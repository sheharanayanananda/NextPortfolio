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
        .tree-branch-container {
          animation: gentleBranchSway 12s ease-in-out infinite;
          will-change: transform;
        }
        .tree-sprig-container {
          animation: gentleSprigSway 14s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* Secondary smaller Nordic spruce branchlet on the left */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 sm:left-4 md:left-8 lg:left-12 xl:left-16 pointer-events-none select-none z-[6] overflow-visible w-[120px] sm:w-[155px] md:w-[200px] lg:w-[245px] xl:w-[280px] max-w-[35vw] opacity-90"
        style={{
          transformOrigin: "top left",
        }}
      >
        <div className="w-full h-auto tree-sprig-container">
          <Image
            src="/nordic_spruce_branchlet.webp"
            alt="Secondary Nordic Spruce Branchlet"
            width={740}
            height={746}
            priority
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(10,20,35,0.14)]"
          />
        </div>
      </div>

      {/* Primary larger Nordic spruce branch on the right */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 pointer-events-none select-none z-[6] overflow-visible w-[220px] sm:w-[280px] md:w-[380px] lg:w-[460px] xl:w-[520px] 2xl:w-[580px] max-w-[55vw]"
        style={{
          transformOrigin: "bottom right",
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
    </>
  );
}
