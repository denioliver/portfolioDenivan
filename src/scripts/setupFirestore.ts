import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase';

// Script para criar as coleções iniciais no Firestore
export const setupFirestoreCollections = async () => {
  try {
    console.log('🔄 Configurando coleções do Firestore...');

    // 1. Criar coleção de projetos com um projeto de exemplo
    const projectExample = {
      title: "Portfólio Denivan",
      description: "Portfólio pessoal desenvolvido com React, TypeScript e Firebase. Sistema completo de autenticação, gerenciamento de projetos e feedbacks.",
      image: "https://via.placeholder.com/600x400/8b7cf8/ffffff?text=Portfolio+Denivan",
      type: "web" as const,
      technologies: ["React", "TypeScript", "Firebase", "Styled Components", "Framer Motion"],
      liveUrl: "https://portfolio-denivan.web.app",
      githubUrl: "https://github.com/denioliver/portfolio",
      createdAt: new Date()
    };

    const projectRef = await addDoc(collection(db, 'projects'), projectExample);
    console.log('✅ Projeto exemplo criado com ID:', projectRef.id);

    // 2. Criar coleção de feedbacks com um feedback de exemplo
    const feedbackExample = {
      name: "João Silva",
      email: "joao.silva@exemplo.com",
      subject: "Excelente portfólio!",
      message: "Parabéns pelo seu portfólio! O design está muito moderno e as animações ficaram incríveis. A funcionalidade de dark/light mode está perfeita. Continue assim!",
      createdAt: new Date(),
      timestamp: Date.now()
    };

    const feedbackRef = await addDoc(collection(db, 'feedbacks'), feedbackExample);
    console.log('✅ Feedback exemplo criado com ID:', feedbackRef.id);

    console.log('🎉 Configuração do Firestore concluída com sucesso!');
    console.log('📊 Coleções criadas:');
    console.log('   - projects (projetos)');
    console.log('   - feedbacks (feedbacks)');

  } catch (error) {
    console.error('❌ Erro ao configurar Firestore:', error);
  }
};

// Executar setup se o arquivo for chamado diretamente
if (typeof window !== 'undefined') {
  // Adicionar ao objeto window para ser chamado pelo console do navegador
  (window as any).setupFirestore = setupFirestoreCollections;
  console.log('🔧 Para configurar o Firestore, execute: setupFirestore()');
}
