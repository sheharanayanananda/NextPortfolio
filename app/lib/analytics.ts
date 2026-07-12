import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as os from 'os';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type EventType = 'pageview' | 'scroll' | 'click' | 'performance';

export interface TrackPayload {
  type: EventType;
  path: string;
  referrer?: string;
  language?: string;
  screenWidth?: number;
  screenHeight?: number;
  // scroll
  scrollPct?: number;
  // click
  linkLabel?: string;
  linkHref?: string;
  // performance
  loadMs?: number;
}

export interface LogEntry {
  ts: number;           // unix ms
  type: EventType;
  path: string;
  visitorHash: string;  // daily-salted IP hash
  ua: string;
  country: string;
  referrer: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  // optional per type
  scrollPct?: number;
  linkLabel?: string;
  linkHref?: string;
  loadMs?: number;
}

export interface DashboardStats {
  totalViews: number;
  uniqueVisitorsToday: number;
  activeNow: number;
  bounceRate: number;
  hourlyViews: number[];     // index 0–23
  dailyViews: { date: string; views: number }[];
  topPages: { path: string; views: number; pct: number }[];
  topReferrers: { source: string; visits: number; lastSeen: number }[];
  devices: { label: string; count: number }[];
  browsers: { label: string; count: number }[];
  oses: { label: string; count: number }[];
  countries: { code: string; name: string; flag: string; visitors: number }[];
  scrollDepth: { pct: number; reach: number; ratio: number }[];
  outboundClicks: { label: string; href: string; count: number; lastTs: number }[];
  loadTimeAvg: number;
  loadTimeBuckets: { label: string; count: number }[];
  loadTimeByPage: { path: string; avgMs: number; samples: number }[];
  screenResolutions: { label: string; count: number }[];
  returningVisitors: number;
  newVisitors: number;
  logFiles: { filename: string; sizeBytes: number; entries: number; date: string }[];
}

// ─────────────────────────────────────────────
// Storage helpers
// ─────────────────────────────────────────────

function logsDir(): string {
  return path.join(process.cwd(), 'data', 'analytics', 'logs');
}

function todayFilename(): string {
  return `traffic-${dateStr(Date.now())}.jsonl`;
}

