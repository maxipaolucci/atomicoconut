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