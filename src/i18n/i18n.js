import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Direct imports of locale JSON files for zero-latency, reliable execution
import uzTranslation from '../../public/locales/uz/translation.json';
import ruTranslation from '../../public/locales/ru/translation.json';
import enTranslation from '../../public/locales/en/translation.json';
import trTranslation from '../../public/locales/tr/translation.json';

const resources = {
  uz: { translation: uzTranslation },
  ru: { translation: ruTranslation },
  en: { translation: enTranslation },
  tr: { translation: trTranslation },
};

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('valveris_lang') || 'uz' : 'uz';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('valveris_lang', lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
