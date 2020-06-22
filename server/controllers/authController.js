const passport = require('passport'); //it is a library to login people in the app
const crypto = require('crypto'); //get crytographic strings
const mongoose = require('mongoose');
const User = mongoose.model('User');
const mail = require('../handlers/mail');
const userController = require('./userController');
const { getMessage } = require('../handlers/errorHandlers');
const { ANONYMOUS_USER } = require('../constants/constants');
const authHandler = require('../handlers/authHandler');


const errorTrace = 'authController >';

const getUserObject = async (email, fieldsToPopulate = {}, withToken = false) => {
    const methodTrace = `${errorTrace} getUserObject() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1006, email, true, email)}`);        
    let user = null;
    if (Object.keys(fieldsToPopulate).length) {
        user = await User.findOneAndPopulate({ email }, fieldsToPopulate);//await User.findOne({ email }).populate('personalInfo');
    } else {
        user = await User.findOne({ email });
    }

    if (user) {
        let dto = {
            name : user.name, 
            email : user.email, 
            avatar : user.gravatar, 
            currency : user.currency
        };

        
        if (withToken) {
            //add the token to the result
            dto.token = user.token;
        }
      
        for (let key of Object.keys(fieldsToPopulate)) {
            if (fieldsToPopulate[key] === 'true') {
                dto[key] = user[key] || null;
            }
        }
        
        return dto;
    }

    return null;
};
exports.getUserObject = getUserObject;

exports.login = (req, res, next) => {
    const methodTrace = `${errorTrace} login() > `;

    console.log(`${methodTrace}${getMessage('message', 1001, null, true)}`);
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(`${methodTrace}${getMessage('error', 450, user && user.email ? user.email : null, true)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 450,
                msg : errors.map(err => err.msg),
                data : info
            });
            return; //stop from running 
        }
        if (!user) {
            console.log(`${methodTrace}${getMessage('error', 451, null, true)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 451,
                msg : getMessage('error', 451, null, false),
                data : null
            });
            return; //stop from running 
        }

        console.log(`${methodTrace}${getMessage('message', 1002, user.email, true)}`);
        req.logIn(user, async function(err) {
            if (err) {
                console.log(`${methodTrace}${getMessage('error', 452, user.email, true)}`);
                res.status(401).json({ 
                    status : "error", 
                    codeno : 452,
                    msg : getMessage('error', 452, null, false),
                    data : null
                });
                return; //stop from running 
            }

            if (!user.active) {
                console.log(`${methodTrace}${getMessage('error', 479, user.email, true, user.email)}`);
                res.status(401).json({ 
                    status : "error", 
                    codeno : 479,
                    msg : getMessage('error', 479, null, false, user.email),
                    data : null
                });
                return; //stop from running 
            }

            //save user token
            const token = authHandler.createToken(user);
            user = await userController.updateUserAccount(user, { token }, true);
            
            console.log(`${methodTrace}${getMessage('message', 1000, user.email, true)}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1000, null, false),
                data : user
            });
        });
    })(req, res, next);
}; //authenticate is a middleware on passport. local means we are using our local authentication with email and password. 
    //But we can put ther 'facebook' to use facebook. Check documentation. 
    //This uses the passport handler in handlers folder

exports.logout = async (req, res) => {
    const methodTrace = `${errorTrace} logout() >`;
    
    const user = req.user;
    const userEmail = user ? user.email : ANONYMOUS_USER;
    console.log(`${methodTrace} ${getMessage('message', 1005, userEmail, true, userEmail)}`);
    
    req.logout(); //this was added in passport
    await userController.updateUserAccount(user, { token: null }); //removes the token from the user table

    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1005, null, false, userEmail),
        data : null
    });
};

exports.isLogggedIn = (req, res, next) => {
    const methodTrace = `${errorTrace} isLogggedIn() >`;
    
    const userEmail = req.user ? req.user.email : ANONYMOUS_USER;
    
    console.log(`${methodTrace}${getMessage('message', 1003, userEmail, true)}`);
    if (!req.isAuthenticated()) { //check in passport for authentication
        console.log(`${methodTrace} ${getMessage('error', 453, userEmail, true)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 453,
            msg : getMessage('error', 453, null, false),
            data : null
        });
        
        return;
    }

    console.log(`${methodTrace} ${getMessage('message', 1004, userEmail, true)}`);
    next();
};

