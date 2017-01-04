var express = require('express');
var mongoose = require('mongoose');
var topic = require('./topic');
mongoose.Promise = global.Promise;
var router = express.Router();
var fs = require('fs');

var Topic = mongoose.model('Topic');
router

    .get('/:name/', function (req, res, next) {
console.log('comm')
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
        Topic.update({name:name,'comments._id':id},{$set:{'comments.$.text':text}},
            function (err, topic) {
                if (!err) res.send(200);
            });
    });


module.exports = router;