import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Saleh Store',
  description: 'Admin dashboard for managing products, orders, and store operations.',
  robots: {
    index: false, // Admin pages should never be indexed
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
