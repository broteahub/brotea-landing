"use client";

import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslatedTextProps } from '@/types';

export default function TranslatedText({ textKey, className = '' }: TranslatedTextProps) {
  const { t, isLoaded } = useTranslation();
  
  if (!isLoaded) {
    return <span className={className}>...</span>;
  }
  
  if (!textKey || typeof textKey !== 'string') {
    console.warn('TranslatedText: Invalid textKey prop:', textKey);
    return <span className={className}></span>;
  }
  
  return <span className={className}>{t(textKey)}</span>;
}
