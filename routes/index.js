var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET topsekret page. */
router.get('/topsecret', function(req, res, next) {
  if (req.session.loggedin) {
    res.send('du är inloggad');
  } else {
    res.send('🦀')
  }
});

module.exports = router;
