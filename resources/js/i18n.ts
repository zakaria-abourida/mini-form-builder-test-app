import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './app/locales/de.json'; // German
import en from './app/locales/en.json'; // English

i18n.use(initReactI18next) // Connect i18next with React
    .init({
        resources: {
            en: { translation: en }, // English
            de: { translation: de }, // German
        },
        lng: 'en', // Default language (English)
        fallbackLng: 'en', // Fallback language
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;
