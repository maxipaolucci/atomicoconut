const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const passport = require('passport');
const { promisify } = require('es6-promisify');
const routes = require('./routes/index');
const usersRoutes = require('./routes/api/usersRoutes');
const teamsRoutes = require('./routes/api/teamsRoutes');
const investmentsRoutes = require('./routes/api/investmentsRoutes');
const propertiesRoutes = require('./routes/api/propertiesRoutes');
const currencyRatesRoutes = require('./routes/api/currencyRatesRoutes');
const cryptoRatesRoutes = require('./routes/api/cryptoRatesRoutes');
const systemRoutes = require('./routes/api/systemRoutes');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const cors = require('cors');
require('./handlers/passport'); //used by passport library

// create our Express app
const app = express();
// cross domain requests
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// takes the request of multipart/form-data types and put the payload and files into req.body and req.files respectively (thanks to multer)
const multerOptions = {
  storage : multer.memoryStorage(), //setup to storage in memory at this point cause we are going to resize files before store in disk
  fileFilter(req, file, next) {
    // check for only images in file uploads. 
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
        next(null, true); //next works like promises. If we pass just one, that means that the promise fails
                          //and it is going to be catch as an error, if we set it to null and pass a true
                          // the promise is process as a success
    } else {
        next({ message : 'That filetype is not allowed!' }, false); //here the promise is set to fail
    }
  }
};
app.use(multer(multerOptions).array('files'));

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in
app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie : { maxAge: parseInt(process.env.SESSION_DURATION_SECONDS) * 1000 }
}));

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  res.locals.environment = process.env.NODE_ENV;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

//allow cross origin requests
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// After allllll that above middleware, we finally handle our own routes!
app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/investments', investmentsRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/currencyRates', currencyRatesRoutes);
app.use('/api/cryptoRates', cryptoRatesRoutes);
app.use('/api/system', systemRoutes);
app.use('/', routes); //this one at the end cause it contains the wildcard if the requested route does not match any route declared before

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

/* Custom Error Handler - In DEV Prints stack trace */
app.use(errorHandlers.customErrorHandler);

// done! we export it so we can start the site in start.js
module.exports = app;
