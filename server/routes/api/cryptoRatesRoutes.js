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

module.exports = router;