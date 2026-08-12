"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const SlateShowcase = dynamic(() => import("./SlateShowcase"), {
  ssr: false,
  loading: () => <SlateShowcaseSkeleton />,
});

function SlateShowcaseSkeleton() {
  return (
    <section id="projects-slate" className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-12 md:py-16 lg:py-12 relative">
      <div className="w-full lg:min-h-[400px] xl:min-h-[460px] bg-[#f5e6ce]/60 rounded-[32px] py-12 px-6 md:py-16 md:px-12 lg:py-25 lg:px-16 flex flex-col items-center justify-center relative overflow-hidden animate-pulse">
        <div className="h-6 w-32 bg-[#e2d2b8] rounded-md mb-4" />
        <div className="h-10 w-64 sm:w-80 bg-[#e2d2b8] rounded-xl mb-6" />
        <div className="h-4 w-48 bg-[#e2d2b8] rounded-md" />
      </div>
    </section>
  );
}

export default function SlateShowcaseLazy() {
  const [loadComponent, setLoadComponent] = useState(false);

  useEffect(() => {
    // Priority 1: Direct hash navigation loads immediately
    if (typeof window !== "undefined" && window.location.hash.includes("projects-slate")) {
      setLoadComponent(true);
      return;
    }

    // Priority 2: Background eager load after hero renders without waiting for scroll
    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(
        () => setLoadComponent(true),
        { timeout: 2000 }
      );
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setLoadComponent(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="w-full">
      {loadComponent ? <SlateShowcase /> : <SlateShowcaseSkeleton />}
    </div>
  );
}
