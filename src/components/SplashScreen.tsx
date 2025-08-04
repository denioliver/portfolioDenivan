import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// 🌊 Animação do gradiente de fundo
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// 🎨 Container principal da splash screen
const SplashContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0f, #1a1a2e, #16213e, #0f3460);
  background-size: 400% 400%;
  animation: ${gradientShift} 6s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
`;

// 💫 Container do conteúdo principal
const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
`;

// ✨ Nome com efeito SVG stroke
const NameTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  font-family: 'Space Grotesk', sans-serif;
  color: #8b7cf8;
  text-shadow: 
    -1px -1px 0 #8b7cf8,
    1px -1px 0 #8b7cf8,
    -1px 1px 0 #8b7cf8,
    1px 1px 0 #8b7cf8,
    0 0 30px rgba(139, 124, 248, 0.6);
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

// 📱 Texto de carregamento
const LoadingText = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2rem;
  letter-spacing: 0.1em;
`;

// 🎯 Container do cubo com animação de explosão
const CubeContainer = styled(motion.div)`
  perspective: 1000px;
  width: 150px;
  height: 150px;
  position: relative;
  margin: 2rem 0;
`;

// 🧊 Cubo com animação especial para splash
const SplashCube = styled(motion.div)`
  width: 100px;
  height: 100px;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  margin: 0 auto;
`;

// 🎨 Face do cubo splash
const SplashFace = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
`;

// Faces específicas com cores vibrantes
const Front = styled(SplashFace)`
  transform: rotateY(0deg) translateZ(50px);
  background: linear-gradient(135deg, #ff006a, #ff4d94);
`;

const Right = styled(SplashFace)`
  transform: rotateY(90deg) translateZ(50px);
  background: linear-gradient(135deg, #00ffff, #4dffff);
`;

const Back = styled(SplashFace)`
  transform: rotateY(180deg) translateZ(50px);
  background: linear-gradient(135deg, #0026ff, #4d6bff);
`;

const Left = styled(SplashFace)`
  transform: rotateY(-90deg) translateZ(50px);
  background: linear-gradient(135deg, #00ff00, #4dff4d);
`;

const Top = styled(SplashFace)`
  transform: rotateX(90deg) translateZ(50px);
  background: linear-gradient(135deg, #ffe600, #ffeb4d);
`;

const Bottom = styled(SplashFace)`
  transform: rotateX(-90deg) translateZ(50px);
  background: linear-gradient(135deg, #ff0000, #ff4d4d);
`;

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [startExplosion, setStartExplosion] = useState(false);

  // ⏱️ Controle de timing da splash screen
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStartExplosion(true);
    }, 5500); // Inicia explosão após 5.5s (era 2.5s)

    const timer2 = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onComplete, 500); // Delay para fade out completo
    }, 6500); // Remove splash após 6.5s (era 3.5s)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showSplash && (
        <SplashContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <ContentContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* 🎯 Nome com animação pulsante */}
            <NameTitle
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: [0.7, 1, 0.7],
                transition: {
                  scale: { duration: 0.8, delay: 0.5 },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }
              }}
            >
              Denivan Oliveira
            </NameTitle>

            {/* 🧊 Cubo com animação de explosão */}
            <CubeContainer>
              <SplashCube
                initial={{ rotateX: 0, rotateY: 0, scale: 1 }}
                animate={startExplosion ?
                  {
                    scale: 0.1,
                    rotateX: 720,
                    rotateY: 720,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  } :
                  {
                    rotateX: 360,
                    rotateY: 360,
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }
                }
              >
                <Front
                  animate={startExplosion ?
                    {
                      x: 150,
                      y: -100,
                      rotateY: 180,
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeOut" }
                    } : {}}
                />
                <Right
                  animate={startExplosion ?
                    {
                      x: 200,
                      y: 0,
                      rotateX: 180,
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeOut" }
                    } : {}}
                />
                <Back
                  animate={startExplosion ?
                    {
                      x: -150,
                      y: 100,
                      rotateY: -180,
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeOut" }
                    } : {}}
                />
                <Left
                  animate={startExplosion ?
                    {
                      x: -200,
                      y: 0,
                      rotateX: -180,
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeOut" }
                    } : {}}
                />
                <Top
                  animate={startExplosion ?
                    {
                      x: 0,
                      y: -200,
                      rotateZ: 180,
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeOut" }
                    } : {}}
                />
                <Bottom
                  animate={startExplosion ?
                    {
                      x: 0,
                      y: 200,
                      rotateZ: -180,
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeOut" }
                    } : {}}
                />
              </SplashCube>
            </CubeContainer>

            {/* 📱 Texto de carregamento */}
            <LoadingText
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Carregando...
            </LoadingText>
          </ContentContainer>
        </SplashContainer>
      )}
    </AnimatePresence>
  );
};
