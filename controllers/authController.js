const passport = require('passport'); //it is a library to login people in the app
const crypto = require('crypto'); //get crytographic strings
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');
const { getUserDataObject } = require('../handlers/userHandlers');


const errorTrace = 'authController >';



exports.login = (req, res, next) => {
    const methodTrace = `${errorTrace} login() > `;

    console.log(`${methodTrace}${getMessage('message', 1001)}`);
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(`${methodTrace}${getMessage('error', 450)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 450,
                msg : errors.map(err => err.msg),
                data : info
            });
            return; //stop from running 
        }
        if (!user) {
            console.log(`${methodTrace}${getMessage('error', 451)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 451,
                msg : getMessage('error', 451),
                data : null
            });
            return; //stop from running 
        }

        console.log(`${methodTrace}${getMessage('message', 1002)}`);
        req.logIn(user, function(err) {
            if (err) {
                console.log(`${methodTrace}${getMessage('error', 452)}`);
                res.status(401).json({ 
                    status : "error", 
                    codeno : 452,
                    msg : getMessage('error', 452),
                    data : null
                });
                return; //stop from running 
            }
            
            console.log(`${methodTrace}${getMessage('message', 1000)}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1000),
                data : getUserDataObject(user)
            });
        });
    })(req, res, next);
}; //authenticate is a middleware on passport. local means we are using our local authentication with email and password. 
    //But we can put ther 'facebook' to use facebook. Check documentation. 
    //This uses the passport handler in handlers folder

exports.logout = (req, res) => {
    const methodTrace = `${errorTrace} logout() >`;
    console.log(`${methodTrace} ${getMessage('message', 1005, req.user ? req.user.name : 'null')}`);
    
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

    console.log(`${methodTrace}${getMessage('message', 1003)}`);
    if (req.isAuthenticated()) { //check in passport for authentication
        console.log(`${methodTrace} ${getMessage('message', 1004)}`);
        next();
        return;
    }

    console.log(`${methodTrace} ${getMessage('error', 453)}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 453,
        msg : getMessage('error', 453),
        data : null
    });
};

exports.getUser = async (req, res, next) => {
    const methodTrace = `${errorTrace} getUser() >`;

    if (req.isAuthenticated()) { //check in passport for authentication
        console.log(`${methodTrace} ${getMessage('message', 1004)}`);

        const email = req.user.email;
        console.log(`${methodTrace} ${getMessage('message', 1006, email)}`);
        
        let user = null;
        if (Object.keys(req.query).length) {
            user = await User.findOneAndPopulate({ email }, req.query);//await User.findOne({ email }).populate('personalInfo');
        } else {
            user = await User.findOne({ email });
        }
        
        if (!user) {
            console.log(`${methodTrace} ${getMessage('error', 455, email)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 455,
                msg : getMessage('error', 455, email),
                data : null
            });
            return;
        }

        res.json({
            status : 'success',
            codeno : 200,
            msg : getMessage('message', 1004),
            data : getUserDataObject(user, req.query)
        });
        return;
    }

    console.log(`${methodTrace} ${getMessage('error', 453)}`);
    res.json({ 
        status : "success", 
        codeno : 200,
        msg : getMessage('error', 453),
        data : null
    });
};

exports.forgot = async (req, res) => {
    const methodTrace = `${errorTrace} forgot() >`;

    const email = req.body.email;
    console.log(`${methodTrace} ${getMessage('message', 1006, email)}`);
    //1 see user with that email exists
    const user = await User.findOne({ email });
    if (!user) {
        console.log(`${methodTrace} ${getMessage('error', 455, email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 455,
            msg : getMessage('error', 455, email),
            data : null
        });
        return;
    }
    
    //2 set reset tokens and expiry on their account
    console.log(`${methodTrace} ${getMessage('message', 1007, email)}`);
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour from now
    await user.save();
    //3 send them email with the token
    console.log(`${methodTrace} ${getMessage('message', 1008, email)}`);
    const resetURL = `http://${req.headers.host}/app/users/account/reset/${user.resetPasswordToken}`;
    await mail.send({
        toEmail : user.email,
        subject : 'AtomiCoconut - Password reset',
        resetURL,
        filename : 'password-reset' //this is going to be the mail template file
    });

    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1009),
        data : { email : user.email, expires : '1 hour' }
    });

    console.log(`${methodTrace} ${getMessage('message', 1010, email)}`);
};

exports.confirmedPasswords = (req, res, next) => {
    if (req.body.password === req.body['password-confirm']) {
        next();
        return;
    }

    res.status(401).json({
        status : "error", 
        codeno : 456,
        msg : getMessage('error', 456),
        data : null
    });
};

exports.update = async (req, res) => {
    const methodTrace = `${errorTrace} update() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1011, req.params.token)}`);
    const user = await User.findOne({
        $and : [
            { resetPasswordToken : req.params.token },
            { resetPasswordExpires : { $gt : Date.now() } }
        ]
    });

    if (!user) {
        console.log(`${methodTrace} ${getMessage('error', 457)}`);
        res.status(401).json({
            status : "error", 
            codeno : 457,
            msg : getMessage('error', 457),
            data : null
        });
        return;
    }
    console.log(`${methodTrace} ${getMessage('message', 1012)}`);
    const setPassword = promisify(user.setPassword, user); //this User.setPassword function was added to model by passportLocalMongoose plugin in the user schema. 
                                                            // User.setPassword is a callback based method as register in userController so with promisify we convert it into a promise based method.
    await setPassword(req.body.password); // set the new password to the user in MongoDB
    user.resetPasswordToken = undefined; //the way to remove fields from mongo is set to undefined
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save(); //here is when we save in the database the deleted values before 
    await req.login(updatedUser); //this comes from passport js
    
    console.log(`${methodTrace} ${getMessage('message', 1013)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1013),
        data : getUserDataObject(req.user)
    });
};

exports.reset = async (req, res) => {
    const methodTrace = `${errorTrace} reset() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1011, req.params.token)}`);
    const user = await User.findOne({
        $and : [
            { resetPasswordToken : req.params.token },
            { resetPasswordExpires : { $gt : Date.now() } }
        ]
    });
    
    if (!user) {
        console.log(`${methodTrace} ${getMessage('error', 457)}`);
        return res.redirect('/app/users/account/reset/expired');
    }

    console.log(`${methodTrace} ${getMessage('message', 1014)}`);
    res.render('home', {title: 'Reset password'});
};