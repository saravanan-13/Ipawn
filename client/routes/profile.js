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

exports.enter = function(req, res) {
    console.log("req", req.body);
    var users = {
        "firstname": req.body.first_name,
        "lastname": req.body.last_name,
        "email": req.body.email,
        "phone": req.body.phone,
        "address": req.body.address,
        "city": req.body.city,
        "zipcode": req.body.zip,
    }
    var card = {
        "card_number": req.body.cnumber,
        "card_name": req.body.cname,
        "expiry_month": req.body.month,
        "expiry_year": req.body.year,
        "cvv_code": req.body.cvv,
        "balance": "10000"
    }
    connection.query('INSERT INTO cust_profile SET ?', users, function(error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log("Success!");
            //res.sendFile(path.join(__dirname + '/mainpage.html'));
            connection.query('INSERT INTO card_details SET ?', card, function(error, results, fields) {
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
    });
}