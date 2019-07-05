FROM node:8-alpine as builder

RUN node -v && npm -v

WORKDIR /app

RUN npm install -g @angular/cli@7.0.3

COPY ./package.json ./

RUN npm install

COPY . .

RUN ng build --prod

# This nginx is just for serving the frontend assets
# the other one in the nginx folder is for routing between the client and the server
FROM nginx

# EBS reads this and creates the mapping when starts the container
EXPOSE 4200

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/client /usr/share/nginx/html

#nginx image has its own entrypoint that by default starts nginx server