import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex-1 min-h-[calc(100vh-69px)] flex items-center px-12 md:px-24 py-12"
    >
      {/* Two-column flex layout */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16">

        {/* LEFT — Content */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <span className="font-mono-anthropic text-2xl text-[var(--text-secondary)]">Thineth</span>
            <h1 className="font-serif-anthropic text-8xl md:text-[10rem] font-normal leading-none tracking-tight">
              Shehara
            </h1>
          </div>

          {/* Description */}
          <p className="font-sans text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg">
            Designing and shipping mobile apps that handle real-time data, platform integrations,
            and smooth offline-to-online workflows, backed by clean architecture and APIs built to support them.
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <div className="relative w-4 h-5 shrink-0">
              <Image src="/location_icon.svg" alt="Location" fill className="object-contain" />
            </div>
            <span className="font-mono-anthropic text-sm">Tampere, Finland</span>
          </div>

          {/* Open To Work */}
          <div className="inline-flex items-center gap-2.5 bg-[#1E1E1E] text-[#FAF8F5] px-5 py-3 rounded-[15px] font-sans font-medium text-sm w-fit transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF1E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF1E]" />
            </span>
            Open To Work
          </div>
        </div>

        {/* RIGHT — Arc Card + Floating Buttons */}
        <div className="relative shrink-0 flex items-center justify-center" style={{ width: "340px", height: "480px" }}>

          {/* Email Me */}
          <a
            href="mailto:thinethshehara@gmail.com"
            aria-label="Email Me"
            className="absolute z-10 flex items-center justify-center bg-white text-[#1E1E1E] font-sans font-medium text-sm rounded-[15px] transition-transform hover:scale-105 active:scale-95"
            style={{ width: 112, height: 50, bottom: 150, left: -60, rotate: "-12deg", boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
          >
            Email Me
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="absolute z-10 flex items-center justify-center bg-white text-[#1E1E1E] font-sans font-medium text-sm rounded-[15px] transition-transform hover:scale-105 active:scale-95"
            style={{ width: 108, height: 50, bottom: 88, left: -90, rotate: "6deg", boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
          >
            LinkedIn
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/sheharanayanananda"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="absolute z-10 flex items-center justify-center bg-white text-[#1E1E1E] font-sans font-medium text-sm rounded-[15px] transition-transform hover:scale-105 active:scale-95"
            style={{ width: 96, height: 50, bottom: 26, left: -65, rotate: "-16deg", boxShadow: "0 4px 16px rgba(0,0,0,0.13)" }}
          >
            GitHub
          </a>

          {/* Arc Card */}
          <div
            className="relative overflow-hidden w-full h-full"
            style={{ borderRadius: 24, boxShadow: "0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)" }}
          >
            <Image
              src="/arc_card.svg"
              alt="Thineth Shehara — Software Engineer card"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
