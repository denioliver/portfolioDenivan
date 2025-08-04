import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Variants } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../utils/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: boolean;
  threshold?: number;
  once?: boolean;
  className?: string;
}

/**
 * 🎬 Componente wrapper para animações de scroll reveal
 * 
 * Características:
 * - Detecta quando elemento entra na viewport
 * - Múltiplas direções de animação (up, left, right)
 * - Stagger para animar filhos em sequência
 * - Configurável e reutilizável
 * - Performance otimizada
 */
export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  stagger = false,
  threshold = 0.1,
  once = true,
  className
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "0px 0px -10% 0px" // Trigger antes do elemento estar totalmente visível
  });

  // 🎯 Seleciona a variante baseada na direção
  const getVariants = (): Variants => {
    const baseVariants = direction === 'left'
      ? fadeInLeft
      : direction === 'right'
        ? fadeInRight
        : fadeInUp;

    // Aplicar delay e duration customizados
    return {
      hidden: baseVariants.hidden,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    };
  };

  // 🎪 Para stagger, usa container especial
  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    );
  }

  // 🎭 Animação individual
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};
