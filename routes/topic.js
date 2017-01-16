var express = require('express');
var router = express.Router();
var Topic= require('.././modules/topicService').topic;
var logger = require('.././modules/logger').logger;
var log4js = require('.././modules/logger').log4js;
router.use(log4js.connectLogger(logger, { level: log4js.levels.DEBUG, format: 'format :method :url :status'}));

router

    .get('/', function (req, res, next) {
        Topic.find({}, function (err, topic) {
            if (err) throw err;
            if (topic.length) {
                logger.info('Topics list GET OK');
                res.json(topic.map(function (el) {
                    if (el.img==='') {el.img='img/no-image.png'}
                    return {
                        name: el.name,
                        author: el.author,
                        date: el.date,
                        comments:el.comments.length,
                        img:el.img,
                        text:(el.text).substr(0,400) + '...'
                    };
                }));
            } else {
                err = new Error('Not Found');
                err.status = 404;
                logger.error(err);
                next(err);
            }
        }).sort({date:-1});
    })

    .get('/:name/', function (req, res, next) {
        Topic.find({name: req.params.name}, function (err, topic) {
            if (err) throw err;
            if (topic.length) {
                logger.info('Topic get OK '+req.params.name);
                if (topic[0].img==='') {topic[0].img='img/no-image.png'}
                res.json(topic[0]);
            }
            else {
                err = new Error('Not Found');
                err.status = 404;
                logger.error(err);
                next(err);
            }
        });
    })

    .put('/:name/', function (req, res, next) {
        var body = req.body;
        var oldname = body.oldTopic;

        if (oldname) {
            Topic.findOneAndUpdate({name: oldname},
                {
                    name: body.name,
                    author: body.author,
                    img: body.img,
                    text: body.text,
                    date: body.date
                }, function (err) {
                    if (err) {
                        err = new Error('Unnown error update');
                        err.status = 404;
                        logger.error(err);
                        next(err);
                    } else {
                        res.sendStatus(200);
                        logger.info('Topic update OK '+body.name);
                    }
                });
        } else {
            newTopic = Topic({
                name: body.name,
                author: body.author,
                img: body.img,
                text: body.text,
                date: body.date
            });
            newTopic.save(function (err) {
                if (err) {
                    err = new Error('Topic exists');
                    err.status = 409;
                    logger.error(err);
                    next(err);
                } else {
                    res.sendStatus(200);
                    logger.info('Topic add OK '+body.name);
                }
            });
        }
    })

    .delete('/:name', function (req, res, next) {
        var name = req.params.name;
        Topic.remove({name: name}, function (err) {
            if (err) {
                throw err;
                logger.error(err);
            } else {
                res.sendStatus(200);
                logger.info('Topic delete OK '+name);
            }

        });
    });

module.exports = router;