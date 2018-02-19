const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { catchErrors, catchApiErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', (req, res) => {
  res.render('home', {title: 'Home'});
});

//Angular App urls
router.get('/app', (req, res) => {
  res.redirect('/');
});

router.get('/app/welcome', (req, res) => {
  res.render('home', {title: 'Welcome'});
});

/** Investments */
router.get('/app/investments', (req, res) => {
  res.render('home', {title: 'Investements'});
});

router.get('/app/investments/:type/create', (req, res) => {
  res.render('home', {title: 'Create Investment'});
});

router.get('/app/investments/:type/create/:id', (req, res) => {
  res.render('home', {title: 'Create Investment'});
});

router.get('/app/investments/:type/edit/:id', (req, res) => {
  res.render('home', {title: 'Edit Investment'});
});

/** Users */
router.get('/app/users/login', (req, res) => {
  res.render('home', {title: 'Login'});
});

router.get('/app/users/login/:state', (req, res) => {
  res.render('home', {title: 'Login'});
});

router.get('/app/users/register', (req, res) => {
  res.render('home', {title: 'Register'});
});

router.get('/app/users/account', (req, res) => {
  res.render('home', {title: 'Account'});
});

router.get('/app/users/account/reset/expired', (req, res) => {
  res.render('home', {title: 'Expired'});
});

router.get('/app/users/account/reset/:token', catchErrors(authController.reset));

/** Calculators */
router.get('/app/calculators', (req, res) => {
  res.render('home', {title: 'Calculators'});
});

router.get('/app/calculators/equity', (req, res) => {
  res.render('home', {title: 'Equity calculator'});
});

router.get('/app/calculators/house-figures', (req, res) => {
  res.render('home', {title: 'House figures calculator'});
});

/** Teams */
router.get('/app/teams', (req, res) => {
  res.render('home', {title: 'Teams'});
});

router.get('/app/teams/create', (req, res) => {
  res.render('home', {title: 'Create Team'});
});

router.get('/app/teams/edit/:slug', (req, res) => {
  res.render('home', {title: 'Edit Team'});
});

/** Properties */
router.get('/app/properties', (req, res) => {
  res.render('home', {title: 'Properties'});
});

router.get('/app/properties/house/create', (req, res) => {
  res.render('home', {title: 'Create Property'});
});

router.get('/app/properties/house/edit/:id', (req, res) => {
  res.render('home', {title: 'Edit Property'});
});

module.exports = router;