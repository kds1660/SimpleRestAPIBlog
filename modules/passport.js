var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User= require('.././modules/topicService').user;
var logger = require('.././modules/logger').logger;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    logger.debug('serializeUser '+user)
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        logger.debug('deserializeUser  '+user)
        done(err, user);
    });
});

module.exports = {passport:passport,LocalStrategy:LocalStrategy}