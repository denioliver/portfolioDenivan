# Configuração do Firebase Storage

## 🔥 **Regras de Segurança do Storage**

Para permitir uploads de imagens, você precisa configurar as regras de segurança no Firebase Console:

### **1. Acesse o Firebase Console**

- Vá para [Firebase Console](https://console.firebase.google.com/)
- Selecione seu projeto
- Vá em **Storage** → **Rules**

### **2. Configure as Regras**

Substitua as regras atuais por estas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permitir upload de imagens apenas para usuários autenticados
    match /projects/{imageId} {
      allow read: if true; // Qualquer um pode ver as imagens
      allow write: if request.auth != null && // Usuário autenticado
                      request.resource.size < 5 * 1024 * 1024 && // Máximo 5MB
                      request.resource.contentType.matches('image/.*'); // Apenas imagens
    }

    // Pasta para outras imagens (se necessário)
    match /uploads/{imageId} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.resource.size < 5 * 1024 * 1024 &&
                      request.resource.contentType.matches('image/.*');
    }
  }
}
```

### **3. Publique as Regras**

- Clique em **"Publicar"**
- Aguarde alguns segundos para as regras serem aplicadas

## 🎯 **O que essas regras fazem:**

- ✅ **Leitura pública**: Qualquer pessoa pode ver as imagens
- ✅ **Upload apenas autenticado**: Só usuários logados podem fazer upload
- ✅ **Limite de tamanho**: Máximo 5MB por imagem
- ✅ **Apenas imagens**: Só aceita arquivos de imagem (JPG, PNG, GIF, WebP)
- ✅ **Pasta organizada**: Imagens ficam na pasta `/projects/`

## 📱 **Como usar:**

1. **Faça login** no dashboard
2. **Vá para "Projetos"**
3. **Clique em "Selecionar imagem"**
4. **Escolha uma foto** do seu PC ou celular
5. **Aguarde o upload** (você verá o progresso)
6. **A imagem será salva** automaticamente no Firebase Storage

## ⚡ **Recursos do Sistema:**

- 📤 **Upload direto** do dispositivo
- 🔄 **Redimensionamento automático** (otimização)
- 📊 **Barra de progresso** em tempo real
- 🖼️ **Preview da imagem** antes de salvar
- 🗑️ **Remover imagem** se necessário
- 📱 **Funciona em mobile** e desktop
- ⚡ **URLs públicas** geradas automaticamente
