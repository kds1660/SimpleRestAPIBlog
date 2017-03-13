var mongoose    = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MyDb');
var db = mongoose.connection;
var logger = require('./logger').logger;

db.on('error', function (err) {
    logger.fatal('connection error:', err.message);
});
db.once('open', function callback () {
    logger.debug('Connect with DB');
});


module.exports = mongoose;
