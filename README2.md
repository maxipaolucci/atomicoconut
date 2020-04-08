# atomiCoconut

## HTTPS instructions

https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

## Go to S3 bucket and manually upload:
- ./request_letsencrypt_certs.sh
- ./nginx/conf-certbot.zip files
NOTE: give to them public permission to read 

## Inside my EC2 instance do home dir (/home/ec2-user):
> wget https://elasticbeanstalk-ap-southeast-2-782522910439.s3-ap-southeast-2.amazonaws.com/atomiCoconut-testing/certbot/request_letsencrypt_certs.sh
> wget https://elasticbeanstalk-ap-southeast-2-782522910439.s3-ap-southeast-2.amazonaws.com/atomiCoconut-testing/certbot/conf-certbot.zip
> sudo rm -rf conf
> unzip conf-certbot.zip

## In S3
remove read permission for public to both files mention avobe



