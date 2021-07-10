FROM amazon/aws-cli


# isntall crontab
RUN yum install -y cronie sudo

# start crontab on boot
RUN chkconfig crond on

RUN echo "*/1 * * * * sh /aws/cronjob.sh" >> mycron
# RUN echo "*/1 * * * * sh /aws/cronjob.sh" >> mycron
RUN crontab mycron
RUN rm mycron

COPY run.sh /aws/run.sh
COPY cronjob.sh /aws/cronjob.sh
RUN chmod -x /aws/*.sh

# RUN sudo systemctl status crond.service
# setup a dummy text file to tail and keep the container running
RUN echo "this is an aws image with aws cli to run a cron that pulls logs from s3..." >> /tmp/dummy.txt
RUN chmod 777 /tmp/dummy.txt


VOLUME [ "/root/.aws" ]

# tail the dummy file
ENTRYPOINT [ "sh", "run.sh" ]