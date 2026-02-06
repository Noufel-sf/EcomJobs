import React from 'react';
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background dark:bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Saleh Store</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted marketplace for quality products at great prices.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="cursor-pointer rounded-full bg-muted hover:bg-primary hover:text-primary-foreground p-2 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="cursor-pointer rounded-full bg-muted hover:bg-primary hover:text-primary-foreground p-2 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="cursor-pointer rounded-full bg-muted hover:bg-primary hover:text-primary-foreground p-2 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="cursor-pointer rounded-full bg-muted hover:bg-primary hover:text-primary-foreground p-2 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Saleh Store. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
