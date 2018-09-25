const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//setup express app
const app = express();

// connect to mongodb
mongoose.connect(
    'mongodb://eugeniov:test123@ds113003.mlab.com:13003/crud');

// fix for deprecated mongoose.Promise
mongoose.Promise = global.Promise;

// enable parsing of json data
app.use(bodyParser.json());

// initialize routes
// -- insert 'api' before each route set
app.use('/api', require('./routes/api'));

// error handler
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});


//listen for requests -- will listen to 4000 if either process.env.port
// is not available / undefined
app.listen(process.env.port || 4000, () => {
    console.log('Now listening to port 4000 for requests...');
});
