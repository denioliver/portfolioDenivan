import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ImageUploadService } from '../services/imageUpload';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
  disabled?: boolean;
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.$active ? 'rgba(139, 124, 248, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'rgba(139, 124, 248, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? '#8b7cf8' : '#a0aec0'};
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 124, 248, 0.1);
    color: #8b7cf8;
  }
`;

const URLInput = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.75rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: #8b7cf8;
    background: rgba(139, 124, 248, 0.05);
    box-shadow: 0 0 0 3px rgba(139, 124, 248, 0.1);
  }

  &::placeholder {
    color: #64748b;
  }
`;

const UploadButton = styled.button<{ $hasImage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.$hasImage ?
    'linear-gradient(135deg, #1dd1a1, #8b7cf8)' :
    'rgba(139, 124, 248, 0.1)'
  };
  border: 2px dashed ${props => props.$hasImage ?
    'transparent' :
    'rgba(139, 124, 248, 0.3)'
  };
  border-radius: 8px;
  color: ${props => props.$hasImage ? '#fff' : '#8b7cf8'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 50px;

  &:hover:not(:disabled) {
    background: ${props => props.$hasImage ?
    'linear-gradient(135deg, #1dd1a1, #8b7cf8)' :
    'rgba(139, 124, 248, 0.15)'
  };
    border-color: ${props => props.$hasImage ?
    'transparent' :
    'rgba(139, 124, 248, 0.5)'
  };
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImagePreview}:hover & {
    opacity: 1;
  }
`;

const RemoveButton = styled.button`
  background: rgba(255, 107, 107, 0.9);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff6b6b;
    transform: scale(1.05);
  }
`;

const UploadProgress = styled.div<{ $progress: number }>`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.$progress}%;
    height: 100%;
    background: linear-gradient(135deg, #1dd1a1, #8b7cf8);
    transition: width 0.3s ease;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  padding: 0.5rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(255, 107, 107, 0.3);
`;

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUploaded,
  currentImage,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('📁 Arquivo selecionado:', file.name, file.size, 'bytes');

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      // Validação inicial
      if (!ImageUploadService.isValidImageFile(file)) {
        throw new Error('Arquivo deve ser uma imagem (JPG, PNG, GIF, WebP)');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Imagem deve ter no máximo 5MB');
      }

      // Progresso inicial
      setUploadProgress(20);
      console.log('⚡ Iniciando processamento...');

      // Redimensionar imagem para otimizar
      console.log('🎨 Redimensionando imagem...');
      setUploadProgress(40);
      const optimizedFile = await ImageUploadService.resizeImage(file, 800, 0.8);

      // Upload da imagem
      console.log('📤 Fazendo upload para Firebase...');
      setUploadProgress(70);
      const imageUrl = await ImageUploadService.uploadImage(optimizedFile, 'projects');

      console.log('✅ Upload concluído!', imageUrl);
      setUploadProgress(100);
      onImageUploaded(imageUrl);

      // Limpar progresso após um tempo
      setTimeout(() => {
        setUploadProgress(0);
      }, 2000);

    } catch (error) {
      console.error('❌ Erro no upload:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao fazer upload';
      setError(errorMessage);
      setUploadProgress(0);
    } finally {
      setUploading(false);
      // Limpar input para permitir selecionar a mesma imagem novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }; const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageUploaded(urlInput.trim());
      setUrlInput('');
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    onImageUploaded('');
  };

  return (
    <UploadContainer>
      <TabsContainer>
        <Tab
          type="button"
          $active={uploadMode === 'file'}
          onClick={() => setUploadMode('file')}
        >
          📁 Upload de Arquivo
        </Tab>
        <Tab
          type="button"
          $active={uploadMode === 'url'}
          onClick={() => setUploadMode('url')}
        >
          🔗 URL da Imagem
        </Tab>
      </TabsContainer>

      {uploadMode === 'file' ? (
        <>
          <UploadButton
            type="button"
            onClick={handleButtonClick}
            disabled={disabled || uploading}
            $hasImage={!!currentImage}
          >
            {uploading ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H5V21H19V9Z" />
                </svg>
                Fazendo upload...
              </>
            ) : currentImage ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z" />
                </svg>
                Imagem carregada - Clique para trocar
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                📱 Selecionar do dispositivo
              </>
            )}
          </UploadButton>

          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={disabled || uploading}
          />
        </>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <URLInput
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            disabled={disabled}
            onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
          />
          <UploadButton
            type="button"
            onClick={handleUrlSubmit}
            disabled={disabled || !urlInput.trim()}
            $hasImage={false}
            style={{ minWidth: '100px' }}
          >
            Usar URL
          </UploadButton>
        </div>
      )}

      {uploading && uploadProgress > 0 && (
        <UploadProgress $progress={uploadProgress} />
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {currentImage && !uploading && (
        <ImagePreview>
          <PreviewImage src={currentImage} alt="Preview da imagem" />
          <ImageOverlay>
            <RemoveButton type="button" onClick={handleRemoveImage}>
              🗑️ Remover
            </RemoveButton>
          </ImageOverlay>
        </ImagePreview>
      )}
    </UploadContainer>
  );
};
