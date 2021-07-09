const moment = require('moment');
const winston = require('winston');
require('winston-daily-rotate-file');
const { ANONYMOUS_USER } = require('../constants/constants');
const utils = require('./utils');

const errorTrace = 'errorHandlers >';


const errorCodes = {
  400: 'Error catched by errorHandlers().',
  450: 'There was an arror trying to authenticate the user.',
  451: 'No user found with the provided credentials',
  452: 'There was an error trying to login with the recently authenticated user.',
  453: 'User not authenticated to proceed.',
  454: 'This {{param}} is a {{param}} test.',
  455: 'None user found with email: {{param}}.',
  456: 'Passwords do not match!',
  457: 'User not found with that token, it may be invalid or already expired.',
  458: 'The data provided contains some errors: {{param}}.',
  459: 'Failed to create and save a new record of {{param}}.',
  460: 'User email loggedin in current server session does not match "{{param}}" provided by the service consumer.',
  461: 'No {{param}} found with those parameters.',
  462: 'The {{param}} information requested it is not available for {{param}}.',
  463: 'You cannot remove the administrator of a {{param}}.',
  464: 'Error trying to remove records from {{param}} with {{param}} = {{param}}',
  465: 'Failed to update record from {{param}} with {{param}} = {{param}}',
  466: '{{param}} already member of Team: {{param}}.',
  467: 'Something went wrong.',
  468: 'Route not found: {{param}}',
  469: 'Failed to remove {{param}} from {{param}}.',
  470: 'Sorry, you are not allowed to update this {{param}}.',
  471: 'Sorry, this {{param}} has {{param}} associated to it. We cannot delete it until all the related data is removed or associated to another entity.',
  472: 'Error trying to add a new member to each investment distribution array of the team investments.',
  473: 'Error trying to remove member from each investment distribution array from team investments.',
  474: 'The investment type provided "{{param}}" does not match any of the invesment types supported by the platform.',
  475: 'Sorry, this {{param}} has {{param}} associated to it. We cannot delete it until all the related data is removed.',
  476: 'Sorry, you cannot create a {{param}} with a {{param}} not created by you.',
  477: 'Error trying to retrieve data from {{param}} with {{param}} = {{param}}.',
  478: 'Error trying to retrieve data from {{param}}.',
  479: 'User account for {{param}} was not activated. Please check in your email for an activation link.',
  480: 'JWT provided is invalid for {{param}}',
  481: 'Error trying to generate a crypto ratio alert for {{param}}/{{param}}',
  432: 'Command "{{param}}" execution failed. Output: {{param}}',
  433: 'child_process.exec({{param}}) failed. Error: {{param}}'
};

const messageCodes = {
  1000: 'Login successfull!',
  1001: 'Trying to authenticate with passport...',
  1002: 'Authentication successfull. Now trying to login...',
  1003: 'Checking for authenticated user...',
  1004: 'User is authenticated!',
  1005: 'Logged out user {{param}}.',
  1006: 'Checking user with email {{param}}...',
  1007: 'User {{param}} found, saving token in user Schema...',
  1008: 'Token saved for {{param}}, sending email to user with {{param}} url...',
  1009: 'You have been emailed a {{param}} link',
  1010: 'Mail successfully sent to {{param}}.',
  1011: 'Checking for User with token {{param}} not expired...',
  1012: 'User found, saving new password...',
  1013: 'Password for {{param}} was successfully reset and user is now logged in.',
  1014: 'User with token provided found.',
  1015: 'Validating data provided...',
  1016: 'Data provided OK.',
  1017: 'Trying to register {{param}}...',
  1018: 'User {{param}} successfully registered.',
  1019: 'Searching user {{param}} for update...',
  1020: 'User {{param}} profile successfully updated.',
  1021: 'User {{param}} has not got access to investments',
  1022: 'User {{param}} has access to investments',
  1023: 'Checking access to investments for {{param}}...',
  1024: 'Searching {{param}} with {{param}} = {{param}} to update...',
  1025: '{{param}} record not found in DB. Creating one instead...',
  1026: 'New {{param}} record successfully created and saved.',
  1027: 'User {{param}} found.',
  1028: 'Record in {{param}} found and successfully updated.',
  1029: 'Checking that the logged in user email in session matches "{{param}}" provided by the service consumer...',
  1030: 'Email provided by service consumer successfully matches the user in the current server session.',
  1031: 'Saving a new record into {{param}}...',
  1032: '{{param}} successfully updated.',
  1033: '{{param}} and all related data successfully created and saved.',
  1034: 'Get {{param}} by {{param}} = {{param}}...',
  1035: '{{param}} found.',
  1036: '{{param}} {{param}} found.',
  1037: 'Searching one {{param}} with {{param}}...',
  1038: 'Removing from {{param}} where {{param}} = {{param}}...',
  1039: '{{param}} record successfully removed.',
  1040: '{{param}} is not a user of AtomiCoconut. Sending email to join the app...',
  1041: 'Sending email via {{param}}...',
  1042: '{{param}} and all related data successfully updated.',
  1043: 'Updating team investments, adding new member to each investment distributtion array...',
  1044: 'Successfully added new member to each investment distribution array',
  1045: 'Updating team investments, removing the member from each investment distributtion array...',
  1046: 'Successfully removed member from each investment distribution array',
  1047: 'Getting data from {{param}} with {{param}} = {{param}}...',
  1048: 'Data from {{param}} successfully retrieved.',
  1049: 'Getting latest data from {{param}}',
  1050: '{{param}} record(s) successfully removed from {{param}}',
  1051: 'Searching all {{param}} records with {{param}}...',
  1052: 'Checking that password and password-confirm values are equal...',
  1053: 'Check done and was successful.',
  1054: 'Sending alert by email for {{param}} to {{param}}...',
  1055: 'Email sent to {{param}}.',
  1056: 'User found, activating account...',
  1057: 'Account for {{param}} successfully activated and user is now logged in.',
  1058: 'Checking provided JWT with current user token stored in server...',
  1059: 'JWT is valid for {{param}}',
  1060: 'Creating a new JWT for {{param}}..., it will expire in {{param}}.',
  1061: 'JWT created for {{param}}, expires in {{param}}.',
  1062: 'Client app API keys successfully retrieved.',
  1063: 'Alert Crypto Ratio triggered.',
  1064: 'Alert crypto ratio notification is off for {{param}}.',
  1065: 'Command "{{param}}" executed successfully. Output: {{param}}'
};

