const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const investmentController = require('../../controllers/investmentController');
const { catchErrors } = require('../../handlers/errorHandlers');


//*************************************************************************** */
//************************** INVESTMENTS API ******************************** */
//*************************************************************************** */

router.route('/create').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  investmentController.validateData,
  catchErrors(investmentController.create)
);

router.route('/getAll').get(
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(investmentController.getAllInvestments)
);

router.route('/getById').get(
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(investmentController.getById)
);

router.route('/update').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  investmentController.validateData,
  catchErrors(investmentController.update)
);

router.route('/delete/:id').delete( 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(investmentController.delete)
);

module.exports = router;
