#!/bin/bash

dt=`date '+%d/%m/%Y_%H:%M:%S'`

echo "Importing files from S3 at $dt..." >> /var/log/cronjobs.log

# not using the $S3_BUCKET env variable because cronjob has issues loading them
/usr/local/bin/aws s3 sync s3://elasticbeanstalk-ap-southeast-2-782522910439/atomiCoconut/logs /aws/s3-logs >> /var/log/cronjobs.log

echo "Files imported successfully." >> /var/log/cronjobs.log
echo " " >> /var/log/cronjobs.log