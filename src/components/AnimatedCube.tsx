import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

/* ====== rotação contínua (normal / turbo) ====== */
const rotate = keyframes`
  from { transform: rotateX(0deg) rotateY(0deg); }
  to   { transform: rotateX(360deg) rotateY(360deg); }
`;

/* ====== Face base (transforms originais: UNIDO como no seu primeiro código) ====== */
const FaceBase = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.85;
  border: 1px solid rgba(255,255,255,0.12);
  backface-visibility: visible;
  transition: transform 350ms cubic-bezier(.22,.9,.3,1), opacity 200ms, width 1.5s ease, height 1.5s ease, box-shadow 1.5s ease;
`;

/* === faces: posições iniciais iguais ao primeiro código (translateZ(60px)) === */
const Frente = styled(FaceBase)`background: #b13f6f; transform: rotateY(0deg) translateZ(60px);`;
const Direito = styled(FaceBase)`background: #349c9c; transform: rotateY(90deg) translateZ(60px);`;
const Tras = styled(FaceBase)`background: #223794; transform: rotateY(180deg) translateZ(60px);`;
const Esquerdo = styled(FaceBase)`background: #289b28; transform: rotateY(-90deg) translateZ(60px);`;
const Cima = styled(FaceBase)`background: #b99123; transform: rotateX(90deg) translateZ(60px);`;
const Baixo = styled(FaceBase)`background: #a72b2b; transform: rotateX(-90deg) translateZ(60px);`;

/* ====== Container / drag wrapper ====== */
const Container = styled.div`
  perspective: 1100px;
  width: 350px;
  height: 350px;
  margin: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const DragWrapper = styled.div`
  touch-action: none; /* essencial para arrastar em touch */
  display: inline-block;
`;

/* ====== Cube: rotação, hover highlight e exploded override ====== */
const Cube = styled.div<{
  turbo: boolean;
  isDragging: boolean;
  exploded: boolean;
}>`
  width: 80px;
  height: 80px;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  animation: ${rotate} ${({ turbo }) => (turbo ? '0.6s' : '12s')} linear infinite;
  transition: transform 1.5s ease;
  cursor: grab;

  ${({ isDragging }) =>
    isDragging &&
    css`
      cursor: grabbing;
    `}

  /* Hover: realce / reafirmar união das faces (não altera a geometria original) */
  ${({ isDragging, exploded }) =>
    !isDragging &&
    !exploded &&
    css`
      &:hover {
        & > * { width: 120px; height: 120px; transition: all 1.5s ease; opacity: 0.98; box-shadow: 0 6px 20px rgba(0,0,0,0.25); }
        transform: scale(1.03);
      }
    `}

  /* Exploded: quando em estado de explosão, as faces se separam dramaticamente */
  ${({ exploded }) =>
    exploded &&
    css`
      & > ${Frente} { 
        transform: rotateY(0deg) translateZ(180px) translateX(80px) translateY(-30px) rotateZ(-15deg); 
        opacity: 0.9; 
      }
      & > ${Esquerdo} { 
        transform: rotateY(-90deg) translateZ(180px) translateX(-120px) translateY(20px) rotateZ(-12deg); 
        opacity: 0.9; 
      }
      & > ${Direito} { 
        transform: rotateY(90deg) translateZ(180px) translateX(120px) translateY(-20px) rotateZ(12deg); 
        opacity: 0.9; 
      }
      & > ${Cima} { 
        transform: rotateX(90deg) translateZ(180px) translateY(-120px) translateX(30px) rotateZ(10deg); 
        opacity: 0.9; 
      }
      & > ${Baixo} { 
        transform: rotateX(-90deg) translateZ(180px) translateY(120px) translateX(-30px) rotateZ(-10deg); 
        opacity: 0.9; 
      }
      & > ${Tras} { 
        transform: rotateY(180deg) translateZ(180px) translateX(-80px) translateY(30px) rotateZ(15deg); 
        opacity: 0.9; 
      }
    `}
`;

/* ===================== componente ===================== */
export const AnimatedCube: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const [exploded, setExploded] = useState(false);

  /* Sincroniza ref + state */
  const applyOffset = (x: number, y: number) => {
    offsetRef.current = { x, y };
    setOffset({ x, y });
  };

  /* Pointer down inicia drag (mouse/touch) */
  const onPointerDown = (e: React.PointerEvent) => {
    if (exploded) return; // não permitir drag durante explosão
    const p = e as React.PointerEvent;
    try {
      (e.target as Element).setPointerCapture(p.pointerId);
    } catch {
      // Ignorar erros de setPointerCapture
    }
    draggingRef.current = true;
    setIsDragging(true);
    startRef.current = { x: p.clientX - offsetRef.current.x, y: p.clientY - offsetRef.current.y };
    velocityRef.current = { x: 0, y: 0 };
  };

  /* pointermove/up em window — robusto para touch/mouse */
  useEffect(() => {
    const onPointerMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return;
      const newX = ev.clientX - startRef.current.x;
      const newY = ev.clientY - startRef.current.y;

      velocityRef.current = {
        x: newX - offsetRef.current.x,
        y: newY - offsetRef.current.y,
      };

      applyOffset(newX, newY);
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setIsDragging(false);

      // retorno elástico (simples spring)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      let vx = velocityRef.current.x;
      let vy = velocityRef.current.y;
      let x = offsetRef.current.x;
      let y = offsetRef.current.y;

      const stiffness = 0.09;
      const damping = 0.82;

      const step = () => {
        const ax = -stiffness * x;
        const ay = -stiffness * y;

        vx = (vx + ax) * damping;
        vy = (vy + ay) * damping;

        x += vx;
        y += vy;

        applyOffset(x, y);

        if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5 && Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5) {
          applyOffset(0, 0);
          velocityRef.current = { x: 0, y: 0 };
          rafRef.current = null;
          return;
        }
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [exploded]);

  /* util delay */
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  /* sequencia double click: turbo -> explode -> reset */
  const handleDoubleClick = async () => {
    if (draggingRef.current || exploded) return;

    setTurbo(true);
    await delay(500); // turbo por 500ms

    setTurbo(false);
    setExploded(true);

    // força retorno rápido à origem durante a sequência
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const quickReturn = () => {
      const steps = 16;
      const startX = offsetRef.current.x;
      const startY = offsetRef.current.y;
      for (let i = 1; i <= steps; i++) {
        setTimeout(() => {
          const t = i / steps;
          const ease = 1 - Math.pow(1 - t, 3); // ease out cubic
          applyOffset(startX * (1 - ease), startY * (1 - ease));
        }, i * 12);
      }
    };
    quickReturn();

    await delay(650); // duração da explosão

    setExploded(false);
    applyOffset(0, 0);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ====== render ====== */
  return (
    <Container>
      <DragWrapper
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
        onPointerDown={onPointerDown}
        onDoubleClick={handleDoubleClick}
      >
        <Cube turbo={turbo} isDragging={isDragging} exploded={exploded}>
          <Frente />
          <Direito />
          <Tras />
          <Esquerdo />
          <Cima />
          <Baixo />
        </Cube>
      </DragWrapper>
    </Container>
  );
};

export default AnimatedCube;
