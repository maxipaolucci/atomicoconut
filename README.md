# atomiCoconut

server/variables.env is not included in the repo. Ask for it
.env is not inclueded in the repo. Ask for it

## SERVER

### Start the server
to start the server dev mode 

docker-compose up

### load DB Data
To load data in a DB

>npm run loadData TO [FROM] (where TO and FROM could be: dev, test, prod . TO is destiny and FROM is origin. FROM is optional, if not present then FROM == TO )

### Delete DB Data
Delete data from DB. This empty the DB . Do a dump before delete data

>npm run deleteData FROM (where FROM could be: dev, test, prod)

### Backup DB data
To backup data from DB

>npm run dumpData FROM (where FROM could be: dev, test, prod)

## CLIENT

### BUILD client app in localhost/dev
to dev angular app (-e to make angular compile with the production environment variables and --watch=true to start the watchers on code changes)

Access the server container
>docker exec -ti [container id] sh

Run one of this options:
>ng build -e=prod --watch=true --poll=1000  (to build using prod environment config file) 
>ng build --watch=true --poll=1000 (to use dev environment config file and watch for changes) 
>ng build (dev mode no watchers)

### BUILD client app in testing
to build for testing environment we do the same as in localhost/dev 

Access the server container
>docker exec -ti [container id] sh

Run:
>ng build

### BUILD client app in production
To test this PROD build in "localhost" we need to change the property NODE_ENV=development to "production" in variables.env

Access the server container
>docker exec -ti [container id] sh

Run:
>ng build --prod --output-hashing=none


## MONGO DB CONTAINER SETUP
If it is the first time we create the mongo db container we need to create the database and a user for it.
- Access the mongo container
  >docker exec -ti [container id] sh
- Initialize mongo command line:
  >mongo --port 27017 -u [mongo_adming_user] -p [mongo_admin_pass] --authenticationDatabase admin
  >mongo --port 27017 -u admin -p mongo --authenticationDatabase admin

- Create a db user is required to connect and manage the db
  
  >use atomicoconut_dev   (this will create the db if it does not exist)

  >db.createUser(
    {
      "user": "[db_dev_user]",
      "pwd": "[db_dev_pass]",
      "roles": [
          {
              "role": "dbOwner",
              "db": "atomicoconut_dev"
          }
      ]
    }
  )

- restart docker services 
  >ctrl+c
  >docker compose up
  
If we want to preload some backup data in it:
- Access the server container
  >docker exec -ti [server container id] sh
- Run:
  >npm run loadData dev dev  (see documentation for load data above).

## ACCESS MONGO EXPRESS UI
- In the browser: localhots:8081

## BRANCH STRATEGY

- master: production branch, it is linked to the prodcution app in heroku
- testing: testing branch, it is linked to the testing app in heroku. This branch comes from master.
- any other branch: are feature branches, they could be linked to the dev app in heroku. This branches should come from testing.

The idea is to create features branches from testing branch, once the feature is done and successfully rebased with testing it can be merged to testing. After testing the app, if all good we can rebase testing with master and merge testing to master, run a production build and push. From here to work in a new or existing feature branch again, we can go to testing, rebase master, run "ng build" push and go to the feature branch (rebase testing if it is an existing branch) and start working again.

master *--*-------*---*---------------*--------*
testing    \*---*/     \*-----------*/
featureBranch            \*--*----*/

master--->testing--->devops
