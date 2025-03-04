import es from './locales/es.json';
import en from './locales/en.json';

// Define supported languages
export const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
};

export type Language = keyof typeof languages;

// Define translations type
export type Translations = typeof es;

// Create a mapping of locales
const locales: Record<Language, Translations> = {
  en,
  es,
};

// Helper function to get nested object properties by string path
export const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null || typeof result !== 'object') {
      return path; // Return the key path if we can't find the value
    }
    // Use type assertion with a specific type instead of any
    result = (result as Record<string, unknown>)[key];
  }
  
  return typeof result === 'string' ? result : path;
};

// Translation function
export const translate = (key: string, locale: Language = 'es'): string => {
  const translations = locales[locale] || locales.es;
  return getNestedValue(translations, key) || key;
};

// Helper function to get translations for a specific locale
export function getTranslations(locale: Language): Translations {
  return locales[locale] || locales.es; // Default to Spanish if locale not found
}

// Default locale
export const defaultLocale: Language = 'es';

// Get all available locales
export const getAvailableLocales = (): Language[] => {
  return Object.keys(languages) as Language[];
};
