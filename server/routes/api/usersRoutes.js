const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
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
  authController.login
);

router.route('/getUser').get(catchErrors(authController.getUser));

router.route('/logout').get(authController.logout);

router.route('/accountPersonalInfo').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(userController.updateAccountPersonalInfo)
);

router.route('/accountFinancialInfo').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(userController.updateAccountFinancialInfo)
);

router.route('/account').post(
  authController.isLogggedIn, 
  catchErrors(userController.updateAccount)
);

router.route('/account/forgot').post(catchErrors(authController.forgot));

router.route('/account/reset/:token').post(
  authController.confirmedPasswords,
  catchErrors(authController.reset)
);


module.exports = router;
