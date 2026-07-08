"use client";

import { useState, useRef, useEffect } from "react";
import { Github, X } from "lucide-react";

export interface Project {
  title: string;
  tech: string[];
  description: string;
  longDescription?: string;
  repoStatus: "public" | "private" | "none";
  repoUrl?: string;
  link?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "UNiFY",
    tech: ["Flutter", "Dart", "Python", "Flask", "PostgreSQL", "WebSockets", "Redis", "AWS", "Stripe", "NFC"],
    description: "Backend and Mobile engineer for a multi-platform sports app (NBA, WNBA, NFL, NCAA). Refactored key modules, built real-time WebSocket messaging and scores, and integrated NFC 'Baller Band' support.",
    longDescription: "Collaborated on building a real-time sports ecosystem supporting a massive US fanbase across multiple sports. Focused on implementing low-latency features including live score boards and chatrooms via WebSockets, refactoring modular components in Flutter, and developing REST APIs using Flask. High-volume database workflows were optimized using PostgreSQL and Redis caching. Source code is restricted under commercial IP protections.",
    repoStatus: "private",
    featured: true
  },
  {
    title: "Deurbeslag Gigant",
    tech: ["PHP", "Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL"],
    description: "Centralized e-commerce inventory and order management system for a Dutch retail platform. Automated legacy workflows, synchronized real-time stocks across external APIs, and designed filament-driven V2 interfaces.",
    longDescription: "As the lead developer, I refactored the core logistics and inventory tracking system of a large Dutch e-commerce storefront. The platform integrates with external vendor shipping APIs and local retail inventory networks, automating processes that previously required hours of manual labor. Built entirely on Laravel with Livewire and Filament panels to manage high-throughput operations. The source code is commercial IP and closed for proprietary protection.",
    repoStatus: "private",
    featured: true
  },
  {
    title: "ECore Web & Mobile Automation",
    tech: ["PHP", "Laravel", "Flutter", "Dart", "MySQL", "REST APIs"],
    description: "Enterprise system for BetonStorten.nl automating concrete order logistics, heavy machinery, work orders, and personnel planning with custom algorithmic tracking and real-time syncing.",
    longDescription: "An end-to-end automation application handling logistics, driver routing, concrete volume calculations, and personnel workflow schedules. Built the core web portals using Laravel and matching mobile components in Flutter to support remote transit tracking. To safeguard intellectual property, the active repository remains set to private status.",
    repoStatus: "private",
    featured: true
  },
  {
    title: "BAMC Website",
    tech: ["HTML5", "CSS3", "JavaScript"],
    description: "Frontend website for Bright Achievers Migration Consultants, a real Sri Lankan consultancy firm. Custom UI/UX, responsive design, and client inquiry forms.",
    longDescription: "Designed and built the official frontend website for Bright Achievers Migration Consultants (BAMC), a professional Sri Lankan consultancy firm. Focuses on custom responsive layouts, interactive migration consultation booking flows, and client inquiry forms. Developed with HTML5, CSS3, and JavaScript, publicly hosted as an open-source project.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/BAMC_Website",
    featured: false
  },
  {
    title: "Notes - Android",
    tech: ["Kotlin", "Jetpack Compose", "Room Database", "Coroutines", "Flow", "Material 3"],
    description: "Android note-taking app built with Jetpack Compose and Room Database. Clean MVVM architecture with an aesthetic, minimal UI.",
    longDescription: "A native Android note-taking application designed with Material Design 3 guidelines. Aura Notes leverages Jetpack Compose for declarative layouts, Room DB for local-first database persistence, and Kotlin Flow/Coroutines for asynchronous event processing. Features structured formatting, inline checks, and lightning-fast local search functions. The source code is public and open-source.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Notes",
    featured: false
  },
  {
    title: "Malcolm Lismore Portfolio",
    tech: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    description: "Full-stack responsive website with a PHP backend. Covers front-end design, server-side logic, and dynamic content delivery.",
    longDescription: "Designed and implemented a lightweight photographer portfolio system for professional photographers. Features a custom CMS admin panel to upload, organize, and serve high-resolution media galleries. Optimized for rendering performance and loading times through static file serving and MySQL queries. The source code is open-source and publicly hosted.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Malcolm-Lismore",
    featured: false
  },
  {
    title: "Voice Assistant",
    tech: ["C#", ".NET Framework", "SQL", "Git"],
    description: "Desktop voice command app using .NET speech synthesis and recognition. Responds to natural language voice inputs with system actions.",
    longDescription: "Developed a native desktop voice command helper application using the .NET speech engines. Able to process spoken natural language prompts, match them against system commands, trigger OS operations, and respond with automated audio text-to-speech synthesis.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Voice_Assistant",
    featured: false
  },
  {
    title: "TaskFlow",
    tech: ["PHP", "Laravel", "MySQL", "Tailwind CSS"],
    description: "Modern task management web app with auth, CRUD, and full task organization by status, priority, due date, and category.",
    longDescription: "A full-stack collaborative tasks manager platform. Includes user registration and access controls, interactive task boards (Kanban-style categorization), prioritization weights, target deadlines, and category sorting. Developed with PHP Laravel on backend and MySQL.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/TaskFlow",
    featured: false
  },
  {
    title: "Pubudhu Pharmacy System",
    tech: ["C#", ".NET Framework", "SQL Server", "Git"],
    description: "Custom desktop pharmacy inventory management system. Handles real-time stock levels, billing, and sales analytics.",
    longDescription: "Developed for a local retail pharmacy client. Built a desktop UI in C# using .NET Framework with an MS SQL Server database backend. Supports granular stock counts, batch tracking, automated expiry notifications, invoice billing, and end-of-day sales reports. The repository is private to protect proprietary client business layouts.",
    repoStatus: "private",
    featured: false
  },
  {
    title: "Supermarket POS & Inventory",
    tech: ["C#", ".NET Framework", "SQL Server", "Git"],
    description: "A two-part desktop software suite (cashier POS + manager dashboard) sharing a single SQL database for real-time stock synchronization.",
    longDescription: "Engineered a high-performance retail solution. Divided into a cashier point-of-sale application for rapid barcode scanning and customer checkout, and a manager dashboard for bulk inventory intake and visual sales analytics. Both components sync in real time over a shared SQL database for instant stock accuracy. Closed source under client commercial agreement.",
    repoStatus: "private",
    featured: false
  }
];

