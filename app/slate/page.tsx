"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function SlatePage() {
  const [mounted, setMounted] = useState(false);
  const [activeVersion, setActiveVersion] = useState<"origin" | "agentic">("origin");
  const [prevVersion, setPrevVersion] = useState<"origin" | "agentic">("origin");
  const [animDir, setAnimDir] = useState<"right" | "left">("right");
  const featureRef = useRef<HTMLDivElement>(null);
  const switcherContainerRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    if (v === "origin" || v === "agentic") {
      setActiveVersion(v);
      setPrevVersion(v);
    }
  }, []);

  useEffect(() => {
    if (mounted && switcherContainerRef.current) {
      const activeEl = switcherContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        setActiveRect({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    }
  }, [activeVersion, mounted]);

  const switchVersion = (v: "origin" | "agentic") => {
    if (v === activeVersion) return;
    setAnimDir(v === "agentic" ? "right" : "left");
    setPrevVersion(activeVersion);
    setActiveVersion(v);
  };

  const originFeatures = [
    {
      index: "01",
      title: "Rich Note Creation",
      description:
        "Format notes your way with Markdown support for headings, bold text, lists, and checklists you can toggle directly from the list view without opening the editor.",
    },
    {
      index: "02",
      title: "Smart Lens Visual AI",
      description:
        "Point your camera at any paper note, whiteboard, or receipt. On-device OCR grabs the text instantly and drops it into a clean, structured note.",
    },
    {
      index: "03",
      title: "AI Note Organiser",
      description:
        "Clean up messy drafts with a tap. Fix grammar mistakes, reorganize scattered thoughts, or summarize key ideas in place without leaving the editor.",
    },
    {
      index: "04",
      title: "Multi-type Sharing",
      description:
        "Export notes as PDFs, formatted RTFs, or share them to other apps using the native share sheet. Dark mode colors format automatically when exporting.",
    },
  ];

  const agenticFeatures = [
    {
      index: "01",
      title: "AI Chat Command Centre",
      description:
        "A clean chat view that connects directly to all your notes. Ask the assistant questions, ask it to summarize a thread, or draft new ideas from your saved info.",
    },
    {
      index: "02",
      title: "Cloud LLM Presets",
      description:
        "Quickly swap model settings for what you need. Choose from Balanced, Deep Reasoning, Creative Drafts, or Quick Fixes to match the task.",
    },
    {
      index: "03",
      title: "Rich File Attachments",
      description:
        "Drop in PDFs, Word docs, images, or ZIP files. The custom parser extracts the text instantly so your AI assistant can read and discuss them.",
    },
    {
      index: "04",
      title: "Formatted AI Output",
      description:
        "Everything renders cleanly with full Markdown and LaTeX support. Complex equations, tables, and code blocks scroll smoothly.",
    },
  ];

  const currentFeatures = activeVersion === "origin" ? originFeatures : agenticFeatures;

  const originStats = [
    { value: "iOS 17+", label: "Platform" },
    { value: "Swift", label: "Language" },
    { value: "MIT", label: "License" },
  ];

  const agenticStats = [
    { value: "iOS 17+", label: "Platform" },
    { value: "Swift", label: "Language" },
    { value: "Private", label: "License" },
  ];

  const currentStats = activeVersion === "origin" ? originStats : agenticStats;

  const originPullQuote =
    "A simple, clean note taking workflow where your data is stored locally and stays yours.";
  const agenticPullQuote =
    "A workspace that acts as a second brain, turning static text into active conversations.";

  const originTechStack = "Swift · SwiftUI · SwiftData · VisionKit · PDFKit";
  const agenticTechStack = "Swift · SwiftUI · MathJax · Ollama · SwiftData";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans-anthropic">
      <Header />

      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="min-h-[calc(100vh-69px)] flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 gap-10">

          {/* Eyebrow */}
          <div className="font-mono-anthropic text-[10px] tracking-[0.18em] uppercase text-[var(--text-charcoal)]">
            For iPhone · Swift / SwiftUI
          </div>

          {/* Wordmark + subhead */}
          <div className="space-y-6">
            <h1
              className="font-serif-anthropic font-normal leading-[0.92] text-[var(--text-charcoal)]"
              style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}
            >
              Slate
            </h1>
            <p className="font-serif-anthropic text-xl md:text-2xl font-normal text-[var(--text-charcoal)] opacity-60 leading-[1.5] max-w-sm mx-auto">
              Notes, but intelligent.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2">
            <a
              href="https://github.com/sheharanayanananda/Slate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--text-charcoal)] text-[var(--bg-warm)] border border-[var(--text-charcoal)] px-8 py-3 font-sans-anthropic font-semibold text-xs tracking-[0.05em] uppercase transition-all duration-300 hover:bg-transparent hover:text-[var(--text-charcoal)] rounded-xl"
            >
              <Github className="w-3.5 h-3.5" />
              View Origin
            </a>
            <a
              href="https://github.com/sheharanayanananda/Slate-V2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--text-charcoal)] text-[var(--text-charcoal)] bg-transparent px-8 py-3 font-sans-anthropic font-semibold text-xs tracking-[0.05em] uppercase transition-all duration-300 hover:bg-[var(--text-charcoal)] hover:text-[var(--bg-warm)] rounded-xl"
            >
              <Github className="w-3.5 h-3.5" />
              View Agentic
            </a>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-40">
            <div className="w-px h-10 bg-[var(--text-charcoal)]" />
            <span className="font-mono-anthropic text-[9px] tracking-[0.2em] uppercase">Explore</span>
          </div>
        </section>

        {/* ─── VERSION SWITCHER (sticky) ─── */}
        <div className="sticky top-[69px] z-40 flex justify-center py-4 pointer-events-none">
          <div
            ref={switcherContainerRef}
            className="relative inline-flex items-center gap-1 border border-[var(--border-light)] p-1 bg-[var(--bg-warm)]/90 backdrop-blur-sm pointer-events-auto rounded-full"
          >
            {/* Sliding background pill */}
            <div
              className="absolute top-1 bottom-1 bg-[var(--text-charcoal)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                left: `${activeRect.left}px`,
                width: `${activeRect.width}px`,
              }}
            />
            <button
              onClick={() => switchVersion("origin")}
              data-active={activeVersion === "origin"}
              className={`relative z-10 px-5 py-2 font-sans-anthropic font-semibold text-[11px] tracking-[0.04em] uppercase transition-colors duration-300 rounded-full ${
                activeVersion === "origin"
                  ? "text-[var(--bg-warm)]"
                  : "text-[#b0aea5] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Origin
            </button>
            <button
              onClick={() => switchVersion("agentic")}
              data-active={activeVersion === "agentic"}
              className={`relative z-10 px-5 py-2 font-sans-anthropic font-semibold text-[11px] tracking-[0.04em] uppercase transition-colors duration-300 rounded-full ${
                activeVersion === "agentic"
                  ? "text-[var(--bg-warm)]"
                  : "text-[#b0aea5] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Agentic
            </button>
          </div>
        </div>

        {/* ─── PRODUCT IDENTITY ─── */}
        <section className="bg-[var(--card-bg)] px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* App image */}
            <div
              key={activeVersion + "-image"}
              className={`relative w-full max-w-[420px] mx-auto lg:mx-0 aspect-square ${
                mounted
                  ? animDir === "right"
                    ? "animate-slide-blur-right"
                    : "animate-slide-blur-left"
                  : ""
              }`}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: "24px" }}
              >
                <Image
                  src="/slate_origin.webp"
                  alt={activeVersion === "origin" ? "Slate Origin — iOS App" : "Slate Agentic — iOS App"}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                  priority
                />
                {activeVersion === "agentic" && (
                  <div className="absolute inset-0 bg-[var(--bg-warm)]/75 backdrop-blur-md flex flex-col items-center justify-center gap-4">
                    <div className="font-mono-anthropic text-[10px] tracking-[0.18em] uppercase text-[var(--text-charcoal)]">
                      In development
                    </div>
                    <div className="font-serif-anthropic text-3xl font-normal text-[var(--text-charcoal)]">
                      Coming soon
                    </div>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)] opacity-60 text-center max-w-[220px] leading-relaxed">
                      Preview images will be available at launch.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: version identity */}
            <div className="space-y-10">
              {/* Version name + meta */}
              <div
                key={activeVersion + "-identity"}
                className={`space-y-3 ${
                  mounted
                    ? animDir === "right"
                      ? "animate-slide-blur-right"
                      : "animate-slide-blur-left"
                    : ""
                }`}
              >
                <div className="font-mono-anthropic text-[10px] tracking-[0.18em] uppercase text-[var(--text-charcoal)]">
                  {activeVersion === "origin" ? "Open Source · MIT License" : "Proprietary · Coming Soon"}
                </div>
                <h2 className="font-serif-anthropic text-4xl lg:text-5xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
                  Slate {activeVersion === "origin" ? "Origin" : "Agentic"}
                </h2>
                <p className="font-serif-anthropic text-lg font-normal text-[var(--text-charcoal)] opacity-70 leading-[1.7] max-w-sm">
                  {activeVersion === "origin"
                    ? "The original Slate. A fast, private notes app for iOS. Completely offline-first, markdown-native, and fully open source."
                    : "Rebuilt for the AI era. Slate Agentic brings a helper right into your workspace that knows your notes and can research, organize, and summarize them."}
                </p>
              </div>

              {/* Hairline divider */}
              <div className="border-t border-[var(--border-light)]" />

              {/* Stats row */}
              <div
                key={activeVersion + "-identity-stats"}
                className={`grid grid-cols-3 gap-6 ${
                  mounted
                    ? animDir === "right"
                      ? "animate-slide-blur-right"
                      : "animate-slide-blur-left"
                    : ""
                }`}
              >
                {currentStats.map((stat) => (
                  <div key={stat.label} className="space-y-1.5">
                    <div className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">
                      {stat.value}
                    </div>
                    <div className="font-mono-anthropic text-[10px] tracking-[0.16em] uppercase text-[var(--text-charcoal)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28">
          <div className="max-w-5xl mx-auto space-y-16">

            {/* Section header */}
            <div
              key={activeVersion + "-features-header"}
              className={`space-y-2 ${
                mounted
                  ? animDir === "right"
                    ? "animate-slide-blur-right"
                    : "animate-slide-blur-left"
                  : ""
              }`}
            >
              <div className="font-mono-anthropic text-[10px] tracking-[0.18em] uppercase text-[var(--text-charcoal)]">
                {activeVersion === "origin" ? "Core capabilities" : "Agentic capabilities"}
              </div>
              <h2 className="font-serif-anthropic text-3xl lg:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.15]">
                {activeVersion === "origin"
                  ? "Intelligent notes, built for clarity."
                  : "Your notes. Now with an AI agent."}
              </h2>
            </div>

            {/* Feature list — no card boxes, pure typography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {currentFeatures.map((feature, i) => (
                <div
                  key={feature.index}
                  className={`py-8 pr-0 md:pr-12 border-t border-[var(--border-light)] ${
                    i % 2 === 1 ? "md:border-l md:pl-12" : ""
                  }`}
                >
                  <div
                    key={activeVersion + "-" + feature.index}
                    className={`space-y-3 ${
                      mounted
                        ? animDir === "right"
                          ? "animate-slide-blur-right"
                          : "animate-slide-blur-left"
                        : ""
                    }`}
                  >
                    <div className="font-mono-anthropic text-[10px] tracking-[0.16em] uppercase text-[var(--accent-rust)]">
                      {feature.index}
                    </div>
                    <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">
                      {feature.title}
                    </h3>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)] opacity-70 leading-[1.7]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* Bottom border line under all features */}
              <div className="col-span-1 md:col-span-2 border-t border-[var(--border-light)]" />
            </div>

          </div>
        </section>

        {/* ─── PULL QUOTE / ARCHITECTURE STRIP ─── */}
        <section
          className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28"
          style={{ backgroundColor: "#f5e3c7" }}
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <blockquote
              key={activeVersion + "-quote"}
              className={`font-serif-anthropic font-normal text-[var(--text-charcoal)] leading-[1.2] ${
                mounted
                  ? animDir === "right"
                    ? "animate-slide-blur-right"
                    : "animate-slide-blur-left"
                  : ""
              }`}
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              "{activeVersion === "origin" ? originPullQuote : agenticPullQuote}"
            </blockquote>
            <div className="border-t border-[var(--text-charcoal)]/15 pt-6">
              <div className="font-mono-anthropic text-[10px] tracking-[0.18em] uppercase text-[var(--text-charcoal)]">
                {activeVersion === "origin" ? originTechStack : agenticTechStack}
              </div>
            </div>
          </div>
        </section>

        {/* ─── DARK CTA STRIP ─── */}
        <section
          className="px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28"
          style={{ backgroundColor: "#141413" }}
        >
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* Left: statement */}
            <div className="space-y-3 max-w-lg">
              <h2 className="font-serif-anthropic text-3xl lg:text-4xl font-normal leading-[1.15]" style={{ color: "#f0eee6" }}>
                Built for iOS.<br />Open source.
              </h2>
              <p className="font-serif-anthropic text-base leading-[1.7]" style={{ color: "#b0aea5" }}>
                Slate Origin is fully open source. Slate Agentic is in the works and will be free when it launches.
              </p>
            </div>

            {/* Right: actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://github.com/sheharanayanananda/Slate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--accent-rust)] hover:bg-[var(--accent-rust-hover)] px-8 py-3 font-sans-anthropic font-semibold text-xs tracking-[0.05em] uppercase text-white transition-colors rounded-xl"
              >
                <Github className="w-3.5 h-3.5" />
                Slate Origin on GitHub
              </a>
              <Link
                href="/"
                className="underline-hover font-sans-anthropic font-medium text-xs tracking-[0.05em] uppercase transition-colors"
                style={{ color: "#b0aea5" }}
              >
                ← Back to Portfolio
              </Link>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
