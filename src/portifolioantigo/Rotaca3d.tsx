import './Rotacao3d.css';
import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export default function Rotacao3d() {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    const rotate = Math.sin(t / 10000) * 400;
    const y = (3 + Math.sin(t / 1000)) * 35;
    if (ref.current !== null) {
      ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });

  return (
    <div className="container">
      <div className="cube" ref={ref}>
        <div className="lado frente" />
        <div className="lado esquerdo" />
        <div className="lado direito" />
        <div className="lado cima" />
        <div className="lado baixo" />
        <div className="lado tras" />
      </div>
    </div>
  );
}