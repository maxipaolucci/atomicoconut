#!/bin/bash

# start crontab service
crond

# setup a dummy text file to tail and keep the container running
echo "Cronjobs container started..." >> /var/log/cronjobs.log
echo " " >> /var/log/cronjobs.log

# tail a dummy file to avoid the container to exit
tail -f /var/log/cronjobs.log
