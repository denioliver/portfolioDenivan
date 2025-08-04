import { useState, useEffect } from 'react';

/**
 * 🌓 Hook para gerenciar tema escuro/claro com persistência
 */
export const useThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // Começa no tema escuro

  // 💾 Recuperar tema salvo na inicialização apenas uma vez
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []); // Array vazio - executa apenas uma vez

  // 🔄 Salvar no localStorage quando o tema muda
  useEffect(() => {
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  };
};
