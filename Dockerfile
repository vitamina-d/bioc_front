FROM node:alpine
<<<<<<< HEAD
WORKDIR /frontend
=======
WORKDIR /bioc_front
>>>>>>> 57ba0de4002ba9745e5f850d4a8c37db133db0c8
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev"]
