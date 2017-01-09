var express = require('express');
var router = express.Router();
var Topic= require('.././modules/topicService').topic;

router

    .get('/:name/', function (req, res, next) {
        Topic.find({name: req.params.name}, function (err, topic) {
            if (err) throw err;
            if (topic.length) {
                res.json(topic[0].comments);
            }
            else {
                err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
        });
    })

    .delete('/:name', function (req, res, next) {
        var id = req.params.name;
        name=req.body.name;
        Topic.update({name:name},{$pull:{comments:{_id:id}}},
            function (err, topic) {
            if (!err) res.send(200);
        });
    })

    .put('/:name/', function (req, res, next) {
        var id = req.params.name;
        name=req.body.name;
        text=req.body.text;
        console.log(text)
        if (!req.body.new) {
            Topic.update({name:name,'comments._id':id},{$set:{'comments.$.text':text,'comments.$.date':new Date()}},
                function (err, topic) {
                    console.log(err)
                    if (!err) res.send(200);
                });
        } else if (req.body.new){
            Topic.update({name:req.params.name},{$push:{comments:{author:name,text:text,date:new Date()}}},
                function (err, topic) {
                    if (!err) res.sendStatus(200);
                });
        }
    });

module.exports = router;