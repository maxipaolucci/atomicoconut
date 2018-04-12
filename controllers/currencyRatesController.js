const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
const promisify = require('es6-promisify');
const { getMessage } = require('../handlers/errorHandlers');
const CurrencyRate = mongoose.model('CurrencyRate');
const { ANONYMOUS_USER, FIXERIO_KEY } = require('../constants/constants');
const axios = require('axios');
const moment = require('moment');

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

/**
 * This method stores a rate into our currencyRate table in DB.
 * @param {*} ratesObject . This contains a date and a rates object for store
 * @param {*} userEmail . The current user email for debuging. If nobody is logged in then anonymous.
 */
const add = async (ratesObject, userEmail) => {
    const methodTrace = `${errorTrace} add() >`;

    //save a new record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, userEmail, true, 'CurrencyRate')}`);
    let currencyRates = await (new CurrencyRate({
        date : ratesObject.date,
        rates: ratesObject.rates
    })).save();

    if (currencyRates) {
        console.log(`${methodTrace} ${getMessage('message', 1026, userEmail, true, 'CurrencyRate')}`);
        return true;
    }

    console.log(`${methodTrace} ${getMessage('error', 459, userEmail, true, 'CurrencyRate')}`);
    return false;
};

/**
 * Get by dates . 
 */
exports.getByDates = async (req, res) => {
    const methodTrace = `${errorTrace} getByDate() >`;

    const userEmail = req.user ? userEmail : ANONYMOUS_USER; //it is not required to be logged in to access this controller

    //1 - get rates for the provided dates
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, 1, 'CurrencyRate'),
        data : {dates: req.query.dates, base: req.param.base}
    });

    return;
    //const results = await getByDatesObjects(req.query.dates, req.param.base, userEmail);
    
    if (results) {
        res.json({
            status : 'success', 
            codeno : 200,
            msg : getMessage('message', 1036, null, false, 1, 'CurrencyRate'),
            data : results
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

/**
 * Get records that matches the provided dates in the dates array
 * 
 * @param {array} dates . The dates we are looking for rates 
 * @param {*} userEmail . The current user email if logged in
 * @param {*} options . Extra options for parsing results.
 * @returns {array} . An array with the CurrencyRates for the provided dates
 */
const getByDatesObjects = async (dates, userEmail, options = null) => {
    const methodTrace = `${errorTrace} getByDateObject() >`;

    //1- check for records in DB with the provided dates
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'CurrencyRate', 'date', date)}`); 

    const aggregationStagesArr = [
        { date : { $in : dates } },
        {
            $project : {
                __v : false,
                _id : false
            }
        }
    ];
    let results = await CurrencyRate.aggregate(aggregationStagesArr);
    
    //2- if dates retrieved from DB does not match the dates requested by user then we need to retrieve data from external web aPI
    if (dates.length > results.length) {
        const indexedResults = {};
        //3- reorganize rates in a indexed structure by date to easily find/access information
        for (let rasult of results) {
            indexedResults[result.date] = result;
        }

        //4- iterate results, if date is not available then looks for it in fixer.io web API
        for (let date of dates) {
            if (!indexedResults[date]) {
                //parse the date in the fixer api format
                const formatedDate = moment(date).format('YYYY-MM-DD');
                //call webservice with date
                let newRates = null;
                axios.get(`http://data.fixer.io/api/${formatedDate}?access_key=${FIXERIO_KEY}&base=USD`)
                    .then(res => {
                        console.log(res);
                        
                    })
                    .catch(err => {
                        console.error(err);
                    });
                
                newRates = await axios(`http://data.fixer.io/api/${formatedDate}?access_key=${FIXERIO_KEY}&base=USD`);
                if (newRates) {
                    indexedResults[date] = newRates;
                    result.push({ date, rates : newRates});
                    await add({ date, rates : newRates});
                }
            }
        }
    }
     
    
    //4 - Return rates info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, results.length, 'CurrencyRate(s)')}`);
    return results;
};
//exports.getByDatesObjects = getByDatesObjects;

//si get by date no lo encuentra tengo q pedirselo al webservice, almacenarlo y devolverlo.