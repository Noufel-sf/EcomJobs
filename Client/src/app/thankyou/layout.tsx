import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation - Thank You!',
  description: 'Thank you for your order! Your purchase has been confirmed and will be shipped soon.',
  keywords: ['order confirmation', 'thank you', 'order placed'],
  openGraph: {
    title: 'Order Confirmation - Saleh Store',
    description: 'Your order has been confirmed!',
    type: 'website',
  },
  robots: {
    index: false, // Confirmation pages shouldn't be indexed
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
