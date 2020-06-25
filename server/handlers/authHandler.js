const authController = require('../controllers/authController');
const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { getMessage } = require('../handlers/errorHandlers');
const moment = require('moment');

const errorTrace = 'authHandler >';

// creates a JWT token for the user as parameter
exports.createToken = (user) => {
  const methodTrace = `${errorTrace} createToken() >`;

  console.log(`${methodTrace}${getMessage('message', 1060, user.email, true, user.email, process.env.SESSION_DURATION_SECONDS)}`);

  return jwt.sign(
    {
      sub: user.id,
      username: user.email
    }, 
    process.env.SESSION_SECRET, 
    { expiresIn: parseInt(process.env.SESSION_DURATION_SECONDS) }
  );
};

// this method check the JWT sent in the request to be valid against the private key
exports.jwtCheck = expressjwt({
  secret: process.env.SESSION_SECRET,
  requestProperty: 'jwtToken' //send the decoded token data to req.auth
});

// this method checks that the jwt provided and decoded matched the user email
exports.checkDecodedJwtMatchUser = (req, res, next) => {
  const methodTrace = `${errorTrace} checkJsonWebToken() >`;

  const { user, jwtToken } = req; //jwtToken is where the token data is saved once checked in jwtCheck method
  
  console.log(`${methodTrace}${getMessage('message', 1058, user.email, true, user.email)}`);
  //check tokent in request again the logged in user
  if (user.email != jwtToken.username) {
    console.log(`${methodTrace}${getMessage('error', 480, user.email, true, user.email)}`);
    res.status(401).json({ 
      status : "error", 
      codeno : 480,
      msg : getMessage('error', 480, user.email, false, user.email),
      data : null
    });

    return;
  }

  console.log(`${methodTrace}${getMessage('message', 1059, user.email, true, user.email)}`);
  next();
};