/*
This file is used to create schema of User for bdd
*/

var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema; //Create mongoose Schema
var SALT = 42; // salt used for hash password

var schema = new Schema({
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    username: {type: String, required:true},
    email: {type:String, required: true},
    password: {type:String, required:true},
    createdOn: {type:Date, default: Date.now}
})

/**
 This function is called before storing user in database
 **/
schema.pre('save', function (next) {
    var user = this;
    // if password is not modified or created
    if (!user.isModified('password')) return next();
    //else...
    bcrypt.genSalt(SALT, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/** 
 Comparing user password and specified password
 * @param {String} candidatePassword Password to compare
 * @return {bool}                    Return true if match else return false
 **/
schema.methods.comparePasswords = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

/** 
 Get profile of user
 * @return {Json} return json contains username and email
**/
schema.methods.profile = function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email
    }
};

exports.model = mongoose.model('User', schema, 'user');


