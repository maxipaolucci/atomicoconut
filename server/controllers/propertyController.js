const { PROPERTY_TYPES } = require('../constants/constants');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
const Property = mongoose.model('Property');
const House = mongoose.model('House');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');
const { getPropertyIdsInInvestments } = require('./investmentController');
const jimp = require('jimp'); //resize images
const uuid = require('uuid'); //unique names for the images files
const propertyUserController = require('../controllers/propertyUserController');
const errorTrace = 'propertyController >';

exports.storePhotos = async (req, res, next) => {
    const methodTrace = `${errorTrace} storePhotos() >`;

    //add this for new to disable the functionality
    next();
    return;

    //console.log(`${methodTrace} ${getMessage('message', 1016, req.user.email, true)}`);
    //check if there is no file to resize
    if (!req.files) { //check req.file because multer is going to put the photo, if present, in a property called file in req object
        
        next(); //skip to the next middleware
        return;
    }

    req.body.photos = [];
    for (const file of req.files) {
        //set the filename using uuid
        const extension = file.mimetype.split('/')[1];
        const fileName = `${uuid.v4()}.${extension}`;
        req.body.photos.push(fileName);
        //now we resize
        const photo = await jimp.read(file.buffer); //read the buffer where we temporary have stored the image in memory
                                                //jimp is based on Promises so we can await them
        await photo.resize(800, jimp.AUTO);
        const result = await photo.write(`./public/uploads/properties/${fileName}`);
        console.log(result);    
    }

    //console.log(req.body);
    
    //once we have written the photo to our filesystem, keep going!
    next();
};

exports.deletePhotos = async (req, res, next) => {
    //do something
    next();
};

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
        purchasePrice : req.body.purchasePrice,
        purchasePriceUnit : req.body.purchasePriceUnit,
        purchasePrice2 : req.body.purchasePrice2,
        purchasePrice2Unit : req.body.purchasePrice2Unit,
        purchasePrice3 : req.body.purchasePrice3,
        purchasePrice3Unit : req.body.purchasePrice3Unit,
        purchasePrice4 : req.body.purchasePrice4,
        purchasePrice4Unit : req.body.purchasePrice4Unit,
        purchasePrice5 : req.body.purchasePrice5,
        purchasePrice5Unit : req.body.purchasePrice5Unit,
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
        notes : req.body.notes,
        photos : req.body.photos,
        unit : req.body.unit,
        status : req.body.status,
        statusDetail : req.body.statusDetail
    })).save();

    if (!property) {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'Property')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, 'Property'),
            data : null
        });

        return;
    }
        
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

    if (!propertyType) {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, property.propertyType)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, property.propertyType),
            data : null
        });

        return;
    } 
    console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, property.propertyType)}`);
    
    let propertyUserCreated = await(propertyUserController.addPropertyUser(property._id, user._id, user.email, true));
    if (!propertyUserCreated) {
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, 'PropertyUser'),
            data : null
        });

        return;
    }

    console.log(`${methodTrace} ${getMessage('message', 1033, user.email, true, 'Property')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1033, null, false, 'Property'),
        data : { type : property.propertyType, id : property._id }
    });       
};

