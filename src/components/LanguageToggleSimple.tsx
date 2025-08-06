import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  background: #333;
  color: white;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  
  &:hover {
    background: #444;
  }
`;

const Dropdown = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: #333;
  border: 1px solid #555;
  border-radius: 4px;
  margin-top: 4px;
  display: ${props => props.$show ? 'block' : 'none'};
  z-index: 1000;
`;

const DropdownItem = styled.button`
  width: 100%;
  background: transparent;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background: #444;
  }
`;

export const LanguageToggleSimple: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log('Button clicked! Current isOpen:', isOpen);
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lang: string) => {
    console.log('Changing language to:', lang);
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <Container>
      <Button onClick={handleClick}>
        Idioma: {i18n.language?.toUpperCase() || 'PT'} ▼
      </Button>
      <Dropdown $show={isOpen}>
        <DropdownItem onClick={() => changeLanguage('pt')}>PT</DropdownItem>
        <DropdownItem onClick={() => changeLanguage('en')}>EN</DropdownItem>
        <DropdownItem onClick={() => changeLanguage('es')}>ES</DropdownItem>
      </Dropdown>
    </Container>
  );
};
