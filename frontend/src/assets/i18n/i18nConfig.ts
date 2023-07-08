import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Define your translations
const resources = {
	en: {
		translation: en,
	},
};

void i18n
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		debug: true,
		resources,
		detection: {
			order: ['localStorage', 'navigator'],
		},
	});

export default i18n;
