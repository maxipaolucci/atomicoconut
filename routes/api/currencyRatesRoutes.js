const express = require('express');
const router = express.Router();
const { catchErrors, catchApiErrors } = require('../../handlers/errorHandlers');
const currencyRatesController = require('../../controllers/currencyRatesController');

//*************************************************************************** */
//************************** CURRENCY RATES API ***************************** */
//*************************************************************************** */

// router.route('/add').post(
//   currencyRatesController.validateRegister,
//   catchErrors(currencyRatesController.add)
// );

// router.route('/:date').get(
//   catchErrors(currencyRatesController.getByDate)
// );

router.route('/getByDates/:base').get(
  catchErrors(currencyRatesController.getByDates)
);

module.exports = router;