import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.surface}ee;
  backdrop-filter: blur(25px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 0;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const DesktopNavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 124, 248, 0.3);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.surface};
    backdrop-filter: blur(25px);
    flex-direction: column;
    padding: 1rem 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradient};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const HeaderSimple = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // Se não estiver na página principal, navega para ela primeiro
    if (window.location.pathname !== '/') {
      navigate('/', { replace: true });
      // Aguarda um pouco para a página carregar antes de fazer scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }

    // Fechar menu mobile após navegação
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo onClick={() => scrollToSection('home')}>
          Denivan.dev
        </Logo>

        <DesktopNavLinks>
          <NavLink onClick={() => scrollToSection('home')}>
            Início
          </NavLink>
          <NavLink onClick={() => scrollToSection('about')}>
            Sobre
          </NavLink>
          <NavLink onClick={() => scrollToSection('projects')}>
            Projetos
          </NavLink>
          <NavLink onClick={() => scrollToSection('contact')}>
            Contato
          </NavLink>
          <LoginButton onClick={handleLoginClick}>
            Admin
          </LoginButton>
        </DesktopNavLinks>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      <MobileNavLinks isOpen={isMobileMenuOpen}>
        <NavLink onClick={() => scrollToSection('home')}>
          Início
        </NavLink>
        <NavLink onClick={() => scrollToSection('about')}>
          Sobre
        </NavLink>
        <NavLink onClick={() => scrollToSection('projects')}>
          Projetos
        </NavLink>
        <NavLink onClick={() => scrollToSection('contact')}>
          Contato
        </NavLink>
        <LoginButton onClick={handleLoginClick}>
          Admin
        </LoginButton>
      </MobileNavLinks>
    </HeaderContainer>
  );
};
