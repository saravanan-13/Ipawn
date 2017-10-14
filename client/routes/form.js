var express = require("express");
var bodyParser = require('body-parser');
var app = express();
path = require("path");
var router = express.Router()

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'saravanan13',
    database: 'test'
});
connection.connect(function(err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

exports.submit = function(req, res) {
    console.log("req", req.body);
    var users = {
        "cust_name": req.body.cname,
        "product_name": req.body.pname,
        "product_type": req.body.ptype,
        "type": req.body.ttype,
        "proof": req.body.pproof,
        "image": req.body.file_upload,
        "description": req.body.message,
    }
    connection.query('INSERT INTO product SET ?', users, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log("Success!");
            res.sendFile(path.join(__dirname + '/mainpage.html'));
        }
    });
}