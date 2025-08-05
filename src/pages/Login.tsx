import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { signIn } from '../services/auth';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
// import { AuthDebugger } from '../components/AuthDebugger'; // Desabilitado temporariamente

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
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
      ${({ theme }) => theme.colors.primary}03 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const LoginCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 900px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    max-width: 420px;
    padding: 2rem;
    margin: 1rem;
  }
`;

const LoginContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  z-index: 999;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(-4px);
  }
`;

const ThemeToggleContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 999;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  font-size: 1rem;
  line-height: 1.5;
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
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}10;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 124, 248, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  border-radius: 8px;
`;

const AdminInfo = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  height: fit-content;
`;

const InfoTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureList = styled.ul`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  padding-left: 1.2rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 🔥 Autenticação real com Firebase
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);

      // Tratamento de erros específicos do Firebase
      const firebaseError = error as { code?: string };
      if (firebaseError.code === 'auth/user-not-found') {
        setError('Usuário não encontrado.');
      } else if (firebaseError.code === 'auth/wrong-password') {
        setError('Senha incorreta.');
      } else if (firebaseError.code === 'auth/invalid-email') {
        setError('Email inválido.');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError('Muitas tentativas. Tente novamente mais tarde.');
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <BackButton to="/">
        ← Voltar ao Portfólio
      </BackButton>

      <ThemeToggleContainer>
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </ThemeToggleContainer>

      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Admin Login</Title>
        <Subtitle>
          Acesse o painel para gerenciar seus projetos
        </Subtitle>

        <LoginContent>
          <FormSection>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <LoginButton type="submit" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </LoginButton>
            </Form>
          </FormSection>

          <AdminInfo>
            <InfoTitle>
              � Olá! Esta é minha área administrativa
            </InfoTitle>
            <InfoDescription>
              Oi! Aqui é onde eu, Denivan, cuido de todo o conteúdo do meu portfólio.
              É como os bastidores de um teatro - aqui acontece a magia! ✨
            </InfoDescription>
            <InfoDescription>
              <strong>Se você pudesse entrar aqui, veria:</strong>
            </InfoDescription>
            <FeatureList>
              <FeatureItem>📁 Onde eu adiciono meus novos projetos (e às vezes removo os que não gosto mais 😅)</FeatureItem>
              <FeatureItem>🖼️ Upload das imagens mais bonitas dos meus trabalhos</FeatureItem>
              <FeatureItem>📝 Onde escrevo e reescrevo as descrições até ficarem perfeitas</FeatureItem>
              <FeatureItem>🔗 Organizo todos os links dos projetos e repositórios</FeatureItem>
              <FeatureItem>📊 Fico vendo quem visita meu portfólio (de forma anônima, claro!)</FeatureItem>
              <FeatureItem>💬 Leio todos os feedbacks que vocês mandam - adoro receber!</FeatureItem>
            </FeatureList>
            <InfoDescription>
              <em>É meu cantinho especial, protegido com Firebase. Só eu tenho a chave! 🔐</em>
            </InfoDescription>
          </AdminInfo>
        </LoginContent>

        {/* Debug temporário - desabilitado enquanto resolve Firebase */}
        {/* <div style={{ marginTop: '2rem' }}>
          <AuthDebugger />
        </div> */}
      </LoginCard>
    </LoginContainer>
  );
};
