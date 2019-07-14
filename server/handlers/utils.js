const errorTrace = 'utils >';
const Pusher = require("pusher");


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