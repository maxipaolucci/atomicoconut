const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../handlers/errorHandlers');
const cryptoRatesController = require('../../controllers/cryptoRatesController');
const authController = require('../../controllers/authController');
const authHandler = require('../../handlers/authHandler');

//*************************************************************************** */
//************************** CRYPTO RATES API ***************************** */
//*************************************************************************** */

router.route('/sendAlertCryptoRatio').get(
  authController.isLogggedIn, 
  authHandler.jwtCheck,
  authHandler.checkDecodedJwtMatchUser,
  catchErrors(cryptoRatesController.sendAlertCryptoRatio)
);

router.route('/getTodayRates').get(
  catchErrors(cryptoRatesController.getTodayRates)
);

router.route('/test').get(
  catchErrors(cryptoRatesController.test)
);

module.exports = router;