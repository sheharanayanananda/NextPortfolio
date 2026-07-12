import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth';
import { computeStats } from '@/app/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = computeStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: 'Failed to compute stats' }, { status: 500 });
  }
}