function dateStr(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function ensureDir() {
  const dir = logsDir();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ─────────────────────────────────────────────
// IP anonymisation
// ─────────────────────────────────────────────

function dailySalt(): string {
  return dateStr(Date.now());
}

export function hashIp(ip: string): string {
  return crypto
    .createHmac('sha256', dailySalt())
    .update(ip)
    .digest('hex')
    .slice(0, 16);
}

// ─────────────────────────────────────────────
// User-agent parsing (no external deps)
// ─────────────────────────────────────────────

export function parseUA(ua: string): { browser: string; os: string; device: string } {
  const u = ua || '';

  // Device
  let device = 'Desktop';
  if (/tablet|ipad/i.test(u)) device = 'Tablet';
  else if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(u)) device = 'Mobile';

  // Browser
  let browser = 'Other';
  if (/edg\//i.test(u)) browser = 'Edge';
  else if (/opr\//i.test(u)) browser = 'Opera';
  else if (/chrome|chromium/i.test(u)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(u)) browser = 'Firefox';
  else if (/safari/i.test(u)) browser = 'Safari';

  // OS
  let os = 'Other';
  if (/windows/i.test(u)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(u)) os = 'macOS';
  else if (/iphone|ipad|ipod/i.test(u)) os = 'iOS';
  else if (/android/i.test(u)) os = 'Android';
  else if (/linux/i.test(u)) os = 'Linux';

  return { browser, os, device };
}

// ─────────────────────────────────────────────
// Country helpers
// ─────────────────────────────────────────────

const COUNTRY_NAMES: Record<string, string> = {
  FI: 'Finland', LK: 'Sri Lanka', US: 'United States', GB: 'United Kingdom',
  DE: 'Germany', FR: 'France', CA: 'Canada', AU: 'Australia', NL: 'Netherlands',
  SE: 'Sweden', NO: 'Norway', DK: 'Denmark', IN: 'India', JP: 'Japan',
  SG: 'Singapore', AE: 'United Arab Emirates', NZ: 'New Zealand', CH: 'Switzerland',
  AT: 'Austria', BE: 'Belgium', PL: 'Poland', IT: 'Italy', ES: 'Spain',
  PT: 'Portugal', BR: 'Brazil', MX: 'Mexico', ZA: 'South Africa', NG: 'Nigeria',
  KR: 'South Korea', CN: 'China', HK: 'Hong Kong', TW: 'Taiwan', MY: 'Malaysia',
  TH: 'Thailand', ID: 'Indonesia', PH: 'Philippines', PK: 'Pakistan',
  BD: 'Bangladesh', EG: 'Egypt', SA: 'Saudi Arabia', IL: 'Israel', TR: 'Turkey',
  RU: 'Russia', UA: 'Ukraine', PL2: 'Poland', RO: 'Romania', HU: 'Hungary',
};

const COUNTRY_FLAGS: Record<string, string> = {
  FI: '🇫🇮', LK: '🇱🇰', US: '🇺🇸', GB: '🇬🇧', DE: '🇩🇪', FR: '🇫🇷',
  CA: '🇨🇦', AU: '🇦🇺', NL: '🇳🇱', SE: '🇸🇪', NO: '🇳🇴', DK: '🇩🇰',
  IN: '🇮🇳', JP: '🇯🇵', SG: '🇸🇬', AE: '🇦🇪', NZ: '🇳🇿', CH: '🇨🇭',
  AT: '🇦🇹', BE: '🇧🇪', PL: '🇵🇱', IT: '🇮🇹', ES: '🇪🇸', PT: '🇵🇹',
  BR: '🇧🇷', MX: '🇲🇽', ZA: '🇿🇦', NG: '🇳🇬', KR: '🇰🇷', CN: '🇨🇳',
  HK: '🇭🇰', TW: '🇹🇼', MY: '🇲🇾', TH: '🇹🇭', ID: '🇮🇩', PH: '🇵🇭',
  PK: '🇵🇰', BD: '🇧🇩', EG: '🇪🇬', SA: '🇸🇦', IL: '🇮🇱', TR: '🇹🇷',
  RU: '🇷🇺', UA: '🇺🇦', RO: '🇷🇴', HU: '🇭🇺',
};

// ─────────────────────────────────────────────
// Write a log entry
// ─────────────────────────────────────────────

export function writeLog(entry: LogEntry): void {
  try {
    ensureDir();
    const file = path.join(logsDir(), todayFilename());
    fs.appendFileSync(file, JSON.stringify(entry) + '\n', 'utf8');
  } catch {
    // Never throw — analytics must never crash the main app
  }
}

// ─────────────────────────────────────────────
// Read and parse logs
// ─────────────────────────────────────────────

function readAllEntries(days = 30): LogEntry[] {
  try {
    ensureDir();
    const dir = logsDir();
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsonl')).sort().reverse().slice(0, days);
    const entries: LogEntry[] = [];
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      for (const line of raw.split('\n')) {
        if (!line.trim()) continue;
        try { entries.push(JSON.parse(line)); } catch { /* skip bad lines */ }
      }
    }
    return entries;
  } catch {
    return [];
  }
}

function readTodayEntries(): LogEntry[] {
  try {
    ensureDir();
    const file = path.join(logsDir(), todayFilename());
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, 'utf8');
    const entries: LogEntry[] = [];
    for (const line of raw.split('\n')) {
      if (!line.trim()) continue;
      try { entries.push(JSON.parse(line)); } catch { /* skip */ }
    }
    return entries;
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────
// Aggregate stats
// ─────────────────────────────────────────────

export function computeStats(): DashboardStats {
  const rawAll = readAllEntries(30);
  const rawTodayAll = readTodayEntries();

  // Exclude all admin-related logs
  const all = rawAll.filter(e => e.path && !e.path.startsWith('/admin'));
  const todayAll = rawTodayAll.filter(e => e.path && !e.path.startsWith('/admin'));

  const pageviews = all.filter(e => e.type === 'pageview');
  const todayPV = todayAll.filter(e => e.type === 'pageview');
  const now = Date.now();
  const fiveMin = 5 * 60 * 1000;

  // Active now
  const activeNow = new Set(
    all.filter(e => now - e.ts < fiveMin).map(e => e.visitorHash)
  ).size;

  // Unique visitors today
  const uniqueToday = new Set(todayPV.map(e => e.visitorHash)).size;

  // Bounce rate: visitors who had only 1 page view
  const sessionCounts: Record<string, number> = {};
  for (const e of todayPV) {
    sessionCounts[e.visitorHash] = (sessionCounts[e.visitorHash] || 0) + 1;
  }
  const sessions = Object.values(sessionCounts);
  const bounced = sessions.filter(c => c === 1).length;
  const bounceRate = sessions.length > 0 ? Math.round((bounced / sessions.length) * 100) : 0;

  // Hourly views (today, 0–23)
  const hourlyViews = Array(24).fill(0);
  for (const e of todayPV) {
    const h = new Date(e.ts).getHours();
    hourlyViews[h]++;
  }

  // Daily views (last 30 days)
  const dailyMap: Record<string, number> = {};
  for (const e of pageviews) {
    const d = dateStr(e.ts);
    dailyMap[d] = (dailyMap[d] || 0) + 1;
  }
  const dailyViews = Object.entries(dailyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, views]) => ({ date, views }));

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const e of pageviews) pageCounts[e.path] = (pageCounts[e.path] || 0) + 1;
  const totalViews = pageviews.length;
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([p, views]) => ({ path: p, views, pct: totalViews > 0 ? Math.round((views / totalViews) * 1000) / 10 : 0 }));

  // Top referrers
  const refMap: Record<string, { visits: number; lastTs: number }> = {};
  for (const e of pageviews) {
    const src = e.referrer || 'Direct';
    let domain = src;
    if (src !== 'Direct') {
      try { domain = new URL(src).hostname.replace('www.', ''); } catch { domain = src; }
    }
    if (!refMap[domain]) refMap[domain] = { visits: 0, lastTs: 0 };
    refMap[domain].visits++;
    if (e.ts > refMap[domain].lastTs) refMap[domain].lastTs = e.ts;
  }
  const topReferrers = Object.entries(refMap)
    .sort(([, a], [, b]) => b.visits - a.visits)
    .slice(0, 10)
    .map(([source, v]) => ({ source, visits: v.visits, lastSeen: v.lastTs }));

  // Devices / browsers / OS
  function countBy<T extends LogEntry>(entries: T[], fn: (e: T) => string): { label: string; count: number }[] {
    const m: Record<string, number> = {};
    for (const e of entries) { const k = fn(e); m[k] = (m[k] || 0) + 1; }
    return Object.entries(m).sort(([, a], [, b]) => b - a).map(([label, count]) => ({ label, count }));
  }
  const parsed = pageviews.map(e => ({ ...e, ...parseUA(e.ua) }));
  const devices = countBy(parsed, e => e.device);
  const browsers = countBy(parsed, e => e.browser);
  const oses = countBy(parsed, e => e.os);

  // Countries
  const countryMap: Record<string, number> = {};
  for (const e of pageviews) {
    const c = e.country || 'XX';
    countryMap[c] = (countryMap[c] || 0) + 1;
  }
  const countries = Object.entries(countryMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .map(([code, visitors]) => ({
      code,
      name: COUNTRY_NAMES[code] || code,
      flag: COUNTRY_FLAGS[code] || '🌐',
      visitors,
    }));

  // Scroll depth
  const scrollEvents = all.filter(e => e.type === 'scroll');
  const scrollMilestones = [25, 50, 75, 100];
  const totalSessions30 = new Set(pageviews.map(e => e.visitorHash)).size;
  const scrollDepth = scrollMilestones.map(pct => {
    const reach = new Set(scrollEvents.filter(e => (e.scrollPct ?? 0) >= pct).map(e => e.visitorHash)).size;
    return { pct, reach, ratio: totalSessions30 > 0 ? Math.round((reach / Math.max(totalSessions30, 1)) * 100) : 0 };
  });

  // Outbound clicks
  const clickEvents = all.filter(e => e.type === 'click');
  const clickMap: Record<string, { label: string; href: string; count: number; lastTs: number }> = {};
  for (const e of clickEvents) {
    const key = e.linkHref || 'unknown';
    if (!clickMap[key]) clickMap[key] = { label: e.linkLabel || key, href: key, count: 0, lastTs: 0 };
    clickMap[key].count++;
    if (e.ts > clickMap[key].lastTs) clickMap[key].lastTs = e.ts;
  }
  const outboundClicks = Object.values(clickMap).sort((a, b) => b.count - a.count).slice(0, 10);

  // Performance
  const perfEvents = all.filter(e => e.type === 'performance' && e.loadMs != null);
  const totalMs = perfEvents.reduce((s, e) => s + (e.loadMs || 0), 0);
  const loadTimeAvg = perfEvents.length > 0 ? Math.round(totalMs / perfEvents.length) : 0;

  const loadTimeBuckets = [
    { label: '< 500ms', count: perfEvents.filter(e => (e.loadMs || 0) < 500).length },
    { label: '500–1500ms', count: perfEvents.filter(e => (e.loadMs || 0) >= 500 && (e.loadMs || 0) < 1500).length },
    { label: '> 1500ms', count: perfEvents.filter(e => (e.loadMs || 0) >= 1500).length },
  ];

  const perfByPage: Record<string, { total: number; count: number }> = {};
  for (const e of perfEvents) {
    if (!perfByPage[e.path]) perfByPage[e.path] = { total: 0, count: 0 };
    perfByPage[e.path].total += e.loadMs || 0;
    perfByPage[e.path].count++;
  }
  const loadTimeByPage = Object.entries(perfByPage)
    .map(([path, v]) => ({ path, avgMs: Math.round(v.total / v.count), samples: v.count }))
    .sort((a, b) => a.avgMs - b.avgMs);

  // Screen resolutions
  const resMap: Record<string, number> = {};
  for (const e of pageviews) {
    if (e.screenWidth && e.screenHeight) {
      const k = `${e.screenWidth}×${e.screenHeight}`;
      resMap[k] = (resMap[k] || 0) + 1;
    }
  }
  const screenResolutions = Object.entries(resMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([label, count]) => ({ label, count }));

  // Returning vs new (7 days vs previous 7 days)
  const sevenDaysAgo = now - 7 * 86400000;
  const fourteenDaysAgo = now - 14 * 86400000;
  const recentVisitors = new Set(pageviews.filter(e => e.ts > sevenDaysAgo).map(e => e.visitorHash));
  const olderVisitors = new Set(pageviews.filter(e => e.ts > fourteenDaysAgo && e.ts <= sevenDaysAgo).map(e => e.visitorHash));
  let returning = 0;
  recentVisitors.forEach(v => { if (olderVisitors.has(v)) returning++; });
  const newVisitors = recentVisitors.size - returning;

  // Log file stats
  const logFiles = getLogFileStats();

  return {
    totalViews,
    uniqueVisitorsToday: uniqueToday,
    activeNow,
    bounceRate,
    hourlyViews,
    dailyViews,
    topPages,
    topReferrers,
    devices,
    browsers,
    oses,
    countries,
    scrollDepth,
    outboundClicks,
    loadTimeAvg,
    loadTimeBuckets,
    loadTimeByPage,
    screenResolutions,
    returningVisitors: returning,
    newVisitors,
    logFiles,
  };
}

