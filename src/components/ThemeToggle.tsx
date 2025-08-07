import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

// 🌙 Container do toggle com animações
const ToggleContainer = styled(motion.button)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50px;
  width: 60px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}80;
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 25px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 20px;
    padding: 0 3px;
  }
`;

const ToggleSlider = styled(motion.div)`
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    font-size: 0.6rem;
  }
  
  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
    font-size: 0.5rem;
  }
`;

// 🎨 Animações do toggle
const getToggleVariants = () => {
  if (window.innerWidth <= 480) {
    return {
      light: { x: 0 },
      dark: { x: 15 }
    };
  } else if (window.innerWidth <= 768) {
    return {
      light: { x: 0 },
      dark: { x: 19 }
    };
  } else {
    return {
      light: { x: 0 },
      dark: { x: 25 }
    };
  }
};

/**
 * ️ Componente de toggle de tema com animações
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {

  return (
    <ToggleContainer
      onClick={toggleTheme}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ToggleSlider
        variants={getToggleVariants()}
        animate={isDark ? "dark" : "light"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {isDark ? "🌙" : "☀️"}
      </ToggleSlider>

      {/* 🌙 Ícone da lua */}

    </ToggleContainer>
  );
};
