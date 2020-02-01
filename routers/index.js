const
		express = require('express'),
		router = express.Router(),
		test = require('./test'),
		passport = require('passport'),
		authentication = require('./../functions/auth/authentication'),

		//ALL ROUTES
		routesAuth = require('./auth'),
		routesPassword = require('./password');

router
		.use('/auth', routesAuth)
		.use('/password', authentication, routesPassword)
		.use('/test', authentication, test);

module.exports = router;