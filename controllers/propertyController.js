const { PROPERTY_TYPES } = require('../constants/constants');

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

exports.create = async (req, res, next) => {
    const methodTrace = `${errorTrace} create() >`;

    //get the logged in user from req
    let user = req.user;

    //save a new record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, 'Property')}`);
    let property = await (new Property({
        propertyType : req.body.type,
        createdBy: user._id,
        updatedBy: user._id,
        createdOn : req.body.createdOn,
        updatedOn : req.body.updatedOn,
        address : req.body.address,
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

exports.update = async (req, res, next) => {
    const methodTrace = `${errorTrace} update() >`;
    
    //get the logged in user from req
    let user = req.user;

    //1 - get the record by ID
    let property = await getByIdObject(req.body.id, user.email, {
        propertyTypeDataId : true
    });

    if (!property) {
        //no record found with that id
        console.log(`${methodTrace} ${getMessage('error', 461, user.email, true, 'Property')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, null, false, 'Property'),
            data : null
        });

        return;
    } else {
        //check the property was created by the user or part of an investment of the user
        let found = false;
        
        if (property.createdBy.email === user.email) {
            found = true;
        }
        // for (let portion of property.investmentDistribution) {
        //     if (user.email === portion.email) {
        //         found = true;
        //         break;
        //     }
        // }

        if (!found) {
            //the client is not an owner  of the property requested
            console.log(`${methodTrace} ${getMessage('error', 470, user.email, true, 'Property')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 470,
                msg : getMessage('error', 470, null, false, 'Property'),
                data : null
            });

            return;
        }
    }

    //fields to update
    const originalProperty = property; //we save the "beautified" version of property to easily access data
    const updates = {
        updatedBy: user._id,
        updatedOn : req.body.updatedOn,
        address : req.body.address,
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
    };

    //update property
    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'Property', '_id', property._id)}`);
    property = await Property.findOneAndUpdate(
        { _id : property._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (property) {
        //update property type data
        console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, 'Property')}`);
        
        let propertyType = null;
        if (property.propertyType === PROPERTY_TYPES.HOUSE) {
            const propertyTypeUpdates = {
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
            };
            
            propertyType = await House.findOneAndUpdate(
                { _id : originalProperty.propertyTypeData._id },
                { $set : propertyTypeUpdates },
                { new : true, runValidators : true, context : 'query' }
            );
        }
        

        if (propertyType) {
            //success
            console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, property.propertyType)}`);
            
            console.log(`${methodTrace} ${getMessage('message', 1042, user.email, true, 'Property')}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1042, null, false, 'Property'),
                data : { type : property.propertyType, id : property._id }
            });

            return;
        }
        
        //failed to update proeprty type data
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, property.propertyType, '_id', property.propertyTypeData._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, property.propertyType, '_id', property.propertyTypeData._id),
            data : null
        });
    }

    //failed to update property
    console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, 'Property', '_id', originalProperty._id)}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 465,
        msg : getMessage('error', 465, null, false, 'Property', '_id', originalProperty._id),
        data : null
    });
};

