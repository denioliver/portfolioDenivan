// 🌍 Sistema de tradução automática baseado em código dos projetos

export interface ProjectTranslation {
  name: string;
  description: string;
}

export interface ProjectTranslations {
  pt: ProjectTranslation;
  en: ProjectTranslation;
  es: ProjectTranslation;
}

// 📋 Mapeamento de códigos de projetos para traduções
export const projectTranslationsMap: Record<string, ProjectTranslations> = {
  // === CALCULADORA ===
  calc: {
    pt: {
      name: "Calculadora",
      description: "Calculadora funcional com operações básicas, desenvolvida com componentes reutilizáveis e gerenciamento de estado via React. Interface limpa, responsiva e lógica matemática 100% funcional."
    },
    en: {
      name: "Calculator",
      description: "Functional calculator with basic operations, developed with reusable components and state management via React. Clean, responsive interface with 100% functional mathematical logic."
    },
    es: {
      name: "Calculadora",
      description: "Calculadora funcional con operaciones básicas, desarrollada con componentes reutilizables y gestión de estado vía React. Interfaz limpia, responsiva y lógica matemática 100% funcional."
    }
  },

  // === SISTEMA DE AGENDAMENTO PARA TATUAGEM ===
  agendaTattoo: {
    pt: {
      name: "Sistema de Agendamento para Estúdio de Tatuagem",
      description: "Aplicação web desenvolvida para facilitar o agendamento de sessões de tatuagem, tanto para clientes quanto para tatuadores. A plataforma permite aos clientes escolherem horários disponíveis, visualizar portfólios dos tatuadores e enviar detalhes da tatuagem desejada."
    },
    en: {
      name: "Tattoo Studio Scheduling System",
      description: "Web application developed to facilitate tattoo session scheduling for both clients and tattoo artists. The platform allows clients to choose available times, view artist portfolios and send details of the desired tattoo."
    },
    es: {
      name: "Sistema de Reservas para Estudio de Tatuajes",
      description: "Aplicación web desarrollada para facilitar la programación de sesiones de tatuajes tanto para clientes como para tatuadores. La plataforma permite a los clientes elegir horarios disponibles, ver portafolios de tatuadores y enviar detalles del tatuaje deseado."
    }
  },

  // === PORTFÓLIO ANTIGO ===
  portfolioOld: {
    pt: {
      name: "Portfólio Antigo",
      description: "Portfólio criado quando estava iniciando meus estudos em ReactJs"
    },
    en: {
      name: "Old Portfolio",
      description: "Portfolio created when I was starting my studies in ReactJs"
    },
    es: {
      name: "Portafolio Antiguo",
      description: "Portafolio creado cuando estaba iniciando mis estudios en ReactJs"
    }
  },

  // === CATÁLOGO NICK FESTAS ===
  nickFestas: {
    pt: {
      name: "Catálogo Nick Festas – Catálogo de Produtos",
      description: "Site institucional com listagem dinâmica de produtos. Layout leve, responsivo e fácil de atualizar. Demonstra uso de props, mapeamento de arrays e estilização modular em React."
    },
    en: {
      name: "Nick Parties Catalog – Product Catalog",
      description: "Institutional website with dynamic product listing. Light, responsive layout that's easy to update. Demonstrates use of props, array mapping and modular styling in React."
    },
    es: {
      name: "Catálogo Nick Fiestas – Catálogo de Productos",
      description: "Sitio web institucional con listado dinámico de productos. Diseño ligero, responsivo y fácil de actualizar. Demuestra el uso de props, mapeo de arrays y estilización modular en React."
    }
  },

  // === DESAFIO PSEL FRONT - API IBGE ===
  pselIbge: {
    pt: {
      name: "Desafio Psel Front – Consumo da API do IBGE",
      description: "Aplicação criada como desafio técnico de processo seletivo. Consome dados da API do IBGE, exibindo estados e cidades dinamicamente. Estrutura baseada em hooks, tipagem com TypeScript e boas práticas de manipulação de dados assíncronos."
    },
    en: {
      name: "Frontend Challenge – IBGE API Consumption",
      description: "Application created as a technical challenge for a selection process. Consumes data from the IBGE API, dynamically displaying states and cities. Structure based on hooks, TypeScript typing and best practices for asynchronous data handling."
    },
    es: {
      name: "Desafío Frontend – Consumo de API del IBGE",
      description: "Aplicación creada como desafío técnico de proceso selectivo. Consume datos de la API del IBGE, mostrando estados y ciudades dinámicamente. Estructura basada en hooks, tipado con TypeScript y buenas prácticas de manejo de datos asíncronos."
    }
  },

  // === PROJETO TESTE ===
  teste: {
    pt: {
      name: "Projeto Teste",
      description: "Projeto criado para testar o sistema de tradução automática. Demonstra a funcionalidade de traduzir novos projetos automaticamente com base no código."
    },
    en: {
      name: "Test Project",
      description: "Project created to test the automatic translation system. Demonstrates the functionality of automatically translating new projects based on code."
    },
    es: {
      name: "Proyecto Prueba",
      description: "Proyecto creado para probar el sistema de traducción automática. Demuestra la funcionalidad de traducir automáticamente nuevos proyectos basados en código."
    }
  },

  // === SISTEMA GENÉRICO (FALLBACK) ===
  sistema: {
    pt: {
      name: "Sistema Web",
      description: "Sistema web desenvolvido com tecnologias modernas para solucionar problemas específicos."
    },
    en: {
      name: "Web System",
      description: "Web system developed with modern technologies to solve specific problems."
    },
    es: {
      name: "Sistema Web",
      description: "Sistema web desarrollado con tecnologías modernas para resolver problemas específicos."
    }
  },

  // === APP GENÉRICO (FALLBACK) ===
  app: {
    pt: {
      name: "Aplicação Web",
      description: "Aplicação web moderna desenvolvida com foco na experiência do usuário."
    },
    en: {
      name: "Web Application",
      description: "Modern web application developed with focus on user experience."
    },
    es: {
      name: "Aplicación Web",
      description: "Aplicación web moderna desarrollada con enfoque en la experiencia del usuario."
    }
  },

  // === PROJETO GENÉRICO (FALLBACK) ===
  projeto: {
    pt: {
      name: "Projeto Web",
      description: "Projeto desenvolvido utilizando as melhores práticas de desenvolvimento web."
    },
    en: {
      name: "Web Project",
      description: "Project developed using web development best practices."
    },
    es: {
      name: "Proyecto Web",
      description: "Proyecto desarrollado utilizando las mejores prácticas de desarrollo web."
    }
  }
};

