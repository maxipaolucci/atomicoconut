const mongoose = require('mongoose');
const md5 = require('md5');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const TeamUser = mongoose.model('TeamUser');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');
const { getUserDataObject } = require('../handlers/userHandlers');

const errorTrace = 'teamController >';

exports.validateRegister = (req, res, next) => {
    const methodTrace = `${errorTrace} validateRegister() >`;

    console.log(`${methodTrace} ${getMessage('message', 1015, req.user.email, true)}`);
    req.sanitizeBody('name'); //this method comes with the expressValidator plugin we added in app.js. With this we sanitze the value in req.body.name
    req.checkBody('name', 'You must supply a name!').notEmpty(); //same as above check for not empty
    
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
    

    //if no team record found then create one and save
    console.log(`${methodTrace} ${getMessage('message', 1031, user.email, true, 'Team')}`);
    let team = await (new Team({
        name : req.body.name,
        description : req.body.description,
        admin : user._id
    })).save();

    if (team) {
        console.log(`${methodTrace} ${getMessage('message', 1026, user.email, true, 'Team')}`);
        
        await addMemberToTeam(user, team, user.email);

        console.log(`${methodTrace} ${getMessage('message', 1033, user.email, true, 'Team')}`);
        res.json({
            status : 'success', 
            codeno : 200,
            msg : getMessage('message', 1020, null, false, user.email),
            data : getTeamDataObject(team)
        });
    } else {
        console.log(`${methodTrace} ${getMessage('error', 459, user.email, true, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 459,
            msg : getMessage('error', 459, null, false, 'Team'),
            data : null
        });
    }
};

/**
 * Adds a user to a team.
 * @param {*} member . The member to add to the team as parameter
 * @param {*} team . The team where to add the member
 * @param {string} userEmail . The email or the current logged in user in the system
 */
const addMemberToTeam = async (member, team, userEmail) => {
    const methodTrace = `${errorTrace} addMemberToTeam() >`;

    //Check for a teamUser that matches the team and member provided
    let teamUser = await TeamUser.findOne({user : member._id, team : team._id});
    if (teamUser) {
        //if one is found means that the member to add already belong to the Team, return
        console.log(`${methodTrace} ${getMessage('error', 466, userEmail, true, member.email, team.name)}`);
        return false;
    }

    //Add a new record in TeamUser with the member and team provided
    console.log(`${methodTrace} ${getMessage('message', 1031, userEmail, true, 'TeamUser')}`);
    teamUser = await (new TeamUser({
        team : team._id,
        user : member._id,
        isAdmin : false
    })).save();
    console.log(`${methodTrace} ${getMessage('message', 1026, userEmail, true, 'TeamUser')}`);

    //add the new TeamUser id to the member in his array of teamUsers
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'User', '_id', member._id)}`);
    member = await User.findOneAndUpdate(
        { _id : member._id },
        { $addToSet : { teamUsers : teamUser } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'User')}`);

    //add the new TeamUser id to the team in its array of teamUsers
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'Team', '_id', team._id)}`);
    team = await Team.findOneAndUpdate(
        { _id : team._id },
        { $addToSet : { teamUsers : teamUser } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'Team')}`);

    return true;
};

/**
 * Deletes a member from a team.
 * @param {*} member . The member to delete from the team as parameter
 * @param {*} team . The team where to remove the member
 * @param {string} userEmail . The email or the current logged in user in the system
 */
const deleteMemberFromTeam = async (member, team, userEmail) => {
    const methodTrace = `${errorTrace} deleteMemberFromTeam() >`;

    //Look for the specific TeamUser
    console.log(`${methodTrace} ${getMessage('message', 1037, userEmail, true, 'TeamUser', `with teamID : ${team._id} and userID : ${member._id}`)}`);
    let teamUser = await TeamUser.findOne({ team : team._id, user : member._id });
    if (teamUser) {
        console.log(`${methodTrace} ${getMessage('message', 1035, userEmail, true, 'TeamUser')}`);
    } else {
        console.log(`${methodTrace} ${getMessage('message', 461, userEmail, true, 'TeamUser')}`);
        return false;
    }

    //remove the teamUser id from the array of teamUsers in User
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'User', '_id', member._id)}`);
    member = await User.findByIdAndUpdate(
        { _id : teamUser.user },
        { $pull : { teamUsers : teamUser._id } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'User')}`);

    //remove the teamUser id from the array of teamUsers in Team
    console.log(`${methodTrace} ${getMessage('message', 1024, userEmail, true, 'Team', '_id', team._id)}`);
    team = await Team.findByIdAndUpdate(
        { _id : teamUser.team },
        { $pull : { teamUsers : teamUser._id } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'Team')}`);

    //Remove the TeamUser record
    console.log(`${methodTrace} ${getMessage('message', 1038, userEmail, true, 'TeamUser', '_id', teamUser._id)}`);
    const writeResult = await TeamUser.remove({ _id : teamUser._id });
    if (writeResult.result.n > 0) {
        console.log(`${methodTrace} ${getMessage('message', 1039, userEmail, true, 'TeamUser')}`);
        return true;
    } else {
        console.log(`${methodTrace} ${getMessage('error', 464, userEmail, true, 'TeamUser', '_id', teamUser._id)}`);
        return false;
    }
};

