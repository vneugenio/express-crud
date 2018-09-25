const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create user model and schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

const User = mongoose.model('users2', UserSchema);

module.exports = User;
