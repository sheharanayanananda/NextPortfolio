import { MapPin, Download, AtSign, Linkedin, Github } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SlateShowcaseLazy from "./components/SlateShowcaseLazy";
import TypingGreeting from "./components/TypingGreeting";
import ProjectsShowcase from "./components/ProjectsShowcase";
import MorningSkyHero from "./components/MorningSkyHero";
import FallingAsteroids from "./components/FallingAsteroids";
import DuskMoon from "./components/DuskMoon";
import TreeBranches from "./components/TreeBranches";
import { HIRE_MAILTO_URL } from "./lib/email";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans-anthropic selection:bg-[var(--highlight-selection)] selection:text-[var(--text-charcoal)]">
      {/* Navigation Header */}
      <Header />

      {/* HERO / WELCOME SECTION */}
      <section
        id="hero"
        className="relative flex-1 min-h-screen -mt-[69px] pt-[69px] pb-16 md:pb-20 flex items-center w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 scroll-mt-[69px] bg-[#749bd0]"
      >
        {/* Layer 1: Moon (Furthest celestial body in deep space) */}
        <div className="absolute top-24 sm:top-28 md:top-32 lg:top-36 right-8 sm:right-14 md:right-20 lg:right-28 xl:right-36 z-[1] pointer-events-none select-none">
          <DuskMoon
            phase={0.76}
            angle={-45}
            opacity={0.72}
            className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] lg:w-[210px] lg:h-[210px]"
          />
        </div>

        {/* Layer 2: Shooting stars / Meteors (Atmospheric entry in upper mesosphere, in front of moon) */}
        <FallingAsteroids className="z-[2]" />

        {/* Layer 3: Atmosphere / Morning Blue Sky background */}
        <MorningSkyHero />

        {/* Layer 4: Tree branches (Foreground natural bokeh framing) */}
        <TreeBranches />

        {/* Layer 5: Letters and text typography */}
        <div className="relative z-10 w-full max-w-4xl py-12 md:py-20 flex flex-col gap-3">
          <div className="flex flex-col gap-8">
            <div className="font-mono-anthropic text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.25rem] font-semibold tracking-tight text-[#faf9f5]/85 flex items-center flex-wrap">
              <TypingGreeting />
              <span className="ml-3">I'm</span>
            </div>
            <h1 className="font-serif-anthropic text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[11.5rem] font-normal leading-[1.05] text-[#faf9f5]">
              Thineth
            </h1>
          </div>

          <p className="font-sans-anthropic text-xl text-[#faf9f5]/90 leading-[1.7] font-normal max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-7">
            Building apps that people love to use. Software Engineer and student at TAMK crafting fast mobile apps, simple web tools, and reliable real-time systems with care.
          </p>

          {/* Inline contact icons: universal across all breakpoints */}
          <div className="flex items-center gap-6 mt-6 text-[#faf9f5]">
            <a
              href={HIRE_MAILTO_URL}
              data-contact-trigger="true"
              className="hover:opacity-75 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Email Me"
            >
              <AtSign className="w-6 h-6" strokeWidth={2} />
            </a>
            <a
              href="https://www.linkedin.com/in/thineth-nayanananda-54815b228/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-[22px] h-[22px]" strokeWidth={2} />
            </a>
            <a
              href="https://github.com/sheharanayanananda"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" strokeWidth={2} />
            </a>
          </div>

          <div className="flex flex-col gap-10 pt-14">
            <div className="flex items-center gap-2 text-[#faf9f5]/85">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="font-mono-anthropic tracking-tight">Tampere, Finland</span>
            </div>

            <a
              href={HIRE_MAILTO_URL}
              data-contact-trigger="true"
              className="inline-flex w-fit items-center gap-4 bg-[#faf9f5] text-[#141413] hover:bg-white px-6 py-4 rounded-xl font-sans-anthropic font-semibold text-xs tracking-[-0.08px] uppercase transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_8px_24px_rgba(20,40,70,0.18)]"
              aria-label="Open to work - email me"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-blinker-glow absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-rust)]"></span>
              </span>
              <span className="tracking-tight font-mono-anthropic">Open To Work</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="relative flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-0 md:gap-16 lg:gap-20 xl:gap-24 2xl:gap-25 -mt-[1px]">
        {/* Seamless Ultra-Smooth Sky Fadeout spanning from the end of Hero into Bio */}
        <div
          aria-hidden="true"
          className="absolute -top-[240px] left-0 right-0 h-[740px] pointer-events-none select-none z-0"
          style={{
            background:
              "linear-gradient(in oklab, #749bd0 0%, #749bd0 6%, #769cd0 11%, #7a9ed1 16%, #81a2d2 22%, #8aa8d4 28%, #94afd7 34%, #a0b6d9 40%, #adbfdd 46%, #b9c8e0 52%, #c5d0e3 58%, #d0d9e7 64%, #dae0ea 70%, #e3e7ed 76%, #eaedef 82%, #f0f1f1 87%, #f5f5f3 92%, #f8f7f4 95%, #f9f8f5 98%, #faf9f5 100%)",
          }}
        />

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto gap-12 pt-16 md:pt-20 pb-16 md:pb-24 scroll-mt-[69px]"
        >
          <div className="flex flex-col items-center gap-4 mb-4">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              BIO
            </h2>
            <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              ETHOS & STACK
            </div>
          </div>

          <div className="space-y-8 text-xl leading-[1.7] text-[var(--text-secondary)]/80 font-sans-anthropic max-w-3xl mx-auto font-normal">
            <p>
              I'm Thineth. I build and ship mobile and web applications from idea all the way to production. Whether stabilizing a platform for thousands of live users or managing a catalog with 50,000+ products, I turn complex technical challenges into smooth, reliable tools that people love to use.
            </p>
            <p>
              Teams often bring me in when a project is messy, fragile, or half-finished. With hands-on ownership across Flutter, Swift, Laravel, and Next.js, I step in, clear out technical debt, and transform tricky codebases into fast, dependable products that founders can trust.
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

      <SlateShowcaseLazy />

      {/* Main Container for rest of projects & experience */}
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-0 gap-0 md:pt-6 md:pt-8 md:gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">
        
        <ProjectsShowcase />

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-16 md:py-0 md:pt-24 space-y-16 scroll-mt-[69px] content-visibility-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              JOURNEY
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              PROFESSIONAL PATH
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative pl-8 space-y-14 py-4">
            {/* Timeline Vertical Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--border-light)]/70 -translate-x-1/2" />

            {/* Job 1 (Software Engineer - Freelance) */}
            <div className="relative group">
              {/* Timeline Dot (Blinking Orange Button for Current) */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 flex items-center justify-center">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-blinker-glow absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-rust)]"></span>
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--accent-rust)] font-bold">
                      Freelance &amp; Contract Based
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Software Engineer 
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Remote
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    01/2026 - Present
                  </div>
                </div>

                {/* UNiFY Sports Contract */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      UNiFY
                    </span>
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] font-semibold uppercase tracking-wide">
                      USA Based Private Contract
                    </span>
                  </div>

                  <ul className="space-y-2 text-sm md:text-[15px] font-serif-anthropic text-[var(--text-charcoal)]/90 leading-relaxed list-none">
                    <li className="flex gap-2.5 items-start">
                      <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                      <span>Stabilized sports mobile platform (Flutter &amp; Python/Flask backend) for NBA, WNBA, NFL, and NCAA fan communities to production reliability.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                      <span>Architected WebSocket channels for live scoreboards and chatrooms handling thousands of concurrent fans.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                      <span>Engineered live media streaming, automated push alerts, and NFC Baller Band payments via Stripe, backed by AWS, Redis, and PostgreSQL.</span>
                    </li>
                  </ul>

                  <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 pt-1">
                    Flutter &middot; Dart &middot; Python / Flask &middot; WebSockets &middot; PostgreSQL &middot; Redis &middot; AWS &middot; Stripe &middot; NFC
                  </div>
                </div>
              </div>
            </div>

            {/* Job 2 (Associate Software Engineer - DayZ Solutions) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
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
                    05/2025 - 06/2026
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Deurbeslag Gigant - Primary Responsibility */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                        Deurbeslag Gigant
                      </span>
                      <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] font-semibold uppercase tracking-wide">
                        Primary Responsibility
                      </span>
                    </div>

                    <ul className="space-y-2 text-sm md:text-[15px] font-serif-anthropic text-[var(--text-charcoal)]/90 leading-relaxed list-none">
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Led full-stack architecture of a centralized inventory and order management system (Laravel), refactoring core modules into service and repository layers to eliminate technical debt.</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Automated real-time REST inventory sync across 6+ WooCommerce stores and Bol.com marketplace API with exponential retries, preventing overselling across 50,000+ products.</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Integrated Meilisearch for sub-50ms typo-tolerant search and automated warehouse fulfillment via GLS/DHL label APIs and Dropbox print pipelines.</span>
                      </li>
                    </ul>

                    <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 pt-1">
                      Laravel &middot; PHP &middot; Livewire &middot; MySQL &middot; Meilisearch &middot; Bol.com API &middot; WooCommerce REST API &middot; GLS / DHL
                    </div>
                  </div>

                  {/* ECore Logistics - Lead Mobile Engineer */}
                  <div className="space-y-2 pt-2 border-t border-[var(--border-light)]/40">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                        ECore
                      </span>
                      <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] font-semibold uppercase tracking-wide">
                        Lead Mobile Engineer
                      </span>
                    </div>

                    <ul className="space-y-2 text-sm md:text-[15px] font-serif-anthropic text-[var(--text-charcoal)]/90 leading-relaxed list-none">
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Spearheaded cross-platform Field Service Management (FSM) companion mobile app architecture in Flutter/Dart from scratch, directing mobile engineering alongside the dev team to integrate with the primary Laravel web ERP.</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Engineered real-time REST and WebSocket layer powering live vehicle tracking, concrete pump status, and dynamic worker dispatching for BetonStorten.nl.</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Also contributed to the core Laravel web ERP, implementing order processing logic, database query optimizations, and UI modernization to Livewire 3.</span>
                      </li>
                    </ul>

                    <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 pt-1">
                      Flutter &middot; Dart &middot; Laravel &middot; Livewire 3 &middot; MySQL &middot; WebSockets &middot; REST APIs &middot; FSM Logistics
                    </div>
                  </div>

                  {/* BusinessLabels.nl */}
                  <div className="space-y-2 pt-2 border-t border-[var(--border-light)]/40">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                        BusinessLabels.nl
                      </span>
                      <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--text-secondary)]/10 text-[var(--text-charcoal)] font-semibold uppercase tracking-wide">
                        Full-Stack Rebuild
                      </span>
                    </div>

                    <ul className="space-y-2 text-sm md:text-[15px] font-serif-anthropic text-[var(--text-charcoal)]/90 leading-relaxed list-none">
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Rebuilt responsive B2B e-commerce platform with Next.js, React, and Tailwind CSS from Figma specs, engineering dynamic archive filters and navigation for 50,000+ catalog variations.</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Integrated Next.js with the Laravel REST API backend for account management and dynamic material catalogs, resolving critical cart glitches and background state bugs.</span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                        <span>Executed server migration and production deployments for both Next.js frontend and Laravel backend, configuring Node.js builds and PM2 daemon clustering for continuous uptime.</span>
                      </li>
                    </ul>

                    <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 pt-1">
                      Next.js &middot; React &middot; Tailwind CSS &middot; Radix UI &middot; Laravel REST API &middot; Node.js &middot; PM2 &middot; Linux Server
                    </div>
                  </div>

                  {/* Director Recommendation Quote */}
                  <div className="mt-4 pt-4 border-t border-[var(--border-light)]/60">
                    <blockquote className="font-serif-anthropic text-sm italic text-[var(--text-charcoal)]/85 border-l-2 border-[var(--accent-rust)] pl-3.5 py-0.5 leading-relaxed">
                      &ldquo;What stood out to me was how much ownership he took of the problems he ran into; he didn&apos;t just patch things, he understood why they were breaking and fixed them properly.&rdquo;
                    </blockquote>
                    <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/80 mt-1.5 pl-3.5">
                      Harshana Nishshanka &middot; Director, DayZ Solutions (Pvt.) Ltd.
                    </p>
                  </div>

                  {/* Verified Documents */}
                  <div className="pt-1">
                    <a
                      href="https://drive.google.com/drive/folders/1_R_Bae1sv5ZdoUmhsp2VRwUX7XDQ-EXd?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-anthropic text-xs text-[var(--accent-rust)] hover:underline"
                    >
                      <span>View Verified Employment Documents</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 3 (Freelance Software Developer) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      Freelance &amp; Client Projects
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Software Developer (Freelance)
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Remote / Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    08/2022 - 06/2025
                  </div>
                </div>

                <ul className="space-y-2 text-sm md:text-[15px] font-serif-anthropic text-[var(--text-charcoal)]/90 leading-relaxed list-none pt-1">
                  <li className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                    <span>Delivered custom web applications with administrative portals and order workflows using PHP, Laravel, and MySQL for local commercial clients.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1 font-bold select-none text-[10px]">&middot;</span>
                    <span>Engineered custom C# / .NET desktop solutions, including pharmacy management and dual-terminal retail supermarket systems with live SQL synchronization.</span>
                  </li>
                </ul>

                <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 pt-1">
                  PHP &middot; Laravel &middot; MySQL &middot; JavaScript &middot; Tailwind CSS &middot; C# &middot; .NET Framework &middot; SQL Server
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-16 md:py-0 md:pt-24 space-y-16 scroll-mt-[69px] content-visibility-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              ACADEMIA
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              STUDIES &amp; DEGREES
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative pl-8 space-y-14 py-4">
            {/* Timeline Vertical Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--border-light)]/70 -translate-x-1/2" />

            {/* Degree 1 (TAMK - Current) */}
            <div className="relative group">
              {/* Timeline Dot (Blinking Orange Button for Current) */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 flex items-center justify-center">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-blinker-glow absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-rust)]"></span>
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--accent-rust)] font-bold">
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
                    08/2026 - Present
                  </div>
                </div>
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] font-semibold uppercase tracking-wide">
                      240 ECTS &middot; EQF Level 6
                    </span>
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] font-semibold uppercase tracking-wide">
                      Undergraduate Degree
                    </span>
                  </div>
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    A 240-ECTS professional engineering degree programme in Tampere, Finland. Rigorous curriculum spanning full-stack software architecture, core languages (C++, Java, JavaScript/TypeScript), cloud infrastructure, cybersecurity, data analytics, and applied machine learning.
                  </p>
                  <p className="font-serif-anthropic text-sm text-[var(--text-charcoal)]/80 leading-relaxed">
                    Active member of <strong className="font-semibold text-[var(--text-charcoal)]">Source</strong> (TAMK Software Engineering Student Club) and <strong className="font-semibold text-[var(--text-charcoal)]">TIRO ry</strong> (Tampere Engineering Students Association).
                  </p>
                  <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                    Software Architecture &middot; C++ &middot; Java &middot; Cloud Systems &middot; Cybersecurity &middot; Machine Learning
                  </div>
                </div>
              </div>
            </div>

            {/* Degree 2 (HND) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      ESOFT Metro Campus
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Pearson BTEC Level 5 HND in Software Engineering
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    02/2023 - 02/2025
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] font-semibold uppercase tracking-wide">
                      Grade: Merit
                    </span>
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] font-semibold uppercase tracking-wide">
                      240 Credits &middot; UK RQF Level 5
                    </span>
                  </div>

                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Completed a comprehensive 240-credit UK Higher National Diploma accredited by Pearson Education Ltd. Earned top Distinctions in User Experience &amp; Interface Design and Website Design &amp; Development, along with Merits in Software Development Lifecycles, Discrete Mathematics, Security, and Applied Programming Principles.
                  </p>

                  <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                    UX/UI Design (Distinction) &middot; Web Design &amp; Dev (Distinction) &middot; Data Structures &amp; Algorithms &middot; Systems Analysis &middot; Database Design
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                    <span className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/60">
                      QN: 603/7596/6 &middot; Reg: RG 10904
                    </span>
                    <a
                      href="https://drive.google.com/file/d/1ZAwjdSv9AWJQyzqDpoZVj3GTZ6dKqwZH/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-anthropic text-xs text-[var(--accent-rust)] hover:underline"
                    >
                      <span>View Verified Certificate</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Degree 3 (IELTS Academic) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      IDP IELTS Test Center
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      IELTS Academic Test
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Colombo, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    01/2026
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] font-semibold uppercase tracking-wide">
                      Overall Band: 6.5
                    </span>
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] font-semibold uppercase tracking-wide">
                      CEFR Level B2
                    </span>
                  </div>

                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Certified English language proficiency for higher education and global technical collaboration. Achieved strong sub-scores across all core competencies.
                  </p>

                  <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/80 flex items-center gap-3 flex-wrap">
                    <span>Listening: <strong>7.5</strong></span>
                    <span>&middot;</span>
                    <span>Reading: <strong>7.0</strong></span>
                    <span>&middot;</span>
                    <span>Writing: <strong>6.0</strong></span>
                    <span>&middot;</span>
                    <span>Speaking: <strong>5.5</strong></span>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                    <span className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/60">
                      TRF: 25LK505172HEWT012A
                    </span>
                    <a
                      href="https://drive.google.com/file/d/1XM_8RdzOWwmVWNchACXFMif_yIwyoNrp/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-anthropic text-xs text-[var(--accent-rust)] hover:underline"
                    >
                      <span>View Verified Certificate</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Degree 4 (Diploma IT) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      ESOFT Metro Campus
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Pearson Assured Diploma in Information Technology
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    07/2022 - 01/2024
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] font-semibold uppercase tracking-wide">
                      Grade: Merit
                    </span>
                    <span className="font-mono-anthropic text-[10px] px-2 py-0.5 rounded bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] font-semibold uppercase tracking-wide">
                      1,200 Guided Hours
                    </span>
                  </div>

                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    1,200-hour comprehensive diploma covering core programming, systems, and network architecture. Achieved Distinctions in Computer Hardware, Network Technology, Multimedia, and IT Concepts, alongside Merits in Python, SQL Databases, and Web Design.
                  </p>

                  <div className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                    Python &middot; SQL Databases &middot; C# &middot; Computer Networks &middot; Hardware &middot; Web Design
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                    <span className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/60">
                      Pearson ID: SF96401 &middot; ESOFT ID: E176422
                    </span>
                    <a
                      href="https://drive.google.com/file/d/14Mx1xfqCYiUH9z-i7SSDEb7MTd1bbPKd/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-anthropic text-xs text-[var(--accent-rust)] hover:underline"
                    >
                      <span>View Verified Certificate</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Degree 5 (Diploma English) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />
              
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      ESOFT Metro Campus
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Diploma in English
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    07/2022 - 03/2023
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    15-unit communicative language programme emphasizing professional business correspondence, workplace presentation delivery, viva examinations, and technical communication.
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                    <span className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/60">
                      Reg ID: 00148929 &middot; Ref: GAM0170214
                    </span>
                    <a
                      href="https://drive.google.com/file/d/1cZVGt-vtf_1HPxMUTHoK-ZtRUtLXxY5J/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-anthropic text-xs text-[var(--accent-rust)] hover:underline"
                    >
                      <span>View Verified Certificate</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Degree 6 (O/L) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-8 -translate-x-1/2 top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      Henegama Central College - National School
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      G.C.E. Ordinary Level Examination
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    05/2022
                  </div>
                </div>
                <div className="space-y-2 pt-1">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Passed secondary education with top honors, achieving Distinction (A) grades in Information &amp; Communication Technology and English, alongside B grades in Mathematics, Science, and Sinhala.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* UPDATES SECTION */}
        <section id="updates" className="pt-16 pb-4 md:pt-24 md:pb-4 space-y-16 scroll-mt-[69px] content-visibility-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              JOURNAL
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              ONGOING ENDEAVORS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl xl:max-w-[1400px] mx-auto p-2 pt-6 pb-2 items-stretch justify-center">
            {/* Card 1: Slate Genesis */}
            <a
              href="/slate?v=genesis"
              className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl shadow-[0_2px_16px_rgba(20,20,19,0.04)] hover:shadow-[0_8px_24px_rgba(20,20,19,0.07)] hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-4">
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Slate Genesis
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Intelligent notes app for iOS built with SwiftUI, featuring a hybrid block canvas, 3 tuned Ollama streaming tiers (Flash, Creative, Pro), offline KaTeX math, and emerging GenUI widgets.
                </p>
              </div>
              <div className="pt-6 font-mono-anthropic text-xs text-[var(--accent-rust)] flex items-center gap-1.5 group-hover:underline">
                <span>Explore Version</span>
                <span aria-hidden="true">&rarr;</span>
              </div>
            </a>

            {/* Card 2: TAMK / Finland (Highlighted) */}
            <div className="flex flex-col justify-between border border-[#749bd0]/30 bg-[#749bd0]/10 p-6 md:p-8 lg:p-10 rounded-3xl shadow-[0_2px_16px_rgba(20,20,19,0.04)] hover:shadow-[0_8px_24px_rgba(20,20,19,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#749bd0]/60 group">
              <div className="space-y-4">
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  TAMK B.Eng
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Studying Software Engineering at TAMK in Tampere. Active member of <strong className="font-semibold text-[var(--text-charcoal)]">Source</strong> (TAMK SE Club) and <strong className="font-semibold text-[var(--text-charcoal)]">TIRO ry</strong> (Tampere Engineering Students Association).
                </p>
              </div>
            </div>

            {/* Card 3: Finnish Language Learning */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl shadow-[0_2px_16px_rgba(20,20,19,0.04)] hover:shadow-[0_8px_24px_rgba(20,20,19,0.07)] hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group">
              <div className="space-y-4">
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Finnish Fluency
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Actively improving Finnish language skills through TAMK language courses, Finnish YouTube immersion channels, and daily Duolingo practice.
                </p>
              </div>
              <div className="pt-6 font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                Suomen kieli &middot; Daily Practice
              </div>
            </div>

            {/* Card 4: Actively Available (Centered in row 2 on 3-col grid) */}
            <a
              href={HIRE_MAILTO_URL}
              data-contact-trigger="true"
              className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl shadow-[0_2px_16px_rgba(20,20,19,0.04)] hover:shadow-[0_8px_24px_rgba(20,20,19,0.07)] hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group cursor-pointer md:col-span-2 lg:col-span-1 lg:col-start-2"
            >
              <div className="space-y-4">
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Available for Roles
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Actively seeking software engineering positions, internships, and contracts across full-stack web and mobile engineering (Flutter / Swift).
                </p>
              </div>
              <div className="pt-6 font-mono-anthropic text-[11px] text-[var(--accent-rust)] font-medium flex items-center gap-1.5 group-hover:underline">
                <span>Open for Hire</span>
                <span aria-hidden="true">&rarr;</span>
              </div>
            </a>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
