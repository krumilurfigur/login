var express = require('express');
var router = express.Router();
const authcontroller = require("../controllers/authcontroller");

/* GET delete page. */
router.get('/delete', function(req, res, next) {
  res.render('delete', { title: 'Express' });
});


module.exports = router;
