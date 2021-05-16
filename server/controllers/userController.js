const mongoose = require('mongoose');
const User = mongoose.model('User');
const PersonalInfo = mongoose.model('PersonalInfo');
const FinancialInfo = mongoose.model('FinancialInfo');
const UserSetting = mongoose.model('UserSetting');
const { getMessage } = require('../handlers/errorHandlers');
const { getUserObject } = require('./authController');
const { validationResult } = require('express-validator');
const crypto = require('crypto'); //get crytographic strings
const mail = require('../handlers/mail');
const { ANONYMOUS_USER, ADMIN_EMAIL } = require('../constants/constants');
const authHandler = require('../handlers/authHandler');

const errorTrace = 'userController >';


exports.validateData = (req, res, next) => {
    const methodTrace = `${errorTrace} validateData() >`;

    console.log(`${methodTrace} ${getMessage('message', 1015, null, true)}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`${methodTrace} ${getMessage('error', 458, null, true, errors.array())}`);
        return res.status(400).json({ 
            status : "error", 
            codeno : 458,
            msg : getMessage('error', 458, null, true, ''),
            data: errors.array()
        }); 
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1016, null, true)}`);
    next(); //call next middleware
};

exports.register = async (req, res, next) => {
    const methodTrace = `${errorTrace} register() >`;
    
    const user = new User({ email : req.body.email, name : req.body.name });
    console.log(`${methodTrace} ${getMessage('message', 1017, user.email, true, user.email)}`);
    await User.register(user, req.body.password)
    console.log(`${methodTrace} ${getMessage('message', 1018, user.email, true, user.email)}`);
    next(); //call next middleware
};

exports.sendActivationToken = async(req, res) => {
    const methodTrace = `${errorTrace} sendActivationToken() >`;

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
    user.activationToken = crypto.randomBytes(20).toString('hex');
    user.activationTokenExpires = Date.now() + (3600000 * 24); //1 day from now
    await user.save();
    //3 send them email with the token
    console.log(`${methodTrace} ${getMessage('message', 1008, email, true, email, 'account activation')}`);
    const activationURL = `${req.headers.origin}/users/account/activation/${user.activationToken}`;
    mail.send({
        toEmail : user.email,
        subject : 'AtomiCoconut - Account activation',
        activationURL,
        filename : 'account-activation' //this is going to be the mail template file
    });

    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1009, null, false, 'account activation'),
        data : { email : user.email, expires : '1 day' }
    });

    console.log(`${methodTrace} ${getMessage('message', 1010, email, true, email)}`);
};

/**
 * Activate the user account when follow the activation process
 */
