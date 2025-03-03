"use client";

import { useState, useEffect } from 'react';
import { languages, Language } from '@/i18n';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      {Object.entries(languages).map(([code, { name, flag }]) => (
        <button
          key={code}
          onClick={() => changeLocale(code as Language)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md ${
            locale === code ? 'bg-[#0F0F1E] text-white' : 'text-[#1A1F2C] hover:bg-[#0F0F1E]/10'
          }`}
          aria-label={`Switch to ${name}`}
        >
          <span>{flag}</span>
          <span className="hidden md:inline">{name}</span>
        </button>
      ))}
    </div>
  );
}
