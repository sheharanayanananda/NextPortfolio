'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from './actions';
import type { DashboardStats } from '@/app/lib/analytics';
import { RefreshCw, LogOut, BarChart3, Users, Search, Activity, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface SysInfo {
  nodeVersion: string;
  platform: string;
  uptime: string;
  heapUsedMB: string;
  heapTotalMB: string;
  externalMB: string;
  rssMB: string;
  heapPct: number;
}

interface EnvFlags {
  hasUsername: boolean;
  hasPassword: boolean;
  hasSecret: boolean;
}

interface Props {
  stats: DashboardStats;
  sysInfo: SysInfo;
  envFlags: EnvFlags;
}

type Tab = 'analytics' | 'audience' | 'seo' | 'system' | 'config';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

function timeAgo(ts: number): string {
  if (!ts) return '—';
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function fmtBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// ─────────────────────────────────────────────
// SVG Charts
// ─────────────────────────────────────────────

function AreaChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(...data, 1);
  const W = 600; const H = 80;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - (v / max) * H * 0.9,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = linePath + ` L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" aria-label={label}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97757" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#d97757" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function RingChart({ items, total }: { items: { label: string; count: number }[]; total: number }) {
  const COLORS = ['#d97757', '#c6613f', '#393836', '#b0aea5', '#cccbc8'];
  const R = 32; const cx = 40; const cy = 40;
  const circumference = 2 * Math.PI * R;
  let offset = 0;
  const slices = items.slice(0, 5).map((item, i) => {
    const pct = total > 0 ? item.count / total : 0;
    const dash = pct * circumference;
    const slice = { item, pct, dash, offset, color: COLORS[i] };
    offset += dash;
    return slice;
  });
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 80 80" className="w-16 h-16 flex-shrink-0" aria-hidden>
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke={s.color}
            strokeWidth="12"
            strokeDasharray={`${s.dash} ${circumference - s.dash}`}
            strokeDashoffset={-s.offset}
            transform="rotate(-90, 40, 40)"
          />
        ))}
      </svg>
      <div className="space-y-1 min-w-0">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <span className="font-sans-anthropic text-xs text-[var(--text-secondary)] truncate">{s.item.label}</span>
            <span className="font-mono-anthropic text-xs text-[var(--text-charcoal)] ml-auto pl-2">{Math.round(s.pct * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({ buckets }: { buckets: { label: string; count: number }[] }) {
  const max = Math.max(...buckets.map(b => b.count), 1);
  return (
    <div className="space-y-2">
      {buckets.map((b, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between">
            <span className="font-mono-anthropic text-xs text-[var(--text-secondary)]">{b.label}</span>
            <span className="font-mono-anthropic text-xs text-[var(--text-charcoal)]">{fmt(b.count)}</span>
          </div>
          <div className="h-1.5 bg-[var(--border-light)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent-rust)] rounded-full transition-all duration-700"
              style={{ width: `${(b.count / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, max, color = '#d97757' }: { value: number; max: number; color?: string }) {
  return (
    <div className="h-1.5 bg-[var(--border-light)] rounded-full overflow-hidden flex-1">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${max > 0 ? Math.round((value / max) * 100) : 0}%`, background: color }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────

function StatCard({
  label, value, sub, featured, live,
}: {
  label: string; value: string | number; sub?: string; featured?: boolean; live?: boolean;
}) {
  return (
    <div className={`border border-[var(--border-light)] rounded-2xl p-6 space-y-3 transition-all duration-300 hover:border-[var(--text-secondary)]/30 ${featured ? 'bg-[#f5e3c7]' : 'bg-[var(--card-bg)]'}`}>
      <div className="flex items-center gap-2">
        {live && (
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-rust)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-rust)]" />
          </span>
        )}
        <span className="font-sans-anthropic text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">{label}</span>
      </div>
      <div className="font-serif-anthropic text-4xl font-normal text-[var(--text-charcoal)]">{typeof value === 'number' ? fmt(value) : value}</div>
      {sub && <div className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">{sub}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// SEO Audit (static codebase checks encoded client-side)
// ─────────────────────────────────────────────

interface SEOCheck {
  category: string;
  check: string;
  status: 'pass' | 'warn' | 'fail' | 'info';
  detail: string;
}

function getSEOChecks(): SEOCheck[] {
  return [
    // Meta
    { category: 'Meta', check: 'Title tag present', status: 'pass', detail: '"Thineth Shehara" — 16 chars' },
    { category: 'Meta', check: 'Title length (10–60 chars)', status: 'pass', detail: '16 chars — within recommended range' },
    { category: 'Meta', check: 'Meta description present', status: 'pass', detail: 'Describes portfolio + TAMK — 153 chars' },
    { category: 'Meta', check: 'Meta description length (50–160 chars)', status: 'pass', detail: '153 chars — within recommended range' },
    { category: 'Meta', check: 'Favicon configured', status: 'pass', detail: '/logo.png (PNG)' },
    { category: 'Meta', check: 'Open Graph image', status: 'warn', detail: 'og:image not set — social share previews will lack a thumbnail' },
    { category: 'Meta', check: 'Open Graph title / description', status: 'warn', detail: 'og:title and og:description not explicitly set' },
    { category: 'Meta', check: 'Twitter card meta', status: 'warn', detail: 'twitter:card not configured' },
    { category: 'Meta', check: 'Canonical URL', status: 'warn', detail: 'No explicit canonical link tag found' },
    // Structure
    { category: 'Structure', check: 'Single <h1> per page', status: 'pass', detail: 'page.tsx: 1 × <h1> found ("Shehara")' },
    { category: 'Structure', check: 'Semantic HTML elements', status: 'pass', detail: '<main>, <section>, <footer>, <header> all present' },
    { category: 'Structure', check: 'lang attribute on <html>', status: 'pass', detail: 'lang="en" set in layout.tsx' },
    { category: 'Structure', check: 'alt on all <Image> components', status: 'pass', detail: 'arc_card.svg — alt text present' },
    { category: 'Structure', check: 'aria-label on icon-only links', status: 'pass', detail: 'All floating icon anchors carry aria-label' },
    // Performance
    { category: 'Performance', check: 'next/image used (not raw <img>)', status: 'pass', detail: 'All images use next/image for optimization' },
    { category: 'Performance', check: 'Local font subsetting active', status: 'pass', detail: 'Latin / Latin-1 / Symbols subsets (~90% size reduction)' },
    { category: 'Performance', check: 'priority on above-fold image', status: 'pass', detail: 'Arc Card image has priority={true}' },
    { category: 'Performance', check: 'Font preload', status: 'info', detail: 'preload: false — swap without blocking is intentional' },
    // Indexability
    { category: 'Indexability', check: 'robots noindex on /admin', status: 'pass', detail: 'Admin layout sets robots: { index: false }' },
    { category: 'Indexability', check: 'sitemap.xml', status: 'warn', detail: 'No sitemap generated — consider adding app/sitemap.ts' },
    { category: 'Indexability', check: 'robots.txt', status: 'warn', detail: 'No robots.txt found in /public' },
  ];
}

function SEOStatusBadge({ status }: { status: SEOCheck['status'] }) {
  const map = {
    pass: { label: '✓ Pass', classes: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    warn: { label: '⚠ Warn', classes: 'text-amber-700 bg-amber-50 border-amber-200' },
    fail: { label: '✕ Fail', classes: 'text-red-700 bg-red-50 border-red-200' },
    info: { label: '● Info', classes: 'text-[var(--text-secondary)] bg-[var(--bg-warm)] border-[var(--border-light)]' },
  };
  const { label, classes } = map[status];
  return (
    <span className={`inline-block font-mono-anthropic text-[10px] font-semibold uppercase tracking-wider border rounded px-2 py-0.5 ${classes}`}>
      {label}
    </span>
  );
}

// ─────────────────────────────────────────────
// Main Dashboard Client Component
// ─────────────────────────────────────────────

export default function DashboardClient({ stats: initialStats, sysInfo, envFlags }: Props) {
  const [liveStats, setLiveStats] = useState<DashboardStats>(initialStats);
  const stats = liveStats;

  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [trafficView, setTrafficView] = useState<'24h' | '30d'>('24h');
  const [isPending, startTransition] = useTransition();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  // Automatic real-time refreshing cycle
  useEffect(() => {
    let active = true;
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/analytics/stats');
        if (res.ok && active) {
          const data = await res.json();
          setLiveStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch live stats:', err);
      }
    }, 3000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    startTransition(async () => { await logoutAction(); });
  };

  const seoChecks = getSEOChecks();
  const seoCats = [...new Set(seoChecks.map(c => c.category))];

  const chartData = trafficView === '24h'
    ? stats.hourlyViews
    : stats.dailyViews.map(d => d.views);

  const totalDevices = stats.devices.reduce((s, d) => s + d.count, 0);
  const totalBrowsers = stats.browsers.reduce((s, d) => s + d.count, 0);
  const totalOses = stats.oses.reduce((s, d) => s + d.count, 0);
  const totalCountries = stats.countries.reduce((s, c) => s + c.visitors, 0);

  const TABS = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'seo', label: 'SEO Audit', icon: Search },
    { id: 'system', label: 'System', icon: Activity },
    { id: 'config', label: 'Config', icon: Settings },
  ] as const;

  return (
    <div className="flex min-h-screen bg-[var(--bg-warm)]">

      {/* ── Sidebar ───────────────────────────── */}
      <aside className={`bg-[var(--card-bg)] border-r border-[var(--border-light)] flex flex-col justify-between sticky top-0 h-screen transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-light)] flex-shrink-0">
            <div className={`flex items-center gap-2 truncate transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'opacity-0 blur-sm scale-95 pointer-events-none w-0' : 'opacity-100 blur-0 scale-100 w-auto'}`}>
              <span className="font-sans-anthropic text-sm tracking-[0.15em] font-black uppercase text-[var(--text-charcoal)]">
                SHEHARA
              </span>
              <span className="font-mono-anthropic text-[10px] text-[var(--color-cloud-medium)] uppercase tracking-wider">
                / admin
              </span>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className={`p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] aspect-square flex items-center justify-center ${isCollapsed ? 'mx-auto' : ''}`}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 flex flex-col items-center">
            {TABS.map(tab => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`admin-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  title={isCollapsed ? tab.label : undefined}
                  className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] ${
                    isCollapsed 
                      ? 'gap-0 w-12 h-12 justify-center rounded-xl aspect-square flex-shrink-0' 
                      : 'gap-3 w-full px-3 py-3 rounded-xl'
                  } ${
                    isActive
                      ? 'bg-[var(--accent-rust)] text-[var(--bg-warm)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-charcoal)] hover:bg-[var(--bg-warm)]'
                  }`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span className={`font-sans-anthropic text-xs font-semibold uppercase tracking-wider truncate transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'opacity-0 blur-sm scale-90 pointer-events-none w-0' : 'opacity-100 blur-0 scale-100 w-auto'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[var(--border-light)] flex-shrink-0">
          {/* Actions */}
          <div className="flex justify-center px-2">
            <button
              id="admin-logout"
              onClick={handleLogout}
              disabled={isPending}
              title="Sign Out"
              className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--accent-rust)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 active:scale-95 aspect-square rounded-xl flex items-center justify-center mx-auto"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ─────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Main View Container */}
        <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {/* Header section with page title */}
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 border-b border-[var(--border-light)] pb-4 flex-shrink-0">
            <div className="space-y-1">
              <h1 className="font-serif-anthropic text-3xl md:text-4xl font-normal text-[var(--text-charcoal)]">
                {TABS.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="font-sans-anthropic text-sm text-[var(--text-secondary)]">
                {activeTab === 'analytics' && 'Traffic views, visitor trends, and device distributions.'}
                {activeTab === 'audience' && 'Geographical splits, screen resolutions, and scrolling interactions.'}
                {activeTab === 'seo' && 'Codebase tags hierarchy, images accessibility audits, and indexing parameters.'}
                {activeTab === 'system' && 'Node processes heap, logs storage allocation, and uptime details.'}
                {activeTab === 'config' && 'Setup specifications, environment flags, and database deployment details.'}
              </p>
            </div>
            <div className="font-mono-anthropic text-[11px] text-[var(--color-cloud-dark)]">
              Updated · {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

        {/* ══════════════════════════════════════
            TAB 1 — Analytics
        ══════════════════════════════════════ */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Views" value={stats.totalViews} sub="All time" featured />
              <StatCard label="Unique Today" value={stats.uniqueVisitorsToday} sub="Hashed, GDPR-safe" />
              <StatCard label="Online Now" value={stats.activeNow} sub="Last 5 minutes" live />
              <StatCard label="Bounce Rate" value={`${stats.bounceRate}%`} sub="Single-page sessions" />
            </div>

            {/* Returning vs New */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-5 space-y-2">
                <span className="font-sans-anthropic text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Returning</span>
                <div className="font-serif-anthropic text-3xl text-[var(--text-charcoal)]">{fmt(stats.returningVisitors)}</div>
                <div className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">Last 7 days</div>
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-5 space-y-2">
                <span className="font-sans-anthropic text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">New</span>
                <div className="font-serif-anthropic text-3xl text-[var(--text-charcoal)]">{fmt(stats.newVisitors)}</div>
                <div className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">Last 7 days</div>
              </div>
            </div>

            {/* Traffic chart */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">Traffic Over Time</h2>
                <div className="flex gap-1">
                  {(['24h', '30d'] as const).map(v => (
                    <button
                      key={v}
                      id={`admin-traffic-${v}`}
                      onClick={() => setTrafficView(v)}
                      className={`font-mono-anthropic text-xs uppercase tracking-wider px-3 py-1 rounded-lg border transition-all duration-200 ${
                        trafficView === v
                          ? 'bg-[var(--accent-rust)] text-[var(--bg-warm)] border-[var(--accent-rust)]'
                          : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]'
                      }`}
                    >
                      {v === '24h' ? 'Last 24h' : 'Last 30d'}
                    </button>
                  ))}
                </div>
              </div>
              {chartData.some(v => v > 0) ? (
                <AreaChart data={chartData} label="Traffic over time" />
              ) : (
                <div className="h-20 flex items-center justify-center">
                  <span className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No data yet — visit the portfolio to record hits</span>
                </div>
              )}
              {/* X-axis labels */}
              {trafficView === '24h' && (
                <div className="flex justify-between">
                  {[0, 6, 12, 18, 23].map(h => (
                    <span key={h} className="font-mono-anthropic text-[10px] text-[var(--color-cloud-medium)]">{String(h).padStart(2, '0')}:00</span>
                  ))}
                </div>
              )}
            </div>

            {/* Top pages + Top referrers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Top pages */}
              <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
                <h2 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">Top Pages</h2>
                {stats.topPages.length === 0 ? (
                  <p className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No data yet.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.topPages.map((p, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono-anthropic text-xs text-[var(--text-charcoal)] truncate">{p.path}</span>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-mono-anthropic text-xs text-[var(--text-secondary)]">{fmt(p.views)}</span>
                            <span className="font-mono-anthropic text-[10px] text-[var(--color-cloud-medium)]">{p.pct}%</span>
                          </div>
                        </div>
                        <ProgressBar value={p.views} max={stats.topPages[0]?.views || 1} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top referrers */}
              <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
                <h2 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">Top Referrers</h2>
                {stats.topReferrers.length === 0 ? (
                  <p className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No data yet.</p>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border-light)]">
                        {['Source', 'Visits', 'Last Seen'].map(h => (
                          <th key={h} className="font-sans-anthropic text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] pb-2 text-left">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topReferrers.map((r, i) => (
                        <tr key={i} className="border-b border-[var(--border-light)]/50 hover:bg-[var(--card-hover-bg)] transition-colors">
                          <td className="font-mono-anthropic text-xs text-[var(--text-charcoal)] py-2 pr-4 truncate max-w-[120px]">{r.source}</td>
                          <td className="font-mono-anthropic text-xs text-[var(--text-secondary)] py-2 pr-4">{fmt(r.visits)}</td>
                          <td className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)] py-2">{timeAgo(r.lastSeen)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Device / Browser / OS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Devices', items: stats.devices, total: totalDevices },
                { title: 'Browsers', items: stats.browsers, total: totalBrowsers },
                { title: 'Operating Systems', items: stats.oses, total: totalOses },
              ].map(({ title, items, total }) => (
                <div key={title} className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
                  <h2 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">{title}</h2>
                  {items.length === 0
                    ? <p className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No data yet.</p>
                    : <RingChart items={items} total={total} />
                  }
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════
            TAB 2 — Audience & Interaction
        ══════════════════════════════════════ */}
        {activeTab === 'audience' && (
          <div className="space-y-8">

            {/* Countries */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
              <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">Countries</h2>
              {stats.countries.length === 0 ? (
                <p className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No geo data yet. Geo resolution requires deployment on Vercel / Cloudflare.</p>
              ) : (
                <div className="space-y-3">
                  {stats.countries.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-mono-anthropic text-xs text-[var(--text-secondary)] w-4 flex-shrink-0">{i + 1}</span>
                      <span className="text-base flex-shrink-0">{c.flag}</span>
                      <span className="font-sans-anthropic text-sm text-[var(--text-charcoal)] flex-1 min-w-0 truncate">{c.name}</span>
                      <ProgressBar value={c.visitors} max={stats.countries[0]?.visitors || 1} />
                      <span className="font-mono-anthropic text-xs text-[var(--text-secondary)] flex-shrink-0 w-10 text-right">{fmt(c.visitors)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Screen resolutions */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
              <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">Screen Resolutions</h2>
              {stats.screenResolutions.length === 0 ? (
                <p className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No data yet.</p>
              ) : (
                <div className="space-y-3">
                  {stats.screenResolutions.map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-mono-anthropic text-xs text-[var(--text-charcoal)] flex-shrink-0 w-28">{r.label}</span>
                      <ProgressBar value={r.count} max={stats.screenResolutions[0]?.count || 1} />
                      <span className="font-mono-anthropic text-xs text-[var(--text-secondary)] flex-shrink-0">{fmt(r.count)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scroll depth */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">Scroll Depth</h2>
                <p className="font-sans-anthropic text-sm text-[var(--text-secondary)] mt-1">How far visitors scroll down the page.</p>
              </div>
              <div className="space-y-4">
                {stats.scrollDepth.map((s, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-sans-anthropic text-sm font-semibold text-[var(--text-charcoal)]">Reached {s.pct}%</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono-anthropic text-xs text-[var(--text-secondary)]">{fmt(s.reach)} visitors</span>
                        <span className="font-mono-anthropic text-sm font-semibold text-[var(--text-charcoal)]">{s.ratio}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${s.ratio}%`,
                          background: `hsl(${16 + i * 4}, ${65 - i * 5}%, ${50 + i * 3}%)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outbound clicks */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
              <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">Outbound Clicks</h2>
              {stats.outboundClicks.length === 0 ? (
                <p className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No click data yet.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-light)]">
                      {['Link', 'Destination', 'Clicks', 'Last Clicked'].map(h => (
                        <th key={h} className="font-sans-anthropic text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] pb-2 text-left pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stats.outboundClicks.map((c, i) => (
                      <tr key={i} className="border-b border-[var(--border-light)]/50 hover:bg-[var(--card-hover-bg)] transition-colors">
                        <td className="font-sans-anthropic text-sm text-[var(--text-charcoal)] py-3 pr-4 font-semibold">{c.label}</td>
                        <td className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)] py-3 pr-4 truncate max-w-[160px]">{c.href}</td>
                        <td className="font-mono-anthropic text-sm text-[var(--text-charcoal)] py-3 pr-4 font-semibold">{fmt(c.count)}</td>
                        <td className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)] py-3">{timeAgo(c.lastTs)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Page load performance */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-6">
              <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">Page Load Performance</h2>
              <div className="flex items-end gap-4">
                <div>
                  <div className="font-serif-anthropic text-5xl font-normal text-[var(--text-charcoal)]">
                    {stats.loadTimeAvg > 0 ? `${stats.loadTimeAvg}` : '—'}
                  </div>
                  <div className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)] mt-1">ms average load time</div>
                </div>
              </div>
              {stats.loadTimeBuckets.some(b => b.count > 0) && (
                <div className="space-y-2">
                  <div className="font-sans-anthropic text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Distribution</div>
                  <BarChart buckets={stats.loadTimeBuckets} />
                </div>
              )}
              {stats.loadTimeByPage.length > 0 && (
                <div className="space-y-2">
                  <div className="font-sans-anthropic text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">By Page</div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[var(--border-light)]">
                        {['Page', 'Avg Load', 'Samples'].map(h => (
                          <th key={h} className="font-sans-anthropic text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] pb-2 text-left pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.loadTimeByPage.map((p, i) => (
                        <tr key={i} className="border-b border-[var(--border-light)]/50 hover:bg-[var(--card-hover-bg)] transition-colors">
                          <td className="font-mono-anthropic text-xs text-[var(--text-charcoal)] py-2 pr-4">{p.path}</td>
                          <td className="font-mono-anthropic text-xs text-[var(--accent-rust)] py-2 pr-4 font-semibold">{p.avgMs}ms</td>
                          <td className="font-mono-anthropic text-xs text-[var(--text-secondary)] py-2">{fmt(p.samples)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════
            TAB 3 — SEO Audit
        ══════════════════════════════════════ */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">SEO Audit</h2>
              <p className="font-sans-anthropic text-sm text-[var(--text-secondary)] mt-1">
                Static analysis of the portfolio codebase and metadata configuration.
              </p>
            </div>

            {/* Score summary */}
            <div className="grid grid-cols-3 gap-4">
              {(['pass', 'warn', 'fail'] as const).map(status => {
                const count = seoChecks.filter(c => c.status === status).length;
                const map = {
                  pass: { label: 'Passing', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
                  warn: { label: 'Warnings', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
                  fail: { label: 'Failing', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
                };
                return (
                  <div key={status} className={`border rounded-2xl p-5 text-center ${map[status].bg}`}>
                    <div className={`font-serif-anthropic text-4xl font-normal ${map[status].color}`}>{count}</div>
                    <div className={`font-sans-anthropic text-xs font-bold uppercase tracking-wider mt-1 ${map[status].color}`}>{map[status].label}</div>
                  </div>
                );
              })}
            </div>

            {/* Checks by category */}
            {seoCats.map(cat => (
              <div key={cat} className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl overflow-hidden">
                <div className="px-6 py-3 border-b border-[var(--border-light)] bg-[var(--bg-warm)]">
                  <span className="font-sans-anthropic text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">{cat}</span>
                </div>
                <table className="w-full">
                  <tbody>
                    {seoChecks.filter(c => c.category === cat).map((check, i) => (
                      <tr key={i} className="border-b border-[var(--border-light)]/50 last:border-0 hover:bg-[var(--card-hover-bg)] transition-colors">
                        <td className="px-6 py-3 w-48 flex-shrink-0">
                          <SEOStatusBadge status={check.status} />
                        </td>
                        <td className="px-2 py-3">
                          <div className="font-sans-anthropic text-sm text-[var(--text-charcoal)] font-semibold">{check.check}</div>
                          <div className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)] mt-0.5">{check.detail}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB 4 — System
        ══════════════════════════════════════ */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">System Diagnostics</h2>

            {/* Runtime info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Node.js', value: sysInfo.nodeVersion },
                { label: 'Platform', value: sysInfo.platform },
                { label: 'Uptime', value: sysInfo.uptime },
                { label: 'External Mem', value: `${sysInfo.externalMB} MB` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-5 space-y-2">
                  <div className="font-sans-anthropic text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">{label}</div>
                  <div className="font-mono-anthropic text-sm text-[var(--text-charcoal)] font-semibold">{value}</div>
                </div>
              ))}
            </div>

            {/* Memory */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-5">
              <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">Memory Usage</h3>
              {[
                { label: 'Heap Used', value: sysInfo.heapUsedMB, total: sysInfo.heapTotalMB, pct: sysInfo.heapPct },
                { label: 'RSS', value: sysInfo.rssMB, total: null, pct: null },
              ].map(({ label, value, total, pct }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-sans-anthropic text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{label}</span>
                    <span className="font-mono-anthropic text-xs text-[var(--text-charcoal)]">
                      {value} MB{total ? ` / ${total} MB` : ''}
                    </span>
                  </div>
                  {pct !== null && (
                    <div className="h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent-rust)] rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Environment flags */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
              <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">Environment Variables</h3>
              <div className="space-y-3">
                {[
                  { name: 'ADMIN_USERNAME', set: envFlags.hasUsername, warn: 'Using default "admin" — change immediately' },
                  { name: 'ADMIN_PASSWORD', set: envFlags.hasPassword, warn: 'Using default "admin" — change immediately' },
                  { name: 'SESSION_SECRET', set: envFlags.hasSecret, warn: 'Using ephemeral key — sessions reset on restart' },
                ].map(({ name, set, warn }) => (
                  <div key={name} className="flex items-start gap-3">
                    <span className={`font-mono-anthropic text-[10px] font-semibold uppercase tracking-wider border rounded px-2 py-0.5 flex-shrink-0 mt-0.5 ${set ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200'}`}>
                      {set ? '✓ Set' : '⚠ Missing'}
                    </span>
                    <div>
                      <div className="font-mono-anthropic text-xs text-[var(--text-charcoal)]">{name}</div>
                      {!set && <div className="font-mono-anthropic text-[10px] text-amber-700 mt-0.5">{warn}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Log files */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-4">
              <h3 className="font-serif-anthropic text-xl font-normal text-[var(--text-charcoal)]">Log Files</h3>
              {stats.logFiles.length === 0 ? (
                <p className="font-mono-anthropic text-xs text-[var(--color-cloud-medium)]">No log files yet. Visit the portfolio to start recording.</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-light)]">
                      {['File', 'Date', 'Entries', 'Size'].map(h => (
                        <th key={h} className="font-sans-anthropic text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] pb-2 text-left pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stats.logFiles.map((f, i) => (
                      <tr key={i} className="border-b border-[var(--border-light)]/50 hover:bg-[var(--card-hover-bg)] transition-colors">
                        <td className="font-mono-anthropic text-xs text-[var(--text-charcoal)] py-2 pr-4">{f.filename}</td>
                        <td className="font-mono-anthropic text-xs text-[var(--text-secondary)] py-2 pr-4">{f.date}</td>
                        <td className="font-mono-anthropic text-xs text-[var(--text-secondary)] py-2 pr-4">{fmt(f.entries)}</td>
                        <td className="font-mono-anthropic text-xs text-[var(--text-secondary)] py-2">{fmtBytes(f.sizeBytes)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════
            TAB 5 — Config
        ══════════════════════════════════════ */}
        {activeTab === 'config' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">Configuration Guide</h2>
              <p className="font-sans-anthropic text-sm text-[var(--text-secondary)] mt-1">
                Reference for credentials, sessions, and data persistence.
              </p>
            </div>

            {[
              {
                title: 'Setting Credentials',
                body: 'Add these to your .env.local file (never commit it to Git):',
                code: 'ADMIN_USERNAME=your_username\nADMIN_PASSWORD=your_strong_password\nSESSION_SECRET=your_32_char_random_secret',
              },
              {
                title: 'Generating a SESSION_SECRET',
                body: 'Run this in your terminal to generate a cryptographically secure secret:',
                code: 'openssl rand -base64 32',
              },
              {
                title: 'Data Persistence on Vercel',
                body: "Vercel's filesystem is ephemeral — log files reset on each deployment. For persistent analytics on Vercel, consider writing logs to Vercel KV, PlanetScale, or Turso instead of the local filesystem.",
                code: null,
              },
              {
                title: 'Log File Location',
                body: 'Traffic is stored locally in append-only JSONL files, one per day:',
                code: 'data/analytics/logs/traffic-YYYY-MM-DD.jsonl',
              },
              {
                title: 'Resetting a Session',
                body: 'To force a logout, clear the admin_session cookie in your browser DevTools (Application → Cookies → Delete), or simply click Sign Out.',
                code: null,
              },
            ].map(({ title, body, code }) => (
              <div key={title} className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-2xl p-6 space-y-3">
                <h3 className="font-serif-anthropic text-lg font-normal text-[var(--text-charcoal)]">{title}</h3>
                <p className="font-sans-anthropic text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
                {code && (
                  <pre className="bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-xl px-4 py-3 font-mono-anthropic text-xs text-[var(--text-charcoal)] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {code}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}

        </main>
      </div>
    </div>
  );
}
