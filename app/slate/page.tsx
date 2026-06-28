"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SlatePage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);
  const [activeVersion, setActiveVersion] = useState<"origin" | "agentic">("origin");

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
      const handler = (e: MediaQueryListEvent) =>
        e.matches ? root.classList.add("dark") : root.classList.remove("dark");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme, mounted]);

  const originFeatures = [
    {
      index: "01",
      title: "Rich Note Creation",
      description:
        "Write with full Markdown formatting — headings, bold, italic, strikethrough, inline code, and interactive checklists you can toggle directly from the list view without entering edit mode.",
    },
    {
      index: "02",
      title: "Smart Lens Visual AI",
      description:
        "Point your camera at any document, whiteboard, or receipt. On-device Vision OCR extracts and structures the text, dropping it straight into a new note in seconds.",
    },
    {
      index: "03",
      title: "AI Note Organizer",
      description:
        "Tap the Sparkles icon on any note. The organizer rewrites messy drafts, fixes grammar, restructures content, and removes duplicate ideas — all without leaving the editor.",
    },
    {
      index: "04",
      title: "Multi-type Note Sharing",
      description:
        "Export any note as a print-ready PDF or RTF document, or share via the native iOS share sheet to any app. Dynamic color resolution ensures dark-mode text renders correctly on export.",
    },
  ];

  const agenticFeatures = [
    {
      index: "01",
      title: "AI Chat Command Center",
      description:
        "A conversational agent workspace at the center of your notes. Prompt the AI naturally to synthesize, summarize, restructure, or generate content across your entire knowledge base.",
    },
    {
      index: "02",
      title: "Cloud LLM Presets",
      description:
        "Switch between fine-tuned model presets — Balanced, Deep Reasoning, Creative Drafts, Quick Fixes — each with distinct system instructions, context windows, and temperature settings.",
    },
    {
      index: "03",
      title: "File Attachments",
      description:
        "Attach PDFs, DOCX files, ZIP archives, images from your library, or capture live via camera. A custom binary parser handles extraction and feeds content directly to the agent.",
    },
    {
      index: "04",
      title: "Formatted Output",
      description:
        "Responses render with full Markdown and LaTeX typesetting via MathJax, cached at 60 FPS. Complex equations, tables, and code blocks appear as cleanly as printed text.",
    },
  ];

  const currentFeatures = activeVersion === "origin" ? originFeatures : agenticFeatures;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans transition-colors duration-300">

      {/* ─── Header (shared with portfolio) ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-warm)]/80 border-b border-[var(--border-light)] transition-colors duration-300">
        <div className="w-full px-12 md:px-24 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-sans text-xl font-semibold tracking-tight hover:text-[var(--accent-rust)] transition-colors ease-in-out duration-300"
          >
            Shehara
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-tight">
            <Link href="/#hero" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Home</Link>
            <Link href="/#about" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">About</Link>
            <Link href="/slate" className="underline-hover text-[var(--text-charcoal)] transition-colors">Slate</Link>
            <Link href="/#projects" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Projects</Link>
            <Link href="/#experience" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Experience</Link>
            <Link href="/#education" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Education</Link>
            <Link href="/#updates" className="underline-hover text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Updates</Link>
          </nav>

          {/* Theme toggle */}
          <div className="flex items-center space-x-1 border border-[var(--border-light)] p-1 rounded-full bg-[var(--bg-warm)]">
            <button
              onClick={() => setTheme("light")}
              className={`p-2 rounded-full transition-all duration-200 ${theme === "light" ? "bg-[var(--accent-rust)] text-[#FAF8F5]" : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"}`}
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
              aria-label="Use dark theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`p-2 rounded-full transition-all duration-200 ${theme === "system" ? "bg-[var(--accent-rust)] text-[#FAF8F5]" : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"}`}
              aria-label="Use system theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <rect x="3" y="4" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h6M12 16v4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ─── Hero ─── */}
        <section className="min-h-[calc(100vh-69px)] flex flex-col items-center justify-center text-center px-12 md:px-24 gap-8">
          <div className="space-y-2">
            <div className="font-mono-anthropic text-xs tracking-widest uppercase text-[var(--text-secondary)]">
              For iPhone · Swift / SwiftUI
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif-anthropic text-[10rem] md:text-[14rem] font-medium leading-none tracking-tight text-[var(--text-charcoal)]">
              Slate
            </h1>
            <p className="font-mono-anthropic text-xl md:text-2xl text-[var(--text-secondary)] tracking-tight">
              Notes, but intelligent.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="https://github.com/sheharanayanananda/Slate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--text-charcoal)] text-[var(--bg-warm)] px-6 py-3 rounded-[15px] font-sans font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              View Origin on GitHub
            </a>
            <a
              href="https://github.com/sheharanayanananda/Slate-V2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--border-light)] text-[var(--text-charcoal)] px-6 py-3 rounded-[15px] font-sans font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-[var(--card-bg)]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              View Agentic on GitHub
            </a>
          </div>
        </section>

        {/* ─── Sticky Tab Switcher ─── */}
        <div className="sticky top-[69px] z-40 flex justify-center py-4 bg-[var(--bg-warm)]/90 backdrop-blur-md border-b border-[var(--border-light)]">
          <div className="flex items-center gap-1 border border-[var(--border-light)] p-1 rounded-full bg-[var(--bg-warm)]">
            <button
              onClick={() => setActiveVersion("origin")}
              className={`px-6 py-2 rounded-full font-sans font-medium text-sm transition-all duration-200 ${
                activeVersion === "origin"
                  ? "bg-[var(--text-charcoal)] text-[var(--bg-warm)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Slate Origin
            </button>
            <button
              onClick={() => setActiveVersion("agentic")}
              className={`px-6 py-2 rounded-full font-sans font-medium text-sm transition-all duration-200 ${
                activeVersion === "agentic"
                  ? "bg-[var(--text-charcoal)] text-[var(--bg-warm)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Slate Agentic
            </button>
          </div>
        </div>

        {/* ─── App Image ─── */}
        <section className="flex flex-col items-center justify-center px-12 md:px-24 py-20 md:py-32 gap-6">
          <div className="relative w-full max-w-[520px] aspect-square">
            <div className="relative w-full h-full rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)" }}>
              <Image
                src="/slate.png"
                alt={activeVersion === "origin" ? "Slate Origin — iOS App" : "Slate Agentic — iOS App"}
                fill
                className="object-cover"
                priority
              />
              {/* Coming Soon overlay for Agentic */}
              {activeVersion === "agentic" && (
                <div className="absolute inset-0 bg-[var(--bg-warm)]/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <div className="font-mono-anthropic text-xs tracking-widest uppercase text-[var(--text-secondary)]">
                    In Development
                  </div>
                  <div className="font-serif-anthropic text-3xl md:text-4xl font-medium text-[var(--text-charcoal)]">
                    Coming Soon
                  </div>
                  <p className="font-sans text-sm text-[var(--text-secondary)] text-center max-w-xs leading-relaxed">
                    Slate Agentic is currently in active development. A preview image will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Version label */}
          <div className="text-center space-y-1">
            <div className="font-serif-anthropic text-2xl font-medium text-[var(--text-charcoal)]">
              {activeVersion === "origin" ? "Slate Origin" : "Slate Agentic"}
            </div>
            <div className="font-mono-anthropic text-xs tracking-widest uppercase text-[var(--text-secondary)]">
              {activeVersion === "origin" ? "Open Source · MIT License" : "Free Software · Coming Soon"}
            </div>
          </div>
        </section>

        {/* ─── Feature Grid ─── */}
        <section className="px-12 md:px-24 pb-24 md:pb-36">
          <div className="max-w-5xl mx-auto space-y-16">

            {/* Section header */}
            <div className="text-center space-y-3">
              <div className="font-mono-anthropic text-xs tracking-widest uppercase text-[var(--text-secondary)]">
                {activeVersion === "origin" ? "Core Features" : "Agentic Capabilities"}
              </div>
              <h2 className="font-serif-anthropic text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-charcoal)]">
                {activeVersion === "origin"
                  ? "Intelligent notes, built for clarity."
                  : "Your notes. Now with an AI agent."}
              </h2>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentFeatures.map((feature) => (
                <div
                  key={feature.index}
                  className="border border-[var(--border-light)] rounded-2xl p-8 space-y-4 hover:bg-[var(--card-bg)] transition-colors duration-200"
                >
                  <div className="font-mono-anthropic text-xs text-[var(--accent-rust)] tracking-widest uppercase">
                    {feature.index}
                  </div>
                  <h3 className="font-serif-anthropic text-xl font-medium text-[var(--text-charcoal)]">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section className="border-t border-[var(--border-light)] py-24 md:py-32 flex flex-col items-center justify-center text-center px-12 md:px-24 gap-10">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-serif-anthropic text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-charcoal)]">
              Built for iOS. Open to everyone.
            </h2>
            <p className="font-sans text-base text-[var(--text-secondary)] leading-relaxed">
              Slate Origin is free and open-source. Slate Agentic will release as free software when ready.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/sheharanayanananda/Slate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--text-charcoal)] text-[var(--bg-warm)] px-6 py-3 rounded-[15px] font-sans font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Slate Origin — GitHub
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[var(--border-light)] text-[var(--text-secondary)] px-6 py-3 rounded-[15px] font-sans font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] hover:text-[var(--text-charcoal)]"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--border-light)] bg-[var(--card-bg)]">
        <div className="w-full px-12 md:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <div className="font-serif-anthropic text-base font-medium text-[var(--text-charcoal)]">Slate</div>
          <div className="font-mono-anthropic text-xs">A Thineth Shehara project · iOS · Swift/SwiftUI</div>
        </div>
      </footer>

    </div>
  );
}
