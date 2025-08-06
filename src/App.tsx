import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { SplashScreen } from './components/SplashScreen';
import { HeaderSimple } from './components/HeaderSimple';
import { HomeSimple } from './components/HomeSimple';
import { AboutSimple } from './components/AboutSimple';
import { ProjectsSimple } from './components/ProjectsSimple';
import { ContactSimple } from './components/ContactSimple';
import { ThemeToggle } from './components/ThemeToggle';
import { Login } from './pages/Login';
import { Dashboard } from './pages/DashboardSimple';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import { ThemeContextProvider, useTheme } from './contexts/ThemeContext';
import { setupFirestoreCollections } from './scripts/setupFirestore';
import { I18nWrapper } from './components/I18nWrapper';
import './i18n/i18n'; // Importar configuração do i18n

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true); // Reativar splash screen
  const { isDark, toggleTheme } = useTheme();

  // Selecionar tema baseado no estado
  const currentTheme = isDark ? darkTheme : lightTheme;

  // 🎯 Controla se deve exibir splash screen (apenas na primeira visita da sessão)
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }

    // 🔧 Disponibilizar função de setup do Firestore globalmente
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).setupFirestore = setupFirestoreCollections;
    console.log('🔧 Para configurar as coleções do Firebase, execute no console: setupFirestore()');
  }, []);

  // 🎬 Handler para quando splash screen termina
  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  // 🏠 Componente da página principal
  const HomePage = () => (
    <>
      <HeaderSimple />
      <main>
        <section id="home">
          <HomeSimple />
        </section>
        <section id="about">
          <AboutSimple />
        </section>
        <section id="projects">
          <ProjectsSimple />
        </section>
        <section id="contact">
          <ContactSimple />
        </section>
      </main>
      <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
    </>
  );

  return (
    <I18nWrapper>
      <Router>
        <AuthProvider>
          <ThemeProvider theme={currentTheme}>
            <GlobalStyles theme={currentTheme} />

            {/* 🌟 Splash Screen - só aparece na primeira visita */}
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

            {/* 🔀 Sistema de Rotas */}
            {!showSplash && (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            )}
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </I18nWrapper>
  );
}

export default App;
