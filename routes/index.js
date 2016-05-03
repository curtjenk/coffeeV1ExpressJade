var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/coffee";
var Account = require('../models/account');
var bcrypt = require('bcrypt-nodejs');


mongoose.connect(mongoUrl);


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { page: 'register', failure: req.query.failure });
});

router.post('/register', function(req, res, next) {

    if (req.body.password != req.body.password2) {
        res.redirect('/register?failure=password');
    } else {
        var newAccount = new Account({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password),
            email: req.body.email,
            createDate: new Date(),
            modifiedDate: new Date()
        });
        newAccount.save();
        req.session.username = req.body.username;
        res.redirect('/order')
    }
});

router.get('/order', function(req, res, next) {
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        res.render('order', { username: req.session.username, orderpage: true });
    }

})








module.exports = router;
