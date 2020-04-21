#!/bin/bash

# get today date in yymmdd format
todayDate=$(date '+%y%m%d')

# capture environment parameter if present
environment="" # Set to "testing" if you're in testing env
if [[ ! -z "$2" ]]; then environment="-$2"; fi
echo "### Environment: $environment"

# compress conf directory in a tar.gz file with today date
sudo tar -czvf certbot-certs-$todayDate.tar.gz conf

# backup/upload tar file to S3 bucket
aws s3 cp ./certbot-certs-$todayDate.tar.gz s3://$1/atomiCoconut$environment/certbot_certs_backups/certbot-certs-$todayDate.tar.gz --sse

# remove local tar.gz file already backup
sudo rm -f certbot-certs-$todayDate.tar.gz
