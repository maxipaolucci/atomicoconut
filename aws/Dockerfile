FROM amazon/aws-cli


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

RUN mkdir -p /aws/s3-logs

VOLUME [ "/root/.aws" ]
VOLUME [ "/aws/s3-logs" ]

# tail the dummy file
ENTRYPOINT [ "sh", "startup.sh" ]