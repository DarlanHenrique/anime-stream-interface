README

Projeto: Página de Animes com MyAnimeList API

Este é um projeto desenvolvido com React, TypeScript e Vite, que consome dados da API do MyAnimeList para exibir informações sobre animes populares. O objetivo do projeto é proporcionar uma interface amigável e responsiva para que os usuários possam explorar e buscar animes de forma eficiente.

Tecnologias Utilizadas

React

TypeScript

CSS Modules / Styled Components

Axios (ou Fetch API para requisições HTTP)

Funcionalidades

Listagem de Animes:

Exibe os animes mais populares ou recomendados pela API do MyAnimeList.

Busca por Animes:

Permite pesquisar animes pelo nome.

Detalhes do Anime:

Página dedicada para exibir informações detalhadas de um anime selecionado (sinopse, pontuação, gêneros, entre outros).

Instalação

Clone o repositório:

git clone https://github.com/DarlanHenrique/anime-stream-interface.git

Instale as dependências:

npm install

Configure a API Key:

No arquivo .env, adicione sua chave de API do MyAnimeList:

VITE_MYANIMELIST_API_KEY=sua_chave_de_api

Execute o projeto:

npm run dev

Acesse no navegador:

O projeto estará disponível em http://localhost:5173/anime-stream-interface/.

Documento de Requisitos

Requisitos Funcionais

RF01 - Listagem de Animes

O sistema deve exibir uma lista com os animes mais populares fornecidos pela API do MyAnimeList.

RF02 - Busca de Animes

O sistema deve permitir que o usuário pesquise animes pelo nome.

RF03 - Detalhes do Anime

Ao clicar em um anime, o sistema deve exibir informações detalhadas, como:

Título

Sinopse

Gêneros

Pontuação

Número de episódios

Requisitos Não Funcionais

RNF01 - Desempenho

O sistema deve carregar a listagem inicial em até 3 segundos, dependendo da velocidade da conexão.

RNF02 - Responsividade

O sistema deve ser responsivo e funcionar corretamente em dispositivos móveis, tablets e desktops.

RNF03 - Armazenamento Local

Os favoritos devem ser armazenados localmente no navegador usando Local Storage.

RNF04 - Configuração de API

O sistema deve utilizar variáveis de ambiente para armazenar a chave da API.

Regras de Negócio

RN01

Somente animes com pontuação acima de 5 devem ser exibidos na listagem inicial.
