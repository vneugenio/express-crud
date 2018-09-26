const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const path = require('path');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(expressValidator());


// home / login page
router.get('/', function(req, res) {
    // res.json({message: 'Welcome'});
    res.render('index', {
        title:'Welcome'
    });
});


// Register process
router.post('/register', function(req, res, next) {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    req.checkBody(username,'Username is required!').notEmpty();
    req.checkBody(username, 'Username should be at least 5 characters').isLength({min:5, max: 5});

    req.checkBody(email, 'Email is required').notEmpty();
    req.checkBody(email, 'Pleased provide valid email').isEmail();
    req.checkBody(password, 'Password should be at least 5 characters').isLength({min:5, max: 5});

    let validation = req.validationErrors();

    // Check last array in validation if undefined for errors
    if(validation[validation.length-1].value === undefined){

        // Check if username and email is unique in the collection
        User.find({email: email}, function (err, docs) {
            if(!docs.length) {
                function NewUser(username, email, password) {
                    this.username = username;
                    this.email = email;
                    this.password = bcrypt.hashSync(password, 10);
                }

                let newUser = new NewUser(username, email, password);

                User.create(newUser).then(user => {
                    res.send(user);
                }).catch(next);
            } else {
                res.send('Email already exists');

            }
        });
    } else {
        res.send('Please provide valid details!');
    }
});

// get list of all entries from db
router.get('/users', (req, res, next) => {
    // res.send({type: 'GET'});
    User.find({}).then(users => {
        res.send(users);
    });
});

// specific entry based on userId
router.get('/users/:userId', (req, res, next) => {
    User.findOne({_id: req.params.userId}).then(user => {
        res.send(user);
    }).catch(next);
});

//Add a new entry --- for testing on postman
router.post('/users', (req, res, next) => {

    function NewUser(username, email, password) {
        this.username = username;
        this.email = email;
        if(password) {
            this.password = bcrypt.hashSync(password, 10);
        } else {
            this.password = password;
        }
    }

    let newUser = new NewUser(
        req.body.username,
        req.body.email,
        req.body.password);

    User.create(newUser).then(user => {
        res.send(user);
    }).catch(next);

});

// update and entry
router.put('/users/:userId', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.userId}, req.body).then(() => {
        User.findOne({_id: req.params.userId}).then(user => {
            res.send(user);
        });
    });
});

// delete an entry from db
router.delete('/users/:userId', (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.userId}).then(user => {
        res.send(user);
    });
});

module.exports = router;
