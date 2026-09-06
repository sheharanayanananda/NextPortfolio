"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { PORTFOLIO_EMAIL } from "../lib/email";

export function triggerCopyEmail() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copy-portfolio-email"));
  }
}

export default function CopyEmailToast() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PORTFOLIO_EMAIL);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = PORTFOLIO_EMAIL;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch {
      // Fallback
    }

    setVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 2600);
  };

  useEffect(() => {
    const handleCustomEvent = () => performCopy();

    const handleDocClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-copy-email], [data-contact-trigger]");
      if (target) {
        e.preventDefault();
        performCopy();
      }
    };

    window.addEventListener("copy-portfolio-email", handleCustomEvent);
    document.addEventListener("click", handleDocClick);

    return () => {
      window.removeEventListener("copy-portfolio-email", handleCustomEvent);
      document.removeEventListener("click", handleDocClick);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-6 right-6 md:top-8 md:right-8 z-[60] flex items-center gap-3.5 pl-5 pr-3 py-2.5 bg-white border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.10)] rounded-2xl text-[var(--text-charcoal)] font-mono-anthropic text-[13px] tracking-tight select-none animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">{PORTFOLIO_EMAIL}</span>
        <span className="text-[var(--text-secondary)]/40">&middot;</span>
        <span className="text-[var(--text-secondary)] font-normal">copied</span>
      </div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="p-1 rounded-lg hover:bg-black/5 text-[var(--text-secondary)]/50 hover:text-[var(--text-charcoal)] transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
