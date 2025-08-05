import emailjs from '@emailjs/browser';

// 📧 Configuração do EmailJS usando variáveis de ambiente
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  TEMPLATE_CONFIRMATION: import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

interface FeedbackEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

/**
 * 📬 Envia email de notificação quando alguém envia feedback
 */
export const sendFeedbackNotification = async (feedbackData: FeedbackEmailData) => {
  try {
    console.log('📧 Enviando notificação de feedback...');

    // Preparar dados do template
    const templateParams = {
      to_email: 'denyoliver777@gmail.com', // Seu email
      from_name: feedbackData.name,
      from_email: feedbackData.email,
      subject: feedbackData.subject,
      message: feedbackData.message,
      timestamp: feedbackData.timestamp,

      // Dados adicionais para o template
      site_name: 'Portfolio Denivan',
      notification_title: '🎯 Novo Feedback Recebido!',
      user_info: `${feedbackData.name} (${feedbackData.email})`,
    };

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('✅ Email enviado com sucesso:', response);
    return { success: true, response };

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    return { success: false, error };
  }
};

/**
 * 📨 Envia email de confirmação para quem enviou o feedback
 */
export const sendFeedbackConfirmation = async (feedbackData: FeedbackEmailData) => {
  try {
    console.log('📨 Enviando confirmação para usuário...');

    const templateParams = {
      to_email: feedbackData.email,
      to_name: feedbackData.name,
      site_name: 'Portfolio Denivan',
      confirmation_message: 'Obrigado pelo seu feedback! Recebi sua mensagem e retornarei em breve.',
      developer_name: 'Denivan Oliveira',
    };

    // Usar template de confirmação
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_CONFIRMATION,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log('✅ Confirmação enviada:', response);
    return { success: true, response };

  } catch (error) {
    console.error('❌ Erro ao enviar confirmação:', error);
    return { success: false, error };
  }
};

/**
 * 🚀 Função principal que envia ambos os emails
 */
export const handleFeedbackSubmission = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const timestamp = new Date().toLocaleString('pt-BR');

  const feedbackData: FeedbackEmailData = {
    ...formData,
    timestamp,
  };

  try {
    // Enviar notificação para você
    const notificationResult = await sendFeedbackNotification(feedbackData);

    // Enviar confirmação para o usuário (opcional)
    const confirmationResult = await sendFeedbackConfirmation(feedbackData);

    return {
      success: true,
      notification: notificationResult,
      confirmation: confirmationResult,
    };

  } catch (error) {
    console.error('❌ Erro geral no envio de emails:', error);
    return {
      success: false,
      error,
    };
  }
};
