import { MapPin, Download, AtSign, Linkedin, Github } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SlateShowcaseLazy from "./components/SlateShowcaseLazy";
import TypingGreeting from "./components/TypingGreeting";
import ProjectsShowcase from "./components/ProjectsShowcase";
import ArcCardInteractive from "./components/ArcCardInteractive";
import FloatingArcButton from "./components/FloatingArcButton";
import HangingNameBadge from "./components/HangingNameBadge";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans-anthropic selection:bg-[var(--highlight-selection)] selection:text-[var(--text-charcoal)]">
      {/* Navigation Header */}
      <Header />

      {/* HERO / WELCOME SECTION */}
      <section id="hero" className="flex-1 min-h-[calc(100vh-69px)] flex items-center w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 scroll-mt-[69px]">
        <div className="w-full flex flex-col md:flex-row items-center gap-8">

          {/* Left | Content */}
          <div className="flex-1 gap-3">
            <div className="flex flex-col gap-8">
              <div className="font-mono-anthropic text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.25rem] font-semibold tracking-tight text-[var(--text-secondary)] flex items-center flex-wrap">
                <TypingGreeting />
                <span className="ml-3">I'm</span>
              </div>
              <h1 className="font-serif-anthropic text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[11.5rem] font-normal leading-[1.05]">
                <span className="sr-only">Thineth</span>
                <span aria-hidden="true" className="inline-block relative">
                  Th
                  <span className="relative inline-block">
                    i
                    <HangingNameBadge />
                  </span>
                  neth
                </span>
              </h1>
            </div>



            <p className="font-sans-anthropic text-xl text-[var(--text-charcoal)] leading-[1.7] font-normal max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-7">
              Building apps that people love to use. Software Engineer and student at TAMK crafting fast mobile apps, simple web tools, and reliable real-time systems with care.
            </p>

            {/* Inline contact icons: shown below lg, hidden on lg+ where floating buttons appear */}
            <div className="flex lg:hidden items-center gap-6 mt-6 text-[var(--text-charcoal)]">
              <a
                href="mailto:sheharanayanananda@gmail.com"
                className="hover:opacity-70 transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Email Me"
              >
                <AtSign className="w-6 h-6" strokeWidth={2} />
              </a>
              <a
                href="https://www.linkedin.com/in/thineth-nayanananda-54815b228/"
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
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-blinker-glow absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-rust)]"></span>
                </span>
                <span className="tracking-tight font-mono-anthropic">Open To Work</span>
              </div>
            </div>
          </div>

          {/* Right | Arc Card + floating buttons */}
          <div className="hidden md:flex relative self-stretch flex-shrink-0 flex items-center justify-end md:w-auto md:pl-4 lg:pl-8 xl:pl-12 2xl:pl-28 mt-8 md:mt-0" style={{ minWidth: "200px" }}>

            {/* Wrapper for Card and Buttons (relative to card boundaries) */}
            <div className="relative md:w-auto md:h-full" style={{ aspectRatio: "2/3" }}>

              {/* Floating buttons | Desktop (lg and above) with 3D liquid LERP reaction */}
              <FloatingArcButton
                href="mailto:sheharanayanananda@gmail.com"
                label="Email Me"
                ariaLabel="Email Me"
                baseRotation={20}
                className="w-[104px] h-[46px] bottom-[280px] -left-[145px] 2xl:w-[112px] 2xl:h-[50px] 2xl:bottom-[300px] 2xl:-left-[160px]"
              />

              <FloatingArcButton
                href="https://linkedin.com/in/thineth-nayanananda-54815b228/"
                target="_blank"
                rel="noopener noreferrer"
                label="LinkedIn"
                ariaLabel="LinkedIn Profile"
                baseRotation={0}
                className="w-[100px] h-[46px] bottom-[155px] -left-[200px] 2xl:w-[108px] 2xl:h-[50px] 2xl:bottom-[170px] 2xl:-left-[230px]"
              />

              <FloatingArcButton
                href="https://github.com/sheharanayanananda"
                target="_blank"
                rel="noopener noreferrer"
                label="GitHub"
                ariaLabel="GitHub Profile"
                baseRotation={-20}
                className="w-[90px] h-[46px] bottom-[45px] -left-[130px] 2xl:w-[96px] 2xl:h-[50px] 2xl:bottom-[50px] 2xl:-left-[145px]"
              />



              {/* Arc Card with 3D Push-Away Reaction */}
              <ArcCardInteractive />
            </div>
          </div>

        </div>
      </section>

      {/* Main Container */}
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-0 md:pt-5 md:pb-16 md:gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">

        {/* ABOUT SECTION */}
        <section id="about" className="flex flex-col items-center text-center max-w-5xl mx-auto gap-12 py-16 md:py-0 md:min-h-[calc(100vh-69px)] md:justify-center scroll-mt-[69px]">
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
              I'm Thineth (known to teammates and friends as Shei). I build and ship mobile and web applications from idea all the way to production. Whether stabilizing a platform for thousands of live users or managing a catalog with 50,000+ products, I turn complex technical challenges into smooth, reliable tools that people love to use.
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

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)]/70 pl-8 space-y-14 py-4">


            {/* Job 1 (Associate Software Engineer - Freelance) */}
            <div className="relative group">
              {/* Timeline Dot (Blinking Orange Button for Current) */}
              <div className="absolute -left-[40px] top-2.5 flex items-center justify-center w-[16px] h-[16px]">
                <span className="relative flex h-2.5 w-2.5">
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
                      Associate Software Engineer (Freelance)
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Remote (USA &amp; International Clients)
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
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

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
                    05/2025 - 07/2026
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
                        <span>Automated real-time REST inventory sync across 5+ WooCommerce storefronts and Bol.com marketplace API with exponential retries, preventing overselling across 50,000+ products.</span>
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
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

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

          <div className="max-w-3xl mx-auto relative border-l border-[var(--border-light)]/70 pl-8 space-y-14 py-4">

            {/* Degree 1 (TAMK - Current) */}
            <div className="relative group">
              {/* Timeline Dot (Blinking Orange Button for Current) */}
              <div className="absolute -left-[40px] top-2.5 flex items-center justify-center w-[16px] h-[16px]">
                <span className="relative flex h-2.5 w-2.5">
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
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    A 240-ECTS professional engineering degree programme in Tampere, Finland (EQF Level 6). Covers software architecture, core programming languages (C++, Java, JavaScript), web and mobile systems (frontend, backend, APIs), usability and UX, cloud computing, cybersecurity, data analytics, and applied machine learning.
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
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      ESOFT Metro Campus
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Pearson BTEC Level 5 HND in Computing - Software Engineering
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    02/2023 - 02/2025
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Graduated with a Merit in Software Engineering (UK RQF Level 5 / EQF Level 5, 240 credits). Covered software design principles, data structures and algorithms, database design, discrete mathematics, SDLC, systems analysis, UX/UI, networking, and applied research methods.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                    QN: 603/7596/6 &middot; Registration No: RG 10904
                  </p>
                  <div>
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
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

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
                <div className="pt-2 space-y-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Certified English language proficiency (CEFR B2 level) with an Overall Band Score of 6.5. Individual band scores: Listening 7.5, Reading 7.0, Writing 6.0, Speaking 5.5.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                    TRF Number: 25LK505172HEWT012A
                  </p>
                  <div>
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
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
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
                    07/2022 - 08/2023
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Completed with a Merit. Covered programming fundamentals in Python and C#, relational database development with SQL, computer networking, and core software engineering principles.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                    Pearson ID: SF96401 &middot; ESOFT ID: E176422
                  </p>
                  <div>
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
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
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
                    07/2022 - 08/2023
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    A communicative English skills program focusing on advanced grammar, professional business writing, workplace communication, and presentation delivery.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70">
                    Registration ID: 00148929 &middot; Reference No: GAM0170214
                  </p>
                  <div>
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
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

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
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Passed general secondary education successfully with top distinctions, including Distinction (A) grades in Information &amp; Communication Technology and English, alongside B grades in Mathematics, Science, and Sinhala.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* UPDATES SECTION */}
        <section id="updates" className="py-16 md:py-0 md:pt-24 space-y-16 scroll-mt-[69px] content-visibility-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              JOURNAL
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              ONGOING ENDEAVORS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl xl:max-w-[1400px] mx-auto pt-6 items-stretch">
            {/* Card 1: Mobile & Backend (Left) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group">
              <div className="space-y-5">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                  Mobile &amp; Backend
                </span>
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  UNiFY &amp; Mobile Contracts
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Building real-time sports apps, WebSocket scoreboards, and smooth mobile experiences for users across iOS and Android.
                </p>
              </div>
            </div>

            {/* Card 2: TAMK / Finland (Center - Highlighted) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[#f5e3c7] p-6 md:p-8 lg:p-10 rounded-3xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--text-secondary)]/30 group">
              <div className="space-y-5">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--accent-rust-hover)] tracking-widest font-bold">
                  TAMK / Finland
                </span>
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Software Engineering B.Eng
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Currently studying Software Engineering at Tampere University of Applied Sciences (TAMK) in Tampere, Finland.
                </p>
              </div>
            </div>

            {/* Card 3: Open to Gigs (Right) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group">
              <div className="space-y-5">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                  Open to Gigs
                </span>
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Freelance &amp; Remote Projects
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Actively accepting contracts for web platforms (Laravel/PHP/Next.js) and mobile apps (Flutter/Swift) worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
