const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const { catchErrors } = require('../../handlers/errorHandlers');


//*************************************************************************** */
//****************************** USERS API ********************************** */
//*************************************************************************** */

router.route('/login').post(authController.login);

router.route('/register').post( 
    userController.validateRegister,
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
