import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  background-image: 
    linear-gradient(30deg, #8b7cf8 12%, transparent 12.5%, transparent 87%, #8b7cf8 87.5%, #8b7cf8),
    linear-gradient(150deg, #8b7cf8 12%, transparent 12.5%, transparent 87%, #8b7cf8 87.5%, #8b7cf8),
    linear-gradient(30deg, #8b7cf8 12%, transparent 12.5%, transparent 87%, #8b7cf8 87.5%, #8b7cf8),
    linear-gradient(150deg, #8b7cf8 12%, transparent 12.5%, transparent 87%, #8b7cf8 87.5%, #8b7cf8);
  background-size: 80px 140px;
  background-position: 0 0, 0 0, 40px 70px, 40px 70px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  color: #e2e8f0;
  line-height: 1.8;
`;

const AboutText = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #a0aec0;
`;

const HighlightText = styled.span`
  color: #8b7cf8;
  font-weight: 600;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(139, 124, 248, 0.2);
    border-color: rgba(139, 124, 248, 0.3);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #a0aec0;
  font-weight: 500;
`;

const SkillsContainer = styled.div``;

const SkillsTitle = styled(motion.h3)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 2rem;
  text-align: center;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(139, 124, 248, 0.15);
    border-color: rgba(139, 124, 248, 0.3);
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.div`
  font-size: 0.9rem;
  color: #a0aec0;
  font-weight: 500;
`;

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skills = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Git', icon: '📝' },
    { name: 'GraphQL', icon: '📊' }
  ];

  const stats = [
    { number: '3+', label: 'Anos de Experiência' },
    { number: '50+', label: 'Projetos Concluídos' },
    { number: '15+', label: 'Tecnologias' },
    { number: '100%', label: 'Dedicação' }
  ];

  return (
    <AboutSection id="about" ref={ref}>
      <BackgroundPattern />
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Sobre Mim
        </SectionTitle>

        <ContentGrid>
          <TextContent>
            <AboutText
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sou um <HighlightText>desenvolvedor full stack apaixonado</HighlightText> por criar
              soluções digitais inovadoras que fazem a diferença. Com mais de 3 anos de experiência,
              especializo-me em tecnologias modernas como React, TypeScript e Node.js.
            </AboutText>

            <AboutText
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Minha jornada começou com curiosidade sobre como as coisas funcionam na web,
              e hoje transformo <HighlightText>ideias complexas em interfaces intuitivas</HighlightText> e
              experiências de usuário excepcionais.
            </AboutText>

            <AboutText
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Quando não estou codificando, gosto de explorar novas tecnologias,
              contribuir para projetos open source e compartilhar conhecimento
              com a comunidade de desenvolvedores.
            </AboutText>

            <StatsContainer
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsContainer>
          </TextContent>

          <SkillsContainer>
            <SkillsTitle
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Tecnologias & Ferramentas
            </SkillsTitle>

            <SkillsGrid
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SkillIcon>{skill.icon}</SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                </SkillCard>
              ))}
            </SkillsGrid>
          </SkillsContainer>
        </ContentGrid>
      </Container>
    </AboutSection>
  );
};
