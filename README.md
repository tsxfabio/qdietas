# QDietas

### Objetivo
Este projeto tem como objetivo o desenvolvimento e aperfeiçoamento de habilidades técnicas, com foco na criação do backend do aplicativo Qdietas. O objetivo é construir uma API robusta e escalável que suporte as funcionalidades essenciais do sistema de gerenciamento de dietas.

## Requisitos Não Funcionais
- [ ]  A aplicação deve ser desenvolvida utilizando [NodeJS](https://nodejs.org/)
- [ ]  A aplicação deve utilizar o framework [Fastify](https://fastify.dev/) para gerenciamento das rotas e requisições
- [ ]  A aplicação deve utilizar o [Prisma](https://www.prisma.io/) como ORM (Object-Relational Mapping) para interagir com o banco de dados
- [ ]  A aplicação deve utilizar o banco de dados [MySQL](https://www.mysql.com/)

## Regras de Negócio
- [ ]  As refeições devem ser relacionadas a um usuário
- [ ]  O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Requisitos Funcionais
- [ ]  Deve ser possível criar um usuário
- [ ]  Deve ser possível identificar o usuário entre as requisições
- [ ]  Deve ser possível registrar uma refeição feita, com as seguintes informações:
    - [ ]  Nome
    - [ ]  Descrição
    - [ ]  Data e Hora
    - [ ]  Está dentro ou não da dieta
- [ ]  Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ]  Deve ser possível apagar uma refeição
- [ ]  Deve ser possível listar todas as refeições de um usuário
- [ ]  Deve ser possível visualizar uma única refeição
- [ ]  Deve ser possível recuperar as métricas de um usuário
    - [ ]  Quantidade total de refeições registradas
    - [ ]  Quantidade total de refeições dentro da dieta
    - [ ]  Quantidade total de refeições fora da dieta
    - [ ]  Melhor sequência de refeições dentro da dieta