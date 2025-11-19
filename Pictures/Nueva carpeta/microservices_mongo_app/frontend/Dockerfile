FROM node:18-alpine
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el frontend
COPY . .

# Exponer puerto del servidor de desarrollo de Vite
EXPOSE 3000

# Ejecutar Vite en modo dev accesible desde Docker
CMD ["npm","run","dev","--","--host","0.0.0.0","--port","3000"]
