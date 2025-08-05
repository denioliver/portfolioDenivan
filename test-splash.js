// 🧪 Script para testar SplashScreen
// Cole este código no console do navegador em http://localhost:5173

console.log('🧪 Testando SplashScreen...');

// Limpar sessionStorage para forçar SplashScreen a aparecer
sessionStorage.removeItem('hasSeenSplash');
console.log('✅ SessionStorage limpo');

// Recarregar página para ver SplashScreen
setTimeout(() => {
  window.location.reload();
}, 1000);

console.log('🔄 Recarregando página em 1 segundo...');
