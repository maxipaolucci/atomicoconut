const mongoose = require('mongoose');
const User = mongoose.model('User');
const Property = mongoose.model('Property');
const PropertyUser = mongoose.model('PropertyUser');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const md5 = require('md5');

const errorTrace = 'propertyUserController >';

/**
 * Get all the PropertyUser records for a specific property
 * @param {Property} propertyId . The property id 
 * @param {string} userEmail . The email of the current logged in user in the system performing this action
 * 
 * @return {Cursor<PropertyUser>} . A mongodb cursor of PropertyUser docs 
 */
const getPropertyUsersByProperty = async(propertyId, userEmail) => {
    const methodTrace = `${errorTrace} getPropertyUsersByProperty() >`;

    //Look for the specific PropertyUser
    console.log(`${methodTrace} ${getMessage('message', 1051, userEmail, true, 'PropertyUser', `propertyID = ${propertyId}`)}`);
    const propertyUserCursor = await PropertyUser.find({ property : propertyId });
    const records = propertyUserCursor.length;
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, records, 'PropertyUser(s)')}`);
    
    return propertyUserCursor;
};
exports.getPropertyUsersByProperty = getPropertyUsersByProperty;


/**
 * Adds a user to a team.
 * @param {*} propertyId . The property id to link with a user
 * @param {*} userId . User id to link with a property
 * @param {string} userEmail . The email or the current logged in user in the system
 * @param {boolean} isAdmin . True only if the user is the creator of the property otherwise false
 */
const addPropertyUser = async (propertyId, userId, userEmail, isAdmin = false) => {
    const methodTrace = `${errorTrace} addPropertyUser() >`;

    //Add a new record in PropertyUser with the user and property provided
    console.log(`${methodTrace} ${getMessage('message', 1031, userEmail, true, 'PropertyUser')}`);
    let propertyUser = await (new PropertyUser({
        property : propertyId,
        user : userId,
        team : null,
        isAdmin
    })).save();

    if (!propertyUser) {
        console.log(`${methodTrace} ${getMessage('error', 459, userEmail, true, 'PropertyUser')}`);
        return false;
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1026, userEmail, true, 'PropertyUser')}`);

    //add the new PropertyUser id to the user in his array of propertyUsers
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'User', '_id', userId)}`);
    user = await User.findOneAndUpdate(
        { _id : userId },
        { $addToSet : { propertyUsers : propertyUser } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'User')}`);

    //add the new PropertyUser id to the porperty in its array of propertyUsers
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'Property', '_id', propertyId)}`);
    property = await Property.findOneAndUpdate(
        { _id : propertyId },
        { $addToSet : { propertyUsers : propertyUser } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'Property')}`);

    return true;
};
exports.addPropertyUser = addPropertyUser;

/**
 * Deletes propertyUser.
 * @param {ObjectId} propertyId . The Property to detach to a user
 * @param {ObjectId} userId . User to detach to a property
 * @param {string} userEmail . The email or the current logged in user in the system performing this action
 * @param {boolean} force . Only when force is true we can delete the a row where isAdmin is true. Use with caution
 *      Only the owner of a property must be able to do this.
 */
const deletePropertyUser = async (propertyId, userId, userEmail, force = false) => {
    const methodTrace = `${errorTrace} deletePropertyUser() >`;

    //Look for the specific PropertyUser
    console.log(`${methodTrace} ${getMessage('message', 1037, userEmail, true, 'PropertyUser', `with propertyID : ${propertyId} and userID : ${userId}`)}`);
    const propertyUser = await PropertyUser.findOne({ property : propertyId, user : userId });
    if (!propertyUser) {
        console.log(`${methodTrace} ${getMessage('error', 461, userEmail, true, 'PropertyUser')}`);
        return false;
    }
    console.log(`${methodTrace} ${getMessage('message', 1035, userEmail, true, 'PropertyUser')}`);

    //check that nobody can remove the admin of this property
    if (!force && propertyUser.isAdmin) {
        console.log(`${methodTrace} ${getMessage('error', 463, userEmail, true, 'Property')}`);
        return false;
    }

    //remove the propertyUser id from the array of PropertyUsers in User
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'User', '_id', userId)}`);
    user = await User.findByIdAndUpdate(
        { _id : propertyUser.user },
        { $pull : { propertyUsers : propertyUser._id } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'User')}`);

    //remove the propertyUser id from the array of PropertyUsers in Property
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'Property', '_id', propertyId)}`);
    property = await Property.findByIdAndUpdate(
        { _id : propertyUser.property },
        { $pull : { propertyUsers : propertyUser._id } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'Property')}`);

    //Remove the PropertyUser record
    console.log(`${methodTrace} ${getMessage('message', 1038, userEmail, true, 'PropertyUser', '_id', propertyUser._id)}`);
    const writeResult = await PropertyUser.deleteOne({ _id : propertyUser._id });
    if (!(writeResult && writeResult.n > 0)) {
        console.log(`${methodTrace} ${getMessage('error', 464, userEmail, true, 'PropertyUser', '_id', propertyUser._id)}`);
        return false;    
    }

    console.log(`${methodTrace} ${getMessage('message', 1039, userEmail, true, 'PropertyUser')}`);
    return true;
};
exports.deletePropertyUser = deletePropertyUser;

