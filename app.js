var express = require('express');
var path = require('path');
var topic = require('./routes/topic');
var login = require('./routes/login');
var comments = require('./routes/comments');
var mongoose = require('./modules/dbService');

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

