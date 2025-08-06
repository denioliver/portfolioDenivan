import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traduções diretamente
import ptTranslation from '../../public/locales/pt/translation.json';
import enTranslation from '../../public/locales/en/translation.json';
import esTranslation from '../../public/locales/es/translation.json';

// Recursos de tradução
const resources = {
  pt: {
    translation: ptTranslation
  },
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  }
};

// Função para detectar idioma do navegador
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0];
  const supportedLanguages = ['pt', 'en', 'es'];
  return supportedLanguages.includes(browserLang) ? browserLang : 'pt';
};

// Função para obter idioma salvo no localStorage
const getSavedLanguage = (): string => {
  const saved = localStorage.getItem('preferred-language');
  if (saved && ['pt', 'en', 'es'].includes(saved)) {
    return saved;
  }
  return getBrowserLanguage();
};

const initOptions: InitOptions = {
  // Idioma inicial baseado no localStorage ou navegador
  lng: getSavedLanguage(),

  // Idioma de fallback
  fallbackLng: 'pt',

  // Idiomas suportados
  supportedLngs: ['pt', 'en', 'es'],

  // Configuração do backend para carregar traduções
  backend: {
    loadPath: '/locales/{{lng}}/translation.json',
  },

  // Configuração do detector de idioma
  detection: {
    // Ordem de detecção
    order: ['localStorage', 'navigator'],

    // Cache no localStorage
    caches: ['localStorage'],

    // Chave para salvar no localStorage
    lookupLocalStorage: 'preferred-language',
  },

  // Configurações de interpolação
  interpolation: {
    escapeValue: false, // React já faz escape
  },

  // Configurações de debug (desabilitar em produção)
  debug: process.env.NODE_ENV === 'development',

  // Configurações de carregamento
  load: 'languageOnly' as const, // Carregar apenas 'pt' ao invés de 'pt-BR'

  // Configurações de namespace
  defaultNS: 'translation',
  ns: ['translation'],

  // Configurações adicionais
  cleanCode: true,
  appendNamespaceToMissingKey: false,
  nsSeparator: ':',
  keySeparator: '.',
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(initOptions);

// Função para trocar idioma e salvar preferência
export const changeLanguage = (language: string) => {
  if (['pt', 'en', 'es'].includes(language)) {
    i18n.changeLanguage(language);
    localStorage.setItem('preferred-language', language);
  }
};

// Função para obter idioma atual
export const getCurrentLanguage = () => i18n.language || 'pt';

// Função para obter todos os idiomas suportados
export const getSupportedLanguages = () => [
  {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    flagAlt: 'BR' // Fallback caso emoji não funcione
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    flagAlt: 'US' // Fallback caso emoji não funcione
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    flagAlt: 'ES' // Fallback caso emoji não funcione
  },
];

export default i18n;
