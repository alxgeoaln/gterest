var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gterest = require('../model/gterest.js');
var User = require('../model/model.js');
var LikePicture = require('../model/likePicture.js');

router.post('/', function (req, res) {
    mongoose.model('Gterest').find(function (err, gterests) {
        res.json(gterests);
    })
});
//#region Check if user is logged in
router.get('/checkLogin', function (req, res) {

    if (req.user) {
        res.json(true);
    } else {
        res.json(false);
    }
});
//#endregion

//#region Get user profile name
router.get('/profileName', function (req, res) {
    if (req.user) {
        res.json(req.user);
    } else {
        res.json(false);
    }
});
//#endregion

//#region Like Pictures
router.post('/like', function (req, res) {
    var userId = req.user._id;
    mongoose.model('User').find({'_id': userId}, function (err, userRaiting) {
        if (err) return console.log(err);
        //console.log(userRaiting);
        res.json(userRaiting);
    })

});

//router.post('/raiting', function (req, res) {
//    var idUser = req.body.id;
//    var idPicture = req.body.idPicture;
//    var like = req.body.like;
//    var isTrue = req.body.isTrue;
//
//    User.findOneAndUpdate({_id: idUser}, {$set: {'local.like': isTrue}}, {new: true}, function (err, updateUserLike) {
//        if (err) return console.log(err);
//        mongoose.model('Gterest').find({'_id': idPicture}, function (err, gterests) {
//            if (err) return console.log(err);
//            var dbRaiting = parseInt(gterests[0].raiting);
//            var likes = 0;
//            likes = dbRaiting + like;
//            Gterest.findOneAndUpdate({_id: idPicture}, {$set: {raiting: likes}}, {new: true}, function (err, doc) {
//                if(err) return console.log('err: ' + err)
//            });
//            res.json(gterests);
//        });
//    });
//});
router.post('/raitingFind', function(req, res){
    var userId = req.body.id;
    mongoose.model('likePicture').find({'_id': userId}, function (err, userRaiting) {
        if (err) return console.log(err);
        //console.log(userRaiting);
        res.json(userRaiting);
    });
});




module.exports = router;