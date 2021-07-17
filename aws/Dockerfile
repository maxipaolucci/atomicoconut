FROM amazon/aws-cli:2.2.20
# latest version tested


# isntall crontab
RUN yum install -y cronie sudo which

# start crontab on boot
RUN chkconfig crond on

RUN echo "*/1 * * * * sh /aws/cronjob.sh" >> mycron
RUN crontab mycron
RUN rm mycron

# this script is for startup of the container
COPY startup.sh /aws
# this script defines what this cronjob does
COPY cronjob.sh /aws
# exec permissions
RUN chmod -x /aws/*.sh

RUN mkdir -p /aws/s3-logs/server/production
RUN mkdir -p /aws/s3-logs/server/testing
RUN mkdir -p /aws/s3-logs/nginx/production
RUN mkdir -p /aws/s3-logs/nginx/testing

VOLUME [ "/root/.aws" ]
VOLUME [ "/aws/s3-logs" ]

# tail the dummy file
ENTRYPOINT [ "sh", "startup.sh" ]