"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AtSign, Linkedin, Github, Sun, Moon, Monitor, MapPin, Download, ArrowRight, ChevronRight, X } from "lucide-react";

// Custom type for projects
interface Project {
  title: string;
  role: string;
  tech: string[];
  description: string;
  longDescription?: string;
  repoStatus: "public" | "private" | "none";
  repoUrl?: string;
  link?: string;
  featured?: boolean;
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme and persist
  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    const applyTheme = (t: "light" | "dark" | "system") => {
      if (t === "system") {
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? root.classList.add("dark")
          : root.classList.remove("dark");
      } else if (t === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme, mounted]);

  // Project List
  const projects: Project[] = [
    {
      title: "UNiFY Sports Ecosystem",
      role: "Freelance Software Engineer",
      tech: ["Flutter", "Dart", "Python", "Flask", "PostgreSQL", "WebSockets", "Redis", "AWS", "Stripe", "NFC"],
      description: "Backend and Mobile engineer for a multi-platform sports app (NBA, WNBA, NFL, NCAA). Refactored key modules, built real-time WebSocket messaging and scores, and integrated NFC 'Baller Band' support.",
      longDescription: "Collaborated on building a real-time sports ecosystem supporting a massive US fanbase across multiple sports. Focused on implementing low-latency features including live score boards and chatrooms via WebSockets, refactoring modular components in Flutter, and developing REST APIs using Flask. High-volume database workflows were optimized using PostgreSQL and Redis caching. Source code is restricted under commercial IP protections.",
      repoStatus: "private",
      featured: true
    },
    {
      title: "Deurbeslag Gigant E-Commerce",
      role: "Lead Backend Developer",
      tech: ["PHP", "Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL"],
      description: "Centralized e-commerce inventory and order management system for a Dutch retail platform. Automated legacy workflows, synchronized real-time stocks across external APIs, and designed filament-driven V2 interfaces.",
      longDescription: "As the lead developer, I refactored the core logistics and inventory tracking system of a large Dutch e-commerce storefront. The platform integrates with external vendor shipping APIs and local retail inventory networks, automating processes that previously required hours of manual labor. Built entirely on Laravel with Livewire and Filament panels to manage high-throughput operations. The source code is commercial IP and closed for proprietary protection.",
      repoStatus: "private",
      featured: true
    },
    {
      title: "ECore Web & Mobile Automation",
      role: "Associate Software Engineer",
      tech: ["PHP", "Laravel", "Flutter", "Dart", "MySQL", "REST APIs"],
      description: "Enterprise system for BetonStorten.nl automating concrete order logistics, heavy machinery, work orders, and personnel planning with custom algorithmic tracking and real-time syncing.",
      longDescription: "An end-to-end automation application handling logistics, driver routing, concrete volume calculations, and personnel workflow schedules. Built the core web portals using Laravel and matching mobile components in Flutter to support remote transit tracking. To safeguard intellectual property, the active repository remains set to private status.",
      repoStatus: "private",
      featured: true
    },
    {
      title: "BAMC Website",
      role: "Full-Stack Web Developer",
      tech: ["HTML5", "CSS3", "JavaScript"],
      description: "Frontend website for Bright Achievers Migration Consultants — a real Sri Lankan consultancy firm. Custom UI/UX, responsive design, and client inquiry forms.",
      longDescription: "Designed and built the official frontend website for Bright Achievers Migration Consultants (BAMC), a professional Sri Lankan consultancy firm. Focuses on custom responsive layouts, interactive migration consultation booking flows, and client inquiry forms. Developed with HTML5, CSS3, and JavaScript, publicly hosted as an open-source project.",
      repoStatus: "public",
      repoUrl: "https://github.com/sheharanayanananda/BAMC_Website",
      featured: false
    },
    {
      title: "Notes — Android",
      role: "Android Developer",
      tech: ["Kotlin", "Jetpack Compose", "Room Database", "Coroutines", "Flow", "Material 3"],
      description: "Android note-taking app built with Jetpack Compose and Room Database. Clean MVVM architecture with an aesthetic, minimal UI.",
      longDescription: "A native Android note-taking application designed with Material Design 3 guidelines. Aura Notes leverages Jetpack Compose for declarative layouts, Room DB for local-first database persistence, and Kotlin Flow/Coroutines for asynchronous event processing. Features structured formatting, inline checks, and lightning-fast local search functions. The source code is public and open-source.",
      repoStatus: "public",
      repoUrl: "https://github.com/sheharanayanananda/Notes",
      featured: false
    },
    {
      title: "Malcolm Lismore Portfolio",
      role: "Full-Stack Web Developer",
      tech: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
      description: "Full-stack responsive website with a PHP backend. Covers front-end design, server-side logic, and dynamic content delivery.",
      longDescription: "Designed and implemented a lightweight photographer portfolio system for professional photographers. Features a custom CMS admin panel to upload, organize, and serve high-resolution media galleries. Optimized for rendering performance and loading times through static file serving and MySQL queries. The source code is open-source and publicly hosted.",
      repoStatus: "public",
      repoUrl: "https://github.com/sheharanayanananda/Malcolm-Lismore",
      featured: false
    },
    {
      title: "Voice Assistant",
      role: "Desktop Software Engineer",
      tech: ["C#", ".NET Framework", "SQL", "Git"],
      description: "Desktop voice command app using .NET speech synthesis and recognition. Responds to natural language voice inputs with system actions.",
      longDescription: "Developed a native desktop voice command helper application using the .NET speech engines. Able to process spoken natural language prompts, match them against system commands, trigger OS operations, and respond with automated audio text-to-speech synthesis.",
      repoStatus: "public",
      repoUrl: "https://github.com/sheharanayanananda/Voice_Assistant",
      featured: false
    },
    {
      title: "TaskFlow",
      role: "Full-Stack Web Developer",
      tech: ["PHP", "Laravel", "MySQL", "Tailwind CSS"],
      description: "Modern task management web app with auth, CRUD, and full task organization by status, priority, due date, and category.",
      longDescription: "A full-stack collaborative tasks manager platform. Includes user registration and access controls, interactive task boards (Kanban-style categorization), prioritization weights, target deadlines, and category sorting. Developed with PHP Laravel on backend and MySQL.",
      repoStatus: "public",
      repoUrl: "https://github.com/sheharanayanananda/TaskFlow",
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
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-4 flex items-center justify-between">
          <a href="#hero" className="font-sans text-xl font-semibold tracking-tight hover:text-[var(--accent-rust)] transition-colors ease-in-out duration-300">
            Shehara
          </a>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-sm font-medium tracking-tight">
            <a href="#hero" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Home</a>
            <a href="#about" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">About</a>
            <a href="/slate" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Slate</a>
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
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-2 rounded-full transition-all duration-200 ${theme === "dark" ? "bg-[var(--accent-rust)] text-[#FAF8F5]" : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"}`}
              title="Dark theme"
              aria-label="Use dark theme"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`p-2 rounded-full transition-all duration-200 ${theme === "system" ? "bg-[var(--accent-rust)] text-[#FAF8F5]" : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"}`}
              title="Follow system settings"
              aria-label="Use system settings theme"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO / WELCOME SECTION */}
      <section id="hero" className="flex-1 min-h-[calc(100vh-69px)] flex items-center w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="w-full flex flex-col md:flex-row items-center gap-8">

          {/* Left — Content */}
          <div className="flex-1 gap-3">
            <div className="flex flex-col gap-10">
              <div className="font-mono-anthropic text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.25rem] font-medium tracking-tight text-[var(--text-secondary)]">
                Thineth
              </div>
              <h1 className="font-serif-anthropic text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[11.5rem] font-medium leading-[1.05] tracking-tight">
                Shehara
              </h1>
            </div>

            <p className="font-serif-anthropic text-base md:text-lg xl:text-xl text-[var(--text-secondary)] leading-relaxed font-normal max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
              Designing and shipping mobile apps that handle real-time data, platform integrations, and smooth
              offline-to-online workflows, backed by clean architecture and APIs built to support them.
            </p>

            {/* Inline contact icons — shown below lg, hidden on lg+ where floating buttons appear */}
            <div className="flex lg:hidden items-center gap-6 mt-6 text-[var(--text-charcoal)]">
              <a
                href="mailto:sheharanayanananda@gmail.com"
                className="hover:opacity-70 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Email Me"
              >
                <AtSign className="w-6 h-6" strokeWidth={2} />
              </a>
              <a
                href="https://linkedin.com/in/thineth-nayanananda-54815b228/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-[22px] h-[22px]" strokeWidth={2} />
              </a>
              <a
                href="https://github.com/sheharanayanananda"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" strokeWidth={2} />
              </a>
            </div>

            <div className="flex flex-col gap-10 pt-14">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="font-mono-anthropic tracking-tight">Tampere, Finland</span>
              </div>

              <div className="inline-flex w-fit items-center gap-4 bg-[#1E1E1E] text-[#FAF8F5] px-5 py-3 rounded-[15px] font-sans font-medium text-sm transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF1E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF1E]"></span>
                </span>
                <span className="tracking-tight font-mono-anthropic">Open To Work</span>
              </div>
            </div>
          </div>

          {/* Right — Arc Card + floating buttons */}
          <div className="relative self-stretch flex-shrink-0 flex items-center justify-end w-full md:w-auto md:pl-4 lg:pl-8 xl:pl-12 2xl:pl-28" style={{ minWidth: "200px" }}>

            {/* Wrapper for Card and Buttons (relative to card boundaries) */}
            <div className="relative h-full" style={{ width: "auto", aspectRatio: "2/3" }}>

              {/* Floating buttons — lg and above */}
              {/* Email Me */}
              <a
                href="mailto:sheharanayanananda@gmail.com"
                className="hidden lg:flex absolute z-10 items-center justify-center bg-white text-[#1E1E1E] rounded-[15px] font-sans font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 border border-[var(--border-light)] w-[104px] h-[46px] bottom-[280px] -left-[145px] rotate-[20deg] 2xl:w-[112px] 2xl:h-[50px] 2xl:bottom-[300px] 2xl:-left-[160px] 2xl:rotate-[25deg]"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
                aria-label="Email Me"
              >
                Email Me
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/thineth-nayanananda-54815b228/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex absolute z-10 items-center justify-center bg-white text-[#1E1E1E] rounded-[15px] font-sans font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 border border-[var(--border-light)] w-[100px] h-[46px] bottom-[155px] -left-[200px] 2xl:w-[108px] 2xl:h-[50px] 2xl:bottom-[170px] 2xl:-left-[230px]"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sheharanayanananda"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex absolute z-10 items-center justify-center bg-white text-[#1E1E1E] rounded-[15px] font-sans font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 border border-[var(--border-light)] w-[90px] h-[46px] bottom-[45px] -left-[130px] -rotate-[20deg] 2xl:w-[96px] 2xl:h-[50px] 2xl:bottom-[50px] 2xl:-left-[145px] 2xl:-rotate-[30deg]"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
                aria-label="GitHub Profile"
              >
                GitHub
              </a>

              {/* Arc Card */}
              <div
                className="absolute inset-0 overflow-hidden border border-[var(--border-light)]"
                style={{ borderRadius: "24px", boxShadow: "0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)" }}
              >
                <Image
                  src="/arc_card.svg"
                  alt="Arc Card — Thineth Shehara, Software Engineer"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-16 lg:pt-20 gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">

        {/* ABOUT SECTION */}
        <section id="about" className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto gap-12">
          <div className="space-y-4">
            <h2 className="font-mono-anthropic text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-secondary)]">
              Background
            </h2>
            <div className="font-serif-anthropic text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight text-[var(--text-charcoal)] leading-[1.1]">
              PHILOSOPHY & STACK
            </div>
          </div>

          <div className="space-y-8 text-base lg:text-lg xl:text-xl leading-relaxed text-[var(--text-secondary)] font-serif-anthropic max-w-3xl mx-auto font-normal">
            <p>
              I specialize in engineering mobile applications with a focus on fluid animations, modular systems, and robust offline architectures. Whether developing natively or leveraging cross-platform frameworks, my focus is on bridging platform capabilities with high-fidelity, intuitive interfaces.
            </p>
            <p>
              Beyond mobile architectures, I design web applications and backend infrastructures. By organizing relational databases, optimizing APIs, and assembling responsive interfaces, I build scalable systems that handle high data volumes and support clean, modern user workflows.
            </p>

            <blockquote className="border-l-4 border-[var(--accent-rust)] pl-6 py-2 my-8 text-left italic text-lg lg:text-xl xl:text-2xl font-serif-anthropic text-[var(--text-charcoal)]/80 max-w-2xl mx-auto">
              &ldquo;Success is not a destination, It’s a journey that most don’t realize.&rdquo;
            </blockquote>

            <div className="pt-4 flex justify-center">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center space-x-2 bg-[#1E1E1E] hover:bg-[#333] text-[#FAF8F5] px-6 py-3.5 rounded-[15px] font-sans font-medium text-sm transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="pt-12 md:pt-24 space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="font-mono-anthropic text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-secondary)]">
              Projects
            </h2>
            <div className="font-serif-anthropic text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight text-[var(--text-charcoal)] leading-[1.1]">
              Selected Works
            </div>
          </div>

          {/* Combined Slate V1 & V2 Banner */}
          <div className="border border-[var(--border-light)] rounded-3xl p-6 md:p-10 bg-[var(--card-bg)] flex flex-col lg:flex-row gap-8 items-center lg:items-stretch">
            {/* App Image — 1:1 */}
            <div className="relative w-full max-w-[280px] aspect-square flex-shrink-0 rounded-2xl overflow-hidden shadow-xs">
              <Image src="/slate.png" alt="Slate iOS App Showcase" fill className="object-cover" />
            </div>

            {/* Info Column */}
            <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono-anthropic uppercase text-[var(--accent-rust)] font-semibold">Flagship Project</span>
                  <h3 className="font-serif-anthropic text-3xl lg:text-4xl xl:text-5xl font-medium text-[var(--text-charcoal)] mt-1">
                    Slate Note Ecosystem
                  </h3>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans max-w-2xl">
                  A high-fidelity note-taking ecosystem for iPhone. Separated into two distinct architectural tracks, Slate blends advanced manual markdown environments with autonomous local/cloud AI agents.
                </p>

                {/* Sub-grid comparing V1 & V2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-light)]/50">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-anthropic font-semibold text-[var(--text-charcoal)]">Slate Origin (V1)</span>
                      <span className="text-[9px] font-mono border border-[var(--border-light)] px-1.5 py-0.5 rounded text-[var(--text-secondary)] bg-[var(--bg-warm)]">MIT Open Source</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Features a custom Markdown checklist text editor, smart background file exports, and local OCR document scanning.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-anthropic font-semibold text-[var(--text-charcoal)]">Slate Agentic (V2)</span>
                      <span className="text-[9px] font-mono border border-[var(--accent-rust)] text-[var(--accent-rust)] px-1.5 py-0.5 rounded bg-[var(--accent-rust)]/5">Free Software</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Introduces an interactive AI chat workspace, fine-tuned cloud LLM presets, dynamic LaTeX scripting, and background async pipelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="flex pt-4 border-t border-[var(--border-light)]/50">
                <a
                  href="/slate"
                  className="inline-flex items-center gap-1.5 bg-[#1E1E1E] hover:bg-[#333] text-[#FAF8F5] px-5 py-3 rounded-xl font-sans font-medium text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Slate
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Subheading & Filter Switcher */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[var(--border-light)] pt-12">
            <div className="text-center md:text-left space-y-1">
              <h3 className="font-serif-anthropic text-2xl font-medium text-[var(--text-charcoal)]">
                More Solutions
              </h3>
              <p className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">
                Commercial & Freelance Codebases
              </p>
            </div>

            {/* Filter switcher capsule */}
            <div className="flex items-center gap-1 border border-[var(--border-light)] p-1 rounded-full bg-[var(--bg-warm)]">
              {[
                { id: "all", label: "All Work" },
                { id: "featured", label: "Featured" },
                { id: "laravel", label: "Laravel/PHP" },
                { id: "flutter", label: "Flutter" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full font-sans font-medium text-xs transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[var(--text-charcoal)] text-[var(--bg-warm)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className={`group flex flex-col justify-between border border-[var(--border-light)] rounded-2xl p-6 bg-[var(--card-bg)] transition-all duration-300 space-y-6 ${
                    isClickable
                      ? "cursor-pointer hover:bg-[var(--card-hover-bg)] hover:border-[var(--accent-rust)]"
                      : ""
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                        {proj.title}
                      </h4>
                      <span className={`text-[10px] font-mono-anthropic px-2 py-0.5 rounded-md uppercase font-semibold border ${
                        proj.repoStatus === "public"
                          ? "border-[var(--accent-rust)] text-[var(--accent-rust)] bg-[var(--accent-rust)]/5"
                          : proj.repoStatus === "private"
                          ? "border-[var(--text-secondary)] text-[var(--text-secondary)] bg-[var(--text-secondary)]/5"
                          : "border-[var(--border-light)] text-[var(--text-secondary)] bg-[var(--bg-warm)]"
                      }`}>
                        {proj.repoStatus === "public"
                          ? "Public Repo"
                          : proj.repoStatus === "private"
                          ? "Private Repo"
                          : "Proprietary"}
                      </span>
                    </div>

                    <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] tracking-tight">
                      {proj.role}
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-[var(--border-light)]/50">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono-anthropic bg-[var(--bg-warm)] border border-[var(--border-light)] px-2 py-0.5 rounded text-[var(--text-secondary)]">
                          {t}
                        </span>
                      ))}
                    </div>
                    {isClickable && (
                      <span className="text-xs font-sans text-[var(--text-secondary)] group-hover:text-[var(--accent-rust)] transition-colors flex items-center gap-1">
                        Details
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="pt-12 md:pt-24 space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="font-mono-anthropic text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-secondary)]">
              Experience
            </h2>
            <div className="font-serif-anthropic text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight text-[var(--text-charcoal)] leading-[1.1]">
              Professional Chronology
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)] pl-8 space-y-16 py-4">
            
            {/* Job 1 (Freelance Software Engineer) */}
            <div className="relative space-y-4">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--accent-rust)] shadow-xs transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    Freelance Software Engineer
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    Upwork &amp; Private Contracts &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Remote</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  01/2026 &mdash; Present
                </div>
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-4 leading-relaxed list-disc pl-4 font-sans">
                <li>
                  <strong>UNiFY Sports Ecosystem:</strong> Stabilized and extended a multi-platform Flutter app for NBA, WNBA, NFL, and NCAA fanbases. Engineered real-time WebSocket chatrooms and scoreboards, rich push notifications, and custom NFC &ldquo;Baller Band&rdquo; integrations connected to a Python/Flask API.
                </li>
                <li>
                  <strong>Upwork &amp; Client Engagements:</strong> Delivering custom software solutions directly to global clients on Upwork and personal networks, specializing in native/cross-platform mobile apps and scalable web services.
                </li>
              </ul>
            </div>

            {/* Job 2 (Associate Software Engineer) */}
            <div className="relative space-y-4">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] shadow-xs transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    Associate Software Engineer
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    DayZ Solutions (Pvt.) Ltd. &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Nittambuwa, LK</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  05/2025 &mdash; 07/2026
                </div>
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-4 leading-relaxed list-disc pl-4 font-sans">
                <li>
                  <strong>Deurbeslag Gigant (Lead Engineer):</strong> Acted as lead engineer for an e-commerce inventory management system. Automated order synchronizations across external platform APIs using Laravel, Livewire, Alpine.js, and MySQL. Rebuilding V2 panels using Filament tables and Flux UI.
                </li>
                <li>
                  <strong>ECore Web &amp; Mobile:</strong> Implemented concrete transit calculations, driver routing, and resource logging for BetonStorten.nl using Laravel backends. Designed real-time APIs consumed by a Flutter mobile interface for synchronizing orders and driver coordinates.
                </li>
              </ul>
            </div>

            {/* Job 3 */}
            <div className="relative space-y-4">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] shadow-xs transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    Web & Desktop Developer
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    Freelance Solutions &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Hybrid</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  10/2022 &mdash; 06/2025
                </div>
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-4 leading-relaxed list-disc pl-4 font-sans">
                <li>
                  <strong>Web Portals:</strong> Created the Bright Achievers Migration platform and Photographer Portfolio CMS engines using Laravel, TailwindCSS, and MySQL to automate client onboarding and showcase galleries.
                </li>
                <li>
                  <strong>Desktop Engineering:</strong> Developed pharmacy inventory trackers (Pubudhu System) and supermarket cashier systems utilizing C#, the .NET Framework, and SQL databases.
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="pt-12 md:pt-24 space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="font-mono-anthropic text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-secondary)]">
              Education
            </h2>
            <div className="font-serif-anthropic text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight text-[var(--text-charcoal)] leading-[1.1]">
              Academic Qualifications
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)] pl-8 space-y-16 py-4">
            
            {/* Degree 1 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--accent-rust)] shadow-xs transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    Bachelor of Engineering in Software Engineering
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    Tampere University of Applied Sciences (TAMK) &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Tampere, Finland</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  08/2026 &mdash; Present
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                A 240-ECTS, four-year programme focused on modern software development, web and mobile applications, and practical, project-based learning for international software engineering roles.
              </p>
            </div>

            {/* Degree 2 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] shadow-xs transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    Pearson BTEC Level 5 HND in Computing
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    ESOFT Metro Campus &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Gampaha, LK</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  02/2023 &mdash; 02/2025
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                Specialized in Software Engineering. Graduated with a <strong>Merit</strong>. Covered programming, databases, networking, security, software development lifecycles (SDLC), data structures and algorithms (DSA), web development, and UX/UI. Ofqual-regulated qualification (QN 603/7596/6).
              </p>
            </div>

            {/* Degree 3 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] shadow-xs transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    Pearson Assured Level 3 Diploma in IT (DiTEC)
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    ESOFT Metro Campus &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Gampaha, LK</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  07/2022 &mdash; 08/2023
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                Graduated with a <strong>Merit</strong>. A 1,200-hour programme covering IT concepts, computer hardware, networking, internet and web design, graphics and multimedia, Python, SQL databases, C# programming, and a final practical project.
              </p>
            </div>

            {/* Degree 4 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] shadow-xs transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    Pearson Assured Level 3 Diploma in English (DiE)
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    ESOFT Metro Campus &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Gampaha, LK</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  07/2022 &mdash; 08/2023
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                Completed with a <strong>Pass</strong> grade. A communicative, skills-based programme covering grammar, vocabulary, reading, writing, listening, speaking, presentations, and viva.
              </p>
            </div>

            {/* Degree 5 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] shadow-xs transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-medium text-[var(--text-charcoal)]">
                    G.C.E. Ordinary Level Examination
                  </h3>
                  <div className="text-sm font-medium text-[var(--text-secondary)] font-sans">
                    Henegama Central College &middot; <span className="text-xs font-mono-anthropic text-[var(--text-secondary)] uppercase">Gampaha, LK</span>
                  </div>
                </div>
                <div className="text-xs font-mono-anthropic text-[var(--text-secondary)] whitespace-nowrap">
                  2022
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                Passed with top distinctions: A in Information &amp; Communication Technology, A in English, B in Mathematics, B in Science, and B in Sinhala.
              </p>
            </div>

          </div>
        </section>

        {/* UPDATES SECTION */}
        <section id="updates" className="pt-12 md:pt-24 space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="font-mono-anthropic text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-secondary)]">
              Updates
            </h2>
            <div className="font-serif-anthropic text-4xl md:text-5xl xl:text-6xl font-medium tracking-tight text-[var(--text-charcoal)] leading-[1.1]">
              Current Endeavors
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto pt-6 items-stretch">
            {/* Card 1: iOS & Swift (Left) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)] bg-[var(--card-bg)] p-6 md:p-8 rounded-2xl hover:border-[var(--accent-rust)] hover:bg-[var(--card-hover-bg)] transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-mono-anthropic uppercase text-[var(--text-secondary)] tracking-wider font-semibold">
                  iOS &amp; Swift
                </span>
                <h3 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Slate Notes Application
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  Designing Slate V1 and V2 notes engines, implementing autonomous context-aware note processing, high-fidelity markdown/LaTeX render passes, and offline local-first database models.
                </p>
              </div>
            </div>

            {/* Card 2: TAMK / Finland (Center - Highlighted) */}
            <div className="flex flex-col justify-between border-2 border-[var(--accent-rust)] bg-[var(--card-bg)] p-6 md:p-8 rounded-2xl shadow-xl shadow-[var(--accent-rust)]/10 lg:scale-102 xl:scale-105 z-10 transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-mono-anthropic uppercase text-[var(--accent-rust)] tracking-wider font-semibold">
                  TAMK / Finland
                </span>
                <h3 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Academic Relocation
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  Commencing undergraduate studies in the Bachelor of Engineering in Software Engineering at Tampere University of Applied Sciences (TAMK) in Tampere, Finland.
                </p>
              </div>
            </div>

            {/* Card 3: Open to Gigs (Right) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)] bg-[var(--card-bg)] p-6 md:p-8 rounded-2xl hover:border-[var(--accent-rust)] hover:bg-[var(--card-hover-bg)] transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-mono-anthropic uppercase text-[var(--text-secondary)] tracking-wider font-semibold">
                  Open to Gigs
                </span>
                <h3 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Freelance &amp; Remote Projects
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  Actively accepting contracts for backend integrations (Laravel/PHP) and cross-platform native apps (Flutter/Swift/Dart) globally.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="border-t border-[var(--border-light)] bg-[var(--card-bg)] transition-colors duration-300 mt-24">
        <div className="w-full px-8 md:px-24 py-16 md:py-20 max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Branding Column */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-serif-anthropic text-2xl font-medium text-[var(--text-charcoal)]">
                Thineth Shehara
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm font-sans">
                Associate Software Engineer specializing in building full-stack platforms with Laravel and cross-platform mobile apps with Flutter and Swift.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-3 space-y-4">
              <div className="text-[10px] font-mono-anthropic uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
                Navigation
              </div>
              <ul className="space-y-2 text-sm font-sans">
                <li>
                  <a href="#hero" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#education" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    Education
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="md:col-span-3 space-y-4">
              <div className="text-[10px] font-mono-anthropic uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
                Connect
              </div>
              <ul className="space-y-2 text-sm font-sans">
                <li>
                  <a href="https://github.com/sheharanayanananda" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/thineth-nayanananda-54815b228/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:sheharanayanananda@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--border-light)]/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)] font-mono-anthropic">
            <div>
              © 2026 Thineth Shehara. All rights reserved.
            </div>
            <div>
              Designed &amp; engineered with Next.js &amp; CSS.
            </div>
          </div>

        </div>
      </footer>

      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setSelectedProject(null)}>
          <div
            className="relative w-full max-w-2xl bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-3xl p-8 space-y-6 shadow-2xl transition-transform animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[var(--border-light)] hover:bg-[var(--card-hover-bg)] text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-12">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono-anthropic px-2 py-0.5 rounded-md uppercase font-semibold border ${
                  selectedProject.repoStatus === "public"
                    ? "border-[var(--accent-rust)] text-[var(--accent-rust)] bg-[var(--accent-rust)]/5"
                    : "border-[var(--text-secondary)] text-[var(--text-secondary)] bg-[var(--text-secondary)]/5"
                }`}>
                  {selectedProject.repoStatus === "public" ? "Public Repo" : "Private Repo"}
                </span>
                <span className="text-xs font-mono-anthropic text-[var(--text-secondary)]">{selectedProject.role}</span>
              </div>
              <h3 className="font-serif-anthropic text-3xl md:text-4xl font-medium text-[var(--text-charcoal)]">
                {selectedProject.title}
              </h3>
            </div>

            {/* Detailed Description */}
            <div className="space-y-4 font-sans text-base text-[var(--text-secondary)] leading-relaxed max-h-[300px] overflow-y-auto">
              <p>{selectedProject.longDescription || selectedProject.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono-anthropic uppercase text-[var(--text-secondary)]">Technologies Used</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map(t => (
                  <span key={t} className="text-[10px] font-mono-anthropic bg-[var(--card-bg)] border border-[var(--border-light)] px-2 py-0.5 rounded text-[var(--text-secondary)]">
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
                  className="px-5 py-2.5 rounded-xl border border-[var(--border-light)] text-sm font-medium hover:bg-[var(--card-hover-bg)] transition-colors"
                >
                  Close
                </button>
                {selectedProject.repoStatus === "public" ? (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[var(--text-charcoal)] text-[var(--bg-warm)] px-5 py-2.5 rounded-xl font-sans font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-2 bg-[var(--text-secondary)]/20 text-[var(--text-secondary)]/50 px-5 py-2.5 rounded-xl font-sans font-medium text-sm cursor-not-allowed"
                  >
                    Private Repository
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
