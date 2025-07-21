/**
 * Content API types
 */

export interface ContentRequest {
  locale: string;
}

export interface ContentSection {
  title: string;
  description?: string;
  subtitle?: string;
  cta?: {
    text: string;
    link: string;
  };
  discoverHere?: string;
}

export interface ContentResponse {
  header: ContentSection;
  about: ContentSection;
  recruitment: ContentSection;
  lisbonClub: ContentSection;
  globalCommunity: ContentSection;
}