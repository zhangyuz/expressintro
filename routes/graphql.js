var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var apollo = require('apollo-server-express');
var graphqlExpress = apollo.graphqlExpress;
var schema = require('../models/graphql/schema');

router.use('/', bodyParser.json(), graphqlExpress({ schema }));

module.exports = router;
