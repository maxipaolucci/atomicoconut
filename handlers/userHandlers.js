const errorTrace = 'userHandlers >';
const { getMessage } = require('./errorHandlers');

/**
 * Verify if the user has access to see investment dashboard or not based on his email
 * @param {*} email . The current user email
 * @return {boolean} . True if has access otherwise false.
 */
exports.accessToInvestments = (email) => {
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