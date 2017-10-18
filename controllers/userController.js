const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const { getMessage } = require('../handlers/errorHandlers');
const { accessToInvestments } = require('../handlers/userHandlers');

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

    const user = new User({ email : req.body.email, name : req.body.name });
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
        data : { name : user.name, email : user.email, avatar : user.gravatar, accessToInvestments : accessToInvestments(user.email) }
    });
};