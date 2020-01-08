const
		express = require('express'),
		router = express.Router(),
		test = require('./test'),
		passport = require('passport'),
		authentication = require('./../functions/auth/authentication'),

		//ALL ROUTES
		routesAuth = require('./auth');

router
		.use('/auth', routesAuth)
		.use('/test', test);

module.exports = router;