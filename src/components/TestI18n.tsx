import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const TestI18n = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log('TestI18n - i18n.isInitialized:', i18n.isInitialized);
    console.log('TestI18n - Idioma atual:', i18n.language);
    console.log('TestI18n - Recursos carregados:', i18n.hasResourceBundle('pt', 'translation'));
    console.log('TestI18n - Teste de tradução home.greeting:', t('home.greeting'));
    console.log('TestI18n - Teste de tradução header.nav.home:', t('header.nav.home'));
  }, [i18n, t]);

  return (
    <div style={{ padding: '20px', border: '1px solid red', margin: '10px' }}>
      <h3>Teste i18n</h3>
      <p>Idioma atual: {i18n.language}</p>
      <p>Inicializado: {i18n.isInitialized ? 'Sim' : 'Não'}</p>
      <p>Teste tradução: {t('home.greeting')}</p>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button onClick={() => i18n.changeLanguage('pt')}>PT</button>
    </div>
  );
};
