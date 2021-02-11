var express = require('express');
var router = express.Router();

/* GET login form */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('login', {title:'schoolsoft'})
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
