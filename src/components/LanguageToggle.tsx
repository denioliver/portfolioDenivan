import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BrazilFlag, USFlag, SpainFlag } from './Flags';

const LanguageSelector = styled.div`
  position: relative;
  display: inline-block;
`;

const LanguageButton = styled.button`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 80px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const LanguageLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
`;

const DropdownIcon = styled.span<{ $isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.large};
  backdrop-filter: blur(20px);
  overflow: hidden;
  z-index: 9999;
  min-width: 120px;
`;

const DropdownItem = styled.button<{ $isActive: boolean }>`
  width: 100%;
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary + '10' : 'transparent'};
  border: none;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }
  
  &:focus {
    outline: none;
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const DropdownItemLabel = styled.span<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  font-size: 0.9rem;
  font-weight: ${({ $isActive, theme }) => $isActive ? theme.fontWeights.semibold : theme.fontWeights.normal};
  text-transform: uppercase;
`;

interface Language {
  code: string;
  label: string;
  flag: React.ComponentType<{ width?: number; height?: number; className?: string }>;
}

const languages: Language[] = [
  { code: 'pt', label: 'PT', flag: BrazilFlag },
  { code: 'en', label: 'EN', flag: USFlag },
  { code: 'es', label: 'ES', flag: SpainFlag },
];

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  console.log('LanguageToggle rendered, isOpen:', isOpen);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const CurrentFlag = currentLanguage.flag;

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle dropdown clicked, current isOpen:', isOpen);
    setIsOpen(!isOpen);
  };

  // Fechar dropdown ao clicar fora
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-language-selector]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <LanguageSelector data-language-selector>
      <LanguageButton
        onClick={toggleDropdown}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <CurrentFlag width={20} height={15} />
        <LanguageLabel>{currentLanguage.label}</LanguageLabel>
        <DropdownIcon $isOpen={isOpen}>▼</DropdownIcon>
      </LanguageButton>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            aria-label="Lista de idiomas"
          >
            {languages.map((language) => {
              const Flag = language.flag;
              const isActive = language.code === i18n.language;

              return (
                <DropdownItem
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  $isActive={isActive}
                  role="option"
                  aria-selected={isActive}
                  aria-label={`Mudar para ${language.label}`}
                >
                  <Flag width={20} height={15} />
                  <DropdownItemLabel $isActive={isActive}>
                    {language.label}
                  </DropdownItemLabel>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </LanguageSelector>
  );
};
