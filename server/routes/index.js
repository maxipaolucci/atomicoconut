const express = require('express');
const router = express.Router();

// Do work here

// Anything goes to home.pug that will render the angular app, 
// then angular decides where to redirect using the url + its own routing framework
// NO NEEDED SIN USING NGINX TO ROUTE things not starting with /api to the client app
// router.get('*', (req, res) => {
//   res.render('home');
// });

module.exports = router;