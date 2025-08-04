import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #16213e 0%, #0f0f23 50%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;
`;

const BackgroundEffects = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 20%;
    right: 10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(139, 124, 248, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 4s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    left: 10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(29, 209, 161, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse 4s ease-in-out infinite reverse;
  }

  @keyframes pulse {
    0%, 100% { 
      opacity: 0.5;
      transform: scale(1);
    }
    50% { 
      opacity: 1;
      transform: scale(1.1);
    }
  }
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
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: #a0aec0;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div``;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(139, 124, 248, 0.15);
    border-color: rgba(139, 124, 248, 0.3);
  }
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: #a0aec0;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(139, 124, 248, 0.3);
  }
`;

const ContactForm = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 1.5rem;
  text-align: center;
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
  font-weight: 600;
  color: #e2e8f0;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8b7cf8;
    box-shadow: 0 0 0 3px rgba(139, 124, 248, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #e2e8f0;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8b7cf8;
    box-shadow: 0 0 0 3px rgba(139, 124, 248, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const SubmitButton = styled(motion.button) <{ $loading: boolean }>`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 124, 248, 0.3);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #1dd1a1, #8b7cf8);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
`;

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envio de email
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      text: 'denivan.oliveira@email.com',
      link: 'mailto:denivan.oliveira@email.com'
    },
    {
      icon: '📱',
      title: 'Telefone',
      text: '+55 (11) 99999-9999',
      link: 'tel:+5511999999999'
    },
    {
      icon: '📍',
      title: 'Localização',
      text: 'São Paulo, SP - Brasil',
      link: null
    }
  ];

  const socialLinks = [
    { icon: '💼', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: '🐱', url: 'https://github.com', label: 'GitHub' },
    { icon: '🐦', url: 'https://twitter.com', label: 'Twitter' },
    { icon: '📷', url: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <ContactSection id="contact" ref={ref}>
      <BackgroundEffects />
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Vamos Trabalhar Juntos
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tenho uma ideia incrível ou precisa de um desenvolvedor talentoso?
          Entre em contato e vamos criar algo extraordinário juntos!
        </SectionSubtitle>

        <ContentGrid>
          <ContactInfo>
            {contactInfo.map((info, index) => (
              <InfoCard
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <InfoIcon>{info.icon}</InfoIcon>
                <InfoTitle>{info.title}</InfoTitle>
                <InfoText>
                  {info.link ? (
                    <a href={info.link} style={{ color: 'inherit' }}>
                      {info.text}
                    </a>
                  ) : (
                    info.text
                  )}
                </InfoText>
              </InfoCard>
            ))}

            <InfoCard
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <InfoTitle>Redes Sociais</InfoTitle>
              <SocialLinks>
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    {social.icon}
                  </SocialLink>
                ))}
              </SocialLinks>
            </InfoCard>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <FormTitle>Envie uma Mensagem</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Sobre o que você gostaria de falar?"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Mensagem</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Descreva seu projeto ou ideia em detalhes..."
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                $loading={isLoading}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
              </SubmitButton>

              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  ✨ Mensagem enviada com sucesso! Entrarei em contato em breve.
                </SuccessMessage>
              )}
            </Form>
          </ContactForm>
        </ContentGrid>
      </Container>
    </ContactSection>
  );
};
