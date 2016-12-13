var express = require('express');
var Topic = require('./../model/topicModel');
var router = express.Router();
var fs = require('fs');

var topics = initTopics();

router
    .get('/', function (req, res, next) {
        res.json(topics.map(function (el) {
            return el.getSimpleModel();
        }));
    })
    .get('/:name/', function (req, res, next) {
        var topic = topics.find(function (elem) {
            return elem.name == req.params.name;
        });
        if(topic) {
            res.json(topic);
        } else {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    })
    .post('/', function (req, res, next) {
        var body = req.body;
        console.log(body);
        topics.push(new Topic(body.name, body.author, body.date, body.text));
        res.sendStatus(201);
    })
    .put('/:name/', function (req, res, next) {
        var body = req.body;
        var name=body.oldTopic;
        console.log(topics,name)
        topics = topics.filter(function (el) {
            return el.name !== name
        });
        topics.push(new Topic(body.name, body.author, body.text, body.date));
    })
    .delete('/:name', function (req, res, next) {
        var name = req.params.name;
        if(name == undefined || name.length == 0) throw new Error("Name should be request parameter");
        topics = topics.filter(function (el) {
            return el.name !== name
        });
        res.send(200);
    });

function initTopics() {
    var topics = [];
    var topicsData = JSON.parse(fs.readFileSync('../data/topics.json'));
    topicsData.topics.forEach(function (element) {
        topics.push(new Topic(element.name, element.author, element.text, element.data));
    });
    return topics;
}

module.exports = router;
