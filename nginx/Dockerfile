# check lesson 128 that explains why this project has two nginx images. 
# The other one in client folder is just for serving the frontend assets
# This one one in the nginx folder is for routing between the client and the server
FROM nginx

COPY ./prod.conf /etc/nginx/conf.d/default.conf