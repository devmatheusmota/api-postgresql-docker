# CRUD API com NodeJS + PostgreSQL + Prisma + Docker

## 🪧 Sobre

CRUD API desenvolvida em **NodeJS** com o framework **Express**, utilizando o banco relacional **PostgreSQL** e a ORM **Prisma** para a conexão e abstração do banco de dados.

Foi utilizado também o **Docker** para conteinerização do banco de dados e do servidor HTTP, e o **Docker Compose** para orquestrar esses containers.

Update: recentemente foi adicionado autenticação via JWT.

---

## 🚀 Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [JSON Web Token (JWT)](https://jwt.io/)

---

## 📦 Como rodar o projeto

<br>

## 1 - Clonar o repo

```bash
# Clonar o repositório
$ git clone https://github.com/devmatheusmota/api-postgresql-docker.git

# Entrar no repositório
$ cd api-postgresql-docker
```

## 2 - Criar o .env e adicionar as variáveis

```bash
# Cria o arquivo .env na pasta raiz
$ touch .env


# Crie essas duas variáveis no arquivo .env
# Substitua com as informações do seu banco de dados
DATABASE_URL="postgresql://postgres:test@db:5432/postgres?schema=public"

# O mesmo vale para o password do banco
POSTGRES_PASSWORD=test
```

## 3 - Instalar as dependências e inicializar o Prisma Client

```bash
# Instalar as dependências
$ npm install

# Inicializar o Prisma Client
$ npm run generate
```

## 4 - Abrir o Docker Desktop e rodar no terminal o seguinte comando:

```bash
# Sobe o servidor e o banco de dados
$ docker-compose up -d

# Se precisar derrubar os containers
$ docker-compose down
```

---

# Usando a API

Voce pode acessar a API usando os seguintes endpoints:

## `/login`

### `POST`

- `/login` : Efetua login
  - Body:
    - `email: String` (requerido): Email do usuário
    - `password: String` (requerido): Senha do usuário
  - Retorno:
    - `token: String`: Bearer token utilizado pra ter acesso a todas as rotas da API
    - `refresh-token: String`: refresh token usado pra requerir um novo token de acesso após a expiração

## `/refresh-token`

### `POST`

- `/refresh-token` : Faz a requisicao de um novo token de acesso
  - Body:
    - `refresh_token: String` (requerido): refresh token usado pra requerir um novo token de acesso após a expiração
  - Retorno:
    - `token: String`: Bearer token utilizado pra ter acesso a todas as rotas da API
    - `newRefreshToken: String`: novo refresh token usado pra requerir um novo token de acesso após a expiração

## Para ter acesso a todas as rotas da API é necessário inserir um token funcional no header de Auth das requisições

## `/users`

### `GET`

- `/users` : Lista todos os usuários
- `/users/:id` : Lista um usuário pelo seu ID

### `POST`

- `/users` : Cria um novo usuário
  - Body:
    - `name: String` (opcional): Nome do usuário
    - `email: String` (requerido): Email do usuário

### `PUT`

- `/users/:id` : Atualiza dados do usuário pelo ID
  - Body:
    - `name: String` (opcional): Nome do usuário
    - `email: String` (opcional): Email do usuário

### `DELETE`

- `/users/:id` : Remove usuário pelo ID
  - Usuário somente é removido se não tiver nenhum post e nenhum perfil criado
    <br><br><br>

## `/posts`

### `GET`

- `/posts` : Lista todos os posts
- `/posts/:id` : Lista um post pelo seu ID
- `/posts/author/:id` : Lista posts pelo ID do autor

### `POST`

- `/posts` : Cria um novo post
  - Body:
    - `title: String` (opcional) : Título do post
    - `content: String` (opcional) : Conteúdo do post
    - `authorId: Number` (requerido) : ID do autor
    - `published: Boolean` (opcional) : Post publicado (default: false)

### `PUT`

- `/posts/:id/title` : Atualiza título do post pelo ID
  - Body
    - `title: String` (opcional) : Título do post
- `/posts/:id/content` : Atualiza conteúdo do post pelo ID
  - Body
    - `content: String` (opcional) : Conteúdo do post
- `/posts/:id/like` : Curte o post (i.e. Botão de Curtir)

### `DELETE`

- `/posts/:id` : Remove post pelo ID
  <br><br><br>

## `/profiles`

### `GET`

- `/profiles` : Lista todos os perfis
- `/profiles:id` : Lista perfil pelo ID

### `POST`

- `/profiles` : Cria um novo perfil
  - Body:
    - `bio: String` (opcional) : Biografia do perfil
    - `userId: Number` (requerido) : ID do dono do perfil

### `PUT`

- `/profiles/:id` : Atualiza perfil pelo ID
  - Body:
    - `bio: String` (opcional) : Biografia do perfil

### `DELETE`

- `/profiles/:id` : Remove perfil pelo ID
