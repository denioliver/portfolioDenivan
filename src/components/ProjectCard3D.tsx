import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { cardHover } from '../utils/animations';
import { useState } from 'react';

// 🎴 Container do card com perspectiva 3D
const CardContainer = styled(motion.div)`
  perspective: 1000px;
  cursor: pointer;
`;

// 🃏 Card principal com efeito tilt
const TiltCard = styled(motion.div) <{ $hasUrl?: boolean }>`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  position: relative;
  z-index: 1;
  cursor: ${({ $hasUrl }) => $hasUrl ? 'pointer' : 'default'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}30;
    box-shadow: 0 25px 50px ${({ theme }) => theme.colors.primary}20;
    transform: translateY(-10px) scale(1.02);
    z-index: 999;
  }
`;

// 🎨 Overlay da stack que aparece no hover
const StackOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 124, 248, 0.9), rgba(29, 209, 161, 0.9));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 2rem;
  z-index: 2;
`;

const StackTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: white;
`;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const StackItem = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectImage = styled.div<{ $hasImage?: boolean }>`
  height: 200px;
  background: ${({ $hasImage }) =>
    $hasImage
      ? 'transparent'
      : 'linear-gradient(135deg, rgba(139, 124, 248, 0.2), rgba(29, 209, 161, 0.2))'
  };
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
`;

const ProjectImageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ProjectImageIcon = styled.div`
  position: relative;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const ClickIndicator = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 3;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

interface ProjectCardProps {
  title: string;
  description: string;
  icon: string;
  stack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

/**
 * 🎯 Card de projeto com efeito 3D tilt e overlay de stack
 * 
 * Características:
 * - Efeito tilt 3D realista no hover
 * - Overlay com stack tecnológica ao passar o mouse
 * - Animações suaves com Framer Motion
 * - Design glassmorphism moderno
 */
export const ProjectCard3D = ({ title, description, icon, stack, imageUrl, liveUrl, githubUrl }: ProjectCardProps) => {
  const { t, i18n } = useTranslation();
  const [showStack, setShowStack] = useState(false);

  // 🚨 DEBUG: Log crítico para debugar
  console.warn(`🔍 ProjectCard3D renderizado: "${title}" | Idioma: ${i18n.language}`);

  // 🌍 Sistema de tradução dos projetos
  const getTranslatedProject = (originalTitle: string, originalDescription: string) => {
    console.log('🔍 Iniciando tradução para:', { originalTitle, currentLang: i18n.language });

    const translations: Record<string, {
      title: { pt: string; en: string; es: string };
      description: { pt: string; en: string; es: string };
    }> = {
      // === PROJETOS IDENTIFICADOS NO HTML ===
      "Sistema de Agendamento para Estúdio de Tatuagem": {
        title: {
          pt: "Sistema de Agendamento para Estúdio de Tatuagem",
          en: "Tattoo Studio Scheduling System",
          es: "Sistema de Reservas para Estudio de Tatuajes"
        },
        description: {
          pt: "Aplicação web desenvolvida para facilitar o agendamento de sessões de tatuagem, tanto para clientes quanto para tatuadores. A plataforma permite aos clientes escolherem horários disponíveis, visualizar portfólios dos tatuadores e enviar detalhes da tatuagem desejada. Para os administradores, oferece um painel com controle de agendamentos, notificações e gestão de usuários.",
          en: "Web application developed to facilitate tattoo session scheduling for both clients and tattoo artists. The platform allows clients to choose available times, view artist portfolios and send details of the desired tattoo. For administrators, it offers a panel with appointment control, notifications and user management.",
          es: "Aplicación web desarrollada para facilitar la programación de sesiones de tatuajes tanto para clientes como para tatuadores. La plataforma permite a los clientes elegir horarios disponibles, ver portafolios de tatuadores y enviar detalles del tatuaje deseado. Para administradores, ofrece un panel con control de citas, notificaciones y gestión de usuarios."
        }
      },
      "Portfolio Antigo": {
        title: {
          pt: "Portfólio Antigo",
          en: "Old Portfolio",
          es: "Portafolio Antiguo"
        },
        description: {
          pt: "Portfólio criado quando estava iniciando meus estudos em ReactJs",
          en: "Portfolio created when I was starting my studies in ReactJs",
          es: "Portafolio creado cuando estaba iniciando mis estudios en ReactJs"
        }
      },
      "Catálogo Nick Festas – Catálogo de Produtos": {
        title: {
          pt: "Catálogo Nick Festas – Catálogo de Produtos",
          en: "Nick Parties Catalog – Product Catalog",
          es: "Catálogo Nick Fiestas – Catálogo de Productos"
        },
        description: {
          pt: "Site institucional com listagem dinâmica de produtos. Layout leve, responsivo e fácil de atualizar. Demonstra uso de props, mapeamento de arrays e estilização modular em React.",
          en: "Institutional website with dynamic product listing. Light, responsive layout that's easy to update. Demonstrates use of props, array mapping and modular styling in React.",
          es: "Sitio web institucional con listado dinámico de productos. Diseño ligero, responsivo y fácil de actualizar. Demuestra el uso de props, mapeo de arrays y estilización modular en React."
        }
      },
      "Desafio Psel Front – Consumo da API do IBGE": {
        title: {
          pt: "Desafio Psel Front – Consumo da API do IBGE",
          en: "Frontend Challenge – IBGE API Consumption",
          es: "Desafío Frontend – Consumo de API del IBGE"
        },
        description: {
          pt: "Aplicação criada como desafio técnico de processo seletivo. Consome dados da API do IBGE, exibindo estados e cidades dinamicamente. Estrutura baseada em hooks, tipagem com TypeScript e boas práticas de manipulação de dados assíncronos.",
          en: "Application created as a technical challenge for a selection process. Consumes data from the IBGE API, dynamically displaying states and cities. Structure based on hooks, TypeScript typing and best practices for asynchronous data handling.",
          es: "Aplicación creada como desafío técnico de proceso selectivo. Consume datos de la API del IBGE, mostrando estados y ciudades dinámicamente. Estructura basada en hooks, tipado con TypeScript y buenas prácticas de manejo de datos asíncronos."
        }
      },
      "Calculadora": {
        title: {
          pt: "Calculadora",
          en: "Calculator",
          es: "Calculadora"
        },
        description: {
          pt: "Calculadora funcional com operações básicas, desenvolvida com componentes reutilizáveis e gerenciamento de estado via React. Interface limpa, responsiva e lógica matemática 100% funcional.",
          en: "Functional calculator with basic operations, developed with reusable components and state management via React. Clean, responsive interface with 100% functional mathematical logic.",
          es: "Calculadora funcional con operaciones básicas, desarrollada con componentes reutilizables y gestión de estado vía React. Interfaz limpia, responsiva y lógica matemática 100% funcional."
        }
      },
      // === PROJETOS ADICIONAIS COMUNS ===
      "Portfolio Denivan": {
        title: { pt: "Portfólio Denivan", en: "Denivan Portfolio", es: "Portafolio Denivan" },
        description: {
          pt: "Portfólio pessoal desenvolvido com React, TypeScript, Firebase e Styled Components. Sistema completo com área administrativa.",
          en: "Personal portfolio developed with React, TypeScript, Firebase and Styled Components. Complete system with admin area.",
          es: "Portafolio personal desarrollado con React, TypeScript, Firebase y Styled Components. Sistema completo con área administrativa."
        }
      }
    };

    const projectTranslation = translations[originalTitle];
    console.log('🔍 Buscando tradução específica para:', originalTitle);
    console.log('🔍 Encontrado:', !!projectTranslation);

    if (projectTranslation) {
      const lang = i18n.language as 'pt' | 'en' | 'es';
      console.log('✅ Usando tradução específica para idioma:', lang);
      return {
        title: projectTranslation.title[lang] || projectTranslation.title.pt,
        description: projectTranslation.description[lang] || projectTranslation.description.pt
      };
    }

    // 🤖 Sistema de tradução automática para projetos novos
    const currentLang = i18n.language as 'pt' | 'en' | 'es';
    console.log('🤖 Projeto não encontrado nas traduções manuais. Aplicando tradução automática...');

    // Se estiver em português, retorna o original
    if (currentLang === 'pt') {
      console.log('✅ Idioma é PT, retornando original');
      return { title: originalTitle, description: originalDescription };
    }

    // Traduções automáticas básicas
    const autoTranslateText = (text: string, targetLang: 'en' | 'es'): string => {
      let translated = text;
      console.log(`🔄 Traduzindo "${text}" para ${targetLang}`);

      if (targetLang === 'en') {
        // Mapeamentos PT -> EN (mais completo)
        const translations: Record<string, string> = {
          // Palavras principais
          'Sistema': 'System', 'Aplicação': 'Application', 'App': 'App',
          'Projeto': 'Project', 'Site': 'Website', 'Portal': 'Portal',
          'Dashboard': 'Dashboard', 'Plataforma': 'Platform', 'Loja': 'Store',
          'E-commerce': 'E-commerce', 'Blog': 'Blog', 'API': 'API',
          'Gerenciador': 'Manager', 'Calculadora': 'Calculator',
          'Conversor': 'Converter', 'Editor': 'Editor', 'Catálogo': 'Catalog',
          'Portfólio': 'Portfolio', 'Teste': 'Test', 'Exemplo': 'Example',
          'Demo': 'Demo', 'Protótipo': 'Prototype', 'Novo': 'New',
          'Página': 'Page', 'Interface': 'Interface', 'Layout': 'Layout',
          // Verbos e adjetivos
          'desenvolvido': 'developed', 'criado': 'created', 'feito': 'made',
          'construído': 'built', 'implementado': 'implemented',
          'testando': 'testing', 'traduzindo': 'translating', 'verificando': 'checking',
          'aplicação': 'application', 'sistema': 'system', 'projeto': 'project',
          'funcional': 'functional', 'responsivo': 'responsive', 'moderno': 'modern',
          'completo': 'complete', 'simples': 'simple', 'avançado': 'advanced',
          'dinâmico': 'dynamic', 'interativo': 'interactive', 'básico': 'basic',
          'novo': 'new', 'teste': 'test', 'exemplo': 'example',
          'traduções': 'translations', 'tradução': 'translation', 'projetos': 'projects',
          'dos': 'of the', 'das': 'of the', 'do': 'of the', 'da': 'of the',
          'as': 'the', 'os': 'the', 'um': 'a', 'uma': 'a',
          // Preposições e conectores
          'com': 'with', 'para': 'for', 'de': 'of', 'em': 'in',
          'usando': 'using', 'utilizando': 'using', 'através': 'through',
          'sobre': 'about', 'entre': 'between', 'dentro': 'inside'
        };

        Object.entries(translations).forEach(([pt, en]) => {
          // Usa regex para buscar palavras inteiras
          const regex = new RegExp(`\\b${pt}\\b`, 'gi');
          translated = translated.replace(regex, en);
        });
      }

      if (targetLang === 'es') {
        // Mapeamentos PT -> ES (mais completo)
        const translations: Record<string, string> = {
          // Palavras principais
          'Sistema': 'Sistema', 'Aplicação': 'Aplicación', 'App': 'App',
          'Projeto': 'Proyecto', 'Site': 'Sitio', 'Portal': 'Portal',
          'Dashboard': 'Dashboard', 'Plataforma': 'Plataforma', 'Loja': 'Tienda',
          'E-commerce': 'E-commerce', 'Blog': 'Blog', 'API': 'API',
          'Gerenciador': 'Gestor', 'Calculadora': 'Calculadora',
          'Conversor': 'Convertidor', 'Editor': 'Editor', 'Catálogo': 'Catálogo',
          'Portfólio': 'Portafolio', 'Teste': 'Prueba', 'Exemplo': 'Ejemplo',
          'Demo': 'Demo', 'Protótipo': 'Prototipo', 'Novo': 'Nuevo',
          'Página': 'Página', 'Interface': 'Interfaz', 'Layout': 'Diseño',
          // Verbos e adjetivos
          'desenvolvido': 'desarrollado', 'criado': 'creado', 'feito': 'hecho',
          'construído': 'construido', 'implementado': 'implementado',
          'testando': 'probando', 'traduzindo': 'traduciendo', 'verificando': 'verificando',
          'aplicação': 'aplicación', 'sistema': 'sistema', 'projeto': 'proyecto',
          'funcional': 'funcional', 'responsivo': 'responsivo', 'moderno': 'moderno',
          'completo': 'completo', 'simples': 'simple', 'avançado': 'avanzado',
          'dinâmico': 'dinámico', 'interativo': 'interactivo', 'básico': 'básico',
          'novo': 'nuevo', 'teste': 'prueba', 'exemplo': 'ejemplo',
          'traduções': 'traducciones', 'tradução': 'traducción', 'projetos': 'proyectos',
          'dos': 'de los', 'das': 'de las', 'do': 'del', 'da': 'de la',
          'as': 'las', 'os': 'los', 'um': 'un', 'uma': 'una',
          // Preposições e conectores
          'com': 'con', 'para': 'para', 'de': 'de', 'em': 'en',
          'usando': 'usando', 'utilizando': 'utilizando', 'através': 'através',
          'sobre': 'sobre', 'entre': 'entre', 'dentro': 'dentro'
        };

        Object.entries(translations).forEach(([pt, es]) => {
          // Usa regex para buscar palavras inteiras
          const regex = new RegExp(`\\b${pt}\\b`, 'gi');
          translated = translated.replace(regex, es);
        });
      }

      console.log(`✅ Resultado da tradução: "${translated}"`);
      return translated;
    };

    console.log(`🔄 Auto-traduzindo projeto "${originalTitle}" para ${currentLang}`);

    const result = {
      title: autoTranslateText(originalTitle, currentLang),
      description: autoTranslateText(originalDescription, currentLang)
    };

    console.log('🎯 Resultado final da tradução automática:', result);
    return result;
  };

  const { title: translatedTitle, description: translatedDescription } = getTranslatedProject(title, description);

  // 🧪 Indicador discreto para projetos com tradução automática (opcional)
  const knownProjects = [
    "Sistema de Agendamento para Estúdio de Tatuagem",
    "Portfolio Antigo",
    "Catálogo Nick Festas – Catálogo de Produtos",
    "Desafio Psel Front – Consumo da API do IBGE",
    "Calculadora",
    "Portfolio Denivan"
  ];

  const isNewProject = !knownProjects.includes(title);
  const testIndicator = isNewProject && i18n.language !== 'pt' ? '' : ''; // Remover [AUTO-XX] quando não precisar mais

  const finalTitle = translatedTitle + testIndicator;
  const finalDescription = translatedDescription;  // 🔗 Verifica se tem alguma URL disponível
  const hasUrl = !!(liveUrl || githubUrl);

  // 🔗 Função para lidar com o clique no card
  const handleCardClick = () => {
    // Prioriza liveUrl, depois githubUrl
    const targetUrl = liveUrl || githubUrl;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 🎭 Função para calcular rotação baseada na posição do mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <CardContainer
      initial="initial"
      whileHover="hover"
      variants={cardHover}
    >
      <TiltCard
        $hasUrl={hasUrl}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowStack(true)}
        onMouseLeave={(e) => {
          setShowStack(false);
          handleMouseLeave(e);
        }}
        onClick={hasUrl ? handleCardClick : undefined}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 🎨 Overlay da stack - aparece no hover */}
        {showStack && (
          <StackOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StackTitle>Stack Tecnológica</StackTitle>
            <StackList>
              {stack.map((tech, index) => (
                <StackItem key={index}>{tech}</StackItem>
              ))}
            </StackList>
          </StackOverlay>
        )}

        {/* 📸 Conteúdo principal do card */}
        <ProjectImage $hasImage={!!imageUrl}>
          {imageUrl && <ProjectImageImg src={imageUrl} alt={finalTitle} />}
          {/* Só mostra o ícone se não tiver imagem */}
          {!imageUrl && <ProjectImageIcon>{icon}</ProjectImageIcon>}
          {/* Indicador de clique quando tem URL */}
          <ClickIndicator $visible={hasUrl}>
            {liveUrl ? `🔗 ${t('projects.cta.demo')}` : `📁 ${t('projects.cta.code')}`}
          </ClickIndicator>
        </ProjectImage>
        <ProjectContent>
          <ProjectTitle>{finalTitle}</ProjectTitle>
          <ProjectDescription>{finalDescription}</ProjectDescription>
        </ProjectContent>
      </TiltCard>
    </CardContainer>
  );
};
