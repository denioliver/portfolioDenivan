import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const HeaderContainer = styled(motion.header) <{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.$isScrolled
    ? `${props.theme.colors.card}95`
    : 'transparent'
  };
  backdrop-filter: ${props => props.$isScrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${props => props.$isScrolled
    ? `1px solid ${props.theme.colors.border}`
    : 'none'
  };
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${props => props.theme.spacing.lg};
  padding-right: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding-left: ${props => props.theme.spacing.md};
    padding-right: ${props => props.theme.spacing.md};
  }
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  user-select: none;
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 1.5rem;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const NavLink = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: 0.95rem;
  position: relative;
  padding: ${props => props.theme.spacing.sm} 0;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary}20;
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.background}95;
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xl};
  z-index: 999;
`;

const MobileNavLink = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: 1.5rem;
  cursor: pointer;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary}20;
    color: ${props => props.theme.colors.primary};
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 2rem;
  padding: ${props => props.theme.spacing.sm};
`;

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Início', id: 'home' },
    { label: 'Sobre', id: 'about' },
    { label: 'Projetos', id: 'projects' },
    { label: 'Contato', id: 'contact' }
  ];

  return (
    <>
      <HeaderContainer
        $isScrolled={isScrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Nav>
          <Logo
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Denivan
          </Logo>

          <DesktopNav>
            <NavLinks>
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                </NavLink>
              ))}
            </NavLinks>

            <ThemeToggle
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
          </DesktopNav>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMenu />
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX />
            </CloseButton>

            {navItems.map((item, index) => (
              <MobileNavLink
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </MobileNavLink>
            ))}

            <ThemeToggle
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ marginTop: '2rem' }}
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};
