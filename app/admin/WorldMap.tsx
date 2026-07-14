'use client';

import { useEffect, useState, useRef } from 'react';
import { COUNTRY_NAMES, countryFlag } from '@/app/lib/countries';

interface Country {
  code: string;
  name: string;
  flag: string;
  visitors: number;
}

interface Props {
  countries: Country[];
}

interface HoveredInfo {
  code: string;
  name: string;
  flag: string;
  visitors: number;
  x: number;
  y: number;
}

export default function WorldMap({ countries }: Props) {
  const [svgContent, setSvgContent] = useState<string>('');
  const [hovered, setHovered] = useState<HoveredInfo | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCountryCodeRef = useRef<string | null>(null);

  // Fetch the detailed world map SVG once on mount
  useEffect(() => {
    fetch('/world-map.svg')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load world map');
        return res.text();
      })
      .then((text) => {
        // Strip xml declaration, doctype, and svg title tags (removes native browser tooltips)
        let clean = text
          .replace(/<\?xml[^>]*\?>/i, '')
          .replace(/<!DOCTYPE[^>]*>/i, '')
          .replace(/<title>[^<]*<\/title>/i, '');
        
        // Dynamically widen viewBox to ensure zero cropping on Alaska, Siberia, or South America (detailed map native viewBox is 0 0 1010 666)
        clean = clean
          .replace(/viewBox="[^"]*"/i, 'viewBox="-20 -20 1050 706"')
          .replace(/width="[^"]*"/i, 'width="100%"')
          .replace(/height="[^"]*"/i, 'height="100%"');

        // Scale proportionally (preserve aspect ratio)
        if (!clean.includes('preserveAspectRatio')) {
          clean = clean.replace('<svg', '<svg preserveAspectRatio="xMidYMid meet"');
        } else {
          clean = clean.replace(/preserveAspectRatio="[^"]*"/i, 'preserveAspectRatio="xMidYMid meet"');
        }

        setSvgContent(clean);
      })
      .catch((err) => console.error(err));
  }, []);

  const maxVisitors = Math.max(...countries.map((c) => c.visitors), 1);
  const countryLookup = new Map(countries.map((c) => [c.code.toLowerCase(), c]));

  // Generate dynamic CSS to color individual countries based on traffic (rust accent palette)
  // Also generates corresponding :hover states with identical specificity to ensure pure CSS transitions
  const stylingRules = countries
    .map((c) => {
      const code = c.code.toLowerCase();
      const intensity = Math.min(c.visitors / maxVisitors, 1);
      const fill = `rgba(217, 119, 87, ${0.15 + intensity * 0.85})`;
      const stroke = `rgba(217, 119, 87, ${0.4 + intensity * 0.6})`;
      
      return `
        #world-map #${code} path,
        #world-map path#${code} {
          fill: ${fill} !important;
          stroke: ${stroke} !important;
          stroke-width: 0.6px !important;
        }
        #world-map #${code}:hover path,
        #world-map path#${code}:hover {
          fill: #dedcd4 !important;
          stroke: #9b8a78 !important;
          stroke-width: 0.8px !important;
        }
      `;
    })
    .join('\n');

  // Handle mouse movements over the map using event delegation
  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.target as SVGElement;
    const path = target.closest('path');
    if (!path || !containerRef.current) {
      setHovered(null);
      activeCountryCodeRef.current = null;
      return;
    }

    const id = path.id || path.parentElement?.id;
    if (!id) {
      setHovered(null);
      activeCountryCodeRef.current = null;
      return;
    }

    const code = id.toLowerCase();

    // Only update position/state when entering a new country boundary to snap to centroid
    if (code !== activeCountryCodeRef.current) {
      activeCountryCodeRef.current = code;
      const info = countryLookup.get(code);

      // Measure the centroid of the country's geometry (mainland or island group)
      const rect = containerRef.current.getBoundingClientRect();
      const element = path.parentElement?.id ? path.parentElement : path;
      const bbox = (element as unknown as SVGGraphicsElement).getBBox();
      
      const svgMinX = -20;
      const svgMinY = -20;
      const svgWidth = 1050;
      const svgHeight = 706;

      const svgCenterX = bbox.x + bbox.width / 2;
      const svgCenterY = bbox.y + bbox.height / 2;

      const x = ((svgCenterX - svgMinX) / svgWidth) * rect.width;
      const y = ((svgCenterY - svgMinY) / svgHeight) * rect.height;

      if (info) {
        setHovered({
          code: info.code,
          name: info.name,
          flag: info.flag,
          visitors: info.visitors,
          x,
          y,
        });
      } else {
        const uppercaseCode = code.toUpperCase();
        setHovered({
          code: uppercaseCode,
          name: COUNTRY_NAMES[uppercaseCode] || uppercaseCode,
          flag: countryFlag(uppercaseCode),
          visitors: 0,
          x,
          y,
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
    activeCountryCodeRef.current = null;
  };

  return (
    <div className="relative w-full h-auto overflow-hidden">
      {/* Dynamic styles injected specifically for this map's data */}
      <style dangerouslySetInnerHTML={{ __html: `
        #world-map {
          width: 100% !important;
          height: auto !important;
          display: block;
        }
        #world-map path {
          fill: #e6e4dc;
          stroke: #c3c2be;
          stroke-width: 0.45px;
          shape-rendering: geometricPrecision; /* Forces high-quality anti-aliased rendering of vector shapes */
          stroke-linecap: round;
          stroke-linejoin: round; /* Smooths path joins and prevents jagged corners */
          transition: fill 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), stroke 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), stroke-width 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
          cursor: pointer;
        }
        /* Pure CSS hover rules for non-traffic landmasses (mainland + islands synced via group hover) */
        #world-map g[id]:hover path,
        #world-map path:hover {
          fill: #dedcd4 !important;
          stroke: #9b8a78 !important;
          stroke-width: 0.8px !important;
        }
        @keyframes tooltip-in {
          from {
            opacity: 0;
            transform: translate(-50%, -92%) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%) scale(1);
          }
        }
        .tooltip-animate {
          animation: tooltip-in 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          /* Smoothly animate sliding transitions when hovering between adjacent countries */
          transition: left 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        ${stylingRules}
      `}} />

      <div
        ref={containerRef}
        className="w-full h-auto relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {svgContent ? (
          <div className="w-full h-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />
        ) : (
          <div className="w-full flex items-center justify-center font-mono-anthropic text-xs text-[var(--text-secondary)]" style={{ height: '300px' }}>
            Rendering detailed world map...
          </div>
        )}

        {/* Hover Tooltip - Snaps dynamically to country centroid with a liquid sliding transition */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              left: `${hovered.x}px`,
              top: `${hovered.y - 12}px`,
              pointerEvents: 'none',
              zIndex: 50,
            }}
            className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-xl px-3 py-2 shadow-2xl backdrop-blur-md flex items-center gap-2.5 tooltip-animate"
          >
            <span className="text-lg leading-none">{hovered.flag}</span>
            <div>
              <div className="font-sans-anthropic text-xs font-semibold text-[var(--text-charcoal)] leading-none">
                {hovered.name}
              </div>
              <div className="font-mono-anthropic text-[10px] text-[var(--text-secondary)] mt-1 leading-none">
                {hovered.visitors.toLocaleString()} {hovered.visitors === 1 ? 'visitor' : 'visitors'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
