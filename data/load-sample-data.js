require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');
const jsonfile = require('jsonfile');

//get the environment
function specificEnvironment(element) {
  return element === 'dev' || element === 'test' || element === 'prod';
}
let environment = process.argv.find(specificEnvironment) || null;
if (!environment) {
  environment = 'dev';
}

const mongoose = require('mongoose');
if (environment === 'dev'){
  mongoose.connect(process.env.DATABASE);
} else {
  mongoose.connect(process.env[`DATABASE_${environment.toUpperCase()}`]);  
}
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const FinancialInfo = require('../models/FinancialInfo');
const PersonalInfo = require('../models/PersonalInfo');
const User = require('../models/User');
const Team = require('../models/Team');
const TeamUser = require('../models/Team_User');

async function deleteData() {
  console.log(`Started deleting data from ${environment.toUpperCase()}...`);

  try {
    await FinancialInfo.remove();
    console.log(`FinancialInfo table is empty.`)
    await PersonalInfo.remove();
    console.log(`PersonalInfo table is empty.`)
    await TeamUser.remove();
    console.log(`TeamUser table is empty.`)
    await Team.remove();
    console.log(`Team table is empty.`)
    await User.remove();
    console.log(`User table is empty.`)

    console.log('\n\n👍👍👍👍👍👍👍👍 Done!. To load sample data, run\n\n\t npm run loadData [prod|test|dev]\n\n');
    process.exit();
  } catch(e) {
    console.log(`\n\n👎👎👎👎👎👎👎👎 Error! deleting data from \n\n\t ${environment.toUpperCase()} \n\n\n`);
    console.log(e);
    process.exit();
  }
}

async function loadData() {
  
  try {
    console.log(`Started loading data to ${environment.toUpperCase()}...`);

    const financialinfos = jsonfile.readFileSync(`${__dirname}/${environment}/financialinfos.json`);
    const personalinfos = jsonfile.readFileSync(`${__dirname}/${environment}/personalinfos.json`);
    const users = jsonfile.readFileSync(`${__dirname}/${environment}/users.json`);
    const teams = jsonfile.readFileSync(`${__dirname}/${environment}/teams.json`);
    const teamusers = jsonfile.readFileSync(`${__dirname}/${environment}/teamusers.json`);
    
    await User.insertMany(users);
    console.log(`${users.length} Users loaded successfully.`);
    await Team.insertMany(teams);
    console.log(`${users.length} Teams loaded successfully.`);
    await TeamUser.insertMany(teamusers);
    console.log(`${users.length} TeamUsers loaded successfully.`);
    await FinancialInfo.insertMany(financialinfos);
    console.log(`${users.length} FinancialInfos loaded successfully.`);
    await PersonalInfo.insertMany(personalinfos);
    console.log(`${users.length} PersonalInfos loaded successfully.`);

    console.log('\n\n👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log(`\n\n👎👎👎👎👎👎👎👎 Error! loading data to \n\n\t ${environment.toUpperCase()} \n\n\n`);
    console.log(e);
    process.exit();
  }
}

async function dumpData() {
  try {
    console.log(`Started dumping data from ${environment.toUpperCase()}...`);

    const users = await User.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/users.json`, users);
    console.log(`${users.length} Users exported to json successfully.`);

    const teams = await Team.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/teams.json`, teams);
    console.log(`${users.length} Teams exported to json successfully.`);

    const teamusers = await TeamUser.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/teamusers.json`, teamusers);
    console.log(`${users.length} TeamUsers exported to json successfully.`);

    const financialinfos = await FinancialInfo.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/financialinfos.json`, financialinfos);
    console.log(`${users.length} FinancialInfos exported to json successfully.`);

    const personalinfos = await PersonalInfo.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/personalinfos.json`, personalinfos);
    console.log(`${users.length} PersonalInfos exported to json successfully.`);

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
  loadData();
} else {
  dumpData();
}