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

exports.account = (req, res) => {
    res.render('tests/account', { title : 'Edit your Account' });
};