var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy,
      FacebookStrategy = require('passport-facebook').Strategy;
var User= require('.././modules/dbSchema/user');
var logger = require('.././modules/logger').logger;
var facebookAuth=require('.././config/config').facebookAuth;
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

passport.use(new FacebookStrategy({
        clientID        : facebookAuth.clientID,
        clientSecret    : facebookAuth.clientSecret,
        callbackURL     : facebookAuth.callbackURL

    },function(accessToken, refreshToken, profile, done) {

    process.nextTick(function () {
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

            if (err)
                return done(err);

            if (user) {
                return done(null, user);
            } else {
                var newUser = new User();
                newUser.facebook.id = profile.id;
                newUser.facebook.token = accessToken;
                newUser.username = profile.displayName

                newUser.save(function (err) {

                    if (err)
                        throw err;

                    return done(null, newUser);
                });
            }
        });
    })
}));

passport.serializeUser(function(user, done) {
    logger.debug('serializeUser '+user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        logger.debug('deserializeUser  '+user)
        done(err, user);
    });
});

module.exports = {passport:passport,LocalStrategy:LocalStrategy,FacebookStrategy:FacebookStrategy}