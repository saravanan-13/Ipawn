var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function(req, res) {
    if (req.session.userId === null) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    console.log("YOUNSS !")
    return res.sendFile(path.join(__dirname + '/form.html'));
})

router.get('/profile', function(req, res) {
    if (req.session.userId === null) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    res.sendFile(path.join(__dirname + '/profile.html'));
})
router.get('/login', function(req, res) {
    if (req.session.userId === null) {
        console.log("OOPS !")
        return res.sendFile(path.join(__dirname + '/login.html'));
    }
    res.sendFile(path.join(__dirname + '/mainpage.html'));
})
router.get('/logout', function(req, res) {
    req.session.userId = null
    res.sendFile(path.join(__dirname + '/login.html'));
})

module.exports = router