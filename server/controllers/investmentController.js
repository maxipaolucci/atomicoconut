const { INVESTMENTS_TYPES, PUSHER_CHANNEL } = require('../constants/constants');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
const Investment = mongoose.model('Investment');
const CurrencyInvestment = mongoose.model('CurrencyInvestment');
const PropertyInvestment = mongoose.model('PropertyInvestment');
const { getMessage } = require('../handlers/errorHandlers');
const teamController = require('../controllers/teamController');
const { getPusher } = require('../handlers/utils');

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

    //check the investment type to be a valid one
    if (!(req.body.type === INVESTMENTS_TYPES.CRYPTO || req.body.type === INVESTMENTS_TYPES.CURRENCY || 
            req.body.type === INVESTMENTS_TYPES.PROPERTY)) {
        
        console.log(`${methodTrace} ${getMessage('error', 474, user.email, true, req.body.type)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 474,
            msg : getMessage('error', 474, null, false, req.body.type),
            data : null
        });

        return;
    }

    //check the property was created by the user creating the investment
    if (req.body.type === INVESTMENTS_TYPES.PROPERTY && req.body.investmentData.property.createdBy.email !== user.email) {
        console.log(`${methodTrace} ${getMessage('error', 476, user.email, true, 'Property Investment', 'Property')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 476,
            msg : getMessage('error', 476, null, false, req.body.type),
            data : null
        });

        return;
    }

    //get the team if provided
    let team = null;
    if (req.body.team) {
        team = await teamController.getTeamBySlugObject(req.body.team.slug, user.email, { withId : true });
    }

    //save a new investment record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, 'Investment')}`);
    let investment = await (new Investment({
        investmentType : req.body.type,
        createdBy: user._id,
        updatedBy: user._id,
        createdOn : req.body.createdOn,
        updatedOn : req.body.updatedOn,
        amount : req.body.investmentAmount,
        amountUnit : req.body.investmentAmountUnit,
        team : team ? team._id : null,
        investmentDistribution : req.body.investmentDistribution,
        loanAmount : req.body.loanAmount,
        loanAmountUnit : req.body.loanAmountUnit
    })).save();

    if (!investment) {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'Investment')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, 'Investment'),
            data : null
        });

        return;
    }
        
    //save a new investment type record in DB
    console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'Investment')}`);
    let investmentType = null;
    if (investment.investmentType === INVESTMENTS_TYPES.CRYPTO || investment.investmentType === INVESTMENTS_TYPES.CURRENCY) {
        investmentType = await createCurrencyInvestment(req.body.type, investment._id, req.body.investmentData);
    } else if (investment.investmentType === INVESTMENTS_TYPES.PROPERTY) {
        investmentType = await createPropertyInvestment(investment._id, req.body.investmentData);
    }
    
    if (!investmentType) {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'CurrencyInvestment')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, 'CurrencyInvestment'),
            data : null
        });

        return;
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'CurrencyInvestment')}`);
    
    // Send notification to team members 
    if (team && investment.team) {
        // send push notification to client
        getPusher().trigger(PUSHER_CHANNEL, 'investment-created', {
            email: user.email,
            name: user.name,
            teamName: team.name,
            teamSlug: team.slug
        }, req.body.pusherSocketID);    
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1033, user.email, true, 'Investment')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1033, null, false, 'Investment'),
        data : { type : investment.investmentType, id : investment._id }
    });
};

const createCurrencyInvestment = async (currencyType, parentId, investmentData) => {
    const methodTrace = `${errorTrace} create() > createCurrencyInvestment() > `;

    return await (new CurrencyInvestment({
        currencyType,
        parent : parentId,
        amount : investmentData.amount,
        amountUnit : investmentData.unit,
        buyingPrice : investmentData.buyingPrice,
        buyingPriceUnit : investmentData.buyingPriceUnit,
        buyingDate : investmentData.buyingDate
    })).save();
};

const createPropertyInvestment = async (parentId, investmentData) => {
    const methodTrace = `${errorTrace} create() > createPropetyInvestment() > `;

    return await (new PropertyInvestment({
        parent : parentId,
        property : investmentData.property.id,
        buyingPrice : investmentData.buyingPrice,
        buyingPriceUnit : investmentData.buyingPriceUnit,
        buyingDate : investmentData.buyingDate
    })).save();
};

