FROM node:alpine
WORKDIR /bioc_front
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev"]
