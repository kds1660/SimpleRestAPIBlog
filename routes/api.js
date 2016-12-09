var express = require('express');
var router = express.Router();


router.get('/simple', function(req, res, next) {
  res.send('Hello!');
});

router.get('/wrong', function(req, res, next) {
    throw new Error("This URL respond with error");
});

router.get('/xml', function(req, res, next) {
    res.send('<item><name>Name</name><text>Hello</text></item>');
});

module.exports = router;
