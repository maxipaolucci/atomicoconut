const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const investmentController = require('../../controllers/investmentController');
const authHandler = require('../../handlers/authHandler');
const { catchErrors } = require('../../handlers/errorHandlers');


//*************************************************************************** */
//************************** INVESTMENTS API ******************************** */
//*************************************************************************** */

router.route('/create').post(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  investmentController.validateData,
  catchErrors(investmentController.create)
);

router.route('/getAll').get(
  authController.isLogggedIn,
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(investmentController.getAllInvestments)
);

router.route('/getById').get(
  authController.isLogggedIn,
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(investmentController.getById)
);

router.route('/update').post(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  investmentController.validateData,
  catchErrors(investmentController.update)
);

router.route('/delete/:id').delete( 
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(investmentController.delete)
);

module.exports = router;
