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

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--accent-rust)] font-bold">
                      Freelance &amp; Contract Engineering
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
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">UNiFY (USA Client Contract):</strong> Took over a crash-prone sports mobile application (Flutter &amp; Python/Flask) for NBA, WNBA, NFL, and NCAA fans and brought it to production-ready reliability by resolving critical bugs and client-backend mismatches. Built low-latency WebSocket infrastructure to handle thousands of concurrent fans with live scoreboards and instant chatrooms. Integrated NFC Baller Bands, automated push alerts, and built a secure AWS, Redis, PostgreSQL, and Stripe payment processing system.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 2 (Associate Software Engineer - DayZ Solutions) */}
            <div className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[37px] top-2.5 w-2 h-2 rounded-full bg-[var(--border-light)] group-hover:bg-[var(--accent-rust)] transition-colors duration-300" />

              <div className="space-y-3">
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
                <div className="space-y-4 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Deurbeslag Gigant (Netherlands):</strong> Took ownership of a live Laravel platform and led its architecture refactor around service classes, repositories, and thin controllers, cutting heavy technical debt. Prevented inventory overselling across 5+ WooCommerce stores and 50,000+ products through a custom Bol.com REST integration with rate limiting and automated retries. Replaced slow SQL queries with Meilisearch for instant typo-tolerant catalog search, automated order fulfillment with GLS/DHL shipping labels, and streamlined Dropbox document routing.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">ECore Logistics (Netherlands):</strong> Served as sole mobile lead developing a complete Flutter/Dart application from scratch, owning all technical decisions in close collaboration with engineering leadership and the Director. Designed clean scheduling workflows to manage complex field logistics (heavy machinery, work orders, staff assignments), backed by a real-time REST and WebSocket layer for live tracking.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">BusinessLabels.nl (Netherlands):</strong> Rebuilt the frontend for a Dutch B2B label printing supplier with 50,000+ products. Built responsive React components using Tailwind CSS and Radix UI directly from Figma specs, synchronized Next.js with the Laravel REST API for accounts and catalog data, fixed a critical checkout bug, and stabilized production deployments using PM2.
                    </p>
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
                  <div className="pt-2">
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

              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-mono-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold">
                      Freelance Development
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
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Web Platforms:</strong> Built custom Laravel and MySQL web platforms with client management workflows and administrative control panels for local businesses, turning self-driven student work into successful paid client projects.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Desktop Systems:</strong> Engineered custom C# and .NET desktop inventory solutions, including a dual-terminal retail cashier and inventory system sharing a live SQL database for real-time stock sync.
                    </p>
                  </div>
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
