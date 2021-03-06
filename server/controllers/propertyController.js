const { PROPERTY_TYPES, PUSHER_CHANNEL } = require('../constants/constants');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const md5 = require('md5');
const Property = mongoose.model('Property');
const House = mongoose.model('House');
const { getMessage } = require('../handlers/errorHandlers');
const { getPusher, removeDuplicatesFromObjectIdArray } = require('../handlers/utils');
const { getPropertyIdsInInvestments } = require('./investmentController');
const jimp = require('jimp'); //resize images
const uuid = require('uuid'); //unique names for the images files
const propertyAdditionalInfoController = require('./propertyAdditionalInfoController');
const propertyUserController = require('./propertyUserController');
const { validationResult } = require('express-validator');
const errorTrace = 'propertyController >';

exports.validateData = (req, res, next) => {
    const methodTrace = `${errorTrace} validateData() >`;

    console.log(`${methodTrace} ${getMessage('message', 1015, null, true, true)}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(`${methodTrace} ${getMessage('error', 458, null, true, true, errors.array())}`);
        return res.status(400).json({ 
            status : "error", 
            codeno : 458,
            msg : getMessage('error', 458, null, true, false, ''),
            data: errors.array()
        }); 
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1016, null, true, true)}`);
    next(); //call next middleware
};

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

