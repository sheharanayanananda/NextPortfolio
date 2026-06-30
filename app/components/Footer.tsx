import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-[var(--border-light)] bg-[var(--card-bg)] transition-colors duration-300 mt-24">
      <div className="w-full px-8 md:px-24 py-16 md:py-20 max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          {/* Branding Column */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-serif-anthropic text-2xl font-medium text-[var(--text-charcoal)]">
              Thineth Shehara
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm font-sans">
              Associate Software Engineer specializing in building full-stack platforms with Laravel and cross-platform mobile apps with Flutter and Swift.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-[10px] font-mono-anthropic uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <Link href="/#hero" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#education" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-[10px] font-mono-anthropic uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              Connect
            </div>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <a href="https://github.com/sheharanayanananda" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/thineth-nayanananda-54815b228/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:sheharanayanananda@gmail.com" className="text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] transition-colors duration-300">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-light)]/50 pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-[var(--text-secondary)] font-mono-anthropic">
          <p>© 2026 Thineth Shehara. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
