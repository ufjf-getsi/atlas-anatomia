export default {
  // idiomas
  locales: ['pt', 'en'],

  // onde os JSONs serao gerados — note o $LOCALE
  output: 'utils/locales/$LOCALE/$NAMESPACE.json',

  // onde o parser deve procurar texto a extrair
  input: [
    'index.html',
    'javascript/**/*.js',
    '!javascript/i18n.js',  // nao extrair do proprio config
  ],

  keySeparator: '.',
  namespaceSeparator: ':',

  // funcoes a procurar no JS
  lexers: {
    js:   [{ lexer: 'JavascriptLexer', functions: ['t', 'i18next.t'] }],
    html: [{ lexer: 'HTMLLexer', attr: 'data-i18n' }],
    default: ['JavascriptLexer'],
  },

  // o valor padrao (2º arg do t() ou texto do data-i18n)
  // vira o valor no idioma fonte (pt)
  defaultValue: (locale, namespace, key, value) => {
    if (locale === 'pt') return value || '';
    return ''; // en começa vazio para traduzir
  },

  // mantém um arquivo _old.json com chaves removidas (pra nao perder traducoes)
  createOldCatalogs: true,

  // formata
  indentation: 2,
  sort: true,
};