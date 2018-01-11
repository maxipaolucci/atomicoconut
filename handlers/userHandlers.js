const errorTrace = 'userHandlers >';
const { getMessage } = require('./errorHandlers');

/**
 * Get a user object that we can send to the client that don't exposes sensible fields like ID
 * @param {*} user . The user object to transmit
 * @param {*} optionalFields . Optional fields to add
 */
exports.getUserDataObject = (user = {}, optionalFields = {}) => {
  let dto = {
      name : user.name, 
      email : user.email, 
      avatar : user.gravatar, 
      currency : user.currency || 'USD'
  };

  for (let key of Object.keys(optionalFields)) {
      if (optionalFields[key] === 'true') {
          dto[key] = user[key] || null;
      }
  }

  return dto;
};