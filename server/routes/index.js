const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { catchErrors, catchApiErrors } = require('../handlers/errorHandlers');

// Do work here

// Anything goes to home.pug that will render the angular app, 
// then angular decides where to redirect using the url + its own routing framework
router.get('*', (req, res) => {
  res.render('home');
});

module.exports = router;