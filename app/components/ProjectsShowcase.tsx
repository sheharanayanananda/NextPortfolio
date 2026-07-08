"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ProjectsShowcaseStatic from "./ProjectsShowcaseStatic";

const ProjectsShowcaseInteractive = dynamic(
  () => import("./ProjectsShowcaseInteractive"),
  { ssr: false }
);

export default function ProjectsShowcase() {
  const [loadInteractive, setLoadInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadInteractive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadInteractive(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px", // Preload 250px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loadInteractive]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setLoadInteractive(true)}
      onTouchStart={() => setLoadInteractive(true)}
      className="w-full"
    >
      {loadInteractive ? (
        <ProjectsShowcaseInteractive />
      ) : (
        <ProjectsShowcaseStatic />
      )}
    </div>
  );
}
