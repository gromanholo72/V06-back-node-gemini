FROM node:20-slim

WORKDIR /usr/src/app

# Copia apenas os manifestos primeiro (Cache inteligente)
COPY package.json package-lock.json* ./

# Instala tudo, incluindo o cross-env
RUN npm install

# Copia o resto
COPY . .

# Garante que o arquivo server.js tenha permissão de leitura
RUN chmod +x server.js

EXPOSE 3000

# Tente rodar direto para testar se o problema é o npm
CMD ["node", "server.js"]