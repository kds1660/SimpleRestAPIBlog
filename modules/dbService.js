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
module.exports = mongoose;
