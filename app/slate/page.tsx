"use client";

import { useEffect, useState, useRef } from "react";
import { Github } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DuskMoon from "../components/DuskMoon";
import ButterfliesS from "../components/ButterfliesS";
import FallingAsteroids from "../components/FallingAsteroids";

export default function SlatePage() {
  const [mounted, setMounted] = useState(false);
  const [activeVersion, setActiveVersion] = useState<"origin" | "genesis">("genesis");
  const [prevVersion, setPrevVersion] = useState<"origin" | "genesis">("genesis");
  const [animDir, setAnimDir] = useState<"right" | "left">("right");
  const featureRef = useRef<HTMLDivElement>(null);
  const switcherContainerRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const v = params.get("v");
    if (v === "origin") {
      setActiveVersion("origin");
      setPrevVersion("origin");
    } else if (v === "genesis" || v === "agentic") {
      setActiveVersion("genesis");
      setPrevVersion("genesis");
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

  const switchVersion = (v: "origin" | "genesis") => {
    if (v === activeVersion) return;
    setAnimDir(v === "origin" ? "right" : "left");
    setPrevVersion(activeVersion);
    setActiveVersion(v);
  };

  const genesisFeatures = [
    {
      index: "01",
      title: "Hybrid Block Canvas & Special Blocks",
      description:
        "Clean separation between natural writing in NativeTextView and isolated visual cards for code blocks with syntax highlighting & diffs, multi-column tables, offline KaTeX equations, and GitHub-style alerts with proxy backspace deletion.",
    },
    {
      index: "02",
      title: "Three Tuned Model Tiers (Flash, Creative, Pro)",
      description:
        "Token-by-token async streaming powered by cloud models from Ollama. Three specialized tiers: Slate Flash (8K context, 0.25 temp) for quick tasks, Slate Creative (16K context, 0.85 temp) for brainstorming, and Slate Pro (32K context, 0.15 temp) for deep reasoning.",
    },
    {
      index: "03",
      title: "One-Tap \"Turn Chat into Notes\"",
      description:
        "Converts any AI assistant response into a clean, permanent note with one tap. Strips conversational noise, enforces emoji-free titles (max 3 words), links persistent slateNoteId tracking, and pulses the Home tab with an unread badge.",
    },
    {
      index: "04",
      title: "Pure-Swift Ingestion & Offline KaTeX",
      description:
        "Hand-rolled pure-Swift binary ZIP decompressor using Apple's Compression framework (COMPRESSION_ZLIB) and SAX XML parsing for DOCX and XLSX spreadsheets without external packages, paired with bundled offline KaTeX equation rendering.",
    },
  ];

  const originFeatures = [
    {
      index: "01",
      title: "Bidirectional Editor & Checkboxes",
      description:
        "Custom UITextView wrapper with a bidirectional NSAttributedString serializer. Interactive SF Symbol checkboxes with surgical hit-testing to check and uncheck items directly in the text view.",
    },
    {
      index: "02",
      title: "Smart Lens Visual AI",
      description:
        "Point your camera at paper notes, whiteboards, or receipts. VisionKit document scanning with automatic perspective correction, on-device OCR, and scene classification to create structured notes.",
    },
    {
      index: "03",
      title: "AI Note Organizer & Typewriter Streaming",
      description:
        "One-tap AI restructuring that analyzes raw drafts, cleans up syntax, removes duplicates, and organizes thoughts into structured outlines with a live typewriter effect and soft haptic feedback.",
    },
    {
      index: "04",
      title: "Local-First SwiftData & Native Export",
      description:
        "Complete offline note persistence using SwiftData with zero cloud lock-in. Native multi-format export generating A4 PDFs via PDFKit, formatted Rich Text (RTF), or plain text with swift swipe actions.",
    },
  ];

  const currentFeatures = activeVersion === "genesis" ? genesisFeatures : originFeatures;

  const genesisStats = [
    { value: "iOS 26+", label: "Platform" },
    { value: "Swift", label: "Language" },
    { value: "Source-Available", label: "License" },
  ];

  const originStats = [
    { value: "iOS 26+", label: "Platform" },
    { value: "Swift", label: "Language" },
    { value: "Source-Available", label: "License" },
  ];

  const currentStats = activeVersion === "genesis" ? genesisStats : originStats;

  const genesisPullQuote =
    "Notes shouldn't require manual formatting or complex syntax. Brainstorm with cloud AI, extract structured notes with a tap, and write on a distraction-free canvas.";
  const originPullQuote =
    "A local-first, distraction-free native writing environment where your thoughts are encrypted, private, and entirely yours.";

  const genesisTechStack = "Swift · SwiftUI · SwiftData · Ollama Cloud API · WebKit (KaTeX) · Compression · PDFKit · Apple Security";
  const originTechStack = "Swift · SwiftUI · SwiftData · VisionKit · PDFKit · Apple Security";

  const isGenesis = activeVersion === "genesis";

  return (
    <div
      className={`min-h-screen flex flex-col font-sans-anthropic transition-colors duration-700 ease-out ${
        isGenesis
          ? "bg-[#faf9f5] text-[#141413] selection:bg-[#749bd0]/25 selection:text-[#141413]"
          : "bg-[#f0eee6] text-[#141413] selection:bg-[#d97757]/20 selection:text-[#141413]"
      }`}
    >
      <Header />

      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="min-h-[calc(100vh-69px)] flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 gap-10">

          {/* Eyebrow */}
          <div className="font-mono-anthropic text-[10px] tracking-[0.18em] uppercase text-[var(--text-charcoal)]">
            Built For iPhone With Swift
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
              href="https://github.com/sheharanayanananda/Slate/tree/v2"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-8 py-3 font-sans-anthropic font-semibold text-xs tracking-[0.05em] uppercase transition-all duration-300 rounded-xl ${
                isGenesis
                  ? "bg-[#749bd0] text-[#faf9f5] hover:bg-[#5d85be] shadow-sm"
                  : "bg-transparent text-[#141413] border border-[#141413] hover:bg-[#141413] hover:text-[#f0eee6]"
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              View Genesis
            </a>
            <a
              href="https://github.com/sheharanayanananda/Slate"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-8 py-3 font-sans-anthropic font-semibold text-xs tracking-[0.05em] uppercase transition-all duration-300 rounded-xl ${
                !isGenesis
                  ? "bg-[#d97757] text-[#faf9f5] hover:bg-[#c6613f] shadow-sm"
                  : "bg-transparent text-[#141413] border border-[#141413] hover:bg-[#141413] hover:text-[#faf9f5]"
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              View Origin
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
            className={`relative inline-flex items-center gap-1 border p-1 shadow-[0_4px_20px_rgba(0,0,0,0.04)] pointer-events-auto rounded-full transition-colors duration-500 backdrop-blur-md ${
              isGenesis
                ? "border-[#749bd0]/30 bg-[#faf9f5]/85"
                : "border-[#d97757]/30 bg-[#f0eee6]/85"
            }`}
          >
            {/* Sliding background pill */}
            <div
              className={`absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isGenesis ? "bg-[#749bd0]" : "bg-[#d97757]"
              }`}
              style={{
                left: `${activeRect.left}px`,
                width: `${activeRect.width}px`,
              }}
            />
            <button
              onClick={() => switchVersion("genesis")}
              data-active={activeVersion === "genesis"}
              className={`relative z-10 px-5 py-2 font-sans-anthropic font-semibold text-[11px] tracking-[0.04em] uppercase transition-colors duration-300 rounded-full ${
                activeVersion === "genesis"
                  ? "text-[#faf9f5]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Genesis
            </button>
            <button
              onClick={() => switchVersion("origin")}
              data-active={activeVersion === "origin"}
              className={`relative z-10 px-5 py-2 font-sans-anthropic font-semibold text-[11px] tracking-[0.04em] uppercase transition-colors duration-300 rounded-full ${
                activeVersion === "origin"
                  ? "text-[#faf9f5]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-charcoal)]"
              }`}
            >
              Origin
            </button>
          </div>
        </div>

        {/* ─── PRODUCT IDENTITY ─── */}
        <section
          className={`px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28 transition-colors duration-700 ease-out ${
            isGenesis ? "bg-[#faf9f5]" : "bg-[#f5e6ce]/40"
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Visual: 3D Photometric Dusk Moon in Genesis vs. 3D Butterflies "S" in Origin */}
            <div
              key={activeVersion + "-visual"}
              className={`relative w-full max-w-[420px] mx-auto lg:mx-0 aspect-square ${
                mounted
                  ? animDir === "right"
                    ? "animate-slide-blur-right"
                    : "animate-slide-blur-left"
                  : ""
              }`}
            >
              {isGenesis ? (
                /* Genesis Visual: Dawn Sky Moon Frame */
                <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#749bd0] shadow-[0_8px_32px_rgba(116,155,208,0.22)] border border-[#749bd0]/30 flex flex-col items-center justify-between p-6 sm:p-7 select-none">
                  {/* Layer 0: Sky background */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-b from-[#749bd0] via-[#749bd0] to-[#5d85be] pointer-events-none z-0"
                  />

                  {/* Layer 1: Moon (Celestial body) */}
                  <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
                    <DuskMoon
                      phase={0.76}
                      angle={-45}
                      opacity={0.88}
                      className="w-[160px] h-[160px] sm:w-[190px] sm:h-[190px]"
                    />
                  </div>

                  {/* Layer 2: Shooting stars / Asteroids (Atmospheric entry) */}
                  <FallingAsteroids className="z-[2]" />

                  {/* Layer 3: Letters and UI Text */}
                  <div className="relative z-10 w-full flex items-center justify-between shrink-0">
                    <span className="font-mono-anthropic text-[10px] tracking-[0.2em] uppercase text-[#faf9f5]/80 font-bold">
                      SLATE V2
                    </span>
                    <span className="font-mono-anthropic text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#faf9f5]/15 text-[#faf9f5] font-semibold backdrop-blur-sm">
                      Genesis
                    </span>
                  </div>

                  {/* Center vertical spacer */}
                  <div className="flex-1 w-full min-h-0" />

                  {/* Footer Highlights */}
                  <div className="relative z-10 w-full text-center space-y-1 shrink-0 pt-2">
                    <div className="font-serif-anthropic text-lg sm:text-xl text-[#faf9f5] font-normal leading-tight">
                      Genesis Workspace
                    </div>
                    <div className="font-mono-anthropic text-[10px] tracking-wider text-[#faf9f5]/75">
                      Hybrid Block Canvas &middot; 3 AI Tiers
                    </div>
                  </div>
                </div>
              ) : (
                /* Origin Visual: Warm Academia Parchment with 3D Flapping Butterflies "S" */
                <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#f5e6ce] shadow-[0_8px_32px_rgba(20,20,19,0.06)] border border-[#d97757]/25 flex flex-col items-center justify-between p-6 sm:p-7 select-none">
                  {/* Header Badge */}
                  <div className="relative z-10 w-full flex items-center justify-between shrink-0">
                    <span className="font-mono-anthropic text-[10px] tracking-[0.2em] uppercase text-[#d97757] font-bold">
                      SLATE V1
                    </span>
                    <span className="font-mono-anthropic text-[10px] tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#141413]/5 text-[#141413]/80 font-semibold">
                      Origin
                    </span>
                  </div>

                  {/* 3D Animated Butterflies "S" Centerpiece */}
                  <div className="relative z-10 flex-1 w-full flex items-center justify-center min-h-0 py-1">
                    <div className="w-[145px] sm:w-[165px]">
                      <ButterfliesS />
                    </div>
                  </div>

                  {/* Footer Highlights */}
                  <div className="relative z-10 w-full text-center space-y-1 shrink-0 pt-2">
                    <div className="font-serif-anthropic text-lg sm:text-xl text-[#141413] font-normal leading-tight">
                      Foundational Notebook
                    </div>
                    <div className="font-mono-anthropic text-[10px] tracking-wider text-[#141413]/65">
                      SwiftData &middot; VisionKit &middot; Offline First
                    </div>
                  </div>
                </div>
              )}
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
                <div
                  className={`font-mono-anthropic text-[10px] tracking-[0.18em] uppercase font-bold ${
                    isGenesis ? "text-[#749bd0]" : "text-[#d97757]"
                  }`}
                >
                  Proprietary &middot; Source-Available
                </div>
                <h2 className="font-serif-anthropic text-4xl lg:text-5xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
                  Slate {activeVersion === "origin" ? "Origin" : "Genesis"}
                </h2>
                <p className="font-serif-anthropic text-lg font-normal text-[var(--text-charcoal)] opacity-75 leading-[1.7] max-w-sm">
                  {activeVersion === "origin"
                    ? "The foundational Slate experience. A local-first, distraction-free native iOS notebook built on SwiftData with Apple VisionKit camera scanning, a custom bidirectional Markdown editor with interactive checklist hit-testing, and an AI note organizer with typewriter streaming."
                    : "Rebuilt from the ground up for modern AI knowledge workflows. Slate Genesis pairs a distraction-free hybrid block editor with cloud models from Ollama, one-tap note generation from conversation, offline KaTeX equations, and pure-Swift document ingestion."}
                </p>
              </div>

              {/* Hairline divider */}
              <div
                className={`border-t ${
                  isGenesis ? "border-[#749bd0]/25" : "border-[#d97757]/25"
                }`}
              />

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
                    <div className="font-mono-anthropic text-[10px] tracking-[0.16em] uppercase text-[var(--text-charcoal)] opacity-70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section
          className={`px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28 transition-colors duration-700 ease-out ${
            isGenesis ? "bg-[#faf9f5]" : "bg-[#f0eee6]"
          }`}
        >
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
              <div
                className={`font-mono-anthropic text-[10px] tracking-[0.18em] uppercase font-bold ${
                  isGenesis ? "text-[#749bd0]" : "text-[#d97757]"
                }`}
              >
                {activeVersion === "origin" ? "Core capabilities" : "Genesis capabilities"}
              </div>
              <h2 className="font-serif-anthropic text-3xl lg:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.15]">
                {activeVersion === "origin"
                  ? "Intelligent notes, built for clarity."
                  : "Your notes. Rebuilt for the AI era."}
              </h2>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {currentFeatures.map((feature, i) => (
                <div
                  key={feature.index}
                  className={`py-8 pr-0 md:pr-12 border-t ${
                    isGenesis ? "border-[#749bd0]/20" : "border-[var(--border-light)]"
                  } ${
                    i % 2 === 1
                      ? isGenesis
                        ? "md:border-l md:border-[#749bd0]/20 md:pl-12"
                        : "md:border-l md:border-[var(--border-light)] md:pl-12"
                      : ""
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
                    <div
                      className={`font-mono-anthropic text-[10px] tracking-[0.16em] uppercase font-bold ${
                        isGenesis ? "text-[#749bd0]" : "text-[#d97757]"
                      }`}
                    >
                      {feature.index}
                    </div>
                    <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">
                      {feature.title}
                    </h3>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)] opacity-75 leading-[1.7]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              {/* Bottom border line under all features */}
              <div
                className={`col-span-1 md:col-span-2 border-t ${
                  isGenesis ? "border-[#749bd0]/20" : "border-[var(--border-light)]"
                }`}
              />
            </div>

          </div>
        </section>

        {/* ─── PULL QUOTE / ARCHITECTURE STRIP ─── */}
        <section
          className={`px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 lg:py-28 transition-colors duration-700 ease-out border-y ${
            isGenesis
              ? "bg-[#749bd0]/10 border-[#749bd0]/25"
              : "bg-[#f5e6ce] border-[#d97757]/20"
          }`}
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
              "{activeVersion === "origin" ? originPullQuote : genesisPullQuote}"
            </blockquote>
            <div
              className={`border-t pt-6 ${
                isGenesis ? "border-[#749bd0]/25" : "border-[#141413]/15"
              }`}
            >
              <div className="font-mono-anthropic text-[10px] tracking-[0.18em] uppercase text-[var(--text-charcoal)]">
                {activeVersion === "origin" ? originTechStack : genesisTechStack}
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
              <h2 className="font-serif-anthropic text-3xl lg:text-4xl font-normal leading-[1.15] text-[#faf9f5]">
                Built for iOS.<br />Crafted with precision.
              </h2>
              <p className="font-serif-anthropic text-base leading-[1.7] text-[#faf9f5]/75">
                Both Slate Origin and Slate Genesis are source-available for personal study, code inspection, and architectural evaluation. Explore the full implementations on GitHub.
              </p>
            </div>

            {/* Right: actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://github.com/sheharanayanananda/Slate/tree/v2"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-3 font-sans-anthropic font-semibold text-xs tracking-[0.05em] uppercase transition-colors rounded-xl ${
                  isGenesis
                    ? "bg-[#749bd0] hover:bg-[#5d85be] text-[#faf9f5]"
                    : "border border-white/20 hover:border-white/40 text-[#faf9f5]"
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                Slate Genesis
              </a>
              <a
                href="https://github.com/sheharanayanananda/Slate"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-3 font-sans-anthropic font-semibold text-xs tracking-[0.05em] uppercase transition-colors rounded-xl ${
                  !isGenesis
                    ? "bg-[#d97757] hover:bg-[#c6613f] text-[#faf9f5]"
                    : "border border-white/20 hover:border-white/40 text-[#faf9f5]"
                }`}
              >
                <Github className="w-3.5 h-3.5" />
                Slate Origin
              </a>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
