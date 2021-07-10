#!/bin/bash

# start crontab service
crond

# tail a dummy file to avoid the container to exit
tail -f /tmp/dummy.txt
