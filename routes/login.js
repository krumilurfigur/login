var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const {query} = require('../models/db');

/* GET login form */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('login', {title:'schoolsoft'})
});

/* Get skapa en hash */
router.get('/kryptan/:pwd', function(req, res, next) {

  const myPlaintextPassword = req.params.pwd;

  bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
    // Store hash in your password DB.
    res.json({
      pwd: hash
    });
});


});

/* POST login */
router.post('/', function(req, res, next) {

  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  if (username == 'gamer' && password == "123") {
    req.session.loggedin = true;
    req.session.username= username;
    res.redirect('/topsecret');
  } else {
    res.render(
      'login',
      {
        title: 'schoolsoft', 
        error: '🦀'
      }
    );
  }
});

module.exports = router;
