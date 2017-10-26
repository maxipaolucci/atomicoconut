const errorTrace = 'errorHandlers >';

const errorCodes = {
  400 : 'Error catched by errorHandlers().',
  450 : 'There was an arror trying to authenticate the user.',
  451 : 'No user found with the provided credentials',
  452 : 'There was an error trying to login with the recently authenticated user.',
  453 : 'User not authenticated to proceed.',
  454 : 'this {{param}} is a {{param}} test.',
  455 : 'None user found with email: {{param}}.',
  456 : 'Passwords do not match!',
  457 : 'User not found with that token, it may be invalid or already expired.',
  458 : 'The register form contains some errors: {{param}}.',
  459 : 'Failed to create and save a new record of {{param}}.',
  460 : 'User email loggedin in current server session does not match {{param}} provided by the service consumer.'
};

const messageCodes = {
  1000 : 'Login successfull!',
  1001 : 'Trying to authenticate with passport...',
  1002 : 'Authentication successfull. Now trying to login...',
  1003 : 'Checking for authenticated user...',
  1004 : 'User is authenticated!',
  1005 : 'Logged out user {{param}}.',
  1006 : 'Checking user with email {{param}}...',
  1007 : 'User {{param}} found, saving token in user Schema...',
  1008 : 'Token saved for {{param}}, sending email to user with reset password url...',
  1009 : 'You have been emailed a password reset link',
  1010 : 'Mail successfully sent to {{param}}.',
  1011 : 'Checking for User with token {{param}} not expired...',
  1012 : 'User found, saving new password...',
  1013 : 'Nice! Password has been reset! You are now logged in.',
  1014 : 'User with token provided found.',
  1015 : 'Validating register form fields...',
  1016 : 'Register form fields are OK.',
  1017 : 'Trying to register {{param}}...',
  1018 : 'User {{param}} successfully registered.',
  1019 : 'Searching user {{param}} for update...',
  1020 : 'User {{param}} profile successfully updated.',
  1021 : 'User {{param}} has not got access to investments',
  1022 : 'User {{param}} has access to investments',
  1023 : 'Checking access to investments for {{param}}...',
  1024 : 'Searching {{param}} with {{param}} = {{param}} to update...',
  1025 : '{{param}} record not found in DB. Creating one instead...',
  1026 : 'New {{param}} record successfully created and saved.',
  1027 : 'User {{param}} found.',
  1028 : '{{param}} record successfully updated.',
  1029 : 'Checking that the logged in user email in session matches {{param}} provided by the service consumer...',
  1030 : 'Email provided by service consumer successfully matches the user in the current server session.'
};

/**
 * Return messages configured with provided params if set
 * @param {*} codeno . The number of message to get back
 * @param {*} params . The params to configure the message
 */
const getMessage = (type = 'error', codeno = -1, ...params) => {
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
  
  return message;
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

  console.log(`${methodTrace} Something went wrong.`);
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
  const methodTrace = `${errorTrace} notFound() >`;
  
  console.log(`${methodTrace} Route not found.`);
  const err = new Error('Not Found');
  err.status = 'error';
  err.codeno = 404;
  err.message = 'Page not found';
  
  next(err);
};

/*
  MongoDB Validation Error Handler

  Detect if there are mongodb validation errors that we can nicely show via flash messages
*/

// exports.flashValidationErrors = (err, req, res, next) => {
//   if (!err.errors) return next(err);
//   // validation errors look like
//   const errorKeys = Object.keys(err.errors);
//   errorKeys.forEach(key => req.flash('error', err.errors[key].message));
//   res.redirect('back');
// };


/*
  Development Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res, next) => {
  const methodTrace = `${errorTrace} developmentErrors() >`;

  console.log(`${methodTrace} Something went wrong: ${err.message}`);
  err.stack = err.stack || '';
  //console.log(err);
  const errorDetails = {
    msg: `${getMessage('error', 400)} ${err.message || err.msg}`,
    status: 'error',
    codeno: 400,
    data: err
  };

  res.status(err.status || 400);
  res.format({
    // Based on the `Accept` http header
    'text/html': () => {
      errorDetails.data = err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>');
      //res.json(errorDetails);
      res.render('tests/error', errorDetails);
    }, // Form Submit, Reload the page
    'application/json': () => {
      res.json(errorDetails) // Ajax call, send JSON back
    }
  });
};


/*
  Production Error Handler

  No stacktraces are leaked to user
*/
exports.productionErrors = (err, req, res, next) => {
  const methodTrace = `${errorTrace} productionErrors() >`;
  
  console.log(`${methodTrace} Something went wrong.`);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
};
