// Mapeamento de traduções para projetos do Firebase
// Baseado no título do projeto como chave única

export interface ProjectTranslations {
  [projectTitleKey: string]: {
    title: {
      pt: string;
      en: string;
      es: string;
    };
    description: {
      pt: string;
      en: string;
      es: string;
    };
  };
}

export const projectTranslations: ProjectTranslations = {
  // === PROJETOS DE PORTFÓLIO ===
  "Portfolio Denivan": {
    title: {
      pt: "Portfólio Denivan",
      en: "Denivan Portfolio",
      es: "Portafolio Denivan"
    },
    description: {
      pt: "Portfólio pessoal desenvolvido com React, TypeScript, Firebase e Styled Components. Sistema completo com área administrativa.",
      en: "Personal portfolio developed with React, TypeScript, Firebase and Styled Components. Complete system with admin area.",
      es: "Portafolio personal desarrollado con React, TypeScript, Firebase y Styled Components. Sistema completo con área administrativa."
    }
  },

  // === E-COMMERCE ===
  "E-commerce React": {
    title: {
      pt: "E-commerce React",
      en: "React E-commerce",
      es: "E-commerce React"
    },
    description: {
      pt: "Plataforma de e-commerce completa com carrinho, pagamentos via Stripe, dashboard admin e gestão de produtos.",
      en: "Complete e-commerce platform with cart, Stripe payments, admin dashboard and product management.",
      es: "Plataforma de e-commerce completa con carrito, pagos vía Stripe, dashboard admin y gestión de productos."
    }
  },

  // === TASK MANAGER ===
  "Task Manager App": {
    title: {
      pt: "Gerenciador de Tarefas",
      en: "Task Manager App",
      es: "Gestor de Tareas"
    },
    description: {
      pt: "Sistema de gestão de tarefas com drag & drop, colaboração em tempo real e notificações push.",
      en: "Task management system with drag & drop, real-time collaboration and push notifications.",
      es: "Sistema de gestión de tareas con drag & drop, colaboración en tiempo real y notificaciones push."
    }
  },

  // === CLONE SOCIAL ===
  "Instagram Clone": {
    title: {
      pt: "Clone do Instagram",
      en: "Instagram Clone",
      es: "Clon de Instagram"
    },
    description: {
      pt: "Replica do Instagram com upload de fotos, stories, feed em tempo real e sistema de curtidas.",
      en: "Instagram replica with photo upload, stories, real-time feed and like system.",
      es: "Réplica de Instagram con subida de fotos, stories, feed en tiempo real y sistema de likes."
    }
  },

  // === DASHBOARD ===
  "Analytics Dashboard": {
    title: {
      pt: "Dashboard Analytics",
      en: "Analytics Dashboard",
      es: "Dashboard Analytics"
    },
    description: {
      pt: "Dashboard completo de analytics com gráficos interativos, relatórios em PDF e filtros avançados.",
      en: "Complete analytics dashboard with interactive charts, PDF reports and advanced filters.",
      es: "Dashboard completo de analytics con gráficos interactivos, reportes en PDF y filtros avanzados."
    }
  },

  // === API REST ===
  "Blog API REST": {
    title: {
      pt: "API REST Blog",
      en: "Blog REST API",
      es: "API REST Blog"
    },
    description: {
      pt: "API completa para blog com autenticação JWT, CRUD de posts, comentários e sistema de roles.",
      en: "Complete blog API with JWT authentication, posts CRUD, comments and role system.",
      es: "API completa para blog con autenticación JWT, CRUD de posts, comentarios y sistema de roles."
    }
  },

  // === CHAT APP ===
  "Chat em Tempo Real": {
    title: {
      pt: "Chat em Tempo Real",
      en: "Real-time Chat",
      es: "Chat en Tiempo Real"
    },
    description: {
      pt: "Aplicação de chat com WebSocket, salas privadas, emojis e notificações em tempo real.",
      en: "Chat application with WebSocket, private rooms, emojis and real-time notifications.",
      es: "Aplicación de chat con WebSocket, salas privadas, emojis y notificaciones en tiempo real."
    }
  },

  // === DELIVERY APP ===
  "App Delivery": {
    title: {
      pt: "App Delivery",
      en: "Delivery App",
      es: "App Delivery"
    },
    description: {
      pt: "App de delivery completo com geolocalização, pedidos em tempo real e integração com pagamentos.",
      en: "Complete delivery app with geolocation, real-time orders and payment integration.",
      es: "App de delivery completo con geolocalización, pedidos en tiempo real e integración con pagos."
    }
  },

  // === CRYPTO TRACKER ===
  "Crypto Tracker": {
    title: {
      pt: "Monitor de Criptomoedas",
      en: "Crypto Tracker",
      es: "Monitor de Criptomonedas"
    },
    description: {
      pt: "Aplicação para monitorar preços de criptomoedas com gráficos, alertas e portfolio pessoal.",
      en: "Application to monitor cryptocurrency prices with charts, alerts and personal portfolio.",
      es: "Aplicación para monitorear precios de criptomonedas con gráficos, alertas y portfolio personal."
    }
  },

  // === WEATHER APP ===
  "Weather App": {
    title: {
      pt: "App do Tempo",
      en: "Weather App",
      es: "App del Clima"
    },
    description: {
      pt: "App de previsão do tempo com geolocalização, mapas interativos e alertas meteorológicos.",
      en: "Weather forecast app with geolocation, interactive maps and weather alerts.",
      es: "App de pronóstico del tiempo con geolocalización, mapas interactivos y alertas meteorológicas."
    }
  }
};

export const getProjectTranslation = (
  originalTitle: string,
  field: 'title' | 'description',
  language: string
): string => {
  const translation = projectTranslations[originalTitle];

  if (!translation) {
    // Se não tiver tradução, retorna o original com um indicador em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Tradução não encontrada para projeto: "${originalTitle}"`);
    }
    return field === 'title' ? originalTitle : '';
  }

  const translatedText = translation[field][language as keyof typeof translation.title];

  // Se não tiver a tradução específica, usa português como fallback
  return translatedText || translation[field].pt || (field === 'title' ? originalTitle : '');
};
