'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TranslatedText from '@/app/components/TranslatedText';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import { NavigationProps, NavItem } from '@/types';

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: 'https://global.brotea.xyz', isExternal: true },
  { id: 'stories', label: 'Stories', href: '/stories' },
];

function getTranslationKey(id: string): string {
  const translations: { [key: string]: string } = {
    home: 'common.home',
    services: 'common.services',
    stories: 'common.stories',
  };
  return translations[id] || 'common.' + id;
}

export function Navigation({ 
  navItems = defaultNavItems,
  onJoinUsClick 
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleNavClick = (item: NavItem) => {
    if (item.action) {
      item.action();
      setIsMenuOpen(false);
    } else if (item.href && item.id === 'home' && isHomePage && onJoinUsClick) {
      // Special handling for home link on home page - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const renderNavItem = (item: NavItem, isMobile = false) => {
    if (!item || !item.id) {
      console.warn('Invalid nav item:', item);
      return null;
    }
    
    const isCurrentPage = item.href === pathname;
    const translationKey = getTranslationKey(item.id);
    
    // For home page, render some items as buttons for smooth scrolling
    if (isHomePage && item.action) {
      return (
        <button
          key={item.id}
          onClick={() => handleNavClick(item)}
          className={`text-[#1A1F2C] hover:text-[#1A1F2C]/80 transition-colors ${
            isMobile ? 'w-full text-left text-white hover:text-white/80' : ''
          }`}
        >
          <TranslatedText textKey={translationKey} />
        </button>
      );
    }

    // Regular links
    if (item.href) {
      return (
        <Link
          key={item.id}
          href={item.href}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          className={`text-[#1A1F2C] hover:text-[#1A1F2C]/80 transition-colors ${
            isCurrentPage ? 'font-bold' : ''
          } ${isMobile ? 'block w-full text-white hover:text-white/80' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <TranslatedText textKey={translationKey} />
        </Link>
      );
    }

    return null;
  };

  return (
    <nav className="p-6 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="/assets/images/BROTEA_LOGO-SECUNDARIO_BLANCO_B_1_500px_2.png"
            alt="Brotea"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => renderNavItem(item))}
          
          {/* Join Us Button */}
          {onJoinUsClick ? (
            <button
              onClick={onJoinUsClick}
              className="bg-[#0F0F1E] text-white px-6 py-2 rounded-full hover:bg-[#0F0F1E]/90"
            >
              <TranslatedText textKey="common.joinUs" />
            </button>
          ) : (
            <Link
              href="/#newsletter"
              className="bg-[#0F0F1E] text-white px-6 py-2 rounded-full hover:bg-[#0F0F1E]/90"
            >
              <TranslatedText textKey="common.joinUs" />
            </Link>
          )}
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-[#0F0F1E] p-2 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-6 top-20 bg-[#0F0F1E] rounded-3xl p-6 md:hidden min-w-[200px] shadow-lg"
          >
            <div className="space-y-4">
              {navItems.map((item) => renderNavItem(item, true))}
              
              {/* Join Us Button/Link for Mobile */}
              {onJoinUsClick ? (
                <button
                  onClick={() => {
                    onJoinUsClick();
                    setIsMenuOpen(false);
                  }}
                  className="bg-[#E6FFA9] text-black px-6 py-2 rounded-xl text-left transition-colors hover:bg-[#E6FFA9]/90 w-full"
                >
                  <TranslatedText textKey="common.joinUs" />
                </button>
              ) : (
                <Link
                  href="/#newsletter"
                  className="bg-[#E6FFA9] text-black px-6 py-2 rounded-xl text-left transition-colors hover:bg-[#E6FFA9]/90 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TranslatedText textKey="common.joinUs" />
                </Link>
              )}
              
              {/* Language Switcher for Mobile */}
              <div className="pt-4 border-t border-gray-700">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}