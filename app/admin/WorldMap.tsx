'use client';

import { useEffect, useState, useRef } from 'react';

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

  // Fetch the detailed world map SVG once on mount
  useEffect(() => {
    fetch('/world-map.svg')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load world map');
        return res.text();
      })
      .then((text) => {
        // Strip xml declaration and doctype if present
        const clean = text
          .replace(/<\?xml[^>]*\?>/i, '')
          .replace(/<!DOCTYPE[^>]*>/i, '');
        setSvgContent(clean);
      })
      .catch((err) => console.error(err));
  }, []);

  const maxVisitors = Math.max(...countries.map((c) => c.visitors), 1);
  const countryLookup = new Map(countries.map((c) => [c.code.toLowerCase(), c]));

  // Generate dynamic CSS to color individual countries based on traffic
  const stylingRules = countries
    .map((c) => {
      const code = c.code.toLowerCase();
      const intensity = Math.min(c.visitors / maxVisitors, 1);
      const hue = 38 - intensity * 8; // gold to deep orange-amber
      const fill = `hsla(${hue}, 85%, ${50 + intensity * 10}%, ${0.25 + intensity * 0.75})`;
      const stroke = `hsla(${hue}, 90%, 70%, ${0.4 + intensity * 0.6})`;
      
      // Target paths directly with this ID or nested inside a group with this ID
      return `
        #world-map #${code} path,
        #world-map path#${code} {
          fill: ${fill} !important;
          stroke: ${stroke} !important;
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
      return;
    }

    const id = path.id || path.parentElement?.id;
    if (!id) {
      setHovered(null);
      return;
    }

    const code = id.toLowerCase();
    const info = countryLookup.get(code);

    // Get position relative to the container
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
      // Check if it's a known country from general ISO codes but has 0 visitors
      const uppercaseCode = code.toUpperCase();
      setHovered({
        code: uppercaseCode,
        name: uppercaseCode, // Fallback to code
        flag: '🌐',
        visitors: 0,
        x,
        y,
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black border border-[var(--border-light)] p-2">
      {/* Dynamic styles injected specifically for this map's data */}
      <style dangerouslySetInnerHTML={{ __html: `
        #world-map {
          width: 100% !important;
          height: auto !important;
          max-height: 400px;
          display: block;
        }
        #world-map path {
          fill: #1a1612;
          stroke: #2e261f;
          stroke-width: 0.5px;
          transition: fill 0.25s ease, stroke 0.25s ease;
          cursor: pointer;
        }
        #world-map path:hover {
          fill: #3b2f24 !important;
          stroke: #66523d !important;
        }
        ${stylingRules}
      `}} />

      <div
        ref={containerRef}
        className="w-full relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {svgContent ? (
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        ) : (
          <div className="w-full flex items-center justify-center font-mono-anthropic text-xs text-[var(--text-secondary)]" style={{ height: '300px' }}>
            Rendering detailed world map...
          </div>
        )}

        {/* Hover Tooltip */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              left: hovered.x,
              top: hovered.y - 12,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none',
              zIndex: 50,
            }}
            className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-xl px-3 py-2 shadow-2xl backdrop-blur-md flex items-center gap-2.5 transition-all duration-75"
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
