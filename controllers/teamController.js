const mongoose = require('mongoose');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const TeamUser = mongoose.model('TeamUser');
const promisify = require('es6-promisify');
const { getMessage } = require('../handlers/errorHandlers');
const { getUserDataObject } = require('../handlers/userHandlers');

const errorTrace = 'teamController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    console.log(`${methodTrace} ${getMessage('message', 1015)}`);
    req.sanitizeBody('name'); //this method comes with the expressValidator plugin we added in app.js. With this we sanitze the value in req.body.name
    req.checkBody('name', 'You must supply a name!').notEmpty(); //same as above check for not empty
    
    const errors = req.validationErrors();
    if (errors) {
        const errorsArr = errors.map(err => err.msg);
        console.log(`${methodTrace} ${getMessage('error', 458, errorsArr)}`);
        res.status(400).json({ 
            status : "error", 
            codeno : 400,
            msg : errorsArr
        });
        return; //stop from running
    }

    
    console.log(`${methodTrace} ${getMessage('message', 1016)}`);
    next(); //call next middleware
};

exports.create = async (req, res, next) => {
    const methodTrace = `${errorTrace} create() >`;

    //get the logged in user from req
    let user = req.user;
    

    //if no team record found then create one and save
    console.log(`${methodTrace} ${getMessage('message', 1031, 'Team')}`);
    let team = await (new Team({
        name : req.body.name,
        description : req.body.description,
        admin : user._id
    })).save();

    if (team) {
        console.log(`${methodTrace} ${getMessage('message', 1026, 'Team')}`);
        
        console.log(`${methodTrace} ${getMessage('message', 1031, 'TeamUser')}`);
        let teamUser = await (new TeamUser({
            team,
            user : user._id,
            isAdmin : true
        })).save();
        console.log(`${methodTrace} ${getMessage('message', 1026, 'TeamUser')}`);

        //search for the user and add the personal info id
        console.log(`${methodTrace} ${getMessage('message', 1024, 'User', '_id', user._id)}`);
        user = await User.findOneAndUpdate(
            { _id : req.user._id },
            { $addToSet : { teamUsers : teamUser } },
            { new : true }
        );
        console.log(`${methodTrace} ${getMessage('message', 1032, 'User')}`);

        //update the team with the teamUser info
        console.log(`${methodTrace} ${getMessage('message', 1024, 'Team', '_id', team._id)}`);
        team = await Team.findOneAndUpdate(
            { _id : team._id },
            { $addToSet : { teamUsers : teamUser } },
            { new : true }
        );
        console.log(`${methodTrace} ${getMessage('message', 1032, 'Team')}`);

        console.log(`${methodTrace} ${getMessage('message', 1033, 'Team')}`);
        res.json({
            status : 'success', 
            codeno : 200,
            msg : getMessage('message', 1020, user.email),
            data : getTeamDataObject(team)
        });
    } else {
        console.log(`${methodTrace} ${getMessage('error', 459, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, 'Team'),
            data : null
        });
    }
};

/**
 * Get a team base on the slug provided
 */
exports.getTeamBySlug = async (req, res) => {
    const methodTrace = `${errorTrace} getTeamBySlug() >`;
    //check for a team with the provided slug
    console.log(`${methodTrace} ${getMessage('message', 1034, 'Team', 'slug', req.query.slug)}`);
    let team = await Team.findOne({ slug : req.query.slug });
    if (!team) {
        console.log(`${methodTrace} ${getMessage('error', 461, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, 'Team'),
            data : null
        });
        return;
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1035, 'Team')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1035, 'Team'),
        data : getTeamDataObject(team)
    });
}

/**
 * Get a user object that we can send to the client that don't exposes sensible fields like ID
 * @param {*} rawObject . The raw db object to transmit
 * @param {*} optionalFields . Optional fields to add
 */
const getTeamDataObject = (rawObject = {}, optionalFields = {}) => {
    let dto = {
        name : rawObject.name, 
        slug : rawObject.slug, 
        description : rawObject.description,
        admin : rawObject.admin,
        members : rawObject.teamUsers
    };
  
    for (let key of Object.keys(optionalFields)) {
        if (optionalFields[key] === 'true') {
            dto[key] = user[key] || null;
        }
    }
  
    return dto;
};

