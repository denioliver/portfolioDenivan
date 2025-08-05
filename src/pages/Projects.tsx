import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../services/firestore';
import type { Project } from '../services/firestore';

// Função para carregar imagem local baseada no título do projeto
const getProjectImage = (title: string): string => {
  try {
    // Tenta carregar a imagem baseada no título exato
    return new URL(`../assets/imgProjects/${title}.png`, import.meta.url).href;
  } catch {
    console.warn(`Imagem não encontrada para o projeto: ${title}`);
    // Fallback para uma imagem padrão se não encontrar
    return 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Projeto';
  }
};

const ProjectsSection = styled(motion.section)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.medium};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-8px);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
  }
`;

const ProjectImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 200px;
  background: url(${props => props.imageUrl}) center/cover;
  background-color: ${({ theme }) => theme.colors.primary};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0.1;
  }
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProjectName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.accent}20;
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
`;

const LoadingMessage = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const ErrorMessage = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.1rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('🏠 Componente Projects renderizado, projects:', projects); // Debug

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('🔥 Buscando projetos do Firestore...'); // Debug
        // Busca os projetos do Firestore
        const projectsData = await getProjects();
        console.log('📊 Projetos carregados:', projectsData); // Debug
        console.log('📊 Quantidade de projetos:', projectsData.length); // Debug
        setProjects(projectsData);
      } catch (err) {
        console.error('❌ Erro ao buscar projetos:', err); // Debug melhorado
        setError('Erro ao carregar projetos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <ProjectsSection id="projetos">
        <Container>
          <Title
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Meus Projetos
          </Title>
          <LoadingMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Carregando projetos...
          </LoadingMessage>
        </Container>
      </ProjectsSection>
    );
  }

  if (error) {
    return (
      <ProjectsSection id="projetos">
        <Container>
          <Title
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Meus Projetos
          </Title>
          <ErrorMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {error}
          </ErrorMessage>
        </Container>
      </ProjectsSection>
    );
  }

  return (
    <ProjectsSection id="projetos">
      <Container>
        <Title
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Meus Projetos
        </Title>

        {projects.length === 0 ? (
          <EmptyState
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EmptyIcon>📁</EmptyIcon>
            <h3>Nenhum projeto encontrado</h3>
            <p>Os projetos serão exibidos aqui em breve!</p>
          </EmptyState>
        ) : (
          <ProjectsGrid>
            <AnimatePresence>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.02 }}
                  layout
                >
                  <ProjectImage
                    imageUrl={getProjectImage(project.title)}
                  />
                  <ProjectContent>
                    <ProjectName>{project.title}</ProjectName>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TechTags>
                      {project.technologies.map((tech) => (
                        <TechTag key={tech}>{tech}</TechTag>
                      ))}
                    </TechTags>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </AnimatePresence>
          </ProjectsGrid>
        )}
      </Container>
    </ProjectsSection>
  );
};
