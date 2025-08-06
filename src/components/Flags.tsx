import React from 'react';

export interface FlagProps {
  width?: number;
  height?: number;
  className?: string;
}

// 🇧🇷 Bandeira do Brasil
export const BrazilFlag: React.FC<FlagProps> = ({ width = 32, height = 24, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 24"
    className={className}
    aria-label="Português"
  >
    <rect width="32" height="24" fill="#009739" />
    <polygon
      points="16,4 28,12 16,20 4,12"
      fill="#FEDF00"
    />
    <circle cx="16" cy="12" r="4" fill="#012169" />
    <path
      d="M12,11 Q16,9 20,11 Q16,13 12,11"
      fill="#FEDF00"
      stroke="#FEDF00"
      strokeWidth="0.5"
    />
  </svg>
);

// 🇺🇸 Bandeira dos Estados Unidos
export const USFlag: React.FC<FlagProps> = ({ width = 32, height = 24, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 24"
    className={className}
    aria-label="English"
  >
    <rect width="32" height="24" fill="#B22234" />
    <rect x="0" y="0" width="13" height="13" fill="#3C3B6E" />
    {/* Listras brancas */}
    {[1, 3, 5, 7, 9, 11].map(i => (
      <rect key={i} x="0" y={i * 2} width="32" height="2" fill="white" />
    ))}
    {/* Estrelas simplificadas */}
    <g fill="white">
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={2 + (i % 3) * 3} cy={2 + Math.floor(i / 3) * 3} r="0.8" />
      ))}
    </g>
  </svg>
);

// 🇪🇸 Bandeira da Espanha
export const SpainFlag: React.FC<FlagProps> = ({ width = 32, height = 24, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 24"
    className={className}
    aria-label="Español"
  >
    <rect width="32" height="24" fill="#C60B1E" />
    <rect x="0" y="6" width="32" height="12" fill="#FFC400" />
    <rect x="0" y="18" width="32" height="6" fill="#C60B1E" />
    {/* Escudo simplificado */}
    <rect x="8" y="8" width="4" height="8" fill="#C60B1E" rx="1" />
    <rect x="9" y="10" width="2" height="4" fill="#FFC400" />
  </svg>
);
