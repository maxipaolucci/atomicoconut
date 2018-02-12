const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
const Property = mongoose.model('Property');
const House = mongoose.model('House');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');

const errorTrace = 'propertyController >';

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

/**
 * Get all properties for the authenticated user. These includes her own properties plus the properties of an investment where she has a piece of the cake.
 */
exports.getAllProperties = async (req, res) => {
    const methodTrace = `${errorTrace} getAllProperties() >`;

    //1 - Get all the properties where user is involved (created or has a part of an investment in the property)
    console.log(`${methodTrace} ${getMessage('message', 1034, req.user.email, true, 'all Properties', 'user', req.user.email)}`);
    const aggregationStagesArr = [{ $match : { createdBy : req.user._id } }].concat(aggregationStages());
    let properties = await Property.aggregate(aggregationStagesArr);

    //2 - Parse the recordset from DB and organize the info better.
    let result = await beautifyPropertiesFormat(properties);

    //3- Return investments info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, req.user.email, true, result.length, 'Property(s)')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, result.length, 'Property(s)'),
        data : result
    });
};

/**
 * Return the basic aggregation stages to populate property results
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
        { $lookup : { from : 'houses', localField : '_id', foreignField : 'parent', as : 'houseData' } }, //for houses
        {
            $project : {
                __v : false,
                creatorData : false,
                houseData : { 
                    __v : false
                }
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

        //created by data
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
        investment.currencyInvestmentData = investment.currencyInvestmentData[0];
        if (!(options && options.investmentDataId)) {
            delete investment.currencyInvestmentData['_id'];
        }
        
        result.push(investment);
    }

    return result;
};

