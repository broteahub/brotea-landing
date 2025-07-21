// Re-export all types for convenient access
export * from './api';
export * from './forms';
export * from './components';

// Common types used across the application
export type Language = 'en' | 'es';

export interface Translation {
  [key: string]: string | Translation;
}

export interface Translations {
  [key: string]: Translation | string;
}

export interface BrandData {
  logo_base64: string;
  telegram_url: string;
  twitter_url: string;
  instagram_url: string;
  lisbon_club_logo_base64: string;
  global_community_logo_base64: string;
  wa_global_community: string;
  wa_lisbon_club: string;
  support_email: string;
}

// Utility types
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : never;