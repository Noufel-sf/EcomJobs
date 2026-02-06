'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Globe, ChevronDown } from 'lucide-react';

const TopBar = () => {
  const [language, setLanguage] = useState('en');

  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ar', label: 'العربية', flag: '🇩🇿' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const currentLanguage = languages.find((lang) => lang.value === language);

  return (
    <div className="bg-orange-400 py-2  text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10">
          {/* Left side - Contact info */}
          <div className="flex items-center gap-4 lg:gap-6">
            <a
              href="tel:+213555123456"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-medium">
                +213 555 123 456
              </span>
            </a>

            <a
              href="mailto:support@store.com"
              className="hidden md:flex items-center gap-2 hover:opacity-80 transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="font-medium">support@store.com</span>
            </a>

            <div className="hidden lg:flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-medium">Free Shipping on Orders $50+</span>
            </div>
          </div>

          {/* Right side - Links & Language switcher */}
          <div className="flex items-center gap-3 lg:gap-4">
            <Link
              href="/about"
              className="hover:opacity-80 transition font-medium"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="hover:opacity-80 transition font-medium"
            >
              Contact
            </Link>

            <Link
              href="/help"
              className="hidden sm:inline hover:opacity-80 transition font-medium"
            >
              Help Center
            </Link>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {currentLanguage?.flag} {currentLanguage?.label}
                  </span>
                  <span className="sm:hidden">{currentLanguage?.flag}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={setLanguage}
                >
                  {languages.map((lang) => (
                    <DropdownMenuRadioItem key={lang.value} value={lang.value}>
                      <span className="mr-2">{lang.flag}</span>
                      {lang.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
