import i18next from './i18n.js';

export const applyTranslations = (root = document) => {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = i18next.t(key);  // innerHTML p/ preservar <a> em about.p4 e footer.subtitle
  });
  document.documentElement.lang = i18next.language;
};

i18next.on('languageChanged', () => applyTranslations());