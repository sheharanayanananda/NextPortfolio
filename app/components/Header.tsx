"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/#hero" },
    { label: "About", href: "/#about" },
    { label: "Slate", href: "/slate" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Education", href: "/#education" },
    { label: "Updates", href: "/#updates" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-warm)] border-b border-[var(--border-light)]">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[var(--text-charcoal)] hover:text-[var(--accent-rust)] transition-colors focus:outline-none z-50"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-[61px] left-0 right-0 bg-[var(--bg-warm)] border-b border-[var(--border-light)] p-6 flex flex-col space-y-4 md:hidden shadow-md animate-in slide-in-from-top-4 duration-200 z-40">
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
        )}
      </div>
    </header>
  );
}
