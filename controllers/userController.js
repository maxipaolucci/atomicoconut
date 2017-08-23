const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

const errorTrace = 'userController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    req.sanitizeBody('name'); //this method comes with the expressValidator plugin we added in app.js. With this we sanitze the value in req.body.name
    req.checkBody('name', 'You must supply a name!').notEmpty(); //same as above check for not empty
    req.checkBody('email', 'That Email is not valid!').isEmail(); //same as above. All this methods are in express validator
    req.sanitizeBody('email').normalizeEmail({
        remove_dots : false,
        remove_extension : false,
        gmail_remove_subaddress : false
    });
    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.checkBody('password-confirm', 'Confirmed password cannot be blank').notEmpty();
    req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        //req.flash('error', errors.map(err => err.msg));
        //res.json('register', { title : 'Register', body : req.body, flashes : req.flash() });
        res.status(400).json({ 
            status : "error", 
            codeno : 400,
            msg : errors.map(err => err.msg)});
        return; //stop from running
    }

    console.log(`${methodTrace} Register Validation ok!!!!!`);
    next(); //call next middleware
};

exports.register = async (req, res, next) => {
    const methodTrace = `${errorTrace} register() >`;

    const user = new User({ email : req.body.email, name : req.body.name });
    const register = promisify(User.register, User); //with promisify if the method is in an object then we pass athe object as 2nd param. 
                                                    //this User.register function was added to model by passportLocalMongoose plugin in the user schema. 
    
    console.log(`${methodTrace} trying to register ${user.email}...`);
    await register(user, req.body.password); //this stores a hash of the password in database (thanks to the plugin) 
    console.log(`${methodTrace} tried to register ${user.email}`);
    next(); //call next middleware
};

exports.updateAccount = async (req, res) => {
    const updates = {
        name : req.body.name,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id : req.user._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    res.json({
        status : 'success', 
        codeno : 200,
        msg : 'Profile successfully edited.',
        data : { name : user.name, email : user.email }
    });
};