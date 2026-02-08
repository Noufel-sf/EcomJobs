import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Saleh Store',
  description: 'Sign in to your Saleh Store account to access your orders, wishlist, and personalized shopping experience.',
  keywords: ['login', 'sign in', 'account', 'user login'],
  openGraph: {
    title: 'Login - Saleh Store',
    description: 'Sign in to your account for a personalized shopping experience.',
    type: 'website',
  },
  robots: {
    index: false, // Login pages shouldn't be indexed
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
