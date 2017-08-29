const passport = require('passport'); //it is a library to login people in the app
const crypto = require('crypto'); //get crytographic strings
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

const errorTrace = 'authController >';

exports.login = (req, res, next) => {
    const methodTrace = `${errorTrace} login() >`;

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(`${methodTrace} Login failed 1. ${err}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 400,
                msg : errors.map(err => err.msg),
                data : info
            });
            return; //stop from running 
        }
        if (!user) {
            console.log(`${methodTrace} Login failed 2. Not user back`);
            res.status(401).json({ 
                status : "error", 
                codeno : 400,
                msg : 'No user found with the provided credentials',
                data : null
            });
            return; //stop from running 
        }

        req.logIn(user, function(err) {
            if (err) {
                console.log(`${methodTrace} Login failed 2. ${err}`);
                res.status(401).json({ 
                    status : "error", 
                    codeno : 400,
                    msg : 'There was an error trying to login with the recently registered user.',
                    data : null
                });
                return; //stop from running 
            }
            
            console.log(`${methodTrace} Login Works!`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : 'Login successful',
                data : { name : user.name, email : user.email }
            });
        });
    })(req, res, next);
}; //authenticate is a middleware on passport. local means we are using our local authentication with email and password. 
    //But we can put ther 'facebook' to use facebook. Check documentation. 
    //This uses the passport handler in handlers folder

exports.logout = (req, res) => {
    const methodTrace = `${errorTrace} logout() >`;
    console.log(`${methodTrace} Logout user: ${req.user ? req.user.name : 'null'}.`);
    
    req.logout(); //this was added in passport
    res.json({
        status : 'success', 
        codeno : 200,
        msg : 'Logout successful',
        data : null
    });
};

exports.isLogggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { //check in passport for authentication
        next();
        return;
    }

    res.status(401).json({ 
        status : "error", 
        codeno : 400,
        msg : 'You are not authenticated to proceed.',
        data : null
    });
};

exports.getUser = (req, res, next) => {
    const methodTrace = `${errorTrace} getUser() >`;

    if (req.isAuthenticated()) { //check in passport for authentication
        console.log(`${methodTrace} User is authenticated!.`);

        res.json({
            status : 'success',
            codeno : 200,
            msg : 'User is logged in.',
            data : { name : req.user.name, email : req.user.email }
        });
        return;
    }

    console.log(`${methodTrace} User NOT authenticated.`);
    res.json({ 
        status : "success", 
        codeno : 200,
        msg : 'No user logged in currently.',
        data : null
    });
};

exports.forgot = async (req, res) => {
    //1 see user with that exitst
    const user = await User.findOne({ email : req.body.email });
    if (!user) {
        res.status(401).json({ 
            status : "error", 
            codeno : 400,
            msg : 'No account with that email exists.',
            data : null
        });
        return;
    }
    //2 set reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour from now
    await user.save();
    //3 send them email with the token
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    await mail.send({
        user,
        subject : 'Password reset',
        resetURL,
        filename : 'password-reset' //this is going to be the mail template file
    });

    res.json({
        status : 'success', 
        codeno : 200,
        msg : 'You have been emailed a password reset link',
        data : null
    });
};

exports.confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body['password-confirm']) {
        next();
        return;
    }

    res.status(401).json({
        status : "error", 
        codeno : 400,
        msg : 'Passwords do not match!',
        data : null
    });
};

exports.update = async (req, res) => {
    const user = await User.findOne({
        $and : [
            { resetPasswordToken : req.params.token },
            { resetPasswordToken : { $gt : Date.now() } }
        ]
    });

    if (!user) {
        res.status(401).json({
            status : "error", 
            codeno : 400,
            msg : 'Password reset is invalid or has expired.',
            data : null
        });
        return;
    }

    const setPassword = promisify(user.setPassword, user); //this User.setPassword function was added to model by passportLocalMongoose plugin in the user schema. 
                                                            // User.setPassword is a callback based method as register in userController so with promisify we convert it into a promise based method.
    await setPassword(req.body.password); // set the new password to the user in MongoDB
    user.resetPasswordToken = undefined; //the way to remove fields from mongo is set to undefined
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save(); //here is when we save in the database the deleted values before 
    await req.login(updatedUser); //this comes from passport js
    
    res.json({
        status : 'success', 
        codeno : 200,
        msg : 'Nice! Your password has been reset! You are now logged in!',
        data : null
    });
};