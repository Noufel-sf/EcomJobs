import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products - Saleh Store',
  description: 'Browse our complete collection of quality products. Shop electronics, fashion, home goods and more with fast shipping and secure checkout.',
  keywords: ['products', 'online shopping', 'electronics', 'buy online', 'shop now'],
  openGraph: {
    title: 'All Products - Saleh Store',
    description: 'Browse our complete collection of quality products with great deals.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
