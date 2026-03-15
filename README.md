# Kanban Board

Quadro Kanban full-stack construido com Next.js para organizar tarefas em colunas de status.

## Tecnologias

- Next.js 16 (App Router + Server Actions)
- React 19
- TypeScript
- Prisma + SQLite
- @dnd-kit (drag and drop)
- Tailwind CSS 4

## Funcionalidades

- Criar, editar e excluir tarefas
- Arrastar e soltar entre colunas (A Fazer, Em Andamento, Concluído)
- Reordenar tarefas dentro da mesma coluna
- Contagem de tarefas por coluna
- Confirmacao de exclusao

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` na raiz do projeto com a URL do banco de dados:

```bash
cp .env.example .env
```

3. Gere o Prisma Client e crie o banco de dados:

```bash
npx prisma generate
npx prisma db push
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)
