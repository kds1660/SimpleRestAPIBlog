var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var logger = require('.././logger').logger;
var CommentSchema=require('./comment');

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

module.exports = Topic;