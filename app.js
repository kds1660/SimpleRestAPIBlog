var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var topic = require('./routes/topic');
var login = require('./routes/login');
var comments = require('./routes/comments');
var mongoose = require('./modules/dbService');
var logger = require('./modules/logger').logger;
var log4js = require('./modules/logger').log4js;
var session=require('express-session');
var passport = require('./modules/passport').passport;
var LocalStrategy =require('./modules/passport').LocalStrategy;


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'kds_secret',
    saveUninitialized:true,
    resave:true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/topic', topic);
app.use('/api/login', login);
app.use('/api/comments', comments);

app.listen(3000);

logger.info('Server Started');

