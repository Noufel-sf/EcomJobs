import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center - Saleh Store',
  description: 'Get help with your orders, shipping, returns, and more. Find answers to frequently asked questions or contact our support team.',
  keywords: ['help', 'support', 'FAQs', 'customer service', 'contact'],
  openGraph: {
    title: 'Help Center - Saleh Store',
    description: 'Get answers to your questions and contact our support team.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
