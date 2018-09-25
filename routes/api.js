const express = require('express');
const router = express.Router();
const User = require('../models/users');

// get list from db
router.get('/users', (req, res) => {
    res.send({type: 'GET'});
});

//Add a new entry
router.post('/users', (req, res) => {
    User.create(req.body).then(user => {
        res.send(user);
    });

    // res.send({
    //     type: 'POST',
    //     name: req.body.name,
    //     finishing: req.body.finishing
    // });
});

// update and entry
router.put('/users/:id', (req, res) => {
    res.send({type: 'PUT'});
});

// delete an entry from db
router.delete('/users/:id', (req, res) => {
    res.send({type: 'DELETE'});
});

module.exports = router;
