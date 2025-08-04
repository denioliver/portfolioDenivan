import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../services/firebase';
import { signIn, getCurrentUser } from '../services/auth';
import { onAuthStateChanged, type User } from 'firebase/auth';

const DebugContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.8rem;
  color: #e2e8f0;
`;

const DebugTitle = styled.h3`
  color: #8b7cf8;
  margin: 0 0 1rem 0;
  font-size: 1rem;
`;

const DebugButton = styled.button`
  background: rgba(139, 124, 248, 0.2);
  border: 1px solid rgba(139, 124, 248, 0.5);
  color: #8b7cf8;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin: 0.5rem 0.5rem 0.5rem 0;
  font-size: 0.8rem;
  
  &:hover {
    background: rgba(139, 124, 248, 0.3);
  }
`;

const LogItem = styled.div<{ $type?: 'success' | 'error' | 'warning' }>`
  color: ${props =>
    props.$type === 'success' ? '#1dd1a1' :
      props.$type === 'error' ? '#ff6b6b' :
        props.$type === 'warning' ? '#ffd93d' :
          '#e2e8f0'
  };
  margin: 0.25rem 0;
`;

const TestInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.5rem;
  color: #e2e8f0;
  font-size: 0.8rem;
  margin: 0.25rem;
  width: 200px;
`;

export const AuthDebugger: React.FC = () => {
  const [logs, setLogs] = useState<Array<{ message: string; type?: 'success' | 'error' | 'warning' }>>([]);
  const [testEmail, setTestEmail] = useState('');
  const [testPassword, setTestPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addLog = (message: string, type?: 'success' | 'error' | 'warning') => {
    setLogs(prev => [...prev, { message: `${new Date().toLocaleTimeString()}: ${message}`, type }]);
  };

  const clearLogs = () => setLogs([]);

  useEffect(() => {
    // Monitor de estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        addLog(`✅ Usuário autenticado: ${user.email}`, 'success');
      } else {
        addLog('❌ Usuário não autenticado', 'warning');
      }
    });

    return () => unsubscribe();
  }, []);

  const testFirebaseAuth = () => {
    addLog('🔍 Testando configuração do Firebase Auth...');

    try {
      addLog(`📦 App Name: ${auth.app.name}`, 'success');
      addLog(`🏠 Auth Domain: ${auth.app.options.authDomain}`, 'success');
      addLog(`🆔 Project ID: ${auth.app.options.projectId}`, 'success');

      if (auth.currentUser) {
        addLog(`👤 Current User: ${auth.currentUser.email}`, 'success');
        addLog(`🔑 UID: ${auth.currentUser.uid}`, 'success');
      } else {
        addLog('⚠️ Nenhum usuário logado', 'warning');
      }
    } catch (error) {
      addLog(`❌ Erro na configuração: ${error}`, 'error');
    }
  };

  const testLogin = async () => {
    if (!testEmail || !testPassword) {
      addLog('❌ Preencha email e senha para teste', 'error');
      return;
    }

    addLog(`🔐 Tentando login com: ${testEmail}...`);

    try {
      const user = await signIn(testEmail, testPassword);
      addLog(`✅ Login bem-sucedido!`, 'success');
      addLog(`👤 User: ${user.email}`, 'success');
      addLog(`🔑 UID: ${user.uid}`, 'success');
    } catch (error) {
      const firebaseError = error as { code?: string; message?: string };
      addLog(`❌ Erro no login: ${firebaseError.code || firebaseError.message}`, 'error');

      // Traduzir erros comuns
      if (firebaseError.code === 'auth/user-not-found') {
        addLog('💡 Usuário não existe - precisa ser criado no Firebase Console', 'warning');
      } else if (firebaseError.code === 'auth/wrong-password') {
        addLog('💡 Senha incorreta', 'warning');
      } else if (firebaseError.code === 'auth/invalid-email') {
        addLog('💡 Formato de email inválido', 'warning');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        addLog('💡 Muitas tentativas - aguarde alguns minutos', 'warning');
      }
    }
  };

  const createTestUser = () => {
    addLog('📝 Para criar usuário de teste:', 'warning');
    addLog('1. Vá para Firebase Console', 'warning');
    addLog('2. Authentication → Users → Add user', 'warning');
    addLog('3. Use: admin@exemplo.com / senha123', 'warning');
    addLog('4. Ou use seu email/senha pessoal', 'warning');
  };

  const testCurrentUser = async () => {
    addLog('🔍 Verificando usuário atual...');

    try {
      const user = await getCurrentUser();
      if (user) {
        addLog(`✅ Usuário atual: ${user.email}`, 'success');
        addLog(`🔑 UID: ${user.uid}`, 'success');
        addLog(`📧 Email verificado: ${user.emailVerified}`, user.emailVerified ? 'success' : 'warning');
      } else {
        addLog('❌ Nenhum usuário logado', 'warning');
      }
    } catch (error) {
      addLog(`❌ Erro ao verificar usuário: ${error}`, 'error');
    }
  };

  return (
    <DebugContainer>
      <DebugTitle>🔐 Debug da Autenticação</DebugTitle>

      <div>
        <DebugButton onClick={testFirebaseAuth}>
          🔧 Testar Config
        </DebugButton>
        <DebugButton onClick={testCurrentUser}>
          👤 Verificar Usuário
        </DebugButton>
        <DebugButton onClick={createTestUser}>
          📝 Como Criar Usuário
        </DebugButton>
        <DebugButton onClick={clearLogs}>
          🗑️ Limpar
        </DebugButton>
      </div>

      <div style={{ margin: '1rem 0' }}>
        <div>
          <TestInput
            type="email"
            placeholder="Email para teste"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
          />
          <TestInput
            type="password"
            placeholder="Senha para teste"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
          />
          <DebugButton onClick={testLogin}>
            🧪 Testar Login
          </DebugButton>
        </div>
      </div>

      {currentUser && (
        <div style={{ background: 'rgba(29, 209, 161, 0.1)', padding: '0.5rem', borderRadius: '4px', margin: '0.5rem 0' }}>
          <strong>👤 Status: LOGADO</strong><br />
          📧 Email: {currentUser.email}<br />
          🔑 UID: {currentUser.uid}
        </div>
      )}

      <div style={{ marginTop: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
        {logs.map((log, index) => (
          <LogItem key={index} $type={log.type}>
            {log.message}
          </LogItem>
        ))}
      </div>
    </DebugContainer>
  );
};
