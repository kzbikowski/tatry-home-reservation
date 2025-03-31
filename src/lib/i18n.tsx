import React, { createContext, useContext, useState, ReactNode } from 'react';
import enTranslations from './i18n/locales/en.json';
import plTranslations from './i18n/locales/pl.json';
import deTranslations from './i18n/locales/de.json';

type Language = 'en' | 'pl' | 'de';

interface Translations {
  [key: string]: any;
}

const translations: Translations = {
  en: enTranslations,
  pl: plTranslations,
  de: deTranslations
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pl');

  const t = (key: string): string => {
    // Split the key by dots
    const keys = key.split('.');
    
    // Navigate through the nested translation object
    let translation: any = translations[language];
    for (const k of keys) {
      if (!translation || !translation[k]) {
        console.warn(`Translation key not found: ${key} (language: ${language})`);
        return key;
      }
      translation = translation[k];
    }
    
    // If translation is an object, convert it to a string
    if (typeof translation === 'object' && translation !== null) {
      console.warn(`Translation is an object, not a string: ${key}. Stringify it.`);
      return JSON.stringify(translation);
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 