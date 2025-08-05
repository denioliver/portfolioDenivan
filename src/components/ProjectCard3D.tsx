import { motion } from 'framer-motion';
import styled from 'styled-components';
import { cardHover } from '../utils/animations';
import { useState } from 'react';

// 🎴 Container do card com perspectiva 3D
const CardContainer = styled(motion.div)`
  perspective: 1000px;
  cursor: pointer;
`;

// 🃏 Card principal com efeito tilt
const TiltCard = styled(motion.div) <{ $hasUrl?: boolean }>`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  position: relative;
  z-index: 1;
  cursor: ${({ $hasUrl }) => $hasUrl ? 'pointer' : 'default'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}30;
    box-shadow: 0 25px 50px ${({ theme }) => theme.colors.primary}20;
    transform: translateY(-10px) scale(1.02);
    z-index: 999;
  }
`;

// 🎨 Overlay da stack que aparece no hover
const StackOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 124, 248, 0.9), rgba(29, 209, 161, 0.9));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 2rem;
  z-index: 2;
`;

const StackTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: white;
`;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const StackItem = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectImage = styled.div<{ $hasImage?: boolean }>`
  height: 200px;
  background: ${({ $hasImage }) =>
    $hasImage
      ? 'transparent'
      : 'linear-gradient(135deg, rgba(139, 124, 248, 0.2), rgba(29, 209, 161, 0.2))'
  };
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
`;

const ProjectImageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ProjectImageIcon = styled.div`
  position: relative;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const ClickIndicator = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 3;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

interface ProjectCardProps {
  title: string;
  description: string;
  icon: string;
  stack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

/**
 * 🎯 Card de projeto com efeito 3D tilt e overlay de stack
 * 
 * Características:
 * - Efeito tilt 3D realista no hover
 * - Overlay com stack tecnológica ao passar o mouse
 * - Animações suaves com Framer Motion
 * - Design glassmorphism moderno
 */
export const ProjectCard3D = ({ title, description, icon, stack, imageUrl, liveUrl, githubUrl }: ProjectCardProps) => {
  const [showStack, setShowStack] = useState(false);

  // 🔗 Verifica se tem alguma URL disponível
  const hasUrl = !!(liveUrl || githubUrl);

  // 🔗 Função para lidar com o clique no card
  const handleCardClick = () => {
    // Prioriza liveUrl, depois githubUrl
    const targetUrl = liveUrl || githubUrl;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 🎭 Função para calcular rotação baseada na posição do mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <CardContainer
      initial="initial"
      whileHover="hover"
      variants={cardHover}
    >
      <TiltCard
        $hasUrl={hasUrl}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowStack(true)}
        onMouseLeave={(e) => {
          setShowStack(false);
          handleMouseLeave(e);
        }}
        onClick={hasUrl ? handleCardClick : undefined}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 🎨 Overlay da stack - aparece no hover */}
        {showStack && (
          <StackOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StackTitle>Stack Tecnológica</StackTitle>
            <StackList>
              {stack.map((tech, index) => (
                <StackItem key={index}>{tech}</StackItem>
              ))}
            </StackList>
          </StackOverlay>
        )}

        {/* 📸 Conteúdo principal do card */}
        <ProjectImage $hasImage={!!imageUrl}>
          {imageUrl && <ProjectImageImg src={imageUrl} alt={title} />}
          {/* Só mostra o ícone se não tiver imagem */}
          {!imageUrl && <ProjectImageIcon>{icon}</ProjectImageIcon>}
          {/* Indicador de clique quando tem URL */}
          <ClickIndicator $visible={hasUrl}>
            {liveUrl ? '🔗 Ver Site' : '📁 Ver Código'}
          </ClickIndicator>
        </ProjectImage>
        <ProjectContent>
          <ProjectTitle>{title}</ProjectTitle>
          <ProjectDescription>{description}</ProjectDescription>
        </ProjectContent>
      </TiltCard>
    </CardContainer>
  );
};
