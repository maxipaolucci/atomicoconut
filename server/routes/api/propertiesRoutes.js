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
  catchErrors(propertyController.storePhotos),
  catchErrors(propertyController.create)
);

router.route('/update').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  propertyController.validateRegister,
  catchErrors(propertyController.storePhotos),
  catchErrors(propertyController.update)
);

router.route('/delete/:id').delete( 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(propertyController.deletePhotos),
  catchErrors(propertyController.delete)
);

router.route('/:id').get(
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(propertyController.getById)
);

module.exports = router;