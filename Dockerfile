# 🏗️ Usando a versão estável do Node
FROM node:20

# 📂 Definindo o canteiro de trabalho
WORKDIR /usr/src/app

# 📦 Copiando os manifestos de suprimentos
COPY package*.json ./

# 🛠️ Instalando dependências (incluindo o cross-env que está em dependencies)
RUN npm install --omit=dev

# 🚚 Copiando o restante dos materiais da obra
COPY . .

# 🔌 Porta padrão (Lembre-se: o host pode sobrescrever isso com process.env.PORT)
EXPOSE 3000

# 🚀 Iniciando com o script oficial do seu package.json
CMD ["npm", "start"]