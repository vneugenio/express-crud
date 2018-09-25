const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');



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
    });
});

//Add a new entry
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
