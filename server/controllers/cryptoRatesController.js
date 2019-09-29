const { getMessage } = require('../handlers/errorHandlers');
const { ANONYMOUS_USER, CRYPTO_RATES_SERVER_URL, CRYPTO_CURRENCIES } = require('../constants/constants');
const axios = require('axios');
const mail = require('../handlers/mail');

const errorTrace = 'cryptoRatesController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    const userEmail = req.user ? req.user.email : ANONYMOUS_USER; //it is not required to be logged in to access this controller

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
 * Get today rates . 
 */
exports.getTodayRates = async (req, res) => {
    const methodTrace = `${errorTrace} getTodayRates() >`;

    const userEmail = req.user ? req.user.email : ANONYMOUS_USER; //it is not required to be logged in to access this controller

    //1 - get rates
    const results = await getTodayRatesFromWebservice(req.params.base, userEmail);
    
    if (!results) {
        //Nothing found for that date
        console.log(`${methodTrace} ${getMessage('error', 461, userEmail, true, 'crypto rates')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, userEmail, false, 'crypto rates'),
            data : null
        });

        return;
    }

    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, 1, 'crypto rates object'),
        data : results
    });
};


/**
 * @param {string} source . The base currency to get results from API 
 * @param {string} userEmail . The current user email if logged in.
 * 
 * @return {*} . An object with the rates for the provided date  
 */
const getTodayRatesFromWebservice = async (source = CRYPTO_CURRENCIES.BITCOIN, userEmail) => {
    const methodTrace = `${errorTrace} getTodayRatesFromWebservice() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1047, userEmail, true, 'Coincap Service API', 'crypto', source)}`); 
    
    const url = `${CRYPTO_RATES_SERVER_URL}${source}`;
    let response = await axios.get(url);
    if (response && response.status === 200 && response.data 
            && response.data.data && response.data.data.id === source) {
        return response.data.data;
    } 

    console.log(`${methodTrace} ${getMessage('error', 477, userEmail, true, 'Coincap Service API', 'crypto', source)}`);
    return null;
};

const alertCryptoRatio = async(fromCrypto, toCrypto) => {
    const methodTrace = `${errorTrace} alertCryptoRatio() >`;

    const fromCryptoData = await getTodayRatesFromWebservice(fromCrypto, ANONYMOUS_USER);
    const toCryptoData = await getTodayRatesFromWebservice(toCrypto, ANONYMOUS_USER);

    const ratio = toCryptoData.priceUsd / fromCryptoData.priceUsd;
    const toEmail = 'maxipaolucci@gmail.com';

    console.log(ratio);
    console.log(`${methodTrace} ${getMessage('message', 1052, ANONYMOUS_USER, true, 'Crypto ratio', toEmail)}`); 
    mail.send({
        toEmail,
        subject : `AtomiCoconut - Ratio ${fromCrypto}/${toCrypto}: ${ratio}`,
        ratio,
        fromCrypto,
        toCrypto,
        filename : 'alert-crypto-ratio' //this is going to be the mail template file
    });
    console.log(`${methodTrace} ${getMessage('message', 1053, ANONYMOUS_USER, true, toEmail)}`); 
};
exports.alertCryptoRatio = alertCryptoRatio;