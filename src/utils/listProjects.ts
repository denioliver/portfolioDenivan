// Script para ajudar a descobrir os projetos do Firebase
// Execute este código no console do navegador para ver os títulos dos projetos

import { getProjects } from '../services/firestore';

export const listProjectTitles = async () => {
  try {
    console.log('🔍 Buscando projetos do Firebase...');
    const projects = await getProjects();

    console.log('📊 Projetos encontrados:');
    projects.forEach((project, index) => {
      console.log(`${index + 1}. "${project.title}" - ${project.description?.substring(0, 50)}...`);
    });

    console.log('\n📝 Para adicionar traduções, copie estes títulos exatos:');
    projects.forEach((project) => {
      console.log(`"${project.title}": {`);
      console.log(`  title: { pt: "${project.title}", en: "", es: "" },`);
      console.log(`  description: { pt: "${project.description}", en: "", es: "" }`);
      console.log(`},`);
    });

    return projects;
  } catch (error) {
    console.error('❌ Erro ao buscar projetos:', error);
  }
};

// Para usar, execute no console:
// listProjectTitles();
