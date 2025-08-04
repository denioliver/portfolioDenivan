import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, storage } from '../services/firebase';
import { ImageUploadService } from '../services/imageUpload';

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

export const UploadDebugger: React.FC = () => {
  const [logs, setLogs] = useState<Array<{ message: string; type?: 'success' | 'error' | 'warning' }>>([]);

  const addLog = (message: string, type?: 'success' | 'error' | 'warning') => {
    setLogs(prev => [...prev, { message: `${new Date().toLocaleTimeString()}: ${message}`, type }]);
  };

  const clearLogs = () => setLogs([]);

  const testFirebaseConfig = () => {
    addLog('🔍 Testando configuração do Firebase...');

    try {
      addLog(`📦 App Name: ${storage.app.name}`, 'success');
      addLog(`🏪 Storage Bucket: ${storage.app.options.storageBucket}`, 'success');
      addLog(`🆔 Project ID: ${storage.app.options.projectId}`, 'success');

      if (auth.currentUser) {
        addLog(`👤 Usuário autenticado: ${auth.currentUser.email}`, 'success');
      } else {
        addLog('⚠️ Usuário não autenticado', 'warning');
      }
    } catch (error) {
      addLog(`❌ Erro na configuração: ${error}`, 'error');
    }
  };

  const testImageUpload = async () => {
    addLog('🧪 Iniciando teste de upload...');

    if (!auth.currentUser) {
      addLog('❌ Faça login primeiro!', 'error');
      return;
    }

    try {
      // Criar imagem de teste
      addLog('🎨 Criando imagem de teste...');
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#8b7cf8';
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.fillText('TEST', 30, 55);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          addLog('❌ Erro ao criar blob', 'error');
          return;
        }

        const testFile = new File([blob], 'debug-test.png', { type: 'image/png' });
        addLog(`📁 Arquivo criado: ${testFile.size} bytes`, 'success');

        try {
          addLog('📤 Fazendo upload...');
          const imageUrl = await ImageUploadService.uploadImage(testFile, 'debug');
          addLog(`✅ Upload bem-sucedido!`, 'success');
          addLog(`🔗 URL: ${imageUrl.substring(0, 80)}...`, 'success');

          // Testar acesso à imagem
          const img = new Image();
          img.onload = () => {
            addLog('✅ Imagem acessível via URL', 'success');
          };
          img.onerror = () => {
            addLog('❌ Imagem não acessível', 'error');
          };
          img.src = imageUrl;

        } catch (uploadError) {
          addLog(`❌ Erro no upload: ${uploadError}`, 'error');
        }
      }, 'image/png');

    } catch (error) {
      addLog(`❌ Erro geral: ${error}`, 'error');
    }
  };

  const testFileValidation = () => {
    addLog('🔍 Testando validação de arquivos...');

    // Criar arquivo PNG válido
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    canvas.toBlob((blob) => {
      if (blob) {
        const validFile = new File([blob], 'test.png', { type: 'image/png' });
        const isValid = ImageUploadService.isValidImageFile(validFile);
        addLog(`📁 PNG válido: ${isValid ? '✅' : '❌'}`, isValid ? 'success' : 'error');
      }
    }, 'image/png');

    // Testar arquivo inválido
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const isInvalid = ImageUploadService.isValidImageFile(invalidFile);
    addLog(`📄 TXT inválido: ${!isInvalid ? '✅' : '❌'}`, !isInvalid ? 'success' : 'error');
  };

  return (
    <DebugContainer>
      <DebugTitle>🛠️ Debug do Upload</DebugTitle>

      <div>
        <DebugButton onClick={testFirebaseConfig}>
          🔧 Testar Config
        </DebugButton>
        <DebugButton onClick={testFileValidation}>
          📋 Testar Validação
        </DebugButton>
        <DebugButton onClick={testImageUpload}>
          🧪 Testar Upload
        </DebugButton>
        <DebugButton onClick={clearLogs}>
          🗑️ Limpar
        </DebugButton>
      </div>

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
