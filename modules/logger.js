var log4js = require('log4js'); // include log4js

log4js.configure({ // configure to use all types in different files.
    appenders: [
    {
        type: "console"
    },

    {
        type: "file",
        filename: "./logs/logs.log",
        category: "my_blog"
    }
]
});

var logger = log4js.getLogger("my_blog");
logger.setLevel("Debug");

module.exports = {logger:logger,log4js:log4js};