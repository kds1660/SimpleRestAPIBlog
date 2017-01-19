var mongoose = require('.././modules/dbService');
var logger = require('.././modules/logger').logger;
var Topic=require('.././modules/dbSchema/topic');
var User=require('.././modules/dbSchema/user');
var fs = require('fs');

mongoose.connection.collections['users'].drop( function(err) {
    logger.info('User dropped');
});
mongoose.connection.collections['topics'].drop( function(err) {
    logger.info('Topics dropped');
});

var topicsData = JSON.parse(fs.readFileSync('./testing/data/topics.json'));
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

var usersData = JSON.parse(fs.readFileSync('./testing/data/users.json'));
usersData.users.forEach(function (element) {
    var user = new User({username: element.name, password: element.password});
    user.save(function (err) {
        if (err) logger.error(err);
        logger.info('User saved successfully '+ user.username);
    });
});