/**
 * Deletes all propertyUser for the specified properties. Only prop owner must call this method.
 * @param {Property} propertyId . The Property id to remove all the propertyUsers links
 * @param {string} userEmail . The email of the current logged in user in the system performing this action
 */
exports.deleteAllForProperty = async(propertyId, userEmail) => {
    const methodTrace = `${errorTrace} deleteAllForProperty() >`;

    //Look for the specific PropertyUser
    const propertyUserCursor = await getPropertyUsersByProperty(propertyId, userEmail);
    if (!propertyUserCursor.length) {
        return true;
    }
    
    // remove records
    propertyUserCursor.forEach(async(propertyUser) => {
        await deletePropertyUser(propertyUser.property, propertyUser.user, userEmail, true);
    });

    console.log(`${methodTrace} ${getMessage('message', 1050, userEmail, true, propertyUserCursor.length, 'PropertyUser')}`);
    return true;
};

/**
 * @param {Property} propertyId . The Property to update the propertyUsers links
 * @param {array<string>} emails . The array of emails comming from the update action. 
 * @param {string} userEmail . The email of the logged in user performing this action.
 * @param {string} hostname . The host in the url
 * @return {array<string>} . A list with the emails not registered in the platform
 */
exports.updatePropertyUsers = async(propertyId, emails, userEmail, hostname) => {
    const methodTrace = `${errorTrace} updatePropertyUsers() >`;

    //remove duplicates from emails array
    emails = [...new Set(emails)];

    //Look for the specific PropertyUser
    const propertyUserCursor = await getPropertyUsersByProperty(propertyId, userEmail);
    if (!propertyUserCursor.length) {
        return [];
    }
    
    //get array users ids of propertyUser cursor
    const currentUserIds = propertyUserCursor.map(propertyUser => propertyUser.user);
    
    let updatedList = {}; //this is going to be the final result stored in db
    let usersState = {};
    let usersCursor = await userController.getUsersByIds(currentUserIds, userEmail);
    usersCursor.forEach(user => {
        if (emails.includes(user.email)) {
            usersState[user._id] = 'keep';
            updatedList[user.email] = {
                name : user.name,
                email : user.email,
                gravatar : 'https://gravatar.com/avatar/' + md5(user.email) + '?s=200'
            };
        } else {
            usersState[user._id] = 'remove';
        }
        
    });
    
    const currentUserIdsAsStr = currentUserIds.map(id => `${id}`); //convert to array of strings to be able to use include method
    usersCursor = await userController.getUsersByEmails(emails, userEmail);
    let usersCursorEmails = [];
    usersCursor.forEach(user => {
        usersState[user._id] = currentUserIdsAsStr.includes(`${user._id}`) ? 'keep' : 'add';
        usersCursorEmails.push(user.email);  //this are the emails of users registered in atommiCoconut
        updatedList[user.email] = {
            name : user.name,
            email : user.email,
            gravatar : 'https://gravatar.com/avatar/' + md5(user.email) + '?s=200'
        };
    });
    
    updatedList = Object.values(updatedList); // convert into array
    
    //get the emails not registered in atomiCoconut yet
    let emailsNotRegistered = emails.filter(x => !usersCursorEmails.includes(x));
    for (const email of emailsNotRegistered) {
        console.log(`${methodTrace} ${getMessage('message', 1040, userEmail, true, email)}`);
        const registerURL = `${hostname}/users/register`;
        mail.send({
            toEmail : email,
            subject : `AtomiCoconut - Join the investment platform`,
            registerURL,
            adminName : userEmail,
            filename : 'invite-to-join-aco' //this is going to be the mail template file
        });
    }

    //iterate usersState object and perform the proper action
    for (userId of Object.keys(usersState)) {
        const state = usersState[userId];
        
        if (state !== 'keep') {
            // const member = await User.findOne({ email : memberEmail});
            
            if (state === 'add') {
                await addPropertyUser(propertyId, userId, userEmail, false);
            } else {
                //removes record
                await deletePropertyUser(propertyId, userId, userEmail, false);
            }
        }
    }

    return { emailsNotRegistered, updatedList };
};

/**
 * Returns an array of property ids with all the properties shared with the userId as param. Remember that when the user creates a
 * a property is automatically registered in the propertyUsers table too.
 * 
 * @param {ObjectId} userId . The id of the user we want to filter properties
 * @param {string} userEmail . The email of the current logged in user in the system performing this action
 * 
 * @return {array<ObjectId>} . The array of property ids
 */
exports.getPropertyIdsSharedWith = async(userId, userEmail) => {
    const methodTrace = `${errorTrace} getPropertyIdsSharedWithMe() >`;

    //Look for the PropertyUsers that matches the userId as param
    console.log(`${methodTrace} ${getMessage('message', 1051, userEmail, true, 'PropertyUser', `userID = ${userId}`)}`);
    let propertyUserCursor = await PropertyUser.find({ user : userId });
    const records = propertyUserCursor.length;
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, records, 'PropertyUser(s)')}`);
    
    //generate array of property ids
    let propertyIds = propertyUserCursor.map(propertyUser => propertyUser.property);

    return propertyIds;
};