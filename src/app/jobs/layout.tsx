import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers & Jobs - Saleh Store',
  description: 'Join our team! Explore career opportunities at Saleh Store. Find job openings and build your career with us.',
  keywords: ['jobs', 'careers', 'hiring', 'employment', 'work with us'],
  openGraph: {
    title: 'Careers & Jobs - Saleh Store',
    description: 'Explore career opportunities and join our growing team.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
