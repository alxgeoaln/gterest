var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.post('/', function (req, res) {
    var user = req.body.user;
    console.log(user);
    mongoose.model('Gterest').find({"author": user},function(err, gterests){
        if(err) console.log(err);
        console.log(gterests)
        res.json(gterests);
    });
})


module.exports = router;