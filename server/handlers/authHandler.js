const authController = require('../controllers/authController');
const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { getMessage } = require('../handlers/errorHandlers');

const errorTrace = 'authHandler >';

exports.createToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      username: user.email
    }, 
    process.env.SECRET, 
    { expiresIn: 30}
    // { expiresIn: "3 hours"}
  );
};

// this method check the JWT sent in the request to be valid against the private key
exports.jwtCheck = expressjwt({
  secret: process.env.SECRET,
  requestProperty: 'auth' //send the decoded token data to req.auth
});

// this method checks that the jwt provided and decoded matched the user email
exports.checkDecodedJwtMatchUser = async (req, res, next) => {
  const methodTrace = `${errorTrace} checkJsonWebToken() >`;
  
  const { user, auth } = req; //auth is where the token data is saved once checked in jwtCheck method
  
  console.log(`${methodTrace}${getMessage('message', 1058, user.email, true, user.email)}`);
  //retrieve token from user table with the email
  if (user.email != auth.username) {
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