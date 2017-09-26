const errorTrace = 'errorHandlers >';

const errorCodes = {
  400 : 'Error catched by errorHandlers().',
  450: 'There was an arror trying to authenticate the user.',
  451 : 'No user found with the provided credentials',
  452 : 'There was an error trying to login with the recently authenticated user.',
  453 : 'User not authenticated to proceed.'
};

const messageCodes = {
  1000 : 'Login successfull!',
  1001 : 'Trying to authenticate with passport...',
  1002 : 'Authentication successfull. Now trying to login...',
  1003 : 'Checking for authenticated user...',
  1004 : 'User is authenticated!' 
};

exports.errorCodes = errorCodes;
exports.messageCodes = messageCodes;



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

exports.flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  // validation errors look like
  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach(key => req.flash('error', err.errors[key].message));
  res.redirect('back');
};


/*
  Development Error Hanlder

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
exports.developmentErrors = (err, req, res, next) => {
  const methodTrace = `${errorTrace} developmentErrors() >`;

  console.log(`${methodTrace} Something went wrong.`);
  err.stack = err.stack || '';
  const errorDetails = {
    msg: `${errorCodes[400]} ${err.message || err.msg}`,
    status: 'error',
    codeno: 400,
    data: null
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
