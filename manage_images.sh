#!/bin/bash

IMAGE_TAG='latest'
if [ "$TRAVIS_BRANCH" -ne "master" ]; then
  IMAGE_TAG=$TRAVIS_BRANCH
fi

echo "Current branch: $TRAVIS_BRANCH -- Images tag: $IMAGE_TAG"

docker build -t $DOCKER_ID/atomic-coconut-client:$IMAGE_TAG ./client
docker build -t $DOCKER_ID/atomic-coconut-nginx:$IMAGE_TAG ./nginx
docker build -t $DOCKER_ID/atomic-coconut-server:$IMAGE_TAG ./server

if [ "$TRAVIS_BRANCH" == "devops" ]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
  docker push $DOCKER_ID/atomic-coconut-client:$IMAGE_TAG
  docker push $DOCKER_ID/atomic-coconut-nginx:$IMAGE_TAG
  docker push $DOCKER_ID/atomic-coconut-server:$IMAGE_TAG

  # replace the image names with this one with the current branch as tag
  sed -i "s?atomic-coconut-client?atomic-coconut-client:$IMAGE_TAG?" Dockerrun.aws.json
  sed -i "s?atomic-coconut-server?atomic-coconut-server:$IMAGE_TAG?" Dockerrun.aws.json
  sed -i "s?atomic-coconut-nginx?atomic-coconut-nginx:$IMAGE_TAG?" Dockerrun.aws.json
fi