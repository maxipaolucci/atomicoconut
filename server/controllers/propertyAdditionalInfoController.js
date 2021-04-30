const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const PropertyAdditionalInfo = mongoose.model('PropertyAdditionalInfo');
const { getMessage } = require('../handlers/errorHandlers');
const errorTrace = 'propertyAdditionalInfoController >';


const create = async (propertyId, data, userEmail, res) => {
    const methodTrace = `${errorTrace} create() >`;

    //save a new record in DB
    console.log(`${methodTrace} ${getMessage('message', 1031, userEmail, true, true, 'PropertyAdditionalInfo')}`);
    data.parent = propertyId;
    let propertyAdditionalInfo = await (new PropertyAdditionalInfo(data)).save();

    if (!propertyAdditionalInfo) {
        console.log(`${methodTrace} ${getMessage('error', 459, userEmail, true, true, 'PropertyAdditionalInfo')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, false, 'PropertyAdditionalInfo'),
            data : null
        });

        return;
    }
        
    console.log(`${methodTrace} ${getMessage('message', 1026, userEmail, true, true, 'PropertyAdditionalInfo')}`);
    return propertyAdditionalInfo._id;
};
exports.create = create;

exports.update = async (propertyId, data, userEmail, res) => {
    const methodTrace = `${errorTrace} update() >`;
    
    //1 - get the record by ID
    let propertyAdditionalInfo = await getByIdObject(propertyId, userEmail);

    if (!propertyAdditionalInfo) {
        // if nothing found then will create a record for this property
        return await create(propertyId, data, userEmail, res);
    }

    //update propertyAdditionalInfo
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, true, 'PropertyAdditionalInfo', '_id', propertyAdditionalInfo._id)}`);
    propertyAdditionalInfo = await PropertyAdditionalInfo.findOneAndUpdate(
        { _id : propertyAdditionalInfo._id },
        { $set : data },
        { new : true, runValidators : true, context : 'query' }
    );

    if (!propertyAdditionalInfo) {
        //failed to update propertyAdditionalInfo
        console.log(`${methodTrace} ${getMessage('error', 465, userEmail, true, true, 'PropertyAdditionalInfo', '_id', propertyAdditionalInfo._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, false, 'PropertyAdditionalInfo', '_id', propertyAdditionalInfo._id),
            data : null
        });
    }
    
    //success
    console.log(`${methodTrace} ${getMessage('message', 1028, userEmail, true, true, 'PropertyAdditionalInfo')}`);
    return propertyAdditionalInfo._id;
};

exports.delete = async (propertyId, userEmail, res) => {
    const methodTrace = `${errorTrace} delete() >`;

    //1 - get the record by ID
    const propertyAdditionalInfo = await getByIdObject(propertyId, userEmail);
    
    if (!propertyAdditionalInfo) {
        return false;
    }

    writeResult = await PropertyAdditionalInfo.deleteOne({ parent : propertyId });
    if (!(writeResult && writeResult.n > 0)) {
        //Failed to delete propertyadditionalinfo
        console.log(`${methodTrace} ${getMessage('error', 464, userEmail, true, true, 'PropertyAdditionalInfo', 'parent', propertyId)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 464,
            msg : getMessage('error', 464, null, false, false, 'PropertyAdditionalInfo', 'parent', propertyId),
            data : null
        });

        return false;
    }
    
    //Success deleting propertyadditionalinfo
    console.log(`${methodTrace} ${getMessage('message', 1039, userEmail, true, true, 'PropertyAdditionalInfo')}`);
    return true;
};

const getByIdObject = async (propertyId, userEmail = null, options = null) => {
    const methodTrace = `${errorTrace} getByIdObject() >`;
    
    //1- check for a record with the provided propertyId
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, true, 'PropertyAdditionalInfo', 'parent', propertyId)}`); 
    try {
        propertyId = ObjectId(propertyId);    
    } catch(error) {
        propertyId = null; //this is going to make the query do not return anything
    }

    const result = await PropertyAdditionalInfo.findOne({ parent : propertyId });
    
    //2 - Return propertyadditionalinfo info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, true, result ? 1 : 0, 'PropertyAdditionalInfo(s)')}`);
    return result;
};
exports.getByIdObject = getByIdObject;

