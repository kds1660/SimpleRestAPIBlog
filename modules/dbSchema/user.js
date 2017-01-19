var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var logger = require('.././logger').logger;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

var User = mongoose.model('User', UserSchema);

module.exports=User;