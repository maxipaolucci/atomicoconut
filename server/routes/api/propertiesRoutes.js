const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const authHandler = require('../../handlers/authHandler');
const propertyController = require('../../controllers/propertyController');
const { catchErrors } = require('../../handlers/errorHandlers');

//*************************************************************************** */
//************************** PROPERTIES API ******************************** */
//*************************************************************************** */

router.route('/getAll').get(
  authController.isLogggedIn,
  authHandler.jwtCheck,
  catchErrors(authHandler.checkDecodedJwtMatchUser),
  catchErrors(propertyController.getAllProperties)
);

router.route('/create').post(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  catchErrors(authHandler.checkDecodedJwtMatchUser),
  propertyController.validateData,
  catchErrors(propertyController.storePhotos),
  catchErrors(propertyController.create)
);

router.route('/update').post(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  catchErrors(authHandler.checkDecodedJwtMatchUser),
  propertyController.validateData,
  catchErrors(propertyController.storePhotos),
  catchErrors(propertyController.update)
);

router.route('/delete/:id').delete( 
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  catchErrors(authHandler.checkDecodedJwtMatchUser),
  catchErrors(propertyController.deletePhotos),
  catchErrors(propertyController.delete)
);

router.route('/:id').get(
  authController.isLogggedIn,
  authHandler.jwtCheck,
  catchErrors(authHandler.checkDecodedJwtMatchUser),
  catchErrors(propertyController.getById)
);

module.exports = router;