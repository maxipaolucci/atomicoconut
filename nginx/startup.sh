#!/bin/bash

# start crontab service
service cron start

# start nginx
nginx -g "daemon off;"
