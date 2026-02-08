import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Order - Saleh Store',
  description: 'Complete your purchase with secure checkout. Enter shipping and payment details to finalize your order.',
  keywords: ['checkout', 'complete order', 'payment', 'shipping'],
  openGraph: {
    title: 'Complete Order - Saleh Store',
    description: 'Secure checkout for your order.',
    type: 'website',
  },
  robots: {
    index: false, // Checkout pages shouldn't be indexed
    follow: false,
  },
};

export default function CompleteOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
