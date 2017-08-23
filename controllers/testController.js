const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

const errorTrace = 'testController >';

exports.loginForm = (req, res) => {
    res.render('tests/login', { title : 'Login' });
};

exports.registerForm = (req, res) => {
    res.render('tests/register', { title : 'Register'});
};

exports.logoutForm = (req, res) => {
    res.render('tests/logout', { title : 'Logout'});
};

exports.account = (req, res) => {
    res.render('tests/account', { title : 'Edit your Account' });
};

exports.reset = async (req, res) => {
    
    const user = await User.findOne({
        $and : [
            { resetPasswordToken : req.params.token },
            { resetPasswordToken : { $gt : Date.now() } }
        ]
    });
    
    if (!user) {
        req.flash('error', 'Password reset is invalid or has expired.');
        return res.redirect('tests/login');
    }

    res.render('tests/reset', { title : 'Reset your Password', token : req.params.token });
};