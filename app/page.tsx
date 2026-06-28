"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Custom type for Slate V2 Presets
interface Preset {
  name: string;
  description: string;
  contextSize: string;
  temp: number;
  prompt: string;
}

// Custom type for projects
interface Project {
  title: string;
  role: string;
  tech: string[];
  description: string;
  link?: string;
  featured?: boolean;
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeSlatePreset, setActiveSlatePreset] = useState<number>(0);

  // Slate V2 presets for the interactive preset viewer
  const slatePresets: Preset[] = [
    {
      name: "Balanced Assistant",
      description: "Optimized for general reasoning and daily note synthesis.",
      contextSize: "8k tokens",
      temp: 0.7,
      prompt: "Synthesize the highlights of today's lecture on Data Structures, focusing on binary search tree runtimes."
    },
    {
      name: "Deep Reasoning",
      description: "Maximum context window and precision logic parsing.",
      contextSize: "32k tokens",
      temp: 0.2,
      prompt: "Analyze these 5 PDF research papers regarding actor-isolated state machines and compile a unified memory model."
    },
    {
      name: "Creative Drafts",
      description: "High temperature settings for brainstorming UI flows.",
      contextSize: "8k tokens",
      temp: 0.9,
      prompt: "Brainstorm 5 alternative micro-interactions for a physics-based slider that responds to haptic feedback."
    },
    {
      name: "Quick Fixes",
      description: "Low latency preset for code styling and syntax corrections.",
      contextSize: "4k tokens",
      temp: 0.3,
      prompt: "Refactor this SwiftUI view to prevent layout jumps in iOS 17 when editing non-text blocks."
    }
  ];

  // Theme application logic
  useEffect(() => {
    // Initial theme load
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      Promise.resolve().then(() => {
        setTheme(savedTheme);
      });
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (currentTheme: "light" | "dark" | "system") => {
      if (currentTheme === "system") {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (systemPrefersDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      } else if (currentTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    // Watch for system theme changes if on system setting
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Project List
  const projects: Project[] = [
    {
      title: "UNiFY Sports Ecosystem",
      role: "Freelance Software Engineer",
      tech: ["Flutter", "Dart", "Python", "Flask", "PostgreSQL", "WebSockets", "Redis"],
      description: "Backend and Mobile engineer for a multi-platform sports app (NBA, WNBA, NFL, NCAA). Refactored key modules, built real-time WebSocket messaging and scores, and integrated NFC 'Baller Band' support.",
      featured: true
    },
    {
      title: "Deurbeslag Gigant E-Commerce",
      role: "Lead Backend Developer",
      tech: ["PHP", "Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL"],
      description: "Centralized e-commerce inventory and order management system for a Dutch retail platform. Automated legacy workflows, synchronized real-time stocks across external APIs, and designed filament-driven V2 interfaces.",
      featured: true
    },
    {
      title: "ECore Web & Mobile Automation",
      role: "Associate Software Engineer",
      tech: ["PHP", "Laravel", "Flutter", "Dart", "MySQL", "REST APIs"],
      description: "Enterprise system for BetonStorten.nl automating concrete order logistics, heavy machinery, work orders, and personnel planning with custom algorithmic tracking and real-time syncing.",
      featured: true
    },
    {
      title: "Bright Achievers Migration",
      role: "Full-Stack Web Developer",
      tech: ["PHP", "Laravel", "TailwindCSS", "MySQL"],
      description: "Responsive consultancy business application optimizing customer onboarding, digital document filing, and workflow query processing.",
      featured: false
    },
    {
      title: "Pubudhu Pharmacy System",
      role: "C# Desktop Developer",
      tech: ["C#", ".NET Framework", "SQL Server"],
      description: "Bespoke desktop application managing inventory, expiration warnings, and real-time sales reporting for a high-volume pharmaceutical pharmacy.",
      featured: false
    },
    {
      title: "Photographer Portfolio Engine",
      role: "Full-Stack Web Developer",
      tech: ["PHP", "MySQL", "TailwindCSS", "JavaScript"],
      description: "Bespoke content management portfolio featuring dynamic media galleries and a self-managed admin portal optimized for high-resolution images.",
      featured: false
    }
  ];

  const filteredProjects = projects.filter(proj => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return proj.featured;
    if (activeTab === "laravel") return proj.tech.includes("Laravel") || proj.tech.includes("PHP");
    if (activeTab === "flutter") return proj.tech.includes("Flutter");
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans transition-colors duration-300 selection:bg-[var(--highlight-selection)] selection:text-[var(--text-charcoal)]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-warm)]/80 border-b border-[var(--border-light)] transition-colors duration-300">
        <div className="w-full px-12 md:px-24 py-4 flex items-center justify-between">
          <a href="#hero" className="font-sans text-xl font-semibold tracking-tight hover:text-[var(--accent-rust)] transition-colors ease-in-out duration-300">
            Shehara
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-tight">
            <a href="#about" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">About</a>
            <a href="#slate" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Slate V2</a>
            <a href="#projects" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Projects</a>
            <a href="#experience" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Experience</a>
            <a href="#education" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Education</a>
            <a href="#updates" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Updates</a>
          </nav>

          <div className="flex items-center space-x-1 border border-[var(--border-light)] p-1 rounded-full bg-[var(--bg-warm)]">
            <button
              onClick={() => setTheme("light")}
              className={`p-2 rounded-full transition-all duration-200 ${theme === "light" ? "bg-[var(--accent-rust)] text-[#FAF8F5]" : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"}`}
              title="Light theme"
              aria-label="Use light theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-2 rounded-full transition-all duration-200 ${theme === "dark" ? "bg-[var(--accent-rust)] text-[#FAF8F5]" : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"}`}
              title="Dark theme"
              aria-label="Use dark theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`p-2 rounded-full transition-all duration-200 ${theme === "system" ? "bg-[var(--accent-rust)] text-[#FAF8F5]" : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"}`}
              title="Follow system settings"
              aria-label="Use system settings theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <rect x="3" y="4" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h6M12 16v4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* HERO / WELCOME SECTION */}
      <section id="hero" className="flex-1 min-h-[calc(100vh-69px)] flex items-center pt-6 pb-12 w-full px-12 md:px-24">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-1">
              <div className="font-sans text-2xl font-medium tracking-tight text-[var(--text-secondary)]">
                Thineth
              </div>
              <h1 className="font-serif-anthropic text-6xl md:text-8xl font-normal leading-[1.05] tracking-tight">
                Shehara
              </h1>
            </div>

            <p className="font-sans text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-light max-w-2xl">
              Designing and shipping mobile apps that handle real-time data, platform integrations, and smooth offline-to-online workflows, backed by clean architecture and APIs built to support them.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
                <div className="relative w-[14px] h-[18px]">
                  <Image
                    src="/location_icon.svg"
                    alt="Location Pin"
                    fill
                    className="object-contain dark:invert opacity-80"
                  />
                </div>
                <span className="font-mono-anthropic text-sm md:text-base tracking-tight">Tampere, Finland</span>
              </div>

              <div className="inline-flex items-center space-x-2.5 bg-[#1E1E1E] text-[#FAF8F5] px-5 py-3 rounded-[15px] font-sans font-medium text-sm transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF1E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF1E]"></span>
                </span>
                <span className="tracking-tight">Open To Work</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[2/3]">
              <Image
                src="/arc_card.svg"
                alt="Arc Card"
                fill
                priority
                className="object-contain drop-shadow-xl animate-fade-in"
              />

              {/* Floating Contact/Social Buttons (CSS Recreated) */}
              {/* Email Me Button */}
              <a
                href="mailto:thinethshehara@gmail.com"
                className="absolute left-[-45px] md:left-[-65px] top-[40%] -translate-y-1/2 rotate-[-12deg] transition-all duration-300 hover:rotate-[-6deg] hover:scale-105 active:scale-95 z-10 flex items-center justify-center bg-white dark:bg-slate-900 text-[#1E1E1E] dark:text-[#F8FAFC] border border-slate-200/50 dark:border-slate-800/80 rounded-[15px] font-sans font-medium text-[13px] md:text-sm shadow-[0_4px_9px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.16)] dark:shadow-[0_4px_9px_rgba(0,0,0,0.4)]"
                style={{ width: "112px", height: "50px" }}
                aria-label="Email Me"
              >
                Email Me
              </a>

              {/* LinkedIn Button */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[-75px] md:left-[-100px] top-[58%] -translate-y-1/2 rotate-[6deg] transition-all duration-300 hover:rotate-[2deg] hover:scale-105 active:scale-95 z-10 flex items-center justify-center bg-white dark:bg-slate-900 text-[#1E1E1E] dark:text-[#F8FAFC] border border-slate-200/50 dark:border-slate-800/80 rounded-[15px] font-sans font-medium text-[13px] md:text-sm shadow-[0_4px_9px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.16)] dark:shadow-[0_4px_9px_rgba(0,0,0,0.4)]"
                style={{ width: "108px", height: "50px" }}
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/sheharanayanananda"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-[-50px] md:left-[-70px] top-[76%] -translate-y-1/2 rotate-[-16deg] transition-all duration-300 hover:rotate-[-8deg] hover:scale-105 active:scale-95 z-10 flex items-center justify-center bg-white dark:bg-slate-900 text-[#1E1E1E] dark:text-[#F8FAFC] border border-slate-200/50 dark:border-slate-800/80 rounded-[15px] font-sans font-medium text-[13px] md:text-sm shadow-[0_4px_9px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.16)] dark:shadow-[0_4px_9px_rgba(0,0,0,0.4)]"
                style={{ width: "96px", height: "50px" }}
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="w-full px-12 md:px-24 py-12 md:py-24 space-y-24 md:space-y-36">

        {/* ABOUT SECTION */}
        <section id="about" className="border-t border-[var(--border-light)] pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2 className="font-serif-anthropic text-3xl font-medium tracking-tight text-[var(--accent-rust)]">
              Background
            </h2>
            <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] mt-1">
              PHILOSOPHY & STACK
            </div>
          </div>

          <div className="md:col-span-8 space-y-6 text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
            <p>
              I build software with high ownership and strict attention to detail. My background spans commercial e-commerce inventory backends, company logistics platforms, and mobile sports apps. I lean towards tools that offer power and rapid feedback, developing primarily with <span className="text-[var(--text-charcoal)] font-semibold">PHP / Laravel</span>, <span className="text-[var(--text-charcoal)] font-semibold">Flutter (Dart)</span>, <span className="text-[var(--text-charcoal)] font-semibold">Swift/SwiftUI</span>, and relational database systems.
            </p>
            <p>
              Currently, I am expanding my theoretical and practical scope by pursuing a Bachelor of Engineering in Software Engineering at the <span className="text-[var(--text-charcoal)] font-semibold">Tampere University of Applied Sciences (TAMK)</span> in Finland. I enjoy resolving architectural bottlenecks, bridging complex database states to snappy user interfaces, and exploring autonomous AI integrations.
            </p>
          </div>
        </section>

        {/* FEATURED WORK: SLATE V2 */}
        <section id="slate" className="border-t border-[var(--border-light)] pt-12 md:pt-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-mono-anthropic uppercase text-[var(--accent-rust)] border border-[var(--accent-rust)] px-2 py-0.5 rounded">Solo Project Showcase</span>
              <h2 className="font-serif-anthropic text-4xl font-normal tracking-tight pt-2">
                Slate V2
              </h2>
              <div className="text-xs font-mono-anthropic text-[var(--text-secondary)]">
                THE AGENTIC NOTES PLATFORM
              </div>
            </div>

            <div className="md:col-span-8 space-y-6">
              <p className="font-serif-anthropic text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed">
                A commercial note-taking environment for iOS that transitions notes from passive storage to an <span className="text-[var(--text-charcoal)] font-normal italic">active, context-aware AI agent workspace</span>.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Built natively with Swift and SwiftUI, Slate V2 leverages on-device LLM hosting via the Ollama API, utilizing local context databases. It replaces static editor fields with an asynchronous workflow command deck that processes multi-file attachments (PDF, DOCX, ZIP, media) and handles math typesetting effortlessly.
              </p>
            </div>
          </div>

          {/* Interactive Preset Viewer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
            <div className="md:col-span-5 flex flex-col justify-between border border-[var(--border-light)] rounded-lg p-6 bg-[var(--card-bg)] transition-colors">
              <div className="space-y-4">
                <div className="text-xs font-mono-anthropic uppercase text-[var(--text-secondary)]">
                  iOS Agent Presets
                </div>
                <h3 className="font-serif-anthropic text-2xl font-medium">
                  {slatePresets[activeSlatePreset].name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {slatePresets[activeSlatePreset].description}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border-light)] text-xs font-mono-anthropic">
                  <div>
                    <span className="block text-[var(--text-secondary)]">Context Size</span>
                    <span className="font-semibold text-[var(--text-charcoal)]">{slatePresets[activeSlatePreset].contextSize}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--text-secondary)]">Temperature</span>
                    <span className="font-semibold text-[var(--text-charcoal)]">{slatePresets[activeSlatePreset].temp}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {slatePresets.map((preset, idx) => (
                  <button
                    key={preset.name}
                    onClick={() => setActiveSlatePreset(idx)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono-anthropic border transition-all ${activeSlatePreset === idx ? "bg-[var(--text-charcoal)] text-[var(--bg-warm)] border-transparent" : "border-[var(--border-light)] hover:bg-[var(--card-hover-bg)]"}`}
                  >
                    {preset.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col border border-[var(--border-light)] rounded-lg overflow-hidden bg-slate-950 dark:bg-[#070b13] text-slate-200 font-mono-anthropic text-xs p-6 justify-between min-h-[300px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 text-slate-500">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <span>Slate.swift // Agent Command</span>
                </div>
                <div className="space-y-2">
                  <span className="text-slate-500"># System Instruction Template loaded...</span>
                  <p className="text-blue-400 font-semibold">
                    {`>>> Executing with temp=${slatePresets[activeSlatePreset].temp}`}
                  </p>
                  <p className="text-slate-300 leading-relaxed pt-2">
                    <span className="text-indigo-400 font-bold">$ prompt --input</span>: &quot;{slatePresets[activeSlatePreset].prompt}&quot;
                  </p>
                </div>
              </div>
              <div className="mt-8 text-slate-500 border-t border-slate-800/80 pt-3 flex justify-between">
                <span>Memory Cache: OK</span>
                <span className="text-blue-400">FPS: 60 (Hardware Accelerated)</span>
              </div>
            </div>
          </div>

          {/* Core Codebase Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="border border-[var(--border-light)] rounded-lg p-6 space-y-3 hover:bg-[var(--card-bg)] transition-all">
              <div className="font-mono-anthropic text-xs text-[var(--accent-rust)]">01 / PERSISTENT TASK</div>
              <h4 className="font-serif-anthropic text-xl font-medium">Asynchronous Generation</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Integrated iOS background state processing via UIBackgroundTaskIdentifier. Tasks run off the main thread and notify users on completion via local push alerts.
              </p>
            </div>

            <div className="border border-[var(--border-light)] rounded-lg p-6 space-y-3 hover:bg-[var(--card-bg)] transition-all">
              <div className="font-mono-anthropic text-xs text-[var(--accent-rust)]">02 / PHYSICS INTERACTION</div>
              <h4 className="font-serif-anthropic text-xl font-medium">Liquid Glass Capsule</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                A custom floating capsule featuring dynamic rubber-band spring physics and continuous soft haptic feedbacks on touch offsets.
              </p>
            </div>

            <div className="border border-[var(--border-light)] rounded-lg p-6 space-y-3 hover:bg-[var(--card-bg)] transition-all">
              <div className="font-mono-anthropic text-xs text-[var(--accent-rust)]">03 / MATH RENDERING</div>
              <h4 className="font-serif-anthropic text-xl font-medium">LaTeX & MathJax Cache</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Maintains thread-safe layouts and regex parsers to render complex scientific blocks inside native iOS views, running smoothly at 60 FPS.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS DIRECTORY */}
        <section id="projects" className="border-t border-[var(--border-light)] pt-12 md:pt-16 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif-anthropic text-3xl font-medium tracking-tight text-[var(--accent-rust)]">
                Project Directory
              </h2>
              <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] mt-1">
                COMMERCIAL & FREELANCE SOLUTIONS
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 text-xs font-mono-anthropic">
              {[
                { id: "all", label: "All Work" },
                { id: "featured", label: "Featured" },
                { id: "laravel", label: "Laravel/PHP" },
                { id: "flutter", label: "Flutter" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md border transition-all ${activeTab === tab.id ? "bg-[var(--text-charcoal)] text-[var(--bg-warm)] border-transparent" : "border-[var(--border-light)] hover:bg-[var(--card-bg)]"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {filteredProjects.map(proj => (
              <div
                key={proj.title}
                className="group border border-[var(--border-light)] rounded-lg p-6 bg-[var(--bg-warm)] hover:bg-[var(--card-bg)] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif-anthropic text-2xl font-medium group-hover:text-[var(--accent-rust)] transition-colors">
                      {proj.title}
                    </h3>
                    {proj.featured && (
                      <span className="text-[10px] font-mono-anthropic border border-[var(--accent-rust)] text-[var(--accent-rust)] px-2 py-0.5 rounded uppercase">
                        Core System
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono-anthropic text-[var(--text-secondary)]">
                    {proj.role}
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-light)]/50">
                  {proj.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono-anthropic bg-[var(--bg-warm)] border border-[var(--border-light)] px-2 py-0.5 rounded text-[var(--text-secondary)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="border-t border-[var(--border-light)] pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2 className="font-serif-anthropic text-3xl font-medium tracking-tight text-[var(--accent-rust)]">
              Experience
            </h2>
            <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] mt-1">
              PROFESSIONAL CHRONOLOGY
            </div>
          </div>

          <div className="md:col-span-8 space-y-12">

            {/* Job 1 */}
            <div className="relative pl-6 border-l-2 border-[var(--border-light)] space-y-3">
              <div className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent-rust)]" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)]">
                    Associate Software Engineer
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] font-medium">
                    DayZ Solutions (Pvt.) Ltd.
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] sm:text-right">
                  05/2025 — Present <br className="hidden sm:inline" />
                  <span className="text-[10px]">Nittambuwa, LK</span>
                </div>
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-2 list-disc pl-4 leading-relaxed">
                <li>Served as Lead Developer for inventory system versions, managing live integrations across retail platform APIs.</li>
                <li>Automated e-commerce sync procedures, replacing manuals and lowering synchronization drift.</li>
                <li>Structured BetonStorten automation features utilizing Laravel backend services and Flutter layouts.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="relative pl-6 border-l-2 border-[var(--border-light)] space-y-3">
              <div className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)]">
                    Freelance Software Engineer
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] font-medium">
                    UNiFY Sports Platform
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] sm:text-right">
                  01/2026 — Present <br className="hidden sm:inline" />
                  <span className="text-[10px]">Remote (US Fanbase)</span>
                </div>
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-2 list-disc pl-4 leading-relaxed">
                <li>Inherited, stabilized, and refactored modular Flutter applications and Python/Flask APIs.</li>
                <li>Implemented real-time features using WebSockets (chatrooms, score boards) and custom NFC integration.</li>
              </ul>
            </div>

            {/* Job 3 */}
            <div className="relative pl-6 border-l-2 border-[var(--border-light)] space-y-3">
              <div className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)]">
                    Web & Desktop Developer
                  </h3>
                  <div className="text-sm text-[var(--text-secondary)] font-medium">
                    Freelance Solutions
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] sm:text-right">
                  10/2022 — 06/2025 <br className="hidden sm:inline" />
                  <span className="text-[10px]">Hybrid</span>
                </div>
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-2 list-disc pl-4 leading-relaxed">
                <li>Designed, developed, and deployed custom C# inventory systems for regional pharmacies.</li>
                <li>Built custom full-stack galleries for professional photographers with customized administrative panels.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="border-t border-[var(--border-light)] pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2 className="font-serif-anthropic text-3xl font-medium tracking-tight text-[var(--accent-rust)]">
              Education
            </h2>
            <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] mt-1">
              ACADEMIC QUALIFICATIONS
            </div>
          </div>

          <div className="md:col-span-8 space-y-12">
            <div className="space-y-6">

              <div className="space-y-2">
                <span className="text-xs font-mono-anthropic text-[var(--accent-rust)]">AUTUMN 2026 — PRESENT</span>
                <h3 className="font-serif-anthropic text-2xl font-medium">
                  Bachelor of Engineering in Software Engineering
                </h3>
                <div className="text-sm text-[var(--text-secondary)]">
                  Tampere University of Applied Sciences (TAMK) — Tampere, Finland
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Focusing on modern software architecture, project-based engineering models, and Nordic technology frameworks.
                </p>
              </div>

              <div className="h-px bg-[var(--border-light)]/50" />

              <div className="space-y-2">
                <span className="text-xs font-mono-anthropic text-[var(--text-secondary)]">2023 — 2025</span>
                <h3 className="font-serif-anthropic text-2xl font-medium">
                  Pearson BTEC Level 5 HND in Computing
                </h3>
                <div className="text-sm text-[var(--text-secondary)]">
                  ESOFT Metro Campus — Gampaha, Sri Lanka
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Specialized in Software Engineering. Graduated with a Merit. Focus areas included data structures, database algorithms, and systems analysis.
                </p>
              </div>

              <div className="h-px bg-[var(--border-light)]/50" />

              <div className="space-y-2">
                <span className="text-xs font-mono-anthropic text-[var(--text-secondary)]">2022 — 2023</span>
                <h3 className="font-serif-anthropic text-2xl font-medium">
                  Diploma in Information Technology (DiTEC) & English (DiE)
                </h3>
                <div className="text-sm text-[var(--text-secondary)]">
                  ESOFT Metro Campus — Gampaha, Sri Lanka
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Dual assured diplomas covering IT systems fundamentals, object-oriented concepts, and advanced business english communications.
                </p>
              </div>

              <div className="h-px bg-[var(--border-light)]/50" />

              <div className="space-y-2">
                <span className="text-xs font-mono-anthropic text-[var(--text-secondary)]">2022</span>
                <h3 className="font-serif-anthropic text-2xl font-medium">
                  General Certificate of Education (G.C.E.) Ordinary Level
                </h3>
                <div className="text-sm text-[var(--text-secondary)]">
                  Henegama Central College — Gampaha, Sri Lanka
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Completed secondary education with strong results, including top grade (A) passes in Information & Communication Technology and English.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* UPDATES SECTION */}
        <section id="updates" className="border-t border-[var(--border-light)] pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2 className="font-serif-anthropic text-3xl font-medium tracking-tight text-[var(--accent-rust)]">
              Updates
            </h2>
            <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] mt-1">
              LOGS & CURRENT ENDEAVORS
            </div>
          </div>

          <div className="md:col-span-8 space-y-6 text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
            <div className="space-y-2 border-l border-[var(--accent-rust)] pl-4">
              <span className="text-[10px] font-mono-anthropic uppercase text-[var(--accent-rust)] font-semibold">Life & Academic Focus</span>
              <p className="text-[var(--text-charcoal)] font-semibold font-serif-anthropic text-lg leading-tight">
                Studying Software Engineering at TAMK in Finland.
              </p>
              <p>
                Relocated to Finland for undergraduate studies in Software Engineering. Currently adapting to the local academic system, developing projects, and studying Finnish conversational language.
              </p>
            </div>

            <div className="space-y-2 border-l border-[var(--border-light)] pl-4">
              <span className="text-[10px] font-mono-anthropic uppercase text-[var(--text-secondary)]">Professional Goals</span>
              <p className="text-[var(--text-charcoal)] font-semibold font-serif-anthropic text-lg leading-tight">
                Open to Junior Software Engineering & Freelance roles.
              </p>
              <p>
                Actively applying for software development positions. Ready to contribute full-stack Laravel backend architecture, Alpine.js frontends, and Flutter mobile systems to active codebases.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="border-t border-[var(--border-light)] bg-[var(--card-bg)] transition-colors duration-300 mt-24">
        <div className="w-full px-12 md:px-24 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--text-secondary)]">
          <div className="font-serif-anthropic text-lg font-medium text-[var(--text-charcoal)]">
            Thineth Shehara
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/sheharanayanananda" target="_blank" rel="noopener noreferrer" className="underline-hover hover:text-[var(--text-charcoal)]">
              GitHub
            </a>
            <span className="text-[var(--border-light)]">|</span>
            <a href="mailto:thinethshehara@gmail.com" className="underline-hover hover:text-[var(--text-charcoal)]">
              Email
            </a>
          </div>

          <div className="text-xs font-mono-anthropic">
            © 2026 Thineth Shehara. Built with Next.js & Vanilla CSS.
          </div>
        </div>
      </footer>
    </div>
  );
}
