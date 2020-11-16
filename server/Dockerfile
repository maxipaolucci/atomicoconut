FROM node:14.15-alpine

RUN node -v && npm -v

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 7777

CMD ["npm", "run", "start"]