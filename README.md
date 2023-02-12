<h1>Orange Evolution - Squad30</h1> 

<p align="center">
  <img src="./docs/projeto.png"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white"/><br>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
</p>

> Status do Projeto:  Em Desenvolvimento :warning:

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto-page_with_curl)

:small_blue_diamond: [Funcionalidades](#funcionalidades-heavy_check_mark)

:small_blue_diamond: [Funcionalidades em aberto](#funcionalidades-em-aberto-warning)

:small_blue_diamond: [Deploy da Aplicação](#deploy-da-aplicação-dash)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos-ok)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

:small_blue_diamond: [Casos de uso](#casos-de-uso-arrow_forward)

:small_blue_diamond: [Dependencias e tecnologias](#dependencias-e-tecnologias-computer)

:small_blue_diamond: [Desenvolvedores e contribuintes](#desenvolvedores-e-contribuintes-octocat) 

:small_blue_diamond: [Licença](#licença-trophy)

... 

## Descrição do projeto :page_with_curl: 

<p align="justify">
  Projeto desenvolvido na Hackathon do Programa de Formação Season 4 da FCamara. A aplicação é uma plataforma de estudos que contribui na formação de profissionais, a Orange Evolution. Onde alunos cadastrados tem acesso a conteúdos gratuitos de uma forma intuitiva e personalizável. 
</p>

## Funcionalidades :heavy_check_mark:

- [X] Cadastro de usuários
- [X] Login de usuários com conteúdo personalizado de acordo com a trilha escolhida
- [X] Barra de progresso que permite o acompanhamento dos conteudos estudados 
- [X] Edição do perfil do usuário
- [X] Permite que o administrador adcione e exclua os conteudos das trilhas
- [X] Conteúdo atualizado dinamicamente
- [X] Alteração de layout de forma dinâmica através da responsividade


## Funcionalidades em aberto :warning:

- [ ] Cadastro de novos administradores
- [ ] Barra de pesquisa de conteúdo filtrado por: área, autor, tipo
- [ ] Certificado Digital de Segurança
- [ ] Elementos de interação social com área de comentários e curtidas


## Deploy da Aplicação :dash:

> http://orangeevolution-squad30.up.railway.app/

... 

## Pré-requisitos :ok:

[Node](https://nodejs.org/en/download/) :warning: 

...

## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/squad-30/OrangeEvolution-Squad30.git
```
Entre na pasta do projeto: 

```
cd OrangeEvolution-squad30
```
Instale as dependências: 

```
npm install
```
Execute a aplicação: 

```
npm start
```
Pronto, agora é possivel acessar a aplicação a partir da rota: https://localhost:3000/

... 

## Casos de uso :arrow_forward:

<img src="./docs/projeto.gif" />

Por favor, acessar com os respectivos usuário e admnistrador que foram previamente cadastrados no banco de dados.

### Usuário: 

|name|email|password|
| -------- |-------- |-------- |
|Arthur|arthur@arthur.com|123456|

### Administrador: 

|name|email|password|
| -------- |-------- |-------- |
|Lucyan|lucyan@lucyan.com|123456|

...

## Modelagem do banco de dados

<img src="./docs/img/database-diagram.png" />

... 

## Dependencias e tecnologias :computer:

- [NODE](https://nodejs.org/en/)
- [EXPRESS](https://expressjs.com/pt-br/)
- [SQLITE](https://www.sqlite.org/index.html)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)

...

## Desenvolvedores e Contribuintes :octocat:

| [<img src="https://avatars.githubusercontent.com/u/88115781?v=4" width=115><br><sub>Arthur de Melo</sub>](https://github.com/artdemelo) |  [<img src="https://avatars.githubusercontent.com/u/106949997?v=4" width=115><br><sub>Lucyan Ovídio</sub>](https://github.com/lucyanovidio) |  [<img src="https://avatars.githubusercontent.com/u/117302308?v=4" width=115><br><sub>Rosana Marques</sub>](https://github.com/rosanadeveloper) |  [<img src="https://media-exp1.licdn.com/dms/image/C4E03AQG7T8ev1lBF1A/profile-displayphoto-shrink_800_800/0/1516673087717?e=1674086400&v=beta&t=8iLeX4sXaURp7RYKwuMQuPlqi2WCS0gQVylONn3gaN4" width=115><br><sub>Juliana Lopes</sub>](https://www.linkedin.com/in/julianalopesco/) |
| :---: | :---: | :---: | :---: 

## Licença :trophy:

The [MIT License](./LICENSE) (MIT)

Copyright :copyright: 2022 - Orange Evolution - Squad30
