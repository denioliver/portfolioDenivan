import { useTypewriter, Cursor } from 'react-simple-typewriter';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// 💎 Estilização do texto typewriter com fonte mais chamativa
const TypewriterText = styled(motion.span)`
  font-size: 1.3rem;
  font-weight: 600;
  font-family: 'Space Grotesk', 'Poppins', sans-serif;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
  text-align: center;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 8px rgba(139, 124, 248, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const TypewriterContainer = styled.div`
  margin: 1rem 0 1.5rem;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    min-height: 45px;
    margin: 0.8rem 0 1.2rem;
  }

  @media (max-width: 480px) {
    min-height: 40px;
    margin: 0.6rem 0 1rem;
  }
`;

interface TypewriterEffectProps {
  speed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
}

/**
 * ⚡ Componente de efeito typewriter para destaque na Hero
 * 
 * Características:
 * - Animação de digitação realista
 * - Frases que destacam expertise técnica
 * - Cursor piscante animado
 * - Responsivo e performático
 */
export const TypewriterEffect = ({
  speed = 80,
  deleteSpeed = 50,
  delaySpeed = 2000
}: TypewriterEffectProps) => {
  const { t } = useTranslation();

  // 🎯 Obter frases traduzidas
  const techPhrases = t('home.typewriter', { returnObjects: true }) as string[] || [
    'Desenvolvedor FullStack Especialista',
    'Expert em React & Node.js',
    'Criador de Soluções Completas',
    'Arquiteto de Sistemas Modernos',
    'Especialista em Front & Back-end'
  ];

  // 🎯 Hook do typewriter com configurações otimizadas
  const [text] = useTypewriter({
    words: techPhrases,
    loop: true,
    delaySpeed,
    typeSpeed: speed,
    deleteSpeed,
  });

  return (
    <TypewriterContainer>
      <TypewriterText
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        {text}
        <Cursor
          cursorStyle="|"
          cursorColor="#8b7cf8"
        />
      </TypewriterText>
    </TypewriterContainer>
  );
};
