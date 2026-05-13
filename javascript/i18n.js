import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const SYSTEM_NAMESPACES = [
    'articular',
    'circulatorio',
    'digestorio',
    'esqueletico',
    'genital_feminino',
    'genital_masculino',
    'muscular',
    'nervoso',
    'respiratorio',
    'urinario',
];

const ALL_NAMESPACES = ['translation', ...SYSTEM_NAMESPACES];

await i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'pt',
        supportedLngs: ['pt', 'en'],
        load: 'languageOnly',     // 'pt-BR' vira 'pt', 'en-US' vira 'en'
        nonExplicitSupportedLngs: true,
        debug: false,             // trocar pra true se precisar investigar
        
        ns: ALL_NAMESPACES,
        defaultNS: 'translation',
        
        fallbackNS: SYSTEM_NAMESPACES,
        
        keySeparator: '.',
        nsSeparator: ':',
        
        interpolation: { escapeValue: false },

        fallbackNS: SYSTEM_NAMESPACES,

        saveMissing: false,
        parseMissingKeyHandler: (key) => key,
        
        backend: {
            loadPath: './utils/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            convertDetectedLanguage: (lng) => lng.split('-')[0],  // 'pt-BR' -> 'pt'
        },

        partialBundledLanguages: true,
});

const currentLng = i18next.language?.split('-')[0] || 'pt';
if (currentLng !== 'pt') {
    await i18next.loadNamespaces(SYSTEM_NAMESPACES);
}

export function tSystem(key) {
    if (!key) return key;
    for (const ns of SYSTEM_NAMESPACES) {
        const result = i18next.t(key, { ns });
        if (result !== key) return result;
    }
    return key;
}

export default i18next;
export { SYSTEM_NAMESPACES, ALL_NAMESPACES };