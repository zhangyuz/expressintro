var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
var mongoose = require('mongoose');
// var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var mongoRouter = require('./routes/mongo');
var signupRouter = require('./routes/signup');
var crashReportRouter = require('./routes/crashreport');

var app = express();

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/expressintro');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(multer);

// Demo middleware
var myLogger = function(req, res, next) {
    console.log('Info','LOGGED');
    next();
};
app.use(myLogger);
var requestTime = function(req, res, next) {
    req.requestTime = Date.now();
    next();
};
app.use(requestTime);
var configurableMw = function(options){
    return function(req, res, next) {
        req.cmwoption = options;
        console.log(`configurable mw`);
        next();
    };
};
app.use(configurableMw({optiona: 'heihei'}));

// my app routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/mongo', mongoRouter);
app.use('/signup', signupRouter);
app.use('/crashreport', crashReportRouter);


// my demo for routing
// 1) basic route
app.get('/routing/basic', function(req, res) {
    res.send('basic route');
});
// 2) basic multiple handler
app.get('/routing/multihandler', function(req, res, next) {
    res.locals.msg0 = 'Hello from handler0';
    next();
}, function(req, res){
    res.locals.msg1 = 'Hello from handler1';
    res.send(res.locals.msg0 + '<p>' + res.locals.msg1);
});
// 3) handler array
var cb0 = function(req, res, next) {
    res.locals.cb0 = 'CB0';
    if (req.query.skip == 0) {
        res.send(`${res.locals.cb0} <p>skip 0`);
    } else {
        next();
    }
};

var cb1 = function(req, res, next) {
    res.locals.cb1 = 'CB1';
    if (req.query.skip == 1) {
        res.send(`${res.locals.cb0} <p>${res.locals.cb1} <p>skip 1`);
    } else {
        next();
    }
};

var cb2 = function(req, res, next) {
    res.locals.cb2 = 'CB2';
    res.send(`Last Callback: <p>${res.locals.cb0} <p>${res.locals.cb1} <p>${res.locals.cb2}`);
};

var cbs = [cb0, cb1, cb2];

app.get('/routing/handlerarray', cbs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('Error', `${req}`);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
