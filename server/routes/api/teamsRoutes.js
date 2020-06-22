const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const teamController = require('../../controllers/teamController');
const authController = require('../../controllers/authController');
const authHandler = require('../../handlers/authHandler');
const { catchErrors } = require('../../handlers/errorHandlers');
const { check, sanitizeBody } = require('express-validator');

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
  authHandler.jwtCheck,
  catchErrors(authHandler.checkDecodedJwtMatchUser),
  catchErrors(teamController.getAllTeams)
);

router.route('/create').post(
  [
    sanitizeBody('name'),
    check('name', 'A name is required.').not().isEmpty()
  ],  
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  teamController.validateData,
  catchErrors(teamController.create)
);

router.route('/update').post(
  [
    sanitizeBody('name'),
    check('name', 'A name is required.').not().isEmpty()
  ],
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  teamController.validateData,
  catchErrors(teamController.update)
);

router.route('/delete/:slug').delete( 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(teamController.delete)
);


module.exports = router;
