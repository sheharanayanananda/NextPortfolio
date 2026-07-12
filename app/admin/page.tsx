import { requireAuth } from '@/app/lib/auth';
import { computeStats, getSystemInfo, type DashboardStats } from '@/app/lib/analytics';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await requireAuth();

  const stats: DashboardStats = computeStats();
  const sysInfo = getSystemInfo();
  const envFlags = {
    hasUsername: !!process.env.ADMIN_USERNAME,
    hasPassword: !!process.env.ADMIN_PASSWORD,
    hasSecret: !!process.env.SESSION_SECRET,
  };

  return (
    <DashboardClient
      stats={stats}
      sysInfo={sysInfo}
      envFlags={envFlags}
    />
  );
}
