var log4js = require('log4js'); // include log4js
var config=require('.././config/config');
log4js.configure({ // configure to use all types in different files.
    appenders: [
    {
        type: "console"
    },

    {
        type: "file",
        filename: config.logger.pathLog,
        category: "my_blog"
    }
]
});

var logger = log4js.getLogger("my_blog");
logger.setLevel(config.logger.level);

module.exports = {logger:logger,log4js:log4js};