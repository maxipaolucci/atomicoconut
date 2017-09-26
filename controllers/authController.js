const passport = require('passport'); //it is a library to login people in the app
const crypto = require('crypto'); //get crytographic strings
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const { errorCodes, messageCodes } = require('../handlers/errorHandlers');

const errorTrace = 'authController >';

exports.login = (req, res, next) => {
    const methodTrace = `${errorTrace} login() > `;

    console.log(`${methodTrace}${messageCodes[1001]}`);
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(`${methodTrace}${errorCodes[451]}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 450,
                msg : errors.map(err => err.msg),
                data : info
            });
            return; //stop from running 
        }
        if (!user) {
            console.log(`${methodTrace}${errorCodes[451]}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 451,
                msg : errorCodes[451],
                data : null
            });
            return; //stop from running 
        }

        console.log(`${methodTrace}${messageCodes[1002]}`);
        req.logIn(user, function(err) {
            if (err) {
                console.log(`${methodTrace}${errorCodes[452]}`);
                res.status(401).json({ 
                    status : "error", 
                    codeno : 452,
                    msg : errorCodes[452],
                    data : null
                });
                return; //stop from running 
            }
            
            console.log(`${methodTrace}${messageCodes[1000]}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : messageCodes[1000],
                data : { name : user.name, email : user.email, avatar : user.gravatar }
            });
        });
    })(req, res, next);
}; //authenticate is a middleware on passport. local means we are using our local authentication with email and password. 
    //But we can put ther 'facebook' to use facebook. Check documentation. 
    //This uses the passport handler in handlers folder

exports.logout = (req, res) => {
    const methodTrace = `${errorTrace} logout() >`;
    console.log(`${methodTrace} Logged out user: ${req.user ? req.user.name : 'null'}.`);
    
    req.logout(); //this was added in passport
    res.json({
        status : 'success', 
        codeno : 200,
        msg : 'Logout successful',
        data : null
    });
};

exports.isLogggedIn = (req, res, next) => {
    const methodTrace = `${errorTrace} isLogggedIn() >`;

    console.log(`${methodTrace}${messageCodes[1003]}`);
    if (req.isAuthenticated()) { //check in passport for authentication
        console.log(`${methodTrace} ${messageCodes[1004]}`);
        next();
        return;
    }

    console.log(`${methodTrace} ${errorCodes[453]}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 400,
        msg : errorCodes[453],
        data : null
    });
};

exports.getUser = (req, res, next) => {
    const methodTrace = `${errorTrace} getUser() >`;

    if (req.isAuthenticated()) { //check in passport for authentication
        console.log(`${methodTrace} ${messageCodes[1004]}`);
        res.json({
            status : 'success',
            codeno : 200,
            msg : messageCodes[1004],
            data : { name : req.user.name, email : req.user.email, avatar : req.user.gravatar }
        });
        return;
    }

    console.log(`${methodTrace} ${errorCodes[453]}`);
    res.json({ 
        status : "success", 
        codeno : 200,
        msg : errorCodes[453],
        data : null
    });
};

exports.forgot = async (req, res) => {
    const methodTrace = `${errorTrace} forgot() >`;

    const email = req.body.email;
    console.log(`${methodTrace} Checking user with email: ${email}...`);
    //1 see user with that exitst
    const user = await User.findOne({ email });
    if (!user) {
        console.log(`${methodTrace} No user found with email: ${email}.`);
        res.status(401).json({ 
            status : "error", 
            codeno : 452,
            msg : 'No account with that email exists.',
            data : null
        });
        return;
    }

    //2 set reset tokens and expiry on their account
    console.log(`${methodTrace} User ${email} found, saving token in user Schema...`);
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour from now
    await user.save();
    //3 send them email with the token
    console.log(`${methodTrace} Token saved for ${email}, sending email to user with reset password url...`);
    const resetURL = `http://${req.headers.host}/app/account/reset/${user.resetPasswordToken}`;
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
        data : { email : user.email, expires : '1 hour' }
    });

    console.log(`${methodTrace} Mail successfully sent to ${email}.`);
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
    const methodTrace = `${errorTrace} update() >`;
    
    console.log(`${methodTrace} Checking for User with token ${req.params.token} not expired...`);
    const user = await User.findOne({
        $and : [
            { resetPasswordToken : req.params.token },
            { resetPasswordExpires : { $gt : Date.now() } }
        ]
    });

    if (!user) {
        console.log(`${methodTrace} User not found.`);
        res.status(401).json({
            status : "error", 
            codeno : 400,
            msg : 'Password reset token is invalid or has expired.',
            data : null
        });
        return;
    }
    console.log(`${methodTrace} User found, saving new password...`);
    const setPassword = promisify(user.setPassword, user); //this User.setPassword function was added to model by passportLocalMongoose plugin in the user schema. 
                                                            // User.setPassword is a callback based method as register in userController so with promisify we convert it into a promise based method.
    await setPassword(req.body.password); // set the new password to the user in MongoDB
    user.resetPasswordToken = undefined; //the way to remove fields from mongo is set to undefined
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save(); //here is when we save in the database the deleted values before 
    await req.login(updatedUser); //this comes from passport js
    
    console.log(`${methodTrace} Password successfully updated!!!`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : 'Nice! Your password has been reset! You are now logged in!',
        data : { name : req.user.name, email : req.user.email, avatar : req.user.gravatar }
    });
};

exports.reset = async (req, res) => {
    const methodTrace = `${errorTrace} reset() >`;
    
    console.log(`${methodTrace} Checking for User with token ${req.params.token} not expired...`);
    const user = await User.findOne({
        $and : [
            { resetPasswordToken : req.params.token },
            { resetPasswordExpires : { $gt : Date.now() } }
        ]
    });
    
    if (!user) {
        console.log(`${methodTrace} User not found.`);
        return res.redirect('/app/account/reset/expired');
    }

    console.log(`${methodTrace} User with token provided found.`);
    res.render('home', {title: 'Reset password'});
};