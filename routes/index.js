const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const teamController = require('../controllers/teamController');
const authController = require('../controllers/authController');
const investmentController = require('../controllers/investmentController');
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


//*************************************************************************** */
//*************************************************************************** */
//*******************************         *********************************** */
//*******************************  A P I  *********************************** */
//*******************************         *********************************** */
//*************************************************************************** */
//*************************************************************************** */


//*************************************************************************** */
//****************************** USERS API ********************************** */
//*************************************************************************** */

router.post('/api/users/login', authController.login);

router.post('/api/users/register', 
    userController.validateRegister,
    catchErrors(userController.register),
    authController.login
);

router.get('/api/users/getUser', catchErrors(authController.getUser));

router.get('/api/users/logout', authController.logout);

router.post('/api/users/account', 
    authController.isLogggedIn, 
    catchErrors(userController.updateAccount)
);

router.post('/api/users/accountPersonalInfo', 
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(userController.updateAccountPersonalInfo)
);

router.post('/api/users/accountFinancialInfo', 
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(userController.updateAccountFinancialInfo)
);

router.post('/api/users/account/forgot', catchErrors(authController.forgot));

router.post('/api/users/account/reset/:token', 
  authController.confirmedPasswords,
  catchErrors(authController.update)
);


//*************************************************************************** */
//****************************** TEAM API *********************************** */
//*************************************************************************** */
router.get('/api/teams/getMyTeamBySlug', 
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(teamController.getMyTeamBySlug)
);

router.get('/api/teams/getAll', 
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(teamController.getAllTeams)
);

router.post('/api/teams/create', 
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  teamController.validateRegister,
  catchErrors(teamController.create)
);

router.post('/api/teams/update', 
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  teamController.validateRegister,
  catchErrors(teamController.update)
);

router.delete('/api/teams/delete/:slug',  
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(teamController.delete)
);


//*************************************************************************** */
//************************** INVESTMENTS API ******************************** */
//*************************************************************************** */
router.post('/api/investments/create', 
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  investmentController.validateRegister,
  catchErrors(investmentController.create)
);

router.get('/api/investments/getAll', 
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(investmentController.getAllInvestments)
);

router.get('/api/investments/getById', 
  authController.isLogggedIn,
  catchErrors(userController.checkLoggedInUserWithEmail),
  catchErrors(investmentController.getById)
);

router.post('/api/investments/update', 
  authController.isLogggedIn, 
  catchErrors(userController.checkLoggedInUserWithEmail),
  investmentController.validateRegister,
  catchErrors(investmentController.update)
);

// router.delete('/api/investments/delete/:id',  
//   catchErrors(userController.checkLoggedInUserWithEmail),
//   catchErrors(investmentController.delete)
// );

module.exports = router;
