import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';

const AboutContainer = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at top,
      rgba(139, 124, 248, 0.02) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  text-align: center;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  line-height: 1.8;
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

const HighlightText = styled.span`
  color: #8b7cf8;
  font-weight: 700;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 0.8rem;
    max-width: 100%;
  }
`;

const SkillCard = styled.div`
  padding: 1.2rem 0.8rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(139, 124, 248, 0.15);
    border-color: rgba(139, 124, 248, 0.3);
    background: rgba(139, 124, 248, 0.08);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SkillIcon = styled.div`
  margin-bottom: 0.6rem;
  
  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    
    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
    }
  }
`;

const SkillName = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.01em;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const SkillsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const AboutSimple = () => {
  const { t } = useTranslation();
  
  const skills = [
    // Frontend Core
    {
      name: 'HTML5',
      icon: 'https://cdn.svgporn.com/logos/html-5.svg',
      url: 'https://www.w3.org/TR/html5/'
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.svgporn.com/logos/css-3.svg',
      url: 'https://www.w3.org/TR/CSS/'
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.svgporn.com/logos/javascript.svg',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.svgporn.com/logos/typescript-icon.svg',
      url: 'https://www.typescriptlang.org/'
    },
    // Frontend Frameworks & Libraries
    {
      name: 'React',
      icon: 'https://cdn.svgporn.com/logos/react.svg',
      url: 'https://reactjs.org/'
    },
    {
      name: 'TailwindCSS',
      icon: 'https://cdn.svgporn.com/logos/tailwindcss-icon.svg',
      url: 'https://tailwindcss.com/'
    },
    // Backend
    {
      name: 'Node.js',
      icon: 'https://cdn.svgporn.com/logos/nodejs-icon.svg',
      url: 'https://nodejs.org/'
    },
    {
      name: 'Python',
      icon: 'https://cdn.svgporn.com/logos/python.svg',
      url: 'https://www.python.org/'
    },
    {
      name: 'Java',
      icon: 'https://cdn.svgporn.com/logos/java.svg',
      url: 'https://www.oracle.com/java/'
    },
    // Database & Cloud
    {
      name: 'Firebase',
      icon: 'https://cdn.svgporn.com/logos/firebase.svg',
      url: 'https://firebase.google.com/'
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.svgporn.com/logos/mysql-icon.svg',
      url: 'https://www.mysql.com/'
    },
    {
      name: 'Sequelize',
      icon: 'https://cdn.svgporn.com/logos/sequelize.svg',
      url: 'https://sequelize.org/'
    },
    // DevOps
    {
      name: 'Docker',
      icon: 'https://cdn.svgporn.com/logos/docker-icon.svg',
      url: 'https://www.docker.com/'
    },
    // Design Tools
    {
      name: 'Photoshop',
      icon: 'https://denioliver.github.io/portfolio/static/media/logo-photoshopcs3.309cc5f7bbc54aba2f0f.309cc5f7bbc54aba2f0f.png',
      url: 'https://www.adobe.com/products/photoshop.html'
    },
    {
      name: 'CorelDraw',
      icon: 'https://denioliver.github.io/portfolio/static/media/logo-coreldraw.aaaf4f990bba2517be57.aaaf4f990bba2517be57.png',
      url: 'https://www.coreldraw.com/'
    }
  ];

  return (
    <AboutContainer id="about">
      <Container>
        <ScrollReveal>
          <Title>{t('about.title')}</Title>
        </ScrollReveal>

        <Content>
          <ScrollReveal direction="left">
            <TextContent>
              <Description>
                <HighlightText>{t('about.description1Highlight')}</HighlightText> {t('about.description1')} <HighlightText>{t('about.description1Course')}</HighlightText>{t('about.description1End')}
              </Description>

              <Description>
                {t('about.description2')}
                <HighlightText>{t('about.description2Highlight')}</HighlightText>
                {t('about.description2End')}
              </Description>

              <Description>
                {t('about.description3')} <HighlightText>{t('about.description3Highlight')}</HighlightText>
                {t('about.description3Middle')} <HighlightText>{t('about.description3End')}</HighlightText>.
              </Description>

              <Description>
                {t('about.description4')}
                <HighlightText>{t('about.description4Highlight')}</HighlightText>
                {t('about.description4End')}
              </Description>
            </TextContent>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <div>
              <SkillsTitle>
                {t('about.skillsTitle')}
              </SkillsTitle>

              <ScrollReveal delay={0.5}>
                <SkillsGrid>
                  {skills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      as="a"
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        animationDelay: `${0.1 * index}s`
                      }}
                    >
                      <SkillIcon>
                        <img src={skill.icon} alt={skill.name} title={skill.name} />
                      </SkillIcon>
                      <SkillName>{skill.name}</SkillName>
                    </SkillCard>
                  ))}
                </SkillsGrid>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </Content>
      </Container>
    </AboutContainer>
  );
};