exports.update = async (req, res, next) => {
    const methodTrace = `${errorTrace} update() >`;
    
    //get the logged in user from req
    let user = req.user;

    //1 - get the investment by ID
    let investment = await getByIdObject(req.body.id, user.email, {
        investmentDataId : true
    });

    if (!investment) {
        //no investment found with that id
        console.log(`${methodTrace} ${getMessage('error', 461, user.email, true,'Investment')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, null, false, 'Investment'),
            data : null
        });

        return;
    }

    //check the client is part of this investment
    let found = false;
    for (let portion of investment.investmentDistribution) {
        if (user.email === portion.email) {
            found = true;
            break;
        }
    }

    if (!found) {
        //the client is not an owner  of the investment requested
        console.log(`${methodTrace} ${getMessage('error', 470, user.email, true, 'Investment')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 470,
            msg : getMessage('error', 470, null, false, 'Investment'),
            data : null
        });

        return;
    }

    //get the team if provided
    let team = null;
    if (req.body.team) {
        team = await teamController.getTeamBySlugObject(req.body.team.slug, user.email, { withId : true });
    }

    //fields to update
    const originalInvestment = investment; //we save the investmen id for logs
    const updates = {
        updatedBy: user._id,
        updatedOn : req.body.updatedOn,
        amount : req.body.investmentAmount,
        amountUnit : req.body.investmentAmountUnit,
        team : team ? team._id : null,
        investmentDistribution : req.body.investmentDistribution,
        loanAmount : req.body.loanAmount,
        loanAmountUnit : req.body.loanAmountUnit
    };

    //update investment
    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'Investment', '_id', investment._id)}`);
    investment = await Investment.findOneAndUpdate(
        { _id : investment._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!investment) {
        //failed to update investment
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, 'Investment', '_id', originalInvestment._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, 'Investment', '_id', originalInvestment._id),
            data : null
        });

        return;
    }
    console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, 'Investment')}`);

    let investmentData = null;
    let modelName = null;
    if (investment.investmentType === INVESTMENTS_TYPES.CRYPTO || investment.investmentType === INVESTMENTS_TYPES.CURRENCY) {
        modelName = 'CurrencyInvestment';
        const investmentDataUpdates = {
            amount : req.body.investmentData.amount,
            amountUnit : req.body.investmentData.unit,
            buyingPrice : req.body.investmentData.buyingPrice,
            buyingPriceUnit : req.body.investmentData.buyingPriceUnit,
            buyingDate : req.body.investmentData.buyingDate
        };
        
        investmentData = await CurrencyInvestment.findOneAndUpdate(
            { _id : originalInvestment.investmentData._id },
            { $set : investmentDataUpdates },
            { new : true, runValidators : true, context : 'query' }
        );
    } else if (investment.investmentType === INVESTMENTS_TYPES.PROPERTY) {
        modelName = 'PropertyInvestment';
        const investmentDataUpdates = {
            buyingPrice : req.body.investmentData.buyingPrice,
            buyingPriceUnit : req.body.investmentData.buyingPriceUnit,
            buyingDate : req.body.investmentData.buyingDate,
            property : req.body.investmentData.property.id
        };
        
        investmentData = await PropertyInvestment.findOneAndUpdate(
            { _id : originalInvestment.investmentData._id },
            { $set : investmentDataUpdates },
            { new : true, runValidators : true, context : 'query' }
        );
    }

    if (!investmentData) {
        //failed to update investment data
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, 'CurrencyInvestment', '_id', investment.investmentData._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, 'CurrencyInvestment', '_id', investment.investmentData._id),
            data : null
        });

        return;
    }

    //success
    console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, modelName)}`);
    
    // Send notification to team members 
    if (team && investment.team) {
        // send push notification to client
        getPusher().trigger(PUSHER_CHANNEL, 'investment-updated', {
            email: user.email,
            name: user.name,
            investment: {
                team : {
                    name: team.name,
                    slug: team.slug,
                    members: team.members
                },
                id : investment._id
            },
            teamName: team.name, //TODO remove this, cause is duplicate in team
            teamSlug: team.slug //TODO remove this, cause is duplicate in team
        }, req.body.pusherSocketID);    
    }

    console.log(`${methodTrace} ${getMessage('message', 1042, user.email, true, 'Investment')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1042, null, false, 'Investment'),
        data : { type : investment.investmentType, id : investment._id }
    });    
};

/**
 * Get all investments for the authenticated user
 */
