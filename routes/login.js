var express = require('express');
var router = express.Router();
var User= require('.././modules/topicService').user;

router

    .post('/', function (req, res, next) {
        console.log(req.body);
        User.find({username: req.body.name, password: req.body.password}, function (err, user) {
            if (err) throw err;

            if (user.length) {
                res.json(user);
            } else {
                err = new Error('Not Found');
                err.status = 404;
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
                next(err);
            } else {
                res.send(200);
            }
        });
    });

module.exports = router;