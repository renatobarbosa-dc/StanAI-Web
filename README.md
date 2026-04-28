# StanAI Web

Interface web do StanAI para conversar com conteúdos de wikis.  
O usuário informa a URL de uma wiki, faz perguntas em linguagem natural e recebe respostas geradas pela API do backend.

## Funcionalidades

- Início de conversa com URL da wiki + pergunta inicial
- Continuação da conversa no mesmo contexto
- Persistência local de chats em `localStorage`
- Histórico de chats com seleção e exclusão na sidebar
- Tema claro/escuro com persistência
- Fluxo automático de ingestão da wiki (status `202`) com polling até concluir

## Stack

- React 19 + TypeScript
- Vite
- ESLint
- Lucide React (ícones)
- React Spinners (loading)

## Pré-requisitos

- Node.js 20+ (recomendado)
- npm
- Backend da API rodando localmente em `http://localhost:8000`

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço exibido no terminal (normalmente `http://localhost:5173`).

## Scripts disponíveis

- `npm run dev`: inicia o ambiente de desenvolvimento
- `npm run build`: gera build de produção
- `npm run preview`: serve a build localmente
- `npm run lint`: executa lint do projeto

## Integração com API

Atualmente o frontend usa base fixa:

- `http://localhost:8000`

Fluxo esperado:

- `POST /chat`
  - `200`: retorna resposta imediatamente
  - `202`: indica ingestão em andamento
- quando `202`, o frontend consulta `status_url` até `completed` e repete a pergunta

## Estrutura principal

```text
src/
  components/
    Chat/
    Form/
    Loading/
    Notebook/
    Sidebar/
    ThemeToggle/
  contexts/
    ThemeContext.tsx
  styles/
  App.tsx
  main.tsx
```

## Persistência local

- Chats: `localStorage['stanai-chats']`
- Tema: `localStorage['theme']`

## Observações

- O frontend depende do backend para responder perguntas.
- Se a API não estiver disponível, o app exibirá erros via `alert`.
