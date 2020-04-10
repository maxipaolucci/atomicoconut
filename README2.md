# atomiCoconut

## HTTPS instructions

https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

1) S3: Go to bucket and manually upload:
  - ./nginx/conf-certbot.zip files
  NOTE: give to them public permission to read 

2) EC2: Inside my instance in home dir (/home/ec2-user) do:
> wget https://elasticbeanstalk-ap-southeast-2-782522910439.s3-ap-southeast-2.amazonaws.com/certbot/conf-certbot.zip
> sudo rm -rf conf
> sudo rm -rf www
> unzip conf-certbot.zip

3) S3: do
- remove read permission for public to both files mention avobe

4) TRAVIS-CI: Trigger Deployment

5) EC2: Install docker compose if not present: 
> sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
> sudo chmod +x /usr/local/bin/docker-compose
> sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
> docker-compose --version   (check installation)

docker compose file used (I have to add this to step 1, and upload it to S3)
version: '3'
services:
  certbot:
    image: certbot/certbot
    volumes:
    - /home/ec2-user/conf:/etc/letsencrypt
    - /home/ec2-user/www:/var/www/certbot 

6) EC2: run: 
>sh request_letsencrypt_certs.sh [staging 0 or 1(for testing)] [testing]



7) EC2: backup certs:

> sudo tar -czvf certbot-certs-[date].tar.gz conf

Pending
8) Upload backup certs to s3 bucket
https://aws.amazon.com/premiumsupport/knowledge-center/ec2-instance-access-s3-bucket/

9) setup upto renewal of certs

10) setup job to automatically backup certificates in S3