exports.accountActivation = async (req, res) => {
    const methodTrace = `${errorTrace} accountActivation() >`;
    
    const userEmail = req.user ? req.user.email : ANONYMOUS_USER;
    console.log(`${methodTrace} ${getMessage('message', 1011, userEmail, true, req.params.token)}`);
    let user = await User.findOne({
        $and : [
            { activationToken : req.params.token },
            { activationTokenExpires : { $gt : Date.now() } }
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

    console.log(`${methodTrace} ${getMessage('message', 1056, user.email, true)}`);
    user.active = true; //activate the user
    user.activationToken = undefined; //the way to remove fields from mongo is set to undefined
    user.activationTokenExpires = undefined;
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

    //save user token
    user = req.user;
    const token = authHandler.createToken(user);
    user = await getUserObject(user.email);
    user.token = token;

    // send email to me alerting new user
    mail.send({
        toEmail: ADMIN_EMAIL,
        fromEmail: 'alert@atomicoconut.com',
        subject : `New user account activated`,
        accountEmail: user.email,
        accountName: user.name,
        filename : 'account-created' //this is going to be the mail template file
    });

    console.log(`${methodTrace} ${getMessage('message', 1057, user.email, true, user.email)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1057, null, false),
        data : user
    });
};

exports.deleteExpiredInactiveAccounts = async() => {
    const methodTrace = `${errorTrace} deleteExpiredInactiveAccounts() >`;

    console.log(`${methodTrace} ${getMessage('message', 1038, ANONYMOUS_USER, true, 'User', 'active', 'false')}`);
    const writeResult = await User.deleteMany({
        $and : [
            { active: false },
            { activationTokenExpires : { $lt : Date.now() } }
        ]
    });

    if (!writeResult) {
        // error
        console.log(`${methodTrace} ${getMessage('error', 464, ANONYMOUS_USER, true, 'User', 'active', 'false')}`);

        return;
    }

    //success
    console.log(`${methodTrace} ${getMessage('message', 1050, ANONYMOUS_USER, true, writeResult.deletedCount, 'User')}`);
};

const updateUserAccount = async (user, updates = {}) => {
    const methodTrace = `${errorTrace} updateUserAccount() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1019, user.email, true, user.email)}`);
    user = await User.findOneAndUpdate(
        { email : user.email },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    console.log(`${methodTrace} ${getMessage('message', 1020, user.email, true, user.email)}`);
    return await getUserObject(user.email);
};
exports.updateUserAccount = updateUserAccount;

exports.updateAccount = async (req, res) => {
    const methodTrace = `${errorTrace} updateAccount() >`;
    const updates = {
        name : req.body.name,
        currency : req.body.currency
    };
    
    const user = await updateUserAccount(req.user, updates);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1020, null, false, user.email),
        data : user
    });
};

exports.updateAccountPersonalInfo = async (req, res) => {
    const methodTrace = `${errorTrace} updateAccountPersonalInfo() >`;
    
    //get the logged in user from req
    let user = req.user;

    const updates = {
        birthday : req.body.birthday
    };

    //check for a PersonalInfo record for the user found
    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'PersonalInfo', 'user', user._id)}`);
    let personalInfo = await PersonalInfo.findOneAndUpdate(
        { user : user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!personalInfo) {
        //if no personalInfo record found then create one and save
        console.log(`${methodTrace} ${getMessage('message', 1025, user.email, true, 'PersonalInfo')}`);
        personalInfo = await (new PersonalInfo({ 
            user : user._id, 
            birthday : req.body.birthday 
        })).save();

        if (!personalInfo) {
            console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'PersonalInfo')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, null, false, 'PersonalInfo'),
                data : null
            });

            return;
        }
        
        console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'PersonalInfo')}`);
        
        //search for the user and add the personal info id
        console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'User', 'user', user._id)}`);
        user = await User.findOneAndUpdate(
            { _id : user._id },
            { $set : { personalInfo } },
            { new : true, runValidators : true, context : 'query' }
        );
    }

    console.log(`${methodTrace} ${getMessage('message', 1020, user.email, true, user.email)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1020, null, false, user.email),
        data : await getUserObject(user.email, { personalInfo: 'true' })
    });
};

exports.updateAccountFinancialInfo = async (req, res) => {
    const methodTrace = `${errorTrace} updateAccountFinancialInfo() >`;
    
    //get the logged in user from req
    let user = req.user;
    
    //the fields to update
    const updates = {
        annualIncome : req.body.annualIncome,
        annualIncomeUnit : req.body.annualIncomeUnit,
        savings : req.body.savings,
        savingsUnit : req.body.savingsUnit,
        incomeTaxRate : req.body.incomeTaxRate
    };

    //check for a FinancialInfo record for the user
    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'FinancialInfo', 'user', user._id)}`);
    let financialInfo = await FinancialInfo.findOneAndUpdate(
        { user : user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!financialInfo) {
        //if no financialInfo record found then create one and save
        console.log(`${methodTrace} ${getMessage('message', 1025, user.email, true, 'FinancialInfo')}`);
        financialInfo = await (new FinancialInfo({ 
            user : user._id, 
            annualIncome : req.body.annualIncome,
            annualIncomeUnit : req.body.annualIncomeUnit,
            savings : req.body.savings,
            savingsUnit : req.body.savingsUnit,
            incomeTaxRate : req.body.incomeTaxRate
        })).save();

        if (!financialInfo) {
            console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'FinancialInfo')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, null, false, 'FinancialInfo'),
                data : null
            });
            
            return;
        }

        console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'FinancialInfo')}`);

        //search for the user and add the new financial info id
        console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'User', 'id', user._id)}`);
        user = await User.findOneAndUpdate(
            { _id : user._id },
            { $set : { financialInfo } },
            { new : true, runValidators : true, context : 'query' }
        );
    }
        
    console.log(`${methodTrace} ${getMessage('message', 1020, user.email, true, user.email)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1020, null, false, user.email),
        data : await getUserObject(user.email, { financialInfo: 'true' })
    });
};

/**
 * Returns all the users with the provided ids
 * 
 * @param {Array<id>} userIds . The ids of the users to retrieve
 * @param {string} userEmail . The email of the logged in user performing this action.
 * 
 * @return {Cursor} . A mongoDB Cursor of User documents.
 */
exports.getUsersByIds = async(userIds, userEmail) => {
    const methodTrace = `${errorTrace} getUsersByIds() >`;

    console.log(`${methodTrace} ${getMessage('message', 1051, userEmail, true, 'User(s)', `ids in: ${userIds}`)}`);
    const usersCursor = await User.find({ _id : { $in: userIds } });
    const records = usersCursor.length;
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, records, 'User(s)')}`);

    return usersCursor;
};

