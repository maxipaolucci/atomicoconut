const mongoose = require('mongoose');
const md5 = require('md5');
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
exports.zzz = async (req, res) => {
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
 * Get all teams for the authenticated user
 */
exports.getAllTeams = async (req, res) => {
    const methodTrace = `${errorTrace} getAllTeams() >`;
    //1 - Get all the teams where I am a member
    console.log(`${methodTrace} ${getMessage('message', 1034, 'all Teams', 'user', req.user.email)}`);
    //let teamUsers = await TeamUser.find({ _id : req.user.teamUsers });
    
    //2 - Get teams with members
    let teams = await TeamUser.aggregate([
        { $match : { _id : { $in : req.user.teamUsers } } },
        { $lookup : { from : 'teams', localField : 'team', foreignField : '_id', as : 'teamInfo' } },
        { 
            $project : {
                userId : '$$ROOT.user',
                isAdmin : '$$ROOT.isAdmin',
                teamId : '$$ROOT.team',
                teamSlug : '$teamInfo.slug',
                teamName : '$teamInfo.name',
                teamDescription : '$teamInfo.description'
            }
        },
        { $lookup : { from : 'users', localField : 'userId', foreignField : '_id', as : 'userInfo' } },
        { 
            $addFields : {
                memberId : '$userInfo._id',
                memberName : '$userInfo.name',
                memberEmail : '$userInfo.email'
            }
        }

    ]);

    //Parse the recordset from DB and organize the info better.
    let teamsObj = {};
    for (team of teams) {
        if (!teamsObj[team.teamId]) {
            teamsObj[team.teamId] = {
                slug : team.teamSlug[0],
                name : team.teamName[0],
                description : team.teamDescription[0]
            };

            teamsObj[team.teamId].members = [{
                isAdmin : team.userId.toString() === team.memberId[0].toString(),
                name : team.memberName[0],
                email : team.memberEmail[0],
                gravatar : 'https://gravatar.com/avatar/' + md5(team.memberEmail[0]) + '?s=200'
            }];
        } else {
            teamsObj[team.teamId].members.push({
                isAdmin : team.userId.toString() === team.memberId[0].toString(),
                name : team.memberName[0],
                email : team.memberEmail[0],
                gravatar : 'https://gravatar.com/avatar/' + md5(team.memberEmail[0]) + '?s=200'
            });
        }
    }

    //Generate a pretty result for the service response
    let result = [];
    for (let teamId of Object.keys(teamsObj)) {
        result.push(teamsObj[teamId]);
    }

    //Return teams info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, teams.length, 'Team(s)')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, teams.length, 'Team(s)'),
        data : result
    });
}

/**
 * Get all teams for the authenticated user
 */
exports.getTeamBySlug = async (req, res) => {
    const methodTrace = `${errorTrace} getTeamBySlug() >`;
    //check for a team with the provided slug
    console.log(`${methodTrace} ${getMessage('message', 1034, 'Team', 'slug', req.query.slug)}`);
    
    //get the team with members
    let teams = await Team.aggregate([
        { $match : { slug : req.query.slug } },
        { $lookup : { from : 'users', localField : 'admin', foreignField : '_id', as : 'adminInfo' } },
        { 
            $addFields : {
                admin : {
                    name : '$adminInfo.name',
                    email : '$adminInfo.email'
                }
            }
        }, 
        { $unwind : '$teamUsers'},
        { $lookup : { from : 'teamusers', localField : 'teamUsers', foreignField : '_id', as : 'teamUserInfo' } },
        { 
            $addFields : {
                teamUserUserId : '$teamUserInfo.user'
            }
        },
        { $lookup : { from : 'users', localField : 'teamUserUserId', foreignField : '_id', as : 'memberInfo' } },
        { 
            $addFields : {
                member : {
                    name : '$memberInfo.name',
                    email : '$memberInfo.email'
                }
            }
        },
        {
            $project : {
                adminInfo : false,
                _id : false,
                __v : false,
                memberInfo : false,
                teamUserInfo : false,
                teamUsers : false,
                teamUserUserId : false
            }
        }
    ]);

    //Parse the recordset from DB and organize the info better.
    let result = {};
    for (team of teams) {
        if (!Object.keys(result).length) {
            //we just populate this once because all the teams in this recordset are the same, the only field that changes is the member
            //this is like these because of the use of unwind in the mongoDB query above
            result.name = team.name;
            result.slug = team.slug,
            result.description = team.description,
            result.admin = {
                name : team.admin.name[0],
                email : team.admin.email[0],
                gravatar : 'https://gravatar.com/avatar/' + md5(team.admin.email[0]) + '?s=200'
            };
        }

        if (result.members) {
            result.members.push({
                isAdmin : team.member.email[0] === team.admin.email[0],
                name : team.member.name[0],
                email : team.member.email[0],
                gravatar : 'https://gravatar.com/avatar/' + md5(team.member.email[0]) + '?s=200'
            });
        } else {
            result.members = [{
                isAdmin : team.member.email[0] === team.admin.email[0],
                name : team.member.name[0],
                email : team.member.email[0],
                gravatar : 'https://gravatar.com/avatar/' + md5(team.member.email[0]) + '?s=200'
            }];
        }
        
    }
    

    //Return teams info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, teams.length, 'Team(s)')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, teams.length, 'Team(s)'),
        data : Object.keys(result).length ? result : null
    });
}

/**
 * Get the members of a team
 * @param {*} teamId . The id of the team we want members back
 * 
 * @return {array} . An array of team members
 */
const getMembers = async (teamId = null) => {
    members = await TeamUser.aggregate([
        { $match : { team : teamId } },
        { $lookup : { from : 'users', localField : 'user', foreignField : '_id', as : 'userInfo' } },
        { $project : {
            _id : false,
            isAdmin : '$$ROOT.isAdmin',
            name : '$userInfo.name',
            email : '$userInfo.email'
        }}
    ]);

    let result = [];
    for (let member of members) {
        result.push({
            isAdmin : member.isAdmin,
            name : member.name[0],
            email : member.email[0],
            gravatar : 'https://gravatar.com/avatar/' + md5(member.email[0]) + '?s=200'
        })
    }
    
    return result;
};

/**
 * Get an array of team DTOs from and array of raw teams
 * @param {*} rawArr . Raw teams array from DB
 * @param {*} optionalFields . Optional fields to populate
 */
const getTeamDataObjects = (rawArr = [], optionalFields = {}) => {
    let result = [];
    for (let dto of rawArr) {
        result.push(getTeamDataObject(dto, optionalFields));
    }

    return result;
};

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

