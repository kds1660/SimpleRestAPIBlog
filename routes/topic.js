var express = require('express');
var Topic = require('./../model/topicModel');
var router = express.Router();

var topics = [
    new Topic('test', 'me', 'this is text', new Date())
];

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
        //TODO
    })
    .delete('/:name', function (req, res, next) {
        var name = req.params.name;
        if(name == undefined || name.length == 0) throw new Error("Name should be request parameter");
        topics = topics.filter(function (el) {
            return el.name !== name
        });
        res.send(200);
    });

module.exports = router;
