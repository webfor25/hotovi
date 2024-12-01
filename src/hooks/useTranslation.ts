import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

export const useTranslation = () => {
  const { i18n, t } = useI18nTranslation();
  const { currentLanguage } = useLanguage();

  // Sync language changes with i18next
  if (i18n.language !== currentLanguage.code) {
    i18n.changeLanguage(currentLanguage.code);
  }

  return { t };
};