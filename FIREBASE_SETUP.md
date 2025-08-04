# 🔥 Configuração do Firebase

## 📋 Passos para configurar o Firebase:

### 1. Criar Projeto no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Clique em "Criar um projeto"
3. Nome do projeto: `portfolio-denivan` (ou outro nome de sua preferência)
4. Aceite os termos e continue

### 2. Configurar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Na aba "Sign-in method":
   - Clique em "Email/senha"
   - Ative "Email/senha"
   - Ative "Link de email (login sem senha)" se desejar
   - Clique em "Salvar"

### 3. Configurar Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Começar no modo de teste" (por enquanto)
4. Escolha a localização (preferencialmente próxima ao Brasil)

### 4. Obter Configurações do Projeto

1. No menu lateral, clique em "Configurações do projeto" (ícone de engrenagem)
2. Na seção "Seus aplicativos", clique em "Web" (ícone </>)
3. Registre o app com o nome: `portfolio-dashboard`
4. Copie a configuração que aparece (firebaseConfig)

### 5. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto
2. Adicione as variáveis conforme o exemplo abaixo:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

### 6. Criar Usuário Administrativo

Após configurar tudo, você pode criar um usuário de duas formas:

#### Opção A: Via Firebase Console

1. Na seção "Authentication"
2. Clique em "Usuários"
3. Clique em "Adicionar usuário"
4. Digite seu email e senha

#### Opção B: Via Código (temporário)

Adicione temporariamente esta função no seu projeto para criar o usuário:

```typescript
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./services/firebase";

// Use apenas uma vez para criar o usuário admin
const createAdminUser = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      "admin@denivan.dev",
      "suaSenhaSegura123"
    );
    console.log("Usuário admin criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
};
```

### 7. Regras de Segurança (Firestore)

Por segurança, configure as regras do Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas usuários autenticados podem ler/escrever projetos
    match /projects/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 8. Regras de Segurança (Storage) - Para uploads futuros

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 Teste da Configuração

Após seguir todos os passos:

1. Reinicie o servidor de desenvolvimento: `npm run dev`
2. Acesse: http://localhost:5173/login
3. Faça login com o usuário criado
4. Teste o cadastro de projetos
5. Verifique se os projetos aparecem no Firestore Console

## 🔐 Segurança

⚠️ **IMPORTANTE:**

- Nunca commite o arquivo `.env` para o repositório
- Use senhas fortes para usuários administrativos
- Configure as regras de segurança adequadamente
- Em produção, desabilite o modo de teste do Firestore

## 🆘 Problemas Comuns

### Erro de CORS

Se encontrar erro de CORS, adicione seu domínio nas configurações do projeto Firebase.

### Erro de Permissão

Verifique se as regras do Firestore permitem acesso para usuários autenticados.

### Variáveis de Ambiente não Carregam

Certifique-se de que o arquivo `.env` está na raiz do projeto e que todas as variáveis começam com `VITE_`.
