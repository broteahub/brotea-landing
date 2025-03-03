"use client";

import { useState, useEffect } from 'react';
import { translate, Language, languages } from '@/i18n';

// Function to dispatch the locale change event
export function dispatchLocaleChangeEvent(locale: Language) {
  // Create and dispatch a custom event
  const event = new CustomEvent('localeChange', { detail: { locale } });
  window.dispatchEvent(event);
}

export function useTranslation() {
  const [locale, setLocale] = useState<Language>('es');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get locale from localStorage if available
    const savedLocale = localStorage.getItem('locale') as Language;
    if (savedLocale && languages[savedLocale]) {
      setLocale(savedLocale);
    } else {
      // Default to Spanish
      localStorage.setItem('locale', 'es');
    }
    setIsLoaded(true);

    // Listen for custom locale change events
    const handleLocaleChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newLocale = customEvent.detail.locale as Language;
      if (languages[newLocale]) {
        setLocale(newLocale);
      }
    };

    // Add event listener for the custom event
    window.addEventListener('localeChange', handleLocaleChange);
    
    return () => {
      window.removeEventListener('localeChange', handleLocaleChange);
    };
  }, []);

  const t = (key: string): string => {
    return translate(key, locale);
  };

  const changeLocale = (newLocale: Language) => {
    if (languages[newLocale]) {
      localStorage.setItem('locale', newLocale);
      setLocale(newLocale);
      // Update HTML lang attribute
      document.documentElement.lang = newLocale;
      // Dispatch the custom event to notify other components
      dispatchLocaleChangeEvent(newLocale);
    }
  };

  return {
    t,
    locale,
    isLoaded,
    changeLocale,
  };
}
