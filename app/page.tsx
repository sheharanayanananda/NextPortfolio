"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AtSign, Linkedin, Github, MapPin, Download, ArrowRight, X } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SlateShowcase from "./components/SlateShowcase";

// Custom type for projects
interface Project {
  title: string;
  tech: string[];
  description: string;
  longDescription?: string;
  repoStatus: "public" | "private" | "none";
  repoUrl?: string;
  link?: string;
  featured?: boolean;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [prevTab, setPrevTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });

  const [typingText, setTypingText] = useState("Hello!");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(2000);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mounted && tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        setActiveRect({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    }
  }, [activeTab, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const words = ["Hello!", "Moi!"];
    const i = loopNum % words.length;
    const fullText = words[i];

    const handleType = () => {
      if (!isDeleting) {
        setTypingText(fullText.substring(0, typingText.length + 1));
        // Soft organic typing delay (100ms to 180ms)
        setTypingSpeed(100 + Math.random() * 80);

        if (typingText === fullText) {
          setTypingSpeed(2500); // Wait on completed word
          setIsDeleting(true);
        }
      } else {
        setTypingText(fullText.substring(0, typingText.length - 1));
        // Faster organic deletion delay (50ms to 80ms)
        setTypingSpeed(50 + Math.random() * 30);

        if (typingText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(700); // Pause before starting next word
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, loopNum, typingSpeed, mounted]);

  

  // Project List
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
      description: "Frontend website for Bright Achievers Migration Consultants — a real Sri Lankan consultancy firm. Custom UI/UX, responsive design, and client inquiry forms.",
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
    }
  ];

  const filteredProjects = projects.filter(proj => {
    if (activeTab === "all") return true;
    if (activeTab === "featured") return proj.featured;
    if (activeTab === "laravel") return proj.tech.includes("Laravel") || proj.tech.includes("PHP");
    if (activeTab === "flutter") return proj.tech.includes("Flutter");
    return true;
  });

  const tabList = ["all", "featured", "laravel", "flutter"];
  const activeIndex = tabList.indexOf(activeTab);
  const prevIndex = tabList.indexOf(prevTab);
  const direction = activeIndex >= prevIndex ? "right" : "left";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans-anthropic selection:bg-[var(--highlight-selection)] selection:text-[var(--text-charcoal)]">
      {/* Navigation Header */}
      <Header />

      {/* HERO / WELCOME SECTION */}
      <section id="hero" className="flex-1 min-h-[calc(100vh-69px)] flex items-center w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 scroll-mt-[69px]">
        <div className="w-full flex flex-col md:flex-row items-center gap-8">

          {/* Left — Content */}
          <div className="flex-1 gap-3">
            <div className="flex flex-col gap-8">
              <div className="font-mono-anthropic text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.25rem] font-semibold tracking-tight text-[var(--text-secondary)] flex items-center flex-wrap">
                <style>{`
                  @keyframes cursor-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.15; }
                  }
                  .custom-cursor-blink {
                    animation: cursor-blink 1.2s ease-in-out infinite !important;
                  }
                `}</style>
                {!mounted ? (
                  <span>Hello!</span>
                ) : (
                  <span className="flex items-center">
                    {typingText}
                    <span className="inline-block w-[2px] md:w-[3px] h-[0.95em] rounded-full bg-current ml-[2px] custom-cursor-blink" />
                  </span>
                )}
                <span className="ml-3">I'm</span>
              </div>
              <h1 className="font-serif-anthropic text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[11.5rem] font-normal leading-[1.05]">
                Shehara
              </h1>
            </div>

            <p className="font-sans-anthropic text-xl text-[var(--text-charcoal)] leading-[1.7] font-normal max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-7">
              Freelance Software Engineer and Software Engineering student at TAMK designing and shipping high-performance mobile apps, full-stack systems, and real-time APIs.
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

              <div className="inline-flex w-fit items-center gap-4 bg-[var(--text-charcoal)] text-[var(--bg-warm)] px-6 py-4 rounded-xl font-sans-anthropic font-semibold text-xs tracking-[-0.08px] uppercase transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative items-center justify-center flex h-3 w-3">
                  <span className="status-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-rust)]"></span>
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
                className="hidden lg:flex absolute z-10 items-center justify-center text-center bg-[var(--card-bg)] text-[var(--text-charcoal)] rounded-xl font-sans-anthropic font-semibold text-xs uppercase transition-all duration-300 hover:scale-105 active:scale-95 border border-[var(--border-light)] hover:bg-[var(--card-hover-bg)] w-[104px] h-[46px] bottom-[280px] -left-[145px] rotate-[20deg] 2xl:w-[112px] 2xl:h-[50px] 2xl:bottom-[300px] 2xl:-left-[160px] 2xl:rotate-[25deg]"
                
                aria-label="Email Me"
              >
                Email Me
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/thineth-nayanananda-54815b228/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex absolute z-10 items-center justify-center text-center bg-[var(--card-bg)] text-[var(--text-charcoal)] rounded-xl font-sans-anthropic font-semibold text-xs uppercase transition-all duration-300 hover:scale-105 active:scale-95 border border-[var(--border-light)] hover:bg-[var(--card-hover-bg)] w-[100px] h-[46px] bottom-[155px] -left-[200px] 2xl:w-[108px] 2xl:h-[50px] 2xl:bottom-[170px] 2xl:-left-[230px]"
                
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/sheharanayanananda"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex absolute z-10 items-center justify-center text-center bg-[var(--card-bg)] text-[var(--text-charcoal)] rounded-xl font-sans-anthropic font-semibold text-xs uppercase transition-all duration-300 hover:scale-105 active:scale-95 border border-[var(--border-light)] hover:bg-[var(--card-hover-bg)] w-[90px] h-[46px] bottom-[45px] -left-[130px] -rotate-[20deg] 2xl:w-[96px] 2xl:h-[50px] 2xl:bottom-[50px] 2xl:-left-[145px] 2xl:-rotate-[30deg]"
                
                aria-label="GitHub Profile"
              >
                GitHub
              </a>

              

              {/* Arc Card */}
              <div className="absolute inset-0 overflow-hidden border border-[var(--border-light)] bg-[var(--card-bg)] z-10" style={{ borderRadius: "16px" }}><Image src="/arc_card.svg" alt="Arc Card — Thineth Shehara, Software Engineer" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-5 pb-16 gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">

        {/* ABOUT SECTION */}
        <section id="about" className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto gap-12 min-h-[calc(100vh-69px)] scroll-mt-[69px]">
          <div className="flex flex-col items-center gap-4 mb-4">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              Background
            </h2>
            <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              PHILOSOPHY & STACK
            </div>
          </div>

          <div className="space-y-8 text-xl leading-[1.7] text-[var(--text-secondary)]/80 font-sans-anthropic max-w-3xl mx-auto font-normal">
            <p>
              I specialize in engineering mobile applications with a focus on fluid animations, modular systems, and robust offline architectures. Whether developing natively or leveraging cross-platform frameworks, my focus is on bridging platform capabilities with high-fidelity, intuitive interfaces.
            </p>
            <p>
              Beyond mobile architectures, I design web applications and backend infrastructures. By organizing relational databases, optimizing APIs, and assembling responsive interfaces, I build scalable systems that handle high data volumes and support clean, modern user workflows.
            </p>

            <blockquote className="border-l-3 border-[var(--accent-rust)] pl-6 py-2 my-10 text-left italic font-serif-anthropic font-medium text-[var(--text-charcoal)] max-w-2xl mx-auto">
              &ldquo;Success is not a destination, It’s a journey that most don’t realize.&rdquo;
            </blockquote>

            <div className="pt-4 flex justify-center">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 bg-[var(--accent-rust)] text-[var(--bg-warm)] hover:bg-[var(--accent-rust-hover)] px-5 py-4 rounded-xl font-sans-anthropic font-semibold text-xs uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Resume</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SlateShowcase />

      {/* Main Container for rest of projects & experience */}
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-6 md:pt-8 gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">
        
        {/* PROJECTS SECTION */}
        <section id="projects" className="pt-0 space-y-12 scroll-mt-[90px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-10 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              Proudly
            </h2>
            <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              SELECTED WORKS
            </div>
          </div>

          {/* Subheading & Filter Switcher */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12">
            <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
              <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">
                Commercial & Freelance Projects
              </h3>
            </div>

            {/* Filter switcher capsule */}
            <div 
              ref={tabsContainerRef}
              className="relative flex items-center gap-1 border border-[var(--border-light)] p-1 rounded-full bg-[var(--card-bg)]"
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
                { id: "all", label: "All Work" },
                { id: "featured", label: "Featured" },
                { id: "laravel", label: "Laravel/PHP" },
                { id: "flutter", label: "Flutter" }
              ].map(tab => (
                <button
                  key={tab.id}
                  data-active={activeTab === tab.id}
                  onClick={() => {
                    setPrevTab(activeTab);
                    setActiveTab(tab.id);
                  }}
                  className={`relative z-10 px-4 py-1.5 rounded-full font-sans-anthropic font-semibold text-xs transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "text-[var(--bg-warm)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
                  }`}
                >
                  {tab.label}
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
                  className={`group flex flex-col justify-between border border-[var(--border-light)]/40 rounded-3xl p-7 bg-[var(--card-bg)] transition-all duration-300 ease-out space-y-6 ${isClickable
                      ? "cursor-pointer hover:bg-[var(--card-hover-bg)] hover:border-[var(--text-secondary)]/60 hover:-translate-y-1"
                      : ""
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
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

                    <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
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

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="pt-12 md:pt-24 space-y-16 scroll-mt-[90px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              CHRONOLOGY
            </h2>
            <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              PROFESSIONAL PATH
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)]/70 pl-8 space-y-14 py-4">

            {/* Job 1 (Freelance Software Engineer) */}
            <div className="relative group">
              {/* Timeline Dot (Blinking Orange Button for Current) */}
              <div className="absolute -left-[40px] top-2 flex items-center justify-center h-4 w-4">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-rust)]" />
              </div>

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--accent-rust)] font-bold">
                      Upwork &amp; Private Contracts
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Freelance Software Engineer
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Remote
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    01/2026 &mdash; Present
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">UNiFY Sports Ecosystem:</strong> Stabilized and extended a multi-platform Flutter app for NBA, WNBA, NFL, and NCAA fanbases. Engineered real-time WebSocket chatrooms and scoreboards, rich push notifications, and custom NFC &ldquo;Baller Band&rdquo; integrations connected to a Python/Flask API.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 2 (Associate Software Engineer) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      DayZ Solutions (Pvt.) Ltd.
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Associate Software Engineer
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Nittambuwa, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    05/2025 &mdash; 07/2026
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Deurbeslag Gigant:</strong> Acted as lead engineer for an e-commerce inventory management system. Automated order synchronizations across external platform APIs using Laravel, Livewire, Alpine.js, and MySQL. Rebuilding V2 panels using Filament tables and Flux UI.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">ECore Web &amp; Mobile:</strong> Implemented concrete transit calculations, driver routing, and resource logging for BetonStorten.nl using Laravel backends. Designed real-time APIs consumed by a Flutter mobile interface for synchronizing orders and driver coordinates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 3 (Web & Desktop Developer) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      Freelance Solutions
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Web &amp; Desktop Developer
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Hybrid
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    10/2022 &mdash; 06/2025
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Web Portals:</strong> Created the Bright Achievers Migration platform and Photographer Portfolio CMS engines using Laravel, TailwindCSS, and MySQL to automate client onboarding and showcase galleries.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Desktop Engineering:</strong> Developed pharmacy inventory trackers (Pubudhu System) and supermarket cashier systems utilizing C#, the .NET Framework, and SQL databases.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="pt-12 md:pt-24 space-y-16 scroll-mt-[90px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              ACADEMIA
            </h2>
            <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              STUDIES &amp; DEGREES
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)]/70 pl-8 space-y-14 py-4">

            {/* Degree 1 (TAMK - Current) */}
            <div className="relative group">
              {/* Timeline Dot (Blinking Orange Button for Current) */}
              <div className="absolute -left-[40px] top-2 flex items-center justify-center h-4 w-4">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-rust)]" />
              </div>

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--accent-rust)] font-bold">
                      Tampere University of Applied Sciences (TAMK)
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Bachelor of Engineering in Software Engineering
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Tampere, Finland
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    08/2026 &mdash; Present
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    A 240-ECTS, four-year programme focused on modern software development, web and mobile applications, and practical, project-based learning for international software engineering roles.
                  </p>
                </div>
              </div>
            </div>

            {/* Degree 2 (HND) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      ESOFT Metro Campus
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Pearson BTEC Level 5 HND in Computing
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    02/2023 &mdash; 02/2025
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Specialized in Software Engineering. Graduated with a <strong>Merit</strong>. Covered programming, databases, networking, security, software development lifecycles (SDLC), data structures and algorithms (DSA), web development, and UX/UI. Ofqual-regulated qualification (QN 603/7596/6).
                  </p>
                </div>
              </div>
            </div>

            {/* Degree 3 (Diploma IT) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      ESOFT Metro Campus
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Pearson Assured Level 3 Diploma in IT
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    07/2022 &mdash; 08/2023
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Graduated with a <strong>Merit</strong>. A 1,200-hour programme (DiTEC) covering IT concepts, computer hardware, networking, internet and web design, graphics and multimedia, Python, SQL databases, C# programming, and a final practical project.
                  </p>
                </div>
              </div>
            </div>

            {/* Degree 4 (Diploma English) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      ESOFT Metro Campus
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Pearson Assured Level 3 Diploma in English
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    07/2022 &mdash; 08/2023
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Completed with a <strong>Pass</strong> grade. A communicative, skills-based programme (DiE) covering grammar, vocabulary, reading, writing, listening, speaking, presentations, and viva.
                  </p>
                </div>
              </div>
            </div>

            {/* Degree 5 (O/L) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      Henegama Central College
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      G.C.E. Ordinary Level Examination
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    2022
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Passed with top distinctions: A in Information &amp; Communication Technology, A in English, B in Mathematics, B in Science, and B in Sinhala.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* UPDATES SECTION */}
        <section id="updates" className="pt-12 md:pt-24 space-y-16 scroll-mt-[90px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              CURRENTLY
            </h2>
            <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              ONGOING ENDEAVORS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto pt-6 items-stretch">
            {/* Card 1: iOS & Swift (Left) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                  iOS &amp; Swift
                </span>
                <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Slate Notes Application
                </h3>
                <p className="text-sm text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Designing Slate V1 and V2 notes engines, implementing autonomous context-aware note processing, high-fidelity markdown/LaTeX render passes, and offline local-first database models.
                </p>
              </div>
            </div>

            {/* Card 2: TAMK / Finland (Center - Highlighted) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[#f5e3c7] p-6 md:p-8 rounded-3xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--text-secondary)]/30 group">
              <div className="space-y-4">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--accent-rust-hover)] tracking-widest font-bold">
                  TAMK / Finland
                </span>
                <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Academic Relocation
                </h3>
                <p className="text-sm text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Commencing undergraduate studies in the Bachelor of Engineering in Software Engineering at Tampere University of Applied Sciences (TAMK) in Tampere, Finland.
                </p>
              </div>
            </div>

            {/* Card 3: Open to Gigs (Right) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                  Open to Gigs
                </span>
                <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Freelance &amp; Remote Projects
                </h3>
                <p className="text-sm text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Actively accepting contracts for backend integrations (Laravel/PHP) and cross-platform native apps (Flutter/Swift/Dart) globally.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setSelectedProject(null)}>
          <div
            className="relative w-full max-w-2xl bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-3xl p-8 space-y-6 transition-transform animate-in fade-in zoom-in-95 duration-200"
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
    </div>
  );
}
