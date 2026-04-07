# 🚀 Synthesis Labs - Frontend

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Um sistema completo de gerenciamento de usuários com arquitetura MVC e stack moderna.

</div>

---

Aplicação frontend desenvolvida com **Next.js**, **Tailwind CSS** e **TypeScript** para gerenciamento de projetos, tarefas e membros, com autenticação baseada em cookies HTTP‑only e integração com uma API REST em Node.js/Express.

## 📋 Funcionalidades

- **Autenticação** (signup, signin, logout) com cookies seguros.
- **Dashboard** com estatísticas dinâmicas (projetos, membros, tarefas).
- **Gestão de Projetos**:
  - Criar, listar, visualizar detalhes e excluir projetos.
  - Adicionar/remover membros com papéis (`AUTH`, `ADMIN`, `MEMBER`).
- **Gestão de Tarefas**:
  - Criar tarefas com título, descrição, data de vencimento e responsável.
  - Visualizar tarefas com indicador de atraso.
- **Página de Membros** – lista todos os colaboradores dos seus projetos.
- **Configurações do Usuário** – alteração de senha e exclusão de conta (remove projetos próprios e desvincula de projetos de terceiros).
- **Tema escuro/claro** persistente no `localStorage`.
- **Layout responsivo** e sidebar com navegação privada.

## 🛠️ Stack Tecnológica

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) + [MUI Icons](https://mui.com/material-ui/icons/) para ícones
- **Autenticação**: cookies HTTP‑only + JWT

## 📦 Pré‑requisitos

- Node.js (versão 20 ou superior)
- pnpm (ou npm/yarn)
- Backend em execução (ver link abaixo)

## 🚀 Instalação e Execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/synthesis-labs-frontend.git
   cd synthesis-labs-frontend

2. **Instale as dependências**:
   ```bash
    pnpm install
   
3. **Configure as variáveis de ambiente (opcional – o projeto usa proxy padrão)**:
Crie um arquivo .env.local na raiz:
   ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000   # ou a URL do seu backend

4. **Execute o servidor de desenvolvimento**:
   ```bash
    pnpm run dev

5. **Acesse http://localhost:3000**.

**Nota**: O frontend utiliza rewrites no next.config.ts para encaminhar chamadas /api/* para o backend. Certifique‑se de que o backend esteja rodando em http://localhost:5000 (ou ajuste o destino no rewrites).

## 🔗 Backend
Este frontend consome a API desenvolvida em Node.js/Express com Prisma ORM.

Repositório do backend: [Synthesis Labs - Backend](https://github.com/seu-usuario/synthesis-labs-backend)

Consulte o README do backend para instruções de configuração do banco de dados e execução.

## 📁 Estrutura de Pastas (resumida)
```plaintext
  src/
  ├── app/
  │   ├── (private)/          # Rotas autenticadas (layout com sidebar)
  │   │   ├── dashboard/
  │   │   ├── projects/
  │   │   ├── members/
  │   │   ├── settings/
  │   │   └── layout.tsx
  │   ├── (auth)/
  │       ├── signin/
  │       ├── signup/
  │       └── layout.tsx
  │   ├── (marketing)/
  │   │   ├── home/
  │   │   ├── about/
  │   │   ├── features/
  │   │   ├── pricing/
  │   │   ├── support/
  │   └── page.tsx
  │   └── layout.tsx
  ├── middleware.ts            
  ├── components/             # Componentes reutilizáveis
  ├── hooks/                  # useAuth, useTheme
  ├── types/                  # Interfaces TypeScript
  └── assets/                 # Imagens estáticas
```

## ⚙️ Principais Scripts
- pnpm dev – modo desenvolvimento (Turbopack)

- pnpm build – build de produção

- pnpm start – servidor de produção

- pnpm lint – verificação de código

## 🤝 Contribuição
Contribuições são bem‑vindas! Sinta‑se à vontade para abrir issues e pull requests.

## 📄 Licença
Este projeto está sob a licença MIT.
