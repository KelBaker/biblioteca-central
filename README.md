# 📚 Biblioteca Central Online

Sistema full-stack para gerenciar uma biblioteca pessoal: cadastre, edite e acompanhe o status de leitura dos seus livros, com capa buscada automaticamente a partir do ISBN.

`react` `vite` `nodejs` `express` `mongodb` `mongoose` `axios` `react-router` `open-library-api`

## 🔗 Backend em produção

https://biblioteca-livros-api.onrender.com

## ✨ Funcionalidades

- Cadastro, edição e exclusão de livros (título, número de páginas, ISBN, editora)
- **Capa do livro buscada automaticamente** a partir do ISBN, via [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) — com ícone de fallback quando a capa não existe
- **Status de leitura** por livro: Quero ler, Lendo ou Lido
- Notificações visuais (toast) de sucesso/erro, sem `alert()` nativo
- Estado de carregamento nos botões durante as requisições
- API REST completa (GET, POST, PUT, DELETE) com tratamento de erro

## 🛠️ Tecnologias

**Front-end**
- React + Vite
- React Router
- Axios
- React Toastify
- SCSS

**Back-end**
- Node.js + Express
- MongoDB + Mongoose
- dotenv, cors

## 🔌 Infraestrutura

| Peça | Onde está hospedado |
|---|---|
| Banco de dados | MongoDB Atlas (tier gratuito) |
| Backend (API REST) | Render (tier gratuito) |
| Frontend | Netlify |

## 🚀 Como rodar localmente

### Backend

```bash
git clone https://github.com/KelBaker/RID157304_Desafio05.git
cd RID157304_Desafio05/Back
npm install
cp .env.example .env
```

Edite o `.env` com sua própria connection string do MongoDB (local ou Atlas), depois:

```bash
npm start
```

### Frontend

```bash
cd ../Front
npm install
cp .env.example .env
```

Edite o `.env` com a URL do backend (local ou o deployado), depois:

```bash
npm run dev
```

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