exports.create = async (req, res, next) => {
    const methodTrace = `${errorTrace} create() >`;

    //get the logged in user from req
    let user = req.user;

    //save a new record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, true, 'Property')}`);
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
        statusDetail : req.body.statusDetail,
        propertyUsers : [],
        links: req.body.links
    })).save();

    if (!property) {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, true, 'Property')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, false, 'Property'),
            data : null
        });

        return;
    }
        
    console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, true, 'Property')}`);

    // Save additional info for the property
    await propertyAdditionalInfoController.create(property._id, req.body.propertyAdditionalInfo, user.email, res);

    // Save property type 
    let propertyType = null;
    if (property.propertyType === PROPERTY_TYPES.HOUSE) {
        //save a new house record in DB
        console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, true, 'House')}`);
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
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, true, property.propertyType)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, false, property.propertyType),
            data : null
        });

        return;
    } 
    console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, true, property.propertyType)}`);
    
    let propertyUserCreated = await(propertyUserController.addPropertyUser(property._id, user._id, user.email, true));
    if (!propertyUserCreated) {
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, false, 'PropertyUser'),
            data : null
        });

        return;
    }

    // get a complete property object
    property = await getByIdObject(property.id, user.email, {
        propertyTypeDataId : true
    });

    console.log(`${methodTrace} ${getMessage('message', 1033, user.email, true, true, 'Property')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1033, null, false, false, 'Property'),
        data : property
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
    const location = { address : req.body.address.description, coordinates : [req.body.address.longitude || null, req.body.address.latitude || null], mapsPlaceId : req.body.address.mapsPlaceId || null };
    const sharedWithEmails = req.body.sharedWith; //array of emails

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
        statusDetail : req.body.statusDetail,
        links: req.body.links
    };

    if (property.createdBy.email !== user.email) {
        // only the property creator is allowd to edit it address
        delete updates.location;
        delete updates.unit;
    }

    //update property
    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, true, 'Property', '_id', property._id)}`);
    property = await Property.findOneAndUpdate(
        { _id : property._id },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!property) {
        //failed to update property
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, true, 'Property', '_id', originalProperty._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, false, 'Property', '_id', originalProperty._id),
            data : null
        });
    }

    // update additional data
    await propertyAdditionalInfoController.update(property._id, req.body.propertyAdditionalInfo, user.email, res);
    
    //update property type data
    console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, true, 'Property')}`);
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
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, true, property.propertyType, '_id', property.propertyTypeData._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, false, property.propertyType, '_id', property.propertyTypeData._id),
            data : null
        });

        return;
    }
    console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, true, property.propertyType)}`);

    // if user is the admin of the property then update property_users, this are the users sharing this property
    let propertyUsersUpdateResult = null;
    if (user.email == originalProperty.createdBy.email) {
        propertyUsersUpdateResult = await(propertyUserController.updatePropertyUsers(originalProperty._id, sharedWithEmails, user.email, req.headers.origin));
    }
    
    //get the new property object with sharedWith info to know if a client must be updated with a new property shared with him
    property = await getByIdObject(property.id, user.email, {
        propertyTypeDataId : true
    });
    
    // send push notification to client
    getPusher().trigger(PUSHER_CHANNEL, 'property-updated', {
        originalProperty: {
            id: originalProperty._id,
            address: originalProperty.location.address,
            unit: originalProperty.unit,
            sharedWith: originalProperty.sharedWith
        },
        property: {
            id: property._id,
            address: property.location.address,
            unit: property.unit,
            sharedWith: property.sharedWith
        },
        email: user.email,
        name: user.name,
    }, req.body.pusherSocketID);

    //success
    console.log(`${methodTrace} ${getMessage('message', 1042, user.email, true, true, 'Property')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1042, null, false, false, 'Property'),
        data : { property, type : property.propertyType, id : property._id, propertyUsersUpdateResult }
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
    const methodTrace = `${errorTrace} checkUserCanViewEditProperty() >`;

    if (!property) {
        //no record found with that id
        console.log(`${methodTrace} ${getMessage('error', 461, user.email, true, true, 'Property')}`);
        return {
            status : false,
            codeno : 461,
            msg : getMessage('error', 461, null, false, false, 'Property')
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
    let sharedUser = false;
    propertyUserCursor.forEach(propertyUser => {
        if (propertyUser.user.equals(user._id)) {
            sharedUser = true;
            return;
        }
    });

    if (!sharedUser) {
        console.log(`${methodTrace} ${getMessage('error', 462, user.email, true, true, 'Property', user.email)}`);
        return {
            status : false,
            codeno : 462,
            msg : getMessage('error', 462, null, false, false, 'Property', user.email)
        };
    }

    return {
        status : true
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
        console.log(`${methodTrace} ${getMessage('error', 461, user.email, true, true, 'Property')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, null, false, false, 'Property'),
            data : null
        });

        return;
    }
    
    //2 - check that the property was created by the user
    creator = property.createdBy;

    if (creator.email !== user.email) {
        //3.2 - the user it is not the creator of the property
        console.log(`${methodTrace} ${getMessage('error', 462, user.email, true, true, 'Property', user.email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, false, 'Property', user.email),
            data : { creator }
        });

        return
    }

    //get my property investments to see if I have an investment in this property. If true then we cannot delete the property
    const propertyIds = await getPropertyIdsInInvestments(user.email);
    for (let propertyId of propertyIds) {
        if (property._id.equals(propertyId)) {
            console.log(`${methodTrace} ${getMessage('error', 475, user.email, true, true, 'Property', 'Investments')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 475,
                msg : getMessage('error', 475, null, false, false, 'Property', 'Investments'),
                data : null
            });
    
            return;
        }
    }

    //3.1 - The property belongs to the user, we proceed to delete
    let propertyUsersRemoved = await propertyUserController.deleteAllForProperty(property._id, user.email);
    if (!propertyUsersRemoved) {
        console.log(`${methodTrace} ${getMessage('error', 464, user.email, true, true, 'PropertyUser', 'property', property._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 464, user.email, true, false, 'PropertyUser', 'property', property._id),
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
        console.log(`${methodTrace} ${getMessage('error', 464, user.email, true, true, propertyTypeDataModel, '_id', propertyTypeDataId)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 464,
            msg : getMessage('error', 464, null, false, false, propertyTypeDataModel, '_id', propertyTypeDataId),
            data : null
        });

        return;
    }
        
    writeResult = null;
    console.log(`${methodTrace} ${getMessage('message', 1038, user.email, true, true, 'Property', '_id', property._id)}`);

    // delete additional data
    await propertyAdditionalInfoController.delete(property._id, user.email, res);
    
    writeResult = await Property.deleteOne({ _id : property._id });
    if (!(writeResult && writeResult.n > 0)) {
        //Failed to delete property
        console.log(`${methodTrace} ${getMessage('error', 464, user.email, true, true, 'Property', '_id', property._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 464,
            msg : getMessage('error', 464, null, false, false, 'Property', '_id', property._id),
            data : null
        });

        return;
    }
    
    // send push notification to client
    getPusher().trigger(PUSHER_CHANNEL, 'property-deleted', {
        email: user.email,
        name: user.name,
        address: property.location.address,
        unit: property.unit,
        id: property._id
    }, req.query.pusherSocketID);

    //Success deleting property
    console.log(`${methodTrace} ${getMessage('message', 1039, user.email, true, true, 'Property')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1039, null, false, false, 'Property'),
        data : { 
            removed : writeResult.n,
            property: {
                _id: property._id
            } 
        }
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
    
    console.log(`${methodTrace} ${getMessage('message', 1038, userEmail, true, true, model, '_id', id)}`);
    
    let writeResult = null;
    if (model.toLowerCase() === PROPERTY_TYPES.HOUSE) {
        writeResult = await House.deleteOne({ _id : id });
    }

    if (writeResult && writeResult.n > 0) {
        console.log(`${methodTrace} ${getMessage('message', 1039, userEmail, true, true, model)}`);
    } else {
        console.log(`${methodTrace} ${getMessage('error', 464, userEmail, true, true, model, '_id', id)}`);
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
        msg : getMessage('message', 1036, null, false, false, 1, 'Property(s)'),
        data : result
    });
};

const getByIdObject = async (id, userEmail = null, options = null) => {
    const methodTrace = `${errorTrace} getByIdObject() >`;

    //1- check for a record with the provided id
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, true, 'Property', 'id', id)}`); 
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
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, true, result ? 1 : 0, 'Property(s)')}`);
    return result;
};
exports.getByIdObject = getByIdObject;

/**
 * Get all properties for the authenticated user. These includes her own properties plus the properties of an investment where she has a piece of the cake.
 */
exports.getAllProperties = async (req, res) => {
    const methodTrace = `${errorTrace} getAllProperties() >`;

    const user = req.user;

    // get all the properties shared with me (My own props are by default shared with me too)
    const propertyIdsSharedWithMe = await propertyUserController.getPropertyIdsSharedWith(user.id, user.email);
    
    // Get all the properties from property investments where I am a member of if justUserProperties is true.
    const propertyIdsInMyInvestments = req.query.justUserProperties === 'true' ? [] : await getPropertyIdsInInvestments(user.email);
    
    // Merge the two arrays into one without duplicates
    const propertyIds = removeDuplicatesFromObjectIdArray(propertyIdsSharedWithMe.concat(propertyIdsInMyInvestments));
    
    // - Get all the properties where user is involved (created or has a part of an investment in the property)
    console.log(`${methodTrace} ${getMessage('message', 1034, user.email, true, true, 'all Properties', 'user', user.email)}`);
    const aggregationStagesArr = [{ $match : { _id : { $in : propertyIds } } }].concat(aggregationStages(), { $sort : { "location.address" : 1 } });
    let properties = await Property.aggregate(aggregationStagesArr);

    // - Parse the recordset from DB and organize the info better.
    let result = await beautifyPropertiesFormat(properties);

    //- Return properties info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, user.email, true, true, result.length, 'Property(s)')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, false, result.length, 'Property(s)'),
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
        { $lookup : { from : 'propertyadditionalinfos', localField : '_id', foreignField : 'parent', as : 'propertyAdditionalInfoData' } }, //for propertyAdditionalInfos
        { $lookup : { from : 'houses', localField : '_id', foreignField : 'parent', as : 'houseData' } }, //for houses
        { $lookup : { from : 'properties', localField : '_id', foreignField : '_id', as : 'propertyData' } }, //we do this to be able to easily retrieve data after grouping
        { $unwind : '$propertyUsers' },
        { $lookup : { from : 'propertyusers', localField : 'propertyUsers', foreignField : '_id', as : 'propertyUsersData' } }, //for propertyUsers
        { $lookup : { from : 'users', localField : 'propertyUsersData.user', foreignField : '_id', as : 'usersShareData' } }, 
        {
            $addFields : {
                sharedWith : { //replaces the exitent createdBy field with this
                    name : '$usersShareData.name',
                    email : '$usersShareData.email'
                }
            }
        },
        { 
            $group : { //at this point we have multiple rows (unwind), all are the same except for the sharedWith field
                _id : "$_id",
                createdBy: { $first: '$createdBy'}, 
                updatedBy: { $first: '$updatedBy'}, 
                propertyAdditionalInfoData: { $first: '$propertyAdditionalInfoData' },
                houseData: { $first: '$houseData'}, 
                propertyData: { $first: '$propertyData'}, 
                sharedWith: { $push: "$sharedWith" }
            } 
        } //grouping back and putting different sharewith persons into an array
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
    let results = [];
    for (let property of properties) {
        // shared with
        property.sharedWith = property.sharedWith.map(person => {
            return {
                name : person.name[0],
                email : person.email[0],
                gravatar : 'https://gravatar.com/avatar/' + md5(person.email[0]) + '?s=200'
            }
        });

        //created by data
        property.createdBy.name = property.createdBy.name[0];
        property.createdBy.email = property.createdBy.email[0];
        property.createdBy.gravatar = 'https://gravatar.com/avatar/' + md5(property.createdBy.email) + '?s=200';

        //updated by data
        property.updatedBy.name = property.updatedBy.name[0];
        property.updatedBy.email = property.updatedBy.email[0];
        property.updatedBy.gravatar = 'https://gravatar.com/avatar/' + md5(property.updatedBy.email) + '?s=200';

        // property additional info data
        if (property.propertyAdditionalInfoData && property.propertyAdditionalInfoData.length) {
            property.propertyAdditionalInfo = property.propertyAdditionalInfoData[0];
            delete property.propertyAdditionalInfo['__v'];
        }

        if (property.propertyAdditionalInfo && !(options && options.propertyAdditionalInfoId)) {
            delete property.propertyAdditionalInfo['_id'];
        }

        //property type data
        if (property.houseData && property.houseData.length) {
            property.propertyTypeData = property.houseData[0];
        }

        if (property.propertyTypeData && !(options && options.propertyTypeDataId)) {
            delete property.propertyTypeData['_id'];
        }
        
        let result = Object.assign(
            {}, 
            property.propertyData[0], 
            { createdBy: property.createdBy }, 
            { updatedBy: property.updatedBy }, 
            { propertyTypeData: property.propertyTypeData },
            { sharedWith: property.sharedWith },
            { propertyAdditionalInfo: property.propertyAdditionalInfo }
        );
        
        delete result['__v'];
        results.push(result);
    }

    return results;
};
