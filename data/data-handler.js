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
const Investment = require('../models/Investment');
const CurrencyInvestment = require('../models/CurrencyInvestment');
const PropertyInvestment = require('../models/PropertyInvestment');
const Property = require('../models/Property');
const House = require('../models/House');
const CurrencyRate = require('../models/CurrencyRate');


async function deleteData() {
  console.log(`Started deleting data from ${environment.toUpperCase()}...`);

  try {
    await FinancialInfo.remove();
    console.log(`FinancialInfo table is empty.`);
    await PersonalInfo.remove();
    console.log(`PersonalInfo table is empty.`);
    await TeamUser.remove();
    console.log(`TeamUser table is empty.`);
    await Team.remove();
    console.log(`Team table is empty.`);
    await User.remove();
    console.log(`User table is empty.`);
    await Investment.remove();
    console.log(`Investment table is empty.`);
    await CurrencyInvestment.remove();
    console.log(`CurrencyInvestment table is empty.`);
    await PropertyInvestment.remove();
    console.log(`PropertyInvestment table is empty.`);
    await Property.remove();
    console.log(`Property table is empty.`);
    await House.remove();
    console.log(`House table is empty.`);
    await CurrencyRate.remove();
    console.log(`CurrencyRate table is empty.`);


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

    const financialinfos = jsonfile.readFileSync(`${__dirname}/${source}/financialinfos.json`);
    const personalinfos = jsonfile.readFileSync(`${__dirname}/${source}/personalinfos.json`);
    const users = jsonfile.readFileSync(`${__dirname}/${source}/users.json`);
    const teams = jsonfile.readFileSync(`${__dirname}/${source}/teams.json`);
    const teamusers = jsonfile.readFileSync(`${__dirname}/${source}/teamusers.json`);
    const investments = jsonfile.readFileSync(`${__dirname}/${source}/investments.json`);
    const currencyinvestments = jsonfile.readFileSync(`${__dirname}/${source}/currencyinvestments.json`);
    const propertyinvestments = jsonfile.readFileSync(`${__dirname}/${source}/propertyinvestments.json`);
    const properties = jsonfile.readFileSync(`${__dirname}/${source}/properties.json`);
    const houses = jsonfile.readFileSync(`${__dirname}/${source}/houses.json`);
    const currencyrates = jsonfile.readFileSync(`${__dirname}/${source}/currencyrates.json`);

    if (users.length) {
      await User.insertMany(users);
      console.log(`${users.length} Users loaded successfully.`);
    }
    
    if (teams.length) {
      await Team.insertMany(teams);
      console.log(`${teams.length} Teams loaded successfully.`);
    }
    
    if (teamusers.length) {
      await TeamUser.insertMany(teamusers);
      console.log(`${teamusers.length} TeamUsers loaded successfully.`);
    }
    
    if (financialinfos.length) {
      await FinancialInfo.insertMany(financialinfos);
      console.log(`${financialinfos.length} FinancialInfos loaded successfully.`);
    }
    
    if (personalinfos.length) {
      await PersonalInfo.insertMany(personalinfos);
      console.log(`${personalinfos.length} PersonalInfos loaded successfully.`);
    }

    if (investments.length) {
      await Investment.insertMany(investments);
      console.log(`${investments.length} Investments loaded successfully.`);
    }

    if (currencyinvestments.length) {
      await CurrencyInvestment.insertMany(currencyinvestments);
      console.log(`${currencyinvestments.length} CurrencyInvestments loaded successfully.`);
    }

    if (propertyinvestments.length) {
      await PropertyInvestment.insertMany(propertyinvestments);
      console.log(`${propertyinvestments.length} PropertyInvestments loaded successfully.`);
    }

    if (properties.length) {
      await Property.insertMany(properties);
      console.log(`${properties.length} Properties loaded successfully.`);
    }

    if (houses.length) {
      await House.insertMany(houses);
      console.log(`${houses.length} Houses loaded successfully.`);
    }

    if (currencyrates.length) {
      await CurrencyRate.insertMany(currencyrates);
      console.log(`${currencyrates.length} Currencyrates loaded successfully.`);
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

    const users = await User.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/users.json`, users);
    console.log(`${users.length} Users exported to json successfully.`);

    const teams = await Team.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/teams.json`, teams);
    console.log(`${teams.length} Teams exported to json successfully.`);

    const teamusers = await TeamUser.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/teamusers.json`, teamusers);
    console.log(`${teamusers.length} TeamUsers exported to json successfully.`);

    const financialinfos = await FinancialInfo.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/financialinfos.json`, financialinfos);
    console.log(`${financialinfos.length} FinancialInfos exported to json successfully.`);

    const personalinfos = await PersonalInfo.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/personalinfos.json`, personalinfos);
    console.log(`${personalinfos.length} PersonalInfos exported to json successfully.`);

    const investments = await Investment.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/investments.json`, investments);
    console.log(`${investments.length} Investments exported to json successfully.`);

    const currencyinvestments = await CurrencyInvestment.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/currencyinvestments.json`, currencyinvestments);
    console.log(`${currencyinvestments.length} CurrencyInvestments exported to json successfully.`);

    const propertyinvestments = await PropertyInvestment.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/propertyinvestments.json`, propertyinvestments);
    console.log(`${propertyinvestments.length} propertyinvestments exported to json successfully.`);

    const properties = await Property.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/properties.json`, properties);
    console.log(`${properties.length} properties exported to json successfully.`);

    const houses = await House.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/houses.json`, houses);
    console.log(`${houses.length} houses exported to json successfully.`);

    const currencyrates = await CurrencyRate.find({}, { __v : false });
    jsonfile.writeFileSync(`${__dirname}/${environment}/currencyrates.json`, currencyrates);
    console.log(`${currencyrates.length} currencyrates exported to json successfully.`);

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
} else {
  dumpData();
}