exports.getAllInvestments = async (req, res) => {
    const methodTrace = `${errorTrace} getAllInvestments() >`;
    //1 - Get all the investments where user is involved
    console.log(`${methodTrace} ${getMessage('message', 1034, req.user.email, true, 'all Investments', 'user', req.user.email)}`);
    const aggregationStagesArr = [{ $match : { investmentDistribution : { $elemMatch : { email : req.user.email } } } }].concat(aggregationStages(), 
            { $sort : { "buyingDate" : 1 } });
    let investments = await Investment.aggregate(aggregationStagesArr);

    //2 - Parse the recordset from DB and organize the info better.
    let result = await beautifyInvestmentsFormat(investments);

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
        { $lookup : { from : 'users', localField : 'updatedBy', foreignField : '_id', as : 'updatorData' } },
        { 
            $addFields : {
                updatedBy : { //replaces the exitent createdBy field with this
                    name : '$updatorData.name',
                    email : '$updatorData.email'
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
        { 
            $addFields : {
                currencyInvestmentBuyingDate : '$currencyInvestmentData.buyingDate' //for sorting
            }
        },
        { $lookup : { from : 'propertyinvestments', localField : '_id', foreignField : 'parent', as : 'propertyInvestmentData' } }, //For property investments
        { 
            $addFields : {
                propertyId : '$propertyInvestmentData.property',
                propertyInvestmentBuyingDate : '$propertyInvestmentData.buyingDate' //for sorting
            }
        },
        { $lookup : { from : 'properties', localField : 'propertyId', foreignField : '_id', as : 'propertyData' } }, //For property investments
        {
            $addFields : {
                buyingDate : { $concatArrays: [ "$currencyInvestmentBuyingDate", "$propertyInvestmentBuyingDate" ] } //for sorting , concat both fields retrieved before as we know just one is going to have a date
            }
        },
        {
            $project : {
                __v : false,
                creatorData : false,
                updatorData : false,
                teamData : false,
                currencyInvestmentData : { 
                    __v : false
                },
                propertyInvestmentData : { 
                    __v : false
                },
                "investmentDistribution._id" : false,
                propertyId : false,
                propertyData : {
                    __v : false
                },
                currencyInvestmentBuyingDate : false,
                propertyInvestmentBuyingDate : false
            }
        }
    ];
};

/**
 * Organize the information for investment retrieved from DB in a better format to send back to the client
 * 
 * @param {array} investments . The result from the DB query for investments
 * @param {object} options . Specific options to populate the result with
 * 
 * @return {array} . The formatted result
 */
const beautifyInvestmentsFormat = async (investments, options = null) => {
    let result = [];
    for (let investment of investments) {
        //created by data
        investment.createdBy.name = investment.createdBy.name[0];
        investment.createdBy.email = investment.createdBy.email[0];
        investment.createdBy.gravatar = 'https://gravatar.com/avatar/' + md5(investment.createdBy.email) + '?s=200';

        //updated by data
        investment.updatedBy.name = investment.updatedBy.name[0];
        investment.updatedBy.email = investment.updatedBy.email[0];
        investment.updatedBy.gravatar = 'https://gravatar.com/avatar/' + md5(investment.updatedBy.email) + '?s=200';

        //team data
        if (investment.team && investment.team.slug && investment.team.slug.length) {
            if (options && options.teamMembers) {
                investment.team = await teamController.getTeamBySlugObject(investment.team.slug[0], null, { withId : false });
            } else {
                investment.team.name = investment.team.name[0];
                investment.team.slug = investment.team.slug[0];
                investment.team.description = investment.team.description[0];
            }
        } else {
            investment.team = null;
        }

        //investment data
        if (investment.currencyInvestmentData[0]) {
            investment.investmentData = investment.currencyInvestmentData[0];
        } else if (investment.propertyInvestmentData[0]) {
            investment.investmentData = investment.propertyInvestmentData[0];
            investment.investmentData.property = investment.propertyData[0];
        }

        delete investment['propertyData'];
        delete investment['propertyInvestmentData'];
        delete investment['currencyInvestmentData'];
        delete investment['buyingDate']; //remove buying date (used JUST for sorting inside the query)

        if (investment.investmentData && !(options && options.investmentDataId)) {
            delete investment.investmentData['_id'];
        }
        
        result.push(investment);
    }

    return result;
};

/**
 * Get an investment by ID
 * @param {string} id
 * @param {string} userEmail . Just for debug in console purposes.
 * @param {object} options . Object with specific options to populate on the result
 * @return {object} . The investment looked for or null
 */
const getByIdObject = async (id, userEmail = null, options = null) => {
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
    let result = await beautifyInvestmentsFormat(investments, options);
    
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
    const result = await getByIdObject(req.query.id, req.user.email, {
        investmentDataId : false,
        teamMembers : true
    });
    
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

exports.delete = async (req, res) => {
    const methodTrace = `${errorTrace} delete() >`;

    const user = req.user;
    //1 - get the investment by ID
    const investment = await getByIdObject(req.params.id, user.email, {
        investmentDataId : true
    });

    if (!investment){
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

    //2 - check that the user is part of the invesment
    let found = false;
    if (investment.investmentDistribution) {
        for (let member of investment.investmentDistribution) {
            if (user.email === member.email) {
                found = true;
                break;
            }
        }    
    }
    
    if (!found) {
        //3.2 - the client is not member of the investment requested
        console.log(`${methodTrace} ${getMessage('error', 462, req.user.email, true, 'Investment', req.user.email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Investment', req.user.email),
            data : null
        });

        return;
    }

    //3.1 - The user is member of the investment, proceed to delete
    let writeResult = null;
    let investmentDataId = null;
    let investmentDataModel = null;
    if (investment.investmentType === INVESTMENTS_TYPES.CURRENCY || investment.investmentType === INVESTMENTS_TYPES.CRYPTO) {
        investmentDataModel = 'CurrencyInvestment';
        investmentDataId = investment.investmentData._id;
        writeResult = await deleteCurrencyInvestment(investmentDataId, user.email);
    } else if (investment.investmentType === INVESTMENTS_TYPES.PROPERTY) {
        investmentDataModel = 'PropertyInvestment';
        investmentDataId = investment.investmentData._id;
        writeResult = await deletePropertyInvestment(investmentDataId, user.email);
    }
    
    if (!(writeResult && writeResult.n > 0)) {
        //Failed to delete investment data
        res.status(401).json({ 
            status : "error", 
            codeno : 464,
            msg : getMessage('error', 464, null, false, investmentDataModel, '_id', investmentDataId),
            data : null
        });

        return;
    }

    writeResult = null;
    console.log(`${methodTrace} ${getMessage('message', 1038, user.email, true, 'Investment', '_id', investment._id)}`);
    writeResult = await Investment.remove({ _id : investment._id });
    if (!(writeResult && writeResult.n > 0)) {
        //Failed to delete investment
        console.log(`${methodTrace} ${getMessage('error', 464, user.email, true, 'Investment', '_id', investment._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 464,
            msg : getMessage('error', 464, null, false, 'Investment', '_id', investment._id),
            data : null
        });

        return;
    }

    // Send notification to team members 
    if (investment.team) {
        console.log(investment.team);
        // send push notification to client
        getPusher().trigger(PUSHER_CHANNEL, 'investment-deleted', {
            email: user.email,
            name: user.name,
            teamName: investment.team.name,
            teamSlug: investment.team.slug
        }, req.query.pusherSocketID);    
    }

    //Success deleting investment
    console.log(`${methodTrace} ${getMessage('message', 1039, user.email, true, 'Investment')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1039, null, false, 'Investment'),
        data : { removed : writeResult.n }
    });
};

/**
 * Deletes a currency investment record from db
 * @param {string} id . The record id
 * @param {string} userEmail . The user email for debug purposes 
 */
const deleteCurrencyInvestment = async (id, userEmail) => {
    const methodTrace = `${errorTrace} deleteCurrencyInvestment() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1038, userEmail, true, 'CurrencyInvestment', '_id', id)}`);
    const writeResult = await CurrencyInvestment.remove({ _id : id });
    if (writeResult && writeResult.n > 0) {
        console.log(`${methodTrace} ${getMessage('message', 1039, userEmail, true, 'CurrencyInvestment')}`);
    } else {
        console.log(`${methodTrace} ${getMessage('error', 464, userEmail, true, 'CurrencyInvestment', '_id', id)}`);
    }
    
    return writeResult;
};

/**
 * Deletes a property investment record from db
 * @param {string} id . The record id
 * @param {string} userEmail . The user email for debug purposes 
 */
const deletePropertyInvestment = async (id, userEmail) => {
    const methodTrace = `${errorTrace} deletePropertyInvestment() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1038, userEmail, true, 'PropertyInvestment', '_id', id)}`);
    const writeResult = await PropertyInvestment.remove({ _id : id });
    if (writeResult && writeResult.n > 0) {
        console.log(`${methodTrace} ${getMessage('message', 1039, userEmail, true, 'PropertyInvestment')}`);
    } else {
        console.log(`${methodTrace} ${getMessage('error', 464, userEmail, true, 'PropertyInvestment', '_id', id)}`);
    }
    
    return writeResult;
};

/**
 * Return an array with the property ids of all the investments properties where the user email provided is investing.
 * 
 * @param {string} userEmail 
 * @return {array} . An array of property ids.
 */
exports.getPropertyIdsInInvestments = async(userEmail) => {
    const methodTrace = `${errorTrace} getPropertyIdsInInvestments() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'PropertyInvestment(s)', 'user email', userEmail)}`);

    let propertiesInInvestments = await Investment.aggregate([
        { 
            $match : { 
                investmentType : INVESTMENTS_TYPES.PROPERTY, 
                investmentDistribution : { $elemMatch : { email : userEmail } } 
            } 
        },
        { $lookup : { from : 'propertyinvestments', localField : '_id', foreignField : 'parent', as : 'propertyInvestmentData' } }, //For property investments
        { 
            $addFields : {
                propertyId : '$propertyInvestmentData.property'
            }
        }, 
        {
            $project : {
                _id : false,
                propertyId : true
            }
        }
    ]);

    let propertyIds = [];
    for (let property of propertiesInInvestments) {
        propertyIds.push(property.propertyId[0]);
    }

    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, propertyIds.length, 'PropertyInvestment(s)')}`);

    return propertyIds;
};