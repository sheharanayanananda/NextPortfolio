"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ProjectsShowcaseStatic from "./ProjectsShowcaseStatic";

const ProjectsShowcaseInteractive = dynamic(
  () => import("./ProjectsShowcaseInteractive"),
  { ssr: false }
);

export default function ProjectsShowcase() {
  const [loadInteractive, setLoadInteractive] = useState(false);

  useEffect(() => {
    // Priority 1: Direct hash navigation loads immediately
    if (
      typeof window !== "undefined" &&
      (window.location.hash.includes("projects") || window.location.hash.includes("craft"))
    ) {
      setLoadInteractive(true);
      return;
    }

    // Priority 2: Background eager load after hero renders without waiting for scroll
    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(
        () => setLoadInteractive(true),
        { timeout: 1500 }
      );
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setLoadInteractive(true), 200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="w-full">
      {loadInteractive ? (
        <ProjectsShowcaseInteractive />
      ) : (
        <ProjectsShowcaseStatic />
      )}
    </div>
  );
}
