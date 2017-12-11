const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
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
        //save a new currency investment record in DB
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

exports.update = async (req, res, next) => {}

/**
 * Get all investments for the authenticated user
 */
exports.getAllInvestments = async (req, res) => {
    const methodTrace = `${errorTrace} getAllInvestments() >`;
    //1 - Get all the investments where user is involved
    console.log(`${methodTrace} ${getMessage('message', 1034, req.user.email, true, 'all Investments', 'user', req.user.email)}`);
    const aggregationStagesArr = [{ $match : { investmentDistribution : { $elemMatch : { email : req.user.email } } } }].concat(aggregationStages(), 
            { $sort : { "currencyInvestmentData.buyingDate" : 1 } });
    let investments = await Investment.aggregate(aggregationStagesArr);

    //2 - Parse the recordset from DB and organize the info better.
    let result = beautifyInvestmentsFormat(investments);

    //3- Return investments info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, req.user.email, true, result.length, 'Investment(s)')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, result.length, 'Investment(s)'),
        data : result
    });
};

/**
 * Return the basic aggregation stages to populate investments results
 */
const aggregationStages = () => {
    return [
        { $lookup : { from : 'users', localField : 'createdBy', foreignField : '_id', as : 'creatorData' } },
        { 
            $addFields : {
                createdBy : { //replaces the exitent createdBy field with this
                    name : '$creatorData.name',
                    email : '$creatorData.email'
                }
            }
        },
        { $lookup : { from : 'teams', localField : 'team', foreignField : '_id', as : 'teamData' } },
        { 
            $addFields : {
                team : { //replaces the exitent createdBy field with this
                    name : '$teamData.name',
                    slug : '$teamData.slug',
                    description : '$teamData.description'
                }
            }
        },
        { $lookup : { from : 'currencyinvestments', localField : '_id', foreignField : 'parent', as : 'currencyInvestmentData' } }, //for currency investments
        //{ $lookup : { from : 'propertyinvestments', localField : '_id', foreignField : 'parent', as : 'propertyInvestmentData' } } //For property investments
        {
            $project : {
                __v : false,
                creatorData : false,
                teamData : false,
                currencyInvestmentData : { 
                    __v : false, 
                    _id : false
                },
                "investmentDistribution._id" : false
            }
        }
    ];
};

/**
 * Organize the information for investment retrieved from DB in a better format to send back to the client
 * 
 * @param {array} investments . The result from the DB query for investments
 * 
 * @return {array} . The formatted result
 */
const beautifyInvestmentsFormat = (investments) => {
    let result = [];
    for (let investment of investments) {
        //created by data
        investment.createdBy.name = investment.createdBy.name[0];
        investment.createdBy.email = investment.createdBy.email[0];
        investment.createdBy.gravatar = 'https://gravatar.com/avatar/' + md5(investment.createdBy.email) + '?s=200'

        //team data
        if (investment.team && investment.team.name && investment.team.name.length) {
            investment.team.name = investment.team.name[0];
            investment.team.slug = investment.team.slug[0];
            investment.team.description = investment.team.description[0];
        } else {
            investment.team = null;
        }

        //investment data
        investment.currencyInvestmentData = investment.currencyInvestmentData[0];
        
        result.push(investment);
    }

    return result;
};

/**
 * Get a team by ID
 * @param {string} id
 * @param {string} userEmail . Just for debug in console purposes.
 * 
 * @return {object} . The investment looked for or null
 */
const getByIdObject = async (id, userEmail = null) => {
    const methodTrace = `${errorTrace} getByIdObject() >`;

    //1- check for an investment with the provided id
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'Investment', 'id', id)}`); 
    try {
        id = ObjectId(id);    
    } catch(error) {
        id = null; //this is going to make the query do not return anything
    }

    const aggregationStagesArr = [{ $match : { _id : id } }].concat(aggregationStages());
    let investments = await Investment.aggregate(aggregationStagesArr);

    //2 - Parse the recordset from DB and organize the info better.
    let result = beautifyInvestmentsFormat(investments);
    
    //3 - Get the first result
    result = result.length ? result[0] : null;
    
    //4 - Return investment info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, result ? 1 : 0, 'Investment(s)')}`);
    return result;
};
exports.getByIdObject = getByIdObject;

/**
 * Get an investment by ID and sends it back to client
 */
exports.getById = async (req, res) => {
    const methodTrace = `${errorTrace} getById() >`;

    //1 - get the investment by ID
    const result = await getByIdObject(req.query.id, req.user.email);
    
    //2 - check that the user is part of the invesment
    if (result && result.investmentDistribution) {
        let found = false;
        for (let member of result.investmentDistribution) {
            if (req.user.email === member.email) {
                found = true;
                break;
            }
        }

        if (found) {
            //3.1 - The user is member of the investment, send it back to the client
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1036, null, false, 1, 'Investment(s)'),
                data : result
            });

            return;
        }
    } else if (!result){
    //Nothing found for that ID
        console.log(`${methodTrace} ${getMessage('error', 461, req.user.email, true, 'Investment')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, null, false, 'Investment'),
            data : null
        });

        return;
    }

    //3.2 - the client is not member of the investment requested
    console.log(`${methodTrace} ${getMessage('error', 462, req.user.email, true, 'Investment', req.user.email)}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 462,
        msg : getMessage('error', 462, null, false, 'Investment', req.user.email),
        data : null
    });
};