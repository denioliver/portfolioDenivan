import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useThemeToggle } from '../hooks/useThemeToggle';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: string;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeContextProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeToggle = useThemeToggle();

  return (
    <ThemeContext.Provider value={themeToggle}>
      {children}
    </ThemeContext.Provider>
  );
};
