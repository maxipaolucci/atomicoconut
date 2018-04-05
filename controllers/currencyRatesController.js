const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
const promisify = require('es6-promisify');
const { getMessage } = require('../handlers/errorHandlers');


const errorTrace = 'currencyRatesController >';

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

exports.add = async (req, res, next) => {
    const methodTrace = `${errorTrace} add() >`;

    //get the logged in user from req
    let user = req.user;

    //save a new record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, 'Property')}`);
    const location = { address : req.body.address.description, coordinates : [req.body.address.longitude, req.body.address.latitude], mapsPlaceId : req.body.address.mapsPlaceId };
    let property = await (new Property({
        propertyType : req.body.type,
        createdBy: user._id,
        updatedBy: user._id,
        createdOn : req.body.createdOn,
        updatedOn : req.body.updatedOn,
        location,
        askingPrice : req.body.askingPrice,
        askingPriceUnit : req.body.askingPriceUnit,
        offerPrice : req.body.offerPrice,
        offerPriceUnit : req.body.offerPriceUnit,
        walkAwayPrice : req.body.walkAwayPrice,
        walkAwayPriceUnit : req.body.walkAwayPriceUnit,
        salePrice : req.body.salePrice,
        salePriceUnit : req.body.salePriceUnit,
        dateListed : req.body.dateListed,
        reasonForSelling : req.body.reasonForSelling,
        marketValue : req.body.marketValue,
        marketValueUnit : req.body.marketValueUnit,
        renovationCost : req.body.renovationCost,
        renovationCostUnit : req.body.renovationCostUnit,
        maintenanceCost : req.body.maintenanceCost,
        maintenanceCostUnit : req.body.maintenanceCostUnit,
        otherCost : req.body.otherCost,
        otherCostUnit : req.body.otherCostUnit,
        description : req.body.description,
        notes : req.body.notes
    })).save();

    if (property) {
        console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'Property')}`);

        let propertyType = null;
        if (property.propertyType === PROPERTY_TYPES.HOUSE) {
            //save a new house record in DB
            console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, 'House')}`);
            propertyType = await (new House({
                parent : property._id,
                buildingType : req.body.propertyTypeData.buildingType,
                titleType : req.body.propertyTypeData.titleType,
                landArea : req.body.propertyTypeData.landArea,
                floorArea : req.body.propertyTypeData.floorArea,
                registeredValue : req.body.propertyTypeData.registeredValue,
                registeredValueUnit : req.body.propertyTypeData.registeredValueUnit,
                rates : req.body.propertyTypeData.rates,
                ratesUnit : req.body.propertyTypeData.ratesUnit,
                insurance : req.body.propertyTypeData.insurance,
                insuranceUnit : req.body.propertyTypeData.insuranceUnit,
                capitalGrowth : req.body.propertyTypeData.capitalGrowth,
                bedrooms : req.body.propertyTypeData.bedrooms,
                bathrooms : req.body.propertyTypeData.bathrooms,
                parkingSpaces : req.body.propertyTypeData.parkingSpaces,
                fenced : req.body.propertyTypeData.fenced,
                rented : req.body.propertyTypeData.rented,
                rentPrice : req.body.propertyTypeData.rentPrice,
                rentPriceUnit : req.body.propertyTypeData.rentPriceUnit,
                rentPricePeriod : req.body.propertyTypeData.rentPricePeriod,
                rentAppraisalDone : req.body.propertyTypeData.rentAppraisalDone,
                vacancy : req.body.propertyTypeData.vacancy,
                bodyCorporate : req.body.propertyTypeData.bodyCorporate,
                bodyCorporateUnit : req.body.propertyTypeData.bodyCorporateUnit,
                utilitiesCost : req.body.propertyTypeData.utilitiesCost,
                utilitiesCostUnit : req.body.propertyTypeData.utilitiesCostUnit,
                managed : req.body.propertyTypeData.managed,
                managerRate : req.body.propertyTypeData.managerRate,
                agent : req.body.propertyTypeData.agent
            })).save();
        }

        if (propertyType) {
            console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, property.propertyType)}`);
            
            console.log(`${methodTrace} ${getMessage('message', 1033, user.email, true, 'Property')}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1033, null, false, 'Property'),
                data : { type : property.propertyType, id : property._id }
            });
        } else {
            console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, property.propertyType)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 459,
                msg : getMessage('error', 459, null, false, property.propertyType),
                data : null
            });
        }

        
    } else {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'Property')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, 'Property'),
            data : null
        });
    }
};

/**
 * Get by date
 */
