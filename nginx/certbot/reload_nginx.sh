#!/bin/bash

#this is used to restart the container
nginxImageTag="latest"
if [[ "$1" == "testing"  ]]; then
  nginxImageTag="testing"
fi

echo "### Reloading nginx ..."
nginx_container_name=$(docker ps | grep atomic-coconut-nginx:$nginxImageTag | awk '{print $NF}')
echo "NGINX container name: $nginx_container_name"

docker exec $nginx_container_name nginx -s reload
