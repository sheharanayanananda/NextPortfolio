"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!hasOpened) setHasOpened(true);
  };

  useEffect(() => {
    if (pathname !== "/") {
      setScrollProgress(1);
      return;
    }

    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setScrollProgress(1);
        return;
      }

      const rect = hero.getBoundingClientRect();
      // Keep header completely transparent with white text while anywhere in the hero section.
      // The blue sky background diffuses smoothly from the end of hero into the bio section.
      // Transition only when the blue sky has scrolled away and the ivory background reaches the header.
      const transitionStart = -200; // hero bottom has scrolled 200px past the top
      const transitionEnd = -320;   // completed over 120px of scrolling
      const progress = Math.min(
        Math.max((transitionStart - rect.bottom) / (transitionStart - transitionEnd), 0),
        1
      );
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  const menuItems = [
    { label: "Intro", href: "/#hero" },
    { label: "Bio", href: "/#about" },
    { label: "Slate", href: "/slate" },
    { label: "Craft", href: "/#projects" },
    { label: "Journey", href: "/#experience" },
    { label: "Academia", href: "/#education" },
    { label: "Journal", href: "/#updates" },
  ];

  const isLightText = scrollProgress < 0.5 && !isOpen;
  const bgOpacity = scrollProgress * 0.85;
  const borderOpacity = scrollProgress * 0.12;
  const shadowOpacity = scrollProgress * 0.04;

  const logoClass = isLightText
    ? "text-[#faf9f5] hover:text-white"
    : "text-[var(--text-charcoal)] hover:text-[var(--accent-rust)]";

  const navLinkClass = isLightText
    ? "text-[#faf9f5]/85 hover:text-[#faf9f5] underline-hover"
    : "text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] underline-hover";

  const hamburgerClass = isLightText
    ? "text-[#faf9f5] hover:text-white"
    : "text-[var(--text-charcoal)] hover:text-[var(--accent-rust)]";

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300 border-b backdrop-blur-md"
      style={{
        backgroundColor: isOpen
          ? "rgba(250, 249, 245, 0.95)"
          : `rgba(250, 249, 245, ${bgOpacity.toFixed(3)})`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottomColor: isOpen
          ? "rgba(20, 20, 19, 0.12)"
          : `rgba(20, 20, 19, ${borderOpacity.toFixed(3)})`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, ${
          isOpen ? 0.05 : shadowOpacity.toFixed(3)
        })`,
      }}
    >
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-4 flex items-center justify-between relative">
        <Link
          href="/#hero"
          onClick={() => setIsOpen(false)}
          className={`font-sans-anthropic text-lg font-bold tracking-widest uppercase transition-all duration-300 ease-in-out z-50 ${logoClass}`}
        >
          Thineth
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase transition-all duration-300 ${navLinkClass}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button with Animated CSS Hamburger Icon */}
        <button
          onClick={handleToggle}
          className={`md:hidden flex flex-col justify-between w-6 h-[16px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none z-50 relative group ${hamburgerClass}`}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>

        {/* Mobile Dropdown Menu with Expanding Motion-Blur Animation */}
        <div
          className={`absolute top-full left-0 right-0 glassmorphic-menu border-b border-[var(--border-light)]/70 p-6 flex flex-col space-y-4 md:hidden shadow-[0_12px_24px_rgba(0,0,0,0.05)] z-40 ${
            !hasOpened
              ? "opacity-0 pointer-events-none hidden"
              : isOpen
              ? "animate-menu-open"
              : "animate-menu-close"
          }`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-mono-anthropic text-[13px] font-semibold tracking-[0.06em] uppercase text-[var(--text-charcoal)] hover:text-[var(--accent-rust)] py-2 border-b border-[var(--border-light)]/30 last:border-b-0 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
