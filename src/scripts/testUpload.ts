// 🧪 Script para testar upload de imagem
// Use no console do navegador: testImageUpload()

import { ImageUploadService } from '../services/imageUpload';

export const testImageUpload = async () => {
  console.log('🧪 === TESTE DE UPLOAD DE IMAGEM ===');

  // 1. Verificar se o Storage está configurado
  try {
    console.log('🔥 Verificando Firebase Storage...');
    const { storage } = await import('../services/firebase');
    console.log('✅ Firebase Storage conectado:', storage.app.name);
  } catch (error) {
    console.error('❌ Erro no Firebase Storage:', error);
    return;
  }

  // 2. Verificar autenticação
  try {
    console.log('🔑 Verificando autenticação...');
    const { auth } = await import('../services/firebase');
    if (auth.currentUser) {
      console.log('✅ Usuário autenticado:', auth.currentUser.email);
    } else {
      console.log('⚠️ Usuário não autenticado - faça login primeiro');
      return;
    }
  } catch (error) {
    console.error('❌ Erro na autenticação:', error);
    return;
  }

  // 3. Criar uma imagem de teste (1x1 pixel PNG)
  console.log('🎨 Criando imagem de teste...');
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d')!;

  // Desenhar um quadrado colorido
  ctx.fillStyle = '#8b7cf8';
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px Arial';
  ctx.fillText('TEST', 30, 55);

  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error('❌ Erro ao criar blob de teste');
        return;
      }

      const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
      console.log('📁 Arquivo de teste criado:', testFile.size, 'bytes');

      // 4. Testar upload
      try {
        console.log('📤 Iniciando upload de teste...');
        const imageUrl = await ImageUploadService.uploadImage(testFile, 'test');
        console.log('✅ Upload de teste bem-sucedido!');
        console.log('🔗 URL gerada:', imageUrl);

        // 5. Testar se a imagem é acessível
        const img = new Image();
        img.onload = () => {
          console.log('✅ Imagem acessível via URL pública');
          console.log('🎉 TESTE COMPLETO - Sistema funcionando!');
          resolve(imageUrl);
        };
        img.onerror = () => {
          console.error('❌ Imagem não acessível via URL');
          resolve(null);
        };
        img.src = imageUrl;

      } catch (error) {
        console.error('❌ Erro no upload de teste:', error);
        resolve(null);
      }
    }, 'image/png');
  });
};

// Adicionar ao window para usar no console
if (typeof window !== 'undefined') {
  (window as any).testImageUpload = testImageUpload;
  console.log('🧪 Para testar upload, execute: testImageUpload()');
}
