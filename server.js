var express = require("express");
var login = require('./client/routes/loginroutes');
var form = require('./client/routes/form')
var busboy = require("then-busboy");
var fileUpload = require('express-fileupload');
var check = require('./client/routes/check')
var session = require('express-session');
var profile = require('./client/routes/profile')
var bodyParser = require('body-parser');
var app = express();;

path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
    secret: 'aaabbbcccdddeee',
    resave: false,
    saveUninitialized: true
}))

app.use(fileUpload());
var router = express.Router();

//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login)
router.post('/submit', login.submit)
router.post('/enter', login.enter)
app.use('/api', router);
app.use('/check', check);

app.listen(3200, function() {
    console.log('Server is running. Point your browser to: http://localhost:3200');
});