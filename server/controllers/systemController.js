const { getMessage } = require('../handlers/errorHandlers');
const { ANONYMOUS_USER, PUSHER_CHANNEL } = require('../constants/constants');

const errorTrace = 'systemController >';


/**
 * Get many api keys for the client app. 
 */
exports.getClientApiKeys = (req, res) => {
    const methodTrace = `${errorTrace} getClientApiKeys() >`;

    const userEmail = req.user ? req.user.email : ANONYMOUS_USER; //it is not required to be logged in to access this controller
    let keys = {
        mapsApiKey: process.env.MAPS_API_KEY,
        pusher: {
            key: process.env.PUSHER_KEY,
            cluster: process.env.PUSHER_CLUSTER,
            channel: PUSHER_CHANNEL
        }
    };

    console.log(`${methodTrace} ${getMessage('message', 1062, userEmail, true, true)}`);
    res.json({
        status : 'success', 
        codeno : 200,
        msg : getMessage('message', 1062, null, false),
        data : keys
    });
};
