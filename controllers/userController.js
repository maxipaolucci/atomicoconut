const mongoose = require('mongoose');
const User = mongoose.model('User');
const PersonalInfo = mongoose.model('PersonalInfo');
const FinancialInfo = mongoose.model('FinancialInfo');
const promisify = require('es6-promisify');
const { getMessage } = require('../handlers/errorHandlers');
const { getUserDataObject } = require('../handlers/userHandlers');

const errorTrace = 'userController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    console.log(`${methodTrace} ${getMessage('message', 1015)}`);
    req.sanitizeBody('name'); //this method comes with the expressValidator plugin we added in app.js. With this we sanitze the value in req.body.name
    req.checkBody('name', 'You must supply a name!').notEmpty(); //same as above check for not empty
    req.checkBody('email', 'That Email is not valid!').isEmail(); //same as above. All this methods are in express validator
    req.sanitizeBody('email');
            // .normalizeEmail({
            //     remove_dots : false,
            //     remove_extension : false,
            //     gmail_remove_subaddress : false
            // });
    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.checkBody('password-confirm', 'Confirmed password cannot be blank').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        const errorsArr = errors.map(err => err.msg);
        console.log(`${methodTrace} ${getMessage('error', 458, errorsArr)}`);
        res.status(400).json({ 
            status : "error", 
            codeno : 400,
            msg : errorsArr
        });
        return; //stop from running
    }

    
    console.log(`${methodTrace} ${getMessage('message', 1016)}`);
    next(); //call next middleware
};

exports.register = async (req, res, next) => {
    const methodTrace = `${errorTrace} register() >`;

    const user = new User({ email : req.body.email, name : req.body.name, personalInfo : null });
    const register = promisify(User.register, User); //with promisify if the method is in an object then we pass athe object as 2nd param. 
                                                    //this User.register function was added to model by passportLocalMongoose plugin in the user schema. 

    console.log(`${methodTrace} ${getMessage('message', 1017, user.email)}`);
    await register(user, req.body.password); //this stores a hash of the password in database (thanks to the plugin) 
    console.log(`${methodTrace} ${getMessage('message', 1018, user.email)}`);
    next(); //call next middleware
};

exports.updateAccount = async (req, res) => {
    const methodTrace = `${errorTrace} updateAccount() >`;
    const updates = {
        name : req.body.name,
        email: req.body.email
    };
    
    console.log(`${methodTrace} ${getMessage('message', 1019, updates.email)}`);
    const user = await User.findOneAndUpdate(
        { _id : req.user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    console.log(`${methodTrace} ${getMessage('message', 1020, user.email)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1020, user.email),
        data : getUserDataObject(user)
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
    console.log(`${methodTrace} ${getMessage('message', 1024, 'PersonalInfo', 'user', user._id)}`);
    let personalInfo = await PersonalInfo.findOneAndUpdate(
        { user : user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!personalInfo) {
        //if no personalInfo record found then create one and save
        console.log(`${methodTrace} ${getMessage('message', 1025, 'PersonalInfo')}`);
        personalInfo = await (new PersonalInfo({ 
            user : user._id, 
            birthday : req.body.birthday 
        })).save();

        if (personalInfo) {
            console.log(`${methodTrace} ${getMessage('message', 1026, 'PersonalInfo')}`);
            
            //search for the user and add the personal info id
            console.log(`${methodTrace} ${getMessage('message', 1024, 'User', 'user', user._id)}`);
            user = await User.findOneAndUpdate(
                { _id : req.user._id },
                { $set : { personalInfo } },
                { new : true, runValidators : true, context : 'query' }
            );

            console.log(`${methodTrace} ${getMessage('message', 1020, user.email)}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1020, user.email),
                data : null
            });
        } else {
            console.log(`${methodTrace} ${getMessage('error', 459, 'PersonalInfo')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, 'PersonalInfo'),
                data : null
            });
        }

        return;
    }

    console.log(`${methodTrace} ${getMessage('message', 1028, 'PersonalInfo')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1028, 'PersonalInfo'),
        data : null
    });
};

/**
 * This methods double checks that the loggedin user in the session matches the user email provided by the client service call
 */
exports.checkLoggedInUserWithEmail = async (req, res, next) => {
    const methodTrace = `${errorTrace} checkLoggedInUserWithEmail() >`;
    //check for a user with the provided email
    console.log(`${methodTrace} ${getMessage('message', 1029, req.body.email)}`);
    let user = await User.findOne({ email : req.body.email });
    if (!user || user.email !== req.user.email) {
        console.log(`${methodTrace} ${getMessage('error', 460, req.body.email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 460,
            msg : getMessage('error', 460, email),
            data : null
        });
        return;
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1030, user.email)}`);
    next();
};

exports.updateAccountFinancialInfo = async (req, res) => {
    const methodTrace = `${errorTrace} updateAccountFinancialInfo() >`;
    
    //get the logged in user from req
    let user = req.user;
    
    //the fields to update
    const updates = {
        annualIncome : req.body.annualIncome,
        netWorth : req.body.netWorth,
        incomeTaxRate : req.body.incomeTaxRate
    };

    //check for a FinancialInfo record for the user
    console.log(`${methodTrace} ${getMessage('message', 1024, 'FinancialInfo', 'user', user._id)}`);
    let financialInfo = await FinancialInfo.findOneAndUpdate(
        { user : user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!financialInfo) {
        //if no financialInfo record found then create one and save
        console.log(`${methodTrace} ${getMessage('message', 1025, 'FinancialInfo')}`);
        financialInfo = await (new FinancialInfo({ 
            user : user._id, 
            annualIncome : req.body.annualIncome,
            netWorth : req.body.netWorth,
            incomeTaxRate : req.body.incomeTaxRate
        })).save();

        if (financialInfo) {
            console.log(`${methodTrace} ${getMessage('message', 1026, 'FinancialInfo')}`);

            //search for the user and add the new financial info id
            console.log(`${methodTrace} ${getMessage('message', 1024, 'User', 'id', user._id)}`);
            user = await User.findOneAndUpdate(
                { _id : user._id },
                { $set : { financialInfo } },
                { new : true, runValidators : true, context : 'query' }
            );

            console.log(`${methodTrace} ${getMessage('message', 1020, user.email)}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1020, user.email),
                data : null
            });
        } else {
            console.log(`${methodTrace} ${getMessage('error', 459, 'FinancialInfo')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, 'FinancialInfo'),
                data : null
            });
        }

        return;
    }
        
    console.log(`${methodTrace} ${getMessage('message', 1028, 'FinancialInfo')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1028, 'FinancialInfo'),
        data : null
    });
};