exports.update = async (req, res, next) => {
    const methodTrace = `${errorTrace} update() >`;
    
    //get the logged in user from req
    let user = req.user;

    //1 - get the record by ID
    let property = await getByIdObject(req.body.id, user.email, {
        propertyTypeDataId : true
    });

    const hasPropertyAccess = await checkUserCanViewEditProperty(property, user);
    if (!hasPropertyAccess.status) {
        res.status(401).json({ 
            status : "error", 
            codeno : hasPropertyAccess.codeno,
            msg : hasPropertyAccess.msg,
            data : null
        });

        return;
    }

    //fields to update
    const originalProperty = property; //we save the "beautified" version of property to easily access data
    const location = { address : req.body.address.description, coordinates : [req.body.address.longitude, req.body.address.latitude], mapsPlaceId : req.body.address.mapsPlaceId };
    const propertyUsers = req.body.propertyUsers; //array of emails

    const updates = {
        updatedBy: user._id,
        updatedOn : req.body.updatedOn,
        location,
        askingPrice : req.body.askingPrice,
        askingPriceUnit : req.body.askingPriceUnit,
        offerPrice : req.body.offerPrice,
        offerPriceUnit : req.body.offerPriceUnit,
        walkAwayPrice : req.body.walkAwayPrice,
        walkAwayPriceUnit : req.body.walkAwayPriceUnit,
        purchasePrice : req.body.purchasePrice,
        purchasePriceUnit : req.body.purchasePriceUnit,
        purchasePrice2 : req.body.purchasePrice2,
        purchasePrice2Unit : req.body.purchasePrice2Unit,
        purchasePrice3 : req.body.purchasePrice3,
        purchasePrice3Unit : req.body.purchasePrice3Unit,
        purchasePrice4 : req.body.purchasePrice4,
        purchasePrice4Unit : req.body.purchasePrice4Unit,
        purchasePrice5 : req.body.purchasePrice5,
        purchasePrice5Unit : req.body.purchasePrice5Unit,
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
        notes : req.body.notes,
        photos : req.body.photos,
        unit : req.body.unit,
        status : req.body.status,
        statusDetail : req.body.statusDetail
    };

    //update property
    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'Property', '_id', property._id)}`);
    property = await Property.findOneAndUpdate(
        { _id : property._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!property) {
        //failed to update property
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, 'Property', '_id', originalProperty._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, 'Property', '_id', originalProperty._id),
            data : null
        });
    }
    
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
    

    if (!propertyType) { 
        //failed to update proeprty type data
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, property.propertyType, '_id', property.propertyTypeData._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, property.propertyType, '_id', property.propertyTypeData._id),
            data : null
        });

        return;
    }
    console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, property.propertyType)}`);

    const propertyUsersUpdateResult = await(propertyUserController.updatePropertyUsers());

    //success
    console.log(`${methodTrace} ${getMessage('message', 1042, user.email, true, 'Property')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1042, null, false, 'Property'),
        data : { type : property.propertyType, id : property._id, propertyUsersUpdateResult }
    });
};

/**
 * Checks if the user is able to view or edit a property.
 * @param {Property} property 
 * @param {User} user 
 * 
 * @return {*} . Object with a status field telling if yes or no.
 */
const checkUserCanViewEditProperty = async(property, user) => {
    if (!property) {
        //no record found with that id
        console.log(`${methodTrace} ${getMessage('error', 461, user.email, true, 'Property')}`);
        return {
            status : false,
            codeno : 461,
            msg : getMessage('error', 461, null, false, 'Property')
        };
    }

    //check the property was created by the user or part of an investment of the user or is shared with the user
    if (property.createdBy.email === user.email) {
        return {
            status : true
        };
    }

    //get my property investments to see if I have an investment in this property
    const propertyIds = await getPropertyIdsInInvestments(user.email);
    for (let propertyId of propertyIds) {
        if (property._id.equals(propertyId)) {
            return {
                status : true
            };
        }
    } 
    
    //check that the property is shared with the user
    const propertyUserCursor = await propertyUserController.getPropertyUsersByProperty(property._id, user.email);
    propertyUserCursor.forEach(propertyUser => {
        if (propertyUser.user == user._id) {
            return {
                status : true
            };
        }
    });
    
    console.log(`${methodTrace} ${getMessage('error', 462, user.email, true, 'Property')}`);
    return {
        status : false,
        codeno : 462,
        msg : getMessage('error', 462, null, false, 'Property', user.email)
    };
};

exports.delete = async (req, res) => {
    const methodTrace = `${errorTrace} delete() >`;

    const user = req.user;
    //1 - get the record by ID
    const property = await getByIdObject(req.params.id, user.email, {
        propertyTypeDataId : true
    });

    let creator = null;
    
    if (!property){
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
    
    //2 - check that the property was created by the user
    creator = property.createdBy;

    if (creator.email !== user.email) {
        //3.2 - the user it is not the creator of the property
        console.log(`${methodTrace} ${getMessage('error', 462, req.user.email, true, 'Property', req.user.email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Property', req.user.email),
            data : { creator }
        });

        return
    }

    //get my property investments to see if I have an investment in this property. If true then we cannot delete the property
    const propertyIds = await getPropertyIdsInInvestments(user.email);
    for (let propertyId of propertyIds) {
        if (property._id.equals(propertyId)) {
            console.log(`${methodTrace} ${getMessage('error', 475, user.email, true, 'Property', 'Investments')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 475,
                msg : getMessage('error', 475, null, false, 'Property', 'Investments'),
                data : null
            });
    
            return;
        }
    }

    //3.1 - The property belongs to the user, we proceed to delete
    let propertyUsersRemoved = await propertyUserController.deleteAllForProperty(property._id, user.email);
    if (!propertyUsersRemoved) {
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 464, user.email, true, 'PropertyUser', 'property', property._id),
            data : null
        });

        return;
    }

    let writeResult = null;
    let propertyTypeDataId = null;
    let propertyTypeDataModel = null;
    if (property.propertyType === PROPERTY_TYPES.HOUSE) {
        propertyTypeDataModel = PROPERTY_TYPES.HOUSE;
        propertyTypeDataId = property.propertyTypeData._id;
        writeResult = await deletePropertyTypeData(propertyTypeDataModel, propertyTypeDataId, user.email);
    }
    
    if (!(writeResult && writeResult.n > 0)) {
        //Failed to delete property type data
        res.status(401).json({ 
            status : "error", 
            codeno : 464,
            msg : getMessage('error', 464, null, false, propertyTypeDataModel, '_id', propertyTypeDataId),
            data : null
        });

        return;
    }
        
    writeResult = null;
    console.log(`${methodTrace} ${getMessage('message', 1038, user.email, true, 'Property', '_id', property._id)}`);

    writeResult = await Property.remove({ _id : property._id });
    if (!(writeResult && writeResult.n > 0)) {
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
    
    //Success deleting property
    console.log(`${methodTrace} ${getMessage('message', 1039, user.email, true, 'Property')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1039, null, false, 'Property'),
        data : { removed : writeResult.n }
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

    if (writeResult && writeResult.n > 0) {
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

    //2 - check that the user can edit or view the property
    const hasPropertyAccess = await checkUserCanViewEditProperty(result, req.user);
    if (!hasPropertyAccess.status) {
        res.status(401).json({ 
            status : "error", 
            codeno : hasPropertyAccess.codeno,
            msg : hasPropertyAccess.msg,
            data : null
        });

        return;
    }

    //3.1 - The user is member of the property, send it back to the client
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, 1, 'Property(s)'),
        data : result
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
        // { $unwind : '$propertyUsers' }
        // ////////////////////////// hereeeeeeeeeeeee
        // { $lookup : { from : 'propertyUsers', localField : '_id', foreignField : 'property', as : 'propertyUsersData' } }, //for propertyUsers
        // { $lookup : { from : 'users', localField : '_id', foreignField : 'property', as : 'propertyUsersData' } }, //for propertyUsers

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
