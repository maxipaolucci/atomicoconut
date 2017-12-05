const mongoose = require('mongoose');

const Investment = mongoose.model('Investment');
const CurrencyInvestment = mongoose.model('CurrencyInvestment');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');
const teamController = require('../controllers/teamController');

const errorTrace = 'investmentController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    const errors = req.validationErrors();
    if (errors) {
        const errorsArr = errors.map(err => err.msg);
        console.log(`${methodTrace} ${getMessage('error', 458, req.user.email, true, errorsArr)}`);
        res.status(400).json({ 
            status : "error", 
            codeno : 400,
            msg : errorsArr
        });
        return; //stop from running
    }

    
    console.log(`${methodTrace} ${getMessage('message', 1016, req.user.email, true)}`);
    next(); //call next middleware
};

exports.create = async (req, res, next) => {
    const methodTrace = `${errorTrace} create() >`;

    //get the logged in user from req
    let user = req.user;

    //get the team if provided
    let team = null;
    if (req.body.team) {
        team = await teamController.getTeamBySlugObject(req.body.team.slug, true, user.email);
    }

    //save a new investment record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, 'Investment')}`);
    let investment = await (new Investment({
        investmentType : req.body.type,
        createdBy: user._id,
        amount : req.body.investmentAmount,
        amountUnit : req.body.investmentAmountUnit,
        team : team ? team._id : null,
        investmentDistribution : req.body.investmentDistribution
    })).save();

    if (investment) {
        console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'Investment')}`);
        let currencyInvestment = await (new CurrencyInvestment({
            currencyType : req.body.type,
            parent : investment._id,
            amount : req.body.investmentData.amount,
            amountUnit : req.body.investmentData.unit,
            buyingPrice : req.body.investmentData.buyingPrice,
            buyingPriceUnit : req.body.investmentData.buyingPriceUnit,
            buyingDate : req.body.investmentData.buyingDate
        })).save();

        if (currencyInvestment) {
            console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'CurrencyInvestment')}`);
            
            console.log(`${methodTrace} ${getMessage('message', 1033, user.email, true, 'Investment')}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1033, null, false, 'Investment'),
                data : { type : investment.investmentType, id : investment.id }
            });
        } else {
            console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'CurrencyInvestment')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, null, false, 'CurrencyInvestment'),
                data : null
            });
        }

        
    } else {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'Investment')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, 'Investment'),
            data : null
        });
    }
};