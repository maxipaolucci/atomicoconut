require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');
const jsonfile = require('jsonfile');

//get the environment
function specificEnvironment(element) {
  return element === 'dev' || element === 'test' || element === 'prod';
}
const environment = process.argv.find(specificEnvironment) || null;
if (!environment) {
  environment = 'DEV';
} else {
  environment = environment.toUpperCase();
}

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const FinancialInfo = require('../models/FinancialInfo');
const PersonalInfo = require('../models/PersonalInfo');
const User = require('../models/User');
const Team = require('../models/Team');
const TeamUser = require('../models/Team_User');

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await FinancialInfo.remove();
  await PersonalInfo.remove();
  await TeamUser.remove();
  await Team.remove();
  await User.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run loadData\n\n');
  process.exit();
}

async function loadData() {
  
  try {
    const financialinfos = jsonfile.readFileSync(__dirname + '/financialinfos.json');
    const personalinfos = jsonfile.readFileSync(__dirname + '/personalinfos.json');
    const users = jsonfile.readFileSync(__dirname + '/users.json');
    const teams = jsonfile.readFileSync(__dirname + '/teams.json');
    const teamusers = jsonfile.readFileSync(__dirname + '/teamusers.json');
  
    await User.insertMany(users);
    await Team.insertMany(teams);
    await TeamUser.insertMany(teamusers);
    await FinancialInfo.insertMany(financialinfos);
    await PersonalInfo.insertMany(personalinfos);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}

async function dumpData() {
  try {
    const users = await User.find({}, { __v : false });
    jsonfile.writeFileSync(__dirname + '/users.json', users);

    const teams = await Team.find({}, { __v : false });
    jsonfile.writeFileSync(__dirname + '/teams.json', teams);

    const teamusers = await TeamUser.find({}, { __v : false });
    jsonfile.writeFileSync(__dirname + '/teamusers.json', teamusers);

    const financialinfos = await FinancialInfo.find({}, { __v : false });
    jsonfile.writeFileSync(__dirname + '/financialinfos.json', financialinfos);

    const personalinfos = await PersonalInfo.find({}, { __v : false });
    jsonfile.writeFileSync(__dirname + '/personalinfos.json', personalinfos);

    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}



if (process.argv.includes('--delete')) {
  //deleteData();
} else if (process.argv.includes('--load')) {
  //loadData();
} else {
  //dumpData();
  
}
console.log(process.argv);
process.exit();