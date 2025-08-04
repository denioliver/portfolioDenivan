import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
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

const FilterTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button) <{ $active: boolean }>`
  padding: 0.8rem 2rem;
  border-radius: 25px;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, #8b7cf8, #1dd1a1)'
      : 'rgba(255, 255, 255, 0.05)'
  };
  color: ${({ $active }) => ($active ? '#fff' : '#a0aec0')};
  border: 1px solid ${({ $active }) =>
    $active
      ? 'transparent'
      : 'rgba(255, 255, 255, 0.1)'
  };
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $active }) =>
    $active
      ? 'linear-gradient(135deg, #8b7cf8, #1dd1a1)'
      : 'rgba(255, 255, 255, 0.1)'
  };
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(139, 124, 248, 0.2);
    border-color: rgba(139, 124, 248, 0.3);
  }
`;

const ProjectImage = styled.div<{ $bgImage: string }>`
  height: 200px;
  background: linear-gradient(135deg, rgba(139, 124, 248, 0.1), rgba(29, 209, 161, 0.1)),
              url(${({ $bgImage }) => $bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(139, 124, 248, 0.3), rgba(29, 209, 161, 0.3));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  ${ProjectCard}:hover &::before {
    opacity: 1;
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: #a0aec0;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  padding: 0.3rem 0.8rem;
  background: rgba(139, 124, 248, 0.2);
  color: #8b7cf8;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(139, 124, 248, 0.3);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(139, 124, 248, 0.4);
  }

  &.secondary {
    background: transparent;
    border: 2px solid #8b7cf8;
    color: #8b7cf8;

    &:hover {
      background: rgba(139, 124, 248, 0.1);
    }
  }
`;

const LoadMoreButton = styled(motion.button)`
  display: block;
  margin: 3rem auto 0;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 124, 248, 0.3);
  }
`;

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Plataforma completa de e-commerce com carrinho de compras, pagamentos integrados, painel administrativo e dashboard de vendas em tempo real.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "fullstack"
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Dashboard interativo para análise de dados com gráficos dinâmicos, filtros avançados e relatórios em PDF. Interface responsiva e moderna.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
      technologies: ["React", "Chart.js", "Material-UI", "Firebase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "frontend"
    },
    {
      id: 3,
      title: "API RESTful",
      description: "API robusta com autenticação JWT, documentação Swagger, rate limiting, logs estruturados e testes automatizados completos.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
      technologies: ["Node.js", "Express", "PostgreSQL", "Jest", "Docker"],
      githubUrl: "https://github.com",
      category: "backend"
    },
    {
      id: 4,
      title: "Mobile App",
      description: "Aplicativo mobile cross-platform com navegação fluida, notificações push, câmera integrada e sincronização offline/online.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80",
      technologies: ["React Native", "Redux", "Firebase", "AsyncStorage"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "mobile"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Website portfolio responsivo com animações suaves, modo escuro/claro, otimização SEO e carregamento ultra-rápido.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&q=80",
      technologies: ["Next.js", "Framer Motion", "Styled Components"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "frontend"
    },
    {
      id: 6,
      title: "Task Management",
      description: "Sistema completo de gerenciamento de tarefas com colaboração em tempo real, notificações, calendário integrado e relatórios.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&q=80",
      technologies: ["Vue.js", "Socket.io", "MongoDB", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "fullstack"
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Meus Projetos
        </SectionTitle>

        <FilterTabs
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <FilterTab
              key={category.id}
              $active={activeFilter === category.id}
              onClick={() => {
                setActiveFilter(category.id);
                setVisibleProjects(6);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </FilterTab>
          ))}
        </FilterTabs>

        <ProjectsGrid
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <ProjectImage $bgImage={project.image} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>

                <TechStack>
                  {project.technologies.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TechStack>

                <ProjectLinks>
                  {project.liveUrl && (
                    <ProjectLink
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver Demo
                    </ProjectLink>
                  )}
                  {project.githubUrl && (
                    <ProjectLink
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Código
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>

        {visibleProjects < filteredProjects.length && (
          <LoadMoreButton
            onClick={() => setVisibleProjects(prev => prev + 3)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Carregar Mais Projetos
          </LoadMoreButton>
        )}
      </Container>
    </ProjectsSection>
  );
};
