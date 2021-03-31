const { getMessage } = require('../handlers/errorHandlers');
const { ANONYMOUS_USER, CRYPTO_RATES_SERVER_URL, CRYPTO_CURRENCIES } = require('../constants/constants');

const mail = require('../handlers/mail');
const AWSXRay = require('aws-xray-sdk');

const errorTrace = 'cryptoRatesController >';

AWSXRay.captureHTTPsGlobal(require('http'));

AWSXRay.captureHTTPsGlobal(require('https'));
let http = require('http');
let https = require('https');
// AWSXRay.capturePromise();
const axios = require('axios');

const axiosInstance = axios.create({
    httpAgent: new http.Agent(),
    httpsAgent: new https.Agent(),
  }); // Instrument axious instance

/**
 * Get many today rates of and array of cryptos. 
 */
exports.getTodayRates = async (req, res) => {
    const methodTrace = `${errorTrace} getTodayRates() >`;

    const userEmail = req.user ? req.user.email : ANONYMOUS_USER; //it is not required to be logged in to access this controller

    const cryptos = req.query.cryptos.split(',');

    let results = {};
    for (let crypto of cryptos) {
        //1 - get rates
        const rates = await getTodayRatesFromWebservice(crypto, userEmail);
        results[crypto] = rates;
    }

    const resultsAmount = Object.keys(results).length; 
    if (!resultsAmount) {
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
        msg : getMessage('message', 1036, null, false, resultsAmount, 'crypto rates object(s)'),
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
    let response = null;

    try {
        response = await axiosInstance.get(url);
        if (response && response.status === 200 && response.data 
                && response.data.data && response.data.data.id === source) {
            return response.data.data;
        } 

        throw new Error(getMessage('error', 477, userEmail, true, 'Coincap Service API', 'crypto', source))
    } catch(err) {
        console.log(`${methodTrace} ${err.toString()}`);
        return null;
    }
};

/**
 * Sends an email with the crypto ratio between two crypto currencies
 * 
 * @param {string} fromCrypto
 * @param {string} toCrypto 
 */
const alertCryptoRatio = async(fromCrypto, toCrypto) => {
    const methodTrace = `${errorTrace} alertCryptoRatio() >`;

    let fromCryptoData = null;
    let toCryptoData = null;
    
    try {
        fromCryptoData = await getTodayRatesFromWebservice(fromCrypto, ANONYMOUS_USER);
        toCryptoData = await getTodayRatesFromWebservice(toCrypto, ANONYMOUS_USER);
        
        
        if (fromCryptoData && toCryptoData) {
            const ratio = fromCryptoData.priceUsd / toCryptoData.priceUsd;
            const alert = (ratio >= 0.01 /* || ratio < 0.005 */) ? '[URGENT]': '';
            const toEmail = 'maxipaolucci@gmail.com';
            
            console.log(`${methodTrace} ${getMessage('message', 1054, ANONYMOUS_USER, true, 'Crypto ratio', toEmail)}`); 
            mail.send({
                toEmail,
                fromEmail: 'alert@atomicoconut.com',
                subject : `${alert} Ratio ${fromCrypto}/${toCrypto}: ${ratio}`,
                ratio,
                fromCrypto,
                fromCyptoPriceUsd : fromCryptoData.priceUsd,
                toCyptoPriceUsd : toCryptoData.priceUsd,
                toCrypto,
                filename : 'alert-crypto-ratio' //this is going to be the mail template file
            });
            console.log(`${methodTrace} ${getMessage('message', 1055, ANONYMOUS_USER, true, toEmail)}`);
        } else {
            throw new Error(getMessage('error', 478, ANONYMOUS_USER, true, 'Coincap Service API'))
        }
        
    } catch(err) {
        console.log(`${methodTrace} ${err.toString()}`);
    } 
};
exports.alertCryptoRatio = alertCryptoRatio;


exports.test = async (req, res) => {
    const methodTrace = `${errorTrace} test() >`;

    const endpoint = 'https://google.com/';
    
    https.get(endpoint, (response) => {
        response.on('data', () => {});
        response.on('error', (err) => {
            console.log(`${methodTrace} Encountered error while making HTTPS request: ${err}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 461,
                msg : `Encountered error while making HTTPS request: ${err}`,
                data : null
            });
        });
        response.on('end', () => {
            mail.send({
                toEmail: 'maxipaolucci@gmail.com',
                fromEmail: 'test@atomicoconut.com',
                subject : `test email`,
                accountName : 'test',
                accountEmail : 'test',
                filename : 'account-created' //this is going to be the mail template file
            });
            res.json({
                status : 'success', 
                codeno : 200,
                msg : `Successfully reached ${endpoint}.`,
                data : { status: "OK" }
            });
        });
    });
};