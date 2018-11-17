var express = require('express');
var router = express.Router();
var apollo = require('apollo-server-express');
var graphiqlExpress = apollo.graphiqlExpress;

router.use('/', graphiqlExpress({endpointURL: '/graphql'}));

module.exports = router;
