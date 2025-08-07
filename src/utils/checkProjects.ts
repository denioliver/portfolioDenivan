import { getProjects } from '../services/firestore';

export const logFirebaseProjects = async () => {
  try {
    console.log('🔥 Verificando projetos do Firebase...');
    const projects = await getProjects();

    console.log('📊 Total de projetos encontrados:', projects.length);

    projects.forEach((project, index) => {
      console.log(`\n📋 Projeto ${index + 1}:`);
      console.log('  - ID:', project.id);
      console.log('  - Título:', `"${project.title}"`);
      console.log('  - Descrição:', `"${project.description?.substring(0, 50)}..."`);
      console.log('  - Tecnologias:', project.technologies);
    });

    return projects;
  } catch (error) {
    console.error('❌ Erro ao buscar projetos:', error);
    return [];
  }
};
