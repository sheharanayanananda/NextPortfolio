import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[var(--bg-warm)] border-t border-[var(--border-light)] mt-16 md:mt-24">
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16 md:py-20 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          {/* Branding Column */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/#hero"
              className="inline-block font-sans-anthropic text-base tracking-[0.2em] font-black uppercase text-[var(--text-charcoal)] hover:opacity-80 transition-opacity"
            >
              SHEHARA
            </Link>
            <p className="text-base text-[var(--text-secondary)]/80 leading-relaxed max-w-sm font-sans-anthropic font-normal">
              Software Engineer at TAMK specializing in full-stack web platforms with Laravel/Next.js and cross-platform mobile apps with Flutter/Swift.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-sans-anthropic uppercase tracking-[0.15em] text-[var(--text-charcoal)] font-bold">
              Navigation
            </div>
            <ul className="space-y-3 text-sm font-sans-anthropic font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <li>
                <Link href="/#hero" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Intro
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Bio
                </Link>
              </li>
              <li>
                <Link href="/slate" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Slate
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Craft
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Journey
                </Link>
              </li>
              <li>
                <Link href="/#education" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Academia
                </Link>
              </li>
              <li>
                <Link href="/#updates" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-sans-anthropic uppercase tracking-[0.15em] text-[var(--text-charcoal)] font-bold">
              Connect
            </div>
            <ul className="space-y-3 text-sm font-sans-anthropic font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <li>
                <a href="https://github.com/sheharanayanananda" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/thineth-nayanananda-54815b228/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:sheharanayanananda@gmail.com" className="hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-light)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans-anthropic uppercase tracking-wider font-semibold text-[var(--text-secondary)]/60">
          <p>© 2026 Thineth Shehara. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
