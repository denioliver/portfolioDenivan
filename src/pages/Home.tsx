import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const HomeContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
`;

const FloatingShape = styled(motion.div) <{ $size: number; $color: string }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: ${props => props.$color};
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(1px);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  z-index: 1;
  position: relative;
`;

const HeroSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Greeting = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
  opacity: 0.8;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: ${props => props.theme.fontWeights.bold};
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 4vw, 2rem);
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.9;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  line-height: 1.7;
`;

const SkillsPreview = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const SkillBadge = styled(motion.span)`
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.large};
  font-size: 0.9rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  backdrop-filter: blur(10px);
  cursor: pointer;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}10;
    transform: translateY(-2px);
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}10;
    transform: translateY(-2px);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.card};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  color: ${props => props.theme.colors.text};
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px) scale(1.1);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${props => props.theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ScrollIcon = styled(motion.div)`
  font-size: 1.5rem;
`;

export const Home: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  const floatingAnimation = {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  };

  const skillsAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.5,
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    }),
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Firebase', 'PostgreSQL'];

  return (
    <HomeContainer id="home" ref={ref}>
      <BackgroundElements>
        <FloatingShape
          $size={300}
          $color="linear-gradient(135deg, #8b7cf8, #1dd1a1)"
          style={{ top: '10%', left: '10%' }}
          animate={floatingAnimation}
        />
        <FloatingShape
          $size={200}
          $color="linear-gradient(135deg, #1dd1a1, #ffd700)"
          style={{ top: '60%', right: '15%' }}
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
        />
        <FloatingShape
          $size={150}
          $color="linear-gradient(135deg, #ffd700, #8b7cf8)"
          style={{ bottom: '20%', left: '20%' }}
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 4 },
          }}
        />
      </BackgroundElements>

      <ContentWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <HeroSection>
            <Greeting variants={itemVariants}>
              Olá, eu sou
            </Greeting>

            <MainTitle variants={itemVariants}>
              Denivan Oliveira
            </MainTitle>

            <Subtitle variants={itemVariants}>
              Desenvolvedor Full Stack
            </Subtitle>

            <Description variants={itemVariants}>
              Transformo ideias em experiências digitais incríveis. Especializado em React, TypeScript e tecnologias modernas para criar soluções web robustas e escaláveis.
            </Description>
          </HeroSection>

          <SkillsPreview variants={itemVariants}>
            {skills.map((skill, index) => (
              <SkillBadge
                key={skill}
                custom={index}
                variants={skillsAnimation}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </SkillBadge>
            ))}
          </SkillsPreview>

          <CTAButtons variants={itemVariants}>
            <PrimaryButton
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Ver Projetos</span>
            </PrimaryButton>

            <SecondaryButton
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload />
              <span>Download CV</span>
            </SecondaryButton>
          </CTAButtons>

          <SocialLinks variants={itemVariants}>
            <SocialLink
              href="https://github.com/denivan-oliveira"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiGithub />
            </SocialLink>

            <SocialLink
              href="https://linkedin.com/in/denivan-oliveira"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiLinkedin />
            </SocialLink>

            <SocialLink
              href="mailto:denivan.oliveira@email.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiMail />
            </SocialLink>
          </SocialLinks>
        </motion.div>

        <ScrollIndicator
          onClick={() => scrollToSection('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <ScrollText>Rolar para baixo</ScrollText>
          <ScrollIcon
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiArrowDown />
          </ScrollIcon>
        </ScrollIndicator>
      </ContentWrapper>
    </HomeContainer>
  );
};