// 🔄 Função para obter tradução baseada no código
export const getProjectTranslation = (
  code: string | undefined,
  originalTitle: string,
  originalDescription: string,
  language: 'pt' | 'en' | 'es' = 'pt'
): { name: string; description: string } => {

  // Se não tem código, tenta fazer tradução automática baseada no título
  if (!code) {
    return autoTranslateProject(originalTitle, originalDescription, language);
  }

  // Verifica se existe tradução para o código
  const translation = projectTranslationsMap[code];
  if (translation) {
    return {
      name: translation[language].name,
      description: translation[language].description
    };
  }

  // Se não encontrou tradução específica, tenta tradução automática
  return autoTranslateProject(originalTitle, originalDescription, language);
};

// 🤖 Sistema de tradução automática (fallback)
const autoTranslateProject = (
  title: string,
  description: string,
  language: 'pt' | 'en' | 'es'
): { name: string; description: string } => {

  if (language === 'pt') {
    return { name: title, description };
  }

  // Traduções automáticas básicas
  const translateText = (text: string, targetLang: 'en' | 'es'): string => {
    let translated = text;

    const translations = targetLang === 'en' ? {
      // PT -> EN
      'Sistema': 'System', 'Aplicação': 'Application', 'App': 'App',
      'Projeto': 'Project', 'Site': 'Website', 'Portal': 'Portal',
      'Dashboard': 'Dashboard', 'Plataforma': 'Platform', 'Loja': 'Store',
      'E-commerce': 'E-commerce', 'Blog': 'Blog', 'API': 'API',
      'Gerenciador': 'Manager', 'Calculadora': 'Calculator',
      'Conversor': 'Converter', 'Editor': 'Editor', 'Catálogo': 'Catalog',
      'Portfólio': 'Portfolio', 'desenvolvido': 'developed', 'criado': 'created',
      'aplicação': 'application', 'sistema': 'system', 'projeto': 'project',
      'funcional': 'functional', 'responsivo': 'responsive', 'moderno': 'modern',
      'completo': 'complete', 'simples': 'simple', 'avançado': 'advanced',
      'dinâmico': 'dynamic', 'interativo': 'interactive', 'com': 'with',
      'para': 'for', 'usando': 'using', 'utilizando': 'using', 'Teste': 'Test'
    } : {
      // PT -> ES
      'Sistema': 'Sistema', 'Aplicação': 'Aplicación', 'App': 'App',
      'Projeto': 'Proyecto', 'Site': 'Sitio', 'Portal': 'Portal',
      'Dashboard': 'Dashboard', 'Plataforma': 'Plataforma', 'Loja': 'Tienda',
      'E-commerce': 'E-commerce', 'Blog': 'Blog', 'API': 'API',
      'Gerenciador': 'Gestor', 'Calculadora': 'Calculadora',
      'Conversor': 'Convertidor', 'Editor': 'Editor', 'Catálogo': 'Catálogo',
      'Portfólio': 'Portafolio', 'desenvolvido': 'desarrollado', 'criado': 'creado',
      'aplicação': 'aplicación', 'sistema': 'sistema', 'projeto': 'proyecto',
      'funcional': 'funcional', 'responsivo': 'responsivo', 'moderno': 'moderno',
      'completo': 'completo', 'simples': 'simple', 'avançado': 'avanzado',
      'dinâmico': 'dinámico', 'interativo': 'interactivo', 'com': 'con',
      'para': 'para', 'usando': 'usando', 'utilizando': 'utilizando', 'Teste': 'Prueba'
    };

    Object.entries(translations).forEach(([pt, target]) => {
      translated = translated.replace(new RegExp(`\\b${pt}\\b`, 'gi'), target);
    });

    return translated;
  };

  return {
    name: translateText(title, language),
    description: translateText(description, language)
  };
};
