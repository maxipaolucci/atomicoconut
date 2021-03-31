const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../handlers/errorHandlers');
const cryptoRatesController = require('../../controllers/cryptoRatesController');

//*************************************************************************** */
//************************** CRYPTO RATES API ***************************** */
//*************************************************************************** */

router.route('/getTodayRates').get(
  catchErrors(cryptoRatesController.getTodayRates)
);

router.route('/test').get(
  catchErrors(cryptoRatesController.test)
);

module.exports = router;