const errorTrace = 'utils >';

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