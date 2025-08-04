import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

// Serviço para upload de imagens no Firebase Storage
export class ImageUploadService {

  // Upload de imagem e retorna a URL pública
  static async uploadImage(file: File, folder: string = 'projects'): Promise<string> {
    try {
      // Validar o arquivo
      if (!this.isValidImageFile(file)) {
        throw new Error('Arquivo deve ser uma imagem (JPG, PNG, GIF, WebP)');
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Imagem deve ter no máximo 5MB');
      }

      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const imagePath = `${folder}/${fileName}`;

      // Criar referência no Storage
      const imageRef = ref(storage, imagePath);

      // Upload do arquivo
      console.log('📤 Fazendo upload da imagem...');
      const snapshot = await uploadBytes(imageRef, file);

      // Obter URL pública
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('✅ Upload concluído:', downloadURL);

      return downloadURL;
    } catch (error) {
      console.error('❌ Erro no upload:', error);
      throw error;
    }
  }

  // Validar se o arquivo é uma imagem
  static isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
  }

  // Excluir imagem do Storage (usar quando deletar projeto)
  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extrair o path da URL do Firebase
      const url = new URL(imageUrl);
      const pathMatch = url.pathname.match(/\/v0\/b\/[^/]+\/o\/(.+)\?/);

      if (pathMatch) {
        const imagePath = decodeURIComponent(pathMatch[1]);
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
        console.log('🗑️ Imagem deletada do Storage');
      }
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      // Não interromper o processo se falhar ao deletar a imagem
    }
  }

  // Redimensionar imagem no lado cliente (opcional, para otimização)
  static async resizeImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      if (!ctx) {
        console.warn('Canvas não suportado, usando arquivo original');
        resolve(file);
        return;
      }

      img.onload = () => {
        try {
          // Calcular novas dimensões mantendo proporção
          const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;

          // Desenhar imagem redimensionada
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Converter para blob e criar novo arquivo
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                console.log(`🎨 Imagem redimensionada: ${file.size} → ${blob.size} bytes`);
                resolve(resizedFile);
              } else {
                console.warn('Erro ao redimensionar, usando arquivo original');
                resolve(file);
              }
            },
            file.type,
            quality
          );
        } catch (error) {
          console.warn('Erro no redimensionamento:', error);
          resolve(file); // Fallback para arquivo original
        } finally {
          // Limpar URL do objeto
          URL.revokeObjectURL(img.src);
        }
      };

      img.onerror = () => {
        console.warn('Erro ao carregar imagem para redimensionamento, usando arquivo original');
        resolve(file);
      };

      img.src = URL.createObjectURL(file);
    });
  }
}
