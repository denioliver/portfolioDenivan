import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatedCube } from './AnimatedCube';
import { ParticlesBackground } from './ParticlesBackground';
import { TypewriterEffect } from './TypewriterEffect';
import { ScrollReveal } from './ScrollReveal';

// Animação de flutuação para o glow
const float = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.3;
  }
`;

const HomeContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0f0f1a 100%);
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  padding: 80px 2rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(139, 124, 248, 0.03) 0%,
      rgba(29, 209, 161, 0.02) 30%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  gap: 4rem;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  flex: 1;
  max-width: 600px;
`;

const CubeContent = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 350px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(139, 124, 248, 0.1) 0%,
      rgba(29, 209, 161, 0.05) 50%,
      transparent 100%
    );
    border-radius: 50%;
    animation: ${float} 4s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    order: -1;
    min-width: auto;
    
    &::before {
      width: 200px;
      height: 200px;
    }
  }
`;

const NameContainer = styled.div`
  margin-bottom: 1rem;
`;

const FirstName = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 0.9;
`;

const LastName = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  margin: 0;
  color: #cbd5e0;
  line-height: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 3rem;
  max-width: 500px;
  color: #a0aec0;
  font-weight: 400;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(139, 124, 248, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(139, 124, 248, 0.4);
    background: linear-gradient(135deg, #a855f7, #10b981);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
`;

export const HomeSimple = () => {
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

      <Content>
        <ScrollReveal direction="left" delay={0.2}>
          <TextContent>
            <NameContainer>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <FirstName>Denivan</FirstName>
                <LastName>Oliveira</LastName>
              </motion.div>
            </NameContainer>

            {/* ⚡ Efeito typewriter para destaque técnico */}
            <TypewriterEffect />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Description>
                Especialista em React, TypeScript, Node.js e tecnologias modernas.
                Transformando ideias em soluções digitais inovadoras.
              </Description>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <Button onClick={scrollToContact}>Vamos conversar!</Button>
            </motion.div>
          </TextContent>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={0.5}>
          <CubeContent>
            <AnimatedCube />
          </CubeContent>
        </ScrollReveal>
      </Content>
    </HomeContainer>
  );
};
