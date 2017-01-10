var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var logger = require('./logger').logger;

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

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
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
        if (err) logger.error(err);
        logger.info('Topic saved successfully '+topic.name);
    });
});


var User = mongoose.model('User', UserSchema);
var usersData = JSON.parse(fs.readFileSync('./data/users.json'));
usersData.users.forEach(function (element) {
    var user = new User({username: element.name, password: element.password});
    user.save(function (err) {
        if (err) logger.error(err);
        logger.info('User saved successfully '+ user.username);
    });
});
module.exports = {topic:Topic,user:User};