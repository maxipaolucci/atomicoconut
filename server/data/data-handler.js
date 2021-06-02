// require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');
const jsonfile = require('jsonfile');

// db collections. Add any new collection in the DB to this array
const collections = [
  'FinancialInfo',
  'PersonalInfo',
  'User',
  'Team',
  'Team_User',
  'Investment',
  'CurrencyInvestment',
  'PropertyInvestment',
  'Property',
  'PropertyAdditionalInfo',
  'House',
  'CurrencyRate',
  'Property_User',
  'UserSetting'
];

//get the environment
function specificEnvironment(element) {
  return element === 'dev' || element === 'test' || element === 'prod';
}
let environment = process.argv.find(specificEnvironment) || null;
if (!environment) {
  environment = 'dev';
}

console.log(`Environment: ${environment}`);
const mongoose = require('mongoose');
if (environment === 'dev'){
  mongoose.connect(process.env.DATABASE, { 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false 
  });
} else {
  mongoose.connect(process.env[`DATABASE_${environment.toUpperCase()}`], { 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false 
  });  
}
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// let collections = null;
// mongoose.connection.on('open', (ref) => {
//   console.log('Connected to mongo server.');
//   //trying to get collection names
//   mongoose.connection.db.listCollections().toArray((err, names) => {
//       console.log(names); // [{ name: 'dbname.myCollection' }]
//       collections = names;
//       // module.exports.Collection = names;
//   });
// });

// import all of our models - they need to be imported only once
const collectionMap = {}
collections.forEach(collectionName => {
  collectionMap[collectionName] = require(`../models/${collectionName}`);
});


async function deleteData() {
  console.log(`Started deleting data from ${environment.toUpperCase()}...`);

  try {
    for (const collectionName of collections) {
      await collectionMap[collectionName].deleteMany({});
      console.log(`${collectionName} table is empty.`);
    }

    console.log('\n\n👍👍👍👍👍👍👍👍 Done!. To load sample data, run\n\n\t npm run loadData [prod|test|dev]\n\n');
    process.exit();
  } catch(e) {
    console.log(`\n\n👎👎👎👎👎👎👎👎 Error! deleting data from \n\n\t ${environment.toUpperCase()} \n\n\n`);
    console.log(e);
    process.exit();
  }
}

async function loadData(source = 'dev') {
  
  try {
    console.log(`Started loading data to ${environment.toUpperCase()} from ${source.toUpperCase()}...`);

    for (const collectionName of collections) {
      const data = jsonfile.readFileSync(`${__dirname}/${source}/${collectionName}.json`);

      if (data.length) {
        await collectionMap[collectionName].insertMany(data);
        console.log(`${data.length} ${collectionName} loaded successfully.`);
      }
    }
    
    console.log('\n\n👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log(`\n\n👎👎👎👎👎👎👎👎 Error! loading data to \n\n\t ${environment.toUpperCase()} from ${source.toUpperCase()} \n\n\n`);
    console.log(e);
    process.exit();
  }
}

async function dumpData() {
  try {
    console.log(`Started dumping data from ${environment.toUpperCase()}...`);
    for (const collectionName of collections) {
      const data = await collectionMap[collectionName].find({}, { __v : false });
      jsonfile.writeFileSync(`${__dirname}/${environment}/${collectionName}.json`, data);
      console.log(`${data.length} ${collectionName} exported to json successfully.`);
    }
    
    console.log(`\n\n👍👍👍👍👍👍👍👍 Done!. To load the data, run\n\n\t npm run loadData [prod|test|dev]\n\n`);
    process.exit();
  } catch(e) {
    console.log(`\n\n👎👎👎👎👎👎👎👎 Error! dumping data from \n\n\t ${environment.toUpperCase()} \n\n\n`);
    console.log(e);
    process.exit();
  }
}



if (process.argv.includes('--delete')) {
  deleteData();
} else if (process.argv.includes('--load')) {
  let source = environment;
  if (process.argv.length > 4 && ['dev', 'test', 'prod'].includes(process.argv[4])) {
    source = process.argv[4];
  }
  
  loadData(source);
} else if (process.argv.includes('--dump')){
  dumpData();
}