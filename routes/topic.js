var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var router = express.Router();
var fs = require('fs');

var CommentSchema =  new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

var TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comments:[CommentSchema]
});



var Topic = mongoose.model('Topic', TopicSchema);
var topicsData = JSON.parse(fs.readFileSync('./data/topics.json'));
topicsData.topics.forEach(function (element) {
    var topic = new Topic({
        name: element.name,
        author: element.author,
        img: element.img,
        text: element.text,
        date: element.date,
        comments:element.comments
    });
    topic.save(function (err) {
        if (err) console.log(err);
        console.log('Topic saved successfully!');
    });
});

router
    .get('/', function (req, res, next) {
        Topic.find({}, function (err, topic) {
            if (err) throw err;
            if (topic.length) {
                res.json(topic.map(function (el) {
                    return {
                        name: el.name,
                        author: el.author,
                        date: el.date,
                        comments:el.comments.length
                    };
                }));
            } else {
                err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
        });
    })
    .get('/:name/', function (req, res, next) {
        Topic.find({name: req.params.name}, function (err, topic) {
            if (err) throw err;
            if (topic.length) {
                res.json(topic[0]);
            }
            else {
                err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
        });
    })

    .put('/:name/', function (req, res, next) {
        console.log('topics')
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
                        console.log('error')
                        err = new Error('Unnown error update');
                        err.status = 404;
                        next(err);
                    } else res.send(200);
                });
        } else {
            newTopic = Topic({
                name: body.name,
                author: body.author,
                img: body.img,
                text: body.text,
                date: body.date
            })
            newTopic.save(function (err) {
                if (err) {
                    console.log('error')
                    err = new Error('Topic exists');
                    err.status = 409;
                    next(err);
                } else res.send(200);
            });
        }
    })

    .delete('/:name', function (req, res, next) {
        console.log('delete top')
        var name = req.params.name;
        Topic.remove({name: name}, function (err) {
            if (err) throw err;
            res.send(200);
        });
    })

    .get('comments', function (req, res, next) {
     console.log('topic!')
    })

module.exports = router;