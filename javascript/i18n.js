import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "app_title": "Interactive Anatomy Atlas",
            "system_muscular": "Muscular System",
            "structure_heart": "Heart",
            "structure_heart_desc": "The heart is a muscular organ that pumps blood through the circulatory system."
        }
    },
    pt: {
        translation: {
            "app_title": "Atlas Interativo de Anatomia",
            "system_muscular": "Sistema Muscular",
            "structure_heart": "Coração",
            "structure_heart_desc": "O coração é um órgão muscular que bombeia sangue através do sistema circulatório."
        }
    }
};

i18next
    //detector para tentar adivinhar o idioma do usuário
    .use(LanguageDetector)
    .init({
        resources, 
        fallbackLng: 'pt', 
        debug: true, 
        ns: ['translation'], 
        defaultNS: 'translation',
        keySeparator: false, 
        interpolation: {
            escapeValue: false, 
        },
    });

export default i18next;