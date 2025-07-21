'use client';

import React from 'react';
import { Copyright, MessageCircle, X, Instagram } from 'lucide-react';
import TranslatedText from '@/app/components/TranslatedText';
import { usePathname } from 'next/navigation';
import { FooterProps, SocialLink, FooterLink } from '@/types';

const defaultSocialLinks: SocialLink[] = [
  {
    name: 'Telegram',
    url: 'https://t.me/BroteaClub',
    icon: <MessageCircle className="w-5 h-5" />,
    ariaLabel: 'Join our Telegram group',
  },
  {
    name: 'X',
    url: 'https://x.com/BroteaLabs',
    icon: <X className="w-5 h-5" />,
    ariaLabel: 'Follow us on X',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/brotealabs/',
    icon: <Instagram className="w-5 h-5" />,
    ariaLabel: 'Follow us on Instagram',
  },
];

const defaultNavLinks: FooterLink[] = [
  { href: '/', label: 'common.home' },
  { href: '/#about', label: 'common.about' },
  { href: '/stories', label: 'common.stories' },
];

export function Footer({
  variant = 'social',
  socialLinks = defaultSocialLinks,
  navLinks = defaultNavLinks,
  showCopyrightIcon = true,
}: FooterProps) {
  const pathname = usePathname();
  
  return (
    <footer className="bg-[#0F0F1E] text-white py-8">
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Logo and copyright */}
          <div className="flex items-center gap-3">
            {/* Brotea Logo */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="pixel-text text-[#0F0F1E] text-sm">B</span>
            </div>
            
            {/* Copyright text */}
            <div className="flex items-center gap-1 text-sm text-gray-400">
              {showCopyrightIcon && <Copyright className="w-4 h-4" />}
              <span>{new Date().getFullYear()} Brotea.</span>
              <TranslatedText textKey="footer.rights" />
            </div>
          </div>
          
          {/* Right side - Social links or navigation */}
          <div className="flex items-center gap-6">
            {variant === 'social' ? (
              // Social media links
              socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.ariaLabel}
                >
                  {link.icon}
                </a>
              ))
            ) : (
              // Navigation links
              navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${
                    pathname === link.href
                      ? 'text-[#E6FFA9]'
                      : 'text-gray-400 hover:text-white'
                  } transition-colors`}
                >
                  <TranslatedText id={link.label} />
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}