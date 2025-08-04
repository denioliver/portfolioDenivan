import styled, { keyframes } from 'styled-components';
import { useRef, useEffect } from 'react';

// Animação CSS mais suave e similar ao original
const rotate3d = keyframes`
  0% {
    transform: translateY(0px) rotateX(0deg) rotateY(0deg);
  }
  25% {
    transform: translateY(20px) rotateX(100deg) rotateY(100deg);
  }
  50% {
    transform: translateY(35px) rotateX(200deg) rotateY(200deg);
  }
  75% {
    transform: translateY(20px) rotateX(300deg) rotateY(300deg);
  }
  100% {
    transform: translateY(0px) rotateX(400deg) rotateY(400deg);
  }
`;

// Container do cubo
const Container = styled.div`
  perspective: 1000px;
  width: 350px;
  height: 350px;
  margin: auto;
  padding: 10px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 400px) {
    margin-top: -105px;
    margin-bottom: 60px;
    width: 280px;
    height: 280px;
  }
  
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

// Cubo 3D
const Cube = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  animation: ${rotate3d} 12s infinite linear;
  transition: all 2.3s ease;

  &:hover {
    width: 120px;
    height: 120px;
    transition: all 1.5s ease;
  }
`;

// Face do cubo (lado)
const Lado = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  transition: all 0.35s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backface-visibility: visible;

  &:hover {
    opacity: 1;
    box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.8);
    transition: all 0.35s ease;
  }
`;

// Faces específicas do cubo com cores originais e posições corretas
const Frente = styled(Lado)`
  transform: rotateY(0deg) translateZ(60px);
  background-color: #b13f6f;

  &:hover {
    background-color: #ff006a;
  }
`;

const Direito = styled(Lado)`
  transform: rotateY(90deg) translateZ(60px);
  background-color: #349c9c;

  &:hover {
    background-color: #00ffff;
  }
`;

const Tras = styled(Lado)`
  transform: rotateY(180deg) translateZ(60px);
  background-color: #223794;

  &:hover {
    background-color: #0026ff;
  }
`;

const Esquerdo = styled(Lado)`
  transform: rotateY(-90deg) translateZ(60px);
  background-color: #289b28;

  &:hover {
    background-color: #00ff00;
  }
`;

const Cima = styled(Lado)`
  transform: rotateX(90deg) translateZ(60px);
  background-color: #b99123;

  &:hover {
    background-color: #ffe600;
  }
`;

const Baixo = styled(Lado)`
  transform: rotateX(-90deg) translateZ(60px);
  background-color: #a72b2b;

  &:hover {
    background-color: #ff0000;
  }
`;

export const AnimatedCube = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('AnimatedCube mounted and working with CSS animation');
  }, []);

  return (
    <Container>
      <Cube ref={ref}>
        <Frente />
        <Esquerdo />
        <Direito />
        <Cima />
        <Baixo />
        <Tras />
      </Cube>
    </Container>
  );
};