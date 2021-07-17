#!/bin/bash

IMAGE_TAG='latest'
DOCKERFILE_CLIENT='Dockerfile'
DOCKERFILE_NGINX='Dockerfile'
if [ "$CURRENT_BRANCH" != "master" ]; then
  IMAGE_TAG=$CURRENT_BRANCH

  if [[ "$CURRENT_BRANCH" == "testing" ]]; then
    DOCKERFILE_CLIENT='Dockerfile.testing'
    DOCKERFILE_NGINX='Dockerfile.testing'
  fi
fi

echo
echo "Current branch: $CURRENT_BRANCH -- Images tag: $IMAGE_TAG -- Dockerfile client: $DOCKERFILE_CLIENT"
echo

if [[ "$CURRENT_BRANCH" == "master" || "$CURRENT_BRANCH" == "testing" ]]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
  
  docker build -t $DOCKER_ID/atomic-coconut-client:$IMAGE_TAG -f ./client/$DOCKERFILE_CLIENT ./client
  docker build -t $DOCKER_ID/atomic-coconut-nginx:$IMAGE_TAG -f ./nginx/$DOCKERFILE_NGINX ./nginx
  docker build -t $DOCKER_ID/atomic-coconut-server:$IMAGE_TAG ./server
  
  docker push $DOCKER_ID/atomic-coconut-client:$IMAGE_TAG
  docker push $DOCKER_ID/atomic-coconut-nginx:$IMAGE_TAG
  docker push $DOCKER_ID/atomic-coconut-server:$IMAGE_TAG
  
  # replace the image names with this one with the current branch as tag
  sed -i "s?atomic-coconut-client?atomic-coconut-client:$IMAGE_TAG?" docker-compose-beanstalk.yml
  sed -i "s?atomic-coconut-server?atomic-coconut-server:$IMAGE_TAG?" docker-compose-beanstalk.yml
  sed -i "s?atomic-coconut-nginx?atomic-coconut-nginx:$IMAGE_TAG?" docker-compose-beanstalk.yml

else
  echo
  echo "Image push is skipped in branch '$CURRENT_BRANCH'. Only 'master' and 'testing' branches push images to Dockerhub"
  echo
fi