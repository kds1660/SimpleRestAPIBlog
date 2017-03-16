var express = require('express');
var router = express.Router();
var User = require('.././modules/dbSchema/user');
var passport = require('.././modules/passport').passport;
var logger = require('.././modules/logger').logger;
var log4js = require('.././modules/logger').log4js;
router.use(log4js.connectLogger(logger, {level: log4js.levels.DEBUG, format: 'format :method :url :status'}));

router

    .get('/logged', function (req, res) {
        if (req.isAuthenticated()) {
            console.log(req.user)
            res.send(req.user)
        } else res.send('0')
    })

    .get('/facebook', function (req, res, next) {
        passport.authenticate('facebook', { scope : 'email' },function (err, user, info) {

        })(req, res, next);
    })

    .get('/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/',
            failureRedirect: '/' }))

    .get('/vk', function (req, res, next) {
        passport.authenticate('vkontakte', { scope : 'email' },function (err, user, info) {

        })(req, res, next);
    })

    .get('/vk/callback',
        passport.authenticate('vkontakte', { successRedirect: '/',
            failureRedirect: '/' }))

    .get('/ok', function (req, res, next) {
        passport.authenticate('odnoklassniki', { scope : 'GET_EMAIL' },function (err, user, info) {

        })(req, res, next);
    })

    .get('/ok/callback',
        passport.authenticate('odnoklassniki', { successRedirect: '/',
            failureRedirect: '/' }))

    .post('/', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (!user) {
                logger.error('Not logged ' + req.body.username);
                return res.sendStatus(401);

            } else {
                req.login(user, {}, function (err) {
                    logger.info('Passport logged OK ' + req.user)
                });
                logger.info('Logged OK ' + user.username)
                return res.status(200).json({username: user.username});
            }

        })(req, res, next);
    })



/*app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));*/

    .put('/', function (req, res, next) {
        var user = new User({username: req.body.username, password: req.body.password});
        user.save(function (err) {
            if (err) {
                err = new Error('User existst');
                err.status = 404;
                logger.error(err);
                next(err);
            } else {
                logger.info('User added OK ' + user.username)
                res.sendStatus(200);
            }
        });
    })

    .get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

module.exports = router;