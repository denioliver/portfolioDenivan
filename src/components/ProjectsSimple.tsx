import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ProjectCard3D } from './ProjectCard3D';
import { ScrollReveal } from './ScrollReveal';
import { getProjects } from '../services/firestore';
import type { Project } from '../services/firestore';

// Função para carregar imagem local baseada no título do projeto
const getProjectImage = (title: string): string => {
  try {
    return new URL(`../assets/imgProjects/${title}.png`, import.meta.url).href;
  } catch {
    console.warn(`Imagem não encontrada para o projeto: ${title}`);
    return 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Projeto';
  }
};

const ProjectsContainer = styled.section`
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
      ellipse at center,
      rgba(29, 209, 161, 0.02) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  overflow: visible;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  position: relative;
  overflow: visible;
  
  & > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.shadow};

  &:hover {
    transform: translateY(-10px);
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 25px 50px ${({ theme }) => theme.colors.primary}20;
    border-color: ${({ theme }) => theme.colors.primary}30;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  z-index: 1;
  transition: z-index 0s;
  
  &:hover {
    z-index: 999;
  }
`;

export const ProjectsSimple = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('🔥 Buscando projetos do Firestore para ProjectsSimple...');
        const projectsData = await getProjects();
        console.log('📊 Projetos carregados:', projectsData);
        setProjects(projectsData);
      } catch (err) {
        console.error('❌ Erro ao buscar projetos:', err);
        // Em caso de erro, usar dados de fallback ou array vazio
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Se estiver carregando, mostrar loading
  if (loading) {
    return (
      <ProjectsContainer id="projects">
        <Container>
          <ScrollReveal>
            <Title>{t('projects.title')}</Title>
          </ScrollReveal>
          <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
            {t('projects.loading')}
          </div>
        </Container>
      </ProjectsContainer>
    );
  }

  return (
    <ProjectsContainer id="projects">
      <Container>
        <ScrollReveal>
          <Title>{t('projects.title')}</Title>
        </ScrollReveal>

        <ScrollReveal stagger>
          <ProjectsGrid>
            {projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#666', gridColumn: '1/-1' }}>
                {t('projects.empty')}
              </div>
            ) : (
              projects.map((project) => (
                <CardWrapper key={project.id}>
                  <ProjectCard3D
                    title={project.title}
                    description={project.description}
                    icon="🚀" // Ícone padrão ou você pode mapear baseado no tipo
                    stack={project.technologies}
                    imageUrl={getProjectImage(project.title)} // Passa a imagem
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                  />
                </CardWrapper>
              ))
            )}
          </ProjectsGrid>
        </ScrollReveal>
      </Container>
    </ProjectsContainer>
  );
};
