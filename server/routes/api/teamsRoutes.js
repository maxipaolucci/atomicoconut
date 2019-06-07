const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const teamController = require('../../controllers/teamController');
const authController = require('../../controllers/authController');
const { catchErrors, catchApiErrors } = require('../../handlers/errorHandlers');


//*************************************************************************** */
//****************************** TEAM API *********************************** */
//*************************************************************************** */

router.route('/getMyTeamBySlug').get(
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(teamController.getMyTeamBySlug)
);

router.route('/getAll').get(
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(teamController.getAllTeams)
);

router.route('/create').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  teamController.validateRegister,
  catchErrors(teamController.create)
);

router.route('/update').post(
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  teamController.validateRegister,
  catchErrors(teamController.update)
);

router.route('/delete/:slug').delete( 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(teamController.delete)
);


module.exports = router;
