import { createGlobalStyle } from 'styled-components';
import type { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Compensação para o header fixo */
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    font-weight: 400;
    letter-spacing: -0.01em;
    transition: background-color ${({ theme }) => theme.transitions.medium}, 
                color ${({ theme }) => theme.transitions.medium};
  }

  /* 🌓 Classes para transições de tema */
  body.theme-dark {
    --bg-primary: #0a0a0f;
    --bg-secondary: #111118;
    --bg-tertiary: #0f0f1a;
    --text-primary: #e2e8f0;
    --text-secondary: #a0aec0;
    --accent-primary: #8b7cf8;
    --accent-secondary: #1dd1a1;
  }

  body.theme-light {
    --bg-primary: #ffffff;
    --bg-secondary: #f7fafc;
    --bg-tertiary: #edf2f7;
    --text-primary: #2d3748;
    --text-secondary: #4a5568;
    --accent-primary: #8b7cf8;
    --accent-secondary: #1dd1a1;
  }

  /* 🎨 Transições suaves para todos os elementos */
  *, *::before, *::after {
    transition: var(--theme-transition, all 0.3s ease);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  h1 {
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  h2 {
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  code, pre {
    font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
    font-weight: 400;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  input, textarea {
    font-family: inherit;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: ${({ theme }) => theme.spacing.sm};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    transition: border-color ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 ${({ theme }) => theme.spacing.sm};
    }
  }
`;
