var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var logger = require('.././logger').logger;
var bcrypt   = require('bcrypt-nodejs');

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

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(5, function(err, salt) {

        if (err) return next(err);
        bcrypt.hash(user.password, salt, "",function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function( pwd ) {
    return bcrypt.compareSync(pwd, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports=User;