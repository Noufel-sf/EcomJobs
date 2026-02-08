import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/Toaster";
import LayoutWrapper from "@/lib/Layout";
import { ReduxProvider } from "./Redux/ReduxProvider";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});



export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'), // Replace with your actual domain
  title: {
    default: 'Saleh Store - Your Trusted Online Marketplace',
    template: '%s | Saleh Store',
  },
  description: 'Shop quality products at great prices. Browse electronics, fashion, home goods and more. Fast shipping, secure checkout, and excellent customer service.',
  keywords: ['online store', 'ecommerce', 'electronics', 'shopping', 'marketplace', 'best deals', 'buy online'],
  authors: [{ name: 'Saleh Store' }],
  creator: 'Saleh Store',
  publisher: 'Saleh Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    title: 'Saleh Store - Your Trusted Online Marketplace',
    description: 'Shop quality products at great prices with fast shipping and secure checkout.',
    siteName: 'Saleh Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saleh Store - Your Trusted Online Marketplace',
    description: 'Shop quality products at great prices with fast shipping and secure checkout.',
    creator: '@salehstore', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${outfit.variable}`}
      >
        <ThemeProvider>
          <ReduxProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <Toaster />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
