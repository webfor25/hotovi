import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../translations';
import i18n from '../i18n';

type LanguageOption = {
  code: Language;
  name: string;
  flag: string;
};

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

type LanguageContextType = {
  currentLanguage: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;
  languages: LanguageOption[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'hotovi-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) {
      const lang = languages.find(l => l.code === stored);
      if (lang) return lang;
    }
    
    return languages[0]; // Default to English
  });

  const setLanguage = (lang: LanguageOption) => {
    setCurrentLanguage(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang.code);
    document.documentElement.lang = lang.code;
    i18n.changeLanguage(lang.code);
  };

  // Set initial language
  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    i18n.changeLanguage(currentLanguage.code);
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};