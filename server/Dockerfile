FROM node:14.15-alpine

# for telnet and curl
RUN apk update && apk add busybox-extras curl

RUN node -v && npm -v

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

# nodejs server
EXPOSE 7777
# xray daemon
EXPOSE 2000

CMD ["npm", "run", "start"]