var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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

module.exports= CommentSchema;