export default function ProjectsShowcaseInteractive() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("featured");
  const [prevTab, setPrevTab] = useState<string>("featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !tabsContainerRef.current) return;

    const container = tabsContainerRef.current;
    const updateActiveRect = () => {
      const activeEl = container.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        setActiveRect({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    };

    updateActiveRect();

    const observer = new ResizeObserver(updateActiveRect);
    observer.observe(container);
    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => observer.observe(btn));

    return () => observer.disconnect();
  }, [activeTab, mounted]);

  const filteredProjects = projects.filter(proj => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return proj.featured;
    if (activeTab === "laravel") return proj.tech.includes("Laravel") || proj.tech.includes("PHP");
    if (activeTab === "flutter") return proj.tech.includes("Flutter");
    return false;
  });

  const tabOrder = ["all", "featured", "laravel", "flutter"];
  const getDirection = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const prevIndex = tabOrder.indexOf(prevTab);
    return currentIndex >= prevIndex ? "right" : "left";
  };
  const direction = getDirection();

  return (
    <>
      <section id="projects" className="py-16 md:py-0 md:pt-24 space-y-12 scroll-mt-[69px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-10 text-center max-w-3xl mx-auto">
          <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
            Proudly
          </h2>
          <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
            SELECTED WORKS
          </div>
        </div>

        {/* Subheading & Filter Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12">
          <div className="hidden md:flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">
              {activeTab === "featured"
                ? "Featured Deployments"
                : activeTab === "laravel"
                ? "PHP & Laravel Systems"
                : activeTab === "flutter"
                ? "Flutter Mobile Apps"
                : "Curated Applications"}
            </h3>
          </div>

          {/* Filter switcher capsule */}
          <div 
            ref={tabsContainerRef}
            className="relative flex items-center gap-0.5 sm:gap-1 border border-[var(--border-light)] p-1 rounded-full bg-[var(--card-bg)]"
          >
            {/* Sliding Background Pill */}
            <div 
              className="absolute top-1 bottom-1 bg-[var(--accent-rust)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                left: `${activeRect.left}px`,
                width: `${activeRect.width}px`
              }}
            />
            {[
              { id: "all", label: "All Work", mobileLabel: "All" },
              { id: "featured", label: "Featured", mobileLabel: "Featured" },
              { id: "laravel", label: "Laravel/PHP", mobileLabel: "Laravel" },
              { id: "flutter", label: "Flutter", mobileLabel: "Flutter" }
            ].map(tab => (
              <button
                key={tab.id}
                data-active={activeTab === tab.id}
                onClick={() => {
                  setPrevTab(activeTab);
                  setActiveTab(tab.id);
                }}
                className={`relative z-10 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-sans-anthropic font-semibold text-xs transition-colors duration-300 ${
                  activeTab === tab.id
                    ? "text-[var(--bg-warm)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline sm:hidden">{tab.mobileLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid layout with motion blur transition */}
        <div 
          key={activeTab}
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${
            direction === "right" ? "animate-slide-blur-right" : "animate-slide-blur-left"
          }`}
        >
          {filteredProjects.map(proj => {
            const isClickable = proj.repoStatus !== "none";
            return (
              <div
                key={proj.title}
                onClick={() => {
                  if (isClickable) {
                    setSelectedProject(proj);
                  }
                }}
                className={`group flex flex-col justify-between border border-[var(--border-light)]/40 rounded-3xl p-6 md:p-8 lg:p-10 bg-[var(--card-bg)] transition-all duration-300 ease-out space-y-8 ${isClickable
                    ? "cursor-pointer hover:bg-[var(--card-hover-bg)] hover:border-[var(--text-secondary)]/60 hover:-translate-y-1"
                    : ""
                  }`}
              >
                <div className="space-y-5">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      {proj.title}
                    </h4>
                    <span className={`shrink-0 whitespace-nowrap text-[9px] tracking-wider font-mono-anthropic px-2.5 py-0.5 rounded-full uppercase font-medium border ${proj.repoStatus === "public"
                        ? "bg-[var(--accent-rust)]/5 border-[var(--accent-rust)]/30 text-[var(--accent-rust)]"
                        : proj.repoStatus === "private"
                          ? "bg-[var(--text-secondary)]/5 border-[var(--text-secondary)]/30 text-[var(--text-secondary)]"
                          : "bg-[var(--border-light)]/10 border-[var(--border-light)]/50 text-[var(--text-secondary)]"
                      }`}>
                      {proj.repoStatus === "public"
                        ? "Public"
                        : proj.repoStatus === "private"
                          ? "Private"
                          : "Proprietary"}
                    </span>
                  </div>

                  <p className="text-base text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5 w-full">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[10px] font-sans-anthropic bg-[var(--bg-warm)]/40 border border-[var(--border-light)]/30 px-2.5 py-0.5 rounded-full text-[var(--text-secondary)] transition-colors group-hover:bg-[var(--card-bg)] group-hover:border-[var(--border-light)]/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setSelectedProject(null)}>
          <div
            className="relative w-full max-w-2xl bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6 transition-transform animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl border border-[var(--border-light)] hover:bg-[var(--card-hover-bg)] text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-12">
              <div className="flex items-center gap-3">
                <span className={`shrink-0 whitespace-nowrap text-[9px] tracking-wider font-mono-anthropic px-2.5 py-0.5 rounded-full uppercase font-medium border ${selectedProject.repoStatus === "public"
                    ? "bg-[var(--accent-rust)]/5 border-[var(--accent-rust)]/30 text-[var(--accent-rust)]"
                    : "bg-[var(--text-secondary)]/5 border-[var(--text-secondary)]/30 text-[var(--text-secondary)]"
                  }`}>
                  {selectedProject.repoStatus === "public" ? "Public" : "Private"}
                </span>
              </div>
              <h3 className="font-serif-anthropic text-3xl md:text-4xl font-medium text-[var(--text-charcoal)]">
                {selectedProject.title}
              </h3>
            </div>

            {/* Detailed Description */}
            <div className="space-y-4 font-sans-anthropic text-base text-[var(--text-secondary)] leading-relaxed max-h-[300px] overflow-y-auto">
              <p>{selectedProject.longDescription || selectedProject.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono-anthropic uppercase text-[var(--text-secondary)]">Technologies Used</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map(t => (
                  <span key={t} className="text-[10px] font-sans-anthropic bg-[var(--bg-warm)]/40 border border-[var(--border-light)]/30 px-2.5 py-0.5 rounded-full text-[var(--text-secondary)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[var(--border-light)]/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                {selectedProject.repoStatus === "private" && (
                  <p className="text-xs text-[var(--text-secondary)] italic">
                    * This repository is private to protect proprietary codebase/IP.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl border border-[var(--border-light)] text-sm font-sans-anthropic font-semibold uppercase tracking-tight hover:bg-[var(--card-hover-bg)] transition-colors"
                >
                  Close
                </button>
                {selectedProject.repoStatus === "public" ? (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[var(--accent-rust)] text-[var(--bg-warm)] hover:bg-[var(--accent-rust-hover)] px-5 py-2.5 rounded-xl font-sans-anthropic font-semibold text-xs tracking-[-0.08px] uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]/40 border border-[var(--border-light)] px-5 py-2.5 rounded-xl font-sans-anthropic font-semibold text-xs uppercase tracking-tight cursor-not-allowed"
                  >
                    Private Repository
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
