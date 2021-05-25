FROM node:latest

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install -g npm@latest
RUN npm install

COPY . ./
CMD ["npm", "start"]