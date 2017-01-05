var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = require('../model/model.js');


//router.get('/', function (req, res) {
//    res.render('login');
//});


passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        User.findOne({"local.username": username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, console.log('username incorect'));
            }
            var dbPassword = user.local.password;
            var isTrue = bcrypt.compareSync(password, dbPassword);
            if (!isTrue) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/oops',
        failureFlash: true
    }),
    function (req, res) {
        res.redirect('/');
    }
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;