const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');

//setup express app
const app = express();

// connect to mongodb
mongoose.connect(
    'mongodb://eugeniov:test123@ds113003.mlab.com:13003/crud');

// fix for deprecated mongoose.Promise
mongoose.Promise = global.Promise;

// enable parsing of json data
app.use(bodyParser.json());

// Set templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// initialize routes
// -- insert 'api' before each route set
app.use('/api', require('./routes/api'));
app.use(expressValidator());
// error handler
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});


//listen for requests -- will listen to 4000 if either process.env.port
// is not available / undefined
app.listen(process.env.PORT || 4000, () => {
    console.log('Now listening to port 4000 for requests...');
});