exports.update = async (req, res, next) => {
    const methodTrace = `${errorTrace} update() >`;

    //get the logged in user from req
    let user = req.user;

    //get the team by slug and check that the admin is the same user asking for update
    let team = await getTeamBySlugObject(req.body.slug, true, user.email);
    if (team && team.admin && team.admin.email !== user.email) {
        //the client is not the admin of the team requested
        console.log(`${methodTrace} ${getMessage('error', 462, user.email, true, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Team'),
            data : null
        });

        return;
    }

    //compare the stored members in DB for this team with the members coming in the service call payload
    let memberState = {};
    for (let oldMember of team.members) {
        memberState[oldMember.email] = req.body.members.includes(oldMember.email) ? 'keep' : 'remove';
        if (memberState[oldMember.email] === 'remove' && oldMember.isAdmin) {
            console.log(`${methodTrace} ${getMessage('error', 463, user.email, true)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 463,
                msg : getMessage('error', 463, null, false),
                data : null
            });
    
            return;
        } 
    }

    for (let newMember of req.body.members) {
        memberState[newMember] = memberState[newMember] ? memberState[newMember] : 'add';
    }

    let usersNotRegistered = []; //store email of users to add to a team that there are not users in AtomiCoconut yet.
    let duplicatedMembers = []; //store all the members requested to add to a team where they already belong to.
    let membersNotInTeam = []; //store all the members requested to delete from a team they doesn't belong to.
    //iterate memberState object and add the new members
    for (memberEmail of Object.keys(memberState)) {
        const state = memberState[memberEmail];
        
        if (state !== 'keep') {
            const member = await User.findOne({ email : memberEmail});
            
            if (state === 'add') {
                if (member) {
                    const result = await addMemberToTeam(member, team, user.email);
                    if (!result) {
                        duplicatedMembers.push(member.email);
                    }
                } else {
                    usersNotRegistered.push(member.email);
                    
                    console.log(`${methodTrace} ${getMessage('message', 1040, user.email, true, member.email)}`);
                    const registerURL = `http://${req.headers.host}/app/users/register`;
                    mail.send({
                        toEmail : member.email,
                        subject : `AtomiCoconut - ${team.name} team invitation to join`,
                        registerURL,
                        teamName : team.name,
                        adminName : team.admin.name,
                        filename : 'invite-to-join-aco-team' //this is going to be the mail template file
                    });
                }
            } else if (state === 'remove' && member) {
                //TODO check the member has not got any investment/activity in that team. otherwise deny the operation
                
                //removes member from team
                const result = await deleteMemberFromTeam(member, team, user.email);
                if (!result) {
                    membersNotInTeam.push(member.email);
                }
            }
        }
    }

    //update the team
    const updates = {
        name : req.body.name,
        description : req.body.description,
        slug : req.body.slug
    };

    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'Team', '_id', team._id)}`);
    team = await Team.findOneAndUpdate(
        { slug : team.slug },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );
    
    if (!team) {
        console.log(`${methodTrace} ${getMessage('message', 465, user.email, true, 'Team', 'slug', req.body.slug)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false),
            data : null
        });

        return;
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, 'Team')}`);
    team = await getTeamBySlugObject(team.slug, false, user.email);

    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1032, null, false, 'Team'),
        data : { team, usersNotRegistered, duplicatedMembers, membersNotInTeam }
    });
};

/**
 * Get all teams for the authenticated user
 */
exports.getAllTeams = async (req, res) => {
    const methodTrace = `${errorTrace} getAllTeams() >`;
    //1 - Get all the teams where I am a member
    console.log(`${methodTrace} ${getMessage('message', 1034, req.user.email, true, 'all Teams', 'user', req.user.email)}`);
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
                teamDescription : '$teamInfo.description',
                teamAdmin : '$teamInfo.admin'
            }
        },
        { $lookup : { from : 'users', localField : 'teamAdmin', foreignField : '_id', as : 'adminInfo' } },
        { 
            $addFields : {
                admin : {
                    name : '$adminInfo.name',
                    email : '$adminInfo.email'
                }
            }
        },
        { $lookup : { from : 'teamusers', localField : 'teamId', foreignField : 'team', as : 'teamUsersOfMyTeams' } },
        { 
            $addFields : {
                teamMembersId : '$teamUsersOfMyTeams.user'
            }
        },
        { $lookup : { from : 'users', localField : 'teamMembersId', foreignField : '_id', as : 'userInfo' } },
        { 
            $addFields : {
                membersId : '$userInfo._id',
                membersName : '$userInfo.name',
                membersEmail : '$userInfo.email'
            }
        }

    ]);

    //Parse the recordset from DB and organize the info better.
    let teamsObj = {};
    for (team of teams) {
        
        teamsObj[team.teamId] = {
            slug : team.teamSlug[0],
            name : team.teamName[0],
            description : team.teamDescription[0],
            admin : {
                name : team.admin.name[0],
                email : team.admin.email[0],
                gravatar : 'https://gravatar.com/avatar/' + md5(team.admin.email[0]) + '?s=200'
            }
        };

        teamsObj[team.teamId].members = [];
        for (let i = 0; i < team.membersId.length; i++) {
            const member = {
                isAdmin : team.membersEmail[i] === teamsObj[team.teamId].admin.email,
                name : team.membersName[i],
                email : team.membersEmail[i],
                gravatar : 'https://gravatar.com/avatar/' + md5(team.membersEmail[i]) + '?s=200'
            };

            teamsObj[team.teamId].members.push(member);
        }
    }

    //Generate a pretty result for the service response
    let result = [];
    for (let teamId of Object.keys(teamsObj)) {
        result.push(teamsObj[teamId]);
    }

    //Return teams info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, req.user.email, true, teams.length, 'Team(s)')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, teams.length, 'Team(s)'),
        data : result
    });
}


/**
 * Get a team by slug
 * @param {*} slug 
 */
const getTeamBySlugObject = async (slug, withId = false, userEmail = null) => {
    const methodTrace = `${errorTrace} getTeamBySlugObject() >`;

    //check for a team with the provided slug
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'Team', 'slug', slug)}`);
    
    //get the team with members
    let teams = await Team.aggregate([
        { $match : { slug } },
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
            if (withId) {
                result._id = team._id;
            }
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
    console.log(`${methodTrace} ${getMessage('message', 1036, userEmail, true, Object.keys(result).length ? 1 : 0, 'Team(s)')}`);
    return Object.keys(result).length ? result : null;
};

/**
 * Get a team by slug and send it back to client
 */
exports.getTeamBySlug = async (req, res) => {
    const methodTrace = `${errorTrace} getTeamBySlug() >`;

    const result = await getTeamBySlugObject(req.query.slug, false, req.user.email);
    
    if (result && result.admin && result.admin.email !== req.user.email) {
        //the client is not the admin of the team requested
        console.log(`${methodTrace} ${getMessage('error', 462, req.user.email, true, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Team'),
            data : null
        });

        return;
    }

    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, 1, 'Team(s)'),
        data : result
    });
};

exports.delete = async (req, res) => {
    const methodTrace = `${errorTrace} delete() >`;

    const user = req.user;
    const team = await getTeamBySlugObject(req.params.slug, true, req.body.email);

    if (team && team.admin && team.admin.email !== req.body.email) {
        //the client is not the admin of the team requested
        console.log(`${methodTrace} ${getMessage('error', 462, user.email, true, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Team'),
            data : null
        });

        return;
    } else if (team) {
        //TODO check if the team has any investment

        //remove all the members in the team
        for (let member of team.members) {
            const person = await User.findOne({ email : member.email});
            const result = await deleteMemberFromTeam(person, team, user.email);
            if (!result) {
                console.log(`${methodTrace} ${getMessage('error', 469, user.email, true, `user = ${member.email}`, `team = ${team.slug}`)}`);
            }
        }

        //remove the team
        console.log(`${methodTrace} ${getMessage('message', 1038, user.email, true, 'Team', '_id', team._id)}`);
        const writeResult = await Team.remove({ _id : team._id });
        if (writeResult.result.n > 0) {
            console.log(`${methodTrace} ${getMessage('message', 1039, user.email, true, 'Team')}`);
            res.json({
                status : 'success', 
                codeno : 200,
                msg : getMessage('message', 1039, null, false, 'Team'),
                data : { removed : writeResult.result.n }
            });

            return;
        } else {
            console.log(`${methodTrace} ${getMessage('error', 464, user.email, true, 'Team', '_id', team._id)}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 462,
                msg : getMessage('error', 462, null, false, 'Team'),
                data : null
            });

            return;
        }
    }

    console.log(`${methodTrace} ${getMessage('error', 461, req.user.email, true, 'Team')}`);
    res.status(401).json({ 
        status : "error", 
        codeno : 461,
        msg : getMessage('error', 461, null, false, 'Team'),
        data : null
    });
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

