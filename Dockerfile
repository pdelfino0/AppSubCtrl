# Use a imagem Node.js como base
FROM node:lts-buster

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Comando padrão para iniciar a aplicação
CMD ["sh", "-c", "npm run start "]
