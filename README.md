<h1 align="center">NASA API</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/Gui1703/NASA-API?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/Gui1703/NASA-API?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Gui1703/NASA-API?color=56BEB8">
</p>

## :dart: Sobre ##

Projeto desenvolvido em NodeJS com TypeScript, Prisma como banco de dados e docker.

## :sparkles: Arquitetura de Pastas ##

<strong>repositories</strong>: Contém os módulos responsáveis por interagir com o banco de dados. Geralmente, os repositórios lidam com a consulta, criação, atualização e exclusão de dados no banco de dados.

<strong>resolvers</strong>: Contém os resolvers, que são as funções responsáveis por resolver as consultas e mutações definidas no esquema GraphQL. Os resolvers se comunicam com os repositórios ou serviços para obter ou modificar os dados necessários.

<strong>service</strong>: Contém os módulos responsáveis por implementar a lógica de negócio ou serviços específicos da aplicação. Os serviços podem encapsular funcionalidades complexas e reutilizáveis, como autenticação, manipulação de dados, cálculos e integrações externas.

<strong>types</strong>: Contém os arquivos de definição de tipos personalizados utilizados no projeto. Esses tipos podem ser usados para definir estruturas de dados específicas, escalares personalizados ou tipos de entrada para consultas e mutações.

<strong>utils</strong>: Contém módulos ou funções utilitárias que são compartilhadas em todo o projeto. Essas utilidades podem incluir funções de manipulação de data, formatação, validação, gerenciamento de erros, entre outros.
## :sparkles: Características ##

:heavy_check_mark: GraphQL;\
:heavy_check_mark: Prisma;\
:heavy_check_mark: Docker;

## :rocket: Tecnologias ##

The following tools were used in this project:

- [TypeORM](https://typeorm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## :white_check_mark: Requerimentos ##


Antes de iniciar :checkered_flag:, você precisa ter [Git](https://git-scm.com), [Docker](https://www.docker.com/), [Gerenciador de Banco de dados (TablePlus)](https://tableplus.com/) e [Node](https://nodejs.org/en/) instalados.


## :checkered_flag: Criar container no docker ##

<div>
Tenha Docker instalado na maquina, se não tiver instale neste link https://www.docker.com/<br/>
Após baixado e instalado, rodar o comando abaixo
</div>

```bash
$ docker run --name stations -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=stations -p 5432:5432 -d postgres
```

<div>
Este comando irá criar um container com banco de dados postgres
<br/>
Com container criado e gerenciado de dados instalado, so configurar e rodar a aplicação.
</div>

## :checkered_flag: Inicialização ##

```bash
# Clone this project
$ git clone https://github.com/Gui1703/NASA-API

# Access
$ cd NASA-API

# Install dependencies
$ npm i

# Run the migrations
$ npm run migrate

# Run the project
$ npm run dev

# The server will initialize in the <http://localhost:4000>
```


Feito com :heart: by <a href="https://github.com/Gui1703" target="_blank">Guilherme Raposo</a>

&#xa0;

<a href="#top">Ir ao topo</a>
