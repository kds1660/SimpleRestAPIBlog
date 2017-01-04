var express = require('express');
var path = require('path');
var topic = require('./routes/topic');
var login = require('./routes/login');
var comments = require('./routes/comments');
var mongoose    = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MyDb');
var db = mongoose.connection;

db.on('error', function (err) {
   console.log('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

mongoose.connection.collections['users'].drop( function(err) {
    console.log('User dropped');
});
mongoose.connection.collections['topics'].drop( function(err) {
    console.log('Topics dropped');
});

var bodyParser = require('body-parser');
var app = express();

console.log("Server Started");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bootstrap')));
app.use('/api/topic', topic);
app.use('/api/login', login);
app.use('/api/comments', comments);
app.listen(3000);

