const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const testController = require('../controllers/testController');
const { catchErrors, catchApiErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', (req, res) => {
  res.render('home', {title: 'Home'});
});

//Angular App urls
router.get('/app', (req, res) => {
  res.render('home', {title: 'Home'});
});

router.get('/app/investments', (req, res) => {
  res.render('home', {title: 'Investements'});
});

router.get('/app/login', (req, res) => {
  res.render('home', {title: 'Login'});
});

router.get('/app/register', (req, res) => {
  res.render('home', {title: 'Register'});
});

router.get('/app/account/reset/expired', (req, res) => {
  res.render('home', {title: 'Expired'});
});

router.get('/app/account/reset/:token', catchErrors(authController.reset));

// TEST controller
router.get('/register', testController.registerForm);
router.get('/login', testController.loginForm);
router.get('/logout', testController.logoutForm);
router.get('/account', 
    authController.isLogggedIn, 
    testController.account
);
router.get('/account/reset/:token', catchErrors(testController.reset));

//*************************************************************************** */
//******************************** API ************************************** */
//*************************************************************************** */

//*************************************************************************** */
//****************************** USERS API ********************************** */
//*************************************************************************** */
//user controller

router.get('/api/users/test', (req, res) => {
  res.json({test : 'data'});
});

router.post('/api/users/login', authController.login);

router.post('/api/users/register', 
    userController.validateRegister,
    catchErrors(userController.register),
    authController.login
);

router.get('/api/users/getUser', authController.getUser);

router.get('/api/users/logout', authController.logout);

router.post('/api/users/account', 
    authController.isLogggedIn, 
    catchErrors(userController.updateAccount)
);
router.post('/api/users/account/forgot', catchErrors(authController.forgot));

router.post('/api/users/account/reset/:token', 
    authController.confirmedPasswords,
    catchErrors(authController.update)
);

module.exports = router;
