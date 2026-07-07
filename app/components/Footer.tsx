import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[var(--color-slate-dark)] text-[var(--color-ivory-light)] mt-16 md:mt-24">
      <div className="w-full px-8 md:px-24 py-16 md:py-20 max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          {/* Branding Column */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-serif-anthropic text-2xl font-normal text-[var(--color-ivory-medium)]">
              Thineth Shehara
            </h3>
            <p className="text-sm text-[var(--color-cloud-medium)] leading-relaxed max-w-sm font-sans-anthropic font-normal">
              Software Engineer at TAMK specializing in full-stack web platforms with Laravel/Next.js and cross-platform mobile apps with Flutter/Swift.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-[12px] font-sans-anthropic uppercase tracking-wider text-[var(--color-ivory-medium)] font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-sans-anthropic">
              <li>
                <Link href="/#hero" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#education" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-[12px] font-sans-anthropic uppercase tracking-wider text-[var(--color-ivory-medium)] font-semibold">
              Connect
            </div>
            <ul className="space-y-2 text-xs font-sans-anthropic">
              <li>
                <a href="https://github.com/sheharanayanananda" target="_blank" rel="noopener noreferrer" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/thineth-nayanananda-54815b228/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:sheharanayanananda@gmail.com" className="text-[var(--color-cloud-medium)] hover:text-[var(--color-ivory-light)] transition-colors duration-300">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-slate-medium)] pt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-[var(--color-cloud-medium)] font-sans-anthropic">
          <p>© 2026 Thineth Shehara. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
