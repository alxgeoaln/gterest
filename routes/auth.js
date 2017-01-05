var express = require('express');
var router = express.Router();
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth = require('../config/auth0.js');
var mongoose = require('mongoose');
var User = require('../model/model.js');

//#region Facebook Login

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/oops' }));


passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        profileFields: ['id', 'displayName', 'email'],
        callbackURL: configAuth.facebookAuth.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({'facebook.id': profile.id}, function (err, user) {
                if (err)
                    return done(err);
                if (user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile._json.name;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.local.like = false;

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                    console.log(profile);

                }
            })
        })
    }
));
//#endregion
//#region Twitter Login

router.get('/twitter', passport.authenticate('twitter', {scope: ['email']}));
router.get('/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
        failureRedirect: '/oops' }));


passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json'
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function () {
            User.findOne({'twitter.id': profile.id}, function (err, user) {
                if (err)
                    return done(err);
                if (user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = profile._json.token;
                    newUser.twitter.name = profile._json.name;
                    newUser.local.like = false;
                    //newUser.twitter.email = profile.emails[0].value;

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    })
                    console.log(profile);

                }
            })
            //console.log(profile.emails);
            //done(null, profile);
        })
    }
));



module.exports = router;