const errorTrace = 'utils >';
const Pusher = require("pusher");
const { exec } = require('child_process');
const { ENVIRONMENTS } = require("../constants/constants");


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
 * This format of the function is to use it with async/await
 * async () => { await delay(1000); return do_something(); }
 * @param {*} ms 
 */
exports.delay = (ms) => new Promise(res => setTimeout(res, ms));

// environment methods
exports.isProduction = () => process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION;
exports.isDevelopment = () => process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT;
exports.isTesting = () => process.env.NODE_ENV === ENVIRONMENTS.TESTING;

exports.runCommand = (command) => new Promise(res => exec(command, (error, stdout, stderr) => {
  console.log(res);
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
}));