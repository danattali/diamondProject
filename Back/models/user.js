const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    userEmail: String,
    password: String,
    telephone: String,
    address: String,
    rules: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;