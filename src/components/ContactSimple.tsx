import styled from 'styled-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addFeedback } from '../services/firestore';
import { handleFeedbackSubmission } from '../services/emailService';
import logoGitHub from '../assets/logos/github.png';
import logoLinkedIn from '../assets/logos/linkedin.png';
import logoEmail from '../assets/logos/email.png';

const ContactContainer = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
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
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentGrid = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`;

const InfoCard = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 2rem;
  margin: 10px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);


  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.primary}15;
    border-color: ${({ theme }) => theme.colors.primary}30;
  }
`;

const InfoIcon = styled.div<{ $iconSrc?: string }>`
  width: 60px;
  height: 60px;
  background: ${({ $iconSrc }) =>
    $iconSrc
      ? `url(${$iconSrc}) center/contain no-repeat`
      : 'linear-gradient(135deg, #8b7cf8, #1dd1a1)'
  };
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  filter: ${({ $iconSrc }) => $iconSrc ? 'brightness(1.1)' : 'none'};
  transition: all 0.3s ease;

  /* Se for uma imagem, adiciona um fundo sutil */
  ${({ $iconSrc }) => $iconSrc && `
    background-color: rgba(255, 255, 255, 0.1);
    background-size: 35px 35px;
  `}
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const ContactForm = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
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

const TextArea = styled.textarea`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
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

const SubmitButton = styled.button<{ $loading: boolean }>`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #8b7cf8, #1dd1a1);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 124, 248, 0.3);
  }

  @media (max-width: 968px) {
    padding: 10px 20px;
    font-weight: 400;
    font-size: 0.8rem;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #1dd1a1, #8b7cf8);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
`;

export const ContactSimple = () => {
  const { t } = useTranslation();
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

    try {
      // 1. Salvar feedback no Firebase
      await addFeedback({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: Date.now()
      });

      // 2. 📧 Enviar email de notificação
      console.log('📧 Enviando notificação por email...');
      const emailResult = await handleFeedbackSubmission({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (emailResult.success) {
        console.log('✅ Email enviado com sucesso!');
      } else {
        console.warn('⚠️ Erro no envio do email:', emailResult.error);
      }

      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      // Você pode adicionar uma mensagem de erro aqui se quiser
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: logoEmail,
      title: t('contact.info.email'),
      text: 'denyoliver777@gmail.com',
      action: () => window.open('mailto:denyoliver777@gmail.com', '_blank')
    },
    {
      icon: logoGitHub,
      title: t('contact.social.github'),
      text: 'github.com/denioliver',
      action: () => window.open('https://github.com/denioliver', '_blank')
    },
    {
      icon: logoLinkedIn,
      title: t('contact.social.linkedin'),
      text: 'linkedin.com/in/denivan-oliveira',
      action: () => window.open('https://www.linkedin.com/in/denivan-oliveira', '_blank')
    }
  ];

  return (
    <ContactContainer id="contact">
      <Container>
        <Title>{t('contact.title')}</Title>

        <Subtitle>
          {t('contact.subtitle')}
        </Subtitle>

        <ContentGrid>
          <ContactInfo>
            {contactInfo.map((info, index) => (
              <InfoCard key={index} onClick={info.action}>
                <InfoIcon $iconSrc={info.icon} />
                <InfoTitle>{info.title}</InfoTitle>
                <InfoText>{info.text}</InfoText>
              </InfoCard>
            ))}
          </ContactInfo>

          <ContactForm>
            <FormTitle>{t('contact.feedback.title')}</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">{t('contact.form.name')}</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">{t('contact.form.email')}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">{t('contact.feedback.subjectLabel')}</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t('contact.feedback.subjectPlaceholder')}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">{t('contact.feedback.messageLabel')}</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contact.feedback.messagePlaceholder')}
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                $loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? t('contact.form.sending') : t('contact.feedback.submit')}
              </SubmitButton>

              {showSuccess && (
                <SuccessMessage>
                  {t('contact.feedback.success')}
                </SuccessMessage>
              )}
            </Form>
          </ContactForm>
        </ContentGrid>
      </Container>
    </ContactContainer>
  );
};
