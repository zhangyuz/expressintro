var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
  res.render('signup');
});

router.post('/',function(req, res, next) {
    var body = req.body;
    console.log(body);
    res.send(`name=${body.name} password=${body.password}`);
    // res.send(req.body);
});

module.exports = router;
