var express = require('express');
var router = express.Router();
var User= require('.././modules/topicService').user;
var logger = require('.././modules/logger').logger;
var log4js = require('.././modules/logger').log4js;
router.use(log4js.connectLogger(logger, { level: log4js.levels.DEBUG, format: 'format :method :url :status'}));

router

    .post('/', function (req, res, next) {
        User.find({username: req.body.name, password: req.body.password}, function (err, user) {
            if (err) throw err;

            if (user.length) {
                res.json(user);
                logger.info('Logged OK '+req.body.name)
            } else {
                err = new Error('Not Found');
                err.status = 404;
                logger.error(err);
                next(err);
            }
        });
    })

    .put('/', function (req, res, next) {
        var user = new User({username: req.body.name, password: req.body.password});
        user.save(function (err) {
            if (err) {
                err = new Error('User exists');
                err.status = 404;
                logger.error(err);
                next(err);
            } else {
                logger.info('User added OK '+user.username)
                res.sendStatus(200);
            }
        });
    });

module.exports = router;