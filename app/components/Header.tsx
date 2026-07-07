import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-warm)] border-b border-[var(--border-light)]">
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-4 flex items-center justify-between">
        <Link
          href="/#hero"
          className="font-sans-anthropic text-lg font-bold tracking-widest uppercase hover:text-[var(--accent-rust)] transition-colors ease-in-out duration-300"
        >
          Shehara
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          <Link
            href="/#hero"
            className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
          >
            About
          </Link>
          <Link
            href="/slate"
            className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
          >
            Slate
          </Link>
          <Link
            href="/#projects"
            className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
          >
            Projects
          </Link>
          <Link
            href="/#experience"
            className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
          >
            Experience
          </Link>
          <Link
            href="/#education"
            className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
          >
            Education
          </Link>
          <Link
            href="/#updates"
            className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
          >
            Updates
          </Link>
        </nav>
      </div>
    </header>
  );
}
