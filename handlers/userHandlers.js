const errorTrace = 'userHandlers >';
const { getMessage } = require('./errorHandlers');

/**
 * Verify if the user has access to see investment dashboard or not based on his email
 * @param {*} email . The current user email
 * @return {boolean} . True if has access otherwise false.
 */
const accessToInvestments = (email) => {
  const methodTrace = `${errorTrace} accessToInvestments() > `;

  console.log(`${methodTrace}${getMessage('message', 1023, email)}`);
  const result = email === 'maxipaolucci@gmail.com' || email === 'stefaniaezquerra@gmail.com';
  
  if (result) {
    console.log(`${methodTrace}${getMessage('message', 1022, email)}`);
  } else {
    console.log(`${methodTrace}${getMessage('message', 1021, email)}`);
  }
  
  return result;
}

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
      accessToInvestments : accessToInvestments(user.email)
  };

  for (let key of Object.keys(optionalFields)) {
      if (optionalFields[key] === 'true') {
          dto[key] = user[key] || null;
      }
  }

  return dto;
};