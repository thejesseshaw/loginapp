const mongo = require('mongodb');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');



var  userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String
    }
});

var User = module.exports = mongoose.model('users', userSchema);


//Password encryption
module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // console.log("Password encryption was executed from the model file");
            // Store hash in your password DB. 
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(in_username, callback) {
    // console.log("GetUserByUsername was executed from the model file");
    var query = `{'username': '${in_username}'}`;
    // console.log(`query is "${query}"`);
    console.log(User.find(`'username': '${query}'`));
    // console.log(foundUser);
    // console.log(`User.password is ${foundUser.password}`);
}

module.exports.getUserById = function(id, callback) {
    console.log(callback);
    console.log("GetUserByID was executed from the model file");
    User.findById(id, callback);
}

module.exports.comparePassword = function(canditatePassword, hash, callback) {
    // Load hash from your password DB.
    console.log("comparePassword was executed from the model file");
    // console.log(`${canditatePassword}, ${hash}, ${callback}`);
    bcrypt.compare(canditatePassword, hash, function(err, isMatch) {
        console.log(`canditatePassword is ${canditatePassword}`);
        if(err) throw err;
        callback(null, isMatch);
    });
}