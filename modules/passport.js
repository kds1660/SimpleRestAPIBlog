var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    VKontakteStrategy = require('passport-vkontakte').Strategy,
    OdnoklassnikiStrategy = require('passport-ok-strategy').Strategy;
var User = require('.././modules/dbSchema/user');
var logger = require('.././modules/logger').logger;
var facebookAuth = require('.././config/config').facebookAuth;
var vkAuth = require('.././config/config').vkAuth;
var okAuth = require('.././config/config').okAuth;
passport.use(new LocalStrategy(
    function (username, password, done) {

        User.findOne({username: username}, function (err, user) {

            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));

passport.use(new OdnoklassnikiStrategy(
    {
        clientID: okAuth.clientID,
        clientSecret: okAuth.clientSecret,
        callbackURL: okAuth.callbackURL,
        clientPublic: okAuth.clientPublic
    },
    function myVerifyCallbackFn(accessToken, refreshToken, profile, done) {
        console.log(profile)
        User.update({'ok.id': profile.id}, {
            $set: {
                "ok.id": profile.id,
                "ok.name": profile.name.givenName + ' ' + profile.name.familyName,
                "username": profile.id
            }
        }, {upsert: true}, function (err, user) {

            if (err) {
                return done(err);
            } else {
                User.findOne({'ok.id': profile.id}, function (err, user) {
                    return done(null, user);
                })

            }
        });
    }
));

passport.use(new VKontakteStrategy(
    {
        clientID: vkAuth.clientID,
        clientSecret: vkAuth.clientSecret,
        callbackURL: vkAuth.callbackURL,
        profileFields: ['id', 'emails', 'name']
    },
    function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {

        User.update({'vk.id': profile.id}, {
            $set: {
                "vk.id": profile.id,
                "vk.token": accessToken,
                "username": params.email || profile.username,
                "vk.name": profile.name.givenName + ' ' + profile.name.familyName,
                "vk.photo":profile.photos[0].value
            }
        }, {upsert: true}, function (err, user) {

            if (err) {
                return done(err);
            } else {
                User.findOne({'vk.id': profile.id}, function (err, user) {
                    return done(null, user);
                })

            }
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: facebookAuth.clientID,
    clientSecret: facebookAuth.clientSecret,
    callbackURL: facebookAuth.callbackURL,
    profileFields: ['id', 'emails', 'name']
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        User.update({'facebook.id': profile.id}, {
            $set: {
                "facebook.id": profile.id,
                "facebook.token": accessToken,
                "facebook.name": profile.name.givenName + ' ' + profile.name.familyName,
                "username": profile.emails[0].value
            }
        }, {upsert: true}, function (err, user) {

            if (err) {
                return done(err);
            } else {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    return done(null, user);
                })

            }
        });
    })
}));

passport.serializeUser(function (user, done) {
    logger.debug('serializeUser ' + user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        logger.debug('deserializeUser  ' + user)
        done(err, user);
    });
});

module.exports = {
    passport: passport,
    LocalStrategy: LocalStrategy,
    FacebookStrategy: FacebookStrategy,
    VKontakteStrategy: VKontakteStrategy,
    OdnoklassnikiStrategy: OdnoklassnikiStrategy
}