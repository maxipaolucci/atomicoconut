const { PUSHER_CHANNEL } = require('../constants/constants');
const mongoose = require('mongoose');
const md5 = require('md5');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const Investment = mongoose.model('Investment');
const TeamUser = mongoose.model('TeamUser');
const mail = require('../handlers/mail');
const { getMessage } = require('../handlers/errorHandlers');
const { getPusher } = require('../handlers/utils');
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
    

    //save a new team record in DB
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
            msg : getMessage('message', 1033, null, false, 'Team'),
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
    await Team.findOneAndUpdate(
        { _id : team._id },
        { $addToSet : { teamUsers : teamUser } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'Team')}`);

    //update each investment of the team with the new member in the distribution array.
    if (team.investments && team.investments.length) {
        console.log(`${methodTrace} ${getMessage('message', 1043, userEmail, true)}`);
        try {
            await Investment.updateMany(
                { _id : { $in : team.investments } },
                { $addToSet : { 
                    investmentDistribution : {
                        email : member.email,
                        percentage : 0  
                    } 
                } }
            );

            console.log(`${methodTrace} ${getMessage('message', 1044, userEmail, true)}`);
        } catch (error) {
            console.log(`${methodTrace} ${getMessage('error', 472, userEmail, true)}`);
            
            return false;
        }
    }

    return true;
};

/**
 * Deletes a member from a team.
 * @param {*} member . The member to delete from the team as parameter
 * @param {*} team . The team where to remove the member
 * @param {string} userEmail . The email or the current logged in user in the system
 * 
 * @return {boolean} . True if a record was deleted.
 */
const deleteMemberFromTeam = async (member, team, userEmail) => {
    const methodTrace = `${errorTrace} deleteMemberFromTeam() >`;

    //Look for the specific TeamUser
    console.log(`${methodTrace} ${getMessage('message', 1037, userEmail, true, 'TeamUser', `with teamID : ${team._id} and userID : ${member._id}`)}`);
    let teamUser = await TeamUser.findOne({ team : team._id, user : member._id });
    if (teamUser) {
        console.log(`${methodTrace} ${getMessage('message', 1035, userEmail, true, 'TeamUser')}`);
    } else {
        console.log(`${methodTrace} ${getMessage('error', 461, userEmail, true, 'TeamUser')}`);
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
    await Team.findByIdAndUpdate(
        { _id : teamUser.team },
        { $pull : { teamUsers : teamUser._id } },
        { new : true }
    );
    console.log(`${methodTrace} ${getMessage('message', 1032, userEmail, true, 'Team')}`);

    //update each investment of the team removing the member from the distribution array.
    if (team.investments && team.investments.length) {
        console.log(`${methodTrace} ${getMessage('message', 1045, userEmail, true)}`);
        try {
            await Investment.updateMany(
                { _id : { $in : team.investments } },
                { $pull : { 
                    investmentDistribution : {
                        email : member.email  
                    } 
                } }
            );

            console.log(`${methodTrace} ${getMessage('message', 1046, userEmail, true)}`);
        } catch (error) {
            console.log(`${methodTrace} ${getMessage('error', 473, userEmail, true)}`);

            return false;
        }
    }

    //Remove the TeamUser record
    console.log(`${methodTrace} ${getMessage('message', 1038, userEmail, true, 'TeamUser', '_id', teamUser._id)}`);
    const writeResult = await TeamUser.remove({ _id : teamUser._id });
    if (writeResult.n > 0) {
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
    let team = await getTeamBySlugObject(req.body.slug, user.email, { withId : true, withInvestments : true });
    
    if (team && team.admin && team.admin.email !== user.email) {
        //the client is not the admin of the team requested
        console.log(`${methodTrace} ${getMessage('error', 462, user.email, true, 'Team', user.email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Team', user.email),
            data : null
        });

        return;
    }

    //compare the stored members in DB for this team with the members coming in the service call payload
    let memberState = {};
    for (let oldMember of team.members) {
        memberState[oldMember.email] = req.body.members.includes(oldMember.email) ? 'keep' : 'remove';
        if (memberState[oldMember.email] === 'remove' && oldMember.isAdmin) {
            console.log(`${methodTrace} ${getMessage('error', 463, user.email, true, 'Team')}`);
            res.status(401).json({ 
                status : "error", 
                codeno : 463,
                msg : getMessage('error', 463, null, false, 'Team'),
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
                        duplicatedMembers.push({name : member.name, email : member.email});
                    }
                } else {
                    usersNotRegistered.push(memberEmail);
                    memberState[memberEmail] = 'email-sent';
                    
                    console.log(`${methodTrace} ${getMessage('message', 1040, user.email, true, memberEmail)}`);
                    const registerURL = `http://${req.headers.host}/app/users/register`;
                    mail.send({
                        toEmail : memberEmail,
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
    const oldSlug = team.slug;
    let updates = {
        description : req.body.description
    };
    if (team.name !== req.body.name) {
        updates.name = req.body.name; //we do in this way to just add the name if it changed therefore we need to change the slug. So if property name is present then
                                    //we know we need a new slug. To capture the change in findOneAndUpdate pre hook (in schema) we cannot do this.isModified as in save hook
                                    //so we check if the property is there to konw it changed.
    }

    console.log(`${methodTrace} ${getMessage('message', 1024, user.email, true, 'Team', 'slug', team.slug)}`);
    team = await Team.findOneAndUpdate(
        { slug : team.slug },
        { $set : updates },
        { new : true, runValidators : true, context : 'query' }
    );
    
    if (!team) {
        console.log(`${methodTrace} ${getMessage('error', 465, user.email, true, 'Team', 'slug', oldSlug)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 465,
            msg : getMessage('error', 465, null, false, 'Team', 'slug', oldSlug),
            data : null
        });

        return;
    }
    
    console.log(`${methodTrace} ${getMessage('message', 1032, user.email, true, 'Team')}`);
    team = await getTeamBySlugObject(team.slug, user.email, { withId : false });

    // send push notification to client
    getPusher().trigger(PUSHER_CHANNEL, 'team-updated', {
        team: {
            slug: team.slug,
            name: team.name,
            memberState
        },
        email: user.email,
        name: user.name,
    }, req.body.pusherSocketID);

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

    //3 - Parse the recordset from DB and organize the info better.
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

    //4 - Generate a pretty result for the service response
    let result = [];
    for (let teamId of Object.keys(teamsObj)) {
        result.push(teamsObj[teamId]);
    }
    
    //5 - Return teams info to the user.
    console.log(`${methodTrace} ${getMessage('message', 1036, req.user.email, true, teams.length, 'Team(s)')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1036, null, false, teams.length, 'Team(s)'),
        data : result
    });
};


/**
 * Get a team by slug
 * @param {string} slug
 * @param {string} userEmail . Just for debug in console purposes.
 * @param {object} options . Object with specific options to populate on the result
 * 
 * @return {object} . The team looked for or null
 */
const getTeamBySlugObject = async (slug, userEmail = null, options = null) => {
    const methodTrace = `${errorTrace} getTeamBySlugObject() >`;

    //check for a team with the provided slug
    console.log(`${methodTrace} ${getMessage('message', 1034, userEmail, true, 'Team', 'slug', slug)}`);

    //filter by slug
    let aggregationStages = [{ $match : { slug } }];

    if (options && options.withInvestments) {
        //look for investments
        aggregationStages.push({ $lookup : { from : 'investments', localField : '_id', foreignField : 'team', as : 'investmentsInfo' } });
    }

    //get admin and team members info
    aggregationStages = aggregationStages.concat([
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

    //get the team with members
    let teams = await Team.aggregate(aggregationStages);

    //Parse the recordset from DB and organize the info better.
    let result = {};
    for (team of teams) {
        if (!Object.keys(result).length) {
            //we just populate this once because all the teams in this recordset are the same, the only field that changes is the member
            //this is like these because of the use of unwind in the mongoDB query above
            if (options && options.withId) {
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

            if (options && options.withInvestments) {
                result.investments = [];
                for (let investment of team.investmentsInfo) {
                    result.investments.push(investment._id);
                }
            }
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
exports.getTeamBySlugObject = getTeamBySlugObject;

/**
 * Get a team by slug and send it back to client
 */
exports.getMyTeamBySlug = async (req, res) => {
    const methodTrace = `${errorTrace} getMyTeamBySlug() >`;

    const result = await getTeamBySlugObject(req.query.slug, req.user.email, { withId : false });
    
    if (!result) {
        console.log(`${methodTrace} ${getMessage('error', 461, req.user.email, true, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, null, false, 'Team'),
            data : null
        });

        return;
    } else if (result && result.admin && result.admin.email !== req.user.email) {
        //the client is not the admin of the team requested
        console.log(`${methodTrace} ${getMessage('error', 462, req.user.email, true, 'Team', req.user.email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Team', req.user.email),
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
    const team = await getTeamBySlugObject(req.params.slug, req.query.email, { withId : true, withInvestments : true });

    if (!team) {
        console.log(`${methodTrace} ${getMessage('error', 461, req.user.email, true, 'Team')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 461,
            msg : getMessage('error', 461, null, false, 'Team'),
            data : null
        });

        return;
    }

    if (team && team.admin && team.admin.email !== req.query.email) {
        //the client is not the admin of the team requested
        console.log(`${methodTrace} ${getMessage('error', 462, user.email, true, 'Team', user.email)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 462,
            msg : getMessage('error', 462, null, false, 'Team', user.email),
            data : null
        });

        return;
    }

    //check if the team has any investment
    if (team.investments && team.investments.length) {
        console.log(`${methodTrace} ${getMessage('error', 471, user.email, true, 'Team', 'Investments')}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 471,
            msg : getMessage('error', 471, null, false, 'Team', 'Investments'),
            data : null
        });

        return;
    }

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
    if (!(writeResult && writeResult.n > 0)) {
        console.log(`${methodTrace} ${getMessage('error', 464, user.email, true, 'Team', '_id', team._id)}`);
        res.status(401).json({ 
            status : "error", 
            codeno : 464,
            msg : getMessage('error', 464, null, false, 'Team', '_id', team._id),
            data : null
        });

        return;
    }

    // send push notification to client
    getPusher().trigger(PUSHER_CHANNEL, 'team-deleted', {
        team: {
            members: team.members,
            name: team.name,
            slug: team.slug
        },
        email: user.email,
        name: user.name,
    }, req.query.pusherSocketID);

    console.log(`${methodTrace} ${getMessage('message', 1039, user.email, true, 'Team')}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1039, null, false, 'Team'),
        data : { 
            removed: writeResult.n, 
            team: {
                slug: team.slug,
                name: team.name
            }
        }
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