// Get Logger instance. Using the logger variable we handle it as a singleton.
let logger = null;
const getLoggerInstance = () => {
  const methodTrace = `getLoggerInstance() >`;

  if (!logger) {
    let transport = new winston.transports.DailyRotateFile({
      filename: `acserver-${utils.getEnvironment()}.log`,
      // filename: `acserver-%DATE%.log`,
      // datePattern: 'YYYY-MM-DD-HH-',
      dirname: 'logs',
      maxSize: process.env.LOG_SIZE
    });
  
    transport.on('rotate', async (oldFilename, newFilename) => {
      let newDate = moment(Date.now()).format('DD-MM-YYYY_HH-mm-ss-SSS');
      let oldFilenameArr = oldFilename.split('/')[1].split('.');
      let oldFileNameUnique = `${oldFilenameArr[0]}-${newDate}.${oldFilenameArr[1]}`; 
      // move oldFilename to a mounted dir to be able to be send to S3 by a cronjob
      utils.runCommand(`mv ${oldFilename} logs-old/${oldFileNameUnique}`);
    });
    
    logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'acserver', environment: utils.getEnvironment() },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        //new winston.transports.File({ filename: 'logs/acservererror.log', level: 'error' }),
        // new winston.transports.File({ filename: 'logs/acserver.log' }),
        transport
      ],
    });

    logger.log({
      level: 'info',  
      codeno: 1,
      message: 'Logger created successfuly.',
      date: moment(Date.now()).format('DD/MM/YYYY HH:mm:ss.SSS'),
      userEmail: null,
    });

    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    // if (!utils.isProduction()) {
    //   logger.add(new winston.transports.Console({
    //     format: winston.format.simple(),
    //   }));
    //   logger.info(`As environment is ${process.env.NODE_ENV}, adding console output to logger.`);
    // } 
  }
  
  return logger;
};

/**
 * Sends log data to the logger if the logger env variable is set to true
 * @param {*} loggerData 
 */
const sendToLogger = (loggerData = null) => {
  if (process.env.LOGGER_ENABLED === 'true') {
    getLoggerInstance().log(loggerData);
  }
};

/**
 * Return messages configured with provided params if set
 * @param {*} codeno . The number of message to get back
 * @param {*} params . The params to configure the message
 */
const getMessage = (type = 'error', codeno = -1, userEmail = null, showDate = false, addToLogger = true, ...params) => {
  if (codeno === -1) {
    return '';
  }
  
  let message = type === 'error' ? errorCodes[codeno] : messageCodes[codeno];

  if (!message) {
    return '';
  }

  if (params.length) {
    for (const param of params) {
      message = message.replace("{{param}}", param);
    }
  }
  
  let prefix = '';
  if (userEmail) {
    prefix += `[${userEmail}`;
  }

  let date = moment(Date.now()).format('DD/MM/YYYY HH:mm:ss.SSS');
  if (showDate) {
    prefix += prefix.length ? ` on ${date}]` : `[on ${date}]`;
  }
  
  // send to logger
  if (addToLogger) {
    sendToLogger({
      level: type == 'message' ? 'info' : type,  
      codeno,
      message,
      date,
      userEmail,
    });
  }

  return `${prefix} ${message}`;
};
exports.getMessage = getMessage;

/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
  const methodTrace = `${errorTrace} catchErrors() >`;
  
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const methodTrace = `${errorTrace} notFound() >`;
  
  console.log(`${methodTrace} ${getMessage('error', 468, req.user ? req.user.email : ANONYMOUS_USER, true, true, req.originalUrl)}`);
  const err = new Error('Not Found');
  err.status = 'error';
  err.codeno = 404;
  err.message = getMessage('error', 468, null, false, false, req.originalUrl);
  
  next(err);
};

/*
  Custom Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.customErrorHandler = (err, req, res, next) => {
  const methodTrace = `${errorTrace} customErrorHandler() >`;
  
  console.log(`${methodTrace} ${getMessage('error', 467, req.user ? req.user.email : null, true, true)} ${err.message}`);
  err.stack = err.stack || '';
  
  let errorDetails = {};
  if (err.codeno == 404) {
    // it comes from notFound middleware
    errorDetails = {
      msg: err.message,
      status: err.status,
      codeno: err.codeno,
      data: !utils.isProduction() ? err.stack : ''
    };
  } else {
    // it comes from an exception thronw from another controller
    errorDetails = {
      msg: `${err.message || err.msg}`,
      status: 'error',
      codeno: err.codeno || err.status,
      code: err.code || '',
      data: !utils.isProduction() ? err.stack : ''
    };
  }
  

  res.status(errorDetails.codeno || 500);
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      errorDetails.data = err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>');
      //res.json(errorDetails);
      res.render('tests/error', errorDetails);
    }, // Form Submit, Reload the page
    'application/json': () => {
      res.json(errorDetails) // Send JSON back
    }
  });
};
