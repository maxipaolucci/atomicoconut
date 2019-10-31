const mongoose = require('mongoose');
const { getMessage } = require('../handlers/errorHandlers');
const CurrencyRate = mongoose.model('CurrencyRate');
const { ANONYMOUS_USER } = require('../constants/constants');
const axios = require('axios');

const errorTrace = 'currencyRatesController >';


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
    const methodTrace = `${errorTrace} getByDates() >`;

    const userEmail = req.user ? req.user.email : ANONYMOUS_USER; //it is not required to be logged in to access this controller

    //1 - get rates for the provided dates
    const results = await getByDatesObjects(req.query.dates.split(','), req.params.base, userEmail);
    
    if (results && Object.keys(results).length) {
        res.json({
            status : 'success', 
            codeno : 200,
            msg : getMessage('message', 1036, null, false, Object.keys(results).length, 'CurrencyRate(s)'),
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
 * @param {string} base . The base currency to get results from Fixer.IO API 
 * @param {string} userEmail . The current user email if logged in
 * @param {*} options . Extra options for parsing results.
 * @returns {object} . An object with the CurrencyRates for the provided dates as key
 */
const getByDatesObjects = async (dates, base = 'USD', userEmail, options = null) => {
    const methodTrace = `${errorTrace} getByDatesObjects() >`;

    //1- check for records in DB with the provided dates
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'CurrencyRate', 'dates', `[ ${dates} ]`)}`); 
    const aggregationStagesArr = [
        { $match : { date : { $in : dates } } },
        {
            $project : {
                __v : false,
                _id : false
            }
        }
    ];
    let results = await CurrencyRate.aggregate(aggregationStagesArr);
    let indexedResults = {};
    //2- reorganize rates in a indexed structure by date to easily find/access information
    for (let result of results) {
        indexedResults[result.date] = result.rates;
    }
    
    //3- if dates retrieved from DB does not match the dates requested by user then we need to retrieve data from external web aPI
    if (dates.length > results.length) {
        //4- iterate results, if date is not available then looks for it in fixer.io web API
        for (let date of dates) {
            if (!indexedResults[date]) {
                //5- call webservice to get rates for the date
                let rates = null;
                rates = await getRatesFromWebservice(date, base, userEmail);
                
                if (rates && Object.keys(rates).length) {
                    //6- persist results in DB
                    indexedResults[date] = rates;
                    results.push({ date, rates });
                    await add({ date, rates });
                }
            }
        }
    }
     
    //7- Return rates info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, results.length, 'CurrencyRate(s)')}`);
    return indexedResults;
};  

/**
 * @param {string} date . The date we are looking for rates
 * @param {string} source . The base currency to get results from API 
 * @param {string} userEmail . The current user email if logged in.
 * 
 * @return {*} . An object with the rates for the provided date  
 */
const getRatesFromWebservice = async (date, source = 'USD', userEmail) => {
    const methodTrace = `${errorTrace} getRatesFromWebservice() >`;
    source = 'USD'; //the free plan we have only supports USD
    
    console.log(`${methodTrace} ${getMessage('message', 1047, userEmail, true, 'CurrencyLayer Service API', 'date', date)}`); 
    
    const url = `http://apilayer.net/api/historical?date=${date}&access_key=${process.env.CURRENCYLAYER_KEY}&source=${source}&format=1`;
    //console.log(url);
    
    let response = await axios.get(url);
    if (response && response.status === 200 && response.data) {
        const data = response.data;
        if (data.success === true && data.quotes) {
            console.log(`${methodTrace} ${getMessage('message', 1048, userEmail, true, 'CurrencyLayer Service API')}`);
            return data.quotes;
        } else if (data.success === false && data.error && data.error.code === 302) {
            //if the service failed because the format of the date, we are probably asking today date or a future date because of the client timezone => return latest rates available in the system
            console.log(`${methodTrace} ${getMessage('message', 1049, userEmail, true, 'CurrencyLayer Service API')}`); 
            
            response = await axios.get(`http://apilayer.net/api/live?access_key=${process.env.CURRENCYLAYER_KEY}&source=${source}&format=1`);
            if (response && response.status === 200 && response.data) {
                const data = response.data;
                
                if (data.success === true && data.quotes) {
                    console.log(`${methodTrace} ${getMessage('message', 1048, userEmail, true, 'CurrencyLayer Service API')}`);
                    return data.quotes;
                }
            }
        }
    } 

    console.log(`${methodTrace} ${getMessage('error', 477, userEmail, true, 'CurrencyLayer Service API', 'date', date)}`);
    return null;
};
//exports.getByDatesObjects = getByDatesObjects;

//si get by date no lo encuentra tengo q pedirselo al webservice, almacenarlo y devolverlo.