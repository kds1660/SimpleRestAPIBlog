var express = require('express');
var router = express.Router();
var fs = require('fs');

var users=initUsers();
router
    .post('/', function (req, res, next) {
        console.log(req.body)
        var user = users.find(function (elem) {
            return (elem.name == req.body.name&&elem.password == req.body.password);
        });

        if(user) {
            res.json(user);
        } else {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }

    })
.put('/', function (req, res, next) {
    var user = users.find(function (elem) {
        return (elem.name == req.body.name);
    });
    if(!user) {
        users.push({name:req.body.name, password:req.body.password});
        writeUser();
        res.send(200);
    } else {
        var err = new Error('User exists');
        err.status = 404;
        next(err);
    }

})


function initUsers() {
    var users = [];
    var usersData = JSON.parse(fs.readFileSync('./data/users.json'));
    usersData.users.forEach(function (element) {
        users.push({name:element.name,password:element.password});
    });
    return users;
}

function writeUser() {
    var obj={users:[]};
    for(var i=0;i<users.length;i++) {
        obj.users.push(users[i]);
    }
    fs.writeFile('./data/users.json',JSON.stringify(obj,null,4));
}

module.exports = router;