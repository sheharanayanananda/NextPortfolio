"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import Footer from "../components/Footer";

export default function SlatePage() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeVersion, setActiveVersion] = useState<"origin" | "agentic">("origin");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    if (v === "origin" || v === "agentic") {
      setActiveVersion(v);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

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
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans-anthropic">

      {/* ─── Header (shared with portfolio) ─── */}
      <header className="sticky top-0 z-50 bg-[var(--bg-warm)] border-b border-[var(--border-light)]">
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-sans-anthropic text-xs font-bold tracking-widest uppercase hover:text-[var(--accent-rust)] transition-colors ease-in-out duration-300"
          >
            Shehara
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-sm font-medium tracking-tight">
            <Link href="/#hero" className="underline-hover text-xs font-sans-anthropic font-semibold tracking-[-0.24px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Home</Link>
            <Link href="/#about" className="underline-hover text-xs font-sans-anthropic font-semibold tracking-[-0.24px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">About</Link>
            <Link href="/slate" className="underline-hover text-[var(--text-charcoal)] transition-colors">Slate</Link>
            <Link href="/#projects" className="underline-hover text-xs font-sans-anthropic font-semibold tracking-[-0.24px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Projects</Link>
            <Link href="/#experience" className="underline-hover text-xs font-sans-anthropic font-semibold tracking-[-0.24px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Experience</Link>
            <Link href="/#education" className="underline-hover text-xs font-sans-anthropic font-semibold tracking-[-0.24px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Education</Link>
            <Link href="/#updates" className="underline-hover text-xs font-sans-anthropic font-semibold tracking-[-0.24px] uppercase text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors">Updates</Link>
          </nav>

          
        </div>
      </header>

      <main className="flex-1">

        {/* ─── Hero ─── */}
        <section className="min-h-[calc(100vh-69px)] flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 gap-8">
          <div className="space-y-2">
            <div className="font-sans-anthropic text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              For iPhone · Swift / SwiftUI
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif-anthropic text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] 2xl:text-[14rem] font-normal leading-none text-[var(--text-charcoal)]">
              Slate
            </h1>
            <p className="font-serif-anthropic text-[20px] text-[var(--text-charcoal)] leading-[1.4]">
              Notes, but intelligent.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="https://github.com/sheharanayanananda/Slate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--accent-rust)] text-[var(--bg-warm)] hover:bg-[var(--accent-rust-hover)] px-6 py-4 rounded-xl font-sans-anthropic font-semibold text-xs tracking-[-0.08px] uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Github className="w-4 h-4" />
              View Origin on GitHub
            </a>
            <a
              href="https://github.com/sheharanayanananda/Slate-V2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--border-light)] text-[var(--text-charcoal)] px-6 py-4 rounded-xl font-sans-anthropic font-semibold text-xs tracking-[-0.08px] uppercase transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-[var(--card-bg)]"
            >
              <Github className="w-4 h-4" />
              View Agentic on GitHub
            </a>
          </div>
        </section>

        <div className="sticky top-[69px] z-40 flex justify-center py-4 pointer-events-none">
          <div className="flex items-center gap-1 border border-[var(--border-light)] p-1 rounded-2xl bg-[var(--card-bg)] pointer-events-auto transition-shadow duration-300">
            <button
              onClick={() => setActiveVersion("origin")}
              className={`px-6 py-2 rounded-xl font-sans-anthropic font-semibold text-xs transition-all duration-200 ${
                activeVersion === "origin"
                  ? "bg-[var(--accent-rust)] text-[var(--bg-warm)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Slate Origin
            </button>
            <button
              onClick={() => setActiveVersion("agentic")}
              className={`px-6 py-2 rounded-xl font-sans-anthropic font-semibold text-xs transition-all duration-200 ${
                activeVersion === "agentic"
                  ? "bg-[var(--accent-rust)] text-[var(--bg-warm)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Slate Agentic
            </button>
          </div>
        </div>

        {/* ─── App Image ─── */}
        <section className="flex flex-col items-center justify-center px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16 lg:py-24 gap-6">
          <div className="relative w-full max-w-[520px] aspect-square">
            <div className="relative w-full h-full rounded-3xl overflow-hidden" style={{ borderRadius: "24px" }}>
              <Image
                src="/slate_origin.png"
                alt={activeVersion === "origin" ? "Slate Origin — iOS App" : "Slate Agentic — iOS App"}
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover"
                priority
              />
              {/* Coming Soon overlay for Agentic */}
              {activeVersion === "agentic" && (
                <div className="absolute inset-0 bg-[var(--bg-warm)]/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <div className="font-sans-anthropic text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                    In Development
                  </div>
                  <div className="font-serif-anthropic text-2xl lg:text-3xl xl:text-4xl font-normal text-[var(--text-charcoal)]">
                    Coming Soon
                  </div>
                  <p className="font-sans-anthropic text-sm text-[var(--text-charcoal)] text-center max-w-xs leading-relaxed">
                    Slate Agentic is currently in active development. A preview image will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Version label */}
          <div className="text-center space-y-1">
            <div className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">
              {activeVersion === "origin" ? "Slate Origin" : "Slate Agentic"}
            </div>
            <div className="font-sans-anthropic text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              {activeVersion === "origin" ? "Open Source · MIT License" : "Free Software · Coming Soon"}
            </div>
          </div>
        </section>

        {/* ─── Feature Grid ─── */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 pb-20 lg:pb-28">
          <div className="max-w-5xl mx-auto space-y-16">

            {/* Section header */}
            <div className="text-center space-y-3">
              <div className="font-sans-anthropic text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                {activeVersion === "origin" ? "Core Features" : "Agentic Capabilities"}
              </div>
              <h2 className="font-serif-anthropic text-3xl lg:text-4xl xl:text-5xl font-normal text-[var(--text-charcoal)]">
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
                  className="border border-[var(--border-light)] rounded-3xl p-8 space-y-4 hover:border-[var(--accent-rust)] transition-all duration-200"
                >
                  <div className="font-mono-anthropic text-xs text-[var(--accent-rust)] tracking-widest uppercase">
                    {feature.index}
                  </div>
                  <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">
                    {feature.title}
                  </h3>
                  <p className="font-sans-anthropic text-sm text-[var(--text-charcoal)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section className="border-t border-[var(--border-light)] py-20 lg:py-28 flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 gap-10">
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-serif-anthropic text-3xl lg:text-4xl xl:text-5xl font-normal text-[var(--text-charcoal)]">
              Built for iOS. Open to everyone.
            </h2>
            <p className="font-sans-anthropic text-base text-[var(--text-charcoal)] leading-relaxed">
              Slate Origin is free and open-source. Slate Agentic will release as free software when ready.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/sheharanayanananda/Slate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--accent-rust)] text-[var(--bg-warm)] hover:bg-[var(--accent-rust-hover)] px-6 py-4 rounded-xl font-sans-anthropic font-semibold text-xs tracking-[-0.08px] uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Slate Origin — GitHub
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[var(--border-light)] text-[var(--text-secondary)] px-6 py-4 rounded-xl font-sans-anthropic font-semibold text-xs tracking-[-0.08px] uppercase transition-all hover:scale-[1.02] active:scale-[0.98] hover:text-[var(--text-charcoal)]"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
