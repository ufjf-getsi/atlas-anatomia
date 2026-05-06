import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

await i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'pt',
        supportedLngs: ['pt', 'en'],
        load: 'languageOnly',     // 'pt-BR' vira 'pt', 'en-US' vira 'en'
        nonExplicitSupportedLngs: true,
        debug: false,             // trocar pra true se precisar investigar
        ns: ['translation'],
        defaultNS: 'translation',
        keySeparator: '.',
        interpolation: { escapeValue: false },
        backend: {
            loadPath: './utils/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            convertDetectedLanguage: (lng) => lng.split('-')[0],  // 'pt-BR' -> 'pt'
        },
});

export default i18next;