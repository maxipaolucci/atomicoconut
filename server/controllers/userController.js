const mongoose = require('mongoose');
const User = mongoose.model('User');
const PersonalInfo = mongoose.model('PersonalInfo');
const FinancialInfo = mongoose.model('FinancialInfo');
const { getMessage } = require('../handlers/errorHandlers');
const { getUserObject } = require('./authController');
const { validationResult } = require('express-validator');

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

exports.updateAccount = async (req, res) => {
    const methodTrace = `${errorTrace} updateAccount() >`;
    const updates = {
        name : req.body.name,
        email : req.body.email,
        currency : req.body.currency
    };
    
    console.log(`${methodTrace} ${getMessage('message', 1019, updates.email, true, updates.email)}`);
    const user = await User.findOneAndUpdate(
        { _id : req.user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    console.log(`${methodTrace} ${getMessage('message', 1020, updates.email, true, user.email)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1020, null, false, user.email),
        data : await getUserObject(user.email)
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

        if (personalInfo) {
            console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'PersonalInfo')}`);
            
            //search for the user and add the personal info id
            console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'User', 'user', user._id)}`);
            user = await User.findOneAndUpdate(
                { _id : user._id },
                { $set : { personalInfo } },
                { new : true, runValidators : true, context : 'query' }
            );

            user = await getUserObject(user.email, { personalInfo: 'true' });

            console.log(`${methodTrace} ${getMessage('message', 1020, user.email, true, user.email)}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1020, null, false, user.email),
                data : user
            });
        } else {
            console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'PersonalInfo')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, null, false, 'PersonalInfo'),
                data : null
            });
        }

        return;
    }

    user = await getUserObject(user.email, { personalInfo: 'true' });

    console.log(`${methodTrace} ${getMessage('message', 1028, user.email, true, 'PersonalInfo')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1028, null, false, 'PersonalInfo'),
        data : user
    });
};

/**
 * This methods double checks that the loggedin user in the session matches the user email provided by the client service call
 */
exports.checkLoggedInUserWithEmail = async (req, res, next) => {
    const methodTrace = `${errorTrace} checkLoggedInUserWithEmail() >`;
    
    const email = req.body.email ? req.body.email : req.query.email;
    //check for a user with the provided email
    console.log(`${methodTrace} ${getMessage('message', 1029, email, true, email)}`);
    let user = await User.findOne({ email });
    if (!user || user.email !== req.user.email) {
        console.log(`${methodTrace} ${getMessage('error', 460, email, true, email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 460,
            msg : getMessage('error', 460, null, false, email),
            data : null
        });
        return;
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1030, user.email, true, user.email)}`);
    next();
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

        if (financialInfo) {
            console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'FinancialInfo')}`);

            //search for the user and add the new financial info id
            console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'User', 'id', user._id)}`);
            user = await User.findOneAndUpdate(
                { _id : user._id },
                { $set : { financialInfo } },
                { new : true, runValidators : true, context : 'query' }
            );

            console.log(`${methodTrace} ${getMessage('message', 1020, user.email, true, user.email)}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1020, null, false, user.email),
                data : await getUserObject(user.email, { financialInfo: 'true' })
            });
        } else {
            console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'FinancialInfo')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, null, false, 'FinancialInfo'),
                data : null
            });
        }

        return;
    }
        
    console.log(`${methodTrace} ${getMessage('message', 1028, user.email, true, 'FinancialInfo')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1028, null, false, 'FinancialInfo'),
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
} 
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
} 