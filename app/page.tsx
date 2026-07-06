"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AtSign, Linkedin, Github, MapPin, Download, ArrowRight, ChevronRight, X } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";

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

const butterflies = [
  { id: 1, left: "29.7%", top: "6.7%", width: "41.2%", floatX: "3px", floatY: "-5px", rot: "2deg", floatDur: "4.2s", flutterDur: "1.2s", delay: "0.2s" },
  { id: 2, left: "68.5%", top: "9.1%", width: "24.1%", floatX: "-4px", floatY: "6px", rot: "5deg", floatDur: "3.8s", flutterDur: "1.4s", delay: "0.7s" },
  { id: 3, left: "20.8%", top: "11.4%", width: "23.4%", floatX: "5px", floatY: "-3px", rot: "-4deg", floatDur: "4.5s", flutterDur: "1.1s", delay: "0.1s" },
  { id: 4, left: "57.9%", top: "14.9%", width: "14.9%", floatX: "-3px", floatY: "-6px", rot: "2deg", floatDur: "3.5s", flutterDur: "0.9s", delay: "0.5s" },
  { id: 5, left: "12.1%", top: "20.6%", width: "28.2%", floatX: "6px", floatY: "4px", rot: "-6deg", floatDur: "5.0s", flutterDur: "1.6s", delay: "0.3s" },
  { id: 6, left: "30.3%", top: "21.9%", width: "16.5%", floatX: "-2px", floatY: "-5px", rot: "3deg", floatDur: "4.1s", flutterDur: "1.3s", delay: "0.9s" },
  { id: 7, left: "68.4%", top: "22.9%", width: "16.1%", floatX: "4px", floatY: "3px", rot: "-2deg", floatDur: "3.9s", flutterDur: "1.5s", delay: "0.4s" },
  { id: 8, left: "31.5%", top: "35.7%", width: "14.9%", floatX: "-5px", floatY: "-4px", rot: "4deg", floatDur: "4.3s", flutterDur: "1.0s", delay: "0.6s" },
  { id: 9, left: "14.7%", top: "38.9%", width: "18.2%", floatX: "3px", floatY: "6px", rot: "-3deg", floatDur: "4.7s", flutterDur: "1.2s", delay: "1.1s" },
  { id: 10, left: "39.9%", top: "42.2%", width: "16.7%", floatX: "-4px", floatY: "-3px", rot: "1deg", floatDur: "3.6s", flutterDur: "0.8s", delay: "0.2s" },
  { id: 11, left: "53.9%", top: "42.6%", width: "32.2%", floatX: "5px", floatY: "5px", rot: "7deg", floatDur: "5.2s", flutterDur: "1.8s", delay: "0.8s" },
  { id: 12, left: "23.6%", top: "45.3%", width: "18.5%", floatX: "-3px", floatY: "-5px", rot: "-5deg", floatDur: "4.0s", flutterDur: "1.3s", delay: "0.5s" },
  { id: 13, left: "72.1%", top: "55.0%", width: "14.8%", floatX: "4px", floatY: "-4px", rot: "2deg", floatDur: "3.7s", flutterDur: "1.1s", delay: "1.3s" },
  { id: 14, left: "65.4%", top: "60.5%", width: "24.1%", floatX: "-5px", floatY: "5px", rot: "-6deg", floatDur: "4.6s", flutterDur: "1.5s", delay: "0.2s" },
  { id: 15, left: "11.2%", top: "66.9%", width: "11.2%", floatX: "3px", floatY: "-3px", rot: "4deg", floatDur: "3.4s", flutterDur: "0.9s", delay: "0.7s" },
  { id: 16, left: "58.6%", top: "70.6%", width: "23.3%", floatX: "-4px", floatY: "-6px", rot: "3deg", floatDur: "4.8s", flutterDur: "1.4s", delay: "0.4s" },
  { id: 17, left: "5.3%", top: "71.6%", width: "45.1%", floatX: "6px", floatY: "4px", rot: "-8deg", floatDur: "5.5s", flutterDur: "2.0s", delay: "1.0s" },
  { id: 18, left: "39.9%", top: "80.6%", width: "24.7%", floatX: "-3px", floatY: "5px", rot: "5deg", floatDur: "4.4s", flutterDur: "1.2s", delay: "0.3s" },
  { id: 19, left: "15.9%", top: "83.8%", width: "12.1%", floatX: "4px", floatY: "-5px", rot: "-3deg", floatDur: "3.9s", flutterDur: "1.0s", delay: "0.9s" },
  { id: 20, left: "27.0%", top: "87.5%", width: "13.9%", floatX: "-2px", floatY: "4px", rot: "2deg", floatDur: "3.6s", flutterDur: "1.1s", delay: "0.1s" }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans-anthropic selection:bg-[var(--highlight-selection)] selection:text-[var(--text-charcoal)]">
      {/* Navigation Header */}
      <Header />

      {/* HERO / WELCOME SECTION */}
      <section id="hero" className="flex-1 min-h-[calc(100vh-69px)] flex items-center w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
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
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-16 lg:pt-20 gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">

        {/* ABOUT SECTION */}
        <section id="about" className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto gap-12">
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

      {/* Dynamic styles for butterflies */}
      <style>{`
        @keyframes butterfly-flutter {
          0%, 20%, 40%, 60%, 100% {
            transform: perspective(300px) rotateY(0deg);
          }
          10%, 30%, 50% {
            transform: perspective(300px) rotateY(68deg);
          }
        }
        @keyframes butterfly-float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(var(--float-x, 6px), var(--float-y, -10px)) rotate(var(--float-rot, 3deg));
          }
          50% {
            transform: translate(calc(var(--float-x, 6px) * -0.6), calc(var(--float-y, -10px) * 0.7)) rotate(calc(var(--float-rot, 3deg) * -1.2));
          }
          75% {
            transform: translate(calc(var(--float-x, 6px) * 0.8), calc(var(--float-y, -10px) * -0.5)) rotate(calc(var(--float-rot, 3deg) * 0.8));
          }
        }
        .butterfly-float-container {
          animation: butterfly-float var(--float-dur, 5s) ease-in-out infinite var(--float-delay, 0s);
          will-change: transform;
        }
        .butterfly-flutter-image {
          animation: butterfly-flutter var(--flutter-dur, 1.4s) ease-in-out infinite var(--flutter-delay, 0s);
          transform-origin: center;
          will-change: transform;
        }
      `}</style>

      {/* FULL-SCREEN SLATE SHOWCASE */}
      <section id="projects-slate" className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12 md:pt-18 pb-0 relative">
        <div className="w-full min-h-[calc(100vh-160px)] bg-[#f5e6ce] rounded-[32px] p-8 md:p-16 lg:p-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center relative overflow-hidden select-none">
          
          {/* Left Column — Editorial Info */}
          <div className="flex flex-col justify-center space-y-6 text-left z-10 pl-0 lg:pl-8">
            <h1 className="font-serif-anthropic text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-[var(--text-charcoal)] leading-[1.08]">
              Announcing <br />
              Slate App
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-[var(--text-charcoal)]/80 leading-relaxed font-sans-anthropic max-w-xl">
              An intelligent note-taking application designed for iOS, bridging local-first markdown editing with advanced agentic AI capabilities.
            </p>
            <div className="pt-4">
              <a
                href="/slate"
                className="inline-flex items-center justify-center bg-black text-white hover:bg-black/90 px-6 py-3.5 rounded-lg font-sans-anthropic font-semibold text-xs uppercase tracking-wide transition-all duration-200"
              >
                Explore Slate
              </a>
            </div>
          </div>

          {/* Right Column — Animated Butterflies "S" Shape */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] aspect-[696/1024] mx-auto z-10">
            {butterflies.map((b) => (
              <div
                key={b.id}
                className="absolute butterfly-float-container"
                style={{
                  left: b.left,
                  top: b.top,
                  width: b.width,
                  "--float-x": b.floatX,
                  "--float-y": b.floatY,
                  "--float-rot": b.rot,
                  "--float-dur": b.floatDur,
                  "--float-delay": b.delay,
                } as React.CSSProperties}
              >
                <div
                  className="w-full h-full butterfly-flutter-image"
                  style={{
                    "--flutter-dur": b.flutterDur,
                    "--flutter-delay": b.delay,
                  } as React.CSSProperties}
                >
                  <img
                    src={`/butterflies/butterfly_${b.id}.png`}
                    alt={`Butterfly ${b.id}`}
                    className="w-full h-auto object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Main Container for rest of projects & experience */}
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-6 md:pt-8 gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">
        
        {/* PROJECTS SECTION */}
        <section id="projects" className="pt-0 space-y-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-18 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              Projects
            </h2>
            <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              SELECTED WORKS
            </div>
          </div>

          {/* Subheading & Filter Switcher */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[var(--border-light)] pt-12">
            <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
              <p className="text-[10px] font-sans-anthropic font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                Commercial & Freelance Projects
              </p>
              <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">
                More Solutions
              </h3>
            </div>

            {/* Filter switcher capsule */}
            <div className="flex items-center gap-1 border border-[var(--border-light)] p-1 rounded-2xl bg-[var(--card-bg)]">
              {[
                { id: "all", label: "All Work" },
                { id: "featured", label: "Featured" },
                { id: "laravel", label: "Laravel/PHP" },
                { id: "flutter", label: "Flutter" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-xl font-sans-anthropic font-semibold text-xs transition-all duration-200 ${activeTab === tab.id
                      ? "bg-[var(--accent-rust)] text-[var(--bg-warm)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  className={`group flex flex-col justify-between border border-[var(--border-light)] rounded-2xl p-6 bg-[var(--card-bg)] transition-all duration-300 space-y-6 ${isClickable
                      ? "cursor-pointer hover:bg-[var(--card-hover-bg)] hover:border-[var(--text-charcoal)]"
                      : ""
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                        {proj.title}
                      </h4>
                      <span className={`shrink-0 whitespace-nowrap text-[10px] font-mono-anthropic px-2 py-0.5 rounded-none uppercase font-semibold border bg-transparent ${proj.repoStatus === "public"
                          ? "border-[var(--accent-rust)] text-[var(--accent-rust)]"
                          : proj.repoStatus === "private"
                            ? "border-[var(--text-secondary)] text-[var(--text-secondary)]"
                            : "border-[var(--border-light)] text-[var(--text-secondary)]"
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

                  <div className="flex justify-between items-center pt-4 border-t border-[var(--border-light)]/50">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map(t => (
                        <span key={t} className="text-[10px] font-sans-anthropic bg-[var(--bg-warm)] border border-[var(--border-light)] px-2 py-0.5 rounded-none text-[var(--text-charcoal)]">
                          {t}
                        </span>
                      ))}
                    </div>
                    {isClickable && (
                      <span className="text-xs font-sans-anthropic text-[var(--text-secondary)] group-hover:text-[var(--accent-rust)] transition-colors flex items-center gap-1">
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
            <h2 className="font-sans-anthropic text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              Experience
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl xl:text-5xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              Professional Chronology
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)] pl-8 space-y-16 py-4">

            {/* Job 1 (Freelance Software Engineer) */}
            <div className="relative space-y-4">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    Freelance Software Engineer
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    Upwork &amp; Private Contracts &nbsp; &middot; &nbsp; Remote
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  01/2026 &mdash; Present
                </div>
              </div>
              <ul className="text-sm text-[var(--text-charcoal)] space-y-4 leading-relaxed list-disc pl-4 font-sans-anthropic">
                <li>
                  <strong>UNiFY Sports Ecosystem:</strong> Stabilized and extended a multi-platform Flutter app for NBA, WNBA, NFL, and NCAA fanbases. Engineered real-time WebSocket chatrooms and scoreboards, rich push notifications, and custom NFC &ldquo;Baller Band&rdquo; integrations connected to a Python/Flask API.
                </li>
              </ul>
            </div>

            {/* Job 2 (Associate Software Engineer) */}
            <div className="relative space-y-4">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] transition-colors duration-300" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    Associate Software Engineer
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    DayZ Solutions (Pvt.) Ltd. &nbsp; &middot; &nbsp; Nittambuwa, Sri Lanka
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  05/2025 &mdash; 07/2026
                </div>
              </div>
              <ul className="text-sm text-[var(--text-charcoal)] space-y-4 leading-relaxed list-disc pl-4 font-sans-anthropic">
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
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] transition-colors duration-300" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    Web & Desktop Developer
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    Freelance Solutions &nbsp; &middot; &nbsp; Hybrid
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  10/2022 &mdash; 06/2025
                </div>
              </div>
              <ul className="text-sm text-[var(--text-charcoal)] space-y-4 leading-relaxed list-disc pl-4 font-sans-anthropic">
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
            <h2 className="font-sans-anthropic text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              Education
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl xl:text-5xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              Academic Qualifications
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)] pl-8 space-y-16 py-4">

            {/* Degree 1 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--accent-rust)] transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    Bachelor of Engineering in Software Engineering
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    Tampere University of Applied Sciences (TAMK) &nbsp; &middot; &nbsp; Tampere, Finland
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  08/2026 &mdash; Present
                </div>
              </div>
              <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                A 240-ECTS, four-year programme focused on modern software development, web and mobile applications, and practical, project-based learning for international software engineering roles.
              </p>
            </div>

            {/* Degree 2 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    Pearson BTEC Level 5 HND in Computing
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    ESOFT Metro Campus &nbsp; &middot; &nbsp; Gampaha, Sri Lanka
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  02/2023 &mdash; 02/2025
                </div>
              </div>
              <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                Specialized in Software Engineering. Graduated with a <strong>Merit</strong>. Covered programming, databases, networking, security, software development lifecycles (SDLC), data structures and algorithms (DSA), web development, and UX/UI. Ofqual-regulated qualification (QN 603/7596/6).
              </p>
            </div>

            {/* Degree 3 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    Pearson Assured Level 3 Diploma in IT (DiTEC)
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    ESOFT Metro Campus &nbsp; &middot; &nbsp; Gampaha, Sri Lanka
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  07/2022 &mdash; 08/2023
                </div>
              </div>
              <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                Graduated with a <strong>Merit</strong>. A 1,200-hour programme covering IT concepts, computer hardware, networking, internet and web design, graphics and multimedia, Python, SQL databases, C# programming, and a final practical project.
              </p>
            </div>

            {/* Degree 4 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    Pearson Assured Level 3 Diploma in English (DiE)
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    ESOFT Metro Campus &nbsp; &middot; &nbsp; Gampaha, Sri Lanka
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  07/2022 &mdash; 08/2023
                </div>
              </div>
              <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                Completed with a <strong>Pass</strong> grade. A communicative, skills-based programme covering grammar, vocabulary, reading, writing, listening, speaking, presentations, and viva.
              </p>
            </div>

            {/* Degree 5 */}
            <div className="relative space-y-3">
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg-warm)] bg-[var(--border-light)] transition-colors duration-300" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-serif-anthropic text-xl lg:text-2xl font-normal text-[var(--text-charcoal)]">
                    G.C.E. Ordinary Level Examination
                  </h3>
                  <p className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)]">
                    Henegama Central College &nbsp; &middot; &nbsp; Gampaha, Sri Lanka
                  </p>
                </div>
                <div className="text-xs font-sans-anthropic font-semibold tracking-[-0.08px] uppercase text-[var(--text-secondary)] whitespace-nowrap">
                  2022
                </div>
              </div>
              <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                Passed with top distinctions: A in Information &amp; Communication Technology, A in English, B in Mathematics, B in Science, and B in Sinhala.
              </p>
            </div>

          </div>
        </section>

        {/* UPDATES SECTION */}
        <section id="updates" className="pt-12 md:pt-24 space-y-16">
          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              Updates
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl xl:text-5xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              Current Endeavors
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto pt-6 items-stretch">
            {/* Card 1: iOS & Swift (Left) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)] bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl hover:border-[var(--accent-rust)] transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                  iOS &amp; Swift
                </span>
                <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Slate Notes Application
                </h3>
                <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                  Designing Slate V1 and V2 notes engines, implementing autonomous context-aware note processing, high-fidelity markdown/LaTeX render passes, and offline local-first database models.
                </p>
              </div>
            </div>

            {/* Card 2: TAMK / Finland (Center - Highlighted) */}
            <div className="flex flex-col justify-between border-2 border-[var(--accent-rust)] bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl z-10 transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--accent-rust)] tracking-widest font-bold">
                  TAMK / Finland
                </span>
                <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Academic Relocation
                </h3>
                <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
                  Commencing undergraduate studies in the Bachelor of Engineering in Software Engineering at Tampere University of Applied Sciences (TAMK) in Tampere, Finland.
                </p>
              </div>
            </div>

            {/* Card 3: Open to Gigs (Right) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)] bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl hover:border-[var(--accent-rust)] transition-all duration-300 group">
              <div className="space-y-4">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                  Open to Gigs
                </span>
                <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Freelance &amp; Remote Projects
                </h3>
                <p className="text-sm text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
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
            className="relative w-full max-w-2xl bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-2xl p-8 space-y-6 transition-transform animate-in fade-in zoom-in-95 duration-200"
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
                <span className={`shrink-0 whitespace-nowrap text-[10px] font-mono-anthropic px-2 py-0.5 rounded-none uppercase font-semibold border bg-transparent ${selectedProject.repoStatus === "public"
                    ? "border-[var(--accent-rust)] text-[var(--accent-rust)]"
                    : "border-[var(--text-secondary)] text-[var(--text-secondary)]"
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
                  <span key={t} className="text-[10px] font-sans-anthropic bg-[var(--card-bg)] border border-[var(--border-light)] px-2 py-0.5 rounded-none text-[var(--text-charcoal)]">
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
