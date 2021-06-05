const Pusher = require("pusher");
const { exec } = require('child_process');
const { ENVIRONMENTS } = require("../constants/constants");
const { getMessage } = require('./errorHandlers');
const { ANONYMOUS_USER } = require('../constants/constants');

const errorTrace = 'utils >';

let pusher = null; 


/**
 * Returns and instance of Pusher object. This is use to send push notifications to the frontend
 * 
 * @return {Pusher}
 */
exports.getPusher = () => {
  if (pusher) {
    return pusher;
  }

  pusher = new Pusher({
    appId: `${process.env.PUSHER_APP_ID}`,
    key: `${process.env.PUSHER_KEY}`,
    secret: `${process.env.PUSHER_SECRET}`,
    cluster: `${process.env.PUSHER_CLUSTER}`
  });

  return pusher;
}; 

/**
 * Remove duplicates in an array of mongo db objectIds
 * 
 * @param {array<ObjectId>} objectIDs. The array to filter
 * 
 * @return {array<ObjectId>}
 */
exports.removeDuplicatesFromObjectIdArray = (objectIDs) => {
  const ids = {}
  objectIDs.forEach(_id => (ids[_id.toString()] = _id))
  return Object.values(ids)
};

/**
 * Delay method, to wait some amount of miliseconds before execute something
 * This promise returned from the function is to use it with async/await to run it sync
 * async () => { await delay(1000); return do_something(); }
 * @param {*} ms 
 * 
 * @return {Promise}
 */
exports.delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * environment methods
 * 
 * @return {boolean} 
 */
exports.isProduction = () => process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION;
exports.isDevelopment = () => process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT;
exports.isTesting = () => process.env.NODE_ENV === ENVIRONMENTS.TESTING;

/**
 * Run a command in the machine running this nodejs server. If return a promite 
 * This promise returned from the function is to use it with async/await to run it sync
 * @param {string} command . The command to run  
 * 
 * @return {Promise}
 */
exports.runCommand = (command) => new Promise(res => exec(command, (error, stdout, stderr) => {
  const methodTrace = `${errorTrace} runCommand() >`;
  
  if (error) {
    console.log(`${methodTrace} ${getMessage('error', 433, ANONYMOUS_USER, true, true, command, error)}`);
    return;
  }
  
  console.log(`${methodTrace} ${getMessage('message', 1065, ANONYMOUS_USER, true, true, command, stdout)}`);
  
  if (stderr) {
    console.log(`${methodTrace} ${getMessage('error', 432, ANONYMOUS_USER, true, true, command, stderr)}`);
  }
}));