var express = require('express');
var router = express.Router();
var Gterest = require('../model/gterest.js');
var mongoose = require('mongoose');

//#region Post Gterest
router.post('/gterest', function(req, res){
    var image = req.body.img;
    var title = req.body.title;
    var author = req.user.facebook.name || req.user.twitter.name || req.user.local.username;
    var id = req.user._id;
    var raiting = 0;

    var gterest = new Gterest({'image': image, 'title': title, 'author': author, 'id': id, 'raiting': raiting});
    gterest.save(function(err, gterest){
        if(err) return console.log(err);

    });

    res.redirect('/');
});
//#endregion

//#region Get Gterest
router.post('/',function(req, res){
    mongoose.model('Gterest').find({'id': req.user._id}, function(err, gterests){
        res.json(gterests);
    })
});
//#endregion

//#region Delete Gterest
router.post('/deleteGterest', function(req, res){
    var id = req.body.gterestID;
    Gterest.findOneAndRemove({"_id": id}, function(err, gteressts){
        if(err) return console.log(err);
        res.json(gteressts)
    })
});
//#endregion


module.exports = router;