import Hero from '@/components/Hero';
import BestSellingSection from '@/components/BestSellingSection';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold components for better initial load performance
const SponsoredSection = dynamic(() => import('@/components/SponsoredSection'), {
  loading: () => <div className="h-64 animate-pulse bg-muted" />,
});

const JobsSponsor = dynamic(() => import('@/components/JobsSponsor'), {
  loading: () => <div className="h-64 animate-pulse bg-muted" />,
});

const JobsSection = dynamic(() => import('@/components/JobsSection'), {
  loading: () => <div className="h-64 animate-pulse bg-muted" />,
});

export const metadata: Metadata = {
  title: 'Saleh Store - Your Trusted Online Marketplace',
  description: 'Shop quality products at great prices. Browse electronics, fashion, home goods and more. Fast shipping, secure checkout, and excellent customer service.',
  keywords: ['online store', 'ecommerce', 'electronics', 'shopping', 'marketplace', 'best deals'],
  authors: [{ name: 'Saleh Store' }],
  openGraph: {
    title: 'Saleh Store - Your Trusted Online Marketplace',
    description: 'Shop quality products at great prices with fast shipping and secure checkout.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saleh Store - Your Trusted Online Marketplace',
    description: 'Shop quality products at great prices with fast shipping and secure checkout.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const HomePage = () => {
  return (
    <div>
      <h1 className="sr-only">Saleh Store - Your Trusted Online Marketplace for Quality Products</h1>
      <Hero />
      <BestSellingSection />
      <SponsoredSection />
      <JobsSponsor />
      <JobsSection />
    </div>
  );
};

export default HomePage;
