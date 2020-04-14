#!/bin/bash

# start command and automatically releoad every 6 hours 
while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"