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
router.post('/', async function(req, res, next) {

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    //check if user exists
    try {
      const sql = 'SELECT password FROM users WHERE name = ?';
      const result = await query(sql, username);

      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, function(err, result) {
          if (result == true) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/topsecret');
          } else {
            res.render('login',{ error: 'wrong username or password'});
          }
        });
      } else {
        res.render('login',{ error: 'wrong username or password'});
      }
    } catch (e) {
      next(e);
      console.error(e);
    }
  } else {
    res.render('login',{ error: 'wrong username or password'});
  }
});

module.exports = router;
