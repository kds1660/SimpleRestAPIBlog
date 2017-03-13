var express = require('express');
var router = express.Router();
var Topic= require('.././modules/dbSchema/topic');
var logger = require('.././modules/logger').logger;
var log4js = require('.././modules/logger').log4js;
var authCheck = require('.././modules/authCheck');
router.use(log4js.connectLogger(logger, { level: log4js.levels.DEBUG, format: 'format :method :url :status'}));

router

    .get('/:name/', function (req, res, next) {
        Topic.find({name: req.params.name}, function (err, topic) {
            if (err) throw err;
            if (topic.length) {
                res.json(topic[0].comments);
                logger.info('Comments recieve OK');
            }
            else {
                err = new Error('Not Found');
                err.status = 404;
                logger.error(err);
                next(err);
            }
        });
    })

    .delete('/:name',authCheck, function (req, res, next) {
        var id = req.params.name;
        name=req.query.topicName;
        console.log(id,name);
        Topic.update({name:name},{$pull:{comments:{_id:id}}},
            function (err, topic) {
            if (!err) {
                res.sendStatus(200);
                logger.info('Comment delete OK');
            } else   logger.error(err);
        });
    })

    .put('/:name/', authCheck, function (req, res, next) {

        var id = req.params.name;
        name=req.body.name;
        text=req.body.text;
        if (!req.body.new) {
            Topic.update({name:name,'comments._id':id},{$set:{'comments.$.text':text,'comments.$.date':new Date()}},
                function (err, topic) {
                    if (!err) {
                        res.sendStatus(200);
                        logger.info('Comment edit OK');
                    } else   logger.error(err);
                });
        } else if (req.body.new){
            Topic.update({name:req.params.name},{$push:{comments:{author:req.user.username,text:text,date:new Date()}}},
                function (err, topic) {
                    if (!err) {
                        res.sendStatus(201);
                        logger.info('Comment add OK');
                    } else   logger.error(err);
                });
        }
    });

module.exports = router;