import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface I18nWrapperProps {
  children: React.ReactNode;
}

export const I18nWrapper = ({ children }: I18nWrapperProps) => {
  const [isReady, setIsReady] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.isInitialized) {
      setIsReady(true);
      console.log('✅ I18nWrapper: i18n está pronto!');
    } else {
      console.log('⏳ I18nWrapper: Aguardando i18n...');

      const checkReady = () => {
        if (i18n.isInitialized) {
          setIsReady(true);
          console.log('✅ I18nWrapper: i18n inicializado!');
        } else {
          setTimeout(checkReady, 100);
        }
      };

      checkReady();
    }
  }, [i18n]);

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#1a1a1a',
        color: '#fff'
      }}>
        Carregando traduções...
      </div>
    );
  }

  return <>{children}</>;
};
