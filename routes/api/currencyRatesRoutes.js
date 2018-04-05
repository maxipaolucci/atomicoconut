const express = require('express');
const router = express.Router();
const { catchErrors, catchApiErrors } = require('../../handlers/errorHandlers');

//*************************************************************************** */
//************************** CURRENCY RATES API ***************************** */
//*************************************************************************** */

router.route('/add').post(
  currencyRatesController.validateRegister,
  catchErrors(currencyRatesController.add)
);

router.route('/:date').get(
  catchErrors(currencyRatesController.getByDate)
);

router.route('/getByDates/:dates').get(
  catchErrors(currencyRatesController.getByDates)
);

module.exports = router;