FROM node:20-alpine
LABEL authors="sparshneel"

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 80

RUN npm run start