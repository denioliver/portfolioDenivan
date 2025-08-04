import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  type Project
} from '../services/firestore';
import { logout } from '../services/auth';
import { useAuth } from '../hooks/useAuth';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex: 1;
`;

const LogoutButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.xl};
  height: fit-content;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme, hasError }) =>
    hasError ? '#ef4444' : theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme, hasError }) =>
    hasError ? '#ef4444' : theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.8rem;
`;

const SubmitButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.button.text};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.medium};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ProjectsSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ProjectsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProjectName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ActionButton = styled(motion.button) <{ variant?: 'edit' | 'delete' }>`
  background: ${({ variant }) =>
    variant === 'delete' ? '#ef4444' : '#6c63ff'};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  min-width: 60px;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.accent}20;
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 12px;
  font-size: 0.7rem;
`;

interface ProjectFormData {
  name: string;
  description: string;
  imageUrl: string;
  technologies: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ProjectFormData>();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchProjects();
  }, [user, navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const projectData = {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        technologies: data.technologies.split(',').map(tech => tech.trim()),
      };

      if (editingProject) {
        await updateProject(editingProject.id!, projectData);
      } else {
        await addProject(projectData);
      }

      reset();
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      alert('Erro ao salvar projeto. Tente novamente.');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setValue('name', project.name);
    setValue('description', project.description);
    setValue('imageUrl', project.imageUrl);
    setValue('technologies', project.technologies.join(', '));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Erro ao excluir projeto:', error);
        alert('Erro ao excluir projeto. Tente novamente.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const cancelEdit = () => {
    setEditingProject(null);
    reset();
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard Admin</Title>
        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sair
        </LogoutButton>
      </Header>

      <Content>
        <FormSection
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FormTitle>
            {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
          </FormTitle>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nome do projeto"
                hasError={!!errors.name}
                {...register('name', { required: 'Nome é obrigatório' })}
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Descrição</Label>
              <TextArea
                id="description"
                placeholder="Descrição do projeto"
                hasError={!!errors.description}
                {...register('description', { required: 'Descrição é obrigatória' })}
              />
              {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                hasError={!!errors.imageUrl}
                {...register('imageUrl', { required: 'URL da imagem é obrigatória' })}
              />
              {errors.imageUrl && <ErrorMessage>{errors.imageUrl.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="technologies">Tecnologias (separadas por vírgula)</Label>
              <Input
                id="technologies"
                type="text"
                placeholder="React, TypeScript, Node.js"
                hasError={!!errors.technologies}
                {...register('technologies', { required: 'Tecnologias são obrigatórias' })}
              />
              {errors.technologies && <ErrorMessage>{errors.technologies.message}</ErrorMessage>}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Salvando...' : editingProject ? 'Atualizar' : 'Criar'}
            </SubmitButton>

            {editingProject && (
              <SubmitButton
                type="button"
                onClick={cancelEdit}
                style={{ background: '#6c757d' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </SubmitButton>
            )}
          </Form>
        </FormSection>

        <ProjectsSection>
          <ProjectsTitle>Projetos ({projects.length})</ProjectsTitle>

          {loading ? (
            <div>Carregando projetos...</div>
          ) : (
            <ProjectsList>
              <AnimatePresence>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectHeader>
                      <ProjectName>{project.name}</ProjectName>
                      <ProjectActions>
                        <ActionButton
                          variant="edit"
                          onClick={() => handleEdit(project)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Editar
                        </ActionButton>
                        <ActionButton
                          variant="delete"
                          onClick={() => handleDelete(project.id!)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Excluir
                        </ActionButton>
                      </ProjectActions>
                    </ProjectHeader>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TechTags>
                      {project.technologies.map((tech) => (
                        <TechTag key={tech}>{tech}</TechTag>
                      ))}
                    </TechTags>
                  </ProjectCard>
                ))}
              </AnimatePresence>

              {projects.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
                  Nenhum projeto encontrado. Crie seu primeiro projeto!
                </div>
              )}
            </ProjectsList>
          )}
        </ProjectsSection>
      </Content>
    </DashboardContainer>
  );
};
