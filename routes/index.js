var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `Express ${req.requestTime} ${req.cmwoption.optiona}` });
});

module.exports = router;
