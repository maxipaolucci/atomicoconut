# The other one in client folder is just for serving the frontend assets
# This one one in the nginx folder is for routing between the client and the server
FROM nginx

RUN apt update && apt install -y telnet curl iputils-ping traceroute htop net-tools vim

# this replacement is to allow nginx read the dummy certificate from letsencrypt
RUN sed -i 's?CipherString = DEFAULT@SECLEVEL=2?CipherString = DEFAULT@SECLEVEL=1?g' /etc/ssl/openssl.cnf

COPY ./prod.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443
