import { NextRequest, NextResponse } from 'next/server';
import { getTranslations, Language } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get locale from query parameter or default to Spanish
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get('locale') || 'es') as Language;
    
    // Get translations for the requested locale
    const translations = getTranslations(locale);
    
    // Create content data structure from translations
    const data = {
      header: {
        title: translations.header.title,
        subtitle: translations.header.subtitle,
        cta: { text: translations.header.cta, link: "https://t.me/broteaofficial" }
      },
      about: {
        title: translations.about.title,
        description: translations.about.description
      },
      recruitment: {
        title: translations.join.title,
        description: translations.join.description
      }
    };
    
    // Return the data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading content:', error);
    return NextResponse.json(
      { 
        error: 'Error loading content',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
