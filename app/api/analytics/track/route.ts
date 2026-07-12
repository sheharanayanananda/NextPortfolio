import { NextRequest, NextResponse } from 'next/server';
import { writeLog, hashIp, parseUA, type TrackPayload } from '@/app/lib/analytics';

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

    // Resolve geo country (Vercel / Cloudflare / generic headers)
    const country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country-code') ||
      '';

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
