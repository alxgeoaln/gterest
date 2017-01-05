var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = require('../model/model.js');


router.post('/', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var like = false;
    console.log(username, password);

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);



    var user = new User({'local.username': username, 'local.password': hashPassword, 'local.like': like});

    user.save(function(err, user){
        if(err) return console.log(err);

    });
    res.redirect('/');

});

module.exports = router;