var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('signup');
});

router.post('/', function (req, res, next) {
    var body = req.body;
    // console.log('Debug', `Get request ${req}`);
    User.findOne({userName: body.username}, function (err, user) {
        if (err) {
            console.log('Error', `mongoose error ${error}`);
            return next(err);
        }
        if (user) {
            req.flash('Error', 'User already exists!');
            return res.redirect('/signup');
        }
        var user = new User({
            username: body.username,
            password: body.password,
            createAt: body.createAt,
            displayName: body.displayName,
            bio: body.bio,
        });
        user.save().then(() => {
            console.log(`${user} saved!`);
            res.send(`${user} signed up!`);
        });
        // res.send(`${user} signed up`);
        // return;
        // res.redirect('/');

    });

    // res.send(req.body);
});

module.exports = router;
