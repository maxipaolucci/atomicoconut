const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const authHandler = require('../../handlers/authHandler');
const { catchErrors } = require('../../handlers/errorHandlers');
const { check, body } = require('express-validator');


//*************************************************************************** */
//****************************** USERS API ********************************** */
//*************************************************************************** */

router.route('/login').post(authController.login);

router.route('/register').post(
  [
    body('name'),
    check('name', 'A name is required.').not().isEmpty(),
    check('email', 'The email provided is invalid').isEmail(),
    body('email'),
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
  // we don't want to check jwt token here because this method is needed to retrieve the current loggedin user
  // and sometines without a token cause the customer just refreshed the page and loose the token (when refresh 
  // the whole redux store is cleaned), only the email remains (stored in local browser storage) and is used in getUser to retrieve it).
  catchErrors(authController.getUser)
);

router.route('/logout').get(
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

router.route('/settings').post(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(userController.updateSettings)
);

router.route('/account').post(
  authController.isLogggedIn,
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(userController.updateAccount)
);

router.route('/account/forgot').post(
  catchErrors(authController.forgot)
);

router.route('/account/reset/:token').post(
  authController.confirmedPasswords,
  catchErrors(authController.reset)
);

router.route('/account/activation/:token').get(
  catchErrors(userController.accountActivation)
);



module.exports = router;
