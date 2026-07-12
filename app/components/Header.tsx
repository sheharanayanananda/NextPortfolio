"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!hasOpened) setHasOpened(true);
  };

  const menuItems = [
    { label: "Intro", href: "/#hero" },
    { label: "Bio", href: "/#about" },
    { label: "Slate", href: "/slate" },
    { label: "Craft", href: "/#projects" },
    { label: "Journey", href: "/#experience" },
    { label: "Academia", href: "/#education" },
    { label: "Journal", href: "/#updates" }
  ];

  return (
    <header className={`sticky top-0 z-50 bg-[var(--bg-warm)] transition-colors duration-300 ${
      isOpen ? "border-b border-transparent" : "border-b border-[var(--border-light)]"
    }`}>
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-4 flex items-center justify-between relative">
        <Link
          href="/#hero"
          onClick={() => setIsOpen(false)}
          className="font-sans-anthropic text-lg font-bold tracking-widest uppercase hover:text-[var(--accent-rust)] transition-colors ease-in-out duration-300 z-50"
        >
          Shehara
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono-anthropic text-[12px] font-medium tracking-[0.04em] uppercase text-[var(--color-cloud-dark)] hover:text-[var(--text-charcoal)] transition-colors duration-300 underline-hover"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button with Animated CSS Hamburger Icon */}
        <button
          onClick={handleToggle}
          className="md:hidden flex flex-col justify-between w-6 h-[16px] text-[var(--text-charcoal)] hover:text-[var(--accent-rust)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none z-50 relative group"
          aria-label="Toggle navigation menu"
        >
          <span className={`w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>

        {/* Mobile Dropdown Menu with Expanding Motion-Blur Animation */}
        <div className={`absolute top-[61px] left-0 right-0 bg-[var(--bg-warm)]/95 backdrop-blur-[12px] border-b border-[var(--border-light)] p-6 flex flex-col space-y-4 md:hidden shadow-md z-40 ${
          !hasOpened 
            ? "opacity-0 pointer-events-none hidden" 
            : isOpen 
            ? "animate-menu-open" 
            : "animate-menu-close"
        }`}>
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
