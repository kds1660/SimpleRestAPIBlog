var express = require('express');
var mongoose    = require('mongoose');

var router = express.Router();
var fs = require('fs');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var User = mongoose.model('User', UserSchema);

var usersData = JSON.parse(fs.readFileSync('./data/users.json'));
usersData.users.forEach(function (element) {
    var user= new User({username:element.name,password:element.password});
    user.save(function(err) {
        if (err) console.log(err);
        console.log('User saved successfully!');
    });
});

router
    .post('/', function (req, res, next) {
        console.log(req.body);
        User.find({ username: req.body.name,password:req.body.password }, function(err, user) {
            if (err) throw err;

            if(user.length) {
                res.json(user);
            } else {
                err = new Error('Not Found');
                err.status = 404;
                next(err);
            }
        });



    })
.put('/', function (req, res, next) {
    var user= new User({username:req.body.name,password:req.body.password});
    user.save(function(err) {
        if (err) {
            err = new Error('User exists');
            err.status = 404;
            next(err);
        }else { res.send(200);}


    });
});
module.exports = router;