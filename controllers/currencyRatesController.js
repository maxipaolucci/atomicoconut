const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
const promisify = require('es6-promisify');
const { getMessage } = require('../handlers/errorHandlers');
const CurrencyRate = mongoose.model('CurrencyRate');
const { ANONYMOUS_USER } = require('../constants/constants');

const errorTrace = 'currencyRatesController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    const userEmail = req.user ? userEmail : ANONYMOUS_USER; //it is not required to be logged in to access this controller

    const errors = req.validationErrors();
    if (errors) {
        const errorsArr = errors.map(err => err.msg);
        console.log(`${methodTrace} ${getMessage('error', 458, userEmail, true, errorsArr)}`);
        res.status(400).json({ 
            status : "error", 
            codeno : 400,
            msg : errorsArr
        });
        return; //stop from running
    }

    
    console.log(`${methodTrace} ${getMessage('message', 1016, userEmail, true)}`);
    next(); //call next middleware
};

exports.add = async (req, res, next) => {
    const methodTrace = `${errorTrace} add() >`;

    const userEmail = req.user ? userEmail : ANONYMOUS_USER; //it is not required to be logged in to access this controller

    //llamar al web service con un array de fechas obtenerlas y hacer un insert many
    ///////////////////////////////////////////////////////////

    //save a new record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, userEmail, true, 'CurrencyRate')}`);
    let currencyRates = await (new CurrencyRate({
        date : req.body.date,
        rates: req.body.rates
    })).save();

    if (currencyRates) {
        console.log(`${methodTrace} ${getMessage('message', 1026, userEmail, true, 'CurrencyRate')}`);
        res.json({
            status : 'success', 
            codeno : 200,
            msg : getMessage('message', 1026, null, false, 'CurrencyRate'),
            data : { date : currencyRates.date, rates : currencyRates.rates }
        });

        return;
    }

    console.log(`${methodTrace} ${getMessage('error', 459, userEmail, true, 'CurrencyRate')}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 459,
        msg : getMessage('error', 459, null, false, 'CurrencyRate'),
        data : null
    });
};

/**
 * Get by date
 */
exports.getByDate = async (req, res) => {
    const methodTrace = `${errorTrace} getByDate() >`;

    const userEmail = req.user ? userEmail : ANONYMOUS_USER; //it is not required to be logged in to access this controller

    //1 - get record by Date
    const result = await getByDateObject(req.params.date, userEmail);
    
    if (result) {
        res.json({
            status : 'success', 
            codeno : 200,
            msg : getMessage('message', 1036, null, false, 1, 'CurrencyRate'),
            data : result
        });

        return;
    }

    //Nothing found for that date
    console.log(`${methodTrace} ${getMessage('error', 461, userEmail, true, 'CurrencyRate')}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 461,
        msg : getMessage('error', 461, null, false, 'CurrencyRate'),
        data : null
    });
};

const getByDateObject = async (date, userEmail, options = null) => {
    const methodTrace = `${errorTrace} getByDateObject() >`;

    //1- check for a record with the provided date
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'CurrencyRate', 'date', date)}`); 

    const aggregationStagesArr = [
        { $match : { date } },
        {
            $project : {
                __v : false,
                _id : false
            }
        }
    ];
    let results = await CurrencyRate.aggregate(aggregationStagesArr);

    //3 - Get the first result
    result = results.length ? results[0] : null;
    
    //4 - Return rates info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, result ? 1 : 0, 'CurrencyRate(s)')}`);
    return result;
};
exports.getByDateObject = getByDateObject;

//si get by date no lo encuentra tengo q pedirselo al webservice, almacenarlo y devolverlo.