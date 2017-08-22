const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
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

router.get('/app/register', (req, res) => {
  res.render('home', {title: 'Register'});
});

router.get('/data', (req, res) => {
  res.json({ here : 'data'});
});


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

//router.get('/api/users/login', userController.loginForm);
router.post('/api/users/login', authController.login);
// router.get('/register', userController.registerForm);
router.post('/api/users/register', 
    userController.validateRegister,
    catchApiErrors(userController.register),
    authController.login
);

router.get('/api/users/logout', authController.logout);

// router.get('/account', 
//     authController.isLogggedIn, 
//     userController.account
// );
router.post('/api/users/account', 
    authController.isLogggedIn, 
    catchErrors(userController.updateAccount)
);
router.post('/api/users/account/forgot',  
    catchErrors(authController.forgot)
);
// router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/api/users/account/reset/:token', 
    authController.confirmedPasswords,
    catchErrors(authController.update)
);

module.exports = router;
