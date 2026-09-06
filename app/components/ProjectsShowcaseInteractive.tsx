"use client";

import { useState, useRef, useEffect } from "react";
import { Github, X } from "lucide-react";

export interface Project {
  title: string;
  category: string;
  heroTech: string[];
  tech: string[];
  description: string;
  longDescription?: string;
  repoStatus: "public" | "private" | "none";
  repoUrl?: string;
  link?: string;
  showcaseUrl?: string;
  badge?: string;
  badgeType?: "priority" | "archived" | "client" | "opensource";
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Slate Agentic",
    category: "Native iOS · GenUI",
    heroTech: ["SwiftUI", "SwiftData", "Ollama Cloud", "GenUI"],
    tech: ["Swift", "SwiftUI", "SwiftData", "Ollama Cloud API", "Generative UI", "WebKit (LaTeX)", "VisionKit", "iOS 17+"],
    description: "Intelligent notes app for iOS built with SwiftUI. Powered by cloud models from Ollama with token-by-token streaming and dynamic Generative UI (GenUI) widgets.",
    longDescription: "Slate Agentic is an intelligent iOS notes application engineered with SwiftUI and SwiftData. Features asynchronous URLSession streaming inference backed by cloud models from Ollama across six specialized personas. Dynamically constructs interactive Generative UI (GenUI) widgets directly in conversational threads, including live checksheets, structured data forms, and quick-action option grids. Active priority project under continuous iteration.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Slate/tree/v2",
    showcaseUrl: "/slate?v=agentic",
    badge: "Active Priority",
    badgeType: "priority",
    featured: true
  },
  {
    title: "UNiFY",
    category: "Mobile & Realtime · Sports",
    heroTech: ["Flutter", "Python / Flask", "WebSockets", "AWS"],
    tech: ["Flutter", "Dart", "Python", "Flask", "PostgreSQL", "WebSockets", "Redis", "AWS", "Stripe", "NFC"],
    description: "Contracted by a USA-based sports startup client. Powering NBA, WNBA, NFL, and NCAA fan communities with real-time live scoreboards, low-latency chat, and NFC wearables.",
    longDescription: "Contracted as mobile and backend developer for UNiFY, a USA-based sports client. Stepped into a crash-prone Flutter and Python/Flask codebase, resolved critical data mismatches, and brought the platform to production-ready stability. Engineered real-time WebSocket live scoreboards and instant chatrooms for thousands of concurrent fans, alongside NFC Baller Band wearables, push notifications, and secure Stripe payment processing on AWS.",
    repoStatus: "private",
    badge: "Client Platform",
    badgeType: "client",
    featured: true
  },
  {
    title: "Slate Origin",
    category: "Native iOS · Local-First",
    heroTech: ["SwiftUI", "SwiftData", "VisionKit", "Local-First"],
    tech: ["Swift", "SwiftUI", "SwiftData", "VisionKit", "PDFKit", "Local-First", "Apple Security", "iOS 17+"],
    description: "Local-first native iOS writing and note-taking environment with encrypted storage and on-device document scanning. (Archived · Legacy Foundation)",
    longDescription: "The foundational version of Slate built purely as a private, local-first native iOS writing environment. Implemented custom markdown formatting, biometric Apple Security authentication, PDF export, and VisionKit document scanning. Active development concluded after proving the architectural foundation, with development priority transferred completely to Slate Agentic.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Slate",
    showcaseUrl: "/slate?v=origin",
    badge: "Archived Foundation",
    badgeType: "archived",
    featured: true
  },
  {
    title: "ECore Web & Mobile Automation",
    category: "Logistics & Mobile Lead",
    heroTech: ["Flutter", "Laravel", "WebSockets", "MySQL"],
    tech: ["Flutter", "Dart", "PHP", "Laravel", "MySQL", "REST APIs", "WebSockets", "Livewire 3"],
    description: "Sole mobile lead for a Dutch logistics platform, giving field operators and managers live machinery tracking and workflow scheduling.",
    longDescription: "Served as sole mobile lead developing the Flutter mobile application from scratch for BetonStorten.nl in the Netherlands. Designed scheduling interfaces turning complex machinery, work order, and crew logistics into a clean interface. Integrated a real-time REST and WebSocket layer enabling live order tracking and equipment monitoring.",
    repoStatus: "private",
    badge: "Client Platform",
    badgeType: "client",
    featured: true
  },
  {
    title: "Deurbeslag Gigant",
    category: "Enterprise Full-Stack",
    heroTech: ["Laravel", "Livewire", "Meilisearch", "WooCommerce"],
    tech: ["PHP", "Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL", "Meilisearch", "WooCommerce API", "GLS API", "DHL API"],
    description: "Central inventory system for a Dutch hardware retailer, syncing 50,000+ products across 5+ WooCommerce stores and Bol.com without overselling.",
    longDescription: "Led the full-stack architecture refactor of Empire, a central inventory platform for a Dutch hardware retailer. Engineered robust REST integrations with the Bol.com API featuring rate limiting and retry logic to prevent overselling across 5+ WooCommerce stores and 50,000+ catalog items. Integrated Meilisearch for instant typo-tolerant product searches and automated warehouse fulfillment with GLS and DHL shipping labels.",
    repoStatus: "private",
    badge: "Client Platform",
    badgeType: "client",
    featured: true
  },
  {
    title: "BusinessLabels.nl (BBNL)",
    category: "B2B E-Commerce Frontend",
    heroTech: ["React", "Next.js", "Radix UI", "Laravel API"],
    tech: ["React", "Next.js", "Tailwind CSS", "Radix UI", "Laravel REST API", "Node.js", "PM2"],
    description: "High-performance B2B shopping platform for industrial printers and custom labels across 50,000+ product options.",
    longDescription: "Built responsive React components using Tailwind CSS and Radix UI directly from Figma specifications for a Dutch B2B label platform. Connected Next.js with a Laravel REST API across 50,000+ product combinations, resolved a critical checkout bug, and ensured continuous server uptime with PM2.",
    repoStatus: "private",
    badge: "Client Platform",
    badgeType: "client",
    featured: true
  },
  {
    title: "BAMC Website",
    category: "Client Web Portal",
    heroTech: ["JavaScript", "HTML5 / CSS3", "Responsive UX"],
    tech: ["HTML5", "CSS3", "JavaScript"],
    description: "Frontend website for Bright Achievers Migration Consultants, a Sri Lankan consultancy firm. Custom UI/UX, responsive layouts, and client inquiry forms.",
    longDescription: "Designed and built the official frontend website for Bright Achievers Migration Consultants (BAMC), a professional Sri Lankan consultancy firm. Focuses on custom responsive layouts, interactive migration consultation booking flows, and client inquiry forms. Developed with HTML5, CSS3, and JavaScript, publicly hosted as an open-source project.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/BAMC_Website",
    badge: "Open Source",
    badgeType: "opensource",
    featured: false
  },
  {
    title: "Notes - Android",
    category: "Native Android",
    heroTech: ["Kotlin", "Jetpack Compose", "Room DB", "Coroutines"],
    tech: ["Kotlin", "Jetpack Compose", "Room Database", "Coroutines", "Flow", "Material 3"],
    description: "Android note-taking app built with Jetpack Compose and Room Database. Clean MVVM architecture with an aesthetic, minimal UI.",
    longDescription: "A native Android note-taking application designed with Material Design 3 guidelines. Aura Notes leverages Jetpack Compose for declarative layouts, Room DB for local-first database persistence, and Kotlin Flow/Coroutines for asynchronous event processing. Features structured formatting, inline checks, and fast local search functions. The source code is public and open-source.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Notes",
    badge: "Open Source",
    badgeType: "opensource",
    featured: false
  },
  {
    title: "Malcolm Lismore Portfolio",
    category: "Dynamic CMS & Web",
    heroTech: ["PHP", "MySQL", "Tailwind CSS"],
    tech: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    description: "Full-stack responsive website with a PHP backend. Covers front-end design, server-side logic, and dynamic content delivery.",
    longDescription: "Designed and implemented a lightweight photographer portfolio system for professional photographers. Features a custom CMS admin panel to upload, organize, and serve high-resolution media galleries. Optimized for rendering performance and loading times through static file serving and MySQL queries. The source code is open-source and publicly hosted.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Malcolm-Lismore",
    badge: "Open Source",
    badgeType: "opensource",
    featured: false
  },
  {
    title: "Voice Assistant",
    category: "Desktop Systems",
    heroTech: ["C#", ".NET Framework", "Speech API"],
    tech: ["C#", ".NET Framework", "SQL", "Git"],
    description: "Desktop voice command app using .NET speech synthesis and recognition. Responds to natural language voice inputs with system actions.",
    longDescription: "Developed a native desktop voice command helper application using the .NET speech engines. Able to process spoken natural language prompts, match them against system commands, trigger OS operations, and respond with automated audio text-to-speech synthesis.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/Voice_Assistant",
    badge: "Open Source",
    badgeType: "opensource",
    featured: false
  },
  {
    title: "TaskFlow",
    category: "Web Productivity App",
    heroTech: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    tech: ["PHP", "Laravel", "MySQL", "Tailwind CSS"],
    description: "Modern task management web app with auth, CRUD, and full task organization by status, priority, due date, and category.",
    longDescription: "A full-stack collaborative tasks manager platform. Includes user registration and access controls, interactive task boards (Kanban-style categorization), prioritization weights, target deadlines, and category sorting. Developed with PHP Laravel on backend and MySQL.",
    repoStatus: "public",
    repoUrl: "https://github.com/sheharanayanananda/TaskFlow",
    badge: "Open Source",
    badgeType: "opensource",
    featured: false
  },
  {
    title: "Pubudhu Pharmacy System",
    category: "Desktop Enterprise",
    heroTech: ["C#", ".NET", "SQL Server", "POS"],
    tech: ["C#", ".NET Framework", "SQL Server", "Git"],
    description: "Custom desktop pharmacy inventory management system. Handles real-time stock levels, billing, and sales analytics.",
    longDescription: "Developed for a local retail pharmacy client. Built a desktop UI in C# using .NET Framework with an MS SQL Server database backend. Supports granular stock counts, batch tracking, automated expiry notifications, invoice billing, and end-of-day sales reports. The repository is private to protect proprietary client business layouts.",
    repoStatus: "private",
    badge: "Client Project",
    badgeType: "client",
    featured: false
  },
  {
    title: "Supermarket POS & Inventory",
    category: "Desktop Enterprise",
    heroTech: ["C#", ".NET", "SQL Server", "Multi-Terminal"],
    tech: ["C#", ".NET Framework", "SQL Server", "Git"],
    description: "A two-part desktop software suite (cashier POS + manager dashboard) sharing a single SQL database for real-time stock synchronization.",
    longDescription: "Engineered a high-performance retail solution. Divided into a cashier point-of-sale application for rapid barcode scanning and customer checkout, and a manager dashboard for bulk inventory intake and visual sales analytics. Both components sync in real time over a shared SQL database for instant stock accuracy. Closed source under client commercial agreement.",
    repoStatus: "private",
    badge: "Client Project",
    badgeType: "client",
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
    if (activeTab === "swift") return proj.tech.some(t => t.includes("Swift"));
    if (activeTab === "php") return proj.tech.some(t => t.includes("PHP") || t.includes("Laravel"));
    if (activeTab === "flutter") return proj.tech.some(t => t.includes("Flutter"));
    return false;
  });

  const tabOrder = ["featured", "swift", "flutter", "php", "all"];
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
            CRAFT
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
                : activeTab === "swift"
                ? "Native iOS & Swift Apps"
                : activeTab === "flutter"
                ? "Flutter Mobile Apps"
                : activeTab === "php"
                ? "PHP & Laravel Systems"
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
              { id: "featured", label: "Featured", mobileLabel: "Featured" },
              { id: "swift", label: "Swift", mobileLabel: "Swift" },
              { id: "flutter", label: "Flutter", mobileLabel: "Flutter" },
              { id: "php", label: "PHP", mobileLabel: "PHP" },
              { id: "all", label: "All Work", mobileLabel: "All" }
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

        {/* Center-Aligned Grid layout with motion transition */}
        <div 
          key={activeTab}
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8 max-w-7xl xl:max-w-[1400px] mx-auto justify-center ${
            direction === "right" ? "animate-slide-blur-right" : "animate-slide-blur-left"
          }`}
        >
          {filteredProjects.map((proj) => {
            const isClickable = proj.repoStatus !== "none";
            return (
              <div
                key={proj.title}
                onClick={() => {
                  if (isClickable) {
                    setSelectedProject(proj);
                  }
                }}
                className={`flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group ${
                  isClickable ? "cursor-pointer" : ""
                }`}
              >
                <div className="space-y-4">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                      {proj.category}
                    </span>
                    {proj.badge && (
                      <span className={`text-[10px] font-mono-anthropic uppercase tracking-wider ${
                        proj.badgeType === "priority"
                          ? "text-[var(--accent-rust)] font-bold"
                          : "text-[var(--text-secondary)]/70"
                      }`}>
                        {proj.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                    {proj.description}
                  </p>
                </div>

                {/* Footer: Clean middle-dot separated tech stack */}
                <div className="pt-6 font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                  {proj.heroTech.join(" \u00b7 ")}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity" 
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-3xl p-6 md:p-8 space-y-5 md:space-y-6 transition-transform animate-in fade-in zoom-in-95 duration-200"
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono-anthropic text-xs text-[var(--text-secondary)]/70 uppercase tracking-wider font-semibold">
                  {selectedProject.category}
                </span>
                <span className="text-[var(--border-light)] select-none">&middot;</span>
                {selectedProject.badge && (
                  <span className={`whitespace-nowrap text-[9px] tracking-wider font-mono-anthropic px-2.5 py-0.5 rounded-full uppercase font-semibold border ${
                    selectedProject.badgeType === "priority"
                      ? "bg-[var(--accent-rust)]/10 border-[var(--accent-rust)]/30 text-[var(--accent-rust)]"
                      : selectedProject.badgeType === "archived"
                      ? "bg-[var(--border-light)]/30 border-[var(--border-light)]/70 text-[var(--text-secondary)]"
                      : selectedProject.badgeType === "opensource"
                      ? "bg-[var(--accent-rust)]/5 border-[var(--accent-rust)]/25 text-[var(--accent-rust)]"
                      : "bg-[var(--text-secondary)]/5 border-[var(--text-secondary)]/25 text-[var(--text-secondary)]"
                  }`}>
                    {selectedProject.badge}
                  </span>
                )}
                <span className={`shrink-0 whitespace-nowrap text-[9px] tracking-wider font-mono-anthropic px-2.5 py-0.5 rounded-full uppercase font-medium border ${
                  selectedProject.repoStatus === "public"
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
            <div className="space-y-4 font-sans-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed max-h-[300px] overflow-y-auto">
              <p>{selectedProject.longDescription || selectedProject.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono-anthropic uppercase text-[var(--text-secondary)] font-semibold tracking-wider">
                Full Technology Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map(t => (
                  <span 
                    key={t} 
                    className="text-[10px] font-sans-anthropic bg-[var(--bg-warm)]/60 border border-[var(--border-light)]/50 px-2.5 py-0.5 rounded-full text-[var(--text-charcoal)]/80"
                  >
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
                    * Proprietary codebase protected under client agreement.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 ml-auto flex-wrap">
                {selectedProject.showcaseUrl && (
                  <a
                    href={selectedProject.showcaseUrl}
                    className="inline-flex items-center gap-1.5 border border-[var(--accent-rust)] text-[var(--accent-rust)] hover:bg-[var(--accent-rust)]/10 px-4 py-2.5 rounded-xl font-sans-anthropic font-semibold text-xs uppercase tracking-tight transition-colors"
                  >
                    <span>View Showcase</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
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
