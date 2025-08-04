import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { logout } from '../services/auth';
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
  getFeedbacks,
  deleteFeedback,
  type Project,
  type Feedback
} from '../services/firestore';
import { ImageUploader } from '../components/ImageUploader';
// import { UploadDebugger } from '../components/UploadDebugger';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0d0d15 100%);
  padding: 2rem;
  color: #e2e8f0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(20px);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoutButton = styled.button`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  color: #ff6b6b;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 107, 107, 0.2);
    transform: translateY(-2px);
  }
`;

const Content = styled.div<{ $singleColumn?: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${props => props.$singleColumn ? '1fr' : '400px 1fr'};
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  height: fit-content;
`;

const ProjectsList = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(20px);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #e2e8f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8b7cf8;
    background: rgba(139, 124, 248, 0.05);
    box-shadow: 0 0 0 3px rgba(139, 124, 248, 0.1);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #8b7cf8;
    background: rgba(139, 124, 248, 0.05);
    box-shadow: 0 0 0 3px rgba(139, 124, 248, 0.1);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8b7cf8;
    background: rgba(139, 124, 248, 0.05);
    box-shadow: 0 0 0 3px rgba(139, 124, 248, 0.1);
  }
  
  option {
    background: #111118;
    color: #e2e8f0;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 124, 248, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(139, 124, 248, 0.3);
    background: rgba(139, 124, 248, 0.05);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #e2e8f0;
`;

const ProjectType = styled.span<{ $type: 'web' | 'mobile' }>`
  display: inline-block;
  background: ${props => props.$type === 'web' ? 'rgba(29, 209, 161, 0.2)' : 'rgba(139, 124, 248, 0.2)'};
  color: ${props => props.$type === 'web' ? '#1dd1a1' : '#8b7cf8'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #a0aec0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: #cbd5e0;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const EditButton = styled.button`
  background: rgba(139, 124, 248, 0.1);
  border: 1px solid rgba(139, 124, 248, 0.3);
  color: #8b7cf8;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 124, 248, 0.2);
    transform: translateY(-1px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ProjectLink = styled.a`
  background: rgba(29, 209, 161, 0.1);
  border: 1px solid rgba(29, 209, 161, 0.3);
  color: #1dd1a1;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(29, 209, 161, 0.2);
    transform: translateY(-1px);
  }
`;

// Componentes para Abas
const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'rgba(139, 124, 248, 0.2)' : 'rgba(0, 0, 0, 0.4)'};
  border: 1px solid ${props => props.$active ? 'rgba(139, 124, 248, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? '#8b7cf8' : '#a0aec0'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 124, 248, 0.1);
    color: #8b7cf8;
  }
`;

// Componentes para Feedbacks
const FeedbackCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(29, 209, 161, 0.3);
    background: rgba(29, 209, 161, 0.05);
  }
`;

const FeedbackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const FeedbackInfo = styled.div``;

const FeedbackName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
`;

const FeedbackEmail = styled.p`
  color: #1dd1a1;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const FeedbackDate = styled.p`
  color: #a0aec0;
  font-size: 0.8rem;
`;

const FeedbackSubject = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #8b7cf8;
  margin-bottom: 0.75rem;
`;

const FeedbackMessage = styled.p`
  color: #cbd5e0;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const DeleteButton = styled.button`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  color: #ff6b6b;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 107, 107, 0.2);
    transform: translateY(-1px);
  }
`;

export const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'feedbacks'>('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    image: '',
    type: 'web',
    technologies: [],
    liveUrl: '',
    githubUrl: ''
  });

  // 🔥 Carregar projetos do Firebase
  useEffect(() => {
    loadProjects();
    loadFeedbacks();
  }, []);

  // Preencher formulário quando editando
  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
    }
  }, [editingProject]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFeedbacks = async () => {
    try {
      const feedbacksData = await getFeedbacks();
      setFeedbacks(feedbacksData);
    } catch (error) {
      console.error('Erro ao carregar feedbacks:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({
      ...prev,
      technologies
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingProject) {
        // 🔥 Atualizar projeto existente
        await updateProject(editingProject.id!, formData);
        console.log('Projeto atualizado com sucesso!');
      } else {
        // 🔥 Adicionar novo projeto
        await addProject(formData);
        console.log('Projeto adicionado com sucesso!');
      }

      // Recarregar projetos
      await loadProjects();

      // Limpar formulário e modo de edição
      setFormData({
        title: '',
        description: '',
        image: '',
        type: 'web',
        technologies: [],
        liveUrl: '',
        githubUrl: ''
      });
      setEditingProject(null);

    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      type: 'web',
      technologies: [],
      liveUrl: '',
      githubUrl: ''
    });
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteProject(projectId);
        await loadProjects(); // Recarregar lista
      } catch (error) {
        console.error('Erro ao excluir projeto:', error);
      }
    }
  };

  const handleDeleteFeedback = async (feedbackId: string) => {
    if (confirm('Tem certeza que deseja excluir este feedback?')) {
      try {
        await deleteFeedback(feedbackId);
        await loadFeedbacks(); // Recarregar lista
      } catch (error) {
        console.error('Erro ao excluir feedback:', error);
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

  return (
    <DashboardContainer>
      <Header>
        <Title>Dashboard Admin</Title>
        <LogoutButton onClick={handleLogout}>
          Sair
        </LogoutButton>
      </Header>

      <TabsContainer>
        <Tab
          $active={activeTab === 'projects'}
          onClick={() => setActiveTab('projects')}
        >
          📁 Projetos ({projects.length})
        </Tab>
        <Tab
          $active={activeTab === 'feedbacks'}
          onClick={() => setActiveTab('feedbacks')}
        >
          💬 Feedbacks ({feedbacks.length})
        </Tab>
      </TabsContainer>

      <Content $singleColumn={activeTab === 'feedbacks'}>
        {activeTab === 'projects' && (
          <FormCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FormTitle>
              {editingProject ? '✏️ Editando Projeto' : '➕ Adicionar Novo Projeto'}
              {editingProject && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    marginLeft: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 107, 107, 0.1)',
                    border: '1px solid rgba(255, 107, 107, 0.3)',
                    color: '#ff6b6b',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  ❌ Cancelar
                </button>
              )}
            </FormTitle>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Título do Projeto</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: E-commerce Moderno"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Descrição</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva seu projeto..."
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="image">Imagem do Projeto</Label>
                <ImageUploader
                  onImageUploaded={(imageUrl) => setFormData(prev => ({ ...prev, image: imageUrl }))}
                  currentImage={formData.image}
                  disabled={loading}
                />

                {/* Debug temporário - comentado para debug
                <UploadDebugger />
                */}
              </FormGroup>              <FormGroup>
                <Label htmlFor="type">Tipo do Projeto</Label>
                <Select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="technologies">Tecnologias (separadas por vírgula)</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={handleTechnologiesChange}
                  placeholder="React, TypeScript, Node.js"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="liveUrl">URL do Site (opcional)</Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://meu-projeto.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="githubUrl">URL do GitHub (opcional)</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/usuario/projeto"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Salvando...' : editingProject ? 'Atualizar Projeto' : 'Adicionar Projeto'}
              </SubmitButton>
            </Form>
          </FormCard>
        )}

        <ProjectsList>
          {activeTab === 'projects' ? (
            <>
              <FormTitle>Projetos Cadastrados ({projects.length})</FormTitle>
              {projects.length === 0 ? (
                <p style={{ color: '#a0aec0', textAlign: 'center', padding: '2rem' }}>
                  Nenhum projeto cadastrado ainda.
                </p>
              ) : (
                projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectType $type={project.type}>
                      {project.type === 'web' ? 'WEB' : 'MOBILE'}
                    </ProjectType>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>

                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          margin: '0.5rem 0'
                        }}
                      />
                    )}

                    <TechnologiesList>
                      {project.technologies.map((tech, idx) => (
                        <TechTag key={idx}>{tech}</TechTag>
                      ))}
                    </TechnologiesList>

                    {(project.liveUrl || project.githubUrl) && (
                      <ProjectLinks>
                        {project.liveUrl && (
                          <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            🌐 Ver Online
                          </ProjectLink>
                        )}
                        {project.githubUrl && (
                          <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            💻 GitHub
                          </ProjectLink>
                        )}
                      </ProjectLinks>
                    )}

                    <ProjectActions>
                      <EditButton onClick={() => setEditingProject(project)}>
                        ✏️ Editar
                      </EditButton>
                      <DeleteButton onClick={() => handleDeleteProject(project.id!)}>
                        🗑️ Excluir
                      </DeleteButton>
                    </ProjectActions>
                  </ProjectCard>
                ))
              )}
            </>
          ) : (
            <>
              <FormTitle>Feedbacks Recebidos ({feedbacks.length})</FormTitle>
              {feedbacks.length === 0 ? (
                <p style={{ color: '#a0aec0', textAlign: 'center', padding: '2rem' }}>
                  Nenhum feedback recebido ainda.
                </p>
              ) : (
                feedbacks.map((feedback, index) => (
                  <FeedbackCard
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <FeedbackHeader>
                      <FeedbackInfo>
                        <FeedbackName>{feedback.name}</FeedbackName>
                        <FeedbackEmail>{feedback.email}</FeedbackEmail>
                        <FeedbackDate>
                          {feedback.createdAt && new Date(feedback.createdAt.toDate()).toLocaleDateString('pt-BR')}
                        </FeedbackDate>
                      </FeedbackInfo>
                      <DeleteButton onClick={() => handleDeleteFeedback(feedback.id!)}>
                        🗑️ Excluir
                      </DeleteButton>
                    </FeedbackHeader>
                    <FeedbackSubject>{feedback.subject}</FeedbackSubject>
                    <FeedbackMessage>{feedback.message}</FeedbackMessage>
                  </FeedbackCard>
                ))
              )}
            </>
          )}
        </ProjectsList>
      </Content>
    </DashboardContainer>
  );
};
