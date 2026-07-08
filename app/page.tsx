import Image from "next/image";
import { MapPin, Download, AtSign, Linkedin, Github } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SlateShowcase from "./components/SlateShowcase";
import TypingGreeting from "./components/TypingGreeting";
import ProjectsShowcase from "./components/ProjectsShowcase";

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

              {/* Floating buttons | Desktop (lg and above) */}
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
              <div className="absolute inset-0 overflow-hidden border border-[var(--border-light)] bg-[var(--card-bg)] z-10" style={{ borderRadius: "16px" }}>
                <Image src="/arc_card.svg" alt="Arc Card, Thineth Shehara, Software Engineer" fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
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

      <SlateShowcase />

      {/* Main Container for rest of projects & experience */}
      <main className="flex flex-col w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-0 gap-0 md:pt-6 md:pt-8 md:gap-16 lg:gap-20 xl:gap-24 2xl:gap-25">
        
        <ProjectsShowcase />

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-16 md:py-0 md:pt-24 space-y-16 scroll-mt-[69px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              CHRONOLOGY
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              PROFESSIONAL PATH
            </div>
          </div>

          <div className="max-w-3xl lg:max-w-5xl mx-auto relative border-l border-[var(--border-light)]/70 pl-8 space-y-14 py-4">

            {/* Job 1 (Freelance Software Engineer) */}
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
                      Upwork & Private Contracts
                    </span>
                    <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors">
                      Freelance Software Engineer
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Hybrid, Finland
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
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">UNiFY Sports Ecosystem:</strong> Stabilized, refactored, and optimized a multi-platform sports app (NBA/NFL) built on Flutter and Python/Flask. Leveraged Provider and go_router for modular state, implemented WebSockets live scoreboards, integrated Stripe payments, and optimized queries under high load.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job 2 (Associate Software Engineer) */}
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
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Deurbeslag Gigant:</strong> Led development of a PHP/Laravel inventory platform syncing stock and orders for 50,000+ products across 5+ WooCommerce stores. Stabilized codebase using best practices, integrated Meilisearch full-text indexing, automated warehouse logistics using DHL/GLS APIs, and integrated remote document printing.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">ECore (Web &amp; Mobile):</strong> Engineered a backend logistics and automation platform (BetonStorten.nl) managing orders, routing, and inventory. Developed core business rules in Laravel, optimized heavy database schemas, and built a Flutter companion app for real-time driver tracking.
                    </p>
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
                      Freelance Software Developer
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Hybrid, Sri Lanka
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
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Web Portals:</strong> Architected responsive database-driven web platforms using PHP, Laravel, and MySQL, including a migration consultancy site with client onboarding flows and a photographer portfolio with a custom administrative media panel.
                    </p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-[var(--accent-rust)] mt-1.5 font-bold select-none text-[10px]">&middot;</span>
                    <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                      <strong className="font-sans-anthropic text-xs uppercase tracking-wider text-[var(--text-secondary)] font-bold mr-1.5">Desktop Engineering:</strong> Engineered custom pharmacy inventory controls and a dual-app supermarket POS/management solution in C# and .NET using shared SQL server databases for real-time synchronization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-16 md:py-0 md:pt-24 space-y-16 scroll-mt-[69px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              ACADEMIA
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              STUDIES &amp; DEGREES
            </div>
          </div>

          <div className="max-w-3xl lg:max-w-5xl mx-auto relative border-l border-[var(--border-light)]/70 pl-8 space-y-14 py-4">

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
                    A 240-ECTS professional engineering degree programme starting in August 2026. The curriculum covers core engineering mathematics, object-oriented programming (Java/Python), cross-platform mobile architectures, cloud engineering (AWS/Azure), DevOps workflows, API design, and machine learning integrations.
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
                      Pearson BTEC Level 5 HND in Computing
                    </h3>
                    <p className="font-sans-anthropic text-xs text-[var(--text-secondary)]/80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]/50" /> Gampaha, Sri Lanka
                    </p>
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--text-secondary)] font-medium md:text-right whitespace-nowrap self-start md:self-baseline">
                    02/2023 - 02/2025
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Graduated with a Merit in Software Engineering, covering core computer science topics including data structures, database designs, discrete mathematics, and SDLC. Achieved final course Distinctions in Website Design &amp; Development and User Experience &amp; Interface Design.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 mt-2">
                    QN: 603/7596/6 &middot; Registration No: RG 10904
                  </p>
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
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    Certified English language proficiency (CEFR B2 level) with an Overall Band Score of 6.5. Individual band scores: Listening 7.5, Reading 7.0, Writing 6.0, Speaking 5.5.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 mt-2">
                    TRF Number: 25LK505172HEWT012A
                  </p>
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
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    A 1,200-hour technical program completed with a Merit. Covered computer hardware, networking foundations, SQL database design, Python development, C# programming, and a final practical software project.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 mt-2">
                    Pearson ID: SF96401 &middot; ESOFT ID: E176422
                  </p>
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
                <div className="pt-2">
                  <p className="font-serif-anthropic text-base text-[var(--text-charcoal)]/90 leading-relaxed">
                    A communicative English skills program focusing on advanced grammar, professional writing, and public speaking, concluding with a final presentation and viva voce examination.
                  </p>
                  <p className="font-mono-anthropic text-[11px] text-[var(--text-secondary)]/70 mt-2">
                    Registration ID: 00148929 &middot; Reference No: GAM0170214
                  </p>
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
                      Henegama Central College
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
                    Passed the G.C.E. Ordinary Level examination with top distinctions, including an A grade in Information &amp; Communication Technology and an A grade in English, alongside B grades in Mathematics, Science, and Sinhala.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* UPDATES SECTION */}
        <section id="updates" className="py-16 md:py-0 md:pt-24 space-y-16 scroll-mt-[69px]">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="font-sans-anthropic text-lg font-bold tracking-widest uppercase text-[var(--text-secondary)]">
              CURRENTLY
            </h2>
            <div className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)] leading-[1.1]">
              ONGOING ENDEAVORS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl xl:max-w-[1400px] mx-auto pt-6 items-stretch">
            {/* Card 1: iOS & Swift (Left) */}
            <div className="flex flex-col justify-between border border-[var(--border-light)]/40 bg-[var(--card-bg)] p-6 md:p-8 lg:p-10 rounded-3xl hover:border-[var(--text-secondary)]/30 hover:bg-[var(--card-hover-bg)]/20 transition-all duration-300 group">
              <div className="space-y-5">
                <span className="text-[10px] font-sans-anthropic uppercase text-[var(--text-secondary)] tracking-widest font-bold">
                  iOS &amp; Swift
                </span>
                <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)] group-hover:text-[var(--accent-rust)] transition-colors duration-300">
                  Slate Notes Application
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Designing Slate V1 and V2 notes engines, implementing autonomous context-aware note processing, high-fidelity markdown/LaTeX render passes, and offline local-first database models.
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
                  Academic Relocation
                </h3>
                <p className="text-base text-[var(--text-charcoal)]/90 leading-relaxed font-serif-anthropic">
                  Commencing undergraduate studies in the Bachelor of Engineering in Software Engineering at Tampere University of Applied Sciences (TAMK) in Tampere, Finland.
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
                  Actively accepting contracts for backend integrations (Laravel/PHP) and cross-platform native apps (Flutter/Swift/Dart) globally.
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
