import type { Variants } from 'framer-motion';

// 🎨 Configurações de animações reutilizáveis

// ✨ Scroll Reveal - Fade + Slide
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // easeOutExpo
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 🎭 Stagger Animation para containers
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// 🎪 Card hover effect
export const cardHover: Variants = {
  initial: {
    scale: 1,
    rotateY: 0,
    rotateX: 0
  },
  hover: {
    scale: 1.05,
    rotateY: 5,
    rotateX: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// 🌊 Page transitions
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 🎯 Configurações de TSParticles
export const particlesConfig = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: {
        enable: true
      },
    },
    modes: {
      push: {
        quantity: 2,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: ["#8b7cf8", "#1dd1a1", "#ff6b9d"]
    },
    links: {
      color: "#8b7cf8",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 60,
    },
    opacity: {
      value: 0.7,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.3,
        sync: false
      }
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
      random: true,
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 1,
        sync: false
      }
    },
  },
  detectRetina: true,
};
