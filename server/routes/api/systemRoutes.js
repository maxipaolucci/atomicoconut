const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../handlers/errorHandlers');
const systemController = require('../../controllers/systemController');
const authController = require('../../controllers/authController');
const authHandler = require('../../handlers/authHandler');

//*************************************************************************** */
//****************************** SYSTEM API ********************************* */
//*************************************************************************** */

router.route('/getClientApiKeys').get(
  // authController.isLogggedIn,
  // authHandler.jwtCheck,
  // authHandler.checkDecodedJwtMatchUser,
  systemController.getClientApiKeys
);

module.exports = router;