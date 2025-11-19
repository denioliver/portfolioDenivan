import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// Configuração do Firebase (preenchida via Vite - import.meta.env)
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Verifica se temos uma API key plausível antes de inicializar
const hasValidApiKey = typeof firebaseConfig.apiKey === 'string' && firebaseConfig.apiKey.trim() !== '' && !firebaseConfig.apiKey.includes('your_');

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (hasValidApiKey) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('✅ Firebase inicializado com sucesso');
  } catch (err) {
    // Em caso de erro na inicialização, mostramos no console e não deixamos a aplicação travar
    console.error('Erro ao inicializar o Firebase:', err);
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
} else {
  console.warn('⚠️ Firebase não inicializado: chave de API ausente ou inválida. Recursos (auth/firestore/storage) desativados.');
}

export { auth, db, storage };
export default app;
