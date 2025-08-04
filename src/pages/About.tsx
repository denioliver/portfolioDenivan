import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled(motion.section)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const ContentSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Text = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.medium};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-4px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SkillName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ImageSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(motion.div)`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 300px;
    height: 300px;
    font-size: 6rem;
  }
`;

const ProfileIcon = styled.div`
  z-index: 1;
  color: ${({ theme }) => theme.colors.accent};
`;

export const About = () => {
  const skills = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Git', icon: '📚' },
    { name: 'Linux', icon: '🐧' },
  ];

  return (
    <AboutSection
      id="sobre"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Container>
        <ContentSection
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title>Sobre Mim</Title>

          <Text>
            Olá! Sou Denivan Oliveira, um desenvolvedor Full Stack apaixonado por
            tecnologia e inovação. Com mais de 3 anos de experiência no desenvolvimento
            web, transformo ideias complexas em soluções digitais elegantes e funcionais.
          </Text>

          <Text>
            Minha jornada na programação começou com curiosidade e se tornou uma paixão.
            Especializo-me em React, TypeScript, Node.js e tecnologias modernas do
            ecossistema JavaScript. Adoro criar interfaces intuitivas e APIs robustas
            que proporcionam experiências excepcionais aos usuários.
          </Text>

          <Text>
            Quando não estou codificando, você me encontra estudando novas tecnologias,
            contribuindo para projetos open source ou explorando as últimas tendências
            em desenvolvimento web. Acredito que o aprendizado contínuo é fundamental
            para se manter relevante neste campo em constante evolução.
          </Text>

          <Title>Tecnologias</Title>
          <SkillsGrid>
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <SkillIcon>{skill.icon}</SkillIcon>
                <SkillName>{skill.name}</SkillName>
              </SkillCard>
            ))}
          </SkillsGrid>
        </ContentSection>

        <ImageSection
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ProfileImage
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProfileIcon>👨‍💻</ProfileIcon>
          </ProfileImage>
        </ImageSection>
      </Container>
    </AboutSection>
  );
};
