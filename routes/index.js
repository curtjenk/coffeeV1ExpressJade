var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoUrl = "mongodb://localhost:27017/coffee";
var Account = require('../models/account');

mongoose.connect(mongoUrl);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', {failure: req.query.failure});
});

router.post('/register', function(req, res, next) {
  console.log("here");
  if (req.body.password != req.body.password2) {
    res.redirect('/register?failure=password');
  }

  var newAccount = new Account({
    username: req.body.username,
    password: req.body.password,
    emailAddress: req.body.emailAddress
  });

  newAccount.save();

  res.json(req.body);
});








module.exports = router;
