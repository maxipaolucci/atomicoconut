const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../handlers/errorHandlers');
const currencyRatesController = require('../../controllers/currencyRatesController');

//*************************************************************************** */
//************************** CURRENCY RATES API ***************************** */
//*************************************************************************** */


router.route('/getByDates/:base').get(
  catchErrors(currencyRatesController.getByDates)
);

module.exports = router;