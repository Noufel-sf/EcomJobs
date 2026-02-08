import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details - Saleh Store',
  description: 'View detailed product information, specifications, reviews, and pricing. Add to cart and buy now.',
  keywords: ['product details', 'buy online', 'product specifications', 'reviews'],
  openGraph: {
    title: 'Product Details - Saleh Store',
    description: 'View detailed product information and customer reviews.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