// ─────────────────────────────────────────────
// Log file stats (for system tab)
// ─────────────────────────────────────────────

export function getLogFileStats() {
  try {
    ensureDir();
    const dir = logsDir();
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.jsonl'))
      .sort()
      .reverse()
      .map(filename => {
        const fp = path.join(dir, filename);
        const stat = fs.statSync(fp);
        const raw = fs.readFileSync(fp, 'utf8');
        const entries = raw.split('\n').filter(l => l.trim()).length;
        const date = filename.replace('traffic-', '').replace('.jsonl', '');
        return { filename, sizeBytes: stat.size, entries, date };
      });
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────
// System info
// ─────────────────────────────────────────────

export function getSystemInfo() {
  const mem = process.memoryUsage();
  const upSec = process.uptime();
  const h = Math.floor(upSec / 3600);
  const m = Math.floor((upSec % 3600) / 60);
  const uptime = h > 0 ? `${h}h ${m}m` : `${m}m`;

  return {
    nodeVersion: process.version,
    platform: process.platform,
    uptime,
    heapUsedMB: (mem.heapUsed / 1024 / 1024).toFixed(1),
    heapTotalMB: (mem.heapTotal / 1024 / 1024).toFixed(1),
    externalMB: (mem.external / 1024 / 1024).toFixed(1),
    rssMB: (mem.rss / 1024 / 1024).toFixed(1),
    heapPct: Math.round((mem.heapUsed / mem.heapTotal) * 100),
  };
}

// ─────────────────────────────────────────────
// Demo data (used when Demo Mode is toggled)
// ─────────────────────────────────────────────

export function getDemoStats(): DashboardStats {
  return {
    totalViews: 2481,
    uniqueVisitorsToday: 34,
    activeNow: 3,
    bounceRate: 42,
    hourlyViews: [2,1,0,0,0,1,3,8,14,22,28,31,25,19,24,27,30,22,18,14,9,6,4,3],
    dailyViews: Array.from({ length: 30 }, (_, i) => {
      const d = new Date(Date.now() - (29 - i) * 86400000);
      return { date: d.toISOString().slice(0, 10), views: Math.floor(Math.random() * 90) + 10 };
    }),
    topPages: [
      { path: '/', views: 1840, pct: 74.2 },
      { path: '/slate', views: 641, pct: 25.8 },
    ],
    topReferrers: [
      { source: 'Direct', visits: 920, lastSeen: Date.now() - 3600000 },
      { source: 'github.com', visits: 312, lastSeen: Date.now() - 7200000 },
      { source: 'linkedin.com', visits: 184, lastSeen: Date.now() - 14400000 },
      { source: 'google.com', visits: 98, lastSeen: Date.now() - 86400000 },
    ],
    devices: [{ label: 'Desktop', count: 1580 }, { label: 'Mobile', count: 720 }, { label: 'Tablet', count: 181 }],
    browsers: [{ label: 'Chrome', count: 1420 }, { label: 'Safari', count: 680 }, { label: 'Firefox', count: 240 }, { label: 'Edge', count: 141 }],
    oses: [{ label: 'macOS', count: 920 }, { label: 'Windows', count: 640 }, { label: 'iOS', count: 520 }, { label: 'Android', count: 280 }, { label: 'Linux', count: 121 }],
    countries: [
      { code: 'FI', name: 'Finland', flag: '🇫🇮', visitors: 210 },
      { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', visitors: 98 },
      { code: 'US', name: 'United States', flag: '🇺🇸', visitors: 72 },
      { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', visitors: 54 },
      { code: 'DE', name: 'Germany', flag: '🇩🇪', visitors: 38 },
      { code: 'NL', name: 'Netherlands', flag: '🇳🇱', visitors: 28 },
      { code: 'SE', name: 'Sweden', flag: '🇸🇪', visitors: 21 },
      { code: 'IN', name: 'India', flag: '🇮🇳', visitors: 18 },
    ],
    scrollDepth: [
      { pct: 25, reach: 310, ratio: 91 },
      { pct: 50, reach: 251, ratio: 74 },
      { pct: 75, reach: 197, ratio: 58 },
      { pct: 100, reach: 132, ratio: 39 },
    ],
    outboundClicks: [
      { label: 'GitHub Profile', href: 'https://github.com/sheharanayanananda', count: 148, lastTs: Date.now() - 3600000 },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/thineth-nayanananda-54815b228/', count: 92, lastTs: Date.now() - 10800000 },
      { label: 'Email Me', href: 'mailto:sheharanayanananda@gmail.com', count: 67, lastTs: Date.now() - 18000000 },
      { label: 'Resume Download', href: '/resume.pdf', count: 41, lastTs: Date.now() - 43200000 },
    ],
    loadTimeAvg: 423,
    loadTimeBuckets: [
      { label: '< 500ms', count: 1520 },
      { label: '500–1500ms', count: 780 },
      { label: '> 1500ms', count: 181 },
    ],
    loadTimeByPage: [
      { path: '/', avgMs: 387, samples: 1840 },
      { path: '/slate', avgMs: 512, samples: 641 },
    ],
    screenResolutions: [
      { label: '1920×1080', count: 620 },
      { label: '1440×900', count: 410 },
      { label: '390×844', count: 380 },
      { label: '1366×768', count: 290 },
      { label: '375×667', count: 210 },
    ],
    returningVisitors: 128,
    newVisitors: 206,
    logFiles: [
      { filename: `traffic-${new Date().toISOString().slice(0,10)}.jsonl`, sizeBytes: 84000, entries: 1204, date: new Date().toISOString().slice(0,10) },
      { filename: `traffic-${new Date(Date.now()-86400000).toISOString().slice(0,10)}.jsonl`, sizeBytes: 61000, entries: 890, date: new Date(Date.now()-86400000).toISOString().slice(0,10) },
    ],
  };
}
