import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account - Saleh Store',
  description: 'Join Saleh Store today! Create your free account to enjoy exclusive deals, faster checkout, and personalized recommendations.',
  keywords: ['register', 'sign up', 'create account', 'new account'],
  openGraph: {
    title: 'Create Account - Saleh Store',
    description: 'Join thousands of happy customers. Create your free account today.',
    type: 'website',
  },
  robots: {
    index: false, // Registration pages shouldn't be indexed
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
