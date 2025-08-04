export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    shadow: string;
    gradient: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    primary: string;
    heading: string;
    mono: string;
  };
  fontWeights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    section: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  zIndex: {
    modal: number;
    overlay: number;
    dropdown: number;
    header: number;
  };
  transitions: {
    fast: string;
    medium: string;
    slow: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#8b7cf8',
    secondary: '#1dd1a1',
    accent: '#ffd700',
    background: '#ffffff',
    surface: '#f8fafc',
    card: '#ffffff',
    text: '#1a202c',
    textSecondary: '#4a5568',
    textMuted: '#718096',
    border: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    gradient: 'linear-gradient(135deg, #8b7cf8 0%, #1dd1a1 100%)',
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Monaco, Consolas, monospace",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: '5rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '50%',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.1)',
    large: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.08)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  zIndex: {
    modal: 1000,
    overlay: 999,
    dropdown: 100,
    header: 50,
  },
  transitions: {
    fast: '0.15s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#8b7cf8',
    secondary: '#1dd1a1',
    accent: '#ffd700',
    background: '#0f0f23',
    surface: '#1a1a3e',
    card: '#252547',
    text: '#f7fafc',
    textSecondary: '#cbd5e0',
    textMuted: '#a0aec0',
    border: '#2d3748',
    shadow: 'rgba(0, 0, 0, 0.3)',
    gradient: 'linear-gradient(135deg, #8b7cf8 0%, #1dd1a1 100%)',
    success: '#68d391',
    warning: '#f6ad55',
    error: '#fc8181',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Monaco, Consolas, monospace",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: '5rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '50%',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.48)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.14), 0 1px 3px rgba(0, 0, 0, 0.2)',
    large: '0 15px 35px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.16)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  zIndex: {
    modal: 1000,
    overlay: 999,
    dropdown: 100,
    header: 50,
  },
  transitions: {
    fast: '0.15s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};
