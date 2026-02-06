import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart - Saleh Store',
  description: 'Review your shopping cart, update quantities, and proceed to checkout. Secure payment and fast shipping available.',
  keywords: ['shopping cart', 'checkout', 'cart items', 'purchase'],
  openGraph: {
    title: 'Shopping Cart - Saleh Store',
    description: 'Review your items and proceed to secure checkout.',
    type: 'website',
  },
  robots: {
    index: false, // Cart pages typically shouldn't be indexed
    follow: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
