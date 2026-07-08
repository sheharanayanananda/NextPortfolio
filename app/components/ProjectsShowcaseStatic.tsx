import React from "react";

export default function ProjectsShowcaseStatic() {
  const featuredProjects = [
    {
      title: "UNiFY",
      tech: ["Flutter", "Dart", "Python", "Flask", "PostgreSQL", "WebSockets", "Redis", "AWS", "Stripe", "NFC"],
      description: "Backend and Mobile engineer for a multi-platform sports app (NBA, WNBA, NFL, NCAA). Refactored key modules, built real-time WebSocket messaging and scores, and integrated NFC 'Baller Band' support.",
      repoStatus: "private"
    },
    {
      title: "Deurbeslag Gigant",
      tech: ["PHP", "Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL"],
      description: "Centralized e-commerce inventory and order management system for a Dutch retail platform. Automated legacy workflows, synchronized real-time stocks across external APIs, and designed filament-driven V2 interfaces.",
      repoStatus: "private"
    },
    {
      title: "ECore Web & Mobile Automation",
      tech: ["PHP", "Laravel", "Flutter", "Dart", "MySQL", "REST APIs"],
      description: "Enterprise system for BetonStorten.nl automating concrete order logistics, heavy machinery, work orders, and personnel planning with custom algorithmic tracking and real-time syncing.",
      repoStatus: "private"
    }
  ];

  return (
    <section id="projects" className="py-16 md:py-0 md:pt-24 space-y-12 scroll-mt-[69px]">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-10 text-center max-w-3xl mx-auto">
        <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
          Proudly
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
            { id: "all", label: "All Work", mobileLabel: "All" },
            { id: "featured", label: "Featured", mobileLabel: "Featured", active: true },
            { id: "laravel", label: "Laravel/PHP", mobileLabel: "Laravel" },
            { id: "flutter", label: "Flutter", mobileLabel: "Flutter" }
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

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredProjects.map(proj => {
          return (
            <div
              key={proj.title}
              className="group flex flex-col justify-between border border-[var(--border-light)]/40 rounded-3xl p-6 md:p-8 lg:p-10 bg-[var(--card-bg)] transition-all duration-300 ease-out space-y-8 cursor-pointer hover:bg-[var(--card-hover-bg)] hover:border-[var(--text-secondary)]/60 hover:-translate-y-1"
            >
              <div className="space-y-5">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                    {proj.title}
                  </h4>
                  <span className="shrink-0 whitespace-nowrap text-[9px] tracking-wider font-mono-anthropic px-2.5 py-0.5 rounded-full uppercase font-medium border bg-[var(--text-secondary)]/5 border-[var(--text-secondary)]/30 text-[var(--text-secondary)]">
                    Private
                  </span>
                </div>

                <p className="text-base text-[var(--text-charcoal)] leading-relaxed font-sans-anthropic">
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
  );
}
