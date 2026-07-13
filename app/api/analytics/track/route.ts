import { NextRequest, NextResponse } from 'next/server';
import { writeLog, hashIp, type TrackPayload } from '@/app/lib/analytics';

// Module-level cache: IP string → ISO-2 country code (persists for the process lifetime)
const _geoCache = new Map<string, string>();

export async function POST(req: NextRequest) {
  try {
    const body: TrackPayload = await req.json();
    if (!body?.type || !body?.path) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Resolve client IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '0.0.0.0';

    // Resolve geo country — CDN headers first (Vercel / Cloudflare)
    let country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country-code') ||
      '';

    // IP-geolocation fallback when running outside Vercel/Cloudflare
    const isLocal =
      ip === '127.0.0.1' || ip === '::1' || ip === '0.0.0.0' ||
      ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.');

    if (!country && !isLocal) {
      if (_geoCache.has(ip)) {
        country = _geoCache.get(ip)!;
      } else {
        try {
          const ctrl = new AbortController();
          const timeout = setTimeout(() => ctrl.abort(), 400);
          const res = await fetch(
            `http://ip-api.com/json/${ip}?fields=countryCode`,
            { signal: ctrl.signal, cache: 'no-store' }
          );
          clearTimeout(timeout);
          if (res.ok) {
            const geo = await res.json() as { countryCode?: string };
            country = geo.countryCode || '';
          }
        } catch { /* silent — analytics must never crash */ }

        _geoCache.set(ip, country);
        // Prevent unbounded growth — evict oldest entry
        if (_geoCache.size > 5000) {
          const oldest = _geoCache.keys().next().value;
          if (oldest !== undefined) _geoCache.delete(oldest);
        }
      }
    }

    const ua = req.headers.get('user-agent') || '';

    writeLog({
      ts: Date.now(),
      type: body.type,
      path: body.path.slice(0, 256),
      visitorHash: hashIp(ip),
      ua,
      country: country.toUpperCase().slice(0, 2),
      referrer: (body.referrer || '').slice(0, 512),
      language: (body.language || '').slice(0, 20),
      screenWidth: body.screenWidth || 0,
      screenHeight: body.screenHeight || 0,
      scrollPct: body.scrollPct,
      linkLabel: body.linkLabel?.slice(0, 128),
      linkHref: body.linkHref?.slice(0, 512),
      loadMs: body.loadMs,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Swallow all errors — analytics must never affect the visitor
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Disable body parsing size limit for this route
export const runtime = 'nodejs';