exports.getUser = async (req, res, next) => {
    const methodTrace = `${errorTrace} getUser() >`;

    if (req.isAuthenticated()) { //check in passport for authentication
        const email = req.user.email;
        console.log(`${methodTrace} ${getMessage('message', 1004, email, true)}`);

        const user = await getUserObject(email, req.query, true);
        
        if (!user) {
            console.log(`${methodTrace} ${getMessage('error', 455, email, true, email)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 455,
                msg : getMessage('error', 455, null, false, email),
                data : null
            });
            return;
        }

        res.json({
            status : 'success',
            codeno : 200,
            msg : getMessage('message', 1004, null, false),
            data : user
        });
        return;
    }

    console.log(`${methodTrace} ${getMessage('error', 453, null, true)}`);
    res.json({ 
        status : "success", 
        codeno : 200,
        msg : getMessage('error', 453, null, false),
        data : null
    });
};

exports.forgot = async (req, res) => {
    const methodTrace = `${errorTrace} forgot() >`;

    const email = req.body.email;
    console.log(`${methodTrace} ${getMessage('message', 1006, email, true, email)}`);
    //1 see user with that email exists
    const user = await User.findOne({ email });
    if (!user) {
        console.log(`${methodTrace} ${getMessage('error', 455, email, true, email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 455,
            msg : getMessage('error', 455, null, false, email),
            data : null
        });
        return;
    }
    
    //2 set reset tokens and expiry on their account
    console.log(`${methodTrace} ${getMessage('message', 1007, email, true, email)}`);
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour from now
    await user.save();
    //3 send them email with the token
    console.log(`${methodTrace} ${getMessage('message', 1008, email, true, email, 'reset password')}`);
    const resetURL = `${req.headers.origin}/users/account/reset/${user.resetPasswordToken}`;
    mail.send({
        toEmail : user.email,
        subject : 'AtomiCoconut - Password reset',
        resetURL,
        filename : 'password-reset' //this is going to be the mail template file
    });

    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1009, null, false, 'password reset'),
        data : { email : user.email, expires : '1 hour' }
    });

    console.log(`${methodTrace} ${getMessage('message', 1010, email, true, email)}`);
};

exports.confirmedPasswords = (req, res, next) => {
    const methodTrace = `${errorTrace} confirmedPasswords() >`;

    console.log(`${methodTrace} ${getMessage('message', 1052, null, true)}`);
    if (req.body.password !== req.body['password-confirm']) {
        console.log(`${methodTrace} ${getMessage('error', 456, null, true)}`);
        res.status(401).json({
            status : "error", 
            codeno : 456,
            msg : getMessage('error', 456, null, false),
            data : null
        });
        
        return;
    }

    console.log(`${methodTrace} ${getMessage('message', 1053, null, true)}`);
    next();
};

/**
 * Reset user password when follows the forgot proccess
 */
exports.reset = async (req, res) => {
    const methodTrace = `${errorTrace} reset() >`;
    
    const userEmail = req.user ? req.user.email : null;
    console.log(`${methodTrace} ${getMessage('message', 1011, userEmail, true, req.params.token)}`);
    const user = await User.findOne({
        $and : [
            { resetPasswordToken : req.params.token },
            { resetPasswordExpires : { $gt : Date.now() } }
        ]
    });

    if (!user) {
        console.log(`${methodTrace} ${getMessage('error', 457, userEmail, true)}`);
        res.status(401).json({
            status : "error", 
            codeno : 457,
            msg : getMessage('error', 457, null, false),
            data : null
        });

        return;
    }

    console.log(`${methodTrace} ${getMessage('message', 1012, user.email, true)}`);
    await user.setPassword(req.body.password);
    user.resetPasswordToken = undefined; //the way to remove fields from mongo is set to undefined
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save(); //here is when we save in the database the deleted values before 
    await req.login(updatedUser); //this comes from passport js
    
    if (!req.user) {
        res.status(401).json({
            status : "error", 
            codeno : 452,
            msg : getMessage('error', 452, null, false),
            data : null
        });

        return;
    }

    console.log(`${methodTrace} ${getMessage('message', 1013, user.email, true, user.email)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1013, null, false),
        data : await getUserObject(req.user.email)
    });
};
