const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const propertyController = require('../../controllers/propertyController');
const { catchErrors, catchApiErrors } = require('../../handlers/errorHandlers');

//*************************************************************************** */
//************************** PROPERTIES API ******************************** */
//*************************************************************************** */

router.route('/getAll').get(
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(propertyController.getAllProperties)
);

router.route('/create').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  propertyController.validateRegister,
  catchErrors(propertyController.create)
);

router.route('/update').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  propertyController.validateRegister,
  catchErrors(propertyController.update)
);

module.exports = router;