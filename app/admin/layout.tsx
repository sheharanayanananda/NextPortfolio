import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel · Shehara',
  description: 'Private administrative dashboard for the portfolio.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-warm)] text-[var(--text-charcoal)] font-sans-anthropic">
      {children}
    </div>
  );
}
