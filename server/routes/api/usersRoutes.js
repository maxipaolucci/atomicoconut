const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const authHandler = require('../../handlers/authHandler');
const { catchErrors } = require('../../handlers/errorHandlers');
const { check, sanitizeBody } = require('express-validator');


//*************************************************************************** */
//****************************** USERS API ********************************** */
//*************************************************************************** */

router.route('/login').post(authController.login);

router.route('/register').post(
  [
    sanitizeBody('name'),
    check('name', 'A name is required.').not().isEmpty(),
    check('email', 'The email provided is invalid').isEmail(),
    sanitizeBody('email'),
    check('password', 'Password is required').not().isEmpty(),
    check('password-confirm', 'Password confirmation is required').not().isEmpty()
    //check('password', 'Password confirmation must match the password').equals('password-confirm')
  ],
  userController.validateData,
  catchErrors(userController.register),
  catchErrors(userController.sendActivationToken)
);

router.route('/getUser').get(
  authController.isLogggedIn,
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(authController.getUser)
);

router.route('/logout').get(
  authController.isLogggedIn, 
  authController.logout
);

router.route('/accountPersonalInfo').post(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(userController.updateAccountPersonalInfo)
);

router.route('/accountFinancialInfo').post(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(userController.updateAccountFinancialInfo)
);

router.route('/account').post(
  authController.isLogggedIn,
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(userController.updateAccount)
);

router.route('/account/forgot').post(catchErrors(authController.forgot));

router.route('/account/reset/:token').post(
  authController.confirmedPasswords,
  catchErrors(authController.reset)
);

router.route('/account/activation/:token').get(
  catchErrors(userController.accountActivation)
);



module.exports = router;
