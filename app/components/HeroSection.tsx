import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="flex-1 min-h-[calc(100vh-69px)] flex items-center pt-6 pb-12 w-full px-12 md:px-24">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center">
        <div className="md:col-span-7 space-y-3">
          <div className="flex flex-col gap-10">
            <div className="font-mono-anthropic text-5xl font-medium tracking-tight text-[var(--text-secondary)]">
              Thineth
            </div>
            <h1 className="font-serif-anthropic text-[14rem] font-medium leading-[1.05] tracking-tight">
              Shehara
            </h1>
          </div>

          <p className="font-serif-anthropic text-xl text-[var(--text-secondary)] leading-relaxed font-normal max-w-2xl">
            Designing and shipping mobile apps that handle real-time data, platform integrations, and smooth 
            offline-to-online workflows, backed by clean architecture and APIs built to support them.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3 text-[var(--text-secondary)]">
              <div className="relative w-[14px] h-[18px]">
                <Image
                  src="/location_icon.svg"
                  alt="Location Pin"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-mono-anthropic text-sm md:text-base tracking-tight">Tampere, Finland</span>
            </div>

            <div className="inline-flex items-center space-x-2.5 bg-[#1E1E1E] text-[#FAF8F5] px-5 py-3 rounded-[15px] font-sans font-medium text-sm transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF1E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF1E]"></span>
              </span>
              <span className="tracking-tight">Open To Work</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center md:justify-end self-stretch h-full">
          <div className="relative flex justify-end items-stretch h-full w-full max-w-[500px]">

            {/* Email Me Button */}
            <a
              href="mailto:sheharanayanananda@gmail.com"
              className="absolute z-10 flex items-center justify-center bg-white text-[#1E1E1E] rounded-[15px] font-sans font-medium text-[13px] md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                width: "112px",
                height: "50px",
                bottom: "160px",
                left: "35px",
                transform: "rotate(25deg)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
              }}
              aria-label="Email Me"
            >
              Email Me
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute z-10 flex items-center justify-center bg-white text-[#1E1E1E] rounded-[15px] font-sans font-medium text-[13px] md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                width: "108px",
                height: "50px",
                bottom: "95px",
                left: "0px",
                transform: "rotate(0deg)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
              }}
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/sheharanayanananda"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute z-10 flex items-center justify-center bg-white text-[#1E1E1E] rounded-[15px] font-sans font-medium text-[13px] md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                width: "96px",
                height: "50px",
                bottom: "30px",
                left: "40px",
                transform: "rotate(-25deg)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
              }}
              aria-label="GitHub Profile"
            >
              GitHub
            </a>

            {/* Arc Card */}
            <div
              className="relative overflow-hidden h-full max-h-[500px]"
              style={{
                width: "auto",
                aspectRatio: "2/3",
                borderRadius: "24px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src="/arc_card.svg"
                alt="Arc Card — Thineth Shehara, Software Engineer"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
