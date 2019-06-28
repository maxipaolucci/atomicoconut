# Access my EC2 instance from SSH console
Mac
ssh -i [key-pair.pem] ec2-user@[ec2 instance public dns]

Windows
1- enable port TCP 22 in VPC group for ElastikBeanStalk env
2- create a key pair in the EC2 instance
3- in ElasticBeanStalk configuration go to security. In section VM permissions select the keypair created in EC2 and assign to the aws-elastikbeanstalk-ec2-role and save
4- the step 2 will automatically download a keypair.pem file. We need to convert it into a ppk file. In windows use Puttygen that is installed when installing putty.msi version. Open the pem file with puttygen and save as private key.
5- use this ppk file in putty in seccion Connection > ssh > auth
6- putty config here https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html . Disregard anything related with stopping ec2 instance and stuff

# Setup mongo db from console on a DocumentDB cluster
1- Connect to ElastikBeanStalk console
2- Run nc -zv clusterEndpoint clusterPort to ckeck connection to the db cluster. If fail probably need to create
  a VPC security group allowing trafic in db port an assign in to ElastikBeanStalk env and db instance. Must be assinged to both entities.
  e.g.: nc -zv docdb-2017-03-23-05-16-34.cluster.cat2dl1zdckp.ap-southeast-2.docdb.amazonaws.com 27017
3- Run a mongo container >docker run --name mongo -d mongo:3.6
4- Get into container shell >docker exec -ti mongo sh
5- Download certificate DocumentDb:
  >apt update
  >apt install -y wget
  >wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem
6) Connect to mongo shell:
  >mongo --ssl --host docdb-2017-03-23-05-16-34.cat2dl1zdckp.ap-southeast-2.docdb.amazonaws.com:27017           --sslCAFile rds-combined-ca-bundle.pem --username pepito --password pepito123
7- once there create the db
8- create a user for the db
9- Remove the mongo container and image or leave it there to use it in the future but stop it