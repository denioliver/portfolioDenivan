import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AnimatedCube } from './AnimatedCube';
import { ParticlesBackground } from './ParticlesBackground';
import { TypewriterEffect } from './TypewriterEffect';
import { ScrollReveal } from './ScrollReveal';

const HomeContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// 🎯 Container do cubo - posicionado entre as seções
const CubeContainer = styled.div`
  /* Desktop: Absoluto entre as seções */
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  
  @media (max-width: 768px) {
    /* Mobile: Posicionado abaixo do botão */
    position: absolute;
    top: auto;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    pointer-events: auto;
  }

  @media (max-width: 480px) {
    /* Mobile muito pequeno: Ainda mais embaixo */
    bottom: 0.2rem;
  }
`;

// 📱 Seção esquerda - Conteúdo textual (65% da tela)
const LeftSection = styled.div`
  flex: 0 0 65%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 4rem 3rem 3rem;
  margin: 80px 20px 20px 20px;
  border-radius: 20px;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.card};
    opacity: 0.9;
    z-index: -1;
    border-radius: 20px;
  }

  @media (max-width: 1200px) {
    padding: 2.5rem 3rem;
  }

  @media (max-width: 768px) {
    flex: 1; /* Ocupa toda a largura no mobile */
    width: 100%;
    padding: 3rem 2rem;
    text-align: center;
    align-items: center;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

// 🎯 Seção direita - Área escura (35% da tela)
const RightSection = styled.div`
  flex: 0 0 35%;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      ${({ theme }) => theme.colors.primary}05 0%,
      ${({ theme }) => theme.colors.accent}03 50%,
      transparent 80%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    display: none; /* Remove a seção direita no mobile */
  }
`;



// 👋 Greeting estilo casual e moderno
const Greeting = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Poppins', sans-serif;

  &::before {
    content: '👋';
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    justify-content: center;
    font-size: 1.1rem;
    margin-top: 2rem; /* Adiciona espaço no topo para mobile */
  }
`;

// 💫 Título principal com fonte chamativa
const MainTitle = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0.5rem 0 0.8rem 0;
  font-family: 'Space Grotesk', sans-serif;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
  
  .highlight {
    background: linear-gradient(135deg, #ffd700, #ffeb3b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const SubTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  font-family: 'Space Grotesk', sans-serif;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.2;
  letter-spacing: -0.01em;
  text-shadow: 0 1px 5px ${({ theme }) => theme.colors.shadow};

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.7;
  margin: 1.5rem 0 2.5rem;
  max-width: 480px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.005em;

  @media (max-width: 768px) {
    margin: 1.5rem auto 2.5rem;
    text-align: center;
    max-width: 100%;
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 0.95rem;
    margin: 0 auto 12rem auto;
    display: block;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    margin: 0 auto 15rem auto;
  }
`;

export const HomeSimple = () => {
  const { t } = useTranslation();

  // 🎯 Scroll suave para a seção de contato
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <HomeContainer>
      {/* 🌌 Fundo de partículas animadas */}
      <ParticlesBackground />

      {/* 🎯 Cubo posicionado entre as seções no desktop */}
      <CubeContainer>
        <ScrollReveal direction="up" delay={0.5}>
          <AnimatedCube />
        </ScrollReveal>
      </CubeContainer>

      {/* ✨ Layout Split-Screen */}
      <LeftSection>
        <ScrollReveal direction="left" delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Greeting>{t('home.greeting')}</Greeting>
            <MainTitle>{t('home.name')}</MainTitle>
            <SubTitle>{t('home.title')}</SubTitle>
          </motion.div>

          {/* ⚡ Efeito typewriter para destaque técnico */}
          <TypewriterEffect />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Description>
              {t('home.description')}
            </Description>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <Button onClick={scrollToContact}>{t('home.cta.contact')}</Button>
          </motion.div>
        </ScrollReveal>
      </LeftSection>

      <RightSection>
        {/* Área direita vazia para contraste */}
      </RightSection>
    </HomeContainer>
  );
};
