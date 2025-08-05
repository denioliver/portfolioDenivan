# 📧 CONFIGURAÇÃO DO EMAILJS - Guia Passo a Passo

## 🎯 O que foi implementado:

✅ **Notificação automática por email** quando alguém envia feedback
✅ **Email de confirmação** para quem envia o feedback
✅ **Integração completa** com o formulário de contato

---

## 🚀 Como configurar o EmailJS:

### **1. Criar conta no EmailJS:**

1. Vá para: https://www.emailjs.com/
2. **Sign Up** / **Create Account**
3. Confirme seu email

### **2. Configurar serviço de email:**

1. No dashboard, clique **"Add Service"**
2. Escolha **Gmail** (recomendado)
3. **Nome do serviço:** `service_portfolio`
4. **Conectar sua conta Gmail:** `denyoliver777@gmail.com`
5. **Save**

### **3. Criar template para notificação:**

1. Clique **"Email Templates"** → **"Create New Template"**
2. **Template ID:** `template_feedback`
3. **Template Name:** `Portfolio Feedback Notification`

**Subject:** `🎯 Novo Feedback - {{subject}}`

**Content:**

```html
<h2>🎯 Novo Feedback Recebido!</h2>

<h3>📝 Detalhes:</h3>
<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Assunto:</strong> {{subject}}</p>
<p><strong>Data:</strong> {{timestamp}}</p>

<h3>💬 Mensagem:</h3>
<div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
  {{message}}
</div>

<hr />
<p style="color: #666;">
  <small
    >Esta notificação foi enviada automaticamente do Portfolio Denivan</small
  >
</p>
```

4. **To Email:** `denyoliver777@gmail.com`
5. **Save**

### **4. Criar template para confirmação (opcional):**

1. **"Create New Template"**
2. **Template ID:** `template_confirmation`
3. **Template Name:** `Feedback Confirmation`

**Subject:** `✅ Feedback Recebido - Obrigado {{to_name}}!`

**Content:**

```html
<h2>✅ Feedback Recebido com Sucesso!</h2>

<p>Olá {{to_name}},</p>

<p>Obrigado por entrar em contato comigo através do meu portfólio!</p>

<p>Recebi sua mensagem e retornarei em breve.</p>

<hr />
<p>
  <strong>Denivan Oliveira</strong><br />
  Desenvolvedor Full Stack<br />
  📧 denyoliver777@gmail.com
</p>
```

5. **To Email:** `{{to_email}}`
6. **Save**

### **5. Obter chave pública:**

**🔍 Onde encontrar (tente nesta ordem):**

**Opção A - Integration:**

1. Menu lateral → **"Integration"**
2. Clique **"Browser"** ou **"JavaScript"**
3. Copie a **"Public Key"** que aparece

**Opção B - Account:**

1. Menu lateral → **"Account"** → **"General"**
2. Procure **"Public Key"** ou **"User ID"**

**Opção C - API Keys:**

1. Menu lateral → **"API Keys"**
2. Copie a chave listada

💡 **Formato esperado:** `user_1a2b3c4d5e6f7g8h9i` (15-25 caracteres)

### **6. Atualizar arquivo .env:**

```properties
# 📧 EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_portfolio
VITE_EMAILJS_TEMPLATE_ID=template_feedback
VITE_EMAILJS_TEMPLATE_CONFIRMATION=template_confirmation
VITE_EMAILJS_PUBLIC_KEY=SUA_CHAVE_PUBLICA_AQUI
```

### **7. Testar:**

1. Reinicie o servidor: `npm run dev`
2. Vá para http://localhost:5174/
3. Scroll até o formulário de contato
4. Envie um teste
5. Verifique sua caixa de entrada: `denyoliver777@gmail.com`

---

## 🎯 Funcionamento:

### **Quando alguém envia feedback:**

1. **Salva no Firebase** ✅
2. **Envia email para você** 📧 `denyoliver777@gmail.com`
3. **Envia confirmação para o usuário** 📨 (opcional)
4. **Mostra mensagem de sucesso** ✅

### **Informações no email:**

- Nome da pessoa
- Email da pessoa
- Assunto
- Mensagem completa
- Data/hora do envio

---

## 🔧 Comandos úteis:

```bash
# Testar serviço
npm run dev

# Ver logs no navegador
F12 → Console → procurar por "📧"

# Verificar configuração
console.log(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
```

---

## 📱 Limites do EmailJS:

- **Plano gratuito:** 200 emails/mês
- **Suficiente para:** Portfolio pessoal
- **Upgrade:** Se precisar de mais

---

## 🆘 Troubleshooting:

### **Problema: Email não chega**

- ✅ Verificar spam/lixo eletrônico
- ✅ Confirmar template IDs
- ✅ Verificar chave pública
- ✅ Conectar Gmail corretamente

### **Problema: Erro no console**

- ✅ Verificar arquivo .env
- ✅ Reiniciar servidor
- ✅ Verificar network no DevTools

---

**🎉 Após configurar, você receberá emails automáticos sempre que alguém enviar feedback!**
