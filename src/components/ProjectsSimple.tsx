import styled from 'styled-components';
import { ProjectCard3D } from './ProjectCard3D';
import { ScrollReveal } from './ScrollReveal';

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
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Plataforma completa de e-commerce com carrinho de compras, pagamentos integrados e painel administrativo.",
      icon: "🛒",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Dashboard interativo para análise de dados com gráficos dinâmicos e relatórios em PDF.",
      icon: "📊",
      technologies: ["React", "Chart.js", "Material-UI", "Firebase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 3,
      title: "API RESTful",
      description: "API robusta com autenticação JWT, documentação Swagger e testes automatizados.",
      icon: "🔌",
      technologies: ["Node.js", "Express", "PostgreSQL", "Jest", "Docker"],
      githubUrl: "https://github.com"
    },
    {
      id: 4,
      title: "Mobile App",
      description: "Aplicativo mobile cross-platform com navegação fluida e sincronização offline.",
      icon: "📱",
      technologies: ["React Native", "Redux", "Firebase", "AsyncStorage"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Website portfolio responsivo com animações suaves e otimização SEO.",
      icon: "🌐",
      technologies: ["Next.js", "Framer Motion", "Styled Components"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: 6,
      title: "Task Management",
      description: "Sistema de gerenciamento de tarefas com colaboração em tempo real.",
      icon: "✅",
      technologies: ["Vue.js", "Socket.io", "MongoDB", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    }
  ];

  return (
    <ProjectsContainer id="projects">
      <Container>
        <ScrollReveal>
          <Title>Meus Projetos</Title>
        </ScrollReveal>

        <ScrollReveal stagger>
          <ProjectsGrid>
            {projects.map((project) => (
              <CardWrapper key={project.id}>
                <ProjectCard3D
                  title={project.title}
                  description={project.description}
                  icon={project.icon}
                  stack={project.technologies}
                />
              </CardWrapper>
            ))}
          </ProjectsGrid>
        </ScrollReveal>
      </Container>
    </ProjectsContainer>
  );
};
