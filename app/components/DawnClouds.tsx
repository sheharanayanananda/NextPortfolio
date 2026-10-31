"use client";

import Image from "next/image";

export default function DawnClouds() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[2] overflow-hidden"
    >
      <style>{`
        @keyframes dawnDrift1 {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(24px, -12px, 0);
          }
        }
        @keyframes dawnDrift2 {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-20px, 10px, 0);
          }
        }
        @keyframes dawnDrift3 {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(18px, 8px, 0);
          }
        }
        .dawn-cloud-1 {
          animation: dawnDrift1 65s ease-in-out infinite;
          will-change: transform;
        }
        .dawn-cloud-2 {
          animation: dawnDrift2 80s ease-in-out infinite;
          will-change: transform;
        }
        .dawn-cloud-3 {
          animation: dawnDrift3 90s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* Cloud 1: Expansive Cirrus Uncinus (Mare's Tail) sweeping across the upper-left sky */}
      <div className="absolute -top-[2%] sm:top-[2%] md:top-[4%] -left-[10%] sm:-left-[4%] md:left-[2%] w-[520px] sm:w-[720px] md:w-[960px] lg:w-[1180px] xl:w-[1350px] max-w-[95vw] opacity-80 pointer-events-none select-none">
        <div className="w-full h-auto dawn-cloud-1">
          <Image
            src="/dawn_cloud_1.webp"
            alt="High-Altitude Dawn Cirrus Cloud"
            width={920}
            height={363}
            priority
            className="w-full h-auto object-contain pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Cloud 2: Vast Translucent Cirrostratus Dawn Veil enveloping the space around and behind the Moon */}
      <div className="absolute top-[2%] sm:top-[4%] md:top-[6%] -right-[15%] sm:-right-[8%] md:-right-[2%] lg:right-[2%] w-[560px] sm:w-[780px] md:w-[1020px] lg:w-[1260px] xl:w-[1450px] max-w-[95vw] opacity-75 pointer-events-none select-none">
        <div className="w-full h-auto dawn-cloud-2">
          <Image
            src="/dawn_cloud_2.webp"
            alt="Luminous Dawn Cirrostratus Veil"
            width={1091}
            height={348}
            priority
            className="w-full h-auto object-contain pointer-events-none select-none"
          />
        </div>
      </div>

      {/* Cloud 3: Wide Elongated Cirrus Fibratus Streamer spanning across the mid-sky horizon */}
      <div className="absolute top-[34%] sm:top-[36%] md:top-[38%] left-[5%] sm:left-[10%] md:left-[16%] w-[500px] sm:w-[700px] md:w-[920px] lg:w-[1140px] xl:w-[1300px] max-w-[90vw] opacity-65 pointer-events-none select-none">
        <div className="w-full h-auto dawn-cloud-3">
          <Image
            src="/dawn_cloud_3.webp"
            alt="Elongated High-Altitude Dawn Cirrus Streamer"
            width={961}
            height={201}
            className="w-full h-auto object-contain pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
}
