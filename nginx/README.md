# HTTPS instructions

Implementation guide: https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

## Requirements

### Docker compose
EC2: Install docker compose if not present in the instance: 
> sudo curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-`uname -s`-`uname -m` | sudo tee /usr/local/bin/docker-compose > /dev/null
> sudo chmod +x /usr/local/bin/docker-compose
> sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
> docker-compose --version   (check installation)

## Steps to configure certificates in EC2 for the fist time in the instance

1) S3: If file is not there /[bucket_name]/certbot/conf-certbot.zip go to bucket and manually upload:
  - ./nginx/certbot/conf-certbot.zip

2) EC2: If conf-certbot.zip is not already in the instance and unzipped in home dir (/home/ec2-user) do:
> aws s3 cp s3://elasticbeanstalk-ap-southeast-2-782522910439/certbot/conf-certbot.zip conf-certbot.zip 
> sudo rm -rf conf
> sudo rm -rf www
> unzip conf-certbot.zip

4) TRAVIS-CI: Trigger Deployment

5) EC2: run: 
>sh request_letsencrypt_certs.sh [staging] [testing]

### Params values:
staging: 0 or 1 (use 1 when testing the script to avoid the limit rate on letsencrypt)
environment: leave empty for prod or "testing" for testing environment

7) EC2: Start cerbot renew process in docker-compose
>sh start_certbot_renew.sh

8) EC2: setup job to automatically backup certificates in S3
We will use the script backup_certbot_certs.sh in conf-certbot_certs

Edit EC2 cronjobs
> crontab -e

Write the following, save and quit (:wq)
### For backups every thursday at 00:00
0 0 * * 4 sh backup_certbot_certs.sh [bucket_name] [environment]
0 */6 * * * sh reload_nginx.sh [environment]

### Param values:
bucket_name: the bucket name in AWS S3
environment: leave empty for prod or "testing" for testing environment

### NOTE: To test cronjobs replace the above expression with */1 * * * *  to run it every minute

Check cronjob was created and started
> crontab -l

Check cronjobs logs 
> cat /var/spool/mail/ec2-user


## Steps to restore certificates in EC2 from a backup

1) EC2: If conf-certbot.zip is not already in the instance and unzipped in home dir (/home/ec2-user) do:
> aws s3 cp s3://elasticbeanstalk-ap-southeast-2-782522910439/certbot/conf-certbot.zip conf-certbot.zip 
> sudo rm -rf conf
> sudo rm -rf www
> unzip conf-certbot.zip

2) EC2: run: 
>aws s3 cp s3://elasticbeanstalk-ap-southeast-2-782522910439/atomiCoconut[environment]/certbot_certs_backups/certbot-certs-[date].tar.gz .
>tar -xzvf certbot-certs-[date].tar.gz
>sh reload_nginx.sh [environment]

### Param values:
date: the date of the backup to restore in yymmdd format
environment: leave empty for prod or "-testing" for testing environment
