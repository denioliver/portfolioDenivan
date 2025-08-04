import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

// 🌙 Container do toggle com animações
const ToggleContainer = styled(motion.button)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1001; /* Acima do header */
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
    top: 1.2rem;
    right: 4.5rem; /* Posicionado à esquerda do menu hambúrguer */
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
`;

const IconWrapper = styled(motion.span)`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

// 🎨 Animações do toggle
const toggleVariants = {
  light: { x: 0 },
  dark: { x: 25 }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0 }
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
      {/* 🌅 Ícone do sol */}
      <IconWrapper>
        <AnimatePresence>
          {!isDark && (
            <motion.span
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
            >
              ☀️
            </motion.span>
          )}
        </AnimatePresence>
      </IconWrapper>

      {/* 🎯 Slider animado */}
      <ToggleSlider
        variants={toggleVariants}
        animate={isDark ? "dark" : "light"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {isDark ? "🌙" : "☀️"}
      </ToggleSlider>

      {/* 🌙 Ícone da lua */}
      <IconWrapper>
        <AnimatePresence>
          {isDark && (
            <motion.span
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
            >
              🌙
            </motion.span>
          )}
        </AnimatePresence>
      </IconWrapper>
    </ToggleContainer>
  );
};
