/**
 * Created by Georgian Alin on 22.11.2016.
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://galexandru:mcwtuyokzmn1@ds145868.mlab.com:45868/gterest');
var db = mongoose.connection;


var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var auth = require('./routes/auth');
var gterest = require('./routes/gterest');
var userProfile = require('./routes/userProfile');

//Init App
var app = express();

app.set('view engine', 'html');

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
    secret: 'secret' || process.env.FACEBOOK_SECRET,
    app_id: process.env.FACEBOOK_APP_ID,
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


//Connect Flash
app.use(flash());

//Global Vars
//Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/auth', auth);
app.use('/gterest', gterest);
app.use('/userProfile', userProfile);


//Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function () {
    {
        console.log("Server started on port " + app.get('port'));
    }
});