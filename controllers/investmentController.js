const mongoose = require('mongoose');

const User = mongoose.model('User');
const Team = mongoose.model('Team');
const TeamUser = mongoose.model('TeamUser');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');

const errorTrace = 'investmentController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    console.log(`${methodTrace} ${getMessage('message', 1015, req.user.email, true)}`);
    
};
