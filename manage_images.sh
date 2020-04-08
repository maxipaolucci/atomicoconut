#!/bin/bash

IMAGE_TAG='latest'
DOCKERFILE_CLIENT='Dockerfile'
DOCKERFILE_NGINX='Dockerfile'
if [ "$TRAVIS_BRANCH" != "master" ]; then
  IMAGE_TAG=$TRAVIS_BRANCH

  if [[ "$TRAVIS_BRANCH" == "testing" ]]; then
    DOCKERFILE_CLIENT='Dockerfile.testing'
    DOCKERFILE_NGINX='Dockerfile.testing'
  fi
fi

echo
echo "Current branch: $TRAVIS_BRANCH -- Images tag: $IMAGE_TAG -- Dockerfile client: $DOCKERFILE_CLIENT"
echo

docker build -t $DOCKER_ID/atomic-coconut-client:$IMAGE_TAG -f ./client/$DOCKERFILE_CLIENT ./client
docker build -t $DOCKER_ID/atomic-coconut-nginx:$IMAGE_TAG -f ./nginx/$DOCKERFILE_NGINX ./nginx
docker build -t $DOCKER_ID/atomic-coconut-server:$IMAGE_TAG ./server

if [[ "$TRAVIS_BRANCH" == "master" || "$TRAVIS_BRANCH" == "testing" ]]; then
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
  docker push $DOCKER_ID/atomic-coconut-client:$IMAGE_TAG
  docker push $DOCKER_ID/atomic-coconut-nginx:$IMAGE_TAG
  docker push $DOCKER_ID/atomic-coconut-server:$IMAGE_TAG

  # replace the image names with this one with the current branch as tag
  sed -i "s?atomic-coconut-client?atomic-coconut-client:$IMAGE_TAG?" Dockerrun.aws.json
  sed -i "s?atomic-coconut-server?atomic-coconut-server:$IMAGE_TAG?" Dockerrun.aws.json
  sed -i "s?atomic-coconut-nginx?atomic-coconut-nginx:$IMAGE_TAG?" Dockerrun.aws.json
  git commit -am "updated images tags in Dockerrun.aws.json by Travis job in manage_images.sh"
else
  echo
  echo "Image push is skipped in branch '$TRAVIS_BRANCH'. Only 'master' and 'testing' branches push images to Dockerhub"
  echo
fi