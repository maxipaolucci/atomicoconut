# HTTPS instructions

Implementation guide: https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

## Steps

1) S3: If file is not there go to bucket and manually upload:
  - ./nginx/certbotconf-certbot.zip

2) EC2: Inside my instance in home dir (/home/ec2-user) do:
> aws s3 cp s3://elasticbeanstalk-ap-southeast-2-782522910439/certbot/conf-certbot.zip conf-certbot.zip 
> sudo rm -rf conf
> sudo rm -rf www
> unzip conf-certbot.zip

4) TRAVIS-CI: Trigger Deployment

5) EC2: Install docker compose if not present in the instance: 
> sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
> sudo chmod +x /usr/local/bin/docker-compose
> sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
> docker-compose --version   (check installation)

6) EC2: run: 
>sh request_letsencrypt_certs.sh [staging] [testing]

### Params values:
staging: 0 or 1 (use 1 when testing the script to avoid the limit rate on letsencrypt)
environment: leave empty for prod or "testing" for testing environment

7) EC2: setup job to automatically backup certificates in S3
We will use the script backup_certbot_certs.sh in conf-certbot_certs

Edit EC2 cronjobs
> crontab -e

Write the following, save and quit (:wq)
### For backups every thursday at 00:00
0 0 * * 4 sh backup_certbot_certs.sh [bucket_name] [environment]

### Param values:
bucket_name: the bucket name in AWS S3
environment: leave empty for prod or "testing" for testing environment

### NOTE: To test cronjobs replace the above expression with */1 * * * *  to run it every minute

Check cronjob was created and started
> crontab -l

Check cronjobs logs 
> cat /var/spool/mail/ec2-user

8) setup for certs renewal automatically
