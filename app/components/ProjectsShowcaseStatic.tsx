import React from "react";

export default function ProjectsShowcaseStatic() {
  const featuredProjects = [
    {
      title: "Slate Agentic",
      category: "Native iOS · GenUI",
      heroTech: ["SwiftUI", "SwiftData", "Ollama Cloud", "GenUI"],
      description: "Intelligent notes app for iOS built with SwiftUI. Powered by cloud models from Ollama with token-by-token streaming and dynamic Generative UI (GenUI) widgets.",
      badge: "Active Priority",
      badgeType: "priority",
      repoStatus: "public"
    },
    {
      title: "UNiFY",
      category: "Mobile & Realtime · Sports",
      heroTech: ["Flutter", "Python / Flask", "WebSockets", "AWS"],
      description: "Contracted by a USA-based sports startup client. Powering NBA, WNBA, NFL, and NCAA fan communities with real-time live scoreboards, low-latency chat, and NFC wearables.",
      badge: "Client Platform",
      badgeType: "client",
      repoStatus: "private"
    },
    {
      title: "Slate Origin",
      category: "Native iOS · Local-First",
      heroTech: ["SwiftUI", "SwiftData", "VisionKit", "Local-First"],
      description: "Local-first native iOS writing and note-taking environment with encrypted storage and on-device document scanning. (Archived · Legacy Foundation)",
      badge: "Archived Foundation",
      badgeType: "archived",
      repoStatus: "public"
    },
    {
      title: "ECore Web & Mobile Automation",
      category: "Logistics & Mobile Lead",
      heroTech: ["Flutter", "Laravel", "WebSockets", "MySQL"],
      description: "Sole mobile lead for a Dutch logistics platform, giving field operators and managers live machinery tracking and workflow scheduling.",
      badge: "Client Platform",
      badgeType: "client",
      repoStatus: "private"
    },
    {
      title: "Deurbeslag Gigant",
      category: "Enterprise Full-Stack",
      heroTech: ["Laravel", "Livewire", "Meilisearch", "WooCommerce"],
      description: "Central inventory system for a Dutch hardware retailer, syncing 50,000+ products across 5+ WooCommerce stores and Bol.com without overselling.",
      badge: "Client Platform",
      badgeType: "client",
      repoStatus: "private"
    },
    {
      title: "BusinessLabels.nl (BBNL)",
      category: "B2B E-Commerce Frontend",
      heroTech: ["React", "Next.js", "Radix UI", "Laravel API"],
      description: "High-performance B2B shopping platform for industrial printers and custom labels across 50,000+ product options.",
      badge: "Client Platform",
      badgeType: "client",
      repoStatus: "private"
    }
  ];

  return (
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
            Featured Deployments
          </h3>
        </div>

        {/* Filter switcher capsule */}
        <div className="relative flex items-center gap-0.5 sm:gap-1 border border-[var(--border-light)] p-1 rounded-full bg-[var(--card-bg)]">
          {[
            { id: "featured", label: "Featured", mobileLabel: "Featured", active: true },
            { id: "swift", label: "Swift", mobileLabel: "Swift" },
            { id: "flutter", label: "Flutter", mobileLabel: "Flutter" },
            { id: "php", label: "PHP", mobileLabel: "PHP" },
            { id: "all", label: "All Work", mobileLabel: "All" }
          ].map(tab => (
            <span
              key={tab.id}
              className={`relative z-10 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-sans-anthropic font-semibold text-xs transition-colors duration-300 ${
                tab.active
                  ? "bg-[var(--accent-rust)] text-[var(--bg-warm)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="inline sm:hidden">{tab.mobileLabel}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Center-Aligned Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8 max-w-7xl xl:max-w-[1400px] mx-auto justify-center">
        {featuredProjects.map((proj) => {
          return (
            <div
              key={proj.title}
              className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group cursor-pointer"
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
  );
}
