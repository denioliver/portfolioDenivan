import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar traduções diretamente
import ptTranslation from '../locales/pt/translation.json';
import enTranslation from '../locales/en/translation.json';
import esTranslation from '../locales/es/translation.json';

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

// Configurar idioma inicial
const getInitialLanguage = () => {
  const saved = localStorage.getItem('preferred-language');
  if (saved && ['pt', 'en', 'es'].includes(saved)) {
    return saved;
  }

  const browserLang = navigator.language.split('-')[0];
  return ['pt', 'en', 'es'].includes(browserLang) ? browserLang : 'pt';
};

// Inicializar i18n
const initI18n = async () => {
  const initialLang = getInitialLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLang,
      fallbackLng: 'pt',

      interpolation: {
        escapeValue: false,
      },

      debug: true,

      react: {
        useSuspense: false,
      }
    });

  // Configurar document lang
  document.documentElement.lang = i18n.language;

  console.log('✅ i18n inicializado com sucesso!');
  console.log('Idioma atual:', i18n.language);
  console.log('Recursos carregados:', Object.keys(resources));

  return i18n;
};

// Inicializar imediatamente
initI18n();

// Salvar idioma no localStorage quando mudar
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('preferred-language', lng);
  document.documentElement.lang = lng;
  console.log('🌍 Idioma alterado para:', lng);
});

export default i18n;
