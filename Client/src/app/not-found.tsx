'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-background to-muted">
      <div className="space-y-6 max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-9xl md:text-[12rem] font-bold">
          404
        </h1>
        
        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/">
            <Button
              size="lg"
              className="animate-fade-in cursor-pointer min-w-[200px]"
              variant="default"
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="cursor-pointer min-w-[200px]"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 text-sm text-muted-foreground">
          <p>
            Lost? Try searching from our{' '}
            <Link href="/" className="text-primary hover:underline cursor-pointer">
              homepage
            </Link>
            {' '}or{' '}
            <Link href="/products" className="text-primary hover:underline cursor-pointer">
              browse products
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
