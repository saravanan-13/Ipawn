var mysql = require('mysql');
var mv = require('mv');

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

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

exports.register = function(req, res) {
    console.log("req", req.body);
    var users = {
        "firstname": req.body.fname,
        "lastname": req.body.lname,
        "email": req.body.mail,
        "password": req.body.pass,
    }
    users.password = cryptr.encrypt(users.password)
    console.log(users.password);
    connection.query('INSERT INTO signup SET ?', users, function(error, results, fields) {
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
    })
}


exports.login = function(req, res) {

    var email = req.body.mail;
    var password = req.body.pass;
    // var sess = req.session;

    password = cryptr.encrypt(password)
    console.log(password);
    connection.query('SELECT * FROM signup WHERE email = ?', [email], function(error, results, fields) {
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                if (results[0].password === password) {
                    req.session.userId = results[0].email;
                    //req.session.user = results[0];
                    // console.log(req.session.userId)
                    // console.log(req.session.user)
                    console.log("Success!");
                    res.sendFile(path.join(__dirname + '/mainpage.html'));
                } else {
                    res.sendFile(path.join(__dirname + '/404.html'));
                }
            } else {
                res.sendFile(path.join(__dirname + '/404.html'));
            }
        }
    });
}


exports.submit = function(req, res) {

    /* var user = req.session.user,
    userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }
*/
    console.log("req", req.body);
    var file = req.body.file_upload;
    var img = file.name;
    var users = {
        "cust_name": req.body.cname,
        // "product_id": 1,
        "product_name": req.body.pname,
        "product_type": req.body.ptype,
        "type": req.body.ttype,
        "proof": req.body.pproof,
        "image": img,
        "description": req.body.message,
    }

    file.mv('images/upload/' + file.name, function(err) {

        if (err)
            return res.status(500).send(err);
    });
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


exports.enter = function(req, res) {

    /*
    var user = req.session.user,
        userId = req.session.userId;
    console.log('ddd=' + userId);
    if (userId == null) {
        res.redirect("/login");
        return;
    }
*/
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