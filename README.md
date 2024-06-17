# AppSubCtrl
É possível rodar o projeto com docker compose ou provendo um banco de dados mysql.

## Para rodar o projeto com docker compose, siga as instruções abaixo.

Para rodar o projeto é necessário ter o docker e docker-compose instalados.
Caso não tenha, siga as instruções em: https://docs.docker.com/get-docker/ e
https://docs.docker.com/compose/install/

```bash
$ docker compose up --build -d 
```

## Populando o banco

```bash
docker exec nestjs-container npm run seed
```


## Para rodar o projeto sem docker compose, siga as instruções abaixo.
Insira as configurações do banco de dados no arquivo config.json

Posteriormente execute os comandos abaixo:

### Instalando as dependências 
```bash
$ npm install
```

### Rodando o projeto
```bash
$ npm start 
```

## Populando o banco

```bash
npm run seed
```

## Testar a aplicação

Para testar, importe o arquivo `AppSubCtrl.postman.collection.json` no Insomnia ou Postman e teste as rotas disponíveis.
Todos os requisitos foram implementados confoerme solicitado.
Fique a vontade para navegar pelo código e verificar a implementação.

