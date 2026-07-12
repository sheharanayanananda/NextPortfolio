'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Outbound link selectors — matches portfolio's social / resume links
const TRACKED_SELECTORS = [
  { selector: 'a[href*="github.com"]', label: 'GitHub Profile' },
  { selector: 'a[href*="linkedin.com"]', label: 'LinkedIn' },
  { selector: 'a[href*="mailto:"]', label: 'Email Me' },
  { selector: 'a[href="/resume.pdf"]', label: 'Resume Download' },
];

async function send(payload: Record<string, unknown>) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Never throw — analytics must not affect UX
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const scrollSentRef = useRef<Set<number>>(new Set());
  const loadSentRef = useRef(false);
  const currentPath = useRef(pathname);

  // Helper to determine if current session is an admin
  const isExcluded = () => {
    if (pathname.startsWith('/admin')) return true;
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      return cookies.some(c => c.trim().startsWith('admin_session='));
    }
    return false;
  };

  // ── Page view + performance ──────────────────
  useEffect(() => {
    if (isExcluded()) return;

    const path = pathname;
    currentPath.current = path;
    scrollSentRef.current = new Set();
    loadSentRef.current = false;

    // Fire pageview
    send({
      type: 'pageview',
      path,
      referrer: document.referrer,
      language: navigator.language,
      screenWidth: screen.width,
      screenHeight: screen.height,
    });

    // Fire performance after page settles
    const measurePerf = () => {
      if (loadSentRef.current) return;
      loadSentRef.current = true;
      let loadMs: number | null = null;
      try {
        const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (nav) {
          loadMs = Math.round(nav.loadEventEnd - nav.startTime);
        } else {
          // Fallback: approximate using performance.now()
          loadMs = Math.round(performance.now());
        }
      } catch {
        loadMs = Math.round(performance.now());
      }
      if (loadMs && loadMs > 0 && loadMs < 60000) {
        send({ type: 'performance', path, loadMs });
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(measurePerf, 100);
    } else {
      window.addEventListener('load', () => setTimeout(measurePerf, 100), { once: true });
    }
  }, [pathname]);

  // ── Scroll depth tracking ────────────────────
  useEffect(() => {
    if (isExcluded()) return;
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of milestones) {
        if (pct >= milestone && !scrollSentRef.current.has(milestone)) {
          scrollSentRef.current.add(milestone);
          send({ type: 'scroll', path: currentPath.current, scrollPct: milestone });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // ── Outbound link click tracking ─────────────
  useEffect(() => {
    if (isExcluded()) return;
    const handlers: Array<{ el: Element; fn: EventListener }> = [];

    const attach = () => {
      for (const { selector, label } of TRACKED_SELECTORS) {
        document.querySelectorAll(selector).forEach(el => {
          const fn: EventListener = () => {
            send({
              type: 'click',
              path: currentPath.current,
              linkLabel: label,
              linkHref: (el as HTMLAnchorElement).href,
            });
          };
          el.addEventListener('click', fn);
          handlers.push({ el, fn });
        });
      }
    };

    // Wait for DOM to paint, then attach
    const timer = setTimeout(attach, 500);
    return () => {
      clearTimeout(timer);
      handlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
    };
  }, [pathname]);

  return null; // Renders nothing — pure side-effect component
}
