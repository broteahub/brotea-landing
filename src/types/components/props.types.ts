/**
 * Common component prop types
 */

import { ReactNode } from 'react';

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  isExternal?: boolean;
  action?: () => void;
}

export interface NavigationProps {
  navItems?: NavItem[];
  onJoinUsClick?: () => void;
}

// Footer types
export interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
  ariaLabel: string;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterProps {
  variant?: 'social' | 'navigation';
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  showCopyrightIcon?: boolean;
}

// Translation types
export interface TranslatedTextProps {
  textKey: string;
  fallback?: string;
}

export interface LanguageSwitcherProps {
  className?: string;
}

// Common types
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface MotionProps {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
  whileInView?: object;
  viewport?: object;
}