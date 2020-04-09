# atomiCoconut

## HTTPS instructions

https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

1) Go to S3 bucket and manually upload:
  - ./request_letsencrypt_certs.sh
  - ./nginx/conf-certbot.zip files
  NOTE: give to them public permission to read 

2) Inside my EC2 instance in home dir (/home/ec2-user) do:
> wget https://elasticbeanstalk-ap-southeast-2-782522910439.s3-ap-southeast-2.amazonaws.com/atomiCoconut-testing/certbot/request_letsencrypt_certs.sh
> wget https://elasticbeanstalk-ap-southeast-2-782522910439.s3-ap-southeast-2.amazonaws.com/atomiCoconut-testing/certbot/conf-certbot.zip
> sudo rm -rf conf
> unzip conf-certbot.zip

3) In S3 do
- remove read permission for public to both files mention avobe

4) Trigger Deployment

5) Installed docker compose: 
> sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
> sudo chmod +x /usr/local/bin/docker-compose
> sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
> docker-compose --version   (check installation)

6) run: 
>sh request_letsencrypt_certs.sh 


docker compose file used (I have to add this to step 1, and upload it to S3)
version: '3'
services:
  certbot:
    image: certbot/certbot
    volumes:
    - /home/ec2-user/conf:/etc/letsencrypt
    - /home/ec2-user/www:/var/www/certbot 