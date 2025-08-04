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

function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(false); // Desabilitar splash temporariamente
  const { isDark, toggleTheme } = useTheme();

  // Selecionar tema baseado no estado
  const currentTheme = isDark ? darkTheme : lightTheme;

  // 🎯 Controla se deve exibir splash screen (apenas na primeira visita da sessão)
  useEffect(() => {
    // Temporariamente desabilitado para debug
    // const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    // if (hasSeenSplash) {
    //   setShowSplash(false);
    // }
    setShowSplash(false);

    // 🔧 Disponibilizar função de setup do Firestore globalmente
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
  );
}

export default App;
