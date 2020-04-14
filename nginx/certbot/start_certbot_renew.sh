#!/bin/bash

# this script is to rename the docker-compose-renew.yml file to docker-compose.yml and start certbot to check for certificates renewal
mv docker-compose.yml docker-compose.yml.bkp
mv docker-compose-renew.yml docker-compose.yml

docker-compose up -d