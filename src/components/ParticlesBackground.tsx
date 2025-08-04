import { useCallback } from "react";
import type { Engine } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import styled from 'styled-components';
import { particlesConfig } from '../utils/animations';

// 🌌 Container para as partículas com posicionamento absoluto
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  
  canvas {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;

interface ParticlesBackgroundProps {
  id?: string;
}

/**
 * 🎆 Componente de fundo animado com partículas interativas
 * 
 * Características:
 * - Rede de pontos conectados que reagem ao mouse
 * - Performance otimizada com TSParticles Slim
 * - Cores que combinam com o tema do portfólio
 * - Responsivo e não interfere na navegação
 */
export const ParticlesBackground = ({ id = "tsparticles" }: ParticlesBackgroundProps) => {
  // 🔧 Inicialização do engine de partículas (apenas uma vez)
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log("🎆 Inicializando Particles Engine...");
    await loadSlim(engine);
  }, []);

  // ✅ Callback quando as partículas estão carregadas
  const particlesLoaded = useCallback(async (container: unknown) => {
    console.log("✨ Particles carregadas com sucesso!", container);
  }, []);

  return (
    <ParticlesContainer>
      <Particles
        id={id}
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesConfig}
      />
    </ParticlesContainer>
  );
};
