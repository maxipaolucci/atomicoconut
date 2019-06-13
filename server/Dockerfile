FROM node:8-alpine

RUN node -v && npm -v

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]