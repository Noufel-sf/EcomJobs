import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account - Saleh Store',
  description: 'Manage your account, view orders, update profile information, and track your shipments.',
  keywords: ['my account', 'profile', 'orders', 'account settings'],
  openGraph: {
    title: 'My Account - Saleh Store',
    description: 'Manage your account and view your orders.',
    type: 'website',
  },
  robots: {
    index: false, // Account pages shouldn't be indexed
    follow: false,
  },
};

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