exports.getByDate = async (req, res) => {
    const methodTrace = `${errorTrace} getById() >`;

    //1 - get record by ID
    const result = await getByIdObject(req.params.id, req.user.email, {
        propertyTypeDataId : false
    });

    
    //2 - check that the user is the creator of the property or he is investing in it
    if (result) {
        let found = false;

        if (result.createdBy.email === req.user.email) {
            found = true;
        } else {
            //get my property investments to see if I have an investment in this property
            const propertyIds = await getPropertyIdsInInvestments(req.user.email);
        
            for (let propertyId of propertyIds) {
                if (result._id.equals(propertyId)) {
                    found = true;
                    break;
                }
            }
        }
        
        if (found) {
            //3.1 - The user is member of the property, send it back to the client
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1036, null, false, 1, 'Property(s)'),
                data : result
            });

            return;
        }
    } else if (!result){
        //Nothing found for that ID
        console.log(`${methodTrace} ${getMessage('error', 461, req.user.email, true, 'Property')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, null, false, 'Property'),
            data : null
        });

        return;
    }

    //3.2 - the user is not allow to receive information for the record requested
    console.log(`${methodTrace} ${getMessage('error', 462, req.user.email, true, 'Property', req.user.email)}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 462,
        msg : getMessage('error', 462, null, false, 'Property', req.user.email),
        data : null
    });
};

const getByIdObject = async (id, userEmail = null, options = null) => {
    const methodTrace = `${errorTrace} getByIdObject() >`;

    //1- check for a record with the provided id
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'Property', 'id', id)}`); 
    try {
        id = ObjectId(id);    
    } catch(error) {
        id = null; //this is going to make the query do not return anything
    }

    const aggregationStagesArr = [{ $match : { _id : id } }].concat(aggregationStages());
    let results = await Property.aggregate(aggregationStagesArr);

    //2 - Parse the recordset from DB and organize the info better.
    let result = await beautifyPropertiesFormat(results, options);
    
    //3 - Get the first result
    result = result.length ? result[0] : null;
    
    //4 - Return property info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, result ? 1 : 0, 'Property(s)')}`);
    return result;
};
exports.getByIdObject = getByIdObject;

/**
 * Get all properties for the authenticated user. These includes her own properties plus the properties of an investment where she has a piece of the cake.
 */
exports.getAllProperties = async (req, res) => {
    const methodTrace = `${errorTrace} getAllProperties() >`;

    const user = req.user;

    // Get all the properties from property investments where I am a member of if justUserProperties is true.
    const propertyIds = req.query.justUserProperties === 'true' ? [] : await getPropertyIdsInInvestments(user.email);

    // - Get all the properties where user is involved (created or has a part of an investment in the property)
    console.log(`${methodTrace} ${getMessage('message', 1034, user.email, true, 'all Properties', 'user', user.email)}`);
    const aggregationStagesArr = [{ $match : { $or : [ { createdBy : user._id }, { _id : { $in : propertyIds } } ] } }].concat(aggregationStages(), { $sort : { "location.address" : 1 } });
    let properties = await Property.aggregate(aggregationStagesArr);

    // - Parse the recordset from DB and organize the info better.
    let result = await beautifyPropertiesFormat(properties);

    //- Return properties info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, user.email, true, result.length, 'Property(s)')}`);
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
        { $lookup : { from : 'users', localField : 'updatedBy', foreignField : '_id', as : 'updatorData' } },
        { 
            $addFields : {
                updatedBy : { //replaces the exitent createdBy field with this
                    name : '$updatorData.name',
                    email : '$updatorData.email'
                }
            }
        },
        { $lookup : { from : 'houses', localField : '_id', foreignField : 'parent', as : 'houseData' } }, //for houses
        {
            $project : {
                __v : false,
                creatorData : false,
                updatorData : false,
                houseData : { 
                    __v : false
                }
            }
        }
    ];
};

/**
 * Organize the information for property retrieved from DB in a better format to send back to the client
 * 
 * @param {array} properties . The result from the DB query for properties
 * @param {object} options . Specific options to populate the result with
 * 
 * @return {array} . The formatted result
 */
const beautifyPropertiesFormat = async (properties, options = null) => {
    let result = [];
    for (let property of properties) {
        //created by data
        property.createdBy.name = property.createdBy.name[0];
        property.createdBy.email = property.createdBy.email[0];
        property.createdBy.gravatar = 'https://gravatar.com/avatar/' + md5(property.createdBy.email) + '?s=200';

        //updated by data
        property.updatedBy.name = property.updatedBy.name[0];
        property.updatedBy.email = property.updatedBy.email[0];
        property.updatedBy.gravatar = 'https://gravatar.com/avatar/' + md5(property.updatedBy.email) + '?s=200';

        //property type data
        if (property.houseData[0]) {
            property.propertyTypeData = property.houseData[0];
            delete property['houseData'];
        }

        if (property.propertyTypeData && !(options && options.propertyTypeDataId)) {
            delete property.propertyTypeData['_id'];
        }
        
        result.push(property);
    }

    return result;
};

