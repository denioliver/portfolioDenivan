import styled from 'styled-components';

const FlagContainer = styled.span`
  display: inline-block;
  width: 20px;
  height: 15px;
  margin-right: 8px;
  vertical-align: middle;
  
  svg {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

interface FlagProps {
  countryCode: string;
  size?: number;
}

export const Flag: React.FC<FlagProps> = ({ countryCode, size = 20 }) => {
  const renderFlag = () => {
    switch (countryCode.toLowerCase()) {
      case 'pt':
      case 'br':
        return (
          <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
            {/* Fundo verde */}
            <rect width="28" height="20" fill="#009639" />
            {/* Losango amarelo */}
            <path d="M14 2L25 10L14 18L3 10Z" fill="#FEDF00" />
            {/* Círculo azul */}
            <circle cx="14" cy="10" r="3.8" fill="#002776" />
            {/* Faixa com estrelas (simplificada) */}
            <path d="M10.5 8.5Q14 7.5 17.5 8.5Q17.5 11.5 14 12.5Q10.5 11.5 10.5 8.5Z" fill="#FEDF00" opacity="0.9" />
            {/* Estrelas pequenas */}
            <circle cx="12" cy="9" r="0.3" fill="#FFFFFF" />
            <circle cx="16" cy="9" r="0.3" fill="#FFFFFF" />
            <circle cx="14" cy="11" r="0.3" fill="#FFFFFF" />
          </svg>
        );

      case 'en':
      case 'us':
        return (
          <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
            {/* Fundo vermelho */}
            <rect width="28" height="20" fill="#B22234" />
            {/* Listras brancas */}
            <rect width="28" height="1.54" y="1.54" fill="#FFFFFF" />
            <rect width="28" height="1.54" y="4.62" fill="#FFFFFF" />
            <rect width="28" height="1.54" y="7.69" fill="#FFFFFF" />
            <rect width="28" height="1.54" y="10.77" fill="#FFFFFF" />
            <rect width="28" height="1.54" y="13.85" fill="#FFFFFF" />
            <rect width="28" height="1.54" y="16.92" fill="#FFFFFF" />
            {/* Cantão azul */}
            <rect width="11.2" height="10.77" fill="#3C3B6E" />
            {/* Estrelas simplificadas (grid) */}
            <g fill="#FFFFFF">
              {/* Primeira linha de estrelas */}
              <circle cx="1.4" cy="1" r="0.25" />
              <circle cx="2.8" cy="1" r="0.25" />
              <circle cx="4.2" cy="1" r="0.25" />
              <circle cx="5.6" cy="1" r="0.25" />
              <circle cx="7" cy="1" r="0.25" />
              <circle cx="8.4" cy="1" r="0.25" />
              {/* Segunda linha */}
              <circle cx="2.1" cy="2" r="0.25" />
              <circle cx="3.5" cy="2" r="0.25" />
              <circle cx="4.9" cy="2" r="0.25" />
              <circle cx="6.3" cy="2" r="0.25" />
              <circle cx="7.7" cy="2" r="0.25" />
              {/* Continua padrão... */}
              <circle cx="1.4" cy="3" r="0.25" />
              <circle cx="2.8" cy="3" r="0.25" />
              <circle cx="4.2" cy="3" r="0.25" />
              <circle cx="5.6" cy="3" r="0.25" />
              <circle cx="7" cy="3" r="0.25" />
              <circle cx="8.4" cy="3" r="0.25" />
            </g>
          </svg>
        );

      case 'es':
        return (
          <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
            {/* Listras horizontais */}
            <rect width="28" height="5" fill="#C60B1E" />
            <rect width="28" height="10" y="5" fill="#FFC400" />
            <rect width="28" height="5" y="15" fill="#C60B1E" />
            {/* Escudo simplificado */}
            <g transform="translate(6, 7)">
              <rect width="8" height="6" fill="#FFC400" stroke="#C60B1E" strokeWidth="0.5" rx="1" />
              {/* Castelo simplificado */}
              <rect width="2" height="2" x="1" y="2" fill="#C60B1E" />
              <rect width="2" height="2" x="5" y="2" fill="#C60B1E" />
              <rect width="1" height="1" x="3.5" y="2.5" fill="#C60B1E" />
              {/* Torre central */}
              <rect width="1" height="3" x="3.5" y="1" fill="#C60B1E" />
            </g>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="20" fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
            <text x="14" y="12" textAnchor="middle" fontSize="8" fill="#666">
              {countryCode.toUpperCase()}
            </text>
          </svg>
        );
    }
  };

  return (
    <FlagContainer style={{ width: size, height: size * 0.75 }}>
      {renderFlag()}
    </FlagContainer>
  );
};
