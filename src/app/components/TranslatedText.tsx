"use client";

import { useTranslation } from '@/app/hooks/useTranslation';
import { TranslatedTextProps } from '@/types';

export default function TranslatedText({ textKey, className = '' }: TranslatedTextProps) {
  const { t, isLoaded } = useTranslation();
  
  if (!isLoaded) {
    return <span className={className}>...</span>;
  }
  
  return <span className={className}>{t(textKey)}</span>;
}