exports.delete = async (req, res) => {
    const methodTrace = `${errorTrace} delete() >`;

    const user = req.user;
    //1 - get the record by ID
    const property = await getByIdObject(req.params.id, user.email, {
        propertyTypeDataId : true
    });
    
    //2 - check that the property was created by the user or he is part of an investment on that property
    if (property /* && property.investmentDistribution*/) {
        let found = false;
        if (property.createdBy.email === user.email) {
            found = true;
        }
        // for (let member of property.investmentDistribution) {
        //     if (user.email === member.email) {
        //         found = true;
        //         break;
        //     }
        // }

        if (found) {
            //3.1 - The property,in some way, belongs to the user, we proceed to delete
            let writeResult = null;
            let propertyTypeDataId = null;
            let propertyTypeDataModel = null;
            if (property.propertyType === PROPERTY_TYPES.HOUSE) {
                propertyTypeDataModel = 'House';
                propertyTypeDataId = property.propertyTypeData._id;
                console.log(property._id, propertyTypeDataId);
                writeResult = await deletePropertyTypeData(propertyTypeDataModel, propertyTypeDataId, user.email);
            }
            
            if (writeResult && writeResult.result.n > 0) {
                writeResult = null;
                console.log(`${methodTrace} ${getMessage('message', 1038, user.email, true, 'Property', '_id', property._id)}`);

                writeResult = await Property.remove({ _id : property._id });
                if (writeResult && writeResult.result.n > 0) {
                    //Success deleting property
                    console.log(`${methodTrace} ${getMessage('message', 1039, user.email, true, 'Property')}`);
                    res.json({
                        status : 'success', 
                        codeno : 200,
                        msg : getMessage('message', 1039, null, false, 'Property'),
                        data : { removed : writeResult.result.n }
                    });
    
                    return;
                } else {
                    //Failed to delete property
                    console.log(`${methodTrace} ${getMessage('error', 464, user.email, true, 'Property', '_id', property._id)}`);
                    res.status(401).json({ 
                        status : "error", 
                        codeno : 464,
                        msg : getMessage('error', 464, null, false, 'Property', '_id', property._id),
                        data : null
                    });
    
                    return;
                }
            } else {
                //Failed to delete property type data
                res.status(401).json({ 
                    status : "error", 
                    codeno : 464,
                    msg : getMessage('error', 464, null, false, propertyTypeDataModel, '_id', propertyTypeDataId),
                    data : null
                });

                return;
            }
            
        }
    } else if (!property){
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

    //3.2 - the user it is not the creator of the property or a member of an investment in that property
    console.log(`${methodTrace} ${getMessage('error', 462, req.user.email, true, 'Property', req.user.email)}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 462,
        msg : getMessage('error', 462, null, false, 'Property', req.user.email),
        data : null
    });
};

/**
 * Deletes a property type (House, Condo) record from db
 * @param {string} model - The model (table) where to delete the record
 * @param {string} id . The record id
 * @param {string} userEmail . The user email for debug purposes 
 */
const deletePropertyTypeData = async (model, id, userEmail) => {
    const methodTrace = `${errorTrace} deletePropertyTypeData() >`;
    
    console.log(`${methodTrace} ${getMessage('message', 1038, userEmail, true, model, '_id', id)}`);
    
    let writeResult = null;
    if (model.toLowerCase() === PROPERTY_TYPES.HOUSE) {
        writeResult = await House.remove({ _id : id });
    }
    
    if (writeResult && writeResult.result.n > 0) {
        console.log(`${methodTrace} ${getMessage('message', 1039, userEmail, true, model)}`);
    } else {
        console.log(`${methodTrace} ${getMessage('error', 464, userEmail, true, model, '_id', id)}`);
    }
    
    return writeResult;
};

/**
 * Get a property by ID
 */
exports.getById = async (req, res) => {
    const methodTrace = `${errorTrace} getById() >`;

    //1 - get record by ID
    const result = await getByIdObject(req.params.id, req.user.email, {
        propertyTypeDataId : false
    });
    
    //2 - check that the user is the creator of the property or he is investing in it
    if (result /*&& result.investmentDistribution*/) {
        let found = false;

        if (result.createdBy.email === req.user.email) {
            found = true;
        }
        // for (let member of result.investmentDistribution) {
        //     if (req.user.email === member.email) {
        //         found = true;
        //         break;
        //     }
        // }

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
    //1 - Get all the properties where user is involved (created or has a part of an investment in the property)
    console.log(`${methodTrace} ${getMessage('message', 1034, user.email, true, 'all Properties', 'user', user.email)}`);
    const aggregationStagesArr = [{ $match : { createdBy : user._id } }].concat(aggregationStages());
    let properties = await Property.aggregate(aggregationStagesArr);

    //2 - Parse the recordset from DB and organize the info better.
    let result = await beautifyPropertiesFormat(properties);

    //3- Return properties info to the user.
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

