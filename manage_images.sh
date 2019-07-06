#!/bin/bash

# docker build -t $DOCKER_ID/atomic-coconut-client:$TRAVIS_BRANCH ./client
# docker build -t $DOCKER_ID/atomic-coconut-nginx:$TRAVIS_BRANCH ./nginx
# docker build -t $DOCKER_ID/atomic-coconut-server:$TRAVIS_BRANCH ./server

# if [ "$TRAVIS_BRANCH" == "devops" ]; then
#   echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
#   docker push $DOCKER_ID/atomic-coconut-client:$TRAVIS_BRANCH
#   docker push $DOCKER_ID/atomic-coconut-nginx:$TRAVIS_BRANCH
#   docker push $DOCKER_ID/atomic-coconut-server:$TRAVIS_BRANCH
# fi

sed -i 's?atomic-coconut-client?atomic-coconut-client:$TRAVIS_BRANCH?' Dockerrun.aws.json
sed -i 's?atomic-coconut-client?atomic-coconut-server:$TRAVIS_BRANCH?' Dockerrun.aws.json
sed -i 's?atomic-coconut-client?atomic-coconut-nginx:$TRAVIS_BRANCH?' Dockerrun.aws.json

cat Dockerrun.aws.json