/**
 * Returns all the users with the provided emails
 * 
 * @param {array<string>} emails . The emails of the users to retrieve
 * @param {string} userEmail . The email of the logged in user performing this action.
 * 
 * @return {Cursor} . A mongoDB Cursor of User documents.
 */
exports.getUsersByEmails = async(emails, userEmail) => {
    const methodTrace = `${errorTrace} getUsersByEmails() >`;

    console.log(`${methodTrace} ${getMessage('message', 1051, userEmail, true, 'User(s)', `emails in: ${emails}`)}`);
    const usersCursor = await User.find({ email : { $in: emails } });
    const records = usersCursor.length;
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, records, 'User(s)')}`);

    return usersCursor;
};

exports.updateSettings = async (req, res) => {
    const methodTrace = `${errorTrace} updateSettings() >`;
    
    //get the logged in user from req
    let user = req.user;

    const updates = {
        ratioBtcXmrNotification : req.body.ratioBtcXmrNotification,
        ratioBtcXmrMin: req.body.ratioBtcXmrMin,
        ratioBtcXmrMax: req.body.ratioBtcXmrMax
    };

    //check for a Settings record for the user found
    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'UserSetting', 'user', user._id)}`);
    let userSetting = await UserSetting.findOneAndUpdate(
        { user : user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!userSetting) {
        //if no userSetting record found then create one and save
        console.log(`${methodTrace} ${getMessage('message', 1025, user.email, true, 'UserSetting')}`);
        userSetting = await (new UserSetting({ 
            user : user._id, 
            ratioBtcXmrNotification : req.body.ratioBtcXmrNotification,
            ratioBtcXmrMin: req.body.ratioBtcXmrMin,
            ratioBtcXmrMax: req.body.ratioBtcXmrMax
        })).save();

        if (!userSetting) {
            console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'UserSetting')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, null, false, 'UserSetting'),
                data : null
            });

            return;
        }
        
        console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'UserSetting')}`);
        
        //search for the user and add the personal info id
        console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'User', 'user', user._id)}`);
        user = await User.findOneAndUpdate(
            { _id : user._id },
            { $set : { userSetting } },
            { new : true, runValidators : true, context : 'query' }
        );
    }

    console.log(`${methodTrace} ${getMessage('message', 1020, user.email, true, user.email)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1020, null, false, user.email),
        data : await getUserObject(user.email, { userSetting: 'true' })
    });
};