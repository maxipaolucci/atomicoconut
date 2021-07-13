# ELK STACK

## Start local stack 
> `docker compose up [--build]`

## Testing logstash configuration file
1) Start logstash container
  Option a) run the whole docker compose at the heavy cost of starting all the detailed containers
  Option b) Start just the logstash container (open terminal in this directory) and run >`docker run --rm --name logstash_cont -v ``pwd``/logstash:/usr/share/logstash/pipeline docker.elastic.co/logstash/logstash:7.12.0`

2) 
  2.1) Access the logstash container: >`docker exec -ti logstash_cont /bin/bash`
  2.2) Run >`bin/logstash --config.test_and_exit -f /usr/share/logstash/pipeline/acserver.conf`
  2.3) wait for the results (this could take long, be patient)

## remove all indices from elasticsearch
1) manually remove the indices in ES
  > `GET /_cat/indices`  -- to list all the indices 
  > `DELETE /index_name` -- to remove an index

2) Stop the stack containers (filebeat and logstash) if running CTRL+C
3) Empty the elk/filebeat/data dir
4) Start the containers 
  > `docker compose up`