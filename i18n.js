import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en', // force English
  fallbackLng: 'en', // also fallback to English

  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
        trending: 'Trending Now',
      },
    },
    // other languages